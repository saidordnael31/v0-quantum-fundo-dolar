"use client"

import { useState } from "react"
import { ArrowDown, LineChartIcon, Percent, TrendingDown, TrendingUp } from "lucide-react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface BacktestResultsProps {
  results: {
    trades: Array<{
      date: string
      type: "buy" | "sell"
      price: number
      quantity: number
      value: number
      balance: number
      signal: string
    }>
    summary: {
      totalTrades: number
      winningTrades: number
      losingTrades: number
      winRate: number
      initialCapital: number
      finalCapital: number
      profit: number
      profitPercentage: number
      maxDrawdown: number
      sharpeRatio: number
    }
  }
}

export function BacktestResults({ results }: BacktestResultsProps) {
  const [activeTab, setActiveTab] = useState("summary")

  // Preparar dados para o gráfico de equity
  const equityData = results.trades.map((trade) => ({
    date: new Date(trade.date).toLocaleDateString(),
    balance: trade.balance,
    type: trade.type,
  }))

  // Adicionar ponto inicial ao gráfico
  equityData.unshift({
    date: new Date(results.trades[0]?.date || new Date()).toLocaleDateString(),
    balance: results.summary.initialCapital,
    type: "initial",
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados do Backtest</CardTitle>
        <CardDescription>Análise detalhada do desempenho da estratégia</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="summary">Resumo</TabsTrigger>
            <TabsTrigger value="trades">Trades</TabsTrigger>
            <TabsTrigger value="chart">Gráfico</TabsTrigger>
          </TabsList>

          <TabsContent value="summary">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Lucro</p>
                      <h4 className="text-2xl font-bold">${results.summary.profit.toFixed(2)}</h4>
                    </div>
                    <div className={`rounded-full p-2 ${results.summary.profit >= 0 ? "bg-green-100" : "bg-red-100"}`}>
                      {results.summary.profit >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {results.summary.profitPercentage >= 0 ? "+" : ""}
                    {results.summary.profitPercentage.toFixed(2)}%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Taxa de Acerto</p>
                      <h4 className="text-2xl font-bold">{results.summary.winRate.toFixed(1)}%</h4>
                    </div>
                    <div className="rounded-full p-2 bg-blue-100">
                      <Percent className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {results.summary.winningTrades} ganhos / {results.summary.losingTrades} perdas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Drawdown Máx.</p>
                      <h4 className="text-2xl font-bold">{results.summary.maxDrawdown.toFixed(2)}%</h4>
                    </div>
                    <div className="rounded-full p-2 bg-amber-100">
                      <ArrowDown className="h-4 w-4 text-amber-600" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Queda máxima do capital</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Sharpe Ratio</p>
                      <h4 className="text-2xl font-bold">{results.summary.sharpeRatio.toFixed(2)}</h4>
                    </div>
                    <div className="rounded-full p-2 bg-purple-100">
                      <LineChartIcon className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Retorno ajustado ao risco</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Resumo Financeiro</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-muted-foreground">Capital Inicial</dt>
                      <dd className="text-sm font-medium">${results.summary.initialCapital.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-muted-foreground">Capital Final</dt>
                      <dd className="text-sm font-medium">${results.summary.finalCapital.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-muted-foreground">Lucro Absoluto</dt>
                      <dd
                        className={`text-sm font-medium ${results.summary.profit >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        ${results.summary.profit.toFixed(2)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-muted-foreground">Lucro Percentual</dt>
                      <dd
                        className={`text-sm font-medium ${results.summary.profitPercentage >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {results.summary.profitPercentage >= 0 ? "+" : ""}
                        {results.summary.profitPercentage.toFixed(2)}%
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Estatísticas de Trades</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-muted-foreground">Total de Trades</dt>
                      <dd className="text-sm font-medium">{results.summary.totalTrades}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-muted-foreground">Trades Vencedores</dt>
                      <dd className="text-sm font-medium text-green-600">{results.summary.winningTrades}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-muted-foreground">Trades Perdedores</dt>
                      <dd className="text-sm font-medium text-red-600">{results.summary.losingTrades}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-muted-foreground">Taxa de Acerto</dt>
                      <dd className="text-sm font-medium">{results.summary.winRate.toFixed(2)}%</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trades">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Saldo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.trades.map((trade, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(trade.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={trade.type === "buy" ? "outline" : "default"}>
                          {trade.type === "buy" ? "Compra" : "Venda"}
                        </Badge>
                      </TableCell>
                      <TableCell>${trade.price.toFixed(2)}</TableCell>
                      <TableCell>{trade.quantity.toFixed(6)}</TableCell>
                      <TableCell>${trade.value.toFixed(2)}</TableCell>
                      <TableCell>${trade.balance.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="chart">
            <div className="h-[400px] w-full">
              <ChartContainer
                config={{
                  balance: {
                    label: "Saldo",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={equityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => value} />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <ReferenceLine y={results.summary.initialCapital} stroke="#888" strokeDasharray="3 3" />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="var(--color-balance)"
                      dot={(props) => {
                        const { cx, cy, payload } = props
                        if (payload.type === "buy") {
                          return <circle cx={cx} cy={cy} r={4} fill="#22c55e" />
                        } else if (payload.type === "sell") {
                          return <circle cx={cx} cy={cy} r={4} fill="#ef4444" />
                        }
                        return null
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
