import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()
    const { active } = body

    // Validar dados
    if (active === undefined) {
      return NextResponse.json({ error: 'O campo "active" é obrigatório' }, { status: 400 })
    }

    // Atualizar alerta
    const query = `
      UPDATE "Alert" 
      SET active = $1, "updatedAt" = NOW() 
      WHERE id = $2 
      RETURNING *
    `

    const data = await executeQuery(query, [active, id])

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Alerta não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ data: data[0] })
  } catch (error) {
    console.error("Erro ao atualizar alerta:", error)
    return NextResponse.json({ error: "Erro ao atualizar alerta" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Excluir alerta
    const query = `
      DELETE FROM "Alert" 
      WHERE id = $1 
      RETURNING id
    `

    const data = await executeQuery(query, [id])

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Alerta não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao excluir alerta:", error)
    return NextResponse.json({ error: "Erro ao excluir alerta" }, { status: 500 })
  }
}
