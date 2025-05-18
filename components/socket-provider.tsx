"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  subscribe: (channels: string[]) => void
  unsubscribe: (channels: string[]) => void
  setAlerts: (alerts: any[]) => void
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  subscribe: () => {},
  unsubscribe: () => {},
  setAlerts: () => {},
})

export const useSocket = () => useContext(SocketContext)

export function SocketProvider({ children, userId }: { children: React.ReactNode; userId?: string }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Conectar ao servidor Socket.IO
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000", {
      auth: { userId },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    // Configurar eventos
    socketInstance.on("connect", () => {
      console.log("Conectado ao servidor Socket.IO")
      setIsConnected(true)

      // Inscrever automaticamente no canal de atualizações de preço
      socketInstance.emit("subscribe", ["priceUpdates"])

      // Se o usuário estiver autenticado, inscrever no canal de usuário
      if (userId) {
        socketInstance.emit("subscribe", [`user:${userId}`])
      }
    })

    socketInstance.on("disconnect", () => {
      console.log("Desconectado do servidor Socket.IO")
      setIsConnected(false)
    })

    socketInstance.on("connect_error", (error) => {
      console.error("Erro de conexão Socket.IO:", error)
      setIsConnected(false)
    })

    // Salvar instância
    setSocket(socketInstance)

    // Limpar na desmontagem
    return () => {
      socketInstance.disconnect()
    }
  }, [userId])

  // Função para inscrever em canais
  const subscribe = (channels: string[]) => {
    if (socket && isConnected) {
      socket.emit("subscribe", channels)
    }
  }

  // Função para cancelar inscrição
  const unsubscribe = (channels: string[]) => {
    if (socket && isConnected) {
      socket.emit("unsubscribe", channels)
    }
  }

  // Função para configurar alertas
  const setAlerts = (alerts: any[]) => {
    if (socket && isConnected) {
      socket.emit("setAlerts", alerts)
    }
  }

  return (
    <SocketContext.Provider value={{ socket, isConnected, subscribe, unsubscribe, setAlerts }}>
      {children}
    </SocketContext.Provider>
  )
}
