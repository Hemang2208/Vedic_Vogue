"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Shield,
  Users,
  Eye,
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
import { Switch } from "@/components/ui/switch";

// Mock roles data
const mockRoles = [
  {
    id: "ROLE001",
    name: "Super Admin",
    description: "Full access to all platform features and settings",
    userCount: 2,
    permissions: {
      dashboard: { read: true, write: true, delete: true },
      orders: { read: true, write: true, delete: true },
      users: { read: true, write: true, delete: true },
      menu: { read: true, write: true, delete: true },
      billing: { read: true, write: true, delete: true },
      settings: { read: true, write: true, delete: true },
    },
    createdDate: "2023-12-01",
    status: "Active",
  },
  {
    id: "ROLE002",
    name: "Admin",
    description: "Access to most features except critical system settings",
    userCount: 5,
    permissions: {
      dashboard: { read: true, write: true, delete: false },
      orders: { read: true, write: true, delete: true },
      users: { read: true, write: true, delete: false },
      menu: { read: true, write: true, delete: true },
      billing: { read: true, write: false, delete: false },
      settings: { read: true, write: false, delete: false },
    },
    createdDate: "2023-12-01",
    status: "Active",
  },
  {
    id: "ROLE003",
    name: "Manager",
    description: "Access to daily operations and order management",
    userCount: 8,
    permissions: {
      dashboard: { read: true, write: false, delete: false },
      orders: { read: true, write: true, delete: false },
      users: { read: true, write: false, delete: false },
      menu: { read: true, write: true, delete: false },
      billing: { read: true, write: false, delete: false },
      settings: { read: false, write: false, delete: false },
    },
    createdDate: "2023-12-15",
    status: "Active",
  },
  {
    id: "ROLE004",
    name: "Support",
    description: "Limited access for customer support operations",
    userCount: 12,
    permissions: {
      dashboard: { read: true, write: false, delete: false },
      orders: { read: true, write: false, delete: false },
      users: { read: true, write: false, delete: false },
      menu: { read: true, write: false, delete: false },
      billing: { read: false, write: false, delete: false },
      settings: { read: false, write: false, delete: false },
    },
    createdDate: "2024-01-01",
    status: "Active",
  },
];

const permissionModules = [
  {
    key: "dashboard",
    name: "Dashboard",
    description: "Access to analytics and overview",
  },
  { key: "orders", name: "Orders", description: "Manage orders and bookings" },
  { key: "users", name: "Users", description: "Manage customer accounts" },
  {
    key: "menu",
    name: "Menu",
    description: "Manage menu items and categories",
  },
  {
    key: "billing",
    name: "Billing",
    description: "Access to revenue and payments",
  },
  { key: "settings", name: "Settings", description: "System configuration" },
];

