export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 dark:bg-slate-950">
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium">Total Assets</div>
              </div>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </div>

            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium">Investments</div>
              </div>
              <div className="text-2xl font-bold">+12.5%</div>
              <p className="text-xs text-muted-foreground">+2.5% from last month</p>
            </div>

            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium">Active Strategies</div>
              </div>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </div>

            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium">Pending Transactions</div>
              </div>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">-3 from last month</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4 rounded-lg border bg-card shadow-sm">
              <div className="p-6">
                <div className="text-xl font-semibold">Market Overview</div>
              </div>
              <div className="p-6">
                <div className="h-[300px] w-full bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">Chart will load client-side</p>
                </div>
              </div>
            </div>

            <div className="col-span-3 rounded-lg border bg-card shadow-sm">
              <div className="p-6">
                <div className="text-xl font-semibold">Portfolio Distribution</div>
                <div className="text-sm text-muted-foreground">Allocation across strategies</div>
              </div>
              <div className="p-6">
                <div className="h-[300px] w-full bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">Chart will load client-side</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-sm">
            <p>This is a static version of the dashboard page.</p>
            <p>The interactive version will be loaded client-side.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
