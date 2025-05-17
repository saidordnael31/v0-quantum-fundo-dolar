import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: "Perguntas Frequentes | Akin Quantum Hedge Fund Offshore",
  description: "Respostas para as perguntas mais comuns sobre o Akin Quantum Hedge Fund Offshore",
}

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Perguntas Frequentes</h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Respostas para as perguntas mais comuns sobre o Akin Quantum Hedge Fund Offshore.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>O que é o Akin Quantum Hedge Fund Offshore?</AccordionTrigger>
                <AccordionContent>
                  O Akin Quantum Hedge Fund Offshore é um fundo de investimento que utiliza tecnologia quântica avançada
                  para otimizar estratégias de investimento no mercado Bitcoin/USD. Nosso objetivo é proporcionar
                  retornos superiores com gestão de risco eficiente, combinando algoritmos quânticos com expertise
                  financeira tradicional.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Como funciona a tecnologia quântica aplicada a investimentos?</AccordionTrigger>
                <AccordionContent>
                  Nossa tecnologia quântica utiliza algoritmos avançados que processam enormes volumes de dados de
                  mercado para identificar padrões e correlações invisíveis para métodos tradicionais. Enquanto
                  computadores convencionais processam informações em bits (0s e 1s), nossos algoritmos quânticos
                  utilizam qubits, que podem existir em múltiplos estados simultaneamente, permitindo análises muito
                  mais complexas e precisas dos movimentos de mercado.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Qual é o investimento mínimo?</AccordionTrigger>
                <AccordionContent>
                  O investimento mínimo para o Akin Quantum Hedge Fund Offshore é de US$ 10.000 ou 0,15 BTC. Para
                  investidores institucionais, oferecemos condições especiais para aportes acima de US$ 1 milhão.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Quais são as taxas cobradas?</AccordionTrigger>
                <AccordionContent>
                  Cobramos uma taxa de administração de 2% ao ano sobre o capital investido, calculada e cobrada
                  mensalmente. Além disso, aplicamos uma taxa de performance de 20% sobre os ganhos que excederem o
                  benchmark (high watermark). Não há taxas de entrada ou saída.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Como posso acompanhar meus investimentos?</AccordionTrigger>
                <AccordionContent>
                  Todos os investidores têm acesso a um dashboard personalizado em nossa plataforma online, onde podem
                  acompanhar o desempenho de seus investimentos em tempo real, visualizar relatórios detalhados e
                  acessar análises de mercado. Também enviamos relatórios mensais por e-mail com um resumo do desempenho
                  e perspectivas de mercado.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Qual é o histórico de retornos do fundo?</AccordionTrigger>
                <AccordionContent>
                  Desde o lançamento em 2021, o Akin Quantum Hedge Fund Offshore tem apresentado retornos anualizados de
                  42,8%, superando consistentemente tanto o Bitcoin quanto os índices tradicionais de mercado. É
                  importante ressaltar que retornos passados não são garantia de resultados futuros. Você pode acessar
                  nosso histórico completo de desempenho na seção de relatórios da nossa plataforma.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>Quais são os riscos envolvidos?</AccordionTrigger>
                <AccordionContent>
                  Como em qualquer investimento, existem riscos envolvidos. Os principais riscos incluem a volatilidade
                  do mercado de criptomoedas, riscos regulatórios e riscos operacionais. Implementamos rigorosas medidas
                  de gestão de risco para mitigar esses fatores, mas é importante que os investidores estejam cientes de
                  que podem ocorrer perdas. Recomendamos que cada investidor avalie cuidadosamente seu perfil de risco
                  antes de investir.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>Como posso sacar meus investimentos?</AccordionTrigger>
                <AccordionContent>
                  Os saques podem ser solicitados através da nossa plataforma online. Para a estratégia Flexível, os
                  saques são processados em até 5 dias úteis. Para estratégias com períodos de lock-up (3 meses, 6 meses
                  ou 1 ano), os saques só podem ser realizados após o término do período contratado, com aviso prévio de
                  30 dias. Em casos excepcionais, podemos permitir saques antecipados mediante uma taxa de 2%.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger>O fundo é regulamentado?</AccordionTrigger>
                <AccordionContent>
                  Sim, o Akin Quantum Hedge Fund Offshore é devidamente registrado e regulamentado nas jurisdições onde
                  opera. Seguimos rigorosos padrões de compliance e transparência, incluindo auditorias independentes
                  regulares e relatórios financeiros detalhados. Nossos investidores podem ter a tranquilidade de estar
                  investindo em um fundo que segue as melhores práticas do mercado.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger>Como posso começar a investir?</AccordionTrigger>
                <AccordionContent>
                  Para começar a investir no Akin Quantum Hedge Fund Offshore, basta criar uma conta em nossa
                  plataforma, completar o processo de verificação KYC (Conheça Seu Cliente) e fazer seu primeiro aporte.
                  Todo o processo pode ser realizado online e nossa equipe de suporte está disponível para ajudar em
                  cada etapa. Após a aprovação da sua conta e confirmação do depósito, seu investimento será alocado de
                  acordo com a estratégia escolhida.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-slate-50 py-16 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Ainda tem dúvidas?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Nossa equipe está pronta para responder a todas as suas perguntas e ajudá-lo a começar sua jornada de
              investimentos.
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <Button asChild size="lg">
                <Link href="/contact">Entre em Contato</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/auth/register">Criar Conta</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
