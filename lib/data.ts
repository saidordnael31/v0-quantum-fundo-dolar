import type { User, Transaction, Investment } from "./types"

// Dados de exemplo para usuários
export const users: User[] = [
  {
    id: "usr_1",
    name: "João Silva",
    email: "joao@example.com",
    role: "user",
    createdAt: "2023-01-15T10:30:00Z",
    status: "active",
    totalInvested: 25000,
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "usr_2",
    name: "Maria Oliveira",
    email: "maria@example.com",
    role: "user",
    createdAt: "2023-02-20T14:45:00Z",
    status: "active",
    totalInvested: 75000,
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "usr_3",
    name: "Carlos Santos",
    email: "carlos@example.com",
    role: "user",
    createdAt: "2023-03-10T09:15:00Z",
    status: "inactive",
    totalInvested: 10000,
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "usr_4",
    name: "Ana Pereira",
    email: "ana@example.com",
    role: "user",
    createdAt: "2023-04-05T16:20:00Z",
    status: "pending",
    totalInvested: 0,
    profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "adm_1",
    name: "Admin User",
    email: "admin@akinquantum.com",
    role: "admin",
    createdAt: "2023-01-01T00:00:00Z",
    status: "active",
    profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
  },
]

// Dados de exemplo para transações
export const transactions: Transaction[] = [
  {
    id: "tx_1",
    userId: "usr_1",
    type: "deposit",
    amount: 10000,
    currency: "USD",
    status: "completed",
    createdAt: "2023-05-10T08:30:00Z",
    updatedAt: "2023-05-10T08:35:00Z",
    paymentMethod: "credit_card",
    reference: "DEP123456",
  },
  {
    id: "tx_2",
    userId: "usr_1",
    type: "investment",
    amount: 10000,
    currency: "USD",
    status: "completed",
    createdAt: "2023-05-11T10:15:00Z",
    updatedAt: "2023-05-11T10:20:00Z",
    description: "Investment in Quantum AI strategy",
    reference: "INV123456",
  },
  {
    id: "tx_3",
    userId: "usr_2",
    type: "deposit",
    amount: 50000,
    currency: "USD",
    status: "completed",
    createdAt: "2023-05-15T14:20:00Z",
    updatedAt: "2023-05-15T14:25:00Z",
    paymentMethod: "bank_transfer",
    reference: "DEP789012",
  },
  {
    id: "tx_4",
    userId: "usr_2",
    type: "investment",
    amount: 50000,
    currency: "USD",
    status: "completed",
    createdAt: "2023-05-16T09:45:00Z",
    updatedAt: "2023-05-16T09:50:00Z",
    description: "Investment in Conservative strategy",
    reference: "INV789012",
  },
  {
    id: "tx_5",
    userId: "usr_3",
    type: "deposit",
    amount: 5000,
    currency: "USD",
    status: "completed",
    createdAt: "2023-05-20T11:10:00Z",
    updatedAt: "2023-05-20T11:15:00Z",
    paymentMethod: "credit_card",
    reference: "DEP345678",
  },
  {
    id: "tx_6",
    userId: "usr_3",
    type: "investment",
    amount: 5000,
    currency: "USD",
    status: "completed",
    createdAt: "2023-05-21T13:30:00Z",
    updatedAt: "2023-05-21T13:35:00Z",
    description: "Investment in Balanced strategy",
    reference: "INV345678",
  },
  {
    id: "tx_7",
    userId: "usr_1",
    type: "profit",
    amount: 1200,
    currency: "USD",
    status: "completed",
    createdAt: "2023-06-10T15:00:00Z",
    updatedAt: "2023-06-10T15:05:00Z",
    description: "Monthly profit from Quantum AI strategy",
    reference: "PRF123456",
  },
  {
    id: "tx_8",
    userId: "usr_2",
    type: "profit",
    amount: 2500,
    currency: "USD",
    status: "completed",
    createdAt: "2023-06-15T16:20:00Z",
    updatedAt: "2023-06-15T16:25:00Z",
    description: "Monthly profit from Conservative strategy",
    reference: "PRF789012",
  },
  {
    id: "tx_9",
    userId: "usr_3",
    type: "withdrawal",
    amount: 1000,
    currency: "USD",
    status: "pending",
    createdAt: "2023-06-20T10:45:00Z",
    updatedAt: "2023-06-20T10:50:00Z",
    description: "Withdrawal request",
    reference: "WDR345678",
  },
  {
    id: "tx_10",
    userId: "usr_1",
    type: "fee",
    amount: 250,
    currency: "USD",
    status: "completed",
    createdAt: "2023-06-30T09:30:00Z",
    updatedAt: "2023-06-30T09:35:00Z",
    description: "Management fee for Q2 2023",
    reference: "FEE123456",
  },
]

