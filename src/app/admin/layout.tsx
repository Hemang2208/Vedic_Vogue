"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  UtensilsCrossed,
  Calendar,
  MessageSquare,
  Gift,
  DollarSign,
  Settings,
  FileText,
  Bell,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    children: [
      { title: "All Orders", href: "/admin/orders" },
      { title: "Today's Orders", href: "/admin/orders/today" },
      { title: "Upcoming", href: "/admin/orders/upcoming" },
      { title: "Cancelled", href: "/admin/orders/cancelled" },
      { title: "History", href: "/admin/orders/history" },
    ],
  },
  {
    title: "Subscriptions",
    icon: Calendar,
    children: [
      { title: "All Subscriptions", href: "/admin/subscriptions" },
      { title: "Plans", href: "/admin/subscriptions/plans" },
      { title: "Pricing", href: "/admin/subscriptions/pricing" },
    ],
  },
  {
    title: "Menu",
    icon: UtensilsCrossed,
    children: [
      { title: "Menu Management", href: "/admin/menus" },
      { title: "Menu Calendar", href: "/admin/menus/calendar" },
      { title: "Categories", href: "/admin/menus/categories" },
    ],
  },
  {
    title: "Custom Plans",
    icon: FileText,
    children: [
      { title: "Custom Meal Plans", href: "/admin/custom-meal-plans" },
      { title: "Templates", href: "/admin/custom-meal-plans/templates" },
    ],
  },
  {
    title: "Add-ons",
    icon: Gift,
    children: [
      { title: "Manage Add-ons", href: "/admin/addons" },
      { title: "Categories", href: "/admin/addons/categories" },
    ],
  },
  {
    title: "Support",
    icon: MessageSquare,
    children: [
      { title: "Feedback", href: "/admin/feedback" },
      { title: "Support Tickets", href: "/admin/support-tickets" },
    ],
  },
  {
    title: "Users",
    icon: Users,
    children: [
      { title: "All Users", href: "/admin/users" },
      { title: "Blocked Users", href: "/admin/users/blocked" },
      { title: "Referrals", href: "/admin/users/referrals" },
    ],
  },
  {
    title: "Marketing",
    icon: Gift,
    children: [
      { title: "Referrals", href: "/admin/referrals" },
      { title: "Loyalty", href: "/admin/loyalty" },
      { title: "Announcements", href: "/admin/announcements" },
    ],
  },
  {
    title: "Billing",
    icon: DollarSign,
    children: [
      { title: "Revenue", href: "/admin/billing" },
      { title: "Discounts", href: "/admin/discounts" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "Admin Settings", href: "/admin/settings" },
      { title: "Roles", href: "/admin/settings/roles" },
      { title: "Themes", href: "/admin/settings/themes" },
    ],
  },
  {
    title: "Legal",
    icon: FileText,
    children: [
      { title: "Legal Pages", href: "/admin/legal" },
      { title: "Change Log", href: "/admin/legal/change-log" },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboard"]);
  const pathname = usePathname();

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            VedicVogue Admin
          </h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-3 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {adminNavItems.map((item) => (
            <div key={item.title} className="mb-2">
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.title)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      "hover:bg-gray-100 text-gray-700"
                    )}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.title}
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expandedItems.includes(item.title) && "rotate-180"
                      )}
                    />
                  </button>
                  {expandedItems.includes(item.title) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-6 mt-1 space-y-1"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-3 py-2 text-sm rounded-lg transition-colors",
                            pathname === child.href
                              ? "bg-orange-100 text-orange-700 font-medium"
                              : "text-gray-600 hover:bg-gray-100"
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    pathname === item.href
                      ? "bg-orange-100 text-orange-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                Admin User
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
