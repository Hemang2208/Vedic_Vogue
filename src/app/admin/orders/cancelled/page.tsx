"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, Download, AlertTriangle, Calendar, User, DollarSign, MessageSquare } from "lucide-react"
import { VVCard } from "@/components/ui/vv-card"
import { VVButton } from "@/components/ui/vv-button"
import { VVBadge } from "@/components/ui/vv-badge"
import { VVInput } from "@/components/ui/vv-input"

// Mock cancelled orders data
const cancelledOrders = [
  {
    id: "ORD-2024-015",
    customer: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 98765 43210",
    meal: "Weekly Pro Plan",
    orderDate: "2024-01-10",
    cancelDate: "2024-01-12",
    cancelledBy: "Customer",
    reason: "Change in schedule",
    refundAmount: 1200,
    refundStatus: "processed",
    originalAmount: 1200,
  },
  {
    id: "ORD-2024-018",
    customer: "Sunita Patel",
    email: "sunita@example.com",
    phone: "+91 87654 32109",
    meal: "Fitness Special",
    orderDate: "2024-01-08",
    cancelDate: "2024-01-11",
    cancelledBy: "Admin",
    reason: "Delivery area not serviceable",
    refundAmount: 2800,
    refundStatus: "pending",
    originalAmount: 2800,
  },
  {
    id: "ORD-2024-022",
    customer: "Amit Sharma",
    email: "amit@example.com",
    phone: "+91 76543 21098",
    meal: "Traditional Thali",
    orderDate: "2024-01-05",
    cancelDate: "2024-01-09",
    cancelledBy: "Customer",
    reason: "Food quality concerns",
    refundAmount: 950,
    refundStatus: "processed",
    originalAmount: 950,
  },
  {
    id: "ORD-2024-025",
    customer: "Neha Gupta",
    email: "neha@example.com",
    phone: "+91 65432 10987",
    meal: "Office Light Lunch",
    orderDate: "2024-01-03",
    cancelDate: "2024-01-07",
    cancelledBy: "Customer",
    reason: "Personal emergency",
    refundAmount: 180,
    refundStatus: "processed",
    originalAmount: 180,
  },
]

const cancellationReasons = [
  "Change in schedule",
  "Delivery area not serviceable",
  "Food quality concerns",
  "Personal emergency",
  "Payment issues",
  "Duplicate order",
  "Other",
]

export default function CancelledOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [reasonFilter, setReasonFilter] = useState("all")
  const [refundFilter, setRefundFilter] = useState("all")
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const filteredOrders = cancelledOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesReason = reasonFilter === "all" || order.reason === reasonFilter
    const matchesRefund = refundFilter === "all" || order.refundStatus === refundFilter
    return matchesSearch && matchesReason && matchesRefund
  })

  const totalRefunds = cancelledOrders.reduce((sum, order) => sum + order.refundAmount, 0)
  const pendingRefunds = cancelledOrders.filter((order) => order.refundStatus === "pending").length
  const processedRefunds = cancelledOrders.filter((order) => order.refundStatus === "processed").length

  const getRefundStatusColor = (status: string) => {
    switch (status) {
      case "processed":
        return "success"
      case "pending":
        return "warning"
      case "failed":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cancelled Orders</h1>
          <p className="text-gray-600 mt-1">Track and manage cancelled orders and refunds</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <VVButton variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </VVButton>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cancelled</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{cancelledOrders.length}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Refunds</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹{totalRefunds.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Refunds</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{pendingRefunds}</p>
            </div>
            <Calendar className="h-8 w-8 text-orange-600" />
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Processed Refunds</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{processedRefunds}</p>
            </div>
            <User className="h-8 w-8 text-blue-600" />
          </div>
        </VVCard>
      </div>

      {/* Filters */}
      <VVCard className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <VVInput
            placeholder="Search orders or customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // icon={<Search className="h-4 w-4" />}
          />
          <select
            value={reasonFilter}
            onChange={(e) => setReasonFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Reasons</option>
            {cancellationReasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
          <select
            value={refundFilter}
            onChange={(e) => setRefundFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Refund Status</option>
            <option value="pending">Pending</option>
            <option value="processed">Processed</option>
            <option value="failed">Failed</option>
          </select>
          <VVButton variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </VVButton>
        </div>
      </VVCard>

      {/* Orders Table */}
      <VVCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cancellation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Refund
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-500">{order.meal}</div>
                      <div className="text-xs text-gray-400">Ordered: {order.orderDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                      <div className="text-sm text-gray-500">{order.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">Cancelled: {order.cancelDate}</div>
                      <div className="text-sm text-gray-500">By: {order.cancelledBy}</div>
                      <div className="text-xs text-gray-400 mt-1">{order.reason}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">₹{order.refundAmount}</div>
                      <VVBadge variant={getRefundStatusColor(order.refundStatus)}>{order.refundStatus}</VVBadge>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <VVButton variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                        View Details
                      </VVButton>
                      {order.refundStatus === "pending" && <VVButton size="sm">Process Refund</VVButton>}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </VVCard>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Cancellation Details</h2>
                <VVButton variant="outline" size="sm" onClick={() => setSelectedOrder(null)}>
                  Close
                </VVButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Order ID:</span> {selectedOrder.id}
                    </div>
                    <div>
                      <span className="font-medium">Meal:</span> {selectedOrder.meal}
                    </div>
                    <div>
                      <span className="font-medium">Order Date:</span> {selectedOrder.orderDate}
                    </div>
                    <div>
                      <span className="font-medium">Original Amount:</span> ₹{selectedOrder.originalAmount}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Name:</span> {selectedOrder.customer}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {selectedOrder.email}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {selectedOrder.phone}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Cancellation Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Cancelled Date:</span> {selectedOrder.cancelDate}
                    </div>
                    <div>
                      <span className="font-medium">Cancelled By:</span> {selectedOrder.cancelledBy}
                    </div>
                    <div>
                      <span className="font-medium">Reason:</span> {selectedOrder.reason}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Refund Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Refund Amount:</span> ₹{selectedOrder.refundAmount}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <VVBadge variant={getRefundStatusColor(selectedOrder.refundStatus)} className="ml-2">
                        {selectedOrder.refundStatus}
                      </VVBadge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <VVButton variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Customer
                </VVButton>
                {selectedOrder.refundStatus === "pending" && <VVButton>Process Refund</VVButton>}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
