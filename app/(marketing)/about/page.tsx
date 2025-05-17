import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// Remover importação de t se existir
// import { t } from "@/lib/i18n/utils"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Akin Quantum Hedge Fund</h1>
        <p className="mt-4 text-lg text-gray-500">
          Pioneering the future of investment through quantum computing technology
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Our Story</h2>
          <p className="mb-4 text-gray-600">
            Founded in 2018 by a team of quantum physicists and financial experts, Akin Quantum Hedge Fund was born from
            a simple yet revolutionary idea: harness the power of quantum computing to transform investment strategies.
          </p>
          <p className="mb-4 text-gray-600">
            Our founders recognized that traditional investment approaches were limited by classical computing
            constraints, unable to process the vast complexity of global markets with sufficient speed and accuracy. By
            leveraging quantum algorithms, we've developed proprietary trading strategies that can analyze market
            patterns and identify opportunities invisible to conventional systems.
          </p>
          <p className="text-gray-600">
            Today, we manage over $2.8 billion in assets for institutional investors, family offices, and qualified
            individual investors worldwide, consistently delivering superior risk-adjusted returns through all market
            conditions.
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
        <h2 className="mb-8 text-center text-3xl font-bold">Our Quantum Advantage</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Computational Power</CardTitle>
              <CardDescription>Exponentially faster analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our quantum systems can simultaneously evaluate millions of potential market scenarios, identifying
                optimal investment opportunities with unprecedented speed and accuracy.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pattern Recognition</CardTitle>
              <CardDescription>Identifying hidden correlations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Quantum algorithms excel at recognizing complex patterns across vast datasets, allowing us to identify
                market inefficiencies and arbitrage opportunities invisible to traditional systems.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Risk Optimization</CardTitle>
              <CardDescription>Superior portfolio construction</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our quantum-powered risk models can optimize portfolio construction across thousands of assets
                simultaneously, balancing risk and return with mathematical precision.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="my-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Our Team</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <img
              src="/ceo-headshot.png"
              alt="Dr. Elena Kowalski"
              className="mx-auto mb-4 h-40 w-40 rounded-full object-cover"
            />
            <h3 className="text-xl font-bold">Dr. Elena Kowalski</h3>
            <p className="text-gray-500">Founder & CEO</p>
            <p className="mt-2 text-sm text-gray-600">
              Former quantum physicist at CERN with 15+ years in quantitative finance
            </p>
          </div>
          <div className="text-center">
            <img
              src="/placeholder-e0azd.png"
              alt="Michael Chen"
              className="mx-auto mb-4 h-40 w-40 rounded-full object-cover"
            />
            <h3 className="text-xl font-bold">Michael Chen</h3>
            <p className="text-gray-500">Chief Investment Officer</p>
            <p className="mt-2 text-sm text-gray-600">
              Previously managed $5B global macro fund with 20+ years experience
            </p>
          </div>
          <div className="text-center">
            <img
              src="/cto-headshot.png"
              alt="Dr. James Rodriguez"
              className="mx-auto mb-4 h-40 w-40 rounded-full object-cover"
            />
            <h3 className="text-xl font-bold">Dr. James Rodriguez</h3>
            <p className="text-gray-500">Chief Technology Officer</p>
            <p className="mt-2 text-sm text-gray-600">
              Pioneered quantum algorithms at Google Quantum AI before joining Akin
            </p>
          </div>
          <div className="text-center">
            <img
              src="/risk-officer-headshot.png"
              alt="Dr. Sarah Okonjo"
              className="mx-auto mb-4 h-40 w-40 rounded-full object-cover"
            />
            <h3 className="text-xl font-bold">Dr. Sarah Okonjo</h3>
            <p className="text-gray-500">Chief Risk Officer</p>
            <p className="mt-2 text-sm text-gray-600">
              PhD in Mathematical Finance with expertise in quantum risk modeling
            </p>
          </div>
        </div>
      </div>

      <div className="my-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We continuously push the boundaries of what's possible in quantitative finance, investing heavily in
                research and development to maintain our technological edge.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                While our algorithms are proprietary, we believe in complete transparency with our investors about
                performance, risk, and fees. We provide detailed reporting and open communication.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Responsibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We recognize the responsibility that comes with managing our clients' capital. Every investment decision
                is made with careful consideration of risk and long-term sustainability.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="my-16 rounded-lg bg-slate-50 p-8">
        <h2 className="mb-6 text-center text-3xl font-bold">Our Approach</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-bold">Research-Driven Strategy</h3>
            <p className="mb-4 text-gray-600">
              Our investment process begins with rigorous scientific research. Our team of PhDs in physics, mathematics,
              and computer science works alongside seasoned financial experts to develop and refine our quantum
              algorithms.
            </p>
            <p className="text-gray-600">
              We maintain partnerships with leading quantum computing laboratories and universities, ensuring we remain
              at the cutting edge of both quantum technology and financial theory.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold">Execution Excellence</h3>
            <p className="mb-4 text-gray-600">
              The most sophisticated algorithms are only as good as their implementation. We've built a state-of-the-art
              trading infrastructure that connects to global markets with minimal latency.
            </p>
            <p className="text-gray-600">
              Our execution systems are continuously optimized to minimize transaction costs and market impact, ensuring
              that theoretical advantages translate into real-world returns.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
