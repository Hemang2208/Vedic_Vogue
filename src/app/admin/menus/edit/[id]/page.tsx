"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, Upload, Plus, X, Save } from "lucide-react"
import { VVCard } from "@/components/ui/vv-card"
import { VVButton } from "@/components/ui/vv-button"
import { VVInput } from "@/components/ui/vv-input"
import { VVBadge } from "@/components/ui/vv-badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"

// Mock data for editing
const mockMenuItem = {
  id: "MENU-001",
  name: "Rajma Rice Bowl",
  category: "vegetarian",
  type: "main-course",
  description: "Protein-rich kidney beans curry served with basmati rice",
  price: "180",
  preparationTime: "25",
  calories: "450",
  availability: true,
  tags: ["Protein Rich", "Comfort Food", "North Indian"],
  image: "/placeholder.svg?height=200&width=300",
}

export default function EditMenuItemPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    type: "",
    description: "",
    price: "",
    preparationTime: "",
    calories: "",
    availability: true,
  })
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  useEffect(() => {
    // Load existing data (mock)
    setFormData({
      name: mockMenuItem.name,
      category: mockMenuItem.category,
      type: mockMenuItem.type,
      description: mockMenuItem.description,
      price: mockMenuItem.price,
      preparationTime: mockMenuItem.preparationTime,
      calories: mockMenuItem.calories,
      availability: mockMenuItem.availability,
    })
    setTags(mockMenuItem.tags)
  }, [])

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updated item:", { ...formData, tags })
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Menu Item</h1>
          <p className="text-gray-600">Update item details and availability</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <VVCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Item Name *</Label>
                  <VVInput
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="fitness">Fitness</SelectItem>
                        <SelectItem value="light-office">Light Office</SelectItem>
                        <SelectItem value="comfort">Comfort Food</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="type">Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main-course">Main Course</SelectItem>
                        <SelectItem value="salad">Salad</SelectItem>
                        <SelectItem value="combo">Combo</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                        <SelectItem value="dessert">Dessert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            </VVCard>

            <VVCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Pricing & Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <VVInput
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="prep-time">Prep Time (min)</Label>
                  <VVInput
                    id="prep-time"
                    type="number"
                    value={formData.preparationTime}
                    onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="calories">Calories</Label>
                  <VVInput
                    id="calories"
                    type="number"
                    value={formData.calories}
                    onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                  />
                </div>
              </div>
            </VVCard>

            <VVCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <VVInput
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <VVButton type="button" onClick={addTag}>
                    <Plus className="w-4 h-4" />
                  </VVButton>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <VVBadge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-600">
                          <X className="w-3 h-3" />
                        </button>
                      </VVBadge>
                    ))}
                  </div>
                )}
              </div>
            </VVCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <VVCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Current Image</h3>
              <Image
                src={mockMenuItem.image || "/placeholder.svg"}
                alt={mockMenuItem.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <VVButton variant="outline" size="sm" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Change Image
              </VVButton>
            </VVCard>

            <VVCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Availability</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="availability">Available for orders</Label>
                <Switch
                  id="availability"
                  checked={formData.availability}
                  onCheckedChange={(checked) => setFormData({ ...formData, availability: checked })}
                />
              </div>
            </VVCard>

            <div className="space-y-3">
              <VVButton type="submit" className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </VVButton>
              <Link href="/admin/menus">
                <VVButton variant="outline" className="w-full">
                  Cancel
                </VVButton>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
