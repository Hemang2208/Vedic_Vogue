"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Send,
  Calendar,
  Users,
  MoreHorizontal,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock announcements data
const mockAnnouncements = [
  {
    id: "ANN001",
    title: "New Year Special Menu",
    content:
      "Celebrate the New Year with our special festive menu featuring traditional delicacies and modern fusion dishes.",
    type: "Promotion",
    status: "Published",
    priority: "High",
    publishDate: "2024-01-01",
    expiryDate: "2024-01-31",
    targetAudience: "All Users",
    views: 1247,
    clicks: 89,
    createdBy: "Admin",
    createdDate: "2023-12-28",
  },
  {
    id: "ANN002",
    title: "Service Update - Delivery Timings",
    content:
      "We're updating our delivery timings to better serve you. New lunch delivery: 12:00-2:30 PM, Dinner: 6:00-9:00 PM.",
    type: "Service Update",
    status: "Published",
    priority: "Medium",
    publishDate: "2024-01-15",
    expiryDate: "2024-02-15",
    targetAudience: "Active Subscribers",
    views: 892,
    clicks: 156,
    createdBy: "Admin",
    createdDate: "2024-01-14",
  },
  {
    id: "ANN003",
    title: "Referral Program Launch",
    content:
      "Invite your friends and earn rewards! Get ₹200 for every successful referral. Your friends get ₹100 off their first order.",
    type: "Promotion",
    status: "Draft",
    priority: "High",
    publishDate: "2024-01-25",
    expiryDate: "2024-03-25",
    targetAudience: "All Users",
    views: 0,
    clicks: 0,
    createdBy: "Marketing Team",
    createdDate: "2024-01-20",
  },
  {
    id: "ANN004",
    title: "App Maintenance Notice",
    content:
      "Scheduled maintenance on Jan 22, 2024 from 2:00 AM to 4:00 AM. The app may be temporarily unavailable.",
    type: "Maintenance",
    status: "Scheduled",
    priority: "Medium",
    publishDate: "2024-01-22",
    expiryDate: "2024-01-22",
    targetAudience: "All Users",
    views: 0,
    clicks: 0,
    createdBy: "Tech Team",
    createdDate: "2024-01-18",
  },
];

export default function AnnouncementsPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return "success";
      case "draft":
        return "warning";
      case "scheduled":
        return "secondary";
      case "expired":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      case "low":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "promotion":
        return "success";
      case "service update":
        return "secondary";
      case "maintenance":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600">
            Create and manage announcements for your users
          </p>
        </div>

        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <VVButton>
              <Plus className="h-4 w-4 mr-2" />
              New Announcement
            </VVButton>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <VVInput id="title" placeholder="Enter announcement title" />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter announcement content"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promotion">Promotion</SelectItem>
                      <SelectItem value="service-update">
                        Service Update
                      </SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="subscribers">
                        Active Subscribers
                      </SelectItem>
                      <SelectItem value="new">New Users</SelectItem>
                      <SelectItem value="inactive">Inactive Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="publishDate">Publish Date</Label>
                  <VVInput id="publishDate" type="datetime-local" />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <VVInput id="expiryDate" type="datetime-local" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <VVButton
                  onClick={() => setShowCreateDialog(false)}
                  variant="outline"
                >
                  Save as Draft
                </VVButton>
                <VVButton onClick={() => setShowCreateDialog(false)}>
                  Publish Now
                </VVButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Announcements
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {mockAnnouncements.length}
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Send className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  mockAnnouncements.filter((a) => a.status === "Published")
                    .length
                }
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockAnnouncements
                  .reduce((sum, a) => sum + a.views, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </VVCard>

        <VVCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  mockAnnouncements.filter((a) => a.status === "Scheduled")
                    .length
                }
              </p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </VVCard>
      </div>

      {/* Announcements Table */}
      <VVCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  Announcement
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  Type
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  Status
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  Priority
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  Schedule
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  Performance
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockAnnouncements.map((announcement) => (
                <tr
                  key={announcement.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">
                        {announcement.title}
                      </div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {announcement.content}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Target: {announcement.targetAudience}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <VVBadge variant={getTypeColor(announcement.type)}>
                      {announcement.type}
                    </VVBadge>
                  </td>
                  <td className="py-4 px-6">
                    <VVBadge variant={getStatusColor(announcement.status)}>
                      {announcement.status}
                    </VVBadge>
                  </td>
                  <td className="py-4 px-6">
                    <VVBadge variant={getPriorityColor(announcement.priority)}>
                      {announcement.priority}
                    </VVBadge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <div>Publish: {announcement.publishDate}</div>
                      <div className="text-gray-500">
                        Expires: {announcement.expiryDate}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <div>{announcement.views.toLocaleString()} views</div>
                      <div className="text-gray-500">
                        {announcement.clicks} clicks
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
                        <DropdownMenuItem
                          onClick={() => setSelectedAnnouncement(announcement)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Send className="h-4 w-4 mr-2" />
                          Publish Now
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
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

      {/* Announcement Details Modal */}
      <Dialog
        open={!!selectedAnnouncement}
        onOpenChange={() => setSelectedAnnouncement(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Announcement Details</DialogTitle>
          </DialogHeader>
          {selectedAnnouncement && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {selectedAnnouncement.title}
                </h3>
                <p className="text-gray-700">{selectedAnnouncement.content}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <p className="text-gray-900">{selectedAnnouncement.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <VVBadge
                    variant={getStatusColor(selectedAnnouncement.status)}
                  >
                    {selectedAnnouncement.status}
                  </VVBadge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Priority
                  </label>
                  <VVBadge
                    variant={getPriorityColor(selectedAnnouncement.priority)}
                  >
                    {selectedAnnouncement.priority}
                  </VVBadge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Target Audience
                  </label>
                  <p className="text-gray-900">
                    {selectedAnnouncement.targetAudience}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Publish Date
                  </label>
                  <p className="text-gray-900">
                    {selectedAnnouncement.publishDate}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <p className="text-gray-900">
                    {selectedAnnouncement.expiryDate}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Views
                  </label>
                  <p className="text-gray-900">
                    {selectedAnnouncement.views.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Clicks
                  </label>
                  <p className="text-gray-900">{selectedAnnouncement.clicks}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Created By
                  </label>
                  <p className="text-gray-900">
                    {selectedAnnouncement.createdBy}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Created Date
                  </label>
                  <p className="text-gray-900">
                    {selectedAnnouncement.createdDate}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <VVButton variant="outline">Edit</VVButton>
                <VVButton>Publish Now</VVButton>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
