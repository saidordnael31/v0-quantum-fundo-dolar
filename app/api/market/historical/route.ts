import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Obter parâmetros da consulta
    const searchParams = request.nextUrl.searchParams
    const symbol = searchParams.get("symbol") || "BTC"
    const days = Number.parseInt(searchParams.get("days") || "7")

    // Validar parâmetros
    if (days <= 0 || days > 365) {
      return NextResponse.json({ error: 'O parâmetro "days" deve estar entre 1 e 365' }, { status: 400 })
    }

    // Consultar dados históricos
    const query = `
      SELECT 
        id, 
        symbol, 
        price, 
        volume, 
        "marketCap", 
        timestamp 
      FROM 
        "PriceHistory" 
      WHERE 
        symbol = $1 
        AND timestamp >= NOW() - INTERVAL '${days} days' 
      ORDER BY 
        timestamp ASC
    `

    const data = await executeQuery(query, [symbol])

    // Formatar dados para o gráfico
    const formattedData = data.map((row: any) => ({
      id: row.id,
      symbol: row.symbol,
      price: Number.parseFloat(row.price),
      volume: Number.parseFloat(row.volume),
      marketCap: Number.parseFloat(row.marketCap),
      timestamp: row.timestamp,
    }))

    return NextResponse.json({ data: formattedData })
  } catch (error) {
    console.error("Erro ao buscar dados históricos:", error)
    return NextResponse.json({ error: "Erro ao buscar dados históricos" }, { status: 500 })
  }
}
