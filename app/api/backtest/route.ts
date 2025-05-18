import { type NextRequest, NextResponse } from "next/server"
import { runBacktest } from "@/lib/services/backtesting"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar parâmetros necessários
    const requiredParams = [
      "userId",
      "strategyId",
      "symbol",
      "startDate",
      "endDate",
      "initialCapital",
      "strategyType",
      "strategyParams",
    ]
    for (const param of requiredParams) {
      if (!body[param]) {
        return NextResponse.json({ error: `Parâmetro obrigatório ausente: ${param}` }, { status: 400 })
      }
    }

    // Executar backtest
    const result = await runBacktest({
      userId: body.userId,
      strategyId: body.strategyId,
      symbol: body.symbol,
      startDate: body.startDate,
      endDate: body.endDate,
      initialCapital: body.initialCapital,
      strategyType: body.strategyType,
      strategyParams: body.strategyParams,
    })

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Erro na API de backtest:", error)
    return NextResponse.json({ error: error.message || "Erro ao executar backtest" }, { status: 500 })
  }
}
