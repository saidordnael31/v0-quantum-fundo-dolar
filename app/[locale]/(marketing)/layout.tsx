"use client"

import type React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/logo"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("common")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              {t("home")}
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              {t("about")}
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium hover:text-primary">
              {t("howItWorks")}
            </Link>
            <Link href="/faq" className="text-sm font-medium hover:text-primary">
              {t("faq")}
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              {t("contact")}
            </Link>
          </nav>
          <div className="hidden gap-4 md:flex items-center">
            <LanguageSwitcher />
            <Button asChild variant="ghost">
              <Link href="/auth/login">{t("login")}</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">{t("register")}</Link>
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 pt-4">
                <Link href="/" className="text-sm font-medium hover:text-primary">
                  {t("home")}
                </Link>
                <Link href="/about" className="text-sm font-medium hover:text-primary">
                  {t("about")}
                </Link>
                <Link href="/how-it-works" className="text-sm font-medium hover:text-primary">
                  {t("howItWorks")}
                </Link>
                <Link href="/faq" className="text-sm font-medium hover:text-primary">
                  {t("faq")}
                </Link>
                <Link href="/contact" className="text-sm font-medium hover:text-primary">
                  {t("contact")}
                </Link>
                <div className="flex items-center gap-2 pt-4">
                  <LanguageSwitcher />
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <Button asChild variant="outline">
                    <Link href="/auth/login">{t("login")}</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth/register">{t("register")}</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-slate-900 py-12 text-slate-300">{/* Footer content remains the same */}</footer>
    </div>
  )
}
