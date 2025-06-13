import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Filter, MessageSquare, MoreHorizontal, Search, SlidersHorizontal, Star } from "lucide-react"

const mockFeedback = [
  {
    id: "f001",
    customer: "Rahul Sharma",
    email: "rahul.s@example.com",
    rating: 5,
    comment: "The food was absolutely delicious! Perfectly spiced and arrived hot. Will definitely order again.",
    date: "2023-06-10",
    mealName: "Paneer Butter Masala",
    status: "published",
  },
  {
    id: "f002",
    customer: "Priya Patel",
    email: "priya.p@example.com",
    rating: 4,
    comment: "Great taste and portion size. Delivery was a bit delayed though.",
    date: "2023-06-09",
    mealName: "Veg Biryani",
    status: "published",
  },
  {
    id: "f003",
    customer: "Vikram Malhotra",
    email: "vikram.m@example.com",
    rating: 2,
    comment: "The food was cold when it arrived. Taste was okay but not great.",
    date: "2023-06-08",
    mealName: "Dal Makhani",
    status: "flagged",
  },
  {
    id: "f004",
    customer: "Ananya Singh",
    email: "ananya.s@example.com",
    rating: 5,
    comment: "Absolutely loved the flavors! The packaging was also eco-friendly which I appreciate.",
    date: "2023-06-07",
    mealName: "Chole Bhature",
    status: "published",
  },
  {
    id: "f005",
    customer: "Karan Mehra",
    email: "karan.m@example.com",
    rating: 3,
    comment: "Average taste. Nothing special but not bad either.",
    date: "2023-06-06",
    mealName: "Aloo Paratha",
    status: "published",
  },
  {
    id: "f006",
    customer: "Neha Gupta",
    email: "neha.g@example.com",
    rating: 1,
    comment: "Very disappointed with the quality. The food was stale and had a strange smell.",
    date: "2023-06-05",
    mealName: "Rajma Chawal",
    status: "flagged",
  },
  {
    id: "f007",
    customer: "Amit Kumar",
    email: "amit.k@example.com",
    rating: 4,
    comment: "Tasty food and prompt delivery. Would recommend to friends.",
    date: "2023-06-04",
    mealName: "Kadai Paneer",
    status: "published",
  },
]

export default function FeedbackPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customer Feedback</h1>
          <p className="text-muted-foreground">Manage and analyze customer reviews and ratings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Respond
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Export</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search feedback..." className="w-full bg-white pl-8 shadow-sm" />
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">4.2</div>
            <div className="flex items-center">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="h-4 w-4 fill-orange-400 text-orange-400" />
              ))}
              <Star className="h-4 w-4 fill-orange-400 text-orange-400 fill-opacity-50" />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{mockFeedback.length}</div>
            <p className="mt-2 text-sm text-muted-foreground">Total Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{mockFeedback.filter((f) => f.rating >= 4).length}</div>
            <p className="mt-2 text-sm text-muted-foreground">Positive Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{mockFeedback.filter((f) => f.rating <= 2).length}</div>
            <p className="mt-2 text-sm text-muted-foreground">Negative Reviews</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full bg-white shadow-sm">
          <TabsTrigger value="all" className="flex-1">
            All Feedback ({mockFeedback.length})
          </TabsTrigger>
          <TabsTrigger value="positive" className="flex-1">
            Positive ({mockFeedback.filter((f) => f.rating >= 4).length})
          </TabsTrigger>
          <TabsTrigger value="neutral" className="flex-1">
            Neutral ({mockFeedback.filter((f) => f.rating === 3).length})
          </TabsTrigger>
          <TabsTrigger value="negative" className="flex-1">
            Negative ({mockFeedback.filter((f) => f.rating <= 2).length})
          </TabsTrigger>
          <TabsTrigger value="flagged" className="flex-1">
            Flagged ({mockFeedback.filter((f) => f.status === "flagged").length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Meal</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFeedback.map((feedback) => (
                    <TableRow key={feedback.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{feedback.customer}</p>
                          <p className="text-sm text-muted-foreground">{feedback.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < feedback.rating ? "fill-orange-400 text-orange-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        <p className="truncate">{feedback.comment}</p>
                      </TableCell>
                      <TableCell>{feedback.mealName}</TableCell>
                      <TableCell>{new Date(feedback.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={feedback.status === "published" ? "outline" : "destructive"}
                          className={
                            feedback.status === "published" ? "bg-green-50 text-green-700 hover:bg-green-50" : ""
                          }
                        >
                          {feedback.status}
                        </Badge>
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
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Respond</DropdownMenuItem>
                            <DropdownMenuItem>Flag Review</DropdownMenuItem>
                            <DropdownMenuItem>Hide Review</DropdownMenuItem>
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
        <TabsContent value="positive">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Meal</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFeedback
                    .filter((f) => f.rating >= 4)
                    .map((feedback) => (
                      <TableRow key={feedback.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{feedback.customer}</p>
                            <p className="text-sm text-muted-foreground">{feedback.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < feedback.rating ? "fill-orange-400 text-orange-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[300px]">
                          <p className="truncate">{feedback.comment}</p>
                        </TableCell>
                        <TableCell>{feedback.mealName}</TableCell>
                        <TableCell>{new Date(feedback.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={feedback.status === "published" ? "outline" : "destructive"}
                            className={
                              feedback.status === "published" ? "bg-green-50 text-green-700 hover:bg-green-50" : ""
                            }
                          >
                            {feedback.status}
                          </Badge>
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
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Respond</DropdownMenuItem>
                              <DropdownMenuItem>Flag Review</DropdownMenuItem>
                              <DropdownMenuItem>Hide Review</DropdownMenuItem>
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
        {/* Similar content for other tabs */}
      </Tabs>
    </div>
  )
}
