"use client"

import type { ReactNode } from "react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

// Configurações iniciais do PayPal
const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test", // Use um ID de cliente de sandbox para testes
  currency: "USD",
  intent: "capture",
}

interface PayPalProviderProps {
  children: ReactNode
}

export function PayPalProvider({ children }: PayPalProviderProps) {
  return <PayPalScriptProvider options={initialOptions}>{children}</PayPalScriptProvider>
}
