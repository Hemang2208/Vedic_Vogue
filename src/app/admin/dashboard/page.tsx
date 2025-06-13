// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Users,
//   ShoppingCart,
//   DollarSign,
//   TrendingUp,
//   Calendar,
//   Clock,
// } from "lucide-react";
// import { VVCard } from "@/components/ui/vv-card";
// import { VVButton } from "@/components/ui/vv-button";
// import { VVBadge } from "@/components/ui/vv-badge";

// // Mock data
// const dashboardStats = {
//   totalUsers: 1247,
//   activeSubscriptions: 892,
//   todayOrders: 156,
//   monthlyRevenue: 45680,
//   pendingTickets: 12,
//   completedOrders: 2341,
// };

// const recentOrders = [
//   {
//     id: "ORD-001",
//     customer: "Priya Sharma",
//     meal: "Weekly Pro Plan",
//     status: "delivered",
//     time: "2 hours ago",
//   },
//   {
//     id: "ORD-002",
//     customer: "Rahul Kumar",
//     meal: "Office Light Lunch",
//     status: "preparing",
//     time: "1 hour ago",
//   },
//   {
//     id: "ORD-003",
//     customer: "Anita Patel",
//     meal: "Fitness Special",
//     status: "pending",
//     time: "30 mins ago",
//   },
//   {
//     id: "ORD-004",
//     customer: "Vikram Singh",
//     meal: "Traditional Thali",
//     status: "delivered",
//     time: "15 mins ago",
//   },
// ];

// const upcomingDeliveries = [
//   { time: "11:30 AM", orders: 45, area: "Koramangala" },
//   { time: "12:00 PM", orders: 67, area: "Whitefield" },
//   { time: "12:30 PM", orders: 34, area: "Indiranagar" },
//   { time: "1:00 PM", orders: 52, area: "HSR Layout" },
// ];

// export default function AdminDashboard() {
//   const [timeRange, setTimeRange] = useState("today");

//   const StatCard = ({
//     title,
//     value,
//     icon: Icon,
//     trend,
//     color = "blue",
//   }: any) => (
//     <VVCard className="p-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-600">{title}</p>
//           <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
//           {trend && (
//             <p
//               className={`text-sm mt-1 ${
//                 trend > 0 ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {trend > 0 ? "+" : ""}
//               {trend}% from last month
//             </p>
//           )}
//         </div>
//         <div className={`p-3 rounded-full bg-${color}-100`}>
//           <Icon className={`h-6 w-6 text-${color}-600`} />
//         </div>
//       </div>
//     </VVCard>
//   );

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//           <p className="text-gray-600 mt-1">
//             Welcome back! Here's what's happening today.
//           </p>
//         </div>
//         <div className="flex items-center space-x-3 mt-4 sm:mt-0">
//           <select
//             value={timeRange}
//             onChange={(e) => setTimeRange(e.target.value)}
//             className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
//           >
//             <option value="today">Today</option>
//             <option value="week">This Week</option>
//             <option value="month">This Month</option>
//           </select>
//           <VVButton variant="outline" size="sm">
//             Export Report
//           </VVButton>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard
//           title="Total Users"
//           value={dashboardStats.totalUsers.toLocaleString()}
//           icon={Users}
//           trend={12}
//           color="blue"
//         />
//         <StatCard
//           title="Active Subscriptions"
//           value={dashboardStats.activeSubscriptions.toLocaleString()}
//           icon={Calendar}
//           trend={8}
//           color="green"
//         />
//         <StatCard
//           title="Today's Orders"
//           value={dashboardStats.todayOrders}
//           icon={ShoppingCart}
//           trend={-3}
//           color="orange"
//         />
//         <StatCard
//           title="Monthly Revenue"
//           value={`₹${dashboardStats.monthlyRevenue.toLocaleString()}`}
//           icon={DollarSign}
//           trend={15}
//           color="purple"
//         />
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Recent Orders */}
//         <div className="lg:col-span-2">
//           <VVCard className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Recent Orders
//               </h3>
//               <VVButton variant="outline" size="sm">
//                 View All
//               </VVButton>
//             </div>
//             <div className="space-y-4">
//               {recentOrders.map((order, index) => (
//                 <motion.div
//                   key={order.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
//                 >
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-3">
//                       <span className="font-medium text-gray-900">
//                         {order.id}
//                       </span>
//                       <VVBadge
//                         variant={
//                           order.status === "delivered"
//                             ? "success"
//                             : order.status === "preparing"
//                             ? "warning"
//                             : "default"
//                         }
//                       >
//                         {order.status}
//                       </VVBadge>
//                     </div>
//                     <p className="text-sm text-gray-600 mt-1">
//                       {order.customer}
//                     </p>
//                     <p className="text-sm text-gray-500">{order.meal}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-gray-500">{order.time}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </VVCard>
//         </div>

