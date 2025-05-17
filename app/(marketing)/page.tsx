import Link from "next/link"
import Image from "next/image"
import { TrendingUp, Shield, Zap, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
                Akin Quantum Hedge Fund Offshore
              </h1>
              <p className="text-xl text-slate-300">
                Investimentos inovadores com tecnologia quântica para maximizar seus retornos no mercado Bitcoin/USD.
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600">
                  <Link href="/auth/register">Comece a Investir</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link href="/about">Saiba Mais</Link>
                </Button>
              </div>
            </div>
            <div className="relative mx-auto aspect-video max-w-lg overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/placeholder.svg?key=ia66y"
                alt="Quantum Investment Technology"
                width={640}
                height={360}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent dark:from-slate-950 dark:to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <TrendingUp className="mb-4 h-12 w-12 text-emerald-500" />
                <h3 className="text-3xl font-bold">42.8%</h3>
                <p className="text-sm text-muted-foreground">Retorno Anualizado</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Shield className="mb-4 h-12 w-12 text-emerald-500" />
                <h3 className="text-3xl font-bold">2.4</h3>
                <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <BarChart3 className="mb-4 h-12 w-12 text-emerald-500" />
                <h3 className="text-3xl font-bold">18.7%</h3>
                <p className="text-sm text-muted-foreground">Volatilidade</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Zap className="mb-4 h-12 w-12 text-emerald-500" />
                <h3 className="text-3xl font-bold">$1.2B+</h3>
                <p className="text-sm text-muted-foreground">Ativos sob Gestão</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-16 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Por que escolher o Akin Quantum Hedge Fund?</h2>
            <p className="text-lg text-muted-foreground">
              Nossa abordagem única combina tecnologia quântica com análise de mercado tradicional para oferecer
              resultados excepcionais.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-emerald-100 p-3 w-fit dark:bg-emerald-900/30">
                  <Zap className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Tecnologia Quântica</h3>
                <p className="text-muted-foreground">
                  Algoritmos quânticos avançados que identificam padrões de mercado invisíveis para métodos
                  tradicionais.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-emerald-100 p-3 w-fit dark:bg-emerald-900/30">
                  <Shield className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Gestão de Risco</h3>
                <p className="text-muted-foreground">
                  Estratégias de proteção que minimizam perdas durante períodos de volatilidade extrema.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-emerald-100 p-3 w-fit dark:bg-emerald-900/30">
                  <BarChart3 className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Diversificação Inteligente</h3>
                <p className="text-muted-foreground">
                  Alocação dinâmica entre Bitcoin e USD para maximizar retornos e minimizar riscos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">O que nossos investidores dizem</h2>
            <p className="text-lg text-muted-foreground">
              Junte-se a milhares de investidores satisfeitos que confiam no Akin Quantum Hedge Fund.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 fill-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 italic text-muted-foreground">
                  "Os retornos que obtive com o Akin Quantum superaram todas as minhas expectativas. A plataforma é
                  intuitiva e o suporte ao cliente é excepcional."
                </p>
                <p className="font-semibold">Carlos M.</p>
                <p className="text-sm text-muted-foreground">Investidor desde 2023</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 fill-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 italic text-muted-foreground">
                  "A abordagem quântica realmente faz diferença. Minha carteira tem crescido consistentemente, mesmo em
                  mercados voláteis."
                </p>
                <p className="font-semibold">Ana P.</p>
                <p className="text-sm text-muted-foreground">Investidora desde 2022</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 fill-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 italic text-muted-foreground">
                  "Como investidor institucional, valorizo a transparência e a sofisticação das estratégias do Akin
                  Quantum. Os resultados falam por si."
                </p>
                <p className="font-semibold">Roberto L.</p>
                <p className="text-sm text-muted-foreground">Gestor de Patrimônio</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-500 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Pronto para começar?</h2>
            <p className="mb-8 text-lg">
              Junte-se ao Akin Quantum Hedge Fund Offshore hoje e comece a transformar seu portfólio de investimentos.
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <Button asChild size="lg" className="bg-white text-emerald-500 hover:bg-white/90">
                <Link href="/auth/register">Criar Conta</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/contact">Fale Conosco</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-slate-300">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Akin Quantum</h3>
              <p className="mb-4">Inovação em investimentos com tecnologia quântica.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Navegação</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    Como Funciona
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    Perguntas Frequentes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Termos de Serviço
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="hover:text-white">
                    Aviso de Risco
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Contato</h3>
              <ul className="space-y-2">
                <li>contato@akinquantum.com</li>
                <li>+55 11 3456-7890</li>
                <li>Av. Paulista, 1000, São Paulo - SP</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-800 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Akin Quantum Hedge Fund Offshore. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
