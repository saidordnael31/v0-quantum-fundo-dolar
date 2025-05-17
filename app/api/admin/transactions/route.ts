import { NextResponse } from "next/server"
import { transactions } from "@/lib/data"

export async function GET(request: Request) {
  // Em um sistema real, você verificaria a autenticação e autorização aqui

  // Obter parâmetros de consulta
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const type = searchParams.get("type")
  const userId = searchParams.get("userId")
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")

  // Filtrar transações com base nos parâmetros
  let filteredTransactions = [...transactions]

  if (status) {
    filteredTransactions = filteredTransactions.filter((tx) => tx.status === status)
  }

  if (type) {
    filteredTransactions = filteredTransactions.filter((tx) => tx.type === type)
  }

  if (userId) {
    filteredTransactions = filteredTransactions.filter((tx) => tx.userId === userId)
  }

  if (startDate) {
    const start = new Date(startDate)
    filteredTransactions = filteredTransactions.filter((tx) => new Date(tx.createdAt) >= start)
  }

  if (endDate) {
    const end = new Date(endDate)
    filteredTransactions = filteredTransactions.filter((tx) => new Date(tx.createdAt) <= end)
  }

  // Ordenar por data (mais recente primeiro)
  filteredTransactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json(filteredTransactions)
}

export async function POST(request: Request) {
  // Em um sistema real, você verificaria a autenticação e autorização aqui

  try {
    const body = await request.json()

    // Validar dados
    if (!body.userId || !body.type || !body.amount || !body.currency) {
      return NextResponse.json({ error: "User ID, type, amount, and currency are required" }, { status: 400 })
    }

    // Criar nova transação
    const newTransaction = {
      id: `tx_${transactions.length + 1}`,
      userId: body.userId,
      type: body.type,
      amount: body.amount,
      currency: body.currency,
      status: body.status || "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description: body.description || "",
      paymentMethod: body.paymentMethod || "",
      reference: body.reference || `REF${Date.now().toString().slice(-6)}`,
    }

    // Em um sistema real, você adicionaria a transação ao banco de dados
    // await db.transactions.create(newTransaction)

    // Adicionar ao array de transações (apenas para demonstração)
    transactions.push(newTransaction as any)

    return NextResponse.json(newTransaction, { status: 201 })
  } catch (error) {
    console.error("Error creating transaction:", error)
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
  }
}
