import type { User, Transaction, Investment, AdminDashboardStats } from "./types"

// Dados mockados para usuários
export const users: User[] = [
  {
    id: "usr_1",
    name: "João Silva",
    email: "joao.silva@example.com",
    role: "user",
    status: "active",
    createdAt: "2023-01-15T10:30:00Z",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    totalInvested: 25000,
  },
  {
    id: "usr_2",
    name: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    role: "user",
    status: "active",
    createdAt: "2023-02-20T14:45:00Z",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
    totalInvested: 50000,
  },
  {
    id: "adm_1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    createdAt: "2023-01-01T08:00:00Z",
    profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
  },
]

// Dados mockados para transações
export const transactions: Transaction[] = [
  {
    id: "tx_1",
    userId: "usr_1",
    type: "deposit",
    amount: 10000,
    currency: "USD",
    status: "completed",
    createdAt: "2023-05-10T11:30:00Z",
    description: "Initial deposit",
    paymentMethod: "bank_transfer",
    reference: "REF123456",
  },
  {
    id: "tx_2",
    userId: "usr_1",
    type: "investment",
    amount: 8000,
    currency: "USD",
    status: "completed",
    createdAt: "2023-05-12T14:20:00Z",
    description: "Investment in Quantum AI strategy",
    reference: "REF123457",
  },
]

// Dados mockados para investimentos
export const investments: Investment[] = [
  {
    id: "inv_1",
    userId: "usr_1",
    strategy: "quantum",
    amount: 8000,
    currency: "USD",
    status: "active",
    startDate: "2023-05-12T14:20:00Z",
    duration: 12,
    riskLevel: 4,
    currentValue: 9600,
    profit: 1600,
    profitPercentage: 20,
  },
]

// Função para gerar estatísticas do dashboard
export function getAdminDashboardStats(): AdminDashboardStats {
  const totalUsers = users.length
  const activeUsers = users.filter((user) => user.status === "active").length

  const assetsUnderManagement = investments
    .filter((inv) => inv.status === "active")
    .reduce((total, inv) => total + inv.currentValue, 0)

  const totalInvestments = investments.filter((inv) => inv.status === "active").length

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const revenueThisMonth = transactions
    .filter((tx) => {
      const txDate = new Date(tx.createdAt)
      return (
        tx.type === "fee" &&
        tx.status === "completed" &&
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      )
    })
    .reduce((total, tx) => total + tx.amount, 0)

  const pendingTransactions = transactions.filter((tx) => tx.status === "pending").length

  // Dados mockados para gráficos
  const userGrowth = [
    { period: "Jan", count: 10 },
    { period: "Feb", count: 15 },
    { period: "Mar", count: 20 },
    { period: "Apr", count: 25 },
    { period: "May", count: 35 },
    { period: "Jun", count: 45 },
  ]

  const transactionVolume = [
    { period: "Jan", amount: 50000 },
    { period: "Feb", amount: 65000 },
    { period: "Mar", amount: 85000 },
    { period: "Apr", amount: 95000 },
    { period: "May", amount: 120000 },
    { period: "Jun", amount: 150000 },
  ]

  return {
    totalUsers,
    activeUsers,
    assetsUnderManagement,
    totalInvestments,
    revenueThisMonth,
    pendingTransactions,
    userGrowth,
    transactionVolume,
  }
}
