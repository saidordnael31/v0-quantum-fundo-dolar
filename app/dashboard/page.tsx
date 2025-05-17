import { DashboardOverview } from "@/components/dashboard-overview"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 dark:bg-slate-950">
      <main className="flex-1 p-4 md:p-6">
        <DashboardOverview />
      </main>
    </div>
  )
}
