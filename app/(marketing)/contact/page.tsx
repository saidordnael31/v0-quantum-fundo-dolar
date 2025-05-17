import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
// Remover importação de t se existir
// import { t } from "@/lib/i18n/utils"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-500">
          Get in touch with our team for any questions about Akin Quantum Hedge Fund
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and our team will get back to you within 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="text-sm font-medium">
                    First Name
                  </label>
                  <Input id="first-name" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name" className="text-sm font-medium">
                    Last Name
                  </label>
                  <Input id="last-name" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="john.doe@example.com" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="space-y-2">
                <label htmlFor="investor-type" className="text-sm font-medium">
                  Investor Type
                </label>
                <select
                  id="investor-type"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                  <option value="">Select an option</option>
                  <option value="individual">Individual Investor</option>
                  <option value="family-office">Family Office</option>
                  <option value="institutional">Institutional Investor</option>
                  <option value="financial-advisor">Financial Advisor</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea id="message" placeholder="Please provide details about your inquiry..." rows={5} required />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="privacy-policy" className="h-4 w-4 rounded border-gray-300" required />
                <label htmlFor="privacy-policy" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    privacy policy
                  </a>{" "}
                  and consent to being contacted by Akin Quantum.
                </label>
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Headquarters</h3>
                <address className="not-italic text-gray-600">
                  Akin Quantum Hedge Fund
                  <br />
                  One Financial Plaza, Suite 2000
                  <br />
                  New York, NY 10004
                  <br />
                  United States
                </address>
              </div>
              <div>
                <h3 className="text-lg font-medium">Phone</h3>
                <p className="text-gray-600">
                  <a href="tel:+18005550123" className="hover:text-blue-600">
                    +1 (800) 555-0123
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Email</h3>
                <p className="text-gray-600">
                  <a href="mailto:info@akinquantum.com" className="hover:text-blue-600">
                    info@akinquantum.com
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Investor Relations</h3>
                <p className="text-gray-600">
                  <a href="mailto:invest@akinquantum.com" className="hover:text-blue-600">
                    invest@akinquantum.com
                  </a>
                  <br />
                  <a href="tel:+18005551234" className="hover:text-blue-600">
                    +1 (800) 555-1234
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Office Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM ET</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>Closed</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Virtual meetings available outside regular business hours by appointment.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schedule a Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Interested in learning more about our investment strategies? Schedule a one-on-one consultation with one
                of our investment advisors.
              </p>
              <Button className="w-full">Book a Meeting</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Global Presence</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>New York</CardTitle>
              <CardDescription>Headquarters</CardDescription>
            </CardHeader>
            <CardContent>
              <address className="not-italic text-gray-600">
                One Financial Plaza, Suite 2000
                <br />
                New York, NY 10004
                <br />
                United States
                <br />
                <a href="tel:+18005550123" className="hover:text-blue-600">
                  +1 (800) 555-0123
                </a>
              </address>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>London</CardTitle>
              <CardDescription>European Office</CardDescription>
            </CardHeader>
            <CardContent>
              <address className="not-italic text-gray-600">
                30 St Mary Axe, 28th Floor
                <br />
                London, EC3A 8BF
                <br />
                United Kingdom
                <br />
                <a href="tel:+442071234567" className="hover:text-blue-600">
                  +44 20 7123 4567
                </a>
              </address>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Singapore</CardTitle>
              <CardDescription>Asia-Pacific Office</CardDescription>
            </CardHeader>
            <CardContent>
              <address className="not-italic text-gray-600">
                Marina Bay Financial Centre, Tower 3
                <br />
                Singapore 018982
                <br />
                <a href="tel:+6565551234" className="hover:text-blue-600">
                  +65 6555 1234
                </a>
              </address>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
