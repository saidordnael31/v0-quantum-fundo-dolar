"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketChart } from "@/components/market-chart"
import { PortfolioDistribution } from "@/components/portfolio-distribution"
import { TransactionHistory } from "@/components/transaction-history"
import { PerformanceMetrics } from "@/components/performance-metrics"

export function DashboardOverview() {
  const t = useTranslations("dashboard")

  // Verificar se estamos no cliente
  if (typeof window === "undefined") {
    return <div>Loading dashboard...</div>
  }

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">{t("dashboard")}</h2>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
          <TabsTrigger value="analytics">{t("analytics")}</TabsTrigger>
          <TabsTrigger value="reports">{t("reports")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("notifications")}</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("totalAssets")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% {t("fromLastMonth")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("investments")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12.5%</div>
                <p className="text-xs text-muted-foreground">+2.5% {t("fromLastMonth")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("activeStrategies")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">+1 {t("fromLastMonth")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("pendingTransactions")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">-3 {t("fromLastMonth")}</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t("marketOverview")}</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <MarketChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{t("portfolioDistribution")}</CardTitle>
                <CardDescription>{t("allocationAcrossStrategies")}</CardDescription>
              </CardHeader>
              <CardContent>
                <PortfolioDistribution />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t("recentTransactions")}</CardTitle>
                <CardDescription>{t("last10Transactions")}</CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionHistory />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{t("performanceMetrics")}</CardTitle>
                <CardDescription>{t("keyMetricsOverTime")}</CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceMetrics />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("analyticsOverview")}</CardTitle>
              <CardDescription>{t("detailedAnalyticsDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <p>{t("analyticsContentPlaceholder")}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("reportsOverview")}</CardTitle>
              <CardDescription>{t("reportsDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <p>{t("reportsContentPlaceholder")}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("notificationsOverview")}</CardTitle>
              <CardDescription>{t("notificationsDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <p>{t("notificationsContentPlaceholder")}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
