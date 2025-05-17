import type { ReactNode } from "react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <div className="hidden w-64 bg-white shadow-md md:block">
          <div className="flex h-16 items-center justify-center border-b">
            <h1 className="text-xl font-bold text-emerald-600">Admin Dashboard</h1>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a href="/admin" className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/admin/users"
                  className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Users
                </a>
              </li>
              <li>
                <a
                  href="/admin/transactions"
                  className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Transactions
                </a>
              </li>
              <li>
                <a
                  href="/admin/investments"
                  className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Investments
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex-1">
          <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            <div className="md:hidden">
              <button className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <button className="flex items-center text-gray-700 hover:text-gray-900">
                  <span className="mr-2">Admin User</span>
                  <img
                    src="https://randomuser.me/api/portraits/men/10.jpg"
                    alt="Admin"
                    className="h-8 w-8 rounded-full"
                  />
                </button>
              </div>
            </div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
