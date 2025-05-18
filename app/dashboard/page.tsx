"use client"

import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketChart } from "@/components/market-chart"
import { PortfolioDistribution } from "@/components/portfolio-distribution"
import { TransactionHistory } from "@/components/transaction-history"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { InvestmentOpportunities } from "@/components/investment/investment-opportunities"
import { WebsocketPriceFeed } from "@/components/websocket-price-feed"
import { HistoricalChart } from "@/components/historical-chart"
import { TradingAlerts } from "@/components/trading-alerts"
import { SocketProvider } from "@/components/socket-provider"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <SocketProvider userId="user-123">
      <div className="flex flex-col space-y-4 p-4 md:p-8">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
            <TabsTrigger value="trading">Trading</TabsTrigger>
            <TabsTrigger value="alerts">Alertas</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% desde o mês passado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Investimentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12.5%</div>
                  <p className="text-xs text-muted-foreground">+2.5% desde o mês passado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Estratégias Ativas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">+1 desde o mês passado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Transações Pendentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">-3 desde o mês passado</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Visão Geral do Mercado</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Suspense fallback={<div>Carregando gráfico...</div>}>
                    <MarketChart />
                  </Suspense>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Distribuição do Portfólio</CardTitle>
                  <CardDescription>Alocação entre estratégias</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Carregando distribuição...</div>}>
                    <PortfolioDistribution />
                  </Suspense>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Transações Recentes</CardTitle>
                  <CardDescription>Últimas 10 transações</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Carregando transações...</div>}>
                    <TransactionHistory />
                  </Suspense>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Métricas de Performance</CardTitle>
                  <CardDescription>Métricas chave ao longo do tempo</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Carregando métricas...</div>}>
                    <PerformanceMetrics />
                  </Suspense>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Oportunidades de Investimento</CardTitle>
                  <CardDescription>Estratégias recomendadas baseadas no seu perfil</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Carregando oportunidades...</div>}>
                    <InvestmentOpportunities />
                  </Suspense>
                </CardContent>
              </Card>
              <div className="space-y-4">
                <WebsocketPriceFeed />
                <Card>
                  <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-between" asChild>
                      <Link href="/dashboard/invest">
                        Investir Agora <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-between" asChild>
                      <Link href="/dashboard/portfolio">
                        Ver Portfólio <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-between" asChild>
                      <Link href="/dashboard/transactions">
                        Histórico de Transações <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Análise Histórica</CardTitle>
                  <CardDescription>Dados históricos com indicadores técnicos</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Carregando gráfico...</div>}>
                    <HistoricalChart symbol="BTC" showIndicators={true} height={500} />
                  </Suspense>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Indicadores Técnicos</CardTitle>
                  <CardDescription>Resumo dos principais indicadores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">RSI (14)</p>
                        <p className="text-xl font-bold">58.24</p>
                        <p className="text-xs text-muted-foreground">Neutro</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">MACD</p>
                        <p className="text-xl font-bold text-emerald-500">Positivo</p>
                        <p className="text-xs text-muted-foreground">Sinal de compra</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Bollinger</p>
                        <p className="text-xl font-bold">Médio</p>
                        <p className="text-xs text-muted-foreground">Dentro das bandas</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Tendência</p>
                        <p className="text-xl font-bold text-emerald-500">Alta</p>
                        <p className="text-xs text-muted-foreground">Acima da EMA 50</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Volume por Período</CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Carregando gráfico...</div>}>
                    <HistoricalChart symbol="BTC" showVolume={true} />
                  </Suspense>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Comparação de Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Carregando gráfico...</div>}>
                    <HistoricalChart symbol="ETH" />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trading" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Gráfico de Trading</CardTitle>
                  <CardDescription>Análise técnica em tempo real</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Carregando gráfico...</div>}>
                    <HistoricalChart symbol="BTC" showIndicators={true} height={600} />
                  </Suspense>
                </CardContent>
              </Card>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sinais de Trading</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-md bg-emerald-50 p-4 dark:bg-emerald-950">
                        <div className="font-medium text-emerald-900 dark:text-emerald-50">Sinal de Compra</div>
                        <div className="mt-1 text-sm text-emerald-800 dark:text-emerald-100">
                          BTC cruzamento positivo do MACD
                        </div>
                        <div className="mt-2 text-xs text-emerald-700 dark:text-emerald-200">Há 5 minutos</div>
                      </div>
                      <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-950">
                        <div className="font-medium text-amber-900 dark:text-amber-50">Alerta de Preço</div>
                        <div className="mt-1 text-sm text-amber-800 dark:text-amber-100">
                          ETH se aproximando da resistência em $3,850
                        </div>
                        <div className="mt-2 text-xs text-amber-700 dark:text-amber-200">Há 15 minutos</div>
                      </div>
                      <div className="rounded-md bg-rose-50 p-4 dark:bg-rose-950">
                        <div className="font-medium text-rose-900 dark:text-rose-50">Sinal de Venda</div>
                        <div className="mt-1 text-sm text-rose-800 dark:text-rose-100">
                          SOL RSI em condição de sobrecompra (78.5)
                        </div>
                        <div className="mt-2 text-xs text-rose-700 dark:text-rose-200">Há 32 minutos</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <WebsocketPriceFeed />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <TradingAlerts />
          </TabsContent>
        </Tabs>
      </div>
    </SocketProvider>
  )
}
