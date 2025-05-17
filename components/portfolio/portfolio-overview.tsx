"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioDistribution } from "@/components/portfolio-distribution"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { PortfolioHistory } from "@/components/portfolio/portfolio-history"
import { PortfolioAllocations } from "@/components/portfolio/portfolio-allocations"

export function PortfolioOverview() {
  const [timeframe, setTimeframe] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Portfolio Overview</h2>
          <p className="text-muted-foreground">Track your investments and performance metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full">
            <TabsList className="grid w-full max-w-xs grid-cols-4">
              <TabsTrigger value="1m">1M</TabsTrigger>
              <TabsTrigger value="3m">3M</TabsTrigger>
              <TabsTrigger value="1y">1Y</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Allocation</CardTitle>
            <CardDescription>Your portfolio distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioDistribution />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>Returns over time</CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceMetrics />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio History</CardTitle>
          <CardDescription>Value changes over time</CardDescription>
        </CardHeader>
        <CardContent>
          <PortfolioHistory timeframe={timeframe} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Asset Allocations</CardTitle>
          <CardDescription>Detailed breakdown of your investments</CardDescription>
        </CardHeader>
        <CardContent>
          <PortfolioAllocations />
        </CardContent>
      </Card>
    </div>
  )
}
