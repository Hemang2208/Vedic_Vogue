import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Plus, Search, SlidersHorizontal } from "lucide-react"

const mockCustomPlans = [
  {
    id: "cp001",
    name: "Keto Fitness Plan",
    customer: "Rahul Sharma",
    email: "rahul.s@example.com",
    status: "active",
    created: "2023-05-15",
    meals: 14,
    preferences: ["Low Carb", "High Protein", "No Dairy"],
  },
  {
    id: "cp002",
    name: "Diabetic Friendly",
    customer: "Priya Patel",
    email: "priya.p@example.com",
    status: "active",
    created: "2023-06-02",
    meals: 21,
    preferences: ["Low Sugar", "Low Salt", "High Fiber"],
  },
  {
    id: "cp003",
    name: "Office Light Lunch",
    customer: "Vikram Malhotra",
    email: "vikram.m@example.com",
    status: "paused",
    created: "2023-04-28",
    meals: 10,
    preferences: ["Light", "Quick Digest", "Vegetarian"],
  },
  {
    id: "cp004",
    name: "Protein Builder",
    customer: "Ananya Singh",
    email: "ananya.s@example.com",
    status: "active",
    created: "2023-05-30",
    meals: 28,
    preferences: ["High Protein", "Post Workout", "Egg"],
  },
  {
    id: "cp005",
    name: "Vegan Delight",
    customer: "Karan Mehra",
    email: "karan.m@example.com",
    status: "expired",
    created: "2023-03-15",
    meals: 14,
    preferences: ["Vegan", "Organic", "No Processed"],
  },
]

export default function CustomMealPlansPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Custom Meal Plans</h1>
          <p className="text-muted-foreground">Manage personalized meal plans for customers</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" />
          Create New Plan
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search plans or customers..." className="w-full bg-white pl-8 shadow-sm" />
        </div>
        <Button variant="outline" className="shadow-sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" className="shadow-sm">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Advanced
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full bg-white shadow-sm">
          <TabsTrigger value="all" className="flex-1">
            All Plans (5)
          </TabsTrigger>
          <TabsTrigger value="active" className="flex-1">
            Active (3)
          </TabsTrigger>
          <TabsTrigger value="paused" className="flex-1">
            Paused (1)
          </TabsTrigger>
          <TabsTrigger value="expired" className="flex-1">
            Expired (1)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockCustomPlans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>{plan.name}</CardTitle>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        plan.status === "active"
                          ? "bg-green-100 text-green-800"
                          : plan.status === "paused"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {plan.status}
                    </span>
                  </div>
                  <CardDescription>Created on {new Date(plan.created).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="mb-2">
                    <p className="text-sm font-medium">Customer</p>
                    <p className="text-sm text-muted-foreground">{plan.customer}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{plan.email}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm font-medium">Meals</p>
                    <p className="text-sm text-muted-foreground">{plan.meals} meals</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Preferences</p>
                    <div className="flex flex-wrap gap-1">
                      {plan.preferences.map((pref) => (
                        <span
                          key={pref}
                          className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700"
                        >
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit Plan
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="active">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockCustomPlans
              .filter((plan) => plan.status === "active")
              .map((plan) => (
                <Card key={plan.id} className="overflow-hidden">
                  {/* Same card content as above */}
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>{plan.name}</CardTitle>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                        {plan.status}
                      </span>
                    </div>
                    <CardDescription>Created on {new Date(plan.created).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="mb-2">
                      <p className="text-sm font-medium">Customer</p>
                      <p className="text-sm text-muted-foreground">{plan.customer}</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{plan.email}</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-medium">Meals</p>
                      <p className="text-sm text-muted-foreground">{plan.meals} meals</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Preferences</p>
                      <div className="flex flex-wrap gap-1">
                        {plan.preferences.map((pref) => (
                          <span
                            key={pref}
                            className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700"
                          >
                            {pref}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="paused">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockCustomPlans
              .filter((plan) => plan.status === "paused")
              .map((plan) => (
                <Card key={plan.id} className="overflow-hidden">
                  {/* Same card content as above */}
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>{plan.name}</CardTitle>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                        {plan.status}
                      </span>
                    </div>
                    <CardDescription>Created on {new Date(plan.created).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="mb-2">
                      <p className="text-sm font-medium">Customer</p>
                      <p className="text-sm text-muted-foreground">{plan.customer}</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{plan.email}</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-medium">Meals</p>
                      <p className="text-sm text-muted-foreground">{plan.meals} meals</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Preferences</p>
                      <div className="flex flex-wrap gap-1">
                        {plan.preferences.map((pref) => (
                          <span
                            key={pref}
                            className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700"
                          >
                            {pref}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="expired">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockCustomPlans
              .filter((plan) => plan.status === "expired")
              .map((plan) => (
                <Card key={plan.id} className="overflow-hidden">
                  {/* Same card content as above */}
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>{plan.name}</CardTitle>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                        {plan.status}
                      </span>
                    </div>
                    <CardDescription>Created on {new Date(plan.created).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="mb-2">
                      <p className="text-sm font-medium">Customer</p>
                      <p className="text-sm text-muted-foreground">{plan.customer}</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{plan.email}</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-medium">Meals</p>
                      <p className="text-sm text-muted-foreground">{plan.meals} meals</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Preferences</p>
                      <div className="flex flex-wrap gap-1">
                        {plan.preferences.map((pref) => (
                          <span
                            key={pref}
                            className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700"
                          >
                            {pref}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
