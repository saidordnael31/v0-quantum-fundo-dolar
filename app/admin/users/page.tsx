export default function AdminUsersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <a href="/admin" className="text-xl font-bold">
              Admin Dashboard
            </a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-xl font-bold">Users</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-900">Admin User</span>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Add User
          </button>
        </div>

        <div className="rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">#1001</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">John Doe</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">john@example.com</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">User</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button className="mr-2 text-blue-600 hover:text-blue-900">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">#1002</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">Jane Smith</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">jane@example.com</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">Admin</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button className="mr-2 text-blue-600 hover:text-blue-900">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">#1003</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">Robert Johnson</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">robert@example.com</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">Inactive</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">User</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button className="mr-2 text-blue-600 hover:text-blue-900">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
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
