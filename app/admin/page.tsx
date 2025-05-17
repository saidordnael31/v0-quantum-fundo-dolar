export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <span className="text-xl font-bold">Admin Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-900">Admin User</span>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Total Users</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900">1,234</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Total Investments</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900">$5.6M</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Active Strategies</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900">8</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Pending Transactions</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900">42</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-medium text-gray-900">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">#1234</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">John Doe</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">$10,000</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">#1235</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">Jane Smith</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">$5,000</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                        Pending
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-medium text-gray-900">User Activity</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">John Doe</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">Logged In</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">2 hours ago</td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">Jane Smith</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">Made Investment</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">3 hours ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
