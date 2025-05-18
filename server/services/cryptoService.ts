import axios from "axios"

// Função para buscar preço atual de uma criptomoeda
export async function fetchCryptoPrice(symbol: string): Promise<number | null> {
  try {
    // Mapear símbolo para o ID da CoinGecko
    const coinId = getCoinGeckoId(symbol)

    if (!coinId) {
      throw new Error(`Símbolo não suportado: ${symbol}`)
    }

    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`)

    if (!response.data || !response.data[coinId]) {
      throw new Error(`Dados não encontrados para ${symbol}`)
    }

    return response.data[coinId].usd
  } catch (error) {
    console.error(`Erro ao buscar preço de ${symbol}:`, error)
    return null
  }
}

// Função para buscar dados históricos de uma criptomoeda
export async function fetchHistoricalData(symbol: string, days: number): Promise<any[]> {
  try {
    // Mapear símbolo para o ID da CoinGecko
    const coinId = getCoinGeckoId(symbol)

    if (!coinId) {
      throw new Error(`Símbolo não suportado: ${symbol}`)
    }

    // Limitar dias a 365
    const limitedDays = Math.min(days, 365)

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${limitedDays}`,
    )

    if (!response.data || !response.data.prices) {
      throw new Error(`Dados históricos não encontrados para ${symbol}`)
    }

    // Formatar dados para o formato esperado
    return response.data.prices.map((item: [number, number]) => ({
      timestamp: new Date(item[0]).toISOString(),
      price: item[1],
      volume: 0, // A API de market_chart não retorna volume por ponto
      marketCap: 0, // A API de market_chart não retorna marketCap por ponto
    }))
  } catch (error) {
    console.error(`Erro ao buscar dados históricos de ${symbol}:`, error)
    throw error
  }
}

// Função auxiliar para mapear símbolo para ID da CoinGecko
function getCoinGeckoId(symbol: string): string | null {
  const mapping: Record<string, string> = {
    BTC: "bitcoin",
    ETH: "ethereum",
    SOL: "solana",
    BNB: "binancecoin",
  }

  return mapping[symbol] || null
}
