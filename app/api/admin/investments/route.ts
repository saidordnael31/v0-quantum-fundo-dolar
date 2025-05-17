import { NextResponse } from "next/server"
import { investments } from "@/lib/data"

export async function GET(request: Request) {
  // Em um sistema real, você verificaria a autenticação e autorização aqui

  // Obter parâmetros de consulta
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const strategy = searchParams.get("strategy")
  const userId = searchParams.get("userId")

  // Filtrar investimentos com base nos parâmetros
  let filteredInvestments = [...investments]

  if (status) {
    filteredInvestments = filteredInvestments.filter((inv) => inv.status === status)
  }

  if (strategy) {
    filteredInvestments = filteredInvestments.filter((inv) => inv.strategy === strategy)
  }

  if (userId) {
    filteredInvestments = filteredInvestments.filter((inv) => inv.userId === userId)
  }

  // Ordenar por data (mais recente primeiro)
  filteredInvestments.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())

  return NextResponse.json(filteredInvestments)
}

export async function POST(request: Request) {
  // Em um sistema real, você verificaria a autenticação e autorização aqui

  try {
    const body = await request.json()

    // Validar dados
    if (
      !body.userId ||
      !body.strategy ||
      !body.amount ||
      !body.currency ||
      !body.duration ||
      body.riskLevel === undefined
    ) {
      return NextResponse.json(
        { error: "User ID, strategy, amount, currency, duration, and risk level are required" },
        { status: 400 },
      )
    }

    // Criar novo investimento
    const newInvestment = {
      id: `inv_${investments.length + 1}`,
      userId: body.userId,
      strategy: body.strategy,
      amount: body.amount,
      currency: body.currency,
      status: body.status || "pending",
      startDate: new Date().toISOString(),
      duration: body.duration,
      riskLevel: body.riskLevel,
      currentValue: body.amount,
      profit: 0,
      profitPercentage: 0,
    }

    // Em um sistema real, você adicionaria o investimento ao banco de dados
    // await db.investments.create(newInvestment)

    // Adicionar ao array de investimentos (apenas para demonstração)
    investments.push(newInvestment as any)

    return NextResponse.json(newInvestment, { status: 201 })
  } catch (error) {
    console.error("Error creating investment:", error)
    return NextResponse.json({ error: "Failed to create investment" }, { status: 500 })
  }
}
