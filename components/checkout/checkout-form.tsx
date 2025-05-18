"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Check, CreditCard, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { PayPalButton } from "@/components/paypal/paypal-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "100",
      name: "",
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (paymentMethod !== "card") return

    setIsLoading(true)

    try {
      // Simular um atraso de processamento
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simular sucesso de pagamento
      setPaymentSuccess(true)
      toast({
        title: "Payment Successful",
        description: `Transaction ID: MOCK_${Date.now()}`,
      })

      // Limpar o formulário
      form.reset()
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment Error",
        description: "An error occurred while processing your payment",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePayPalSuccess = (details: any) => {
    setPaymentSuccess(true)
    // Você pode fazer algo com os detalhes do pagamento aqui
    console.log("PayPal payment successful:", details)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Complete your investment securely with our payment system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (USD)</FormLabel>
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
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
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
            </div>

            <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="card">Credit Card</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
              </TabsList>
              <TabsContent value="card" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <FormLabel>Card Details</FormLabel>
                  <div className="rounded-md border border-input p-3">
                    <div className="p-2 text-sm text-gray-500">
                      <p>Demo mode active - No actual payment processing</p>
                      <p className="mt-1">Any information will be accepted for testing</p>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4" disabled={isLoading || paymentSuccess}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Payment
                    </>
                  ) : paymentSuccess ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Payment Successful
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay with Card
                    </>
                  )}
                </Button>
              </TabsContent>
              <TabsContent value="paypal" className="mt-4">
                <div className="rounded-md border border-input p-3 mb-4">
                  <div className="p-2 text-sm text-gray-500">
                    <p>PayPal integration is in sandbox mode</p>
                    <p className="mt-1">No actual charges will be made</p>
                  </div>
                </div>
                <PayPalButton amount={form.getValues("amount")} onSuccess={handlePayPalSuccess} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
