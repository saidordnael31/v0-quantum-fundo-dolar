import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Verificar se o usuário está autenticado para rotas protegidas
  const authToken = request.cookies.get("auth_token")?.value
  const isAuthenticated = !!authToken

  const path = request.nextUrl.pathname

  // Simplificar a lógica para evitar problemas
  if (path.startsWith("/dashboard") || path.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  if (path.startsWith("/auth") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/auth/:path*"],
}
