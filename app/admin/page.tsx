export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-sm font-medium text-gray-500">Total Users</h2>
          <p className="mt-2 text-3xl font-bold">120</p>
          <p className="mt-2 text-sm text-green-500">+12% from last month</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-sm font-medium text-gray-500">Active Investments</h2>
          <p className="mt-2 text-3xl font-bold">85</p>
          <p className="mt-2 text-sm text-green-500">+5% from last month</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-sm font-medium text-gray-500">Total Invested</h2>
          <p className="mt-2 text-3xl font-bold">$1.2M</p>
          <p className="mt-2 text-sm text-green-500">+18% from last month</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-sm font-medium text-gray-500">Monthly Revenue</h2>
          <p className="mt-2 text-3xl font-bold">$45K</p>
          <p className="mt-2 text-sm text-green-500">+7% from last month</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm font-medium text-gray-500">
                  <th className="pb-3 pr-6">User</th>
                  <th className="pb-3 pr-6">Type</th>
                  <th className="pb-3 pr-6">Amount</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 pr-6">João Silva</td>
                  <td className="py-3 pr-6">Deposit</td>
                  <td className="py-3 pr-6">$10,000</td>
                  <td className="py-3">May 10, 2023</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-6">João Silva</td>
                  <td className="py-3 pr-6">Investment</td>
                  <td className="py-3 pr-6">$8,000</td>
                  <td className="py-3">May 12, 2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium">User Activity</h2>
          <div className="h-64 rounded-lg bg-gray-100 p-4">
            <p className="text-center text-gray-500">Chart placeholder</p>
          </div>
        </div>
      </div>
    </div>
  )
}
