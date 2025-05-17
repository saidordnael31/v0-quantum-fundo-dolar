import type { ReactNode } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export const metadata = {
  title: "Admin Dashboard | Akin Quantum Hedge Fund",
  description: "Admin dashboard for Akin Quantum Hedge Fund",
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
