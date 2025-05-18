import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Aqui você normalmente verificaria as credenciais no banco de dados
    // Para este exemplo, vamos apenas simular um login bem-sucedido

    if (email && password) {
      // Simulação de login bem-sucedido
      return NextResponse.json(
        {
          success: true,
          message: "Login successful",
          user: { id: "1", email, name: "Test User" },
        },
        { status: 200 },
      )
    } else {
      // Credenciais inválidas
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

// Adicionar suporte ao método OPTIONS para CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  })
}
