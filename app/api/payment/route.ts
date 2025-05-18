import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Verificar se a requisição tem um corpo válido antes de chamar json()
    const contentType = request.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json({ success: false, message: "Content-Type must be application/json" }, { status: 400 })
    }

    let body
    try {
      body = await request.json()
    } catch (e) {
      console.error("Error parsing JSON:", e)
      return NextResponse.json({ success: false, message: "Invalid JSON in request body" }, { status: 400 })
    }

    const { amount, currency, paymentMethod } = body || {}

    // Validação básica
    if (!amount || !currency || !paymentMethod) {
      return NextResponse.json({ success: false, message: "Missing required payment information" }, { status: 400 })
    }

    // Simulação de processamento de pagamento bem-sucedido
    return NextResponse.json(
      {
        success: true,
        message: "Payment processed successfully",
        transactionId: "mock_transaction_" + Math.random().toString(36).substring(2),
        amount,
        currency,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Payment processing error:", error)
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
