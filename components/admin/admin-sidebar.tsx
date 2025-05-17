"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, CreditCard, TrendingUp, Settings, HelpCircle, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { useState } from "react"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Transactions",
    href: "/admin/transactions",
    icon: CreditCard,
  },
  {
    title: "Investments",
    href: "/admin/investments",
    icon: TrendingUp,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/admin/help",
    icon: HelpCircle,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-white p-4 shadow-lg transition-transform duration-200 ease-in-out dark:bg-slate-800 md:relative md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="mb-8 flex items-center">
            <Logo iconClassName="h-8 w-8" textClassName="text-lg" />
          </div>

          <nav className="flex-1 space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700",
                )}
              >
                <link.icon className="mr-3 h-5 w-5" />
                {link.title}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-4">
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600">
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  )
}
