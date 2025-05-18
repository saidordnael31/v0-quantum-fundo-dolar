"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PriceHistoryChart } from "@/components/price-history-chart"
import { AlertManager } from "@/components/alert-manager"
import { NotificationCenter } from "@/components/notification-center"

export default function TradingPage() {
  const [activeSymbol, setActiveSymbol] = useState("BTC")
  // Usuário mockado para demonstração
  const userId = "user123"

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-3xl font-bold">Trading Algorítmico</h1>

      <div className="mb-6">
        <Tabs defaultValue="BTC" onValueChange={setActiveSymbol}>
          <TabsList>
            <TabsTrigger value="BTC">Bitcoin</TabsTrigger>
            <TabsTrigger value="ETH">Ethereum</TabsTrigger>
            <TabsTrigger value="SOL">Solana</TabsTrigger>
            <TabsTrigger value="BNB">Binance Coin</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PriceHistoryChart
            symbol={activeSymbol}
            title={`${activeSymbol} - Histórico de Preços`}
            showIndicators={true}
            height={500}
          />
        </div>
        <div>
          <NotificationCenter userId={userId} />
        </div>
      </div>

      <div className="mt-6">
        <AlertManager userId={userId} />
      </div>
    </div>
  )
}
