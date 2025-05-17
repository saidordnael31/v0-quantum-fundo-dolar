import type { Metadata } from "next"
import { DashboardOverview } from "@/components/dashboard-overview"

export const metadata: Metadata = {
  title: "Dashboard | Quantum Investment Platform",
  description: "Manage your investments and track your portfolio",
}

export default function DashboardPage() {
  return <DashboardOverview />
}
