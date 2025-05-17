"use client"

import { useState } from "react"
import { Bitcoin, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// Sample allocation data
const allocations = [
  {
    id: "btc-1",
    asset: "Bitcoin",
    symbol: "BTC",
    type: "crypto",
    amount: "8.25",
    value: 556000,
    allocation: 44.6,
    change24h: 2.3,
    strategy: "Quantum AI",
  },
  {
    id: "btc-2",
    asset: "Bitcoin",
    symbol: "BTC",
    type: "crypto",
    amount: "4.2",
    value: 283000,
    allocation: 22.7,
    change24h: 2.3,
    strategy: "Aggressive",
  },
  {
    id: "usd-1",
    asset: "US Dollar",
    symbol: "USD",
    type: "fiat",
    amount: "250000",
    value: 250000,
    allocation: 20.1,
    change24h: 0,
    strategy: "Conservative",
  },
  {
    id: "usd-2",
    asset: "US Dollar",
    symbol: "USD",
    type: "fiat",
    amount: "158000",
    value: 158000,
    allocation: 12.6,
    change24h: 0,
    strategy: "Balanced",
  },
]

export function PortfolioAllocations() {
  const router = useRouter()
  const [sortBy, setSortBy] = useState("allocation")
  const [sortDirection, setSortDirection] = useState("desc")

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("desc")
    }
  }

  const sortedAllocations = [...allocations].sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Asset</TableHead>
              <TableHead className="cursor-pointer hover:text-primary" onClick={() => handleSort("amount")}>
                Amount
              </TableHead>
              <TableHead className="cursor-pointer hover:text-primary" onClick={() => handleSort("value")}>
                Value (USD)
              </TableHead>
              <TableHead className="cursor-pointer hover:text-primary" onClick={() => handleSort("allocation")}>
                Allocation
              </TableHead>
              <TableHead className="cursor-pointer hover:text-primary" onClick={() => handleSort("change24h")}>
                24h Change
              </TableHead>
              <TableHead className="cursor-pointer hover:text-primary" onClick={() => handleSort("strategy")}>
                Strategy
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAllocations.map((allocation) => (
              <TableRow key={allocation.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {allocation.type === "crypto" ? (
                      <Bitcoin className="mr-2 h-4 w-4 text-orange-500" />
                    ) : (
                      <DollarSign className="mr-2 h-4 w-4 text-green-500" />
                    )}
                    <div>
                      <div>{allocation.asset}</div>
                      <div className="text-xs text-muted-foreground">{allocation.symbol}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {allocation.type === "crypto" ? allocation.amount : `$${Number(allocation.amount).toLocaleString()}`}
                </TableCell>
                <TableCell>${allocation.value.toLocaleString()}</TableCell>
                <TableCell>{allocation.allocation.toFixed(1)}%</TableCell>
                <TableCell>
                  {allocation.change24h === 0 ? (
                    <span>0.00%</span>
                  ) : allocation.change24h > 0 ? (
                    <span className="flex items-center text-emerald-500">
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                      {allocation.change24h.toFixed(2)}%
                    </span>
                  ) : (
                    <span className="flex items-center text-rose-500">
                      <ArrowDownRight className="mr-1 h-4 w-4" />
                      {Math.abs(allocation.change24h).toFixed(2)}%
                    </span>
                  )}
                </TableCell>
                <TableCell>{allocation.strategy}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/invest")}>
                    Manage
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
