"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Filter,
  Download,
  Eye,
  Pause,
  Play,
  X,
  Calendar,
  User,
  CreditCard,
} from "lucide-react";
import { VVCard } from "@/components/ui/vv-card";
import { VVButton } from "@/components/ui/vv-button";
import { VVBadge } from "@/components/ui/vv-badge";
import { VVInput } from "@/components/ui/vv-input";

// Mock subscriptions data
const mockSubscriptions = [
  {
    id: "SUB-2024-001",
    customer: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 43210",
    plan: "Weekly Pro Plan",
    planType: "Weekly",
    status: "active",
    startDate: "2024-01-01",
    nextDelivery: "2024-01-16",
    amount: 1200,
    frequency: "Weekly",
    deliveryDays: ["Monday", "Wednesday", "Friday"],
    preferences: ["Vegetarian", "Less Spicy"],
    address: "Koramangala, Bangalore",
  },
  {
    id: "SUB-2024-002",
    customer: "Rahul Kumar",
    email: "rahul@example.com",
    phone: "+91 87654 32109",
    plan: "Monthly Fitness Special",
    planType: "Monthly",
    status: "active",
    startDate: "2024-01-05",
    nextDelivery: "2024-01-17",
    amount: 2800,
    frequency: "Daily",
    deliveryDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    preferences: ["High Protein", "Low Carb"],
    address: "Whitefield, Bangalore",
  },
  {
    id: "SUB-2024-003",
    customer: "Anita Patel",
    email: "anita@example.com",
    phone: "+91 76543 21098",
    plan: "Traditional Thali",
    planType: "Weekly",
    status: "paused",
    startDate: "2023-12-15",
    nextDelivery: "2024-01-20",
    amount: 950,
    frequency: "Weekly",
    deliveryDays: ["Tuesday", "Thursday", "Saturday"],
    preferences: ["Traditional", "Medium Spicy"],
    address: "Indiranagar, Bangalore",
  },
  {
    id: "SUB-2024-004",
    customer: "Vikram Singh",
    email: "vikram@example.com",
    phone: "+91 65432 10987",
    plan: "Office Light Lunch",
    planType: "Daily",
    status: "cancelled",
    startDate: "2024-01-08",
    nextDelivery: null,
    amount: 180,
    frequency: "Daily",
    deliveryDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    preferences: ["Light", "Office Friendly"],
    address: "HSR Layout, Bangalore",
  },
];

export default function AdminSubscriptions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);

  const filteredSubscriptions = mockSubscriptions.filter((sub) => {
    const matchesSearch =
      sub.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    const matchesPlan = planFilter === "all" || sub.planType === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const activeSubscriptions = mockSubscriptions.filter(
    (sub) => sub.status === "active"
  ).length;
  const pausedSubscriptions = mockSubscriptions.filter(
    (sub) => sub.status === "paused"
  ).length;
  const totalRevenue = mockSubscriptions
    .filter((sub) => sub.status === "active")
    .reduce((sum, sub) => sum + sub.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "paused":
        return "warning";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  const handleStatusChange = (subscriptionId: string, newStatus: string) => {
    // Mock status change - in real app, this would call an API
    console.log(`Changing subscription ${subscriptionId} to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Subscription Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage all customer subscriptions and plans
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <VVButton variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </VVButton>
          <VVButton size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Bulk Actions
          </VVButton>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Subscriptions
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {activeSubscriptions}
              </p>
            </div>
            <User className="h-8 w-8 text-green-600" />
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Paused Subscriptions
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {pausedSubscriptions}
              </p>
            </div>
            <Pause className="h-8 w-8 text-orange-600" />
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Monthly Revenue
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{totalRevenue.toLocaleString()}
              </p>
            </div>
            <CreditCard className="h-8 w-8 text-blue-600" />
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg. Plan Value
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{Math.round(totalRevenue / activeSubscriptions)}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
        </VVCard>
      </div>

      {/* Filters */}
      <VVCard className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <VVInput
            placeholder="Search subscriptions or customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // icon={<Search className="h-4 w-4" />}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">All Plans</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Daily">Daily</option>
          </select>
          <VVButton variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </VVButton>
        </div>
      </VVCard>

      {/* Subscriptions Table */}
      <VVCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Delivery
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscriptions.map((subscription, index) => (
                <motion.tr
                  key={subscription.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {subscription.id}
                      </div>
                      <div className="text-sm text-gray-500">
                        {subscription.plan}
                      </div>
                      <div className="text-xs text-gray-400">
                        Since: {subscription.startDate}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {subscription.customer}
                      </div>
                      <div className="text-sm text-gray-500">
                        {subscription.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {subscription.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        ₹{subscription.amount}
                      </div>
                      <div className="text-sm text-gray-500">
                        {subscription.frequency}
                      </div>
                      <div className="text-xs text-gray-400">
                        {subscription.deliveryDays.length} days/week
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <VVBadge variant={getStatusColor(subscription.status)}>
                      {subscription.status}
                    </VVBadge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      {subscription.nextDelivery || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <VVButton
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSubscription(subscription)}
                      >
                        <Eye className="h-4 w-4" />
                      </VVButton>
                      {subscription.status === "active" && (
                        <VVButton
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(subscription.id, "paused")
                          }
                        >
                          <Pause className="h-4 w-4" />
                        </VVButton>
                      )}
                      {subscription.status === "paused" && (
                        <VVButton
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(subscription.id, "active")
                          }
                        >
                          <Play className="h-4 w-4" />
                        </VVButton>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </VVCard>

      {/* Subscription Details Modal */}
      {selectedSubscription && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Subscription Details
                </h2>
                <VVButton
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSubscription(null)}
                >
                  <X className="h-4 w-4" />
                </VVButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Subscription Info
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">ID:</span>{" "}
                      {selectedSubscription.id}
                    </div>
                    <div>
                      <span className="font-medium">Plan:</span>{" "}
                      {selectedSubscription.plan}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span>{" "}
                      {selectedSubscription.planType}
                    </div>
                    <div>
                      <span className="font-medium">Amount:</span> ₹
                      {selectedSubscription.amount}
                    </div>
                    <div>
                      <span className="font-medium">Frequency:</span>{" "}
                      {selectedSubscription.frequency}
                    </div>
                    <div>
                      <span className="font-medium">Start Date:</span>{" "}
                      {selectedSubscription.startDate}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <VVBadge
                        variant={getStatusColor(selectedSubscription.status)}
                        className="ml-2"
                      >
                        {selectedSubscription.status}
                      </VVBadge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Customer Info
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedSubscription.customer}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span>{" "}
                      {selectedSubscription.email}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span>{" "}
                      {selectedSubscription.phone}
                    </div>
                    <div>
                      <span className="font-medium">Address:</span>{" "}
                      {selectedSubscription.address}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Delivery Schedule
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Next Delivery:</span>{" "}
                      {selectedSubscription.nextDelivery || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Delivery Days:</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedSubscription.deliveryDays.map((day: string) => (
                        <VVBadge
                          key={day}
                          variant="outline"
                          className="text-xs"
                        >
                          {day.slice(0, 3)}
                        </VVBadge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Preferences
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubscription.preferences.map((pref: string) => (
                      <VVBadge key={pref} variant="outline">
                        {pref}
                      </VVBadge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <VVButton variant="outline">Edit Subscription</VVButton>
                <VVButton variant="outline">Contact Customer</VVButton>
                {selectedSubscription.status === "active" && (
                  <VVButton variant="outline">
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </VVButton>
                )}
                {selectedSubscription.status === "paused" && (
                  <VVButton>
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </VVButton>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
