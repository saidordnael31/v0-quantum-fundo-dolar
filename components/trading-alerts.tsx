"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useSocket } from "./socket-provider"
import { useAlerts } from "@/hooks/use-socket-data"
import { Bell, BellRing, Check, Plus, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"

export function TradingAlerts() {
  const { setAlerts: saveAlerts } = useSocket()
  const { alerts: receivedAlerts } = useAlerts()
  const [activeTab, setActiveTab] = useState("configure")
  const [priceAlerts, setPriceAlerts] = useState<any[]>([])
  const [strategyAlerts, setStrategyAlerts] = useState<any[]>([])

  // Estado para novo alerta de preço
  const [newPriceAlert, setNewPriceAlert] = useState({
    symbol: "BTC",
    condition: "above",
    price: "",
  })

  // Estado para novo alerta de estratégia
  const [newStrategyAlert, setNewStrategyAlert] = useState({
    symbol: "BTC",
    strategy: "MACD",
    enabled: true,
  })

  // Adicionar alerta de preço
  const addPriceAlert = () => {
    if (!newPriceAlert.price || isNaN(Number(newPriceAlert.price))) {
      toast({
        title: "Erro",
        description: "Por favor, insira um preço válido",
        variant: "destructive",
      })
      return
    }

    const alert = {
      ...newPriceAlert,
      price: Number(newPriceAlert.price),
      id: `price-${Date.now()}`,
    }

    setPriceAlerts([...priceAlerts, alert])
    setNewPriceAlert({
      symbol: "BTC",
      condition: "above",
      price: "",
    })

    // Salvar alertas no servidor
    saveAllAlerts([...priceAlerts, alert], strategyAlerts)

    toast({
      title: "Alerta adicionado",
      description: `Alerta de preço para ${alert.symbol} ${alert.condition === "above" ? "acima" : "abaixo"} de $${alert.price}`,
    })
  }

  // Adicionar alerta de estratégia
  const addStrategyAlert = () => {
    const alert = {
      ...newStrategyAlert,
      id: `strategy-${Date.now()}`,
    }

    setStrategyAlerts([...strategyAlerts, alert])
    setNewStrategyAlert({
      symbol: "BTC",
      strategy: "MACD",
      enabled: true,
    })

    // Salvar alertas no servidor
    saveAllAlerts(priceAlerts, [...strategyAlerts, alert])

    toast({
      title: "Estratégia adicionada",
      description: `Alertas para ${alert.symbol} usando estratégia ${alert.strategy}`,
    })
  }

  // Remover alerta de preço
  const removePriceAlert = (id: string) => {
    const updatedAlerts = priceAlerts.filter((alert) => alert.id !== id)
    setPriceAlerts(updatedAlerts)

    // Salvar alertas no servidor
    saveAllAlerts(updatedAlerts, strategyAlerts)
  }

  // Remover alerta de estratégia
  const removeStrategyAlert = (id: string) => {
    const updatedAlerts = strategyAlerts.filter((alert) => alert.id !== id)
    setStrategyAlerts(updatedAlerts)

    // Salvar alertas no servidor
    saveAllAlerts(priceAlerts, updatedAlerts)
  }

  // Salvar todos os alertas no servidor
  const saveAllAlerts = (price: any[], strategy: any[]) => {
    const allAlerts = [
      ...price.map((p) => ({
        symbol: p.symbol,
        condition: p.condition,
        price: p.price,
      })),
      ...strategy.map((s) => ({
        symbol: s.symbol,
        strategy: s.strategy,
        enabled: s.enabled,
      })),
    ]

    saveAlerts(allAlerts)
  }

  // Marcar alerta como lido
  const markAsRead = (id: string) => {
    // Implementar lógica para marcar como lido
    console.log("Marcar como lido:", id)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Alertas de Trading</CardTitle>
        <CardDescription>Configure e monitore alertas baseados em preço e estratégias</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="configure">Configurar</TabsTrigger>
            <TabsTrigger value="notifications" className="relative">
              Notificações
              {receivedAlerts.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {receivedAlerts.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="configure" className="space-y-4 pt-4">
            <Tabs defaultValue="price">
              <TabsList>
                <TabsTrigger value="price">Alertas de Preço</TabsTrigger>
                <TabsTrigger value="strategy">Estratégias</TabsTrigger>
              </TabsList>

              <TabsContent value="price" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div>
                      <Label htmlFor="symbol">Criptomoeda</Label>
                      <Select
                        value={newPriceAlert.symbol}
                        onValueChange={(value) => setNewPriceAlert({ ...newPriceAlert, symbol: value })}
                      >
                        <SelectTrigger id="symbol">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                          <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                          <SelectItem value="BNB">Binance Coin (BNB)</SelectItem>
                          <SelectItem value="XRP">Ripple (XRP)</SelectItem>
                          <SelectItem value="ADA">Cardano (ADA)</SelectItem>
                          <SelectItem value="SOL">Solana (SOL)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="condition">Condição</Label>
                      <Select
                        value={newPriceAlert.condition}
                        onValueChange={(value) => setNewPriceAlert({ ...newPriceAlert, condition: value })}
                      >
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Selecione" />
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
                        placeholder="0.00"
                        value={newPriceAlert.price}
                        onChange={(e) => setNewPriceAlert({ ...newPriceAlert, price: e.target.value })}
                      />
                    </div>

                    <div className="flex items-end">
                      <Button onClick={addPriceAlert} className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> Adicionar Alerta
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <div className="p-4">
                      <h3 className="font-medium">Alertas Configurados</h3>
                    </div>

                    {priceAlerts.length === 0 ? (
                      <div className="p-4 text-center text-sm text-muted-foreground">Nenhum alerta configurado</div>
                    ) : (
                      <div className="divide-y">
                        {priceAlerts.map((alert) => (
                          <div key={alert.id} className="flex items-center justify-between p-4">
                            <div>
                              <span className="font-medium">{alert.symbol}</span>{" "}
                              <span>{alert.condition === "above" ? "acima de" : "abaixo de"}</span>{" "}
                              <span className="font-medium">${Number(alert.price).toLocaleString()}</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removePriceAlert(alert.id)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="strategy" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div>
                      <Label htmlFor="strategy-symbol">Criptomoeda</Label>
                      <Select
                        value={newStrategyAlert.symbol}
                        onValueChange={(value) => setNewStrategyAlert({ ...newStrategyAlert, symbol: value })}
                      >
                        <SelectTrigger id="strategy-symbol">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                          <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                          <SelectItem value="BNB">Binance Coin (BNB)</SelectItem>
                          <SelectItem value="XRP">Ripple (XRP)</SelectItem>
                          <SelectItem value="ADA">Cardano (ADA)</SelectItem>
                          <SelectItem value="SOL">Solana (SOL)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="strategy-type">Estratégia</Label>
                      <Select
                        value={newStrategyAlert.strategy}
                        onValueChange={(value) => setNewStrategyAlert({ ...newStrategyAlert, strategy: value })}
                      >
                        <SelectTrigger id="strategy-type">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MACD">MACD</SelectItem>
                          <SelectItem value="RSI">RSI</SelectItem>
                          <SelectItem value="BOLLINGER">Bollinger Bands</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <div className="space-y-2">
                        <Label htmlFor="strategy-enabled">Ativo</Label>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="strategy-enabled"
                            checked={newStrategyAlert.enabled}
                            onCheckedChange={(checked) =>
                              setNewStrategyAlert({ ...newStrategyAlert, enabled: checked })
                            }
                          />
                          <span>{newStrategyAlert.enabled ? "Sim" : "Não"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-end">
                      <Button onClick={addStrategyAlert} className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> Adicionar Estratégia
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <div className="p-4">
                      <h3 className="font-medium">Estratégias Configuradas</h3>
                    </div>

                    {strategyAlerts.length === 0 ? (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        Nenhuma estratégia configurada
                      </div>
                    ) : (
                      <div className="divide-y">
                        {strategyAlerts.map((alert) => (
                          <div key={alert.id} className="flex items-center justify-between p-4">
                            <div>
                              <span className="font-medium">{alert.symbol}</span> <span>usando estratégia</span>{" "}
                              <span className="font-medium">{alert.strategy}</span>
                              <Badge variant={alert.enabled ? "success" : "secondary"} className="ml-2">
                                {alert.enabled ? "Ativo" : "Inativo"}
                              </Badge>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeStrategyAlert(alert.id)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="notifications" className="pt-4">
            <ScrollArea className="h-[400px]">
              {receivedAlerts.length === 0 ? (
                <div className="flex h-[200px] items-center justify-center">
                  <div className="text-center">
                    <Bell className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Nenhuma notificação</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {receivedAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start space-x-4 rounded-md border p-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="mt-1">
                        <BellRing className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            {alert.symbol}{" "}
                            <Badge variant={alert.type === "price" ? "default" : "outline"}>
                              {alert.type === "price" ? "Preço" : alert.strategy}
                            </Badge>
                          </p>
                          <p className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</p>
                        </div>
                        <p className="text-sm">{alert.message}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => markAsRead(alert.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
