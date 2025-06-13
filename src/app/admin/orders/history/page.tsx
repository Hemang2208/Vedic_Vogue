"use client"

import { useState } from "react"
import { Download, Filter, Search, Eye, FileText, FileSpreadsheet, FileImage } from "lucide-react"
import { VVCard } from "@/components/ui/vv-card"
import { VVButton } from "@/components/ui/vv-button"
import { VVInput } from "@/components/ui/vv-input"
import { VVBadge } from "@/components/ui/vv-badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Mock historical order data
const mockHistoricalOrders = [
  {
    id: "ORD-2024-001",
    customerName: "Priya Sharma",
    customerEmail: "priya@example.com",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-16",
    items: ["Rajma Rice", "Mixed Veg", "Roti"],
    total: 180,
    status: "delivered",
    paymentMethod: "UPI",
    subscriptionType: "Weekly Pro",
    rating: 4.5,
  },
  {
    id: "ORD-2024-002",
    customerName: "Rahul Kumar",
    customerEmail: "rahul@example.com",
    orderDate: "2024-01-14",
    deliveryDate: "2024-01-15",
    items: ["Chicken Curry", "Jeera Rice", "Salad"],
    total: 220,
    status: "delivered",
    paymentMethod: "Card",
    subscriptionType: "Daily Flex",
    rating: 5.0,
  },
  {
    id: "ORD-2024-003",
    customerName: "Anjali Patel",
    customerEmail: "anjali@example.com",
    orderDate: "2024-01-13",
    deliveryDate: "2024-01-14",
    items: ["Dal Tadka", "Chapati", "Achar"],
    total: 150,
    status: "cancelled",
    paymentMethod: "UPI",
    subscriptionType: "Monthly Basic",
    rating: null,
  },
]

export default function OrderHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "success"
      case "cancelled":
        return "destructive"
      case "refunded":
        return "warning"
      default:
        return "secondary"
    }
  }

  const ExportDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <VVButton variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export
        </VVButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FileText className="w-4 h-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FileImage className="w-4 h-4 mr-2" />
          Export as Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600">Complete log of all past orders</p>
        </div>
        <ExportDropdown />
      </div>

      {/* Filters */}
      <VVCard className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <VVInput
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger>
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>

          <VVButton variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </VVButton>
        </div>
      </VVCard>

      {/* Orders Table */}
      <VVCard>
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
                  Date & Status
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
              {mockHistoricalOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-500">{order.items.join(", ")}</div>
                      <VVBadge variant="outline" className="mt-1">
                        {order.subscriptionType}
                      </VVBadge>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">Ordered: {order.orderDate}</div>
                      <div className="text-sm text-gray-500">Delivered: {order.deliveryDate}</div>
                      <VVBadge variant={getStatusColor(order.status)} className="mt-1">
                        {order.status}
                      </VVBadge>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">₹{order.total}</div>
                    <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                    {order.rating && <div className="text-sm text-yellow-600">★ {order.rating}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Dialog>
                      <DialogTrigger asChild>
                        <VVButton variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </VVButton>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
                        </DialogHeader>
                        {selectedOrder && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium">Customer Information</h4>
                                <p className="text-sm text-gray-600">{selectedOrder.customerName}</p>
                                <p className="text-sm text-gray-600">{selectedOrder.customerEmail}</p>
                              </div>
                              <div>
                                <h4 className="font-medium">Order Information</h4>
                                <p className="text-sm text-gray-600">Order Date: {selectedOrder.orderDate}</p>
                                <p className="text-sm text-gray-600">Delivery Date: {selectedOrder.deliveryDate}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium">Items Ordered</h4>
                              <ul className="text-sm text-gray-600">
                                {selectedOrder.items.map((item: string, index: number) => (
                                  <li key={index}>• {item}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t">
                              <span className="font-medium">Total Amount</span>
                              <span className="text-lg font-bold">₹{selectedOrder.total}</span>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
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
