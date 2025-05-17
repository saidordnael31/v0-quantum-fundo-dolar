import type React from "react"
import { NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import "@/app/globals.css"

export function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }, { locale: "es" }]
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
