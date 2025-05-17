import type { Metadata } from "next"
import { PortfolioOverview } from "@/components/portfolio/portfolio-overview"

export const metadata: Metadata = {
  title: "Portfolio | Quantum Investment Platform",
  description: "View your investment portfolio and performance",
}

export default function PortfolioPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-2xl font-bold">Your Portfolio</h1>
      <PortfolioOverview />
    </div>
  )
}
