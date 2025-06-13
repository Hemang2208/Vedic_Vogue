"use client"

import { useState } from "react"
import { DollarSign, TrendingUp, CreditCard, Users, Download, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { VVCard } from "@/components/ui/vv-card"
import { VVButton } from "@/components/ui/vv-button"
import { VVBadge } from "@/components/ui/vv-badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock revenue data
const revenueStats = {
  totalRevenue: 2456780,
  monthlyRevenue: 234560,
  dailyRevenue: 8920,
  averageOrderValue: 450,
  totalOrders: 5460,
  monthlyOrders: 521,
  activeSubscriptions: 1247,
  churnRate: 3.2,
  revenueGrowth: 15.8,
  orderGrowth: 12.4,
}

// Mock monthly revenue data
const monthlyRevenueData = [
  { month: "Jan 2024", revenue: 234560, orders: 521, growth: 15.8 },
  { month: "Dec 2023", revenue: 202340, orders: 465, growth: 8.2 },
  { month: "Nov 2023", revenue: 187230, orders: 432, growth: 12.1 },
  { month: "Oct 2023", revenue: 167890, orders: 398, growth: 6.7 },
  { month: "Sep 2023", revenue: 157340, orders: 376, growth: 9.3 },
  { month: "Aug 2023", revenue: 143920, orders: 342, growth: 14.2 },
]

// Mock payment methods data
const paymentMethods = [
  { method: "UPI", percentage: 45.2, amount: 1110234, color: "bg-blue-500" },
  { method: "Credit Card", percentage: 28.7, amount: 704896, color: "bg-green-500" },
  { method: "Debit Card", percentage: 18.3, amount: 449590, color: "bg-orange-500" },
  { method: "Net Banking", percentage: 5.1, amount: 125346, color: "bg-purple-500" },
  { method: "Wallet", percentage: 2.7, amount: 66314, color: "bg-pink-500" },
]

// Mock recent transactions
const recentTransactions = [
  {
    id: "TXN001",
    orderId: "ORD789",
    customer: "Priya Sharma",
    amount: 450,
    method: "UPI",
    status: "Success",
    date: "2024-01-20 14:30",
    type: "subscription",
  },
  {
    id: "TXN002",
    orderId: "ORD790",
    customer: "Rahul Gupta",
    amount: 320,
    method: "Credit Card",
    status: "Success",
    date: "2024-01-20 13:45",
    type: "one-time",
  },
  {
    id: "TXN003",
    orderId: "ORD791",
    customer: "Anita Patel",
    amount: 680,
    method: "UPI",
    status: "Failed",
    date: "2024-01-20 12:15",
    type: "subscription",
  },
  {
    id: "TXN004",
    orderId: "ORD792",
    customer: "Vikram Singh",
    amount: 290,
    method: "Debit Card",
    status: "Pending",
    date: "2024-01-20 11:30",
    type: "one-time",
  },
]

export default function BillingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "success"
      case "failed":
        return "destructive"
      case "pending":
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
          <h1 className="text-2xl font-bold text-gray-900">Revenue Dashboard</h1>
          <p className="text-gray-600">Track revenue, payments, and financial performance</p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>

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

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{revenueStats.totalRevenue.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">+{revenueStats.revenueGrowth}%</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{revenueStats.monthlyRevenue.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">+{revenueStats.orderGrowth}%</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Order Value</p>
              <p className="text-2xl font-bold text-gray-900">₹{revenueStats.averageOrderValue}</p>
              <p className="text-sm text-gray-600">{revenueStats.monthlyOrders} orders this month</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
              <p className="text-2xl font-bold text-gray-900">{revenueStats.activeSubscriptions}</p>
              <div className="flex items-center mt-1">
                <ArrowDownRight className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-600">{revenueStats.churnRate}% churn</span>
              </div>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </VVCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <VVCard>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {monthlyRevenueData.map((data, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{data.month}</p>
                    <p className="text-sm text-gray-500">{data.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{data.revenue.toLocaleString()}</p>
                    <div className="flex items-center justify-end">
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">+{data.growth}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </VVCard>

        {/* Payment Methods */}
        <VVCard>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${method.color}`}></div>
                    <span className="font-medium text-gray-900">{method.method}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{method.percentage}%</p>
                    <p className="text-sm text-gray-500">₹{method.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </VVCard>
      </div>

      {/* Recent Transactions */}
      <VVCard>
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 font-medium text-gray-900">Transaction ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Customer</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Amount</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Method</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Type</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">{transaction.id}</div>
                      <div className="text-sm text-gray-500">{transaction.orderId}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">{transaction.customer}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">₹{transaction.amount}</div>
                  </td>
                  <td className="py-4 px-6">
                    <VVBadge variant="outline">{transaction.method}</VVBadge>
                  </td>
                  <td className="py-4 px-6">
                    <VVBadge variant={getStatusColor(transaction.status)}>{transaction.status}</VVBadge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-600">{transaction.date}</div>
                  </td>
                  <td className="py-4 px-6">
                    <VVBadge variant="secondary">{transaction.type}</VVBadge>
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
