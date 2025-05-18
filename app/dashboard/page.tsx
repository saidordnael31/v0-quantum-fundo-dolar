"use client"

import { useEffect, useState, Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketChart } from "@/components/market-chart"
import { PortfolioDistribution } from "@/components/portfolio-distribution"
import { TransactionHistory } from "@/components/transaction-history"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { InvestmentOpportunities } from "@/components/investment/investment-opportunities"
import { WebsocketPriceFeed } from "@/components/websocket-price-feed"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-lg mb-4">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4 p-4 md:p-8">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
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
          <Card>
            <CardHeader>
              <CardTitle>Visão Geral de Análises</CardTitle>
              <CardDescription>Análises detalhadas do seu portfólio</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <p>Conteúdo de análises detalhadas será exibido aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visão Geral de Relatórios</CardTitle>
              <CardDescription>Relatórios personalizados do seu portfólio</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <p>Conteúdo de relatórios será exibido aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visão Geral de Notificações</CardTitle>
              <CardDescription>Suas notificações e alertas</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <p>Conteúdo de notificações será exibido aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