//         {/* Upcoming Deliveries */}
//         <div>
//           <VVCard className="p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Upcoming Deliveries
//             </h3>
//             <div className="space-y-4">
//               {upcomingDeliveries.map((delivery, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
//                       <Clock className="h-5 w-5 text-orange-600" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900">
//                         {delivery.time}
//                       </p>
//                       <p className="text-sm text-gray-600">{delivery.area}</p>
//                     </div>
//                   </div>
//                   <VVBadge variant="outline">{delivery.orders} orders</VVBadge>
//                 </div>
//               ))}
//             </div>
//           </VVCard>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <VVCard className="p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">
//           Quick Actions
//         </h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <VVButton variant="outline" className="h-20 flex-col">
//             <ShoppingCart className="h-6 w-6 mb-2" />
//             View Orders
//           </VVButton>
//           <VVButton variant="outline" className="h-20 flex-col">
//             <Users className="h-6 w-6 mb-2" />
//             Manage Users
//           </VVButton>
//           <VVButton variant="outline" className="h-20 flex-col">
//             <Calendar className="h-6 w-6 mb-2" />
//             Menu Calendar
//           </VVButton>
//           <VVButton variant="outline" className="h-20 flex-col">
//             <TrendingUp className="h-6 w-6 mb-2" />
//             Analytics
//           </VVButton>
//         </div>
//       </VVCard>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  CalendarCheck,
  Package,
  Star,
  MapPin,
  Bell,
  Filter,
  Download,
  ChevronDown,
  Eye,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Truck,
  CheckCircle,
  AlertCircle,
  XCircle,
  LucideIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Types
type VVCardProps = {
  children: React.ReactNode;
  className?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type VVButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type VVBadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline";
  className?: string;
};

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  color?: string;
  subtitle?: string;
};

type OrderStatus = "delivered" | "preparing" | "pending" | "cancelled";
// type DeliveryStatus = "on-time" | "delayed" | "preparing";

// Mock Data
const dashboardStats = {
  totalUsers: 12847,
  todayOrders: 256,
  monthlyRevenue: 145680,
  activeSubscriptions: 3892,
  completedOrders: 8341,
  pendingOrders: 47,
  cancelledOrders: 23,
  avgOrderValue: 450,
};

const recentOrders = [
  {
    id: "ORD-2024-001",
    customer: "Priya Sharma",
    meal: "Weekly Pro Plan",
    status: "delivered",
    time: "2 hours ago",
    amount: 1200,
    rating: 5,
  },
  {
    id: "ORD-2024-002",
    customer: "Rahul Kumar",
    meal: "Office Light Lunch",
    status: "preparing",
    time: "1 hour ago",
    amount: 450,
    rating: null,
  },
  {
    id: "ORD-2024-003",
    customer: "Anita Patel",
    meal: "Fitness Special",
    status: "pending",
    time: "30 mins ago",
    amount: 650,
    rating: null,
  },
  {
    id: "ORD-2024-004",
    customer: "Vikram Singh",
    meal: "Traditional Thali",
    status: "delivered",
    time: "15 mins ago",
    amount: 380,
    rating: 4,
  },
  {
    id: "ORD-2024-005",
    customer: "Sneha Gupta",
    meal: "Keto Deluxe",
    status: "cancelled",
    time: "5 mins ago",
    amount: 750,
    rating: null,
  },
];

const upcomingDeliveries = [
  { time: "11:30 AM", orders: 45, area: "Koramangala", status: "on-time" },
  { time: "12:00 PM", orders: 67, area: "Whitefield", status: "delayed" },
  { time: "12:30 PM", orders: 34, area: "Indiranagar", status: "on-time" },
  { time: "1:00 PM", orders: 52, area: "HSR Layout", status: "preparing" },
  { time: "1:30 PM", orders: 28, area: "Marathahalli", status: "on-time" },
];

