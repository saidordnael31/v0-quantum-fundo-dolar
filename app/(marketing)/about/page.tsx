import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, TrendingUp, Users, Globe } from "lucide-react"

export const metadata = {
  title: "Sobre Nós | Akin Quantum Hedge Fund Offshore",
  description: "Conheça a história, missão e equipe por trás do Akin Quantum Hedge Fund Offshore",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Sobre o Akin Quantum Hedge Fund</h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Pioneiros em investimentos quânticos, combinando tecnologia de ponta com expertise financeira para
              resultados excepcionais.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Nossa História</h2>
              <p className="mb-4 text-muted-foreground">
                Fundado em 2020 por um grupo de físicos quânticos e especialistas em finanças, o Akin Quantum Hedge Fund
                nasceu da visão de aplicar princípios da computação quântica ao mercado financeiro.
              </p>
              <p className="mb-4 text-muted-foreground">
                Nossa jornada começou com uma simples pergunta: "E se pudéssemos usar algoritmos quânticos para prever
                movimentos de mercado com maior precisão?" Após anos de pesquisa e desenvolvimento, lançamos nossa
                primeira estratégia de investimento quântico em 2021.
              </p>
              <p className="text-muted-foreground">
                Hoje, somos reconhecidos como líderes em investimentos quantitativos, com um histórico comprovado de
                retornos superiores e gestão de risco eficiente, especialmente no mercado Bitcoin/USD.
              </p>
            </div>
            <div className="relative mx-auto aspect-video max-w-lg overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/placeholder.svg?key=4kmcm"
                alt="Nossa História"
                width={640}
                height={360}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="bg-slate-50 py-16 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Nossa Missão e Valores</h2>
            <p className="text-lg text-muted-foreground">
              Guiados por princípios sólidos e um compromisso com a excelência.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-bold">Missão</h3>
                <p className="text-muted-foreground">
                  Democratizar o acesso a estratégias de investimento de classe mundial, utilizando tecnologia quântica
                  para criar valor sustentável para nossos investidores, independentemente das condições de mercado.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-bold">Visão</h3>
                <p className="text-muted-foreground">
                  Ser reconhecidos globalmente como pioneiros na aplicação de tecnologia quântica para investimentos,
                  estabelecendo novos padrões de desempenho e inovação no setor financeiro.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-emerald-100 p-3 w-fit dark:bg-emerald-900/30">
                  <Award className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Excelência</h3>
                <p className="text-muted-foreground">
                  Buscamos constantemente superar expectativas e estabelecer novos padrões em tudo o que fazemos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-emerald-100 p-3 w-fit dark:bg-emerald-900/30">
                  <TrendingUp className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Inovação</h3>
                <p className="text-muted-foreground">
                  Investimos continuamente em pesquisa e desenvolvimento para manter nossa vantagem tecnológica.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-emerald-100 p-3 w-fit dark:bg-emerald-900/30">
                  <Users className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Integridade</h3>
                <p className="text-muted-foreground">
                  Operamos com total transparência e mantemos os mais altos padrões éticos em todas as nossas ações.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Nossa Equipe</h2>
            <p className="text-lg text-muted-foreground">
              Conheça os especialistas por trás do Akin Quantum Hedge Fund Offshore.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?key=2eyq5"
                    alt="Dr. Ricardo Akin"
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-1 text-lg font-bold">Dr. Ricardo Akin</h3>
                <p className="mb-3 text-sm text-emerald-500">CEO & Fundador</p>
                <p className="text-sm text-muted-foreground">
                  PhD em Física Quântica pelo MIT, com 15 anos de experiência em mercados financeiros.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?key=ecs8s"
                    alt="Dra. Sophia Chen"
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-1 text-lg font-bold">Dra. Sophia Chen</h3>
                <p className="mb-3 text-sm text-emerald-500">CTO</p>
                <p className="text-sm text-muted-foreground">
                  Especialista em algoritmos quânticos, ex-pesquisadora do CERN e Stanford.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?key=lysfn"
                    alt="Carlos Mendes"
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-1 text-lg font-bold">Carlos Mendes</h3>
                <p className="mb-3 text-sm text-emerald-500">CFO</p>
                <p className="text-sm text-muted-foreground">
                  Ex-diretor do Banco Central, com vasta experiência em gestão de fundos internacionais.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?key=sekse"
                    alt="Ana Oliveira"
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-1 text-lg font-bold">Ana Oliveira</h3>
                <p className="mb-3 text-sm text-emerald-500">Diretora de Investimentos</p>
                <p className="text-sm text-muted-foreground">
                  Especialista em criptomoedas e mercados emergentes, com histórico comprovado de retornos superiores.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="bg-slate-50 py-16 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Presença Global</h2>
            <p className="text-lg text-muted-foreground">
              Com escritórios em centros financeiros estratégicos, atendemos investidores em todo o mundo.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-emerald-100 p-3 w-fit dark:bg-emerald-900/30">
                  <Globe className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="mb-2 text-lg font-bold">São Paulo</h3>
                <p className="text-muted-foreground">Sede Principal</p>
                <p className="text-sm text-muted-foreground">Av. Paulista, 1000, São Paulo - SP, Brasil</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-emerald-100 p-3 w-fit dark:bg-emerald-900/30">
                  <Globe className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Nova York</h3>
                <p className="text-muted-foreground">Operações América do Norte</p>
                <p className="text-sm text-muted-foreground">Wall Street, 350, New York, NY, EUA</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-emerald-100 p-3 w-fit dark:bg-emerald-900/30">
                  <Globe className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Singapura</h3>
                <p className="text-muted-foreground">Operações Ásia-Pacífico</p>
                <p className="text-sm text-muted-foreground">Marina Bay, 100, Singapura</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-500 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Pronto para investir conosco?</h2>
            <p className="mb-8 text-lg">
              Junte-se a investidores de todo o mundo que confiam no Akin Quantum Hedge Fund Offshore.
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <Button asChild size="lg" className="bg-white text-emerald-500 hover:bg-white/90">
                <Link href="/auth/register">Abra sua Conta</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/contact">Agende uma Consulta</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
