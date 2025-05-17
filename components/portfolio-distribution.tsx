"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, Bitcoin, ArrowRightLeft } from "lucide-react"

const data = [
  { name: "Bitcoin (BTC)", value: 67.2, color: "#f7931a" },
  { name: "Dólar (USD)", value: 32.8, color: "#2775ca" },
]

export function PortfolioDistribution() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Alocação"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <Card>
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="rounded-full bg-[#f7931a] p-3">
                <Bitcoin className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Bitcoin</div>
                <div className="text-xl font-bold">12.45 BTC</div>
                <div className="text-sm text-muted-foreground">$837,452.24 (67.2%)</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="rounded-full bg-[#2775ca] p-3">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Dólar</div>
                <div className="text-xl font-bold">$408,225.76</div>
                <div className="text-sm text-muted-foreground">32.8% do portfólio</div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full">
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            Rebalancear Portfólio
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-2">Estratégia Quantum</h3>
          <p className="text-sm text-muted-foreground">
            Nossa estratégia de investimento quantum utiliza algoritmos avançados para otimizar a alocação entre BTC e
            USD, aproveitando a volatilidade do mercado e maximizando retornos enquanto minimiza riscos. O
            rebalanceamento automático é realizado com base em indicadores técnicos e análise quântica de padrões de
            mercado.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
