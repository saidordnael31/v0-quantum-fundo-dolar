"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Bell, AlertTriangle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Notification {
  id: string
  userId: string
  symbol: string
  message: string
  type: string
  strategy: string | null
  read: boolean
  createdAt: string
}

interface NotificationCenterProps {
  userId: string
}

export function NotificationCenter({ userId }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Buscar notificações do usuário
  const fetchNotifications = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/notifications?userId=${userId}`)

      if (!response.ok) {
        throw new Error(`Erro ao buscar notificações: ${response.status}`)
      }

      const result = await response.json()
      setNotifications(result.data)
    } catch (err: any) {
      setError(err.message || "Erro ao buscar notificações")
      console.error("Erro ao buscar notificações:", err)
    } finally {
      setLoading(false)
    }
  }

  // Marcar notificação como lida
  const markAsRead = async (id: string) => {
    try {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          read: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`Erro ao atualizar notificação: ${response.status}`)
      }

      // Atualizar lista de notificações
      setNotifications(
        notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
      )
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err.message || "Erro ao atualizar notificação",
        variant: "destructive",
      })
      console.error("Erro ao atualizar notificação:", err)
    }
  }

  // Marcar todas como lidas
  const markAllAsRead = async () => {
    try {
      const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id)

      if (unreadIds.length === 0) return

      // Atualizar cada notificação não lida
      await Promise.all(
        unreadIds.map((id) =>
          fetch("/api/notifications", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              read: true,
            }),
          }),
        ),
      )

      // Atualizar lista de notificações
      setNotifications(notifications.map((notification) => ({ ...notification, read: true })))

      toast({
        title: "Notificações atualizadas",
        description: "Todas as notificações foram marcadas como lidas",
      })
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err.message || "Erro ao atualizar notificações",
        variant: "destructive",
      })
      console.error("Erro ao atualizar notificações:", err)
    }
  }

  // Buscar notificações ao carregar o componente
  useEffect(() => {
    fetchNotifications()
  }, [userId])

  // Contar notificações não lidas
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Notificações</CardTitle>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Badge variant="secondary">
              {unreadCount} não lida{unreadCount > 1 ? "s" : ""}
            </Badge>
          )}
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Marcar todas como lidas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
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
        ) : notifications.length === 0 ? (
          <div className="flex items-center justify-center rounded-md border border-dashed p-8">
            <div className="flex flex-col items-center space-y-2 text-center text-muted-foreground">
              <Bell className="h-8 w-8" />
              <p>Você não tem notificações</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-md border p-4 transition-colors ${
                  notification.read ? "bg-background" : "bg-muted/20"
                }`}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant={notification.type === "price" ? "default" : "secondary"}>
                      {notification.type === "price" ? "Preço" : "Estratégia"}
                    </Badge>
                    <span className="text-sm font-medium">{notification.symbol}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm">{notification.message}</p>
                {notification.strategy && (
                  <p className="mt-1 text-xs text-muted-foreground">Estratégia: {notification.strategy}</p>
                )}
                {!notification.read && (
                  <div className="mt-2 text-right">
                    <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                      Marcar como lida
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
