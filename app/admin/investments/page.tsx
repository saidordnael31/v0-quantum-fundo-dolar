"use client"

import { useEffect, useState } from "react"
import type { Investment } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Download, TrendingUp } from "lucide-react"

export default function AdminInvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([])
  const [filteredInvestments, setFilteredInvestments] = useState<Investment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [strategyFilter, setStrategyFilter] = useState("all")

  useEffect(() => {
    fetchInvestments()
  }, [])

  useEffect(() => {
    filterInvestments()
  }, [investments, searchQuery, statusFilter, strategyFilter])

  async function fetchInvestments() {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/investments")
      const data = await response.json()
      setInvestments(data)
      setFilteredInvestments(data)
    } catch (error) {
      console.error("Error fetching investments:", error)
    } finally {
      setIsLoading(false)
    }
  }

  function filterInvestments() {
    let result = [...investments]

    // Filtrar por status
    if (statusFilter !== "all") {
      result = result.filter((inv) => inv.status === statusFilter)
    }

    // Filtrar por estratégia
    if (strategyFilter !== "all") {
      result = result.filter((inv) => inv.strategy === strategyFilter)
    }

    // Filtrar por pesquisa
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((inv) => inv.id.toLowerCase().includes(query) || inv.userId.toLowerCase().includes(query))
    }

    setFilteredInvestments(result)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
          >
            Active
          </Badge>
        )
      case "closed":
        return (
          <Badge variant="outline" className="bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400">
            Closed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStrategyBadge = (strategy: string) => {
    switch (strategy) {
      case "conservative":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            Conservative
          </Badge>
        )
      case "balanced":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
            Balanced
          </Badge>
        )
      case "aggressive":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
            Aggressive
          </Badge>
        )
      case "quantum":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
          >
            Quantum AI
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="capitalize">
            {strategy}
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Investments</h1>
      <p className="text-gray-500">Manage investment strategies.</p>

      <div className="rounded-lg bg-white p-6 shadow">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
          </div>
        ) : filteredInvestments.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Investment Management</CardTitle>
              <CardDescription>View and manage all investments in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={strategyFilter} onValueChange={setStrategyFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Strategies</SelectItem>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                      <SelectItem value="quantum">Quantum AI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>

              <div className="overflow-x-auto rounded-lg bg-white shadow">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Strategy</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Current Value</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvestments.map((investment) => (
                      <TableRow key={investment.id}>
                        <TableCell className="font-medium">
                          <span className="font-mono text-xs">{investment.id}</span>
                        </TableCell>
                        <TableCell>{investment.userId}</TableCell>
                        <TableCell>{getStrategyBadge(investment.strategy)}</TableCell>
                        <TableCell>
                          {investment.currency === "USD" ? "$" : ""}
                          {investment.amount.toLocaleString()}
                          {investment.currency === "BTC" ? " BTC" : ""}
                        </TableCell>
                        <TableCell>
                          {investment.currency === "USD" ? "$" : ""}
                          {investment.currentValue.toLocaleString()}
                          {investment.currency === "BTC" ? " BTC" : ""}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <TrendingUp className="mr-1 h-4 w-4 text-emerald-500" />
                            <span className="text-emerald-500">
                              {investment.profitPercentage}% ({investment.currency === "USD" ? "$" : ""}
                              {investment.profit.toLocaleString()}
                              {investment.currency === "BTC" ? " BTC" : ""})
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(investment.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Update Value</DropdownMenuItem>
                              {investment.status === "active" && <DropdownMenuItem>Close Investment</DropdownMenuItem>}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <p>No investments to display.</p>
        )}
      </div>
    </div>
  )
}