// Dados de exemplo para investimentos
export const investments: Investment[] = [
  {
    id: "inv_1",
    userId: "usr_1",
    strategy: "quantum",
    amount: 10000,
    currency: "USD",
    status: "active",
    startDate: "2023-05-11T10:20:00Z",
    duration: "6months",
    riskLevel: 70,
    currentValue: 12500,
    profit: 2500,
    profitPercentage: 25,
  },
  {
    id: "inv_2",
    userId: "usr_2",
    strategy: "conservative",
    amount: 50000,
    currency: "USD",
    status: "active",
    startDate: "2023-05-16T09:50:00Z",
    duration: "1year",
    riskLevel: 30,
    currentValue: 53500,
    profit: 3500,
    profitPercentage: 7,
  },
  {
    id: "inv_3",
    userId: "usr_3",
    strategy: "balanced",
    amount: 5000,
    currency: "USD",
    status: "active",
    startDate: "2023-05-21T13:35:00Z",
    duration: "3months",
    riskLevel: 50,
    currentValue: 5350,
    profit: 350,
    profitPercentage: 7,
  },
  {
    id: "inv_4",
    userId: "usr_1",
    strategy: "aggressive",
    amount: 15000,
    currency: "USD",
    status: "active",
    startDate: "2023-06-05T11:20:00Z",
    duration: "flexible",
    riskLevel: 85,
    currentValue: 16800,
    profit: 1800,
    profitPercentage: 12,
  },
  {
    id: "inv_5",
    userId: "usr_2",
    strategy: "quantum",
    amount: 25000,
    currency: "USD",
    status: "active",
    startDate: "2023-06-10T14:45:00Z",
    duration: "6months",
    riskLevel: 65,
    currentValue: 28750,
    profit: 3750,
    profitPercentage: 15,
  },
]

// Função para obter estatísticas do dashboard de administrador
export function getAdminDashboardStats() {
  const activeUsers = users.filter((user) => user.status === "active" && user.role === "user").length
  const totalDeposits = transactions
    .filter((tx) => tx.type === "deposit" && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0)
  const totalWithdrawals = transactions
    .filter((tx) => tx.type === "withdrawal" && tx.status === "completed")
    .reduce((sum, tx) => sum + tx.amount, 0)
  const assetsUnderManagement = investments
    .filter((inv) => inv.status === "active")
    .reduce((sum, inv) => sum + inv.currentValue, 0)
  const pendingTransactions = transactions.filter((tx) => tx.status === "pending").length

  // Calcular receita deste mês
  const currentDate = new Date()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const revenueThisMonth = transactions
    .filter(
      (tx) =>
        (tx.type === "fee" || tx.type === "profit") &&
        tx.status === "completed" &&
        new Date(tx.createdAt) >= firstDayOfMonth,
    )
    .reduce((sum, tx) => sum + tx.amount, 0)

  return {
    totalUsers: users.filter((user) => user.role === "user").length,
    activeUsers,
    totalInvestments: investments.length,
    totalDeposits,
    totalWithdrawals,
    assetsUnderManagement,
    revenueThisMonth,
    pendingTransactions,
  }
}
