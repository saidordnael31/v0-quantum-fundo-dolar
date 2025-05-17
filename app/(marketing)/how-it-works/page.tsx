import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, BarChart3, Shield, RefreshCw } from "lucide-react"

export const metadata = {
  title: "Como Funciona | Akin Quantum Hedge Fund Offshore",
  description: "Entenda como funciona nossa tecnologia quântica e estratégias de investimento",
}

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Como Funciona</h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Descubra como nossa tecnologia quântica revoluciona investimentos no mercado Bitcoin/USD.
            </p>
          </div>
        </div>
      </section>

      {/* Quantum Technology Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <h2 className="mb-6 text-3xl font-bold">Tecnologia Quântica</h2>
              <p className="mb-4 text-muted-foreground">
                Nossa abordagem única utiliza algoritmos quânticos para analisar padrões de mercado que seriam
                impossíveis de detectar com métodos tradicionais.
              </p>
              <p className="mb-4 text-muted-foreground">
                Enquanto computadores tradicionais processam informações em bits (0s e 1s), nossos algoritmos quânticos
                utilizam qubits, que podem existir em múltiplos estados simultaneamente, permitindo análises de mercado
                muito mais complexas e precisas.
              </p>
              <p className="text-muted-foreground">
                Isso nos permite identificar correlações ocultas entre diferentes variáveis de mercado e prever
                movimentos de preços com maior precisão, especialmente no volátil mercado Bitcoin/USD.
              </p>
            </div>
            <div className="order-1 relative mx-auto aspect-video max-w-lg overflow-hidden rounded-lg shadow-xl md:order-2">
              <Image
                src="/quantum-computing-visualization.png"
                alt="Tecnologia Quântica"
                width={640}
                height={360}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="bg-slate-50 py-16 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Nosso Processo de Investimento</h2>
            <p className="text-lg text-muted-foreground">
              Um fluxo de trabalho meticuloso que combina tecnologia avançada com expertise humana.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-emerald-100 dark:bg-emerald-900/30 md:block"></div>

            <div className="grid gap-8">
              <div className="relative">
                <div className="absolute left-1/2 top-8 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 md:block">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <span className="text-lg font-bold">1</span>
                  </div>
                </div>
                <div className="ml-0 md:ml-[calc(50%+2rem)]">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold">Coleta e Análise de Dados</h3>
                      <p className="text-muted-foreground">
                        Nossos sistemas coletam e processam terabytes de dados de mercado em tempo real, incluindo
                        preços, volumes, sentimento de mercado e indicadores macroeconômicos.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 top-8 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 md:block">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <span className="text-lg font-bold">2</span>
                  </div>
                </div>
                <div className="mr-0 md:mr-[calc(50%+2rem)]">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold">Processamento Quântico</h3>
                      <p className="text-muted-foreground">
                        Nossos algoritmos quânticos processam esses dados para identificar padrões e correlações
                        invisíveis para métodos tradicionais, gerando previsões de alta precisão.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 top-8 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 md:block">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <span className="text-lg font-bold">3</span>
                  </div>
                </div>
                <div className="ml-0 md:ml-[calc(50%+2rem)]">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold">Validação por Especialistas</h3>
                      <p className="text-muted-foreground">
                        Nossa equipe de analistas e gestores de portfólio valida as recomendações geradas pelos
                        algoritmos, aplicando sua expertise e julgamento humano.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 top-8 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 md:block">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <span className="text-lg font-bold">4</span>
                  </div>
                </div>
                <div className="mr-0 md:mr-[calc(50%+2rem)]">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold">Execução Otimizada</h3>
                      <p className="text-muted-foreground">
                        Implementamos as estratégias de investimento com execução de alta precisão, minimizando custos
                        de transação e maximizando eficiência.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 top-8 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 md:block">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <span className="text-lg font-bold">5</span>
                  </div>
                </div>
                <div className="ml-0 md:ml-[calc(50%+2rem)]">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold">Monitoramento Contínuo</h3>
                      <p className="text-muted-foreground">
                        Nossos sistemas monitoram continuamente o desempenho e ajustam as estratégias em tempo real para
                        responder a mudanças nas condições de mercado.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Strategies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Nossas Estratégias de Investimento</h2>
            <p className="text-lg text-muted-foreground">
              Oferecemos diversas estratégias para atender diferentes perfis de risco e objetivos de investimento.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-emerald-100 p-3 w-fit dark:bg-emerald-900/30">
                  <Shield className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Conservadora</h3>
                <p className="mb-4 text-muted-foreground">
                  Foco em preservação de capital com exposição limitada ao Bitcoin. Retornos anuais esperados de 5-8%.
                </p>
                <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-emerald-500" />
                    Alocação: 20% BTC / 80% USD
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-emerald-500" />
                    Volatilidade baixa
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-emerald-500" />
                    Ideal para investidores avessos a risco
                  </li>
                </ul>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/dashboard/invest?strategy=conservative">Saiba Mais</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-emerald-100 p-3 w-fit dark:bg-emerald-900/30">
                  <BarChart3 className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Balanceada</h3>
                <p className="mb-4 text-muted-foreground">
                  Equilíbrio entre crescimento e segurança. Retornos anuais esperados de 8-15%.
                </p>
                <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-emerald-500" />
                    Alocação: 50% BTC / 50% USD
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-emerald-500" />
                    Volatilidade moderada
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-emerald-500" />
                    Ideal para investidores de perfil moderado
                  </li>
                </ul>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/dashboard/invest?strategy=balanced">Saiba Mais</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-emerald-500 dark:border-emerald-500">
              <CardContent className="p-6">
                <div className="mb-4 rounded-full bg-emerald-100 p-3 w-fit dark:bg-emerald-900/30">
                  <Zap className="h-6 w-6 text-emerald-500" />
                </div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-bold">Quantum AI</h3>
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    Recomendada
                  </span>
                </div>
                <p className="mb-4 text-muted-foreground">
                  Nossa estratégia premium com alocação dinâmica. Retornos anuais esperados de 12-30%.
                </p>
                <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-emerald-500" />
                    Alocação: Dinâmica BTC/USD
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-emerald-500" />
                    Volatilidade controlada
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-emerald-500" />
                    Ideal para maximizar retornos
                  </li>
                </ul>
                <Button asChild size="sm" className="w-full">
                  <Link href="/dashboard/invest?strategy=quantum">Saiba Mais</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rebalancing Section */}
      <section className="bg-slate-50 py-16 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="relative mx-auto aspect-video max-w-lg overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/portfolio-rebalancing-chart.png"
                alt="Rebalanceamento Automático"
                width={640}
                height={360}
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold">Rebalanceamento Automático</h2>
              <p className="mb-4 text-muted-foreground">
                Nossa tecnologia quântica monitora continuamente o mercado e rebalanceia automaticamente seu portfólio
                para maximizar retornos e minimizar riscos.
              </p>
              <p className="mb-4 text-muted-foreground">
                Ao contrário de fundos tradicionais que rebalanceiam em intervalos fixos, nosso sistema ajusta sua
                alocação em tempo real, respondendo a mudanças nas condições de mercado antes que elas se tornem
                evidentes para outros investidores.
              </p>
              <div className="flex items-center">
                <RefreshCw className="mr-2 h-5 w-5 text-emerald-500" />
                <p className="text-sm font-medium">Rebalanceamento contínuo baseado em algoritmos quânticos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-500 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Comece sua jornada de investimentos quânticos</h2>
            <p className="mb-8 text-lg">
              Junte-se a milhares de investidores que já estão aproveitando o poder da tecnologia quântica para
              transformar seus investimentos.
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <Button asChild size="lg" className="bg-white text-emerald-500 hover:bg-white/90">
                <Link href="/auth/register">Criar Conta</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/faq">Perguntas Frequentes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
