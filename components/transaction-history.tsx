"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowDownUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

// Dados simulados de transações
const transactions = [
  {
    id: "TX123456",
    date: "2025-05-15",
    type: "buy",
    asset: "BTC",
    amount: "0.75",
    price: "66,432.21",
    value: "49,824.16",
    status: "completed",
  },
  {
    id: "TX123455",
    date: "2025-05-10",
    type: "sell",
    asset: "BTC",
    amount: "0.25",
    price: "65,876.54",
    value: "16,469.14",
    status: "completed",
  },
  {
    id: "TX123454",
    date: "2025-05-05",
    type: "buy",
    asset: "BTC",
    amount: "1.2",
    price: "64,321.87",
    value: "77,186.24",
    status: "completed",
  },
  {
    id: "TX123453",
    date: "2025-04-28",
    type: "sell",
    asset: "BTC",
    amount: "0.5",
    price: "63,987.32",
    value: "31,993.66",
    status: "completed",
  },
  {
    id: "TX123452",
    date: "2025-04-20",
    type: "buy",
    asset: "BTC",
    amount: "0.8",
    price: "62,543.21",
    value: "50,034.57",
    status: "completed",
  },
]

export function TransactionHistory() {
  const [filter, setFilter] = useState("all")

  const filteredTransactions = filter === "all" ? transactions : transactions.filter((t) => t.type === filter)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Transações</SelectItem>
              <SelectItem value="buy">Apenas Compras</SelectItem>
              <SelectItem value="sell">Apenas Vendas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button>
          <ArrowDownUp className="mr-2 h-4 w-4" />
          Nova Transação
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Valor (USD)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">{tx.id}</TableCell>
                <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {tx.type === "buy" ? (
                      <>
                        <ArrowDownRight className="mr-1 h-4 w-4 text-emerald-500" />
                        <span className="text-emerald-500">Compra</span>
                      </>
                    ) : (
                      <>
                        <ArrowUpRight className="mr-1 h-4 w-4 text-rose-500" />
                        <span className="text-rose-500">Venda</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>{tx.asset}</TableCell>
                <TableCell>{tx.amount}</TableCell>
                <TableCell>${tx.price}</TableCell>
                <TableCell>${tx.value}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                    {tx.status === "completed" ? "Concluída" : "Pendente"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
