"use client"

import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados de exemplo para o gráfico
const generateChartData = (period: string) => {
  const data = []
  const now = new Date()
  let numPoints = 0
  let startDate = new Date()
  let dateFormat = ""

  switch (period) {
    case "7d":
      numPoints = 7
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      dateFormat = "dd/MM"
      break
    case "30d":
      numPoints = 30
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      dateFormat = "dd/MM"
      break
    case "3m":
      numPoints = 12 // 12 weeks
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
      dateFormat = "dd/MM"
      break
    case "1y":
      numPoints = 12 // 12 months
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
      dateFormat = "MMM"
      break
  }

  let aum = 1000000 // Começar com $1M
  let revenue = 20000 // Começar com $20k

  for (let i = 0; i < numPoints; i++) {
    const date = new Date(startDate.getTime() + (i * (now.getTime() - startDate.getTime())) / (numPoints - 1))

    // Adicionar alguma variação aleatória
    const aumChange = (Math.random() - 0.3) * 0.05 // -3% a +2%
    const revenueChange = (Math.random() - 0.3) * 0.08 // -3% a +5%

    aum = aum * (1 + aumChange)
    revenue = revenue * (1 + revenueChange)

    data.push({
      date: date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: period === "1y" ? "short" : "2-digit",
        year: period === "1y" ? "numeric" : undefined,
      }),
      aum: Math.round(aum),
      revenue: Math.round(revenue),
    })
  }

  return data
}

export function AdminOverviewChart() {
  const [period, setPeriod] = useState("30d")
  const data = generateChartData(period)

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(value, name) => [
                `$${Number(value).toLocaleString()}`,
                name === "aum" ? "Assets Under Management" : "Revenue",
              ]}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="aum"
              name="Assets Under Management"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
