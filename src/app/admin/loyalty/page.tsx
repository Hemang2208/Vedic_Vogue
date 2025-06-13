"use client"

import { useState } from "react"
import { Star, Gift, TrendingUp, Users, Download, Plus, Edit, MoreHorizontal } from "lucide-react"
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

// Mock loyalty program data
const loyaltyPrograms = [
  {
    id: "LOY001",
    name: "VV Points",
    description: "Earn 1 point for every ₹10 spent",
    type: "Points",
    status: "Active",
    pointsPerRupee: 0.1,
    redemptionRate: 1, // 1 point = ₹1
    totalMembers: 1247,
    totalPointsIssued: 156780,
    totalPointsRedeemed: 89450,
    createdDate: "2023-12-01",
  },
  {
    id: "LOY002",
    name: "Meal Streak Bonus",
    description: "Extra points for consecutive orders",
    type: "Streak",
    status: "Active",
    bonusMultiplier: 2,
    streakThreshold: 7,
    totalMembers: 456,
    totalBonusPoints: 23400,
    averageStreak: 12,
    createdDate: "2024-01-01",
  },
  {
    id: "LOY003",
    name: "Birthday Special",
    description: "Special rewards on customer birthdays",
    type: "Event",
    status: "Active",
    rewardValue: 500,
    totalRedemptions: 89,
    totalValue: 44500,
    createdDate: "2023-11-15",
  },
]

// Mock loyalty statistics
const loyaltyStats = {
  totalMembers: 1247,
  activeMembers: 892,
  totalPointsCirculation: 67330,
  monthlyRedemptions: 234,
  averagePointsPerUser: 125,
  redemptionRate: 57.1,
  programROI: 145.6,
  customerRetention: 78.3,
}

// Mock recent activities
const recentActivities = [
  {
    id: "ACT001",
    user: "Priya Sharma",
    action: "Redeemed 200 points",
    value: "₹200 discount",
    date: "2024-01-20",
    type: "redemption",
  },
  {
    id: "ACT002",
    user: "Rahul Gupta",
    action: "Earned 150 points",
    value: "Order #ORD789",
    date: "2024-01-20",
    type: "earning",
  },
  {
    id: "ACT003",
    user: "Anita Patel",
    action: "Streak bonus earned",
    value: "50 bonus points",
    date: "2024-01-19",
    type: "bonus",
  },
]

export default function LoyaltyPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success"
      case "paused":
        return "warning"
      case "inactive":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "redemption":
        return "text-red-600"
      case "earning":
        return "text-green-600"
      case "bonus":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Loyalty Programs</h1>
          <p className="text-gray-600">Manage customer loyalty and rewards programs</p>
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
                New Program
              </VVButton>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Loyalty Program</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Program Name</Label>
                    <VVInput id="name" placeholder="Enter program name" />
                  </div>
                  <div>
                    <Label htmlFor="type">Program Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="points">Points Based</SelectItem>
                        <SelectItem value="streak">Streak Bonus</SelectItem>
                        <SelectItem value="event">Event Based</SelectItem>
                        <SelectItem value="tier">Tier System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Program description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pointsPerRupee">Points per ₹</Label>
                    <VVInput id="pointsPerRupee" type="number" step="0.1" placeholder="0.1" />
                  </div>
                  <div>
                    <Label htmlFor="redemptionRate">Redemption Rate</Label>
                    <VVInput id="redemptionRate" type="number" placeholder="1" />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <VVButton onClick={() => setShowCreateDialog(false)} variant="outline">
                    Cancel
                  </VVButton>
                  <VVButton onClick={() => setShowCreateDialog(false)}>Create Program</VVButton>
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
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{loyaltyStats.totalMembers}</p>
              <p className="text-sm text-green-600">{loyaltyStats.activeMembers} active</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Points in Circulation</p>
              <p className="text-2xl font-bold text-gray-900">{loyaltyStats.totalPointsCirculation.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Avg {loyaltyStats.averagePointsPerUser}/user</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Redemption Rate</p>
              <p className="text-2xl font-bold text-gray-900">{loyaltyStats.redemptionRate}%</p>
              <p className="text-sm text-gray-600">{loyaltyStats.monthlyRedemptions} this month</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Gift className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Program ROI</p>
              <p className="text-2xl font-bold text-gray-900">{loyaltyStats.programROI}%</p>
              <p className="text-sm text-green-600">+{loyaltyStats.customerRetention}% retention</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </VVCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Programs Table */}
        <VVCard>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Active Programs</h3>
          </div>
          <div className="p-6 space-y-4">
            {loyaltyPrograms.map((program) => (
              <div key={program.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{program.name}</h4>
                  <div className="flex items-center gap-2">
                    <VVBadge variant={getStatusColor(program.status)}>{program.status}</VVBadge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Program
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Analytics</DropdownMenuItem>
                        <DropdownMenuItem>Pause Program</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{program.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Members:</span>
                    <span className="ml-1 font-medium">{program.totalMembers?.toLocaleString() || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <span className="ml-1 font-medium">{program.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </VVCard>

        {/* Recent Activities */}
        <VVCard>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <p className={`text-sm ${getActivityColor(activity.type)}`}>{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.value}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </VVCard>
      </div>
    </div>
  )
}
