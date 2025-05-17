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
    id: "usr_3",
    name: "Carlos Santos",
    email: "carlos.santos@example.com",
    role: "user",
    status: "inactive",
    createdAt: "2023-03-10T09:15:00Z",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
    totalInvested: 10000,
  },
  {
    id: "usr_4",
    name: "Ana Pereira",
    email: "ana.pereira@example.com",
    role: "user",
    status: "pending",
    createdAt: "2023-04-05T16:20:00Z",
    profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
    totalInvested: 0,
  },
  {
    id: "usr_5",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    createdAt: "2023-01-01T08:00:00Z",
    profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
    totalInvested: 0,
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
  {
    id: "tx_3",
    userId: "usr_2",
    type: "deposit",
    amount: 25000,
    currency: "USD",
    status: "completed",
    createdAt: "2023-05-15T09:45:00Z",
    description: "Initial deposit",
    paymentMethod: "credit_card",
    reference: "REF123458",
  },
  {
    id: "tx_4",
    userId: "usr_2",
    type: "investment",
    amount: 20000,
    currency: "USD",
    status: "completed",
    createdAt: "2023-05-16T10:30:00Z",
    description: "Investment in Balanced strategy",
    reference: "REF123459",
  },
  {
    id: "tx_5",
    userId: "usr_3",
    type: "deposit",
    amount: 5000,
    currency: "USD",
    status: "completed",
    createdAt: "2023-05-20T15:10:00Z",
    description: "Initial deposit",
    paymentMethod: "bank_transfer",
    reference: "REF123460",
  },
  {
    id: "tx_6",
    userId: "usr_1",
    type: "profit",
    amount: 800,
    currency: "USD",
    status: "completed",
    createdAt: "2023-06-12T16:40:00Z",
    description: "Monthly profit from Quantum AI strategy",
    reference: "REF123461",
  },
  {
    id: "tx_7",
    userId: "usr_2",
    type: "profit",
    amount: 1200,
    currency: "USD",
    status: "completed",
    createdAt: "2023-06-16T17:20:00Z",
    description: "Monthly profit from Balanced strategy",
    reference: "REF123462",
  },
  {
    id: "tx_8",
    userId: "usr_3",
    type: "withdrawal",
    amount: 2000,
    currency: "USD",
    status: "pending",
    createdAt: "2023-06-25T13:15:00Z",
    description: "Partial withdrawal",
    paymentMethod: "bank_transfer",
    reference: "REF123463",
  },
  {
    id: "tx_9",
    userId: "usr_4",
    type: "deposit",
    amount: 15000,
    currency: "USD",
    status: "pending",
    createdAt: "2023-06-28T10:05:00Z",
    description: "Initial deposit",
    paymentMethod: "bank_transfer",
    reference: "REF123464",
  },
  {
    id: "tx_10",
    userId: "usr_1",
    type: "fee",
    amount: 100,
    currency: "USD",
    status: "completed",
    createdAt: "2023-06-30T09:30:00Z",
    description: "Monthly management fee",
    reference: "REF123465",
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
  {
    id: "inv_2",
    userId: "usr_2",
    strategy: "balanced",
    amount: 20000,
    currency: "USD",
    status: "active",
    startDate: "2023-05-16T10:30:00Z",
    duration: 24,
    riskLevel: 3,
    currentValue: 22400,
    profit: 2400,
    profitPercentage: 12,
  },
  {
    id: "inv_3",
    userId: "usr_3",
    strategy: "conservative",
    amount: 5000,
    currency: "USD",
    status: "active",
    startDate: "2023-05-22T11:45:00Z",
    duration: 6,
    riskLevel: 2,
    currentValue: 5250,
    profit: 250,
    profitPercentage: 5,
  },
  {
    id: "inv_4",
    userId: "usr_1",
    strategy: "aggressive",
    amount: 2000,
    currency: "USD",
    status: "closed",
    startDate: "2023-04-10T09:30:00Z",
    endDate: "2023-06-10T15:45:00Z",
    duration: 2,
    riskLevel: 5,
    currentValue: 2400,
    profit: 400,
    profitPercentage: 20,
  },
  {
    id: "inv_5",
    userId: "usr_2",
    strategy: "quantum",
    amount: 30000,
    currency: "USD",
    status: "pending",
    startDate: "2023-06-28T14:20:00Z",
    duration: 36,
    riskLevel: 4,
    currentValue: 30000,
    profit: 0,
    profitPercentage: 0,
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
