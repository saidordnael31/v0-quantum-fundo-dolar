"use client"

import { useTranslation } from "@/lib/i18n/client"
import { Button } from "@/components/ui/button"

export function ClientTranslatedComponent() {
  const { t, locale, changeLocale } = useTranslation()

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h3 className="mb-2 text-lg font-medium">{t("common.settings")}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{t("landing.features.subtitle")}</p>
      <div className="flex flex-wrap gap-2">
        <Button variant={locale === "en" ? "default" : "outline"} size="sm" onClick={() => changeLocale("en")}>
          English
        </Button>
        <Button variant={locale === "pt" ? "default" : "outline"} size="sm" onClick={() => changeLocale("pt")}>
          Português
        </Button>
        <Button variant={locale === "es" ? "default" : "outline"} size="sm" onClick={() => changeLocale("es")}>
          Español
        </Button>
      </div>
    </div>
  )
}
