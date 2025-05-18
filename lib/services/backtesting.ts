import { executeQuery } from "@/lib/db"
import {
  evaluateMACDStrategy,
  evaluateRSIStrategy,
  evaluateBollingerStrategy,
} from "@/server/services/tradingStrategies"

export interface BacktestParams {
  userId: string
  strategyId: string
  symbol: string
  startDate: string
  endDate: string
  initialCapital: number
  strategyType: string
  strategyParams: any
}

export interface BacktestResult {
  trades: Trade[]
  summary: BacktestSummary
}

export interface Trade {
  date: string
  type: "buy" | "sell"
  price: number
  quantity: number
  value: number
  balance: number
  signal: string
}

export interface BacktestSummary {
  totalTrades: number
  winningTrades: number
  losingTrades: number
  winRate: number
  initialCapital: number
  finalCapital: number
  profit: number
  profitPercentage: number
  maxDrawdown: number
  sharpeRatio: number
}

export async function runBacktest(params: BacktestParams): Promise<BacktestResult> {
  try {
    // Buscar dados históricos para o período especificado
    const historicalData = await fetchHistoricalData(params.symbol, params.startDate, params.endDate)

    if (!historicalData || historicalData.length === 0) {
      throw new Error("Não há dados históricos suficientes para o período especificado")
    }

    // Ordenar dados por timestamp (mais antigo primeiro)
    const sortedData = [...historicalData].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    )

    // Extrair preços para análise
    const prices = sortedData.map((item) => Number(item.price))

    // Inicializar variáveis para simulação
    let balance = params.initialCapital
    let position = 0 // Quantidade de ativos em posse
    const trades: Trade[] = []
    let maxBalance = balance
    let minBalance = balance
    const returns: number[] = []
    let lastTradePrice = 0

    // Executar simulação
    for (let i = 50; i < prices.length; i++) {
      // Começar a partir do índice 50 para ter dados suficientes para indicadores
      const currentPrice = prices[i]
      const currentDate = new Date(sortedData[i].timestamp).toISOString()
      const pricesUntilNow = prices.slice(0, i + 1)

      let signal = null

      // Avaliar estratégia com base no tipo
      switch (params.strategyType) {
        case "MACD":
          signal = evaluateMACDStrategy(pricesUntilNow, { parameters: params.strategyParams })
          break
        case "RSI":
          signal = evaluateRSIStrategy(pricesUntilNow, { parameters: params.strategyParams })
          break
        case "BOLLINGER":
          signal = evaluateBollingerStrategy(pricesUntilNow, { parameters: params.strategyParams })
          break
        default:
          break
      }

      // Executar trade com base no sinal
      if (signal) {
        if (signal.type === "buy" && position === 0) {
          // Calcular quantidade a comprar (90% do saldo disponível)
          const amount = balance * 0.9
          const quantity = amount / currentPrice

          position = quantity
          balance -= amount
          lastTradePrice = currentPrice

          trades.push({
            date: currentDate,
            type: "buy",
            price: currentPrice,
            quantity,
            value: amount,
            balance: balance + position * currentPrice,
            signal: signal.message,
          })
        } else if (signal.type === "sell" && position > 0) {
          // Vender toda a posição
          const amount = position * currentPrice
          balance += amount

          // Calcular retorno deste trade
          const tradeReturn = (currentPrice - lastTradePrice) / lastTradePrice
          returns.push(tradeReturn)

          trades.push({
            date: currentDate,
            type: "sell",
            price: currentPrice,
            quantity: position,
            value: amount,
            balance,
            signal: signal.message,
          })

          position = 0
        }
      }

      // Atualizar máximo e mínimo para cálculo de drawdown
      const currentTotalValue = balance + position * currentPrice
      maxBalance = Math.max(maxBalance, currentTotalValue)
      minBalance = Math.min(minBalance, currentTotalValue)
    }

    // Liquidar posição final se ainda houver
    if (position > 0) {
      const finalPrice = prices[prices.length - 1]
      const amount = position * finalPrice
      balance += amount

      trades.push({
        date: new Date(sortedData[sortedData.length - 1].timestamp).toISOString(),
        type: "sell",
        price: finalPrice,
        quantity: position,
        value: amount,
        balance,
        signal: "Liquidação final",
      })

      // Calcular retorno do último trade
      const tradeReturn = (finalPrice - lastTradePrice) / lastTradePrice
      returns.push(tradeReturn)

      position = 0
    }

    // Calcular métricas de desempenho
    const finalCapital = balance
    const profit = finalCapital - params.initialCapital
    const profitPercentage = (profit / params.initialCapital) * 100

    const winningTrades = returns.filter((r) => r > 0).length
    const losingTrades = returns.filter((r) => r <= 0).length
    const totalTrades = winningTrades + losingTrades
    const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0

    // Calcular drawdown máximo
    const maxDrawdown = ((maxBalance - minBalance) / maxBalance) * 100

    // Calcular Sharpe Ratio (simplificado)
    const avgReturn = returns.length > 0 ? returns.reduce((sum, r) => sum + r, 0) / returns.length : 0
    const stdDeviation = calculateStdDeviation(returns, avgReturn)
    const sharpeRatio = stdDeviation > 0 ? (avgReturn / stdDeviation) * Math.sqrt(252) : 0 // Anualizado

    // Salvar resultado no banco de dados
    await saveBacktestResult({
      userId: params.userId,
      strategyId: params.strategyId,
      symbol: params.symbol,
      startDate: new Date(params.startDate),
      endDate: new Date(params.endDate),
      results: {
        trades: trades,
        summary: {
          totalTrades,
          winningTrades,
          losingTrades,
          winRate,
          initialCapital: params.initialCapital,
          finalCapital,
          profit,
          profitPercentage,
          maxDrawdown,
          sharpeRatio,
        },
      },
      profit: profitPercentage,
      trades: totalTrades,
    })

    return {
      trades,
      summary: {
        totalTrades,
        winningTrades,
        losingTrades,
        winRate,
        initialCapital: params.initialCapital,
        finalCapital,
        profit,
        profitPercentage,
        maxDrawdown,
        sharpeRatio,
      },
    }
  } catch (error) {
    console.error("Erro ao executar backtest:", error)
    throw error
  }
}

// Função para buscar dados históricos
async function fetchHistoricalData(symbol: string, startDate: string, endDate: string) {
  const query = `
    SELECT price, timestamp
    FROM "PriceHistory"
    WHERE symbol = $1
    AND timestamp BETWEEN $2 AND $3
    ORDER BY timestamp ASC
  `

  return await executeQuery(query, [symbol, startDate, endDate])
}

// Função para salvar resultado do backtest
async function saveBacktestResult(data: any) {
  const query = `
    INSERT INTO "Backtest" (
      "userId",
      "strategyId",
      symbol,
      "startDate",
      "endDate",
      results,
      profit,
      trades,
      "createdAt"
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
    RETURNING id
  `

  return await executeQuery(query, [
    data.userId,
    data.strategyId,
    data.symbol,
    data.startDate,
    data.endDate,
    JSON.stringify(data.results),
    data.profit,
    data.trades,
  ])
}

// Função para calcular desvio padrão
function calculateStdDeviation(values: number[], mean: number): number {
  if (values.length <= 1) return 0

  const variance = values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / (values.length - 1)
  return Math.sqrt(variance)
}
