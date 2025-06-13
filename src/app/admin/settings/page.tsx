"use client"

import { useState } from "react"
import { Save, Settings, Clock, MapPin, Mail, Globe } from "lucide-react"
import { VVCard } from "@/components/ui/vv-card"
import { VVButton } from "@/components/ui/vv-button"
import { VVInput } from "@/components/ui/vv-input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    businessName: "VedicVogue Kitchen",
    businessEmail: "admin@vedicvogue.com",
    businessPhone: "+91 98765 43210",
    businessAddress: "123 Food Street, Bangalore, Karnataka 560001",
    website: "https://vedicvogue.com",
    timezone: "Asia/Kolkata",
    currency: "INR",
    taxRate: 18,
    deliveryRadius: 25,
    minOrderValue: 200,
    maxOrderValue: 2000,
    orderCancellationWindow: 30,
    refundProcessingDays: 7,
    loyaltyPointsRate: 0.1,
    referralBonus: 200,
    enableNotifications: true,
    enableSMS: true,
    enableEmail: true,
    enablePushNotifications: true,
    maintenanceMode: false,
    allowGuestOrders: false,
    autoAcceptOrders: true,
    requireOrderConfirmation: true,
  })

  const handleSave = () => {
    // Mock save functionality
    console.log("Settings saved:", settings)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">General Settings</h1>
          <p className="text-gray-600">Configure your platform settings and preferences</p>
        </div>

        <VVButton onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </VVButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Information */}
        <VVCard>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <VVInput
                id="businessName"
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="businessEmail">Business Email</Label>
              <VVInput
                id="businessEmail"
                type="email"
                value={settings.businessEmail}
                onChange={(e) => setSettings({ ...settings, businessEmail: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="businessPhone">Business Phone</Label>
              <VVInput
                id="businessPhone"
                value={settings.businessPhone}
                onChange={(e) => setSettings({ ...settings, businessPhone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="businessAddress">Business Address</Label>
              <Textarea
                id="businessAddress"
                value={settings.businessAddress}
                onChange={(e) => setSettings({ ...settings, businessAddress: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="website">Website URL</Label>
              <VVInput
                id="website"
                value={settings.website}
                onChange={(e) => setSettings({ ...settings, website: e.target.value })}
              />
            </div>
          </div>
        </VVCard>

        {/* Regional Settings */}
        <VVCard>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Regional Settings</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={settings.timezone}
                onValueChange={(value) => setSettings({ ...settings, timezone: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                  <SelectItem value="Asia/Mumbai">Asia/Mumbai (IST)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={settings.currency}
                onValueChange={(value) => setSettings({ ...settings, currency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <VVInput
                id="taxRate"
                type="number"
                value={settings.taxRate}
                onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="deliveryRadius">Delivery Radius (km)</Label>
              <VVInput
                id="deliveryRadius"
                type="number"
                value={settings.deliveryRadius}
                onChange={(e) => setSettings({ ...settings, deliveryRadius: Number(e.target.value) })}
              />
            </div>
          </div>
        </VVCard>

        {/* Order Settings */}
        <VVCard>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Order Settings</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <Label htmlFor="minOrderValue">Minimum Order Value (₹)</Label>
              <VVInput
                id="minOrderValue"
                type="number"
                value={settings.minOrderValue}
                onChange={(e) => setSettings({ ...settings, minOrderValue: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="maxOrderValue">Maximum Order Value (₹)</Label>
              <VVInput
                id="maxOrderValue"
                type="number"
                value={settings.maxOrderValue}
                onChange={(e) => setSettings({ ...settings, maxOrderValue: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="orderCancellationWindow">Order Cancellation Window (minutes)</Label>
              <VVInput
                id="orderCancellationWindow"
                type="number"
                value={settings.orderCancellationWindow}
                onChange={(e) => setSettings({ ...settings, orderCancellationWindow: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="refundProcessingDays">Refund Processing Days</Label>
              <VVInput
                id="refundProcessingDays"
                type="number"
                value={settings.refundProcessingDays}
                onChange={(e) => setSettings({ ...settings, refundProcessingDays: Number(e.target.value) })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="allowGuestOrders">Allow Guest Orders</Label>
              <Switch
                id="allowGuestOrders"
                checked={settings.allowGuestOrders}
                onCheckedChange={(checked) => setSettings({ ...settings, allowGuestOrders: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="autoAcceptOrders">Auto Accept Orders</Label>
              <Switch
                id="autoAcceptOrders"
                checked={settings.autoAcceptOrders}
                onCheckedChange={(checked) => setSettings({ ...settings, autoAcceptOrders: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="requireOrderConfirmation">Require Order Confirmation</Label>
              <Switch
                id="requireOrderConfirmation"
                checked={settings.requireOrderConfirmation}
                onCheckedChange={(checked) => setSettings({ ...settings, requireOrderConfirmation: checked })}
              />
            </div>
          </div>
        </VVCard>

        {/* Loyalty & Rewards */}
        <VVCard>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Loyalty & Rewards</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <Label htmlFor="loyaltyPointsRate">Loyalty Points Rate (points per ₹)</Label>
              <VVInput
                id="loyaltyPointsRate"
                type="number"
                step="0.01"
                value={settings.loyaltyPointsRate}
                onChange={(e) => setSettings({ ...settings, loyaltyPointsRate: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="referralBonus">Referral Bonus (₹)</Label>
              <VVInput
                id="referralBonus"
                type="number"
                value={settings.referralBonus}
                onChange={(e) => setSettings({ ...settings, referralBonus: Number(e.target.value) })}
              />
            </div>
          </div>
        </VVCard>

        {/* Notification Settings */}
        <VVCard>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enableNotifications">Enable Notifications</Label>
              <Switch
                id="enableNotifications"
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, enableNotifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enableSMS">Enable SMS Notifications</Label>
              <Switch
                id="enableSMS"
                checked={settings.enableSMS}
                onCheckedChange={(checked) => setSettings({ ...settings, enableSMS: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enableEmail">Enable Email Notifications</Label>
              <Switch
                id="enableEmail"
                checked={settings.enableEmail}
                onCheckedChange={(checked) => setSettings({ ...settings, enableEmail: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enablePushNotifications">Enable Push Notifications</Label>
              <Switch
                id="enablePushNotifications"
                checked={settings.enablePushNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, enablePushNotifications: checked })}
              />
            </div>
          </div>
        </VVCard>

        {/* System Settings */}
        <VVCard>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">System Settings</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                <p className="text-sm text-gray-500">Temporarily disable the platform for maintenance</p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              />
            </div>
          </div>
        </VVCard>
      </div>
    </div>
  )
}
