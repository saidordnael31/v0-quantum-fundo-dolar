"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados simulados para o gráfico
const generateChartData = (days: number, startPrice: number, volatility: number) => {
  const data = []
  let currentPrice = startPrice

  for (let i = 0; i < days; i++) {
    // Simular movimento de preço com alguma volatilidade
    const change = (Math.random() - 0.5) * volatility
    currentPrice = currentPrice * (1 + change)

    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      price: currentPrice.toFixed(2),
      volume: Math.floor(Math.random() * 1000) + 500,
    })
  }

  return data
}

export function MarketChart() {
  const [data, setData] = useState([])
  const [period, setPeriod] = useState("30d")

  useEffect(() => {
    // Diferentes períodos têm diferentes volatilidades e pontos de dados
    const days = period === "7d" ? 7 : period === "30d" ? 30 : 90
    const volatility = period === "7d" ? 0.03 : period === "30d" ? 0.05 : 0.08

    setData(generateChartData(days, 67000, volatility))
  }, [period])

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
            <div className="text-xl font-bold">$67,245.32</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Variação no Período</div>
            <div className="text-xl font-bold text-emerald-500">+5.8%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Volume 24h</div>
            <div className="text-xl font-bold">$24.5B</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
