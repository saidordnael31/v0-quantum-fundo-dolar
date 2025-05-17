import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Inicialize o Stripe com sua chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: NextRequest) {
  try {
    const { amount, token, email, name } = await request.json()

    // Validar os dados
    if (!amount || !token || !email) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Criar um cliente no Stripe (ou recuperar um existente)
    let customer
    const existingCustomers = await stripe.customers.list({ email })

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0]
    } else {
      customer = await stripe.customers.create({
        email,
        name,
        source: token,
      })
    }

    // Criar um pagamento
    const charge = await stripe.charges.create({
      amount: Math.round(amount), // Stripe trabalha com centavos
      currency: "usd",
      customer: customer.id,
      description: "Investment in Akin Quantum Hedge Fund",
      receipt_email: email,
    })

    // Registrar o pagamento no banco de dados (em uma aplicação real)
    // await db.payments.create({ ... })

    return NextResponse.json({
      success: true,
      paymentId: charge.id,
      amount: charge.amount / 100, // Converter de centavos para dólares
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
