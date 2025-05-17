"use client"

import { useRouter } from "next/navigation"
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const strategies = [
  {
    id: "conservative",
    name: "Conservative",
    description: "Low risk, stable returns",
    icon: Shield,
    returnRange: "5-8%",
    risk: "Low",
    badge: "Popular",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    id: "quantum",
    name: "Akin Quantum AI",
    description: "AI-powered dynamic allocation",
    icon: Zap,
    returnRange: "12-30%",
    risk: "Dynamic",
    badge: "Featured",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    id: "aggressive",
    name: "Aggressive",
    description: "High risk, high potential returns",
    icon: TrendingUp,
    returnRange: "15-25%",
    risk: "High",
    badge: null,
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
]

export function InvestmentOpportunities() {
  const router = useRouter()

  return (
    <div className="space-y-4">
      {strategies.map((strategy) => (
        <Card key={strategy.id} className="overflow-hidden">
          <div className={`h-1.5 w-full ${strategy.color.split(" ")[0]}`} />
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{strategy.name}</CardTitle>
              {strategy.badge && (
                <Badge variant="secondary" className="text-xs">
                  {strategy.badge}
                </Badge>
              )}
            </div>
            <CardDescription className="flex items-center text-xs">
              <strategy.icon className="mr-1 h-3 w-3" />
              {strategy.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-muted-foreground">Expected Return</p>
                <p className="font-medium">{strategy.returnRange}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Risk Level</p>
                <p className="font-medium">{strategy.risk}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between px-2 text-xs"
              onClick={() => router.push(`/dashboard/invest?strategy=${strategy.id}`)}
            >
              <span>Invest Now</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>
      ))}
      <Button variant="outline" size="sm" className="w-full" onClick={() => router.push("/dashboard/invest")}>
        View All Strategies
      </Button>
    </div>
  )
}
