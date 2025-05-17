import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { t } from "@/lib/i18n/utils"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 py-20 text-white md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
                {t("landing.hero.title")}
              </h1>
              <p className="text-xl text-slate-300">{t("landing.hero.subtitle")}</p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/auth/register">{t("landing.hero.cta")}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                  <Link href="/how-it-works">{t("landing.hero.learnMore")}</Link>
                </Button>
              </div>
            </div>
            <div className="relative mx-auto aspect-video max-w-lg overflow-hidden rounded-lg bg-slate-800 shadow-xl">
              <Image
                src="/quantum-computing-visualization.png"
                alt="Quantum Computing Visualization"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">24.7%</p>
              <p className="mt-2 text-sm font-medium text-slate-600">{t("landing.stats.annualReturn")}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">2.1</p>
              <p className="mt-2 text-sm font-medium text-slate-600">{t("landing.stats.sharpeRatio")}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">12.3%</p>
              <p className="mt-2 text-sm font-medium text-slate-600">{t("landing.stats.volatility")}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">$42M</p>
              <p className="mt-2 text-sm font-medium text-slate-600">{t("landing.stats.aum")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {t("landing.features.title")}
            </h2>
            <p className="mt-4 text-lg text-slate-600">{t("landing.features.subtitle")}</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">{t("landing.features.quantum.title")}</h3>
              <p className="text-slate-600">{t("landing.features.quantum.description")}</p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">{t("landing.features.risk.title")}</h3>
              <p className="text-slate-600">{t("landing.features.risk.description")}</p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">{t("landing.features.diversification.title")}</h3>
              <p className="text-slate-600">{t("landing.features.diversification.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t("landing.cta.title")}</h2>
            <p className="mt-4 text-lg text-blue-100">{t("landing.cta.subtitle")}</p>
            <div className="mt-8 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button asChild size="lg" variant="secondary">
                <Link href="/auth/register">{t("landing.cta.button")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-blue-400 text-white hover:bg-blue-700">
                <Link href="/contact">{t("landing.cta.contact")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
