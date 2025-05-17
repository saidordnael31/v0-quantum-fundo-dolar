import type { Metadata } from "next"
import { TransactionHistory } from "@/components/transaction-history"

export const metadata: Metadata = {
  title: "Transactions | Quantum Investment Platform",
  description: "View your transaction history",
}

export default function TransactionsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-2xl font-bold">Transaction History</h1>
      <TransactionHistory />
    </div>
  )
}
