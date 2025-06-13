"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Copy, Percent, Gift, Calendar, Download, MoreHorizontal } from "lucide-react"
import { VVCard } from "@/components/ui/vv-card"
import { VVButton } from "@/components/ui/vv-button"
import { VVInput } from "@/components/ui/vv-input"
import { VVBadge } from "@/components/ui/vv-badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock discount data
const mockDiscounts = [
  {
    id: "DISC001",
    code: "NEWYEAR2024",
    name: "New Year Special",
    description: "Special discount for New Year celebration",
    type: "Percentage",
    value: 25,
    minOrderValue: 500,
    maxDiscount: 200,
    usageLimit: 1000,
    usedCount: 234,
    status: "Active",
    validFrom: "2024-01-01",
    validUntil: "2024-01-31",
    applicableFor: "All Users",
    createdBy: "Admin",
    createdDate: "2023-12-28",
  },
  {
    id: "DISC002",
    code: "FIRST50",
    name: "First Order Discount",
    description: "Flat ₹50 off on first order",
    type: "Fixed",
    value: 50,
    minOrderValue: 200,
    maxDiscount: 50,
    usageLimit: null,
    usedCount: 567,
    status: "Active",
    validFrom: "2023-12-01",
    validUntil: "2024-12-31",
    applicableFor: "New Users",
    createdBy: "Marketing Team",
    createdDate: "2023-11-28",
  },
  {
    id: "DISC003",
    code: "LOYALTY15",
    name: "Loyalty Reward",
    description: "15% off for loyal customers",
    type: "Percentage",
    value: 15,
    minOrderValue: 300,
    maxDiscount: 150,
    usageLimit: 500,
    usedCount: 89,
    status: "Active",
    validFrom: "2024-01-01",
    validUntil: "2024-03-31",
    applicableFor: "Premium Users",
    createdBy: "Admin",
    createdDate: "2023-12-15",
  },
  {
    id: "DISC004",
    code: "WEEKEND20",
    name: "Weekend Special",
    description: "Weekend orders get 20% off",
    type: "Percentage",
    value: 20,
    minOrderValue: 400,
    maxDiscount: 100,
    usageLimit: 200,
    usedCount: 156,
    status: "Paused",
    validFrom: "2024-01-06",
    validUntil: "2024-02-29",
    applicableFor: "All Users",
    createdBy: "Admin",
    createdDate: "2024-01-05",
  },
]

// Mock discount statistics
const discountStats = {
  totalDiscounts: 12,
  activeDiscounts: 8,
  totalRedemptions: 1046,
  totalSavings: 45600,
  averageDiscount: 43.6,
  conversionRate: 67.8,
}

export default function DiscountsPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setSelectedDiscount] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success"
      case "paused":
        return "warning"
      case "expired":
        return "destructive"
      default:
        return "secondary"
    }
  }

  // const getTypeColor = (type: string) => {
  //   switch (type.toLowerCase()) {
  //     case "percentage":
  //       return "blue"
  //     case "fixed":
  //       return "green"
  //     case "bogo":
  //       return "purple"
  //     default:
  //       return "gray"
  //   }
  // }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discounts & Coupons</h1>
          <p className="text-gray-600">Manage promotional codes and discount campaigns</p>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <VVButton variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </VVButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <VVButton>
                <Plus className="h-4 w-4 mr-2" />
                Create Discount
              </VVButton>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create New Discount</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="code">Discount Code</Label>
                    <VVInput id="code" placeholder="Enter discount code" />
                  </div>
                  <div>
                    <Label htmlFor="name">Display Name</Label>
                    <VVInput id="name" placeholder="Enter display name" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Discount description" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="type">Discount Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                        <SelectItem value="bogo">Buy One Get One</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="value">Discount Value</Label>
                    <VVInput id="value" type="number" placeholder="Enter value" />
                  </div>
                  <div>
                    <Label htmlFor="maxDiscount">Max Discount (₹)</Label>
                    <VVInput id="maxDiscount" type="number" placeholder="Enter max amount" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="minOrder">Min Order Value (₹)</Label>
                    <VVInput id="minOrder" type="number" placeholder="Enter minimum" />
                  </div>
                  <div>
                    <Label htmlFor="usageLimit">Usage Limit</Label>
                    <VVInput id="usageLimit" type="number" placeholder="Enter limit" />
                  </div>
                  <div>
                    <Label htmlFor="applicableFor">Applicable For</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select users" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="new">New Users</SelectItem>
                        <SelectItem value="premium">Premium Users</SelectItem>
                        <SelectItem value="inactive">Inactive Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="validFrom">Valid From</Label>
                    <VVInput id="validFrom" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="validUntil">Valid Until</Label>
                    <VVInput id="validUntil" type="date" />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <VVButton onClick={() => setShowCreateDialog(false)} variant="outline">
                    Cancel
                  </VVButton>
                  <VVButton onClick={() => setShowCreateDialog(false)}>Create Discount</VVButton>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Discounts</p>
              <p className="text-2xl font-bold text-gray-900">{discountStats.totalDiscounts}</p>
              <p className="text-sm text-green-600">{discountStats.activeDiscounts} active</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Percent className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Redemptions</p>
              <p className="text-2xl font-bold text-gray-900">{discountStats.totalRedemptions}</p>
              <p className="text-sm text-gray-600">{discountStats.conversionRate}% conversion</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Gift className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Savings</p>
              <p className="text-2xl font-bold text-gray-900">₹{discountStats.totalSavings.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Customer savings</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Gift className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Discount</p>
              <p className="text-2xl font-bold text-gray-900">₹{discountStats.averageDiscount}</p>
              <p className="text-sm text-gray-600">Per redemption</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Percent className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </VVCard>
      </div>

      {/* Discounts Table */}
      <VVCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 font-medium text-gray-900">Discount</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Code</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Type & Value</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Usage</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Validity</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockDiscounts.map((discount) => (
                <tr key={discount.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">{discount.name}</div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">{discount.description}</div>
                      <div className="text-xs text-gray-400 mt-1">For: {discount.applicableFor}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{discount.code}</code>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <VVBadge variant="outline">{discount.type}</VVBadge>
                      <div className="mt-1">
                        {discount.type === "Percentage" ? `${discount.value}%` : `₹${discount.value}`}
                        {discount.maxDiscount && <div className="text-gray-500">Max: ₹{discount.maxDiscount}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <div>{discount.usedCount} used</div>
                      {discount.usageLimit && <div className="text-gray-500">of {discount.usageLimit}</div>}
                      <div className="text-gray-500">Min: ₹{discount.minOrderValue}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <VVBadge variant={getStatusColor(discount.status)}>{discount.status}</VVBadge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <div>{discount.validFrom}</div>
                      <div className="text-gray-500">to {discount.validUntil}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSelectedDiscount(discount)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="h-4 w-4 mr-2" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </VVCard>
    </div>
  )
}