const topPerformingPlans = [
  {
    name: "Weekly Pro Plan",
    orders: 1245,
    satisfaction: 4.8,
    revenue: 1492000,
    growth: 12,
  },
  {
    name: "Office Light Lunch",
    orders: 892,
    satisfaction: 4.6,
    revenue: 401400,
    growth: 8,
  },
  {
    name: "Fitness Special",
    orders: 756,
    satisfaction: 4.9,
    revenue: 491400,
    growth: 24,
  },
  {
    name: "Traditional Thali",
    orders: 634,
    satisfaction: 4.5,
    revenue: 240920,
    growth: 5,
  },
  {
    name: "Keto Deluxe",
    orders: 423,
    satisfaction: 4.7,
    revenue: 317250,
    growth: -3,
  },
];

const chartData = [
  { name: "Jan", revenue: 85000, orders: 420 },
  { name: "Feb", revenue: 92000, orders: 380 },
  { name: "Mar", revenue: 98000, orders: 450 },
  { name: "Apr", revenue: 105000, orders: 520 },
  { name: "May", revenue: 125000, orders: 680 },
  { name: "Jun", revenue: 145680, orders: 750 },
];

const pieData = [
  { name: "Delivered", value: 68, color: "#10B981" },
  { name: "Preparing", value: 22, color: "#F59E0B" },
  { name: "Pending", value: 7, color: "#6B7280" },
  { name: "Cancelled", value: 3, color: "#EF4444" },
];

