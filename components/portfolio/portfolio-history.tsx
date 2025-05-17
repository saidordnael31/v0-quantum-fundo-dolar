"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

// Generate sample data based on timeframe
const generateData = (timeframe: string) => {
  const data = []
  let days = 30

  switch (timeframe) {
    case "1m":
      days = 30
      break
    case "3m":
      days = 90
      break
    case "1y":
      days = 365
      break
    case "all":
      days = 730
      break
  }

  let value = 1000000
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  for (let i = 0; i <= days; i += days > 90 ? 7 : 1) {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + i)

    // Add some randomness to the value
    const change = (Math.random() - 0.45) * 0.03
    value = value * (1 + change)

    data.push({
      date: currentDate.toISOString().split("T")[0],
      value: Math.round(value),
    })
  }

  return data
}

interface PortfolioHistoryProps {
  timeframe: string
}

export function PortfolioHistory({ timeframe }: PortfolioHistoryProps) {
  const data = generateData(timeframe)

  // Calculate overall change
  const startValue = data[0].value
  const endValue = data[data.length - 1].value
  const percentChange = ((endValue - startValue) / startValue) * 100
  const isPositive = percentChange >= 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Total Change</p>
          <p className={`text-2xl font-bold ${isPositive ? "text-emerald-500" : "text-rose-500"}`}>
            {isPositive ? "+" : ""}
            {percentChange.toFixed(2)}%
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Starting Value</p>
          <p className="text-lg font-semibold">${startValue.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Current Value</p>
          <p className="text-lg font-semibold">${endValue.toLocaleString()}</p>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const date = new Date(value)
                if (timeframe === "1m") {
                  return `${date.getDate()}/${date.getMonth() + 1}`
                } else if (timeframe === "3m") {
                  return date.getDate() % 15 === 0 ? `${date.getDate()}/${date.getMonth() + 1}` : ""
                } else {
                  return `${date.getMonth() + 1}/${date.getFullYear().toString().substr(2, 2)}`
                }
              }}
            />
            <YAxis
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              domain={["dataMin - 50000", "dataMax + 50000"]}
            />
            <Tooltip
              formatter={(value) => [`$${Number(value).toLocaleString()}`, "Portfolio Value"]}
              labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
            />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
