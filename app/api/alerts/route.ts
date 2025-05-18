import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Obter parâmetros da consulta
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")

    // Validar parâmetros
    if (!userId) {
      return NextResponse.json({ error: 'O parâmetro "userId" é obrigatório' }, { status: 400 })
    }

    // Consultar alertas do usuário
    const query = `
      SELECT 
        id, 
        "userId", 
        symbol, 
        condition, 
        price, 
        strategy, 
        active, 
        "createdAt", 
        "updatedAt" 
      FROM 
        "Alert" 
      WHERE 
        "userId" = $1 
      ORDER BY 
        "createdAt" DESC
    `

    const data = await executeQuery(query, [userId])

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Erro ao buscar alertas:", error)
    return NextResponse.json({ error: "Erro ao buscar alertas" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, symbol, condition, price, strategy } = body

    // Validar dados
    if (!userId || !symbol || !condition || !price) {
      return NextResponse.json({ error: "Campos obrigatórios: userId, symbol, condition, price" }, { status: 400 })
    }

    // Inserir novo alerta
    const query = `
      INSERT INTO "Alert" (
        "userId", 
        symbol, 
        condition, 
        price, 
        strategy, 
        active
      ) 
      VALUES ($1, $2, $3, $4, $5, TRUE) 
      RETURNING *
    `

    const data = await executeQuery(query, [userId, symbol, condition, price, strategy || null])

    return NextResponse.json({ data: data[0] })
  } catch (error) {
    console.error("Erro ao criar alerta:", error)
    return NextResponse.json({ error: "Erro ao criar alerta" }, { status: 500 })
  }
}
