"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Bitcoin, DollarSign, Info, Check, AlertCircle, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Import the action directly
import { sendInvestmentConfirmationEmail } from "@/app/api/email/actions"

const formSchema = z.object({
  investmentType: z.enum(["usd", "btc"]),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  strategy: z.string().min(1, { message: "Please select an investment strategy" }),
  duration: z.string().min(1, { message: "Please select an investment duration" }),
  riskLevel: z.number().optional(),
})

export function InvestmentForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [riskLevel, setRiskLevel] = useState([50])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema> | null>(null)
  const [emailStatus, setEmailStatus] = useState<{ success: boolean; message?: string } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      investmentType: "usd",
      amount: "",
      strategy: "",
      duration: "",
      riskLevel: 50,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormValues(values)
    setShowConfirmation(true)
  }

  async function confirmInvestment() {
    setIsLoading(true)
    setEmailStatus(null)

    try {
      // Simulate processing the investment
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate a transaction ID
      const transactionId = `TX${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`

      // Format the current date
      const date = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })

      // Send confirmation email
      // In a real app, you would get the user's email from their session/auth
      const userEmail = "investor@example.com" // This would come from auth context in a real app

      const emailResult = await sendInvestmentConfirmationEmail(userEmail, {
        investmentType: formValues?.investmentType || "usd",
        amount: formValues?.amount || "0",
        strategy: formValues?.strategy || "",
        duration: formValues?.duration || "",
        riskLevel: riskLevel[0],
        transactionId,
        date,
      })

      setEmailStatus(emailResult)

      // Show success toast
      toast({
        title: "Investment successful",
        description: "Your investment has been processed successfully",
      })

      // If email was successful, show additional toast
      if (emailResult.success) {
        toast({
          title: "Confirmation email sent",
          description: `A confirmation email has been sent to ${userEmail}`,
        })
      }

      // Wait a moment before redirecting if there was an email issue
      if (!emailResult.success) {
        await new Promise((resolve) => setTimeout(resolve, 3000))
      }

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Investment processing error:", error)
      toast({
        title: "Error processing investment",
        description: "There was an error processing your investment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {!showConfirmation ? (
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>New Investment</CardTitle>
              <CardDescription>
                Complete the form below to make a new investment in the Akin Quantum Hedge Fund Offshore
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="investmentType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Investment Currency</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="usd" id="usd" />
                              <FormLabel htmlFor="usd" className="flex items-center">
                                <DollarSign className="mr-2 h-4 w-4" />
                                USD
                              </FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="btc" id="btc" />
                              <FormLabel htmlFor="btc" className="flex items-center">
                                <Bitcoin className="mr-2 h-4 w-4" />
                                BTC
                              </FormLabel>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investment Amount</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                              {form.watch("investmentType") === "usd" ? (
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Bitcoin className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <Input
                              placeholder={form.watch("investmentType") === "usd" ? "10000" : "0.25"}
                              {...field}
                              className="pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          {form.watch("investmentType") === "usd"
                            ? "Minimum investment: $1,000"
                            : "Minimum investment: 0.01 BTC"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="strategy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investment Strategy</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a strategy" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="conservative">Conservative (Low Risk)</SelectItem>
                            <SelectItem value="balanced">Balanced (Medium Risk)</SelectItem>
                            <SelectItem value="aggressive">Aggressive (High Risk)</SelectItem>
                            <SelectItem value="quantum">Quantum AI (Dynamic)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Each strategy has a different risk-reward profile</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="riskLevel"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Risk Tolerance</FormLabel>
                        <FormControl>
                          <div className="space-y-3">
                            <Slider
                              value={riskLevel}
                              max={100}
                              step={1}
                              onValueChange={(value) => {
                                setRiskLevel(value)
                                field.onChange(value[0])
                              }}
                              className="py-4"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Low Risk</span>
                              <span>Medium Risk</span>
                              <span>High Risk</span>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription>Current risk level: {riskLevel}%</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investment Duration</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="flexible">Flexible (No Lock-up)</SelectItem>
                            <SelectItem value="3months">3 Months</SelectItem>
                            <SelectItem value="6months">6 Months</SelectItem>
                            <SelectItem value="1year">1 Year</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Longer durations may offer better returns</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Review Investment
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Confirm Your Investment</CardTitle>
              <CardDescription>Please review your investment details before confirming</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Investment Type</p>
                    <p className="text-lg font-semibold">
                      {formValues?.investmentType === "usd" ? (
                        <span className="flex items-center">
                          <DollarSign className="mr-1 h-4 w-4" /> USD
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Bitcoin className="mr-1 h-4 w-4" /> BTC
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Amount</p>
                    <p className="text-lg font-semibold">
                      {formValues?.investmentType === "usd" ? "$" : ""}
                      {formValues?.amount} {formValues?.investmentType === "btc" ? "BTC" : ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Strategy</p>
                    <p className="text-lg font-semibold capitalize">{formValues?.strategy}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Duration</p>
                    <p className="text-lg font-semibold capitalize">
                      {formValues?.duration === "flexible"
                        ? "Flexible"
                        : formValues?.duration === "3months"
                          ? "3 Months"
                          : formValues?.duration === "6months"
                            ? "6 Months"
                            : "1 Year"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                    <p className="text-lg font-semibold">{riskLevel}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Estimated Annual Return</p>
                    <p className="text-lg font-semibold text-emerald-500">
                      {formValues?.strategy === "conservative"
                        ? "5-8%"
                        : formValues?.strategy === "balanced"
                          ? "8-15%"
                          : formValues?.strategy === "aggressive"
                            ? "15-25%"
                            : "12-30%"}
                    </p>
                  </div>
                </div>
              </div>

              {emailStatus && (
                <Alert variant={emailStatus.success ? "default" : "destructive"}>
                  {emailStatus.success ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <AlertTitle>{emailStatus.success ? "Confirmation Email" : "Email Notification Issue"}</AlertTitle>
                  <AlertDescription>
                    {emailStatus.success
                      ? "A confirmation email will be sent to your registered email address."
                      : emailStatus.message ||
                        "There was an issue sending the confirmation email. Your investment was processed successfully, but you may not receive an email confirmation."}
                  </AlertDescription>
                </Alert>
              )}

              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Important Information</p>
                    <p className="text-sm text-muted-foreground">
                      All investments involve risk and may lose value. Past performance is not indicative of future
                      results. By confirming this investment, you acknowledge that you have read and understood the
                      terms and conditions.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                Back
              </Button>
              <Link href="/checkout" passHref>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Proceed to Payment
                </Button>
              </Link>
              <Button onClick={confirmInvestment} disabled={isLoading}>
                {isLoading ? "Processing..." : "Confirm Investment"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}
