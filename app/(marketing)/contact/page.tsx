import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export const metadata = {
  title: "Contato | Akin Quantum Hedge Fund Offshore",
  description: "Entre em contato com a equipe do Akin Quantum Hedge Fund Offshore",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Entre em Contato</h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Nossa equipe está pronta para responder a todas as suas perguntas e ajudá-lo a começar sua jornada de
              investimentos.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Envie-nos uma mensagem</h2>
              <p className="mb-8 text-muted-foreground">
                Preencha o formulário abaixo e nossa equipe entrará em contato com você o mais breve possível.
              </p>

              <form className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nome Completo
                    </label>
                    <Input id="name" placeholder="Seu nome completo" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      E-mail
                    </label>
                    <Input id="email" type="email" placeholder="seu.email@exemplo.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Assunto
                  </label>
                  <Input id="subject" placeholder="Assunto da mensagem" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensagem
                  </label>
                  <Textarea id="message" placeholder="Digite sua mensagem aqui..." rows={5} />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Enviar Mensagem
                </Button>
              </form>
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-bold">Informações de Contato</h2>
              <p className="mb-8 text-muted-foreground">
                Você também pode entrar em contato conosco diretamente através dos canais abaixo.
              </p>

              <div className="space-y-6">
                <Card>
                  <CardContent className="flex items-start space-x-4 p-6">
                    <Mail className="h-6 w-6 text-emerald-500" />
                    <div>
                      <h3 className="font-bold">E-mail</h3>
                      <p className="text-muted-foreground">contato@akinquantum.com</p>
                      <p className="text-muted-foreground">suporte@akinquantum.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start space-x-4 p-6">
                    <Phone className="h-6 w-6 text-emerald-500" />
                    <div>
                      <h3 className="font-bold">Telefone</h3>
                      <p className="text-muted-foreground">+55 11 3456-7890</p>
                      <p className="text-muted-foreground">+55 11 9876-5432</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start space-x-4 p-6">
                    <MapPin className="h-6 w-6 text-emerald-500" />
                    <div>
                      <h3 className="font-bold">Endereço</h3>
                      <p className="text-muted-foreground">Av. Paulista, 1000, 15º andar</p>
                      <p className="text-muted-foreground">Bela Vista, São Paulo - SP, 01310-100</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 text-xl font-bold">Horário de Atendimento</h3>
                <p className="text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
                <p className="text-muted-foreground">Sábado: 9h às 13h</p>
                <p className="text-muted-foreground">Domingo e Feriados: Fechado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold">Nossa Localização</h2>
            <p className="text-lg text-muted-foreground">
              Visite nosso escritório em São Paulo para uma consulta presencial.
            </p>
          </div>

          <div className="aspect-video w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg">
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Mapa da localização</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-500 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Pronto para começar?</h2>
            <p className="mb-8 text-lg">
              Crie sua conta agora e comece sua jornada de investimentos com o Akin Quantum Hedge Fund Offshore.
            </p>
            <Button asChild size="lg" className="bg-white text-emerald-500 hover:bg-white/90">
              <Link href="/auth/register">Criar Conta</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
