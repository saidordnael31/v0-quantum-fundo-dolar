"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AdminDashboardStats } from "@/lib/types"
import { AdminOverviewChart } from "@/components/admin/admin-overview-chart"
import { AdminRecentTransactions } from "@/components/admin/admin-recent-transactions"
import { AdminUserActivity } from "@/components/admin/admin-user-activity"
import { Users, DollarSign, TrendingUp, AlertCircle } from "lucide-react"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/admin/dashboard/stats")
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <p className="text-3xl font-bold">{stats?.totalUsers || 0}</p>
              <p className="text-xs text-muted-foreground">{stats?.activeUsers || 0} active</p>
            </div>
            <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900/30">
              <Users className="h-6 w-6 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Assets Under Management</p>
              <p className="text-3xl font-bold">${(stats?.assetsUnderManagement || 0).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{stats?.totalInvestments || 0} active investments</p>
            </div>
            <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900/30">
              <TrendingUp className="h-6 w-6 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Revenue This Month</p>
              <p className="text-3xl font-bold">${(stats?.revenueThisMonth || 0).toLocaleString()}</p>
              <p className="text-xs text-emerald-500">+12% from last month</p>
            </div>
            <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900/30">
              <DollarSign className="h-6 w-6 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Transactions</p>
              <p className="text-3xl font-bold">{stats?.pendingTransactions || 0}</p>
              <p className="text-xs text-amber-500">Requires attention</p>
            </div>
            <div className="rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
              <AlertCircle className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="users">User Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Assets under management and revenue over time</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminOverviewChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest transactions across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminRecentTransactions />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Recent user registrations and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminUserActivity />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
