import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Filter, Plus, Search, SlidersHorizontal, Trash } from "lucide-react"

const mockTemplates = [
  {
    id: "t001",
    name: "Keto Plan Template",
    description: "High fat, low carb meal plan for ketogenic diet followers",
    meals: 21,
    categories: ["Keto", "Low Carb", "High Fat"],
    usageCount: 28,
    lastUsed: "2023-06-10",
  },
  {
    id: "t002",
    name: "Diabetic Friendly Template",
    description: "Balanced meals with controlled sugar and complex carbs",
    meals: 14,
    categories: ["Diabetic", "Low Sugar", "Balanced"],
    usageCount: 15,
    lastUsed: "2023-06-05",
  },
  {
    id: "t003",
    name: "Office Lunch Light",
    description: "Light, easy to digest meals perfect for office workers",
    meals: 5,
    categories: ["Light", "Office", "Quick Digest"],
    usageCount: 42,
    lastUsed: "2023-06-12",
  },
  {
    id: "t004",
    name: "Protein Builder",
    description: "High protein meals for muscle building and recovery",
    meals: 28,
    categories: ["High Protein", "Fitness", "Muscle"],
    usageCount: 31,
    lastUsed: "2023-06-08",
  },
  {
    id: "t005",
    name: "Vegan Delight",
    description: "Plant-based meals with complete protein sources",
    meals: 21,
    categories: ["Vegan", "Plant-based", "Ethical"],
    usageCount: 19,
    lastUsed: "2023-06-01",
  },
  {
    id: "t006",
    name: "Weight Loss Special",
    description: "Calorie-controlled meals with high satiety index",
    meals: 21,
    categories: ["Weight Loss", "Low Calorie", "Filling"],
    usageCount: 37,
    lastUsed: "2023-06-11",
  },
]

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Meal Plan Templates</h1>
          <p className="text-muted-foreground">Create and manage reusable meal plan templates</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search templates..." className="w-full bg-white pl-8 shadow-sm" />
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
            All Templates ({mockTemplates.length})
          </TabsTrigger>
          <TabsTrigger value="popular" className="flex-1">
            Most Used
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex-1">
            Recently Used
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="mb-2">
                    <p className="text-sm font-medium">Meals</p>
                    <p className="text-sm text-muted-foreground">{template.meals} meals</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm font-medium">Usage</p>
                    <p className="text-sm text-muted-foreground">Used {template.usageCount} times</p>
                    <p className="text-sm text-muted-foreground">
                      Last used: {new Date(template.lastUsed).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Categories</p>
                    <div className="flex flex-wrap gap-1">
                      {template.categories.map((category) => (
                        <span
                          key={category}
                          className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm">
                    <Copy className="mr-2 h-4 w-4" />
                    Use Template
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="popular">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockTemplates
              .sort((a, b) => b.usageCount - a.usageCount)
              .map((template) => (
                <Card key={template.id} className="overflow-hidden">
                  {/* Same card content as above */}
                  <CardHeader className="pb-3">
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="mb-2">
                      <p className="text-sm font-medium">Meals</p>
                      <p className="text-sm text-muted-foreground">{template.meals} meals</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-medium">Usage</p>
                      <p className="text-sm text-muted-foreground">Used {template.usageCount} times</p>
                      <p className="text-sm text-muted-foreground">
                        Last used: {new Date(template.lastUsed).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Categories</p>
                      <div className="flex flex-wrap gap-1">
                        {template.categories.map((category) => (
                          <span
                            key={category}
                            className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-4 w-4" />
                      Use Template
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="recent">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockTemplates
              .sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime())
              .map((template) => (
                <Card key={template.id} className="overflow-hidden">
                  {/* Same card content as above */}
                  <CardHeader className="pb-3">
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="mb-2">
                      <p className="text-sm font-medium">Meals</p>
                      <p className="text-sm text-muted-foreground">{template.meals} meals</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-medium">Usage</p>
                      <p className="text-sm text-muted-foreground">Used {template.usageCount} times</p>
                      <p className="text-sm text-muted-foreground">
                        Last used: {new Date(template.lastUsed).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Categories</p>
                      <div className="flex flex-wrap gap-1">
                        {template.categories.map((category) => (
                          <span
                            key={category}
                            className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-4 w-4" />
                      Use Template
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
