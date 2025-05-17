import { NextResponse } from "next/server"
import { getAdminDashboardStats } from "@/lib/data"

export async function GET() {
  // Em um sistema real, você verificaria a autenticação e autorização aqui

  try {
    const stats = getAdminDashboardStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}
