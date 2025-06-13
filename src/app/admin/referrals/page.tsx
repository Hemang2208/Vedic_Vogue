"use client"

import { useState } from "react"
import { TrendingUp, Users, Gift, DollarSign, Download, Plus, Edit } from "lucide-react"
import { VVCard } from "@/components/ui/vv-card"
import { VVButton } from "@/components/ui/vv-button"
import { VVInput } from "@/components/ui/vv-input"
import { VVBadge } from "@/components/ui/vv-badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock referral campaign data
const referralCampaigns = [
  {
    id: "CAMP001",
    name: "New Year Special",
    description: "Double referral bonus for January",
    bonusAmount: 400,
    referrerBonus: 200,
    referredBonus: 200,
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    totalReferrals: 45,
    successfulReferrals: 28,
    totalPayout: 11200,
  },
  {
    id: "CAMP002",
    name: "Friend & Family",
    description: "Standard referral program",
    bonusAmount: 200,
    referrerBonus: 150,
    referredBonus: 50,
    status: "Active",
    startDate: "2023-12-01",
    endDate: "2024-12-31",
    totalReferrals: 234,
    successfulReferrals: 156,
    totalPayout: 31200,
  },
  {
    id: "CAMP003",
    name: "Holiday Boost",
    description: "Festival season referral campaign",
    bonusAmount: 300,
    referrerBonus: 200,
    referredBonus: 100,
    status: "Completed",
    startDate: "2023-10-01",
    endDate: "2023-11-30",
    totalReferrals: 89,
    successfulReferrals: 67,
    totalPayout: 20100,
  },
]

// Mock performance metrics
const performanceMetrics = {
  totalCampaigns: 8,
  activeCampaigns: 2,
  totalReferrals: 1247,
  successfulReferrals: 789,
  conversionRate: 63.3,
  totalPayout: 157800,
  averageOrderValue: 1850,
  monthlyGrowth: 12.5,
}

export default function ReferralsPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success"
      case "completed":
        return "secondary"
      case "paused":
        return "warning"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Referral Marketing</h1>
          <p className="text-gray-600">Manage referral campaigns and track performance</p>
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
                New Campaign
              </VVButton>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Referral Campaign</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Campaign Name</Label>
                    <VVInput id="name" placeholder="Enter campaign name" />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <VVInput id="status" placeholder="Active" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Campaign description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="referrerBonus">Referrer Bonus (₹)</Label>
                    <VVInput id="referrerBonus" type="number" placeholder="200" />
                  </div>
                  <div>
                    <Label htmlFor="referredBonus">Referred Bonus (₹)</Label>
                    <VVInput id="referredBonus" type="number" placeholder="100" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <VVInput id="startDate" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <VVInput id="endDate" type="date" />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <VVButton onClick={() => setShowCreateDialog(false)} variant="outline">
                    Cancel
                  </VVButton>
                  <VVButton onClick={() => setShowCreateDialog(false)}>Create Campaign</VVButton>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Referrals</p>
              <p className="text-2xl font-bold text-gray-900">{performanceMetrics.totalReferrals}</p>
              <p className="text-sm text-green-600">+{performanceMetrics.monthlyGrowth}% this month</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{performanceMetrics.conversionRate}%</p>
              <p className="text-sm text-gray-600">{performanceMetrics.successfulReferrals} successful</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Payout</p>
              <p className="text-2xl font-bold text-gray-900">₹{performanceMetrics.totalPayout.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Across all campaigns</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{performanceMetrics.activeCampaigns}</p>
              <p className="text-sm text-gray-600">of {performanceMetrics.totalCampaigns} total</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Gift className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </VVCard>
      </div>

      {/* Campaigns Table */}
      <VVCard>
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Referral Campaigns</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 font-medium text-gray-900">Campaign</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Bonus Structure</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Performance</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Duration</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {referralCampaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">{campaign.description}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <VVBadge variant={getStatusColor(campaign.status)}>{campaign.status}</VVBadge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <div>Referrer: ₹{campaign.referrerBonus}</div>
                      <div>Referred: ₹{campaign.referredBonus}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <div>
                        {campaign.successfulReferrals}/{campaign.totalReferrals} successful
                      </div>
                      <div className="text-gray-500">₹{campaign.totalPayout.toLocaleString()} paid</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <div>{campaign.startDate}</div>
                      <div className="text-gray-500">to {campaign.endDate}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <VVButton variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </VVButton>
                      <VVButton variant="outline" size="sm">
                        View
                      </VVButton>
                    </div>
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
