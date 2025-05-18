import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "Parâmetro userId é obrigatório" }, { status: 400 })
    }

    // Buscar histórico de backtests do usuário
    const query = `
      SELECT 
        b.id,
        b."userId",
        b."strategyId",
        s.name as "strategyName",
        s.type as "strategyType",
        b.symbol,
        b."startDate",
        b."endDate",
        b.profit,
        b.trades,
        b."createdAt"
      FROM "Backtest" b
      JOIN "Strategy" s ON b."strategyId" = s.id
      WHERE b."userId" = $1
      ORDER BY b."createdAt" DESC
    `

    const backtests = await executeQuery(query, [userId])

    return NextResponse.json(backtests)
  } catch (error: any) {
    console.error("Erro na API de histórico de backtest:", error)
    return NextResponse.json({ error: error.message || "Erro ao buscar histórico de backtests" }, { status: 500 })
  }
}
