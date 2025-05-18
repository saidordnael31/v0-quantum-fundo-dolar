"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { useSocket } from "./socket-provider"

interface HistoricalChartProps {
  symbol: string
  title?: string
  height?: number
  showVolume?: boolean
  showIndicators?: boolean
}

export function HistoricalChart({
  symbol,
  title = "Histórico de Preços",
  height = 400,
  showVolume = false,
  showIndicators = false,
}: HistoricalChartProps) {
  const { socket, isConnected } = useSocket()
  const [period, setPeriod] = useState("1d")
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [indicators, setIndicators] = useState<{
    sma20: number[]
    ema50: number[]
    upperBand: number[]
    lowerBand: number[]
  }>({
    sma20: [],
    ema50: [],
    upperBand: [],
    lowerBand: [],
  })

  // Função para buscar dados históricos
  const fetchHistoricalData = () => {
    if (!socket || !isConnected) return

    setLoading(true)
    setError(null)

    // Converter período para dias
    const days = period === "1d" ? 1 : period === "1w" ? 7 : period === "1m" ? 30 : period === "3m" ? 90 : 365

    // Emitir evento para solicitar dados históricos
    socket.emit("getHistoricalData", { symbol, days }, (response: any) => {
      if (response.error) {
        setError(response.error)
        setLoading(false)
        return
      }

      setData(response.data)

      // Calcular indicadores se necessário
      if (showIndicators) {
        calculateIndicators(response.data)
      }

      setLoading(false)
    })
  }

  // Calcular indicadores técnicos
  const calculateIndicators = (priceData: any[]) => {
    if (priceData.length < 20) return

    const prices = priceData.map((d) => d.price)

    // Calcular SMA 20
    const sma20 = []
    for (let i = 19; i < prices.length; i++) {
      const slice = prices.slice(i - 19, i + 1)
      const avg = slice.reduce((sum, price) => sum + price, 0) / 20
      sma20.push(avg)
    }

    // Calcular EMA 50
    const ema50 = []
    const k = 2 / 51 // Fator de suavização
    let emaValue = prices.slice(0, 50).reduce((sum, price) => sum + price, 0) / 50

    for (let i = 49; i < prices.length; i++) {
      emaValue = prices[i] * k + emaValue * (1 - k)
      ema50.push(emaValue)
    }

    // Calcular Bandas de Bollinger (baseadas na SMA 20)
    const upperBand = []
    const lowerBand = []
    const multiplier = 2 // Desvio padrão multiplicador

    for (let i = 19; i < prices.length; i++) {
      const slice = prices.slice(i - 19, i + 1)
      const avg = slice.reduce((sum, price) => sum + price, 0) / 20

      // Calcular desvio padrão
      const squaredDiffs = slice.map((price) => Math.pow(price - avg, 2))
      const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / 20
      const stdDev = Math.sqrt(variance)

      upperBand.push(avg + multiplier * stdDev)
      lowerBand.push(avg - multiplier * stdDev)
    }

    setIndicators({
      sma20: sma20,
      ema50: ema50,
      upperBand: upperBand,
      lowerBand: lowerBand,
    })
  }

  // Efeito para buscar dados quando o período ou símbolo mudar
  useEffect(() => {
    if (isConnected) {
      fetchHistoricalData()
    }
  }, [period, symbol, isConnected])

  // Renderizar esqueleto de carregamento
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={period} onValueChange={setPeriod} className="mb-4">
            <TabsList>
              <TabsTrigger value="1d">1D</TabsTrigger>
              <TabsTrigger value="1w">1S</TabsTrigger>
              <TabsTrigger value="1m">1M</TabsTrigger>
              <TabsTrigger value="3m">3M</TabsTrigger>
              <TabsTrigger value="1y">1A</TabsTrigger>
            </TabsList>
          </Tabs>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    )
  }

  // Preparar dados para o gráfico
  const chartData = data.map((item, index) => {
    const result: any = {
      timestamp: new Date(item.timestamp).toLocaleString(),
      price: item.price,
    }

    if (showVolume && item.volume) {
      result.volume = item.volume
    }

    if (showIndicators) {
      // Adicionar indicadores se disponíveis para este ponto
      if (index >= 19 && indicators.sma20[index - 19]) {
        result.sma20 = indicators.sma20[index - 19]
      }

      if (index >= 49 && indicators.ema50[index - 49]) {
        result.ema50 = indicators.ema50[index - 49]
      }

      if (index >= 19 && indicators.upperBand[index - 19]) {
        result.upperBand = indicators.upperBand[index - 19]
        result.lowerBand = indicators.lowerBand[index - 19]
      }
    }

    return result
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={period} onValueChange={setPeriod} className="mb-4">
          <TabsList>
            <TabsTrigger value="1d">1D</TabsTrigger>
            <TabsTrigger value="1w">1S</TabsTrigger>
            <TabsTrigger value="1m">1M</TabsTrigger>
            <TabsTrigger value="3m">3M</TabsTrigger>
            <TabsTrigger value="1y">1A</TabsTrigger>
          </TabsList>
        </Tabs>

        {error ? (
          <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed p-8">
            <p className="text-center text-muted-foreground">{error}</p>
          </div>
        ) : (
          <div style={{ height: `${height}px` }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    if (period === "1d") {
                      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    }
                    return date.toLocaleDateString()
                  }}
                />
                <YAxis domain={["auto", "auto"]} tickFormatter={(value) => `$${value.toLocaleString()}`} />
                <Tooltip
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "Preço"]}
                  labelFormatter={(label) => `Data: ${label}`}
                />

                {/* Linha principal de preço */}
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />

                {/* Indicadores técnicos */}
                {showIndicators && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="sma20"
                      stroke="#3b82f6"
                      strokeWidth={1.5}
                      dot={false}
                      name="SMA 20"
                    />
                    <Line
                      type="monotone"
                      dataKey="ema50"
                      stroke="#8b5cf6"
                      strokeWidth={1.5}
                      dot={false}
                      name="EMA 50"
                    />
                    <Line
                      type="monotone"
                      dataKey="upperBand"
                      stroke="#f43f5e"
                      strokeWidth={1}
                      strokeDasharray="3 3"
                      dot={false}
                      name="Banda Superior"
                    />
                    <Line
                      type="monotone"
                      dataKey="lowerBand"
                      stroke="#f43f5e"
                      strokeWidth={1}
                      strokeDasharray="3 3"
                      dot={false}
                      name="Banda Inferior"
                    />
                  </>
                )}

                {/* Volume */}
                {showVolume && (
                  <Line
                    type="monotone"
                    dataKey="volume"
                    stroke="#94a3b8"
                    strokeWidth={1}
                    dot={false}
                    name="Volume"
                    yAxisId={1}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
