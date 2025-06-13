"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { VVCard } from "@/components/ui/vv-card";
import { VVButton } from "@/components/ui/vv-button";
import { VVBadge } from "@/components/ui/vv-badge";

const upcomingOrders = [
  {
    date: "2024-01-16",
    dayName: "Tomorrow",
    orders: [
      {
        id: "ORD-005",
        customer: "Meera Reddy",
        meal: "Weekly Pro Plan",
        time: "12:00 PM",
        area: "Koramangala",
        plan: "Weekly",
      },
      {
        id: "ORD-006",
        customer: "Arjun Nair",
        meal: "Fitness Special",
        time: "1:00 PM",
        area: "Whitefield",
        plan: "Monthly",
      },
    ],
  },
  {
    date: "2024-01-17",
    dayName: "Wednesday",
    orders: [
      {
        id: "ORD-007",
        customer: "Kavya Iyer",
        meal: "Traditional Thali",
        time: "11:30 AM",
        area: "Indiranagar",
        plan: "Weekly",
      },
    ],
  },
  {
    date: "2024-01-18",
    dayName: "Thursday",
    orders: [
      {
        id: "ORD-008",
        customer: "Rohan Gupta",
        meal: "Office Light Lunch",
        time: "12:30 PM",
        area: "HSR Layout",
        plan: "Daily",
      },
      {
        id: "ORD-009",
        customer: "Sneha Joshi",
        meal: "Diet Special",
        time: "1:30 PM",
        area: "Koramangala",
        plan: "Monthly",
      },
    ],
  },
];

const areas = ["Koramangala", "Whitefield", "Indiranagar", "HSR Layout"];

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function UpcomingOrders() {
  const [selectedDate, setSelectedDate] = useState("2024-01-16");
  const [selectedArea, setSelectedArea] = useState("all");
  const [currentWeek, setCurrentWeek] = useState(1);

  const handleNextWeek = () => setCurrentWeek((prev) => prev + 1);
  const handlePrevWeek = () =>
    setCurrentWeek((prev) => (prev > 1 ? prev - 1 : 1));

  const selectedDay = upcomingOrders.find((day) => day.date === selectedDate);
  const selectedDayOrders = selectedDay?.orders || [];
  const filteredOrders = selectedDayOrders.filter(
    (order) => selectedArea === "all" || order.area === selectedArea
  );

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Weekly":
        return "default";
      case "Monthly":
        return "success";
      case "Daily":
        return "warning";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upcoming Orders</h1>
          <p className="text-gray-600 mt-1">
            Week {currentWeek} | Day:{" "}
            {weekDays[new Date(selectedDate).getDay()]}
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <VVButton variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </VVButton>
          <VVButton size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Bulk
          </VVButton>
        </div>
      </div>

      {/* Calendar Navigation */}
      <VVCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Select Date</h3>
          <div className="flex items-center space-x-2">
            <VVButton variant="outline" size="sm" onClick={handlePrevWeek}>
              <ChevronLeft className="h-4 w-4" />
            </VVButton>
            <span className="text-sm font-medium">Week {currentWeek}</span>
            <VVButton variant="outline" size="sm" onClick={handleNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </VVButton>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {upcomingOrders.map((day, index) => {
            const isSelected = day.date === selectedDate;
            return (
              <motion.button
                key={day.date}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDate(day.date)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {day.dayName} ({weekDays[index % 7]})
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(day.date).getDate()}
                  </div>
                  {day.orders.length > 0 && (
                    <VVBadge variant="outline" className="mt-2">
                      {day.orders.length} orders
                    </VVBadge>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </VVCard>

      {/* Area Filter */}
      <VVCard className="p-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">
            Filter by area:
          </span>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Areas</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
      </VVCard>

      {/* Selected Day Orders */}
      <VVCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Orders for {selectedDay?.dayName} (
            {new Date(selectedDate).toLocaleDateString()})
          </h3>
          <VVBadge variant="outline">
            <Users className="h-4 w-4 mr-1" />
            {filteredOrders.length} orders
          </VVBadge>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders scheduled
            </h3>
            <p className="text-gray-600">
              No orders found for the selected date and filters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={`${order.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-medium text-gray-900">
                      {order.id}
                    </span>
                    <VVBadge variant={getPlanColor(order.plan)}>
                      {order.plan}
                    </VVBadge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{order.customer}</span>
                      <span>{order.meal}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {order.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {order.area}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <VVButton variant="outline" size="sm">
                    Edit
                  </VVButton>
                  <VVButton variant="outline" size="sm">
                    Reschedule
                  </VVButton>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </VVCard>
    </div>
  );
}
