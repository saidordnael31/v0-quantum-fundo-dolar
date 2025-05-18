import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

// Inicializa o cliente SQL com a URL do banco de dados
const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql)

// Função auxiliar para executar consultas SQL diretamente
export async function executeQuery(query: string, params: any[] = []) {
  try {
    return await sql(query, params)
  } catch (error) {
    console.error("Erro ao executar consulta SQL:", error)
    throw error
  }
}
