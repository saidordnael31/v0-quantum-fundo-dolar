"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Interface para os dados de preço
interface PriceUpdate {
  symbol: string
  price: number
  timestamp: number
  change: number
}

export function WebsocketPriceFeed() {
  const [prices, setPrices] = useState<Record<string, PriceUpdate>>({})
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

  // Função para conectar ao websocket
  const connectWebsocket = () => {
    try {
      // Usar Binance WebSocket API para dados em tempo real
      const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker/ethusdt@ticker")

      wsRef.current = ws

      ws.onopen = () => {
        console.log("WebSocket conectado")
        setConnected(true)
        setError(null)
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)

          // Processar dados do ticker
          if (data.s && data.c) {
            const symbol = data.s // Símbolo (ex: BTCUSDT)
            const price = Number.parseFloat(data.c) // Preço atual
            const change = Number.parseFloat(data.P) // Variação percentual em 24h

            setPrices((prev) => ({
              ...prev,
              [symbol]: {
                symbol,
                price,
                timestamp: Date.now(),
                change,
              },
            }))
          }
        } catch (err) {
          console.error("Erro ao processar mensagem do WebSocket:", err)
        }
      }

      ws.onerror = (event) => {
        console.error("Erro no WebSocket:", event)
        setError("Erro na conexão WebSocket. Tentando reconectar...")
        setConnected(false)
      }

      ws.onclose = () => {
        console.log("WebSocket desconectado")
        setConnected(false)

        // Tentar reconectar após 5 segundos
        setTimeout(() => {
          if (wsRef.current?.readyState !== WebSocket.OPEN) {
            connectWebsocket()
          }
        }, 5000)
      }
    } catch (err) {
      console.error("Erro ao conectar WebSocket:", err)
      setError("Não foi possível estabelecer conexão WebSocket. Usando dados simulados.")

      // Usar dados simulados em caso de erro
      const simulateData = () => {
        const btcPrice = 67000 + (Math.random() * 1000 - 500)
        const ethPrice = 3500 + (Math.random() * 100 - 50)

        setPrices({
          BTCUSDT: {
            symbol: "BTCUSDT",
            price: btcPrice,
            timestamp: Date.now(),
            change: 2.5,
          },
          ETHUSDT: {
            symbol: "ETHUSDT",
            price: ethPrice,
            timestamp: Date.now(),
            change: 1.8,
          },
        })
      }

      // Simular atualizações a cada segundo
      const intervalId = setInterval(simulateData, 1000)
      simulateData() // Iniciar imediatamente

      return () => clearInterval(intervalId)
    }
  }

  // Conectar ao WebSocket quando o componente montar
  useEffect(() => {
    connectWebsocket()

    // Limpar WebSocket quando o componente desmontar
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  // Renderizar esqueleto de carregamento
  if (Object.keys(prices).length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Preços em Tempo Real
            <Badge variant="outline">Carregando</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Preços em Tempo Real
          <Badge variant={connected ? "success" : "destructive"}>{connected ? "Conectado" : "Desconectado"}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="warning" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          {Object.values(prices).map((item) => (
            <div key={item.symbol} className="flex items-center justify-between rounded-md border p-3">
              <div>
                <div className="font-medium">{item.symbol}</div>
                <div className="text-xs text-muted-foreground">
                  Atualizado:{" "}
                  {new Date(item.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">
                  ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className={`text-xs ${item.change >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                  {item.change >= 0 ? "+" : ""}
                  {item.change.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
