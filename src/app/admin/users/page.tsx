"use client";

import { useState } from "react";
import {
  Search,
  Download,
  MoreHorizontal,
  Eye,
  Ban,
  UserCheck,
} from "lucide-react";
import { VVCard } from "@/components/ui/vv-card";
import { VVButton } from "@/components/ui/vv-button";
import { VVInput } from "@/components/ui/vv-input";
import { VVBadge } from "@/components/ui/vv-badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock user data
const mockUsers = [
  {
    id: "USR001",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    plan: "Weekly Pro",
    status: "Active",
    joinDate: "2024-01-15",
    lastActivity: "2024-01-20",
    totalOrders: 45,
    totalSpent: 12500,
    referrals: 3,
  },
  {
    id: "USR002",
    name: "Rahul Gupta",
    email: "rahul.gupta@email.com",
    phone: "+91 87654 32109",
    plan: "Monthly Flexi",
    status: "Active",
    joinDate: "2024-01-10",
    lastActivity: "2024-01-19",
    totalOrders: 28,
    totalSpent: 8900,
    referrals: 1,
  },
  {
    id: "USR003",
    name: "Anita Patel",
    email: "anita.patel@email.com",
    phone: "+91 76543 21098",
    plan: "Daily Basic",
    status: "Paused",
    joinDate: "2023-12-20",
    lastActivity: "2024-01-18",
    totalOrders: 67,
    totalSpent: 15600,
    referrals: 5,
  },
  {
    id: "USR004",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 65432 10987",
    plan: "Weekly Pro",
    status: "Inactive",
    joinDate: "2023-11-05",
    lastActivity: "2024-01-10",
    totalOrders: 12,
    totalSpent: 3400,
    referrals: 0,
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status.toLowerCase() === statusFilter;
    const matchesPlan = planFilter === "all" || user.plan === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "paused":
        return "warning";
      case "inactive":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">
            Manage all registered users and their subscriptions
          </p>
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
        </div>
      </div>

      {/* Filters */}
      <VVCard className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <VVInput
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="Daily Basic">Daily Basic</SelectItem>
                <SelectItem value="Weekly Pro">Weekly Pro</SelectItem>
                <SelectItem value="Monthly Flexi">Monthly Flexi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </VVCard>

      {/* Users Table */}
      <VVCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  User
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  Plan
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  Status
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  Orders
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  Total Spent
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  Last Activity
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <VVBadge variant="outline">{user.plan}</VVBadge>
                  </td>
                  <td className="py-4 px-6">
                    <VVBadge variant={getStatusColor(user.status)}>
                      {user.status}
                    </VVBadge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <div className="font-medium">{user.totalOrders}</div>
                      <div className="text-gray-500">
                        {user.referrals} referrals
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium">
                      ₹{user.totalSpent.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-600">
                      {user.lastActivity}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCheck className="h-4 w-4 mr-2" />
                          Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Ban className="h-4 w-4 mr-2" />
                          Block User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </VVCard>

      {/* User Details Modal */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="text-gray-900">{selectedUser.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <p className="text-gray-900">{selectedUser.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    User ID
                  </label>
                  <p className="text-gray-900">{selectedUser.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Current Plan
                  </label>
                  <p className="text-gray-900">{selectedUser.plan}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <VVBadge variant={getStatusColor(selectedUser.status)}>
                    {selectedUser.status}
                  </VVBadge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Join Date
                  </label>
                  <p className="text-gray-900">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Last Activity
                  </label>
                  <p className="text-gray-900">{selectedUser.lastActivity}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Total Orders
                  </label>
                  <p className="text-gray-900">{selectedUser.totalOrders}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Total Spent
                  </label>
                  <p className="text-gray-900">
                    ₹{selectedUser.totalSpent.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Referrals
                  </label>
                  <p className="text-gray-900">{selectedUser.referrals}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
