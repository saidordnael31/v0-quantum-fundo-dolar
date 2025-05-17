import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Versão simulada que não depende do Stripe
    const { amount, email, name } = await request.json()

    // Validar os dados
    if (!amount || !email) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Simular um ID de transação
    const transactionId = `sim_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`

    // Retornar uma resposta simulada
    return NextResponse.json({
      success: true,
      paymentId: transactionId,
      amount: Number(amount) / 100, // Converter de centavos para dólares
      message: "Simulação de pagamento bem-sucedida. Stripe não está configurado no ambiente.",
    })
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    )
  }
}
