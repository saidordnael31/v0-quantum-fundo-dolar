import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  // Lista de idiomas suportados
  locales: ["pt", "en", "es"],

  // Idioma padrão
  defaultLocale: "pt",

  // Domínios específicos para cada idioma (opcional)
  // domains: [
  //   {
  //     domain: 'example.com',
  //     defaultLocale: 'en'
  //   },
  //   {
  //     domain: 'example.pt',
  //     defaultLocale: 'pt'
  //   },
  // ],
})

export const config = {
  // Matcher configurado para usar um prefixo de idioma em todas as rotas
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
