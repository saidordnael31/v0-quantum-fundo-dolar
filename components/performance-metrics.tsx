"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados simulados para métricas de performance
const monthlyReturns = [
  { month: "Jan", return: 4.2 },
  { month: "Fev", return: -2.1 },
  { month: "Mar", return: 5.7 },
  { month: "Abr", return: 3.2 },
  { month: "Mai", return: 8.3 },
]

const cumulativeReturns = [
  { month: "Jan", quantum: 4.2, btc: 3.1, sp500: 1.8 },
  { month: "Fev", quantum: 2.0, btc: -1.2, sp500: 2.3 },
  { month: "Mar", quantum: 7.8, btc: 5.4, sp500: 3.1 },
  { month: "Abr", quantum: 11.3, btc: 8.7, sp500: 4.2 },
  { month: "Mai", quantum: 20.5, btc: 15.2, sp500: 5.1 },
]

const riskMetrics = {
  sharpeRatio: 2.4,
  volatility: 18.7,
  maxDrawdown: 12.3,
  beta: 0.75,
  alpha: 5.2,
}

export function PerformanceMetrics() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="returns" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="returns">Retornos</TabsTrigger>
          <TabsTrigger value="comparison">Comparativo</TabsTrigger>
        </TabsList>

        <TabsContent value="returns" className="space-y-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyReturns} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, "Retorno"]} />
                <Bar
                  dataKey="return"
                  fill={(entry) => (entry.return >= 0 ? "#10b981" : "#ef4444")}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Retorno YTD</div>
                <div className="text-xl font-bold text-emerald-500">+20.5%</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Retorno Anualizado</div>
                <div className="text-xl font-bold text-emerald-500">+42.8%</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Melhor Mês</div>
                <div className="text-xl font-bold text-emerald-500">+8.3% (Mai)</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Pior Mês</div>
                <div className="text-xl font-bold text-rose-500">-2.1% (Fev)</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cumulativeReturns} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, "Retorno"]} />
                <Line
                  type="monotone"
                  dataKey="quantum"
                  name="Akin Quantum Hedge Fund"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="btc"
                  name="Bitcoin"
                  stroke="#f7931a"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="sp500"
                  name="S&P 500"
                  stroke="#6b7280"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Métricas de Risco</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Sharpe Ratio</div>
                  <div className="text-xl font-bold">{riskMetrics.sharpeRatio}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Volatilidade</div>
                  <div className="text-xl font-bold">{riskMetrics.volatility}%</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Max Drawdown</div>
                  <div className="text-xl font-bold">{riskMetrics.maxDrawdown}%</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Beta</div>
                  <div className="text-xl font-bold">{riskMetrics.beta}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Alpha</div>
                  <div className="text-xl font-bold">{riskMetrics.alpha}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-2">Análise Akin Quantum</h3>
          <p className="text-sm text-muted-foreground">
            Nossa abordagem de investimento Akin Quantum tem superado consistentemente o Bitcoin e os índices
            tradicionais, com menor volatilidade e drawdowns. A estratégia de alocação dinâmica entre BTC e USD, baseada
            em algoritmos Akin Quantum, permite capturar os movimentos de alta do Bitcoin enquanto protege o capital
            durante períodos de queda.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
