export default function AdminTransactionsPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Transactions</h1>

      <div className="mb-6 flex justify-between">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <button className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">Add Transaction</button>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm font-medium text-gray-500">
              <th className="p-4">ID</th>
              <th className="p-4">User</th>
              <th className="p-4">Type</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4">
                <span className="font-mono text-xs">tx_1</span>
              </td>
              <td className="p-4">João Silva</td>
              <td className="p-4">
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">Deposit</span>
              </td>
              <td className="p-4">$10,000</td>
              <td className="p-4">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Completed</span>
              </td>
              <td className="p-4">May 10, 2023</td>
              <td className="p-4 text-right">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-4">
                <span className="font-mono text-xs">tx_2</span>
              </td>
              <td className="p-4">João Silva</td>
              <td className="p-4">
                <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800">Investment</span>
              </td>
              <td className="p-4">$8,000</td>
              <td className="p-4">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Completed</span>
              </td>
              <td className="p-4">May 12, 2023</td>
              <td className="p-4 text-right">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
