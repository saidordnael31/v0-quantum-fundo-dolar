"use client"

import { useEffect, useState } from "react"
import type { Transaction } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, CreditCard } from "lucide-react"

export function AdminRecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/admin/transactions?limit=10")
        const data = await response.json()
        setTransactions(data.slice(0, 10)) // Limitar a 10 transações
      } catch (error) {
        console.error("Error fetching transactions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    )
  }

  if (transactions.length === 0) {
    return <p className="text-center text-muted-foreground">No transactions found.</p>
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownRight className="h-4 w-4 text-emerald-500" />
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-rose-500" />
      case "investment":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      case "profit":
        return <TrendingUp className="h-4 w-4 text-emerald-500" />
      case "fee":
        return <DollarSign className="h-4 w-4 text-amber-500" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
          >
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getTransactionIcon(transaction.type)}
                  <span className="capitalize">{transaction.type}</span>
                </div>
              </TableCell>
              <TableCell>{transaction.userId}</TableCell>
              <TableCell>
                {transaction.currency === "USD" ? "$" : ""}
                {transaction.amount.toLocaleString()}
                {transaction.currency === "BTC" ? " BTC" : ""}
              </TableCell>
              <TableCell>{getStatusBadge(transaction.status)}</TableCell>
              <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
