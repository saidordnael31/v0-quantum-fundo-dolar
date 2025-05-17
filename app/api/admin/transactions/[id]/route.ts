import { NextResponse } from "next/server"
import { transactions } from "@/lib/data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Em um sistema real, você verificaria a autenticação e autorização aqui

  const transactionId = params.id
  const transaction = transactions.find((tx) => tx.id === transactionId)

  if (!transaction) {
    return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
  }

  return NextResponse.json(transaction)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  // Em um sistema real, você verificaria a autenticação e autorização aqui

  try {
    const transactionId = params.id
    const transactionIndex = transactions.findIndex((tx) => tx.id === transactionId)

    if (transactionIndex === -1) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    const body = await request.json()

    // Atualizar transação
    const updatedTransaction = {
      ...transactions[transactionIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    // Em um sistema real, você atualizaria a transação no banco de dados
    // await db.transactions.update(transactionId, updatedTransaction)

    // Atualizar no array de transações (apenas para demonstração)
    transactions[transactionIndex] = updatedTransaction

    return NextResponse.json(updatedTransaction)
  } catch (error) {
    console.error("Error updating transaction:", error)
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 })
  }
}
