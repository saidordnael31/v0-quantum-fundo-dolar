"use client"

import { useEffect } from "react"
import { setCookie, deleteCookie } from "cookies-next"

// Este componente sincroniza o token de autenticação do localStorage com os cookies
// para que o middleware possa acessá-lo
export function AuthSync() {
  useEffect(() => {
    // Função para sincronizar o token
    const syncAuthToken = () => {
      const token = localStorage.getItem("auth_token")

      if (token) {
        // Se houver um token no localStorage, defina-o como cookie
        setCookie("auth_token", token, {
          maxAge: 60 * 60 * 24 * 7, // 7 dias
          path: "/",
        })
      } else {
        // Se não houver token, remova o cookie
        deleteCookie("auth_token", { path: "/" })
      }
    }

    // Sincronizar ao carregar
    syncAuthToken()

    // Adicionar listener para mudanças no localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth_token") {
        syncAuthToken()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return null // Este componente não renderiza nada
}
