"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, LineChart, Settings, CreditCard, PieChart, TrendingUp } from "lucide-react"

interface DashboardNavProps {
  className?: string
}

export function DashboardNav({ className }: DashboardNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Visão Geral",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Investir",
      href: "/dashboard/invest",
      icon: TrendingUp,
    },
    {
      title: "Trading",
      href: "/dashboard/trading",
      icon: LineChart,
    },
    {
      title: "Portfólio",
      href: "/dashboard/portfolio",
      icon: PieChart,
    },
    {
      title: "Transações",
      href: "/dashboard/transactions",
      icon: CreditCard,
    },
    {
      title: "Backtesting",
      href: "/dashboard/backtesting",
      icon: LineChart,
    },
    {
      title: "Configurações",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}
