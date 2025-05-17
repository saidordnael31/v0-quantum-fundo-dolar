"use client"

import { useEffect, useState } from "react"
import type { Transaction } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import {
  Search,
  Plus,
  MoreHorizontal,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  DollarSign,
  CreditCard,
} from "lucide-react"
import { AdminTransactionDialog } from "@/components/admin/admin-transaction-dialog"

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  useEffect(() => {
    fetchTransactions()
  }, [])

  useEffect(() => {
    filterTransactions()
  }, [transactions, searchQuery, statusFilter, typeFilter])

  async function fetchTransactions() {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/transactions")
      const data = await response.json()
      setTransactions(data)
      setFilteredTransactions(data)
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  function filterTransactions() {
    let result = [...transactions]

    // Filtrar por status
    if (statusFilter !== "all") {
      result = result.filter((tx) => tx.status === statusFilter)
    }

    // Filtrar por tipo
    if (typeFilter !== "all") {
      result = result.filter((tx) => tx.type === typeFilter)
    }

    // Filtrar por pesquisa
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (tx) =>
          tx.id.toLowerCase().includes(query) ||
          tx.userId.toLowerCase().includes(query) ||
          (tx.description && tx.description.toLowerCase().includes(query)),
      )
    }

    setFilteredTransactions(result)
  }

  function handleAddTransaction() {
    setSelectedTransaction(null)
    setIsTransactionDialogOpen(true)
  }

  function handleEditTransaction(transaction: Transaction) {
    setSelectedTransaction(transaction)
    setIsTransactionDialogOpen(true)
  }

  function handleTransactionSaved(transaction: Transaction) {
    if (selectedTransaction) {
      // Atualizar transação existente
      setTransactions((prevTransactions) => prevTransactions.map((tx) => (tx.id === transaction.id ? transaction : tx)))
    } else {
      // Adicionar nova transação
      setTransactions((prevTransactions) => [...prevTransactions, transaction])
    }
    setIsTransactionDialogOpen(false)
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
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Manage all financial transactions in the system</p>
        </div>
        <Button onClick={handleAddTransaction}>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Management</CardTitle>
          <CardDescription>View and manage all transactions in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="deposit">Deposit</SelectItem>
                    <SelectItem value="withdrawal">Withdrawal</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="profit">Profit</SelectItem>
                    <SelectItem value="fee">Fee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
            </div>
          ) : (
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
                  {filteredTransactions.map((transaction) => (
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
                            <DropdownMenuItem onClick={() => handleEditTransaction(transaction)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            {transaction.status === "pending" && (
                              <>
                                <DropdownMenuItem className="text-emerald-500">Approve</DropdownMenuItem>
                                <DropdownMenuItem className="text-rose-500">Reject</DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AdminTransactionDialog
        open={isTransactionDialogOpen}
        onOpenChange={setIsTransactionDialogOpen}
        transaction={selectedTransaction}
        onSave={handleTransactionSaved}
      />
    </div>
  )
}
