"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Loader2, AlertTriangle, X } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Alert {
  id: string
  userId: string
  symbol: string
  condition: string
  price: number
  strategy: string | null
  active: boolean
  createdAt: string
  updatedAt: string
}

interface AlertManagerProps {
  userId: string
}

export function AlertManager({ userId }: AlertManagerProps) {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newAlert, setNewAlert] = useState({
    symbol: "BTC",
    condition: "above",
    price: 0,
  })

  // Buscar alertas do usuário
  const fetchAlerts = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/alerts?userId=${userId}`)

      if (!response.ok) {
        throw new Error(`Erro ao buscar alertas: ${response.status}`)
      }

      const result = await response.json()
      setAlerts(result.data)
    } catch (err: any) {
      setError(err.message || "Erro ao buscar alertas")
      console.error("Erro ao buscar alertas:", err)
    } finally {
      setLoading(false)
    }
  }

  // Criar novo alerta
  const createAlert = async () => {
    try {
      const response = await fetch("/api/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          ...newAlert,
        }),
      })

      if (!response.ok) {
        throw new Error(`Erro ao criar alerta: ${response.status}`)
      }

      const result = await response.json()
      setAlerts([result.data, ...alerts])

      // Resetar formulário
      setNewAlert({
        symbol: "BTC",
        condition: "above",
        price: 0,
      })

      toast({
        title: "Alerta criado",
        description: `Alerta criado com sucesso para ${newAlert.symbol} ${newAlert.condition} $${newAlert.price}`,
      })
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err.message || "Erro ao criar alerta",
        variant: "destructive",
      })
      console.error("Erro ao criar alerta:", err)
    }
  }

  // Atualizar status do alerta
  const toggleAlertStatus = async (id: string, active: boolean) => {
    try {
      const response = await fetch(`/api/alerts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          active: !active,
        }),
      })

      if (!response.ok) {
        throw new Error(`Erro ao atualizar alerta: ${response.status}`)
      }

      const result = await response.json()

      // Atualizar lista de alertas
      setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, active: !active } : alert)))

      toast({
        title: "Alerta atualizado",
        description: `Alerta ${!active ? "ativado" : "desativado"} com sucesso`,
      })
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err.message || "Erro ao atualizar alerta",
        variant: "destructive",
      })
      console.error("Erro ao atualizar alerta:", err)
    }
  }

  // Excluir alerta
  const deleteAlert = async (id: string) => {
    try {
      const response = await fetch(`/api/alerts/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Erro ao excluir alerta: ${response.status}`)
      }

      // Remover alerta da lista
      setAlerts(alerts.filter((alert) => alert.id !== id))

      toast({
        title: "Alerta excluído",
        description: "Alerta excluído com sucesso",
      })
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err.message || "Erro ao excluir alerta",
        variant: "destructive",
      })
      console.error("Erro ao excluir alerta:", err)
    }
  }

  // Buscar alertas ao carregar o componente
  useEffect(() => {
    fetchAlerts()
  }, [userId])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciador de Alertas</CardTitle>
        <CardDescription>Configure alertas para receber notificações sobre movimentos de preço</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <Label htmlFor="symbol">Ativo</Label>
              <Select value={newAlert.symbol} onValueChange={(value) => setNewAlert({ ...newAlert, symbol: value })}>
                <SelectTrigger id="symbol">
                  <SelectValue placeholder="Selecione um ativo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                  <SelectItem value="SOL">Solana (SOL)</SelectItem>
                  <SelectItem value="BNB">Binance Coin (BNB)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="condition">Condição</Label>
              <Select
                value={newAlert.condition}
                onValueChange={(value) => setNewAlert({ ...newAlert, condition: value })}
              >
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Selecione uma condição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="above">Acima de</SelectItem>
                  <SelectItem value="below">Abaixo de</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Preço (USD)</Label>
              <Input
                id="price"
                type="number"
                value={newAlert.price}
                onChange={(e) => setNewAlert({ ...newAlert, price: Number.parseFloat(e.target.value) })}
                min={0}
                step={100}
              />
            </div>

            <div className="flex items-end">
              <Button onClick={createAlert} className="w-full">
                Criar Alerta
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Seus Alertas</h3>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center rounded-md border border-dashed p-8">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <AlertTriangle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            </div>
          ) : alerts.length === 0 ? (
            <div className="flex items-center justify-center rounded-md border border-dashed p-8">
              <p className="text-center text-muted-foreground">Você ainda não tem alertas configurados</p>
            </div>
          ) : (
            <div className="space-y-2">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between rounded-md border p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`h-2 w-2 rounded-full ${alert.active ? "bg-green-500" : "bg-gray-300"}`} />
                    <div>
                      <p className="font-medium">
                        {alert.symbol} {alert.condition === "above" ? "acima de" : "abaixo de"} $
                        {alert.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Criado em {new Date(alert.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={alert.active}
                        onCheckedChange={() => toggleAlertStatus(alert.id, alert.active)}
                      />
                      <Label>{alert.active ? "Ativo" : "Inativo"}</Label>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteAlert(alert.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
