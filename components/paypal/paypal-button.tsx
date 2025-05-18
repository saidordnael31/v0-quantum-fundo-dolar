"use client"

import { useState } from "react"
import { PayPalButtons } from "@paypal/react-paypal-js"
import { useToast } from "@/hooks/use-toast"

interface PayPalButtonProps {
  amount: string
  onSuccess: (details: any) => void
}

export function PayPalButton({ amount, onSuccess }: PayPalButtonProps) {
  const { toast } = useToast()
  const [isPending, setIsPending] = useState(false)

  return (
    <div className="w-full mt-4">
      <PayPalButtons
        style={{ layout: "vertical", shape: "rect" }}
        disabled={isPending}
        forceReRender={[amount]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          })
        }}
        onApprove={async (data, actions) => {
          setIsPending(true)
          try {
            const details = await actions.order?.capture()
            toast({
              title: "Payment successful!",
              description: `Transaction ID: ${details?.id}`,
            })
            onSuccess(details)
          } catch (error) {
            console.error("PayPal payment error:", error)
            toast({
              title: "Payment failed",
              description: "There was an error processing your payment",
              variant: "destructive",
            })
          } finally {
            setIsPending(false)
          }
        }}
        onError={(err) => {
          console.error("PayPal error:", err)
          toast({
            title: "PayPal Error",
            description: "There was an error with PayPal. Please try again.",
            variant: "destructive",
          })
        }}
        onCancel={() => {
          toast({
            title: "Payment cancelled",
            description: "You cancelled the payment process",
          })
        }}
      />
    </div>
  )
}
