import type { Metadata } from "next"
import { InvestmentForm } from "@/components/investment/investment-form"

export const metadata: Metadata = {
  title: "Invest | Quantum Investment Platform",
  description: "Make new investments in the Quantum Investment Platform",
}

export default function InvestPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-2xl font-bold">Make an Investment</h1>
      <InvestmentForm />
    </div>
  )
}
