"use client"

import { useState, useEffect } from "react"

// Interface para os dados de mercado
export interface MarketData {
  bitcoin: {
    usd: number
    brl: number
    market_cap_usd: number
    volume_24h_usd: number
    change_24h_percent: number
  }
  forex: {
    usd_brl: number
  }
  timestamp: string
  is_real_data: boolean
}

// Hook para buscar e atualizar dados em tempo real
export function useRealTimeData(refreshInterval = 10000) {
  const [data, setData] = useState<MarketData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Função para buscar dados
  const fetchData = async () => {
    try {
      const response = await fetch("/api/market/prices")

      if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.status}`)
      }

      const marketData = await response.json()
      setData(marketData)
      setError(null)
    } catch (err) {
      console.error("Erro ao buscar dados em tempo real:", err)
      setError("Falha ao buscar dados em tempo real. Usando dados simulados.")

      // Definir dados simulados em caso de erro
      setData({
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
    } finally {
      setLoading(false)
    }
  }

  // Efeito para buscar dados iniciais e configurar intervalo de atualização
  useEffect(() => {
    fetchData()

    // Configurar intervalo para atualização em tempo real
    const intervalId = setInterval(fetchData, refreshInterval)

    // Limpar intervalo quando o componente for desmontado
    return () => clearInterval(intervalId)
  }, [refreshInterval])

  return { data, loading, error, refetch: fetchData }
}
