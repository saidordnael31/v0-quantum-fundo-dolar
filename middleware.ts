import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Verificar se o usuário está autenticado para rotas protegidas
  const isAuthenticated = request.cookies.has("auth_token")
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth")
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard")
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin")

  // Redirecionar usuários não autenticados para a página de login
  if ((isDashboardPage || isAdminPage) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Redirecionar usuários autenticados da página de login para o dashboard
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Configurar quais caminhos devem ser processados pelo middleware
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/auth/:path*"],
}
