"use server"

type EmailOptions = {
  to: string
  subject: string
  html: string
}

/**
 * Sends an email using the configured email service
 * In a real application, this would use a service like SendGrid, Mailchimp, or AWS SES
 */
async function sendEmail(options: EmailOptions): Promise<{ success: boolean; message?: string }> {
  try {
    // This is a simulated email sending function
    // In a real application, you would replace this with actual email service API calls
    console.log(`Sending email to: ${options.to}`)
    console.log(`Subject: ${options.subject}`)
    console.log(`Content: ${options.html.substring(0, 100)}...`)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return success
    return { success: true }
  } catch (error) {
    console.error("Failed to send email:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to send email",
    }
  }
}

/**
 * Creates an investment confirmation email HTML
 */
function createInvestmentConfirmationEmail(data: {
  investmentType: string
  amount: string
  strategy: string
  duration: string
  riskLevel: number
  transactionId: string
  date: string
}): string {
  const { investmentType, amount, strategy, duration, riskLevel, transactionId, date } = data

  // Format the strategy name to be more readable
  const formatStrategy = (strategy: string) => {
    switch (strategy) {
      case "conservative":
        return "Conservative (Low Risk)"
      case "balanced":
        return "Balanced (Medium Risk)"
      case "aggressive":
        return "Aggressive (High Risk)"
      case "quantum":
        return "Quantum AI (Dynamic)"
      default:
        return strategy
    }
  }

  // Format the duration to be more readable
  const formatDuration = (duration: string) => {
    switch (duration) {
      case "flexible":
        return "Flexible (No Lock-up)"
      case "3months":
        return "3 Months"
      case "6months":
        return "6 Months"
      case "1year":
        return "1 Year"
      default:
        return duration
    }
  }

  // Format the amount with the appropriate currency symbol
  const formatAmount = (amount: string, type: string) => {
    return type === "usd" ? `$${amount}` : `${amount} BTC`
  }

  // Current year for the footer
  const currentYear = new Date().getFullYear()

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Akin Quantum Hedge Fund Offshore</title>
        <style>
          /* Base styles */
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: none;
          }
          .email-wrapper {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .email-header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #eaeaea;
          }
          .email-logo {
            font-size: 24px;
            font-weight: bold;
            color: #10b981;
          }
          .email-body {
            padding: 20px 0;
          }
          .email-footer {
            text-align: center;
            padding: 20px 0;
            border-top: 1px solid #eaeaea;
            font-size: 12px;
            color: #666;
          }
          h1 {
            color: #10b981;
            margin-bottom: 20px;
          }
          h2 {
            margin-top: 30px;
            margin-bottom: 15px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th {
            text-align: left;
            padding: 10px;
            background-color: #f9fafb;
            border: 1px solid #eaeaea;
          }
          td {
            padding: 10px;
            border: 1px solid #eaeaea;
          }
          .button {
            color: white;
            background-color: #10b981;
            padding: 10px 20px;
            border-radius: 4px;
            text-decoration: none;
            display: inline-block;
            margin: 20px 0;
          }
          .info-box {
            margin-top: 30px;
            padding: 15px;
            background-color: #f9fafb;
            border-radius: 4px;
          }
          .info-box h3 {
            margin: 0 0 10px 0;
          }
          .info-box p {
            margin: 0;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="email-header">
            <div class="email-logo">Akin Quantum Hedge Fund Offshore</div>
          </div>
          <div class="email-body">
            <h1>Investment Confirmation</h1>
            
            <p>
              Thank you for your investment with Akin Quantum Hedge Fund Offshore. Your transaction has been successfully
              processed.
            </p>
            
            <h2>Investment Details</h2>
            
            <table>
              <tbody>
                <tr>
                  <th>Transaction ID</th>
                  <td>${transactionId}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>${date}</td>
                </tr>
                <tr>
                  <th>Investment Type</th>
                  <td>${investmentType.toUpperCase()}</td>
                </tr>
                <tr>
                  <th>Amount</th>
                  <td>${formatAmount(amount, investmentType)}</td>
                </tr>
                <tr>
                  <th>Strategy</th>
                  <td>${formatStrategy(strategy)}</td>
                </tr>
                <tr>
                  <th>Duration</th>
                  <td>${formatDuration(duration)}</td>
                </tr>
                <tr>
                  <th>Risk Level</th>
                  <td>${riskLevel}%</td>
                </tr>
              </tbody>
            </table>
            
            <p>
              Your investment will be managed according to the ${formatStrategy(strategy)} strategy. You can track the
              performance of your investment in real-time through your dashboard.
            </p>
            
            <a href="https://akin-quantum.example.com/dashboard" class="button">
              View Your Dashboard
            </a>
            
            <div class="info-box">
              <h3>Important Information</h3>
              <p>
                All investments involve risk and may lose value. Past performance is not indicative of future results. If you
                have any questions about your investment, please contact our support team at support@akin-quantum.example.com.
              </p>
            </div>
          </div>
          <div class="email-footer">
            <p>© ${currentYear} Akin Quantum Hedge Fund Offshore. All rights reserved.</p>
            <p>
              This email was sent to you as a registered user of the Akin Quantum Hedge Fund Offshore. To update your
              email preferences, please visit your account settings.
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

/**
 * Sends an investment confirmation email
 */
export async function sendInvestmentConfirmationEmail(
  email: string,
  data: {
    investmentType: string
    amount: string
    strategy: string
    duration: string
    riskLevel: number
    transactionId: string
    date: string
  },
): Promise<{ success: boolean; message?: string }> {
  try {
    // Generate the email HTML using our template function
    const emailHtml = createInvestmentConfirmationEmail(data)

    // Send the email
    return await sendEmail({
      to: email,
      subject: "Investment Confirmation - Akin Quantum Hedge Fund Offshore",
      html: emailHtml,
    })
  } catch (error) {
    console.error("Failed to send investment confirmation email:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to send investment confirmation email",
    }
  }
}
