"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { RealTimeTicker } from "@/components/real-time-ticker"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, LineChart, History, Settings, LogOut, Menu } from "lucide-react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-xl font-bold">Akin Quantum</span>
            </Link>
          </div>

          <div className="hidden md:block flex-1 mx-8">
            <RealTimeTicker />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link
                href="/auth/login"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("auth_token")
                  }
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile ticker */}
        <div className="md:hidden px-4 pb-2">
          <RealTimeTicker />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-background">
          <nav className="flex-1 space-y-1 px-2 py-4">
            <Link
              href="/dashboard"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/portfolio"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <LineChart className="mr-2 h-4 w-4" />
              Portfólio
            </Link>
            <Link
              href="/dashboard/transactions"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <History className="mr-2 h-4 w-4" />
              Transações
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-muted/20">{children}</main>
      </div>
    </div>
  )
}