export default function RolesPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    permissions: {} as any,
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const handleCreateRole = () => {
    console.log("Creating role:", newRole);
    setShowCreateDialog(false);
    setNewRole({ name: "", description: "", permissions: {} });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>
          <p className="text-gray-600">Manage user roles and permissions</p>
        </div>

        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <VVButton>
              <Plus className="h-4 w-4 mr-2" />
              Create Role
            </VVButton>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="roleName">Role Name</Label>
                  <VVInput
                    id="roleName"
                    placeholder="Enter role name"
                    value={newRole.name}
                    onChange={(e) =>
                      setNewRole({ ...newRole, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="roleDescription">Description</Label>
                  <VVInput
                    id="roleDescription"
                    placeholder="Enter role description"
                    value={newRole.description}
                    onChange={(e) =>
                      setNewRole({ ...newRole, description: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Permissions
                </h4>
                <div className="space-y-4">
                  {permissionModules.map((module) => (
                    <VVCard key={module.key} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h5 className="font-medium text-gray-900">
                            {module.name}
                          </h5>
                          <p className="text-sm text-gray-500">
                            {module.description}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`${module.key}-read`}>Read</Label>
                          <Switch
                            id={`${module.key}-read`}
                            checked={
                              newRole.permissions[module.key]?.read || false
                            }
                            onCheckedChange={(checked) =>
                              setNewRole({
                                ...newRole,
                                permissions: {
                                  ...newRole.permissions,
                                  [module.key]: {
                                    ...newRole.permissions[module.key],
                                    read: checked,
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`${module.key}-write`}>Write</Label>
                          <Switch
                            id={`${module.key}-write`}
                            checked={
                              newRole.permissions[module.key]?.write || false
                            }
                            onCheckedChange={(checked) =>
                              setNewRole({
                                ...newRole,
                                permissions: {
                                  ...newRole.permissions,
                                  [module.key]: {
                                    ...newRole.permissions[module.key],
                                    write: checked,
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`${module.key}-delete`}>Delete</Label>
                          <Switch
                            id={`${module.key}-delete`}
                            checked={
                              newRole.permissions[module.key]?.delete || false
                            }
                            onCheckedChange={(checked) =>
                              setNewRole({
                                ...newRole,
                                permissions: {
                                  ...newRole.permissions,
                                  [module.key]: {
                                    ...newRole.permissions[module.key],
                                    delete: checked,
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </VVCard>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <VVButton
                  onClick={() => setShowCreateDialog(false)}
                  variant="outline"
                >
                  Cancel
                </VVButton>
                <VVButton onClick={handleCreateRole}>Create Role</VVButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRoles.map((role) => (
          <VVCard key={role.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{role.name}</h3>
                  <VVBadge variant={getStatusColor(role.status)}>
                    {role.status}
                  </VVBadge>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedRole(role)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Role
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Role
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm text-gray-600 mb-4">{role.description}</p>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{role.userCount} users</span>
              </div>
              <span className="text-gray-500">Created {role.createdDate}</span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Permissions
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(role.permissions).map(
                  (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    [module, perms]: [string, any]
                  ) => (
                    <div
                      key={module}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-600 capitalize">{module}</span>
                      <div className="flex gap-1">
                        {perms.read && (
                          <span className="text-green-600">R</span>
                        )}
                        {perms.write && (
                          <span className="text-blue-600">W</span>
                        )}
                        {perms.delete && (
                          <span className="text-red-600">D</span>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </VVCard>
        ))}
      </div>

      {/* Role Details Modal */}
      <Dialog open={!!selectedRole} onOpenChange={() => setSelectedRole(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Role Details - {selectedRole?.name}</DialogTitle>
          </DialogHeader>
          {selectedRole && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Role Name
                  </label>
                  <p className="text-gray-900">{selectedRole.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <VVBadge variant={getStatusColor(selectedRole.status)}>
                    {selectedRole.status}
                  </VVBadge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Users Assigned
                  </label>
                  <p className="text-gray-900">{selectedRole.userCount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Created Date
                  </label>
                  <p className="text-gray-900">{selectedRole.createdDate}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <p className="text-gray-900 mt-1">
                    {selectedRole.description}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Detailed Permissions
                </h4>
                <div className="space-y-3">
                  {Object.entries(selectedRole.permissions).map(
                    (
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      [module, perms]: [string, any]
                    ) => (
                      <div
                        key={module}
                        className="flex items-center justify-between py-2 border-b border-gray-100"
                      >
                        <span className="font-medium text-gray-900 capitalize">
                          {module}
                        </span>
                        <div className="flex gap-4">
                          <span
                            className={`text-sm ${
                              perms.read ? "text-green-600" : "text-gray-400"
                            }`}
                          >
                            Read: {perms.read ? "✓" : "✗"}
                          </span>
                          <span
                            className={`text-sm ${
                              perms.write ? "text-blue-600" : "text-gray-400"
                            }`}
                          >
                            Write: {perms.write ? "✓" : "✗"}
                          </span>
                          <span
                            className={`text-sm ${
                              perms.delete ? "text-red-600" : "text-gray-400"
                            }`}
                          >
                            Delete: {perms.delete ? "✓" : "✗"}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <VVButton variant="outline">Edit Role</VVButton>
                <VVButton>Assign Users</VVButton>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
