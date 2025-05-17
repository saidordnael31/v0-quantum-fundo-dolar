import { NextResponse } from "next/server"
import { users } from "@/lib/data"

export async function GET(request: Request) {
  // Em um sistema real, você verificaria a autenticação e autorização aqui
  // const session = await getServerSession(authOptions)
  // if (!session || session.user.role !== "admin") {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // }

  // Obter parâmetros de consulta
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")?.toLowerCase()

  // Filtrar usuários com base nos parâmetros
  let filteredUsers = [...users]

  if (status) {
    filteredUsers = filteredUsers.filter((user) => user.status === status)
  }

  if (search) {
    filteredUsers = filteredUsers.filter(
      (user) => user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search),
    )
  }

  return NextResponse.json(filteredUsers)
}

export async function POST(request: Request) {
  // Em um sistema real, você verificaria a autenticação e autorização aqui

  try {
    const body = await request.json()

    // Validar dados
    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Verificar se o email já existe
    if (users.some((user) => user.email === body.email)) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 })
    }

    // Criar novo usuário
    const newUser = {
      id: `usr_${users.length + 1}`,
      name: body.name,
      email: body.email,
      role: body.role || "user",
      createdAt: new Date().toISOString(),
      status: body.status || "pending",
      totalInvested: 0,
      profileImage:
        body.profileImage ||
        `https://randomuser.me/api/portraits/${body.gender === "female" ? "women" : "men"}/${Math.floor(Math.random() * 100)}.jpg`,
    }

    // Em um sistema real, você adicionaria o usuário ao banco de dados
    // await db.users.create(newUser)

    // Adicionar ao array de usuários (apenas para demonstração)
    users.push(newUser as any)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
