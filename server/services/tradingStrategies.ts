// Função para verificar alertas de preço
export async function checkPriceAlerts(symbol: string, currentPrice: number, sql: any) {
  try {
    // Buscar alertas ativos para o símbolo
    const alertsQuery = `
      SELECT * FROM "Alert"
      WHERE symbol = $1
      AND active = TRUE
    `

    const alerts = await sql(alertsQuery, [symbol])

    // Filtrar alertas acionados
    const triggeredAlerts = alerts.filter((alert: any) => {
      if (alert.condition === "above" && currentPrice >= alert.price) {
        return true
      }

      if (alert.condition === "below" && currentPrice <= alert.price) {
        return true
      }

      return false
    })

    // Criar notificações para alertas acionados
    for (const alert of triggeredAlerts) {
      // Criar mensagem de notificação
      const message = `${symbol} ${alert.condition === "above" ? "ultrapassou" : "caiu abaixo de"} $${alert.price}!`

      // Inserir notificação
      const notificationQuery = `
        INSERT INTO "Notification" (
          "userId",
          symbol,
          message,
          type,
          strategy,
          read
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `

      await sql(notificationQuery, [alert.userId, symbol, message, "price", null, false])

      // Desativar alerta (opcional, dependendo do requisito)
      const updateAlertQuery = `
        UPDATE "Alert"
        SET active = FALSE, "updatedAt" = NOW()
        WHERE id = $1
      `

      await sql(updateAlertQuery, [alert.id])
    }

    return triggeredAlerts
  } catch (error) {
    console.error("Erro ao verificar alertas de preço:", error)
    return []
  }
}

// Função para avaliar estratégias de trading
export async function evaluateStrategies(symbol: string, currentPrice: number, sql: any) {
  try {
    // Buscar estratégias ativas para o símbolo
    const strategiesQuery = `
      SELECT s.* FROM "Strategy" s
      JOIN "Alert" a ON s."userId" = a."userId"
      WHERE a.symbol = $1
      AND s.active = TRUE
      GROUP BY s.id
    `

    const strategies = await sql(strategiesQuery, [symbol])

    // Buscar dados históricos para análise
    const historicalDataQuery = `
      SELECT price, timestamp
      FROM "PriceHistory"
      WHERE symbol = $1
      ORDER BY timestamp DESC
      LIMIT 100
    `

    const historicalData = await sql(historicalDataQuery, [symbol])

    // Ordenar dados por timestamp (mais antigo primeiro)
    const sortedData = [...historicalData].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    )

    // Adicionar preço atual aos dados históricos
    const allPrices = [...sortedData.map((item: any) => Number.parseFloat(item.price)), currentPrice]

    // Array para armazenar sinais gerados
    const signals = []

    // Avaliar cada estratégia
    for (const strategy of strategies) {
      let signal = null

      switch (strategy.type) {
        case "MACD":
          signal = evaluateMACDStrategy(allPrices, strategy)
          break
        case "RSI":
          signal = evaluateRSIStrategy(allPrices, strategy)
          break
        case "BOLLINGER":
          signal = evaluateBollingerStrategy(allPrices, strategy)
          break
        default:
          continue
      }

      // Se houver sinal, criar notificação
      if (signal) {
        // Inserir notificação
        const notificationQuery = `
          INSERT INTO "Notification" (
            "userId",
            symbol,
            message,
            type,
            strategy,
            read
          )
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *
        `

        await sql(notificationQuery, [strategy.userId, symbol, signal.message, "strategy", strategy.type, false])

        signals.push({
          userId: strategy.userId,
          symbol,
          strategy: strategy.type,
          signal: signal.type,
          message: signal.message,
        })
      }
    }

    return signals
  } catch (error) {
    console.error("Erro ao avaliar estratégias:", error)
    return []
  }
}

// Função para calcular MACD
function calculateMACD(prices: number[], fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
  if (prices.length < slowPeriod + signalPeriod) {
    return null
  }

  // Calcular EMA rápida
  const fastEMA = calculateEMA(prices, fastPeriod)

  // Calcular EMA lenta
  const slowEMA = calculateEMA(prices, slowPeriod)

  // Calcular linha MACD
  const macdLine = fastEMA[fastEMA.length - 1] - slowEMA[slowEMA.length - 1]

  // Calcular linha de sinal
  const macdHistory = []
  for (let i = 0; i < fastEMA.length; i++) {
    if (i < slowPeriod - fastPeriod) {
      continue
    }
    macdHistory.push(fastEMA[i] - slowEMA[i - (slowPeriod - fastPeriod)])
  }

  const signalLine = calculateEMA(macdHistory, signalPeriod)[0]

  // Calcular histograma
  const histogram = macdLine - signalLine

  return {
    macdLine,
    signalLine,
    histogram,
  }
}

// Função para calcular EMA
function calculateEMA(prices: number[], period: number) {
  if (prices.length < period) {
    return []
  }

  const k = 2 / (period + 1)
  let ema = prices.slice(0, period).reduce((sum, price) => sum + price, 0) / period
  const emaValues = [ema]

  for (let i = period; i < prices.length; i++) {
    ema = prices[i] * k + ema * (1 - k)
    emaValues.push(ema)
  }

  return emaValues
}

