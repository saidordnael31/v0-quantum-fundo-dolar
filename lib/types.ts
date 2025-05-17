// Tipos para o backend

export type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  createdAt: string
  status: "active" | "inactive" | "pending"
  totalInvested?: number
  profileImage?: string
}

export type Transaction = {
  id: string
  userId: string
  type: "deposit" | "withdrawal" | "investment" | "profit" | "fee"
  amount: number
  currency: "USD" | "BTC"
  status: "pending" | "completed" | "failed" | "cancelled"
  createdAt: string
  updatedAt: string
  description?: string
  paymentMethod?: string
  reference?: string
}

export type Investment = {
  id: string
  userId: string
  strategy: "conservative" | "balanced" | "aggressive" | "quantum"
  amount: number
  currency: "USD" | "BTC"
  status: "active" | "closed" | "pending"
  startDate: string
  endDate?: string
  duration: "flexible" | "3months" | "6months" | "1year"
  riskLevel: number
  currentValue: number
  profit: number
  profitPercentage: number
}

export type AdminDashboardStats = {
  totalUsers: number
  activeUsers: number
  totalInvestments: number
  totalDeposits: number
  totalWithdrawals: number
  assetsUnderManagement: number
  revenueThisMonth: number
  pendingTransactions: number
}
