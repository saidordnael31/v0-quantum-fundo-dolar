import { NextResponse } from "next/server"

// Versão simplificada que sempre retorna sucesso com dados mockados
export async function POST() {
  // Simular um atraso para parecer real
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Retornar dados mockados de sucesso
  return NextResponse.json({
    success: true,
    paymentId: `MOCK_${Date.now()}`,
    amount: 10000,
    message: "Mock payment successful. No actual payment processing occurred.",
  })
}
