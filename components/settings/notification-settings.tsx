"use client"

import { useState } from "react"
import { Bell, Mail, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function NotificationSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState({
    marketUpdates: true,
    accountActivity: true,
    newFeatures: false,
    promotions: false,
  })

  const [pushNotifications, setPushNotifications] = useState({
    marketAlerts: true,
    priceAlerts: true,
    transactionUpdates: true,
    securityAlerts: true,
  })

  const [smsNotifications, setSmsNotifications] = useState({
    securityAlerts: true,
    transactionConfirmations: false,
    marketAlerts: false,
  })

  function saveSettings() {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings saved",
        description: "Your notification preferences have been updated",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Configure which emails you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Market Updates</p>
                <p className="text-sm text-muted-foreground">Receive weekly market analysis and insights</p>
              </div>
            </div>
            <Switch
              checked={emailNotifications.marketUpdates}
              onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, marketUpdates: checked })}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Account Activity</p>
                <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
              </div>
            </div>
            <Switch
              checked={emailNotifications.accountActivity}
              onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, accountActivity: checked })}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">New Features</p>
                <p className="text-sm text-muted-foreground">Learn about new features and improvements</p>
              </div>
            </div>
            <Switch
              checked={emailNotifications.newFeatures}
              onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, newFeatures: checked })}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Promotions</p>
                <p className="text-sm text-muted-foreground">Receive promotional offers and discounts</p>
              </div>
            </div>
            <Switch
              checked={emailNotifications.promotions}
              onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, promotions: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>Configure which push notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Market Alerts</p>
                <p className="text-sm text-muted-foreground">Receive alerts about significant market movements</p>
              </div>
            </div>
            <Switch
              checked={pushNotifications.marketAlerts}
              onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, marketAlerts: checked })}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Price Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when BTC reaches your target price</p>
              </div>
            </div>
            <Switch
              checked={pushNotifications.priceAlerts}
              onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, priceAlerts: checked })}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Transaction Updates</p>
                <p className="text-sm text-muted-foreground">Get notified about your investment transactions</p>
              </div>
            </div>
            <Switch
              checked={pushNotifications.transactionUpdates}
              onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, transactionUpdates: checked })}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Security Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified about security-related events</p>
              </div>
            </div>
            <Switch
              checked={pushNotifications.securityAlerts}
              onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, securityAlerts: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SMS Notifications</CardTitle>
          <CardDescription>Configure which SMS notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Security Alerts</p>
                <p className="text-sm text-muted-foreground">Receive SMS for security-related events</p>
              </div>
            </div>
            <Switch
              checked={smsNotifications.securityAlerts}
              onCheckedChange={(checked) => setSmsNotifications({ ...smsNotifications, securityAlerts: checked })}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Transaction Confirmations</p>
                <p className="text-sm text-muted-foreground">Receive SMS confirmations for transactions</p>
              </div>
            </div>
            <Switch
              checked={smsNotifications.transactionConfirmations}
              onCheckedChange={(checked) =>
                setSmsNotifications({ ...smsNotifications, transactionConfirmations: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Market Alerts</p>
                <p className="text-sm text-muted-foreground">Receive SMS for significant market movements</p>
              </div>
            </div>
            <Switch
              checked={smsNotifications.marketAlerts}
              onCheckedChange={(checked) => setSmsNotifications({ ...smsNotifications, marketAlerts: checked })}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveSettings} disabled={isLoading} className="ml-auto">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
