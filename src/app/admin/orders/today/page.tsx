"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Printer, Clock, MapPin, Phone, CheckCircle, AlertCircle, Package } from "lucide-react"
import { VVCard } from "@/components/ui/vv-card"
import { VVButton } from "@/components/ui/vv-button"
import { VVBadge } from "@/components/ui/vv-badge"

// Mock today's orders data
const todayOrders = [
  {
    id: "ORD-001",
    customer: "Priya Sharma",
    phone: "+91 98765 43210",
    meal: "Weekly Pro Plan",
    items: ["Dal Rice", "Sabzi", "Roti", "Salad"],
    deliveryTime: "11:30 AM",
    address: "Koramangala, Bangalore - 560034",
    area: "Koramangala",
    status: "preparing",
    specialInstructions: "Less spicy, no onions",
  },
  {
    id: "ORD-002",
    customer: "Rahul Kumar",
    phone: "+91 87654 32109",
    meal: "Office Light Lunch",
    items: ["Light Curry", "Rice", "Chapati"],
    deliveryTime: "12:00 PM",
    address: "Whitefield, Bangalore - 560066",
    area: "Whitefield",
    status: "ready",
    specialInstructions: "",
  },
  {
    id: "ORD-003",
    customer: "Anita Patel",
    phone: "+91 76543 21098",
    meal: "Fitness Special",
    items: ["Protein Bowl", "Quinoa", "Grilled Vegetables"],
    deliveryTime: "12:30 PM",
    address: "Indiranagar, Bangalore - 560038",
    area: "Indiranagar",
    status: "delivered",
    specialInstructions: "Extra protein",
  },
  {
    id: "ORD-004",
    customer: "Vikram Singh",
    phone: "+91 65432 10987",
    meal: "Traditional Thali",
    items: ["Dal", "Sabzi", "Rice", "Roti", "Pickle", "Sweet"],
    deliveryTime: "1:00 PM",
    address: "HSR Layout, Bangalore - 560102",
    area: "HSR Layout",
    status: "preparing",
    specialInstructions: "Gate code: 1234",
  },
]

const deliveryAreas = [
  { area: "Koramangala", orders: 12, completed: 8 },
  { area: "Whitefield", orders: 18, completed: 15 },
  { area: "Indiranagar", orders: 9, completed: 7 },
  { area: "HSR Layout", orders: 15, completed: 10 },
]

export default function TodayOrders() {
  const [selectedArea, setSelectedArea] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredOrders = todayOrders.filter((order) => {
    const matchesArea = selectedArea === "all" || order.area === selectedArea
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesArea && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "preparing":
        return <Package className="h-4 w-4" />
      case "ready":
        return <AlertCircle className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "warning"
      case "ready":
        return "default"
      case "delivered":
        return "success"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Today&apos;s Orders</h1>
          <p className="text-gray-600 mt-1">{todayOrders.length} orders scheduled for delivery today</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <VVButton variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print All
          </VVButton>
          <VVButton variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Sheet
          </VVButton>
        </div>
      </div>

      {/* Delivery Areas Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {deliveryAreas.map((area, index) => (
          <motion.div
            key={area.area}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <VVCard className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{area.area}</h3>
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{area.orders}</div>
              <div className="text-sm text-gray-600">
                {area.completed} completed, {area.orders - area.completed} pending
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(area.completed / area.orders) * 100}%` }}
                />
              </div>
            </VVCard>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <VVCard className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Areas</option>
            {deliveryAreas.map((area) => (
              <option key={area.area} value={area.area}>
                {area.area}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Status</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </VVCard>

      {/* Orders List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <VVCard className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <VVBadge variant={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </VVBadge>
                  </div>
                  <p className="text-sm text-gray-600">{order.meal}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {order.deliveryTime}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">{order.customer}</span>
                    <a href={`tel:${order.phone}`} className="text-blue-600 hover:text-blue-800">
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="flex items-start space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{order.address}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Items:</h4>
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item, idx) => (
                      <VVBadge key={idx} variant="outline">
                        {item}
                      </VVBadge>
                    ))}
                  </div>
                </div>

                {order.specialInstructions && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Special Instructions:</h4>
                    <p className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">{order.specialInstructions}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <VVButton variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </VVButton>
                <div className="flex space-x-2">
                  {order.status === "preparing" && (
                    <VVButton size="sm" variant="outline">
                      Mark Ready
                    </VVButton>
                  )}
                  {order.status === "ready" && <VVButton size="sm">Mark Delivered</VVButton>}
                  <VVButton variant="outline" size="sm">
                    <Printer className="h-4 w-4" />
                  </VVButton>
                </div>
              </div>
            </VVCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
