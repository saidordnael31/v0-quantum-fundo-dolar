import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// Remover importação de t se existir
// import { t } from "@/lib/i18n/utils"

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">How It Works</h1>
        <p className="mt-4 text-lg text-gray-500">Understanding our quantum-powered investment approach</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold">The Quantum Advantage</h2>
          <p className="mb-4 text-gray-600">
            Traditional investment strategies are limited by classical computing constraints. They can only analyze a
            finite number of variables and scenarios sequentially, often missing complex market patterns and
            opportunities.
          </p>
          <p className="mb-4 text-gray-600">
            Quantum computing changes everything. By harnessing quantum properties like superposition and entanglement,
            our systems can evaluate millions of potential market scenarios simultaneously, identifying optimal
            investment opportunities with unprecedented speed and accuracy.
          </p>
          <p className="text-gray-600">
            This quantum advantage allows us to detect market inefficiencies invisible to traditional systems, leading
            to superior risk-adjusted returns across all market conditions.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/quantum-computing-visualization.png"
            alt="Quantum Computing Visualization"
            className="rounded-lg shadow-lg"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>

      <div className="my-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Our Investment Process</h2>
        <div className="relative">
          <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 transform bg-gray-200"></div>
          <div className="space-y-12">
            <div className="relative">
              <div className="absolute left-1/2 -ml-3 mt-6 h-6 w-6 -translate-x-1/2 transform rounded-full bg-blue-500"></div>
              <div className="ml-auto mr-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
                <div className="md:text-right">
                  <h3 className="text-xl font-bold">1. Data Collection & Analysis</h3>
                  <p className="mt-2 text-gray-600">
                    Our quantum systems continuously analyze vast amounts of global market data, including price
                    movements, trading volumes, economic indicators, news sentiment, and alternative data sources.
                  </p>
                </div>
                <div></div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 -ml-3 mt-6 h-6 w-6 -translate-x-1/2 transform rounded-full bg-blue-500"></div>
              <div className="ml-auto mr-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
                <div></div>
                <div>
                  <h3 className="text-xl font-bold">2. Quantum Pattern Recognition</h3>
                  <p className="mt-2 text-gray-600">
                    Using proprietary quantum algorithms, we identify complex patterns and correlations across asset
                    classes that are invisible to classical computing systems, revealing hidden market inefficiencies
                    and opportunities.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 -ml-3 mt-6 h-6 w-6 -translate-x-1/2 transform rounded-full bg-blue-500"></div>
              <div className="ml-auto mr-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
                <div className="md:text-right">
                  <h3 className="text-xl font-bold">3. Strategy Formulation</h3>
                  <p className="mt-2 text-gray-600">
                    Our quantum systems develop and test millions of potential investment strategies, optimizing for
                    risk-adjusted returns across various market scenarios and time horizons.
                  </p>
                </div>
                <div></div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 -ml-3 mt-6 h-6 w-6 -translate-x-1/2 transform rounded-full bg-blue-500"></div>
              <div className="ml-auto mr-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
                <div></div>
                <div>
                  <h3 className="text-xl font-bold">4. Portfolio Construction</h3>
                  <p className="mt-2 text-gray-600">
                    Using quantum optimization techniques, we construct portfolios that precisely balance risk and
                    return objectives, considering thousands of assets and constraints simultaneously in ways classical
                    computers cannot.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 -ml-3 mt-6 h-6 w-6 -translate-x-1/2 transform rounded-full bg-blue-500"></div>
              <div className="ml-auto mr-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
                <div className="md:text-right">
                  <h3 className="text-xl font-bold">5. Execution & Monitoring</h3>
                  <p className="mt-2 text-gray-600">
                    Our high-performance trading infrastructure executes strategies with minimal market impact, while
                    continuous quantum-powered monitoring adapts to changing market conditions in real-time.
                  </p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Investment Strategies</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Conservative Strategy</CardTitle>
              <CardDescription>Low risk, stable returns</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Our Conservative strategy focuses on capital preservation while generating consistent income. It
                primarily invests in high-quality fixed income securities, with limited exposure to equities.
              </p>
              <ul className="list-inside list-disc space-y-1 text-gray-600">
                <li>Target annual return: 5-8%</li>
                <li>Risk level: Low</li>
                <li>Recommended investment horizon: 2+ years</li>
                <li>Quarterly rebalancing</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-blue-500 shadow-lg">
            <CardHeader className="bg-blue-50">
              <CardTitle>Balanced Strategy</CardTitle>
              <CardDescription>Moderate risk, enhanced returns</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Our most popular option, the Balanced strategy seeks to optimize risk-adjusted returns through a
                diversified portfolio of global equities, fixed income, and alternative investments.
              </p>
              <ul className="list-inside list-disc space-y-1 text-gray-600">
                <li>Target annual return: 8-15%</li>
                <li>Risk level: Moderate</li>
                <li>Recommended investment horizon: 3+ years</li>
                <li>Monthly rebalancing</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Aggressive Strategy</CardTitle>
              <CardDescription>Higher risk, maximum growth</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Our Aggressive strategy aims for maximum capital appreciation through concentrated positions in
                high-growth opportunities identified by our quantum algorithms.
              </p>
              <ul className="list-inside list-disc space-y-1 text-gray-600">
                <li>Target annual return: 15-25%</li>
                <li>Risk level: High</li>
                <li>Recommended investment horizon: 5+ years</li>
                <li>Weekly rebalancing</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="my-16 rounded-lg bg-slate-50 p-8">
        <h2 className="mb-6 text-center text-3xl font-bold">Risk Management</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-bold">Quantum Risk Modeling</h3>
            <p className="mb-4 text-gray-600">
              Our quantum risk models can simulate millions of potential market scenarios simultaneously, identifying
              tail risks and correlations that traditional risk management systems miss.
            </p>
            <p className="text-gray-600">
              This allows us to construct portfolios with robust downside protection and optimal diversification across
              all market conditions.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold">Continuous Adaptation</h3>
            <p className="mb-4 text-gray-600">
              Markets are dynamic, and so are our strategies. Our quantum systems continuously monitor market conditions
              and portfolio performance, making real-time adjustments to maintain optimal risk-reward profiles.
            </p>
            <p className="text-gray-600">
              During periods of market stress, our algorithms can rapidly de-risk portfolios, helping to preserve
              capital when it matters most.
            </p>
          </div>
        </div>
      </div>

      <div className="my-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Getting Started</h2>
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                1
              </div>
              <CardTitle className="mt-4">Create an Account</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Complete our online application process. For qualified investors, this typically takes less than 10
                minutes.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                2
              </div>
              <CardTitle className="mt-4">Investment Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Speak with one of our investment advisors to determine the optimal strategy based on your financial
                goals and risk tolerance.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                3
              </div>
              <CardTitle className="mt-4">Fund Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Transfer funds to your Akin Quantum account. We accept wire transfers, ACH, and cryptocurrency deposits.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                4
              </div>
              <CardTitle className="mt-4">Monitor Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Access your secure dashboard to track performance, view detailed analytics, and receive regular
                investment reports.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
