export interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  createdAt: string
  profileImage?: string
  totalInvested?: number
}

export interface Transaction {
  id: string
  userId: string
  type: string
  amount: number
  currency: "USD" | "BTC"
  status: string
  createdAt: string
  description?: string
  paymentMethod?: string
  reference?: string
}

export interface Investment {
  id: string
  userId: string
  strategy: string
  amount: number
  currency: "USD" | "BTC"
  status: string
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
