export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  status: "active" | "inactive" | "pending"
  createdAt: string
  profileImage?: string
  totalInvested?: number
}

export interface Transaction {
  id: string
  userId: string
  type: "deposit" | "withdrawal" | "investment" | "profit" | "fee"
  amount: number
  currency: "USD" | "BTC"
  status: "completed" | "pending" | "failed" | "cancelled"
  createdAt: string
  description?: string
  paymentMethod?: string
  reference?: string
}

export interface Investment {
  id: string
  userId: string
  strategy: "conservative" | "balanced" | "aggressive" | "quantum"
  amount: number
  currency: "USD" | "BTC"
  status: "active" | "closed" | "pending"
  startDate: string
  endDate?: string
  duration: number
  riskLevel: number
  currentValue: number
  profit: number
  profitPercentage: number
}

export interface AdminDashboardStats {
  totalUsers: number
  activeUsers: number
  assetsUnderManagement: number
  totalInvestments: number
  revenueThisMonth: number
  pendingTransactions: number
  userGrowth: { period: string; count: number }[]
  transactionVolume: { period: string; amount: number }[]
}
