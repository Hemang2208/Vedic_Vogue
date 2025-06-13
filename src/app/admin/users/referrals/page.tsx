"use client"

import { useState } from "react"
import { Search, Download, MoreHorizontal, Eye, Gift, TrendingUp } from "lucide-react"
import { VVCard } from "@/components/ui/vv-card"
import { VVButton } from "@/components/ui/vv-button"
import { VVInput } from "@/components/ui/vv-input"
import { VVBadge } from "@/components/ui/vv-badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock referral data
const mockReferrals = [
  {
    id: "REF001",
    referrerName: "Priya Sharma",
    referrerEmail: "priya.sharma@email.com",
    referredName: "Amit Kumar",
    referredEmail: "amit.kumar@email.com",
    referralDate: "2024-01-18",
    status: "Completed",
    bonusEarned: 200,
    referredOrderValue: 1500,
    referralCode: "PRIYA2024",
  },
  {
    id: "REF002",
    referrerName: "Rahul Gupta",
    referrerEmail: "rahul.gupta@email.com",
    referredName: "Neha Singh",
    referredEmail: "neha.singh@email.com",
    referralDate: "2024-01-17",
    status: "Pending",
    bonusEarned: 0,
    referredOrderValue: 0,
    referralCode: "RAHUL2024",
  },
  {
    id: "REF003",
    referrerName: "Anita Patel",
    referrerEmail: "anita.patel@email.com",
    referredName: "Suresh Reddy",
    referredEmail: "suresh.reddy@email.com",
    referralDate: "2024-01-15",
    status: "Completed",
    bonusEarned: 200,
    referredOrderValue: 2100,
    referralCode: "ANITA2024",
  },
  {
    id: "REF004",
    referrerName: "Vikram Singh",
    referrerEmail: "vikram.singh@email.com",
    referredName: "Pooja Jain",
    referredEmail: "pooja.jain@email.com",
    referralDate: "2024-01-14",
    status: "Expired",
    bonusEarned: 0,
    referredOrderValue: 0,
    referralCode: "VIKRAM2024",
  },
]

// Mock referral stats
const referralStats = {
  totalReferrals: 156,
  completedReferrals: 89,
  pendingReferrals: 34,
  totalBonusPaid: 17800,
  averageOrderValue: 1650,
  conversionRate: 57.1,
}

export default function UserReferralsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredReferrals = mockReferrals.filter(
    (referral) =>
      referral.referrerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.referredName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.referralCode.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "success"
      case "pending":
        return "warning"
      case "expired":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Referrals</h1>
          <p className="text-gray-600">Track referral activity and bonus earnings</p>
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
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Referrals</p>
              <p className="text-2xl font-bold text-gray-900">{referralStats.totalReferrals}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{referralStats.completedReferrals}</p>
              <p className="text-sm text-green-600">{referralStats.conversionRate}% conversion</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Gift className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bonus Paid</p>
              <p className="text-2xl font-bold text-gray-900">₹{referralStats.totalBonusPaid.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Gift className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </VVCard>
      </div>

      {/* Search */}
      <VVCard className="p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <VVInput
            placeholder="Search referrals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </VVCard>

      {/* Referrals Table */}
      <VVCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 font-medium text-gray-900">Referrer</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Referred User</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Code</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Bonus</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReferrals.map((referral) => (
                <tr key={referral.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">{referral.referrerName}</div>
                      <div className="text-sm text-gray-500">{referral.referrerEmail}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">{referral.referredName}</div>
                      <div className="text-sm text-gray-500">{referral.referredEmail}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <VVBadge variant="outline">{referral.referralCode}</VVBadge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-600">{referral.referralDate}</div>
                  </td>
                  <td className="py-4 px-6">
                    <VVBadge variant={getStatusColor(referral.status)}>{referral.status}</VVBadge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <div className="font-medium">₹{referral.bonusEarned}</div>
                      {referral.referredOrderValue > 0 && (
                        <div className="text-gray-500">Order: ₹{referral.referredOrderValue}</div>
                      )}
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
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Gift className="h-4 w-4 mr-2" />
                          Process Bonus
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
