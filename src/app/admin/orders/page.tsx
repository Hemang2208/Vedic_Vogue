"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, Download, Eye, MoreHorizontal, Calendar, Clock, MapPin } from "lucide-react"
import { VVCard } from "@/components/ui/vv-card"
import { VVButton } from "@/components/ui/vv-button"
import { VVBadge } from "@/components/ui/vv-badge"
import { VVInput } from "@/components/ui/vv-input"

// Mock orders data
const mockOrders = [
  {
    id: "ORD-2024-001",
    customer: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 43210",
    meal: "Weekly Pro Plan",
    plan: "Weekly",
    deliveryDate: "2024-01-15",
    deliveryTime: "12:30 PM",
    address: "Koramangala, Bangalore",
    status: "delivered",
    amount: 1200,
    orderDate: "2024-01-10",
    items: ["Dal Rice", "Sabzi", "Roti", "Salad"],
  },
  {
    id: "ORD-2024-002",
    customer: "Rahul Kumar",
    email: "rahul@example.com",
    phone: "+91 87654 32109",
    meal: "Office Light Lunch",
    plan: "Daily",
    deliveryDate: "2024-01-15",
    deliveryTime: "1:00 PM",
    address: "Whitefield, Bangalore",
    status: "preparing",
    amount: 180,
    orderDate: "2024-01-15",
    items: ["Light Curry", "Rice", "Chapati"],
  },
  {
    id: "ORD-2024-003",
    customer: "Anita Patel",
    email: "anita@example.com",
    phone: "+91 76543 21098",
    meal: "Fitness Special",
    plan: "Monthly",
    deliveryDate: "2024-01-15",
    deliveryTime: "11:30 AM",
    address: "Indiranagar, Bangalore",
    status: "pending",
    amount: 2800,
    orderDate: "2024-01-12",
    items: ["Protein Bowl", "Quinoa", "Grilled Vegetables"],
  },
  {
    id: "ORD-2024-004",
    customer: "Vikram Singh",
    email: "vikram@example.com",
    phone: "+91 65432 10987",
    meal: "Traditional Thali",
    plan: "Weekly",
    deliveryDate: "2024-01-15",
    deliveryTime: "12:00 PM",
    address: "HSR Layout, Bangalore",
    status: "cancelled",
    amount: 950,
    orderDate: "2024-01-13",
    items: ["Dal", "Sabzi", "Rice", "Roti", "Pickle", "Sweet"],
  },
]

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "success"
      case "preparing":
        return "warning"
      case "pending":
        return "default"
      case "cancelled":
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
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-1">Manage all customer orders and deliveries</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <VVButton variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </VVButton>
          <VVButton size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Delivery
          </VVButton>
        </div>
      </div>

      {/* Filters */}
      <VVCard className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <VVInput
              placeholder="Search orders, customers, or order IDs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              // icon={<Search className="h-4 w-4" />}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <VVButton variant="outline" size="sm">
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
                  Delivery
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
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
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      {order.deliveryDate}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      {order.deliveryTime}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {order.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <VVBadge variant={getStatusColor(order.status)}>{order.status}</VVBadge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <VVButton variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                        <Eye className="h-4 w-4" />
                      </VVButton>
                      <VVButton variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </VVButton>
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
                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
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
                      <span className="font-medium">Meal Plan:</span> {selectedOrder.meal}
                    </div>
                    <div>
                      <span className="font-medium">Plan Type:</span> {selectedOrder.plan}
                    </div>
                    <div>
                      <span className="font-medium">Order Date:</span> {selectedOrder.orderDate}
                    </div>
                    <div>
                      <span className="font-medium">Amount:</span> ₹{selectedOrder.amount}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <VVBadge variant={getStatusColor(selectedOrder.status)} className="ml-2">
                        {selectedOrder.status}
                      </VVBadge>
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
                    <div>
                      <span className="font-medium">Address:</span> {selectedOrder.address}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Delivery Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Date:</span> {selectedOrder.deliveryDate}
                    </div>
                    <div>
                      <span className="font-medium">Time:</span> {selectedOrder.deliveryTime}
                    </div>
                    <div>
                      <span className="font-medium">Address:</span> {selectedOrder.address}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Items</h3>
                  <div className="space-y-1">
                    {selectedOrder.items.map((item: string, index: number) => (
                      <div key={index} className="text-sm text-gray-600">
                        • {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <VVButton variant="outline">Update Status</VVButton>
                <VVButton variant="outline">Contact Customer</VVButton>
                <VVButton>Print Receipt</VVButton>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
