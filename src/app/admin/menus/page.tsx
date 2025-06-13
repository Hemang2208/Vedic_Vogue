"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye, Download } from "lucide-react";
import { VVCard } from "@/components/ui/vv-card";
import { VVButton } from "@/components/ui/vv-button";
import { VVInput } from "@/components/ui/vv-input";
import { VVBadge } from "@/components/ui/vv-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import Image from "next/image";

// Mock menu items data
const mockMenuItems = [
  {
    id: "MENU-001",
    name: "Rajma Rice Bowl",
    category: "Vegetarian",
    type: "Main Course",
    description: "Protein-rich kidney beans curry served with basmati rice",
    price: 180,
    tags: ["Protein Rich", "Comfort Food", "North Indian"],
    availability: true,
    preparationTime: 25,
    calories: 450,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "MENU-002",
    name: "Grilled Chicken Salad",
    category: "Fitness",
    type: "Salad",
    description: "Lean grilled chicken with mixed greens and quinoa",
    price: 220,
    tags: ["High Protein", "Low Carb", "Fitness"],
    availability: true,
    preparationTime: 15,
    calories: 320,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "MENU-003",
    name: "Dal Tadka Combo",
    category: "Light Office",
    type: "Combo",
    description: "Yellow lentils with rice, roti and pickle",
    price: 150,
    tags: ["Light", "Office Friendly", "Traditional"],
    availability: false,
    preparationTime: 20,
    calories: 380,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function MenusPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Vegetarian":
        return "success";
      case "Fitness":
        return "warning";
      case "Light Office":
        return "secondary";
      default:
        return "outline";
    }
  };

  const ExportDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <VVButton variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export Menu
        </VVButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Export as CSV</DropdownMenuItem>
        <DropdownMenuItem>Export as PDF</DropdownMenuItem>
        <DropdownMenuItem>Export as Excel</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600">
            Manage all meal items and their availability
          </p>
        </div>
        <div className="flex gap-3">
          <ExportDropdown />
          <Link href="/admin/menus/add">
            <VVButton>
              <Plus className="w-4 h-4 mr-2" />
              Add Menu Item
            </VVButton>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <VVCard className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <VVInput
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
              <SelectItem value="light-office">Light Office</SelectItem>
            </SelectContent>
          </Select>

          <Link href="/admin/menus/categories">
            <VVButton variant="outline" className="w-full">
              Manage Categories
            </VVButton>
          </Link>
        </div>
      </VVCard>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMenuItems.map((item) => (
          <VVCard key={item.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-100 relative">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Switch checked={item.availability} />
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.type}</p>
                </div>
                <VVBadge variant={getCategoryColor(item.category)}>
                  {item.category}
                </VVBadge>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 2).map((tag) => (
                  <VVBadge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </VVBadge>
                ))}
                {item.tags.length > 2 && (
                  <VVBadge variant="outline" className="text-xs">
                    +{item.tags.length - 2}
                  </VVBadge>
                )}
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>₹{item.price}</span>
                <span>{item.calories} cal</span>
                <span>{item.preparationTime} min</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <VVButton
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedItem(item)}
                    >
                      <Eye className="w-4 h-4" />
                    </VVButton>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{selectedItem?.name}</DialogTitle>
                    </DialogHeader>
                    {selectedItem && (
                      <div className="space-y-4">
                        <Image
                          src={selectedItem.image || "/placeholder.svg"}
                          alt={selectedItem.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium">Details</h4>
                            <p className="text-sm text-gray-600">
                              Category: {selectedItem.category}
                            </p>
                            <p className="text-sm text-gray-600">
                              Type: {selectedItem.type}
                            </p>
                            <p className="text-sm text-gray-600">
                              Price: ₹{selectedItem.price}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium">Nutrition</h4>
                            <p className="text-sm text-gray-600">
                              Calories: {selectedItem.calories}
                            </p>
                            <p className="text-sm text-gray-600">
                              Prep Time: {selectedItem.preparationTime} min
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">Description</h4>
                          <p className="text-sm text-gray-600">
                            {selectedItem.description}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium">Tags</h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedItem.tags.map((tag: string) => (
                              <VVBadge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </VVBadge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Link href={`/admin/menus/edit/${item.id}`}>
                  <VVButton variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </VVButton>
                </Link>

                <VVButton
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </VVButton>
              </div>
            </div>
          </VVCard>
        ))}
      </div>
    </div>
  );
}
