"use client"

import { useState } from "react"
import Link from "next/link"
import { DollarSign, Bitcoin, TrendingUp, Activity, PieChart, History, Settings, LogOut } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MarketChart } from "@/components/market-chart"
import { TransactionHistory } from "@/components/transaction-history"
import { InvestmentOpportunities } from "@/components/investment/investment-opportunities"
import { useToast } from "@/hooks/use-toast"
import { Logo } from "@/components/logo"

export function DashboardOverview() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Logo />
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <TrendingUp className="h-4 w-4" />
            <span>BTC/USD: $67,245.32</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              toast({
                title: "Logged out",
                description: "You have been successfully logged out.",
              })
              // In a real app, this would redirect to login
            }}
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
          <nav className="grid gap-2">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 ${activeTab === "overview" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`}
              onClick={() => setActiveTab("overview")}
            >
              <Activity className="h-5 w-5" />
              <span>Overview</span>
            </Link>
            <Link
              href="/dashboard/invest"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 ${activeTab === "invest" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`}
              onClick={() => setActiveTab("invest")}
            >
              <DollarSign className="h-5 w-5" />
              <span>Invest</span>
            </Link>
            <Link
              href="/dashboard/portfolio"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 ${activeTab === "portfolio" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`}
              onClick={() => setActiveTab("portfolio")}
            >
              <PieChart className="h-5 w-5" />
              <span>Portfolio</span>
            </Link>
            <Link
              href="/dashboard/transactions"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 ${activeTab === "transactions" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`}
              onClick={() => setActiveTab("transactions")}
            >
              <History className="h-5 w-5" />
              <span>Transactions</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 ${activeTab === "settings" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,245,678.00</div>
                <p className="text-xs text-muted-foreground">+12.5% since inception</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">BTC Allocation</CardTitle>
                <Bitcoin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.45 BTC</div>
                <p className="text-xs text-muted-foreground">$837,452.24</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">USD Allocation</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$408,225.76</div>
                <p className="text-xs text-muted-foreground">32.8% of portfolio</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Monthly Return</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+8.3%</div>
                <p className="text-xs text-muted-foreground">+$95,432.12</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Market Overview</CardTitle>
                <CardDescription>BTC/USD price and volume analysis</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <MarketChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Opportunities</CardTitle>
                <CardDescription>Available strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <InvestmentOpportunities />
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest investment activities</CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionHistory limit={5} />
                <div className="mt-4 flex justify-center">
                  <Button asChild variant="outline">
                    <Link href="/dashboard/transactions">View All Transactions</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
