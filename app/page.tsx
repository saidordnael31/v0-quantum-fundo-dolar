import { TrendingUp } from "lucide-react"
import { redirect } from "next/navigation"
import { DashboardOverview } from "@/components/dashboard-overview"
import { Logo } from "@/components/logo"

export default function Home() {
  // In a real application, you would check authentication status here
  // For demo purposes, we'll redirect to the login page
  // In a production app, this would use a proper auth check
  const isAuthenticated = false

  if (!isAuthenticated) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Logo />
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <TrendingUp className="h-4 w-4" />
            <span>BTC/USD: $67,245.32</span>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <DashboardOverview />
      </main>
    </div>
  )
}
