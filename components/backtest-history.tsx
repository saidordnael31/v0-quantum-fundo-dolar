"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { ArrowUpDown, ChevronRight, TrendingDown, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface BacktestHistoryProps {
  userId: string
  onSelectBacktest: (id: string) => void
}

export function BacktestHistory({ userId, onSelectBacktest }: BacktestHistoryProps) {
  const [backtests, setBacktests] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBacktests = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/backtest/history?userId=${userId}`)

        if (!response.ok) {
          throw new Error("Falha ao buscar histórico de backtests")
        }

        const data = await response.json()
        setBacktests(data)
      } catch (error: any) {
        console.error("Erro ao buscar histórico:", error)
        setError(error.message || "Erro ao buscar histórico de backtests")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBacktests()
  }, [userId])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Backtests</CardTitle>
          <CardDescription>Carregando histórico de backtests...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Backtests</CardTitle>
          <CardDescription>Erro ao carregar histórico</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-destructive/10 p-4 text-destructive">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Backtests</CardTitle>
        <CardDescription>Resultados de backtests anteriores</CardDescription>
      </CardHeader>
      <CardContent>
        {backtests.length === 0 ? (
          <div className="rounded-md bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhum backtest encontrado. Execute um novo backtest para ver os resultados aqui.
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estratégia</TableHead>
                  <TableHead>Ativo</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Lucro
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Trades</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backtests.map((backtest) => (
                  <TableRow key={backtest.id}>
                    <TableCell>
                      <div className="font-medium">{backtest.strategyName}</div>
                      <div className="text-xs text-muted-foreground">{backtest.strategyType}</div>
                    </TableCell>
                    <TableCell>{backtest.symbol}</TableCell>
                    <TableCell>
                      <div className="text-xs">
                        {format(new Date(backtest.startDate), "dd/MM/yyyy")} -{" "}
                        {format(new Date(backtest.endDate), "dd/MM/yyyy")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {backtest.profit >= 0 ? (
                          <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                        )}
                        <span className={backtest.profit >= 0 ? "text-green-500" : "text-red-500"}>
                          {backtest.profit.toFixed(2)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{backtest.trades}</TableCell>
                    <TableCell>
                      <div className="text-xs">{format(new Date(backtest.createdAt), "dd/MM/yyyy HH:mm")}</div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => onSelectBacktest(backtest.id)}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
