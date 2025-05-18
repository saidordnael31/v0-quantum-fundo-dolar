import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json({ error: "ID do backtest é obrigatório" }, { status: 400 })
    }

    // Buscar detalhes do backtest
    const query = `
      SELECT 
        b.*,
        s.name as "strategyName",
        s.type as "strategyType",
        s.parameters as "strategyParameters"
      FROM "Backtest" b
      JOIN "Strategy" s ON b."strategyId" = s.id
      WHERE b.id = $1
    `

    const [backtest] = await executeQuery(query, [id])

    if (!backtest) {
      return NextResponse.json({ error: "Backtest não encontrado" }, { status: 404 })
    }

    return NextResponse.json(backtest)
  } catch (error: any) {
    console.error("Erro na API de detalhes do backtest:", error)
    return NextResponse.json({ error: error.message || "Erro ao buscar detalhes do backtest" }, { status: 500 })
  }
}
