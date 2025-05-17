export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-500">Welcome to the admin dashboard.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-sm font-medium text-gray-500">Total Users</h2>
          <p className="mt-2 text-3xl font-bold">120</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-sm font-medium text-gray-500">Active Investments</h2>
          <p className="mt-2 text-3xl font-bold">85</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-sm font-medium text-gray-500">Total Invested</h2>
          <p className="mt-2 text-3xl font-bold">$1.2M</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-sm font-medium text-gray-500">Monthly Revenue</h2>
          <p className="mt-2 text-3xl font-bold">$45K</p>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-medium">Recent Transactions</h2>
        <p>No transactions to display.</p>
      </div>
    </div>
  )
}
