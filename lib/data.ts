import type { User, Transaction, Investment, AdminDashboardStats } from "./types"

// Dados mockados para usuários
export const users: User[] = []

// Dados mockados para transações
export const transactions: Transaction[] = []

// Dados mockados para investimentos
export const investments: Investment[] = []

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
