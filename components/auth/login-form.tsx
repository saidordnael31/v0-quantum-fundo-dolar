"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulação de login bem-sucedido
      console.log("Login attempt with:", { email, password })

      // Aguardar um pouco para simular o processamento
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Armazenar um token falso para simular autenticação
      localStorage.setItem("auth_token", "fake_token_" + Date.now())

      // Redirecionar usando window.location para garantir um redirecionamento completo
      window.location.href = "/dashboard"

      // Nota: Não usamos router.push() aqui para evitar problemas de navegação do lado do cliente
    } catch (err) {
      console.error("Login error:", err)
      setError("Failed to login. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <Logo iconClassName="h-10 w-10" textClassName="text-xl" />
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">Sign in to your account</h2>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link href="/auth/register" className="text-blue-600 hover:text-blue-500">
          Register
        </Link>
      </p>
    </div>
  )
}
