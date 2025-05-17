export default function AdminInvestmentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <a href="/admin" className="text-xl font-bold">
              Admin Dashboard
            </a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-xl font-bold">Investments</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-900">Admin User</span>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Investment Management</h1>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Add Investment
          </button>
        </div>

        <div className="rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Strategy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Investors
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">#3001</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">Quantum Alpha</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">$2,500,000</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">42</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">+15.2%</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button className="mr-2 text-blue-600 hover:text-blue-900">View</button>
                    <button className="text-red-600 hover:text-red-900">Pause</button>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">#3002</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">Quantum Beta</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">$1,800,000</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">35</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">+8.7%</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button className="mr-2 text-blue-600 hover:text-blue-900">View</button>
                    <button className="text-red-600 hover:text-red-900">Pause</button>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">#3003</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">Quantum Gamma</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">$1,200,000</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">28</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">+12.3%</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                      Rebalancing
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button className="mr-2 text-blue-600 hover:text-blue-900">View</button>
                    <button className="text-green-600 hover:text-green-900">Resume</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
