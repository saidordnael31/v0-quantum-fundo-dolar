"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Esquema de validação para o formulário
const formSchema = z.object({
  symbol: z.string().min(1, "Símbolo é obrigatório"),
  strategyId: z.string().min(1, "Estratégia é obrigatória"),
  startDate: z.date({
    required_error: "Data inicial é obrigatória",
  }),
  endDate: z.date({
    required_error: "Data final é obrigatória",
  }),
  initialCapital: z.coerce.number().min(100, "Capital inicial deve ser pelo menos 100"),
})

interface BacktestFormProps {
  userId: string
  strategies: Array<{
    id: string
    name: string
    type: string
    parameters: any
  }>
  onSubmit: (data: any) => void
  isLoading: boolean
}

export function BacktestForm({ userId, strategies, onSubmit, isLoading }: BacktestFormProps) {
  const [activeTab, setActiveTab] = useState("basic")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: "BTC",
      initialCapital: 10000,
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Encontrar a estratégia selecionada
    const selectedStrategy = strategies.find((s) => s.id === values.strategyId)

    if (!selectedStrategy) {
      form.setError("strategyId", { message: "Estratégia não encontrada" })
      return
    }

    // Preparar dados para envio
    const data = {
      userId,
      strategyId: values.strategyId,
      symbol: values.symbol,
      startDate: format(values.startDate, "yyyy-MM-dd"),
      endDate: format(values.endDate, "yyyy-MM-dd"),
      initialCapital: values.initialCapital,
      strategyType: selectedStrategy.type,
      strategyParams: selectedStrategy.parameters,
    }

    onSubmit(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurar Backtest</CardTitle>
        <CardDescription>Teste sua estratégia em dados históricos para avaliar seu desempenho</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Configurações Básicas</TabsTrigger>
            <TabsTrigger value="advanced">Configurações Avançadas</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <TabsContent value="basic" className="space-y-4">
                <FormField
                  control={form.control}
                  name="symbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ativo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um ativo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                          <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                          <SelectItem value="SOL">Solana (SOL)</SelectItem>
                          <SelectItem value="BNB">Binance Coin (BNB)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Selecione o ativo para testar sua estratégia</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="strategyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estratégia</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma estratégia" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {strategies.map((strategy) => (
                            <SelectItem key={strategy.id} value={strategy.id}>
                              {strategy.name} ({strategy.type})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Escolha a estratégia que deseja testar</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data Inicial</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? format(field.value, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date("2020-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data Final</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? format(field.value, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date("2020-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="initialCapital"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capital Inicial (USD)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>Valor inicial para simulação de trades</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="advanced">
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="mb-2 font-medium">Parâmetros da Estratégia</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Os parâmetros serão carregados automaticamente da estratégia selecionada. Para modificar os
                      parâmetros, edite a estratégia ou crie uma nova.
                    </p>

                    {form.watch("strategyId") ? (
                      <div className="space-y-2">
                        {strategies.find((s) => s.id === form.watch("strategyId"))?.parameters && (
                          <pre className="rounded-md bg-muted p-4 text-sm">
                            {JSON.stringify(
                              strategies.find((s) => s.id === form.watch("strategyId"))?.parameters,
                              null,
                              2,
                            )}
                          </pre>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Selecione uma estratégia para ver seus parâmetros</p>
                    )}
                  </div>
                </div>
              </TabsContent>

              <CardFooter className="px-0 pt-4">
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Executando..." : "Executar Backtest"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  )
}
