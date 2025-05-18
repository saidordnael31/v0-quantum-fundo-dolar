"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Interface para os dados da API
interface PriceData {
  date: string
  price: number
  volume: number
}

export function MarketChart() {
  const [data, setData] = useState<PriceData[]>([])
  const [period, setPeriod] = useState("30d")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPrice, setCurrentPrice] = useState<number | null>(null)
  const [priceChange, setPriceChange] = useState<number | null>(null)
  const [volume24h, setVolume24h] = useState<number | null>(null)

  // Função para buscar dados da API
  const fetchPriceData = async (days: number) => {
    setLoading(true)
    setError(null)

    try {
      // Usar a API CoinGecko para dados reais de BTC
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}&interval=daily`,
      )

      if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.status}`)
      }

      const apiData = await response.json()

      // Processar dados da API
      const formattedData: PriceData[] = apiData.prices.map((item: [number, number], index: number) => {
        const date = new Date(item[0])
        return {
          date: date.toLocaleDateString(),
          price: Number.parseFloat(item[1].toFixed(2)),
          volume: apiData.total_volumes[index] ? apiData.total_volumes[index][1] : 0,
        }
      })

      // Atualizar dados do gráfico
      setData(formattedData)

      // Atualizar métricas atuais
      if (formattedData.length > 0) {
        const latest = formattedData[formattedData.length - 1]
        const first = formattedData[0]
        setCurrentPrice(latest.price)

        // Calcular variação percentual
        const change = ((latest.price - first.price) / first.price) * 100
        setPriceChange(Number.parseFloat(change.toFixed(2)))

        // Volume das últimas 24h (último ponto de dados)
        setVolume24h(latest.volume)
      }
    } catch (err) {
      console.error("Erro ao buscar dados de preço:", err)
      setError("Não foi possível carregar os dados de preço. Usando dados simulados.")

      // Usar dados simulados em caso de erro
      const simulatedData = generateChartData(days, 67000, days === 7 ? 0.03 : days === 30 ? 0.05 : 0.08)
      setData(simulatedData)

      // Definir métricas simuladas
      setCurrentPrice(67245.32)
      setPriceChange(5.8)
      setVolume24h(24.5 * 1000000000) // $24.5B
    } finally {
      setLoading(false)
    }
  }

  // Efeito para buscar dados quando o período mudar
  useEffect(() => {
    const days = period === "7d" ? 7 : period === "30d" ? 30 : 90
    fetchPriceData(days)

    // Configurar atualização a cada 30 segundos para dados em tempo real
    const intervalId = setInterval(() => {
      fetchPriceData(days)
    }, 30000) // 30 segundos

    return () => clearInterval(intervalId)
  }, [period])

  // Função para gerar dados simulados (backup)
  const generateChartData = (days: number, startPrice: number, volatility: number) => {
    const data: PriceData[] = []
    let currentPrice = startPrice

    for (let i = 0; i < days; i++) {
      // Simular movimento de preço com alguma volatilidade
      const change = (Math.random() - 0.5) * volatility
      currentPrice = currentPrice * (1 + change)

      data.push({
        date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        price: Number.parseFloat(currentPrice.toFixed(2)),
        volume: Math.floor(Math.random() * 1000) + 500,
      })
    }

    return data
  }

  // Renderizar esqueleto de carregamento
  if (loading) {
    return (
      <div className="space-y-4">
        <Tabs value={period} onValueChange={setPeriod} className="w-full">
          <TabsList className="grid w-full max-w-xs grid-cols-3">
            <TabsTrigger value="7d">7D</TabsTrigger>
            <TabsTrigger value="30d">30D</TabsTrigger>
            <TabsTrigger value="90d">90D</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="h-[300px] w-full">
          <Skeleton className="h-full w-full" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Atenção</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs value={period} onValueChange={setPeriod} className="w-full">
        <TabsList className="grid w-full max-w-xs grid-cols-3">
          <TabsTrigger value="7d">7D</TabsTrigger>
          <TabsTrigger value="30d">30D</TabsTrigger>
          <TabsTrigger value="90d">90D</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                if (period === "7d") return value
                if (period === "30d") {
                  // Mostrar apenas algumas datas para não sobrecarregar o eixo
                  const date = new Date(value)
                  return date.getDate() % 5 === 0 ? `${date.getDate()}/${date.getMonth() + 1}` : ""
                }
                return ""
              }}
            />
            <YAxis
              domain={["dataMin - 1000", "dataMax + 1000"]}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              formatter={(value) => [`$${Number(value).toLocaleString()}`, "Preço"]}
              labelFormatter={(label) => `Data: ${label}`}
            />
            <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Preço Atual</div>
            <div className="text-xl font-bold">${currentPrice?.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Atualizado em tempo real</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Variação no Período</div>
            <div
              className={`text-xl font-bold ${priceChange && priceChange >= 0 ? "text-emerald-500" : "text-rose-500"}`}
            >
              {priceChange && priceChange >= 0 ? "+" : ""}
              {priceChange}%
            </div>
            <div className="text-xs text-muted-foreground">
              Últimos {period === "7d" ? "7 dias" : period === "30d" ? "30 dias" : "90 dias"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Volume 24h</div>
            <div className="text-xl font-bold">${volume24h ? (volume24h / 1000000000).toFixed(1) + "B" : "N/A"}</div>
            <div className="text-xs text-muted-foreground">Últimas 24 horas</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
