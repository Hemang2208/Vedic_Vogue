"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Edit, Trash2, Save } from "lucide-react"
import { VVCard } from "@/components/ui/vv-card"
import { VVButton } from "@/components/ui/vv-button"
import { VVInput } from "@/components/ui/vv-input"
import { VVBadge } from "@/components/ui/vv-badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

// Mock categories data
const mockCategories = [
  {
    id: "CAT-001",
    name: "Vegetarian",
    description: "Pure vegetarian meals with no meat or eggs",
    color: "#10B981",
    active: true,
    itemCount: 15,
  },
  {
    id: "CAT-002",
    name: "Fitness",
    description: "High protein, low carb meals for fitness enthusiasts",
    color: "#F59E0B",
    active: true,
    itemCount: 8,
  },
  {
    id: "CAT-003",
    name: "Light Office",
    description: "Light, easy-to-digest meals perfect for office workers",
    color: "#6B7280",
    active: true,
    itemCount: 12,
  },
  {
    id: "CAT-004",
    name: "Comfort Food",
    description: "Traditional homestyle meals that comfort the soul",
    color: "#EF4444",
    active: false,
    itemCount: 6,
  },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories)
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    color: "#10B981",
    active: true,
  })

  const handleSaveCategory = () => {
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map((cat) => (cat.id === editingCategory.id ? editingCategory : cat)))
      setEditingCategory(null)
    }
  }

  const handleAddCategory = () => {
    const newCat = {
      id: `CAT-${Date.now()}`,
      ...newCategory,
      itemCount: 0,
    }
    setCategories([...categories, newCat])
    setNewCategory({ name: "", description: "", color: "#10B981", active: true })
    setIsAddingNew(false)
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const toggleCategoryStatus = (id: string) => {
    setCategories(categories.map((cat) => (cat.id === id ? { ...cat, active: !cat.active } : cat)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/menus">
          <VVButton variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </VVButton>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Menu Categories</h1>
          <p className="text-gray-600">Manage meal categories and their properties</p>
        </div>
        <VVButton onClick={() => setIsAddingNew(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </VVButton>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <VVCard key={category.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                <div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.itemCount} items</p>
                </div>
              </div>
              <VVBadge variant={category.active ? "success" : "secondary"}>
                {category.active ? "Active" : "Inactive"}
              </VVBadge>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{category.description}</p>

            <div className="flex items-center justify-between">
              <Switch checked={category.active} onCheckedChange={() => toggleCategoryStatus(category.id)} />

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <VVButton variant="ghost" size="sm" onClick={() => setEditingCategory({ ...category })}>
                      <Edit className="w-4 h-4" />
                    </VVButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Category</DialogTitle>
                    </DialogHeader>
                    {editingCategory && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="edit-name">Category Name</Label>
                          <VVInput
                            id="edit-name"
                            value={editingCategory.name}
                            onChange={(e) =>
                              setEditingCategory({
                                ...editingCategory,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-description">Description</Label>
                          <Textarea
                            id="edit-description"
                            value={editingCategory.description}
                            onChange={(e) =>
                              setEditingCategory({
                                ...editingCategory,
                                description: e.target.value,
                              })
                            }
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-color">Color</Label>
                          <div className="flex gap-2 items-center">
                            <input
                              type="color"
                              id="edit-color"
                              value={editingCategory.color}
                              onChange={(e) =>
                                setEditingCategory({
                                  ...editingCategory,
                                  color: e.target.value,
                                })
                              }
                              className="w-12 h-10 rounded border"
                            />
                            <VVInput
                              value={editingCategory.color}
                              onChange={(e) =>
                                setEditingCategory({
                                  ...editingCategory,
                                  color: e.target.value,
                                })
                              }
                              className="flex-1"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <VVButton onClick={handleSaveCategory} className="flex-1">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </VVButton>
                          <VVButton variant="outline" onClick={() => setEditingCategory(null)}>
                            Cancel
                          </VVButton>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <VVButton
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </VVButton>
              </div>
            </div>
          </VVCard>
        ))}
      </div>

      {/* Add New Category Dialog */}
      <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-name">Category Name</Label>
              <VVInput
                id="new-name"
                placeholder="e.g., Keto Friendly"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="new-description">Description</Label>
              <Textarea
                id="new-description"
                placeholder="Describe this category..."
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="new-color">Color</Label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  id="new-color"
                  value={newCategory.color}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      color: e.target.value,
                    })
                  }
                  className="w-12 h-10 rounded border"
                />
                <VVInput
                  value={newCategory.color}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      color: e.target.value,
                    })
                  }
                  className="flex-1"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <VVButton onClick={handleAddCategory} className="flex-1">
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </VVButton>
              <VVButton variant="outline" onClick={() => setIsAddingNew(false)}>
                Cancel
              </VVButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
