"use client";

import { useState } from "react";
import {
  Search,
  Download,
  MoreHorizontal,
  UserCheck,
  Eye,
  AlertTriangle,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock blocked users data
const mockBlockedUsers = [
  {
    id: "USR005",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 54321 09876",
    blockedDate: "2024-01-18",
    blockedBy: "Admin",
    reason: "Multiple payment failures",
    previousOrders: 8,
    totalSpent: 2400,
    status: "Blocked",
  },
  {
    id: "USR006",
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 43210 98765",
    blockedDate: "2024-01-15",
    blockedBy: "System",
    reason: "Suspicious activity detected",
    previousOrders: 3,
    totalSpent: 890,
    status: "Under Review",
  },
  {
    id: "USR007",
    name: "Amit Joshi",
    email: "amit.joshi@email.com",
    phone: "+91 32109 87654",
    blockedDate: "2024-01-12",
    blockedBy: "Admin",
    reason: "Violation of terms of service",
    previousOrders: 15,
    totalSpent: 4500,
    status: "Permanently Blocked",
  },
];

export default function BlockedUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredUsers = mockBlockedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Blocked":
        return "destructive";
      case "Under Review":
        return "warning";
      case "Permanently Blocked":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blocked Users</h1>
          <p className="text-gray-600">
            Manage blocked and flagged user accounts
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

      {/* Search */}
      <VVCard className="p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <VVInput
            placeholder="Search blocked users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </VVCard>

      {/* Blocked Users Table */}
      <VVCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  User
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  Status
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  Blocked Date
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  Reason
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  Previous Activity
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
                    <VVBadge variant={getStatusColor(user.status)}>
                      {user.status}
                    </VVBadge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <div>{user.blockedDate}</div>
                      <div className="text-gray-500">by {user.blockedBy}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-600 max-w-xs">
                      {user.reason}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <div>{user.previousOrders} orders</div>
                      <div className="text-gray-500">
                        ₹{user.totalSpent.toLocaleString()}
                      </div>
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
                          Unblock User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Review Case
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
            <DialogTitle>Blocked User Details</DialogTitle>
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
                    Status
                  </label>
                  <VVBadge variant={getStatusColor(selectedUser.status)}>
                    {selectedUser.status}
                  </VVBadge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Blocked Date
                  </label>
                  <p className="text-gray-900">{selectedUser.blockedDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Blocked By
                  </label>
                  <p className="text-gray-900">{selectedUser.blockedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Previous Orders
                  </label>
                  <p className="text-gray-900">{selectedUser.previousOrders}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Reason for Blocking
                  </label>
                  <p className="text-gray-900 mt-1">{selectedUser.reason}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <VVButton variant="outline">Review Case</VVButton>
                <VVButton>Unblock User</VVButton>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
