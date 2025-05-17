import { NextResponse } from "next/server"
import { users } from "@/lib/data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Em um sistema real, você verificaria a autenticação e autorização aqui

  const userId = params.id
  const user = users.find((u) => u.id === userId)

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  // Em um sistema real, você verificaria a autenticação e autorização aqui

  try {
    const userId = params.id
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await request.json()

    // Atualizar usuário
    const updatedUser = {
      ...users[userIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    // Em um sistema real, você atualizaria o usuário no banco de dados
    // await db.users.update(userId, updatedUser)

    // Atualizar no array de usuários (apenas para demonstração)
    users[userIndex] = updatedUser

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // Em um sistema real, você verificaria a autenticação e autorização aqui

  try {
    const userId = params.id
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Em um sistema real, você excluiria ou desativaria o usuário no banco de dados
    // await db.users.delete(userId)
    // OU
    // await db.users.update(userId, { status: "inactive" })

    // Remover do array de usuários (apenas para demonstração)
    const deletedUser = users.splice(userIndex, 1)[0]

    return NextResponse.json({ message: "User deleted successfully", user: deletedUser })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
