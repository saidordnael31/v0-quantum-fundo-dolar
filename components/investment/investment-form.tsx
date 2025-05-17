"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bitcoin, DollarSign, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function InvestmentForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [riskLevel, setRiskLevel] = useState([50])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [investmentType, setInvestmentType] = useState("usd")
  const [amount, setAmount] = useState("")
  const [strategy, setStrategy] = useState("")
  const [duration, setDuration] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setShowConfirmation(true)
  }

  async function confirmInvestment() {
    setIsLoading(true)

    try {
      // Simulate processing the investment
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success toast
      toast({
        title: "Investment successful",
        description: "Your investment has been processed successfully",
      })

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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Investment Currency</label>
                  <RadioGroup
                    value={investmentType}
                    onValueChange={setInvestmentType}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="usd" id="usd" />
                      <label htmlFor="usd" className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4" />
                        USD
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="btc" id="btc" />
                      <label htmlFor="btc" className="flex items-center">
                        <Bitcoin className="mr-2 h-4 w-4" />
                        BTC
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Investment Amount</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      {investmentType === "usd" ? (
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Bitcoin className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <Input
                      placeholder={investmentType === "usd" ? "10000" : "0.25"}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {investmentType === "usd" ? "Minimum investment: $1,000" : "Minimum investment: 0.01 BTC"}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Investment Strategy</label>
                  <Select value={strategy} onValueChange={setStrategy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative (Low Risk)</SelectItem>
                      <SelectItem value="balanced">Balanced (Medium Risk)</SelectItem>
                      <SelectItem value="aggressive">Aggressive (High Risk)</SelectItem>
                      <SelectItem value="quantum">Quantum AI (Dynamic)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Each strategy has a different risk-reward profile</p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Risk Tolerance</label>
                  <div className="space-y-3">
                    <Slider value={riskLevel} max={100} step={1} onValueChange={setRiskLevel} className="py-4" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Low Risk</span>
                      <span>Medium Risk</span>
                      <span>High Risk</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Current risk level: {riskLevel}%</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Investment Duration</label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flexible">Flexible (No Lock-up)</SelectItem>
                      <SelectItem value="3months">3 Months</SelectItem>
                      <SelectItem value="6months">6 Months</SelectItem>
                      <SelectItem value="1year">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Longer durations may offer better returns</p>
                </div>

                <Button type="submit" className="w-full">
                  Review Investment
                </Button>
              </form>
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
                      {investmentType === "usd" ? (
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
                      {investmentType === "usd" ? "$" : ""}
                      {amount} {investmentType === "btc" ? "BTC" : ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Strategy</p>
                    <p className="text-lg font-semibold capitalize">{strategy}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Duration</p>
                    <p className="text-lg font-semibold capitalize">
                      {duration === "flexible"
                        ? "Flexible"
                        : duration === "3months"
                          ? "3 Months"
                          : duration === "6months"
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
                      {strategy === "conservative"
                        ? "5-8%"
                        : strategy === "balanced"
                          ? "8-15%"
                          : strategy === "aggressive"
                            ? "15-25%"
                            : "12-30%"}
                    </p>
                  </div>
                </div>
              </div>

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
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">Proceed to Payment</Button>
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
