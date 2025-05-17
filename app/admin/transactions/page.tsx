export default function AdminTransactionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <a href="/admin" className="text-xl font-bold">
              Admin Dashboard
            </a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-xl font-bold">Transactions</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-900">Admin User</span>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Transaction Management</h1>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Add Transaction
          </button>
        </div>

        <div className="rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">#5001</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">John Doe</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">$10,000</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">Deposit</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      Completed
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">2023-05-15</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button className="mr-2 text-blue-600 hover:text-blue-900">View</button>
                    <button className="text-red-600 hover:text-red-900">Cancel</button>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">#5002</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">Jane Smith</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">$5,000</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">Withdrawal</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                      Pending
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">2023-05-16</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button className="mr-2 text-blue-600 hover:text-blue-900">View</button>
                    <button className="mr-2 text-green-600 hover:text-green-900">Approve</button>
                    <button className="text-red-600 hover:text-red-900">Reject</button>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">#5003</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">Robert Johnson</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">$15,000</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">Deposit</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">Failed</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">2023-05-14</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button className="mr-2 text-blue-600 hover:text-blue-900">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Retry</button>
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
