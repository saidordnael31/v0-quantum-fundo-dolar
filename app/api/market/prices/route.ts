import { NextResponse } from "next/server"

// Função para buscar dados de preço do Bitcoin da CoinGecko
async function fetchBitcoinPrice() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true",
    )

    if (!response.ok) {
      throw new Error(`Erro ao buscar preço do Bitcoin: ${response.status}`)
    }

    const data = await response.json()
    return data.bitcoin
  } catch (error) {
    console.error("Erro ao buscar preço do Bitcoin:", error)
    // Retornar dados simulados em caso de erro
    return {
      usd: 67245.32,
      usd_market_cap: 1320000000000,
      usd_24h_vol: 24500000000,
      usd_24h_change: 5.8,
    }
  }
}

// Função para buscar taxa de câmbio USD/BRL
async function fetchUsdBrlRate() {
  try {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD")

    if (!response.ok) {
      throw new Error(`Erro ao buscar taxa USD/BRL: ${response.status}`)
    }

    const data = await response.json()
    return data.rates.BRL
  } catch (error) {
    console.error("Erro ao buscar taxa USD/BRL:", error)
    // Retornar valor simulado em caso de erro
    return 5.05
  }
}

export async function GET() {
  try {
    // Buscar dados em paralelo
    const [bitcoinData, usdBrlRate] = await Promise.all([fetchBitcoinPrice(), fetchUsdBrlRate()])

    // Calcular preço do Bitcoin em BRL
    const btcBrlPrice = bitcoinData.usd * usdBrlRate

    // Construir resposta
    const marketData = {
      bitcoin: {
        usd: bitcoinData.usd,
        brl: btcBrlPrice,
        market_cap_usd: bitcoinData.usd_market_cap,
        volume_24h_usd: bitcoinData.usd_24h_vol,
        change_24h_percent: bitcoinData.usd_24h_change,
      },
      forex: {
        usd_brl: usdBrlRate,
      },
      timestamp: new Date().toISOString(),
      is_real_data: true,
    }

    return NextResponse.json(marketData)
  } catch (error) {
    console.error("Erro ao processar dados de mercado:", error)

    // Retornar dados simulados em caso de erro
    return NextResponse.json({
      bitcoin: {
        usd: 67245.32,
        brl: 339589.87,
        market_cap_usd: 1320000000000,
        volume_24h_usd: 24500000000,
        change_24h_percent: 5.8,
      },
      forex: {
        usd_brl: 5.05,
      },
      timestamp: new Date().toISOString(),
      is_real_data: false,
    })
  }
}
