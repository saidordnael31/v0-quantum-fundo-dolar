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

    // Consultar notificações do usuário
    const query = `
      SELECT 
        id, 
        "userId", 
        symbol, 
        message, 
        type, 
        strategy, 
        read, 
        "createdAt" 
      FROM 
        "Notification" 
      WHERE 
        "userId" = $1 
      ORDER BY 
        "createdAt" DESC
    `

    const data = await executeQuery(query, [userId])

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Erro ao buscar notificações:", error)
    return NextResponse.json({ error: "Erro ao buscar notificações" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, read } = body

    // Validar dados
    if (!id || read === undefined) {
      return NextResponse.json({ error: "Campos obrigatórios: id, read" }, { status: 400 })
    }

    // Atualizar status de leitura da notificação
    const query = `
      UPDATE "Notification" 
      SET read = $1 
      WHERE id = $2 
      RETURNING *
    `

    const data = await executeQuery(query, [read, id])

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Notificação não encontrada" }, { status: 404 })
    }

    return NextResponse.json({ data: data[0] })
  } catch (error) {
    console.error("Erro ao atualizar notificação:", error)
    return NextResponse.json({ error: "Erro ao atualizar notificação" }, { status: 500 })
  }
}
