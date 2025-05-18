"use client"

import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg mb-4">Welcome to your dashboard! You have successfully logged in.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">Portfolio Overview</h3>
            <p className="text-blue-600">View your investment portfolio</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="font-medium text-green-800 mb-2">Investment Opportunities</h3>
            <p className="text-green-600">Explore new investment options</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="font-medium text-purple-800 mb-2">Transaction History</h3>
            <p className="text-purple-600">Review your past transactions</p>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/auth/login"
            className="text-red-600 hover:text-red-800"
            onClick={() => {
              // Limpar o token de autenticação ao fazer logout
              if (typeof window !== "undefined") {
                localStorage.removeItem("auth_token")
              }
            }}
          >
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  )
}
