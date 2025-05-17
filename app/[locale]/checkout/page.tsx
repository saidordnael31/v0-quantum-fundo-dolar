import type { Metadata } from "next"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "payment" })

  return {
    title: `${t("checkout")} | Akin Quantum Hedge Fund Offshore`,
    description: "Complete your investment securely with our payment system",
  }
}

export default async function CheckoutPage() {
  return (
    <div className="container mx-auto py-10">
      <CheckoutForm />
    </div>
  )
}
