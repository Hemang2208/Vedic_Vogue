"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Upload, Plus, X } from "lucide-react"
import { VVCard } from "@/components/ui/vv-card"
import { VVButton } from "@/components/ui/vv-button"
import { VVInput } from "@/components/ui/vv-input"
import { VVBadge } from "@/components/ui/vv-badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function AddMenuItemPage() {
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
    // Handle form submission
    console.log("Form submitted:", { ...formData, tags })
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
          <h1 className="text-2xl font-bold text-gray-900">Add New Menu Item</h1>
          <p className="text-gray-600">Create a new meal item for your menu</p>
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
                    placeholder="e.g., Rajma Rice Bowl"
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
                        <SelectValue placeholder="Select category" />
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
                        <SelectValue placeholder="Select type" />
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
                    placeholder="Describe the dish, ingredients, and preparation style..."
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
                    placeholder="180"
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
                    placeholder="25"
                    value={formData.preparationTime}
                    onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="calories">Calories</Label>
                  <VVInput
                    id="calories"
                    type="number"
                    placeholder="450"
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
                    placeholder="Add a tag (e.g., High Protein)"
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
              <h3 className="text-lg font-semibold mb-4">Image Upload</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload item image</p>
                <VVButton variant="outline" size="sm">
                  Choose File
                </VVButton>
              </div>
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
                Create Menu Item
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
