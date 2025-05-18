"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

import { BacktestForm } from "@/components/backtest-form"
import { BacktestResults } from "@/components/backtest-results"
import { BacktestHistory } from "@/components/backtest-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

export default function BacktestingPage() {
  // Usuário mockado para demonstração
  const userId = "user123"

  const [strategies, setStrategies] = useState<any[]>([])
  const [isLoadingStrategies, setIsLoadingStrategies] = useState(true)
  const [isRunningBacktest, setIsRunningBacktest] = useState(false)
  const [backtestResults, setBacktestResults] = useState<any>(null)
  const [selectedBacktestId, setSelectedBacktestId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("new")

  const { toast } = useToast()

  // Buscar estratégias do usuário
  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        // Normalmente, buscaríamos as estratégias da API
        // Por enquanto, vamos usar dados mockados
        setIsLoadingStrategies(true)

        // Simular uma chamada de API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setStrategies([
          {
            id: "strat-1",
            name: "MACD BTC",
            type: "MACD",
            parameters: {
              fastPeriod: 12,
              slowPeriod: 26,
              signalPeriod: 9,
            },
          },
          {
            id: "strat-2",
            name: "RSI ETH",
            type: "RSI",
            parameters: {
              period: 14,
              overbought: 70,
              oversold: 30,
            },
          },
          {
            id: "strat-3",
            name: "Bollinger BTC",
            type: "BOLLINGER",
            parameters: {
              period: 20,
              stdDev: 2,
            },
          },
        ])
      } catch (error) {
        console.error("Erro ao buscar estratégias:", error)
        toast({
          title: "Erro",
          description: "Falha ao carregar estratégias",
          variant: "destructive",
        })
      } finally {
        setIsLoadingStrategies(false)
      }
    }

    fetchStrategies()
  }, [toast])

  // Buscar detalhes de um backtest específico
  useEffect(() => {
    if (!selectedBacktestId) return

    const fetchBacktestDetails = async () => {
      try {
        setIsRunningBacktest(true)
        const response = await fetch(`/api/backtest/${selectedBacktestId}`)

        if (!response.ok) {
          throw new Error("Falha ao buscar detalhes do backtest")
        }

        const data = await response.json()
        setBacktestResults(data.results)
        setActiveTab("results")
      } catch (error: any) {
        console.error("Erro ao buscar detalhes do backtest:", error)
        toast({
          title: "Erro",
          description: error.message || "Falha ao buscar detalhes do backtest",
          variant: "destructive",
        })
      } finally {
        setIsRunningBacktest(false)
      }
    }

    fetchBacktestDetails()
  }, [selectedBacktestId, toast])

  const handleRunBacktest = async (data: any) => {
    try {
      setIsRunningBacktest(true)

      const response = await fetch("/api/backtest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Falha ao executar backtest")
      }

      const results = await response.json()
      setBacktestResults(results)
      setActiveTab("results")

      toast({
        title: "Backtest concluído",
        description: "O backtest foi executado com sucesso",
      })
    } catch (error: any) {
      console.error("Erro ao executar backtest:", error)
      toast({
        title: "Erro",
        description: error.message || "Falha ao executar backtest",
        variant: "destructive",
      })
    } finally {
      setIsRunningBacktest(false)
    }
  }

  const handleSelectBacktest = (id: string) => {
    setSelectedBacktestId(id)
  }

  if (isLoadingStrategies) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Carregando estratégias...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-2 text-3xl font-bold">Backtesting</h1>
      <p className="mb-6 text-muted-foreground">
        Teste suas estratégias de trading em dados históricos para avaliar seu desempenho
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="new">Novo Backtest</TabsTrigger>
          <TabsTrigger value="results" disabled={!backtestResults}>
            Resultados
          </TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <BacktestForm
              userId={userId}
              strategies={strategies}
              onSubmit={handleRunBacktest}
              isLoading={isRunningBacktest}
            />

            <div>
              <h2 className="mb-4 text-xl font-semibold">Dicas para Backtesting</h2>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h3 className="font-medium">Período de Teste</h3>
                  <p className="text-sm text-muted-foreground">
                    Escolha um período que inclua diferentes condições de mercado (alta, baixa, lateralização) para
                    testar a robustez da sua estratégia.
                  </p>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="font-medium">Overfitting</h3>
                  <p className="text-sm text-muted-foreground">
                    Cuidado com o overfitting - quando sua estratégia funciona bem nos dados históricos mas falha em
                    dados novos. Teste em diferentes períodos.
                  </p>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="font-medium">Métricas Importantes</h3>
                  <p className="text-sm text-muted-foreground">
                    Além do lucro, observe o drawdown máximo, Sharpe ratio e taxa de acerto para avaliar o risco da
                    estratégia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="results">
          {isRunningBacktest ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Executando backtest...</span>
            </div>
          ) : backtestResults ? (
            <BacktestResults results={backtestResults} />
          ) : (
            <div className="rounded-md border p-4 text-center">
              <p className="text-muted-foreground">Execute um backtest para ver os resultados aqui</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          <BacktestHistory userId={userId} onSelectBacktest={handleSelectBacktest} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
