import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"
import dotenv from "dotenv"
import { neon } from "@neondatabase/serverless"
import { fetchCryptoPrice, fetchHistoricalData } from "./services/cryptoService"
import { evaluateStrategies, checkPriceAlerts } from "./services/tradingStrategies"

// Carregar variáveis de ambiente
dotenv.config()

// Configurar conexão com o banco de dados
const sql = neon(process.env.DATABASE_URL!)

// Configurar servidor Express
const app = express()
const server = http.createServer(app)

// Configurar CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  }),
)

// Configurar Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
})

// Armazenar preços atuais
const currentPrices: Record<string, number> = {
  BTC: 0,
  ETH: 0,
  SOL: 0,
  BNB: 0,
}

// Armazenar clientes inscritos em cada símbolo
const subscribers: Record<string, Set<string>> = {
  BTC: new Set(),
  ETH: new Set(),
  SOL: new Set(),
  BNB: new Set(),
}

// Função para atualizar preços e verificar alertas
async function updatePrices() {
  try {
    // Buscar preços atuais
    const symbols = ["BTC", "ETH", "SOL", "BNB"]

    for (const symbol of symbols) {
      const price = await fetchCryptoPrice(symbol)

      if (price && price !== currentPrices[symbol]) {
        currentPrices[symbol] = price

        // Emitir atualização de preço para os inscritos
        io.to(symbol).emit("priceUpdate", { symbol, price, timestamp: new Date().toISOString() })

        // Verificar alertas de preço
        const alerts = await checkPriceAlerts(symbol, price, sql)

        // Se houver alertas acionados, emitir notificações
        if (alerts && alerts.length > 0) {
          for (const alert of alerts) {
            io.to(`user:${alert.userId}`).emit("alertTriggered", alert)
          }
        }

        // Avaliar estratégias de trading
        const signals = await evaluateStrategies(symbol, price, sql)

        // Se houver sinais de estratégia, emitir notificações
        if (signals && signals.length > 0) {
          for (const signal of signals) {
            io.to(`user:${signal.userId}`).emit("strategySignal", signal)
          }
        }
      }
    }
  } catch (error) {
    console.error("Erro ao atualizar preços:", error)
  }
}

// Iniciar atualização de preços a cada 5 segundos
setInterval(updatePrices, 5000)

// Configurar eventos Socket.IO
io.on("connection", (socket) => {
  console.log("Novo cliente conectado:", socket.id)

  // Inscrever em atualizações de preço
  socket.on("subscribeToPriceUpdates", ({ symbol, userId }) => {
    if (!symbol) return

    // Adicionar socket à sala do símbolo
    socket.join(symbol)
    subscribers[symbol]?.add(socket.id)

    // Se houver userId, adicionar à sala do usuário
    if (userId) {
      socket.join(`user:${userId}`)
    }

    // Enviar preço atual imediatamente
    if (currentPrices[symbol]) {
      socket.emit("priceUpdate", {
        symbol,
        price: currentPrices[symbol],
        timestamp: new Date().toISOString(),
      })
    }

    console.log(`Cliente ${socket.id} inscrito em atualizações de ${symbol}`)
  })

  // Cancelar inscrição em atualizações de preço
  socket.on("unsubscribeFromPriceUpdates", ({ symbol }) => {
    if (!symbol) return

    socket.leave(symbol)
    subscribers[symbol]?.delete(socket.id)

    console.log(`Cliente ${socket.id} cancelou inscrição em atualizações de ${symbol}`)
  })

  // Buscar dados históricos
  socket.on("getHistoricalData", async ({ symbol, days }, callback) => {
    try {
      if (!symbol || !days) {
        callback({ error: "Parâmetros inválidos" })
        return
      }

      const data = await fetchHistoricalData(symbol, days)
      callback({ data })
    } catch (error) {
      console.error("Erro ao buscar dados históricos:", error)
      callback({ error: "Erro ao buscar dados históricos" })
    }
  })

  // Desconexão
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id)

    // Remover socket de todas as inscrições
    for (const symbol in subscribers) {
      subscribers[symbol]?.delete(socket.id)
    }
  })
})

// Iniciar servidor
const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log(`Servidor Socket.IO rodando na porta ${PORT}`)
})
