import type React from "react"
import { PayPalProvider } from "@/components/paypal/paypal-provider"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PayPalProvider>{children}</PayPalProvider>
}