// Custom Components
const VVCard = ({ children, className = "", ...props }: VVCardProps) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const VVButton = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}: VVButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100",
    ghost: "text-gray-600 hover:bg-gray-100 active:bg-gray-200",
  };
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const VVBadge = ({
  children,
  variant = "default",
  className = "",
}: VVBadgeProps) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    outline: "border border-gray-300 text-gray-700 bg-white",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("today");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    color = "blue",
    subtitle = "",
  }: StatCardProps) => (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.2 }}
    >
      <VVCard className="p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {typeof value === "number" && color === "purple"
                ? `₹${value.toLocaleString()}`
                : value}
            </p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
            {trend !== undefined && (
              <div className="flex items-center mt-2">
                {trend > 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                )}
                <p
                  className={`text-sm ml-1 ${
                    trend > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {Math.abs(trend)}% from last month
                </p>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full bg-${color}-100 ml-4`}>
            <Icon className={`h-6 w-6 text-${color}-600`} />
          </div>
        </div>
      </VVCard>
    </motion.div>
  );

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "preparing":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusVariant = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return "success";
      case "preparing":
        return "warning";
      case "pending":
        return "default";
      case "cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Here&apos;s what&apos;s happening with your meal delivery
                platform.
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <div className="relative">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-8"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              <VVButton variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </VVButton>
              <VVButton size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </VVButton>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Users"
              value={dashboardStats.totalUsers.toLocaleString()}
              icon={Users}
              trend={12}
              color="blue"
              subtitle="Active customers"
            />
            <StatCard
              title="Today's Orders"
              value={dashboardStats.todayOrders}
              icon={ShoppingCart}
              trend={-3}
              color="green"
              subtitle="Orders placed today"
            />
            <StatCard
              title="Monthly Revenue"
              value={dashboardStats.monthlyRevenue}
              icon={DollarSign}
              trend={15}
              color="purple"
              subtitle="This month's earnings"
            />
            <StatCard
              title="Active Subscriptions"
              value={dashboardStats.activeSubscriptions.toLocaleString()}
              icon={CalendarCheck}
              trend={8}
              color="orange"
              subtitle="Recurring customers"
            />
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Completed Orders"
              value={dashboardStats.completedOrders.toLocaleString()}
              icon={CheckCircle}
              color="green"
              subtitle="Successfully delivered"
            />
            <StatCard
              title="Pending Orders"
              value={dashboardStats.pendingOrders}
              icon={Clock}
              color="yellow"
              subtitle="Awaiting processing"
            />
            <StatCard
              title="Avg Order Value"
              value={dashboardStats.avgOrderValue}
              icon={TrendingUp}
              trend={5}
              color="blue"
              subtitle="Per order average"
            />
            <StatCard
              title="Cancellation Rate"
              value="2.1%"
              icon={XCircle}
              trend={-12}
              color="red"
              subtitle="Order cancellations"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Revenue Chart */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <VVCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Revenue & Orders
                      </h3>
                      <p className="text-sm text-gray-600">
                        Monthly performance overview
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <VVBadge variant="success">+15% Growth</VVBadge>
                      <VVButton variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </VVButton>
                    </div>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                          activeDot={{
                            r: 6,
                            stroke: "#3B82F6",
                            strokeWidth: 2,
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="orders"
                          stroke="#10B981"
                          strokeWidth={3}
                          dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                          activeDot={{
                            r: 6,
                            stroke: "#10B981",
                            strokeWidth: 2,
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </VVCard>
              </motion.div>
            </div>

            {/* Order Status Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <VVCard className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Order Status
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {pieData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-gray-600">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </VVCard>
            </motion.div>
          </div>

          {/* Recent Orders & Upcoming Deliveries */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <VVCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Recent Orders
                    </h3>
                    <p className="text-sm text-gray-600">
                      Latest customer orders
                    </p>
                  </div>
                  <VVButton variant="outline" size="sm">
                    View All Orders
                  </VVButton>
                </div>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-gray-900">
                            {order.id}
                          </span>
                          <VVBadge
                            variant={getStatusVariant(
                              order.status as OrderStatus
                            )}
                          >
                            <span className="flex items-center space-x-1">
                              {getStatusIcon(order.status as OrderStatus)}
                              <span className="capitalize">{order.status}</span>
                            </span>
                          </VVBadge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.customer}
                        </p>
                        <p className="text-sm text-gray-500">{order.meal}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          ₹{order.amount}
                        </p>
                        <p className="text-xs text-gray-500">{order.time}</p>
                        {order.rating && (
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600 ml-1">
                              {order.rating}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </VVCard>
            </motion.div>

            {/* Upcoming Deliveries */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <VVCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Upcoming Deliveries
                    </h3>
                    <p className="text-sm text-gray-600">
                      Scheduled delivery slots
                    </p>
                  </div>
                  <VVButton variant="outline" size="sm">
                    <Truck className="h-4 w-4 mr-2" />
                    Track All
                  </VVButton>
                </div>
                <div className="space-y-4">
                  {upcomingDeliveries.map((delivery, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full">
                          <Clock className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {delivery.time}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              {delivery.area}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <VVBadge variant="outline">
                          {delivery.orders} orders
                        </VVBadge>
                        <p
                          className={`text-xs mt-1 ${
                            delivery.status === "on-time"
                              ? "text-green-600"
                              : delivery.status === "delayed"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {delivery.status.replace("-", " ")}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </VVCard>
            </motion.div>
          </div>

          {/* Top Performing Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <VVCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Top Performing Meal Plans
                  </h3>
                  <p className="text-sm text-gray-600">
                    Most popular plans by orders and revenue
                  </p>
                </div>
                <VVButton variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Plans
                </VVButton>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Plan Name
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Orders
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Revenue
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Satisfaction
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Growth
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPerformingPlans.map((plan, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                            <span className="font-medium text-gray-900">
                              {plan.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {plan.orders.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          ₹{plan.revenue.toLocaleString()}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-gray-600">
                              {plan.satisfaction}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-1">
                            {plan.growth > 0 ? (
                              <ArrowUpRight className="h-4 w-4 text-green-600" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 text-red-600" />
                            )}
                            <span
                              className={
                                plan.growth > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              {Math.abs(plan.growth)}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <VVButton variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </VVButton>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </VVCard>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <VVCard className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <VVButton
                  variant="outline"
                  className="h-20 flex-col space-y-2 hover:shadow-md transition-shadow duration-200"
                >
                  <Activity className="h-6 w-6" />
                  <span className="text-xs">Support</span>
                </VVButton>
                <VVButton
                  variant="outline"
                  className="h-20 flex-col space-y-2 hover:shadow-md transition-shadow duration-200"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span className="text-xs">View Orders</span>
                </VVButton>
                <VVButton
                  variant="outline"
                  className="h-20 flex-col space-y-2 hover:shadow-md transition-shadow duration-200"
                >
                  <Users className="h-6 w-6" />
                  <span className="text-xs">Manage Users</span>
                </VVButton>
                <VVButton
                  variant="outline"
                  className="h-20 flex-col space-y-2 hover:shadow-md transition-shadow duration-200"
                >
                  <Calendar className="h-6 w-6" />
                  <span className="text-xs">Menu Calendar</span>
                </VVButton>
                <VVButton
                  variant="outline"
                  className="h-20 flex-col space-y-2 hover:shadow-md transition-shadow duration-200"
                >
                  <TrendingUp className="h-6 w-6" />
                  <span className="text-xs">Analytics</span>
                </VVButton>
                <VVButton
                  variant="outline"
                  className="h-20 flex-col space-y-2 hover:shadow-md transition-shadow duration-200"
                >
                  <Package className="h-6 w-6" />
                  <span className="text-xs">Inventory</span>
                </VVButton>
              </div>
            </VVCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
