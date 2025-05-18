import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Verificar se o usuário está autenticado para rotas protegidas
  const authToken = request.cookies.get("auth_token")?.value
  const isAuthenticated = !!authToken

  const isAuthPage = request.nextUrl.pathname.startsWith("/auth")
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard")
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin")

  // Redirecionar usuários não autenticados para a página de login
  if ((isDashboardPage || isAdminPage) && !isAuthenticated) {
    const loginUrl = new URL("/auth/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Redirecionar usuários autenticados da página de login para o dashboard
  if (isAuthPage && isAuthenticated) {
    const dashboardUrl = new URL("/dashboard", request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

// Configurar quais caminhos devem ser processados pelo middleware
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/auth/:path*"],
}
