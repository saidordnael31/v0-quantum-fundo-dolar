"use client"

import { useRealTimeData } from "@/hooks/use-real-time-data"
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function RealTimeTicker() {
  const { data, loading, error, refetch } = useRealTimeData(5000) // Atualizar a cada 5 segundos

  if (loading) {
    return (
      <div className="flex items-center space-x-4 overflow-hidden bg-muted/50 p-2 rounded-md">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex items-center space-x-2 overflow-hidden bg-muted/50 p-2 rounded-md">
        <span className="text-sm text-muted-foreground">Dados indisponíveis</span>
        <button onClick={refetch} className="text-primary hover:text-primary/80">
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
    )
  }

  const btcChangeIsPositive = data.bitcoin.change_24h_percent >= 0

  return (
    <div className="flex items-center space-x-4 overflow-hidden bg-muted/50 p-2 rounded-md text-sm">
      <div className="flex items-center">
        <span className="font-medium mr-1">BTC/USD:</span>
        <span className="font-bold">${data.bitcoin.usd.toLocaleString()}</span>
        <span className={`ml-1 flex items-center ${btcChangeIsPositive ? "text-emerald-500" : "text-rose-500"}`}>
          {btcChangeIsPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
          {btcChangeIsPositive ? "+" : ""}
          {data.bitcoin.change_24h_percent.toFixed(2)}%
        </span>
      </div>

      <div className="flex items-center">
        <span className="font-medium mr-1">BTC/BRL:</span>
        <span className="font-bold">R${data.bitcoin.brl.toLocaleString()}</span>
      </div>

      <div className="flex items-center">
        <span className="font-medium mr-1">USD/BRL:</span>
        <span className="font-bold">R${data.forex.usd_brl.toFixed(2)}</span>
      </div>

      <div className="text-xs text-muted-foreground flex items-center">
        <span>Atualizado: {new Date(data.timestamp).toLocaleTimeString()}</span>
        <button onClick={refetch} className="ml-1 text-primary hover:text-primary/80">
          <RefreshCw className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
