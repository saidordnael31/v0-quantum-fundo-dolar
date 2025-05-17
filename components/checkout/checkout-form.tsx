"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Check, CreditCard, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  amount: z.string().min(1, {
    message: "Amount is required",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
})

export function CheckoutForm() {
  const t = useTranslations("payment")
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "10000",
      name: "",
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Simular um atraso de processamento
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Enviar os dados para o servidor
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number.parseFloat(values.amount) * 100, // Stripe trabalha com centavos
          email: values.email,
          name: values.name,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Payment failed")
      }

      // Pagamento bem-sucedido
      setPaymentSuccess(true)
      toast({
        title: t("success"),
        description: `Transaction ID: ${data.paymentId}`,
      })

      // Limpar o formulário
      form.reset()
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: t("error"),
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("checkout")}</CardTitle>
            <CardDescription>Complete your investment securely with our payment system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("amount")} (USD)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                      <Input {...field} className="pl-8" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>{t("paymentMethod")}</FormLabel>
              <Select defaultValue="card">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="bank" disabled>
                    Bank Transfer (Coming Soon)
                  </SelectItem>
                  <SelectItem value="crypto" disabled>
                    Cryptocurrency (Coming Soon)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("cardholderName")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>{t("cardDetails")}</FormLabel>
                <div className="rounded-md border border-input p-3">
                  <div className="p-2 text-sm text-gray-500">
                    <p>Modo de simulação ativo - Stripe não está configurado</p>
                    <p className="mt-1">Qualquer informação será aceita para testes</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading || paymentSuccess}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("processingPayment")}
                </>
              ) : paymentSuccess ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  {t("success")}
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  {t("pay")}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
