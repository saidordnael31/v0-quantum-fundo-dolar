import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Inicialize o Stripe com sua chave secreta apenas quando a rota for chamada
// não durante o build
let stripe: Stripe | null = null

function getStripe() {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    })
  }
  return stripe
}

export async function POST(request: NextRequest) {
  try {
    const stripeInstance = getStripe()

    // Verificar se o Stripe foi inicializado corretamente
    if (!stripeInstance) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Stripe não foi inicializado. Verifique se a variável de ambiente STRIPE_SECRET_KEY está configurada.",
        },
        { status: 500 },
      )
    }

    const { amount, token, email, name } = await request.json()

    // Validar os dados
    if (!amount || !token || !email) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Criar um cliente no Stripe (ou recuperar um existente)
    let customer
    const existingCustomers = await stripeInstance.customers.list({ email })

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0]
    } else {
      customer = await stripeInstance.customers.create({
        email,
        name,
        source: token,
      })
    }

    // Criar um pagamento
    const charge = await stripeInstance.charges.create({
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
