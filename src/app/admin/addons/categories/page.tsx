import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, Plus, Trash } from "lucide-react"
import Image from "next/image"

const mockCategories = [
  {
    id: "c001",
    name: "Dessert",
    description: "Sweet treats to complete your meal",
    itemCount: 12,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "c002",
    name: "Beverage",
    description: "Refreshing drinks to accompany your food",
    itemCount: 8,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "c003",
    name: "Supplement",
    description: "Nutritional boosters for health-conscious customers",
    itemCount: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "c004",
    name: "Healthy",
    description: "Nutritious options for the health-conscious",
    itemCount: 7,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "c005",
    name: "Snacks",
    description: "Light bites for in-between meals",
    itemCount: 9,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function AddonCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add-on Categories</h1>
          <p className="text-muted-foreground">Manage categories for organizing add-on items</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Create a new category for organizing add-on items.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Category Name</Label>
                <Input id="name" placeholder="Enter category name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter category description" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image</Label>
                <Input id="image" type="file" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button className="bg-orange-600 hover:bg-orange-700">Save Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>{category.name}</CardTitle>
                <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700">
                  {category.itemCount} items
                </span>
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-center">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="h-32 w-32 rounded-md object-cover"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
