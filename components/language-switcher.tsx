"use client"

import { usePathname, useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const languages = [
  { code: "pt", name: "Português" },
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  // Remove o prefixo de idioma atual do pathname
  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}(?:\/|$)/, "/")

  const switchLanguage = (newLocale: string) => {
    // Redireciona para a mesma página, mas com o novo idioma
    router.push(`/${newLocale}${pathnameWithoutLocale}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Mudar idioma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className={locale === language.code ? "bg-accent font-medium" : ""}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
