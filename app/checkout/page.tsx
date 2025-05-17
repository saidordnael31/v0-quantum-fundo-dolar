import Link from "next/link"

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Akin Quantum Hedge Fund
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
          <div>
            <h2 className="text-center text-3xl font-bold">Checkout</h2>
            <p className="mt-2 text-center text-sm text-gray-600">Amount: $10,000.00</p>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-lg font-medium">Payment Method</h3>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2">
                  <span className="text-sm font-medium">Credit Card</span>
                </div>
                <div className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2">
                  <span className="text-sm font-medium">Bank Transfer</span>
                </div>
                <div className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2">
                  <span className="text-sm font-medium">Crypto</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Card Details</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div>
                  <label htmlFor="cardholder-name" className="block text-sm font-medium text-gray-700">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    id="cardholder-name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry-date"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
