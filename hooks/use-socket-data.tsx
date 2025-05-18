"use client"

import { useState, useEffect } from "react"
import { useSocket } from "@/components/socket-provider"

// Hook para dados em tempo real via Socket.IO
export function useSocketData<T>(eventName: string, initialData: T) {
  const { socket, isConnected } = useSocket()
  const [data, setData] = useState<T>(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!socket) return

    // Configurar listener para o evento
    const handleData = (newData: T) => {
      setData(newData)
      setLoading(false)
      setError(null)
    }

    // Configurar listener para erros
    const handleError = (err: any) => {
      console.error(`Erro no evento ${eventName}:`, err)
      setError(err.message || "Erro ao receber dados")
      setLoading(false)
    }

    // Registrar listeners
    socket.on(eventName, handleData)
    socket.on("error", handleError)

    // Definir estado de carregamento com base na conexão
    setLoading(!isConnected)

    // Limpar listeners na desmontagem
    return () => {
      socket.off(eventName, handleData)
      socket.off("error", handleError)
    }
  }, [socket, eventName, isConnected])

  return { data, loading, error, isConnected }
}

// Hook específico para dados de preço
export function usePriceData() {
  return useSocketData("priceUpdate", [])
}

// Hook específico para alertas
export function useAlerts() {
  const { socket, isConnected } = useSocket()
  const [alerts, setAlerts] = useState<any[]>([])

  useEffect(() => {
    if (!socket) return

    // Configurar listener para alertas
    const handleAlert = (alert: any) => {
      setAlerts((prev) => [alert, ...prev])
    }

    // Registrar listener
    socket.on("alert", handleAlert)

    // Limpar listener na desmontagem
    return () => {
      socket.off("alert", handleAlert)
    }
  }, [socket])

  return { alerts, isConnected }
}