// Função para calcular RSI
function calculateRSI(prices: number[], period = 14) {
  if (prices.length < period + 1) {
    return null
  }

  // Calcular mudanças de preço
  const changes = []
  for (let i = 1; i < prices.length; i++) {
    changes.push(prices[i] - prices[i - 1])
  }

  // Separar ganhos e perdas
  const gains = changes.map((change) => (change > 0 ? change : 0))
  const losses = changes.map((change) => (change < 0 ? Math.abs(change) : 0))

  // Calcular média de ganhos e perdas
  let avgGain = gains.slice(0, period).reduce((sum, gain) => sum + gain, 0) / period
  let avgLoss = losses.slice(0, period).reduce((sum, loss) => sum + loss, 0) / period

  // Calcular RS e RSI para o primeiro período
  let rs = avgGain / (avgLoss === 0 ? 0.001 : avgLoss) // Evitar divisão por zero
  const rsiValues = [100 - 100 / (1 + rs)]

  // Calcular RSI para os períodos restantes
  for (let i = period; i < changes.length; i++) {
    avgGain = (avgGain * (period - 1) + gains[i]) / period
    avgLoss = (avgLoss * (period - 1) + losses[i]) / period

    rs = avgGain / (avgLoss === 0 ? 0.001 : avgLoss)
    rsiValues.push(100 - 100 / (1 + rs))
  }

  return rsiValues[rsiValues.length - 1]
}

// Função para calcular Bandas de Bollinger
function calculateBollingerBands(prices: number[], period = 20, stdDev = 2) {
  if (prices.length < period) {
    return null
  }

  // Calcular SMA
  const sma = prices.slice(prices.length - period).reduce((sum, price) => sum + price, 0) / period

  // Calcular desvio padrão
  const squaredDiffs = prices.slice(prices.length - period).map((price) => Math.pow(price - sma, 2))
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / period
  const standardDeviation = Math.sqrt(variance)

  // Calcular bandas
  const upperBand = sma + standardDeviation * stdDev
  const lowerBand = sma - standardDeviation * stdDev

  return {
    sma,
    upperBand,
    lowerBand,
  }
}

// Função para avaliar estratégia MACD
function evaluateMACDStrategy(prices: number[], strategy: any) {
  const params = strategy.parameters
  const fastPeriod = params.fastPeriod || 12
  const slowPeriod = params.slowPeriod || 26
  const signalPeriod = params.signalPeriod || 9

  // Calcular MACD
  const macd = calculateMACD(prices, fastPeriod, slowPeriod, signalPeriod)

  if (!macd) {
    return null
  }

  // Verificar cruzamento de MACD
  const previousPrices = prices.slice(0, -1)
  const previousMACD = calculateMACD(previousPrices, fastPeriod, slowPeriod, signalPeriod)

  if (!previousMACD) {
    return null
  }

  // Cruzamento positivo (MACD cruza acima da linha de sinal)
  if (previousMACD.macdLine < previousMACD.signalLine && macd.macdLine > macd.signalLine) {
    return {
      type: "buy",
      message: `Sinal de compra baseado na estratégia MACD: Cruzamento positivo do MACD`,
    }
  }

  // Cruzamento negativo (MACD cruza abaixo da linha de sinal)
  if (previousMACD.macdLine > previousMACD.signalLine && macd.macdLine < macd.signalLine) {
    return {
      type: "sell",
      message: `Sinal de venda baseado na estratégia MACD: Cruzamento negativo do MACD`,
    }
  }

  return null
}

// Função para avaliar estratégia RSI
function evaluateRSIStrategy(prices: number[], strategy: any) {
  const params = strategy.parameters
  const period = params.period || 14
  const overbought = params.overbought || 70
  const oversold = params.oversold || 30

  // Calcular RSI
  const rsi = calculateRSI(prices, period)

  if (rsi === null) {
    return null
  }

  // Verificar condições de sobrevenda e sobrecompra
  if (rsi <= oversold) {
    return {
      type: "buy",
      message: `Sinal de compra baseado na estratégia RSI: RSI em condição de sobrevenda (${rsi.toFixed(1)})`,
    }
  }

  if (rsi >= overbought) {
    return {
      type: "sell",
      message: `Sinal de venda baseado na estratégia RSI: RSI em condição de sobrecompra (${rsi.toFixed(1)})`,
    }
  }

  return null
}

// Função para avaliar estratégia Bollinger Bands
function evaluateBollingerStrategy(prices: number[], strategy: any) {
  const params = strategy.parameters
  const period = params.period || 20
  const stdDev = params.stdDev || 2

  // Calcular Bandas de Bollinger
  const bollinger = calculateBollingerBands(prices, period, stdDev)

  if (!bollinger) {
    return null
  }

  const currentPrice = prices[prices.length - 1]

  // Verificar se o preço está abaixo da banda inferior (possível compra)
  if (currentPrice <= bollinger.lowerBand) {
    return {
      type: "buy",
      message: `Sinal de compra baseado na estratégia Bollinger Bands: Preço abaixo da banda inferior`,
    }
  }

  // Verificar se o preço está acima da banda superior (possível venda)
  if (currentPrice >= bollinger.upperBand) {
    return {
      type: "sell",
      message: `Sinal de venda baseado na estratégia Bollinger Bands: Preço acima da banda superior`,
    }
  }

  return null
}
