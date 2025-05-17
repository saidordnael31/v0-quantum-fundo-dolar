import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// Remover importação de t se existir
// import { t } from "@/lib/i18n/utils"

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-gray-500">Find answers to common questions about Akin Quantum Hedge Fund</p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is quantum computing and how does it improve investments?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Quantum computing is a revolutionary technology that leverages quantum mechanics principles to process
                information in ways that classical computers cannot. Unlike classical computers that use bits (0s and
                1s), quantum computers use quantum bits or "qubits" that can exist in multiple states simultaneously
                through a property called superposition.
              </p>
              <p className="mb-2">For investments, this provides three key advantages:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <strong>Computational Power:</strong> Quantum computers can analyze vast amounts of market data and
                  evaluate millions of potential scenarios simultaneously.
                </li>
                <li>
                  <strong>Pattern Recognition:</strong> Quantum algorithms excel at identifying complex patterns and
                  correlations across global markets that are invisible to classical systems.
                </li>
                <li>
                  <strong>Optimization:</strong> Quantum computing can optimize portfolio construction across thousands
                  of assets simultaneously, balancing risk and return with mathematical precision.
                </li>
              </ul>
              <p className="mt-2">
                These advantages allow us to develop investment strategies that consistently outperform traditional
                approaches in both bull and bear markets.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>What are the minimum investment requirements?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">Our minimum investment requirements vary by strategy:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <strong>Conservative Strategy:</strong> $100,000 minimum investment
                </li>
                <li>
                  <strong>Balanced Strategy:</strong> $250,000 minimum investment
                </li>
                <li>
                  <strong>Aggressive Strategy:</strong> $500,000 minimum investment
                </li>
              </ul>
              <p className="mt-2">
                For institutional investors and family offices, we offer customized solutions with higher minimums.
                Please contact our investor relations team for more information.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How liquid are my investments?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                We offer monthly liquidity for all our investment strategies, with redemption requests processed at the
                end of each month. Redemption requests must be submitted at least 15 business days before the end of the
                month.
              </p>
              <p className="mb-2">
                For larger redemptions (over $1 million), we may implement a gating mechanism to ensure orderly
                liquidation and protect remaining investors. This would be communicated clearly at the time of
                redemption.
              </p>
              <p>
                We also offer more liquid solutions for investors who require greater flexibility, though these may have
                different fee structures and return profiles. Please consult with your investment advisor for details.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>What fees do you charge?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Our fee structure follows the industry-standard "2 and 20" model with some variations based on strategy
                and investment size:
              </p>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <strong>Management Fee:</strong> 1.5-2% annual fee calculated on assets under management, charged
                  quarterly
                </li>
                <li>
                  <strong>Performance Fee:</strong> 20% of profits above a high-water mark, ensuring you only pay for
                  positive performance
                </li>
              </ul>
              <p className="mt-2">
                For larger investments ($5 million+), we offer fee discounts. We also implement a hurdle rate on certain
                strategies, meaning performance fees are only charged on returns exceeding a predetermined benchmark.
              </p>
              <p className="mt-2">
                All fees are transparent and clearly detailed in our investment agreement. There are no hidden charges
                or exit fees.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>How do you manage risk?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Risk management is integral to our investment process, not an afterthought. Our approach includes:
              </p>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <strong>Quantum Risk Modeling:</strong> Our proprietary quantum algorithms simulate millions of market
                  scenarios to identify potential risks that traditional models miss.
                </li>
                <li>
                  <strong>Diversification:</strong> We maintain optimal diversification across asset classes,
                  geographies, and sectors, with exposure limits for individual positions.
                </li>
                <li>
                  <strong>Tail Risk Hedging:</strong> We implement cost-effective hedging strategies to protect against
                  extreme market events.
                </li>
                <li>
                  <strong>Continuous Monitoring:</strong> Our systems monitor market conditions and portfolio
                  performance 24/7, making real-time adjustments as needed.
                </li>
                <li>
                  <strong>Stress Testing:</strong> We regularly stress test portfolios against historical and
                  hypothetical crisis scenarios.
                </li>
              </ul>
              <p className="mt-2">
                Our risk management approach has proven effective during major market disruptions, including the 2020
                COVID crash, where our strategies experienced significantly less drawdown than the broader market.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>Who can invest with Akin Quantum?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">Akin Quantum Hedge Fund is available to:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <strong>Accredited Investors:</strong> Individuals with a net worth exceeding $1 million (excluding
                  primary residence) or income exceeding $200,000 ($300,000 with spouse) for the past two years.
                </li>
                <li>
                  <strong>Qualified Purchasers:</strong> Individuals or family-owned businesses owning $5 million or
                  more in investments.
                </li>
                <li>
                  <strong>Institutional Investors:</strong> Pension funds, endowments, foundations, etc.
                </li>
                <li>
                  <strong>Family Offices:</strong> Single and multi-family offices managing family wealth.
                </li>
                <li>
                  <strong>Non-U.S. Investors:</strong> We offer offshore fund structures for non-U.S. investors, subject
                  to their local regulations.
                </li>
              </ul>
              <p className="mt-2">
                All investors must complete our due diligence process, which includes identity verification and source
                of funds confirmation in compliance with anti-money laundering regulations.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>How do I monitor my investment performance?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">We provide comprehensive performance reporting and portfolio transparency:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <strong>Secure Online Portal:</strong> 24/7 access to your account dashboard showing real-time
                  performance, allocation, and historical returns.
                </li>
                <li>
                  <strong>Monthly Statements:</strong> Detailed monthly statements with performance metrics, transaction
                  history, and fee calculations.
                </li>
                <li>
                  <strong>Quarterly Reports:</strong> In-depth quarterly reports with market commentary, strategy
                  updates, and performance attribution.
                </li>
                <li>
                  <strong>Annual Tax Documents:</strong> Comprehensive tax reporting documents to simplify your tax
                  filing process.
                </li>
                <li>
                  <strong>Dedicated Relationship Manager:</strong> Personal contact for any questions about your
                  investments or reports.
                </li>
              </ul>
              <p className="mt-2">
                We also host quarterly investor webinars where our investment team discusses market conditions, strategy
                performance, and outlook.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>What makes Akin Quantum different from other hedge funds?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">Akin Quantum stands apart from traditional hedge funds in several key ways:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <strong>Quantum Technology:</strong> We're one of the few investment firms globally with proprietary
                  quantum computing algorithms specifically designed for financial markets.
                </li>
                <li>
                  <strong>Scientific Approach:</strong> Our team includes PhDs in quantum physics, mathematics, and
                  computer science working alongside experienced financial professionals.
                </li>
                <li>
                  <strong>Performance Track Record:</strong> Our strategies have consistently outperformed traditional
                  hedge funds and market indices across various market conditions.
                </li>
                <li>
                  <strong>Risk Management:</strong> Our quantum risk models provide superior downside protection during
                  market stress.
                </li>
                <li>
                  <strong>Transparency:</strong> Unlike many hedge funds, we provide detailed insights into our
                  investment process and portfolio construction.
                </li>
              </ul>
              <p className="mt-2">
                While many funds claim to use AI or machine learning, our quantum computing approach represents a
                fundamental leap forward in investment technology, not just an incremental improvement.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger>How do I get started?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">Getting started with Akin Quantum is straightforward:</p>
              <ol className="list-inside list-decimal space-y-2">
                <li>
                  <strong>Initial Consultation:</strong> Schedule a call with our investor relations team to discuss
                  your investment goals, risk tolerance, and suitability.
                </li>
                <li>
                  <strong>Account Application:</strong> Complete our online application process, which includes identity
                  verification and accredited investor certification.
                </li>
                <li>
                  <strong>Investment Selection:</strong> Work with your dedicated advisor to select the appropriate
                  investment strategy or create a customized solution.
                </li>
                <li>
                  <strong>Documentation:</strong> Review and sign the investment agreement and related documents
                  electronically.
                </li>
                <li>
                  <strong>Fund Your Account:</strong> Transfer your investment funds via wire transfer, ACH, or
                  cryptocurrency.
                </li>
                <li>
                  <strong>Account Activation:</strong> Once funds are received, your account is activated and invested
                  according to your selected strategy at the next available entry point.
                </li>
              </ol>
              <p className="mt-2">
                The entire process typically takes 3-5 business days from initial consultation to investment. Our team
                provides guidance at every step to ensure a smooth onboarding experience.
              </p>
              <p className="mt-2">
                To schedule your initial consultation, please contact us at invest@akinquantum.com or call
                +1-800-555-0123.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mt-16 text-center">
        <h2 className="mb-4 text-2xl font-bold">Still have questions?</h2>
        <p className="mb-6 text-gray-600">
          Our team is ready to assist you with any additional questions you may have about investing with Akin Quantum.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="mailto:info@akinquantum.com"
            className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Contact Us
          </a>
          <a
            href="/contact"
            className="rounded-md border border-gray-300 bg-white px-6 py-3 text-gray-700 hover:bg-gray-50"
          >
            Schedule a Consultation
          </a>
        </div>
      </div>
    </div>
  )
}
