import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Trash,
} from "lucide-react";
import Image from "next/image";

const mockAddons = [
  {
    id: "a001",
    name: "Gulab Jamun",
    description: "Sweet milk solid-based dessert, soaked in sugar syrup",
    price: 49,
    category: "Dessert",
    available: true,
    popular: true,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "a002",
    name: "Masala Chaas",
    description: "Traditional yogurt-based drink with spices",
    price: 29,
    category: "Beverage",
    available: true,
    popular: true,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "a003",
    name: "Protein Booster",
    description: "Whey protein supplement for fitness enthusiasts",
    price: 79,
    category: "Supplement",
    available: true,
    popular: false,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "a004",
    name: "Fruit Salad",
    description: "Fresh seasonal fruits with honey drizzle",
    price: 59,
    category: "Healthy",
    available: true,
    popular: true,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "a005",
    name: "Rasgulla",
    description: "Syrupy dessert popular in the eastern regions",
    price: 45,
    category: "Dessert",
    available: false,
    popular: false,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "a006",
    name: "Green Tea",
    description: "Antioxidant-rich herbal tea",
    price: 25,
    category: "Beverage",
    available: true,
    popular: false,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "a007",
    name: "Jalebi",
    description: "Spiral-shaped sweet made from fermented batter",
    price: 39,
    category: "Dessert",
    available: true,
    popular: true,
    image: "/placeholder.svg?height=80&width=80",
  },
];

export default function AddonsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Add-ons Management
          </h1>
          <p className="text-muted-foreground">
            Manage additional items that customers can add to their orders
          </p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" />
          Add New Item
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search add-ons..."
            className="w-full bg-white pl-8 shadow-sm"
          />
        </div>
        <Button variant="outline" className="shadow-sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" className="shadow-sm">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Sort
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full bg-white shadow-sm">
          <TabsTrigger value="all" className="flex-1">
            All Add-ons ({mockAddons.length})
          </TabsTrigger>
          <TabsTrigger value="available" className="flex-1">
            Available ({mockAddons.filter((a) => a.available).length})
          </TabsTrigger>
          <TabsTrigger value="popular" className="flex-1">
            Popular ({mockAddons.filter((a) => a.popular).length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price (₹)</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Popular</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAddons.map((addon) => (
                    <TableRow key={addon.id}>
                      <TableCell>
                        <Image
                          fill
                          src={addon.image || "/placeholder.svg"}
                          alt={addon.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {addon.name}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {addon.description}
                      </TableCell>
                      <TableCell>₹{addon.price}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700">
                          {addon.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Switch checked={addon.available} />
                      </TableCell>
                      <TableCell>
                        <Switch checked={addon.popular} />
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="available">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price (₹)</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Popular</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAddons
                    .filter((addon) => addon.available)
                    .map((addon) => (
                      <TableRow key={addon.id}>
                        <TableCell>
                          <Image
                            fill
                            src={addon.image || "/placeholder.svg"}
                            alt={addon.name}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {addon.name}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {addon.description}
                        </TableCell>
                        <TableCell>₹{addon.price}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700">
                            {addon.category}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Switch checked={addon.available} />
                        </TableCell>
                        <TableCell>
                          <Switch checked={addon.popular} />
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="popular">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price (₹)</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Popular</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAddons
                    .filter((addon) => addon.popular)
                    .map((addon) => (
                      <TableRow key={addon.id}>
                        <TableCell>
                          <Image
                            fill
                            src={addon.image || "/placeholder.svg"}
                            alt={addon.name}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {addon.name}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {addon.description}
                        </TableCell>
                        <TableCell>₹{addon.price}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700">
                            {addon.category}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Switch checked={addon.available} />
                        </TableCell>
                        <TableCell>
                          <Switch checked={addon.popular} />
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
