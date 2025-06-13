import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Filter, MessageSquare, MoreHorizontal, Search, SlidersHorizontal, Ticket, Clock, AlertCircle, CheckCircle } from "lucide-react"

const mockTickets = [
  {
    id: "T001",
    customer: "Rahul Sharma",
    email: "rahul.s@example.com",
    subject: "Refund request for order #12345",
    description: "I received a damaged item and would like to request a full refund for my recent order.",
    priority: "high",
    status: "open",
    category: "refund",
    createdDate: "2023-06-10",
    lastUpdated: "2023-06-10",
    assignedTo: "Support Team",
  },
  {
    id: "T002",
    customer: "Priya Patel",
    email: "priya.p@example.com",
    subject: "Unable to login to my account",
    description: "I'm having trouble logging into my account. Password reset isn't working properly.",
    priority: "medium",
    status: "in-progress",
    category: "technical",
    createdDate: "2023-06-09",
    lastUpdated: "2023-06-09",
    assignedTo: "Tech Support",
  },
  {
    id: "T003",
    customer: "Vikram Malhotra",
    email: "vikram.m@example.com",
    subject: "Wrong order delivered",
    description: "I ordered Paneer Butter Masala but received Dal Makhani instead. Need this resolved urgently.",
    priority: "high",
    status: "open",
    category: "order-issue",
    createdDate: "2023-06-08",
    lastUpdated: "2023-06-08",
    assignedTo: "Order Support",
  },
  {
    id: "T004",
    customer: "Ananya Singh",
    email: "ananya.s@example.com",
    subject: "Billing inquiry",
    description: "I was charged twice for the same order. Please check and resolve this billing issue.",
    priority: "medium",
    status: "resolved",
    category: "billing",
    createdDate: "2023-06-07",
    lastUpdated: "2023-06-07",
    assignedTo: "Billing Team",
  },
  {
    id: "T005",
    customer: "Karan Mehra",
    email: "karan.m@example.com",
    subject: "Delivery delay complaint",
    description: "My order was supposed to arrive 2 hours ago. This is the third time this has happened.",
    priority: "low",
    status: "closed",
    category: "delivery",
    createdDate: "2023-06-06",
    lastUpdated: "2023-06-06",
    assignedTo: "Delivery Team",
  },
  {
    id: "T006",
    customer: "Neha Gupta",
    email: "neha.g@example.com",
    subject: "Food quality complaint",
    description: "The food I received was stale and had an unusual smell. This is unacceptable quality.",
    priority: "high",
    status: "escalated",
    category: "quality",
    createdDate: "2023-06-05",
    lastUpdated: "2023-06-05",
    assignedTo: "Quality Team",
  },
  {
    id: "T007",
    customer: "Amit Kumar",
    email: "amit.k@example.com",
    subject: "Feature request",
    description: "Could you please add more vegetarian options to the menu? The current selection is limited.",
    priority: "low",
    status: "open",
    category: "feature-request",
    createdDate: "2023-06-04",
    lastUpdated: "2023-06-04",
    assignedTo: "Product Team",
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-50 text-red-700 hover:bg-red-50"
    case "medium":
      return "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
    case "low":
      return "bg-blue-50 text-blue-700 hover:bg-blue-50"
    default:
      return "bg-gray-50 text-gray-700 hover:bg-gray-50"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "open":
      return "bg-orange-50 text-orange-700 hover:bg-orange-50"
    case "in-progress":
      return "bg-blue-50 text-blue-700 hover:bg-blue-50"
    case "resolved":
      return "bg-green-50 text-green-700 hover:bg-green-50"
    case "closed":
      return "bg-gray-50 text-gray-700 hover:bg-gray-50"
    case "escalated":
      return "bg-purple-50 text-purple-700 hover:bg-purple-50"
    default:
      return "bg-gray-50 text-gray-700 hover:bg-gray-50"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "open":
      return <AlertCircle className="h-3 w-3" />
    case "in-progress":
      return <Clock className="h-3 w-3" />
    case "resolved":
      return <CheckCircle className="h-3 w-3" />
    case "closed":
      return <CheckCircle className="h-3 w-3" />
    case "escalated":
      return <AlertCircle className="h-3 w-3" />
    default:
      return <Ticket className="h-3 w-3" />
  }
}

export default function SupportTicketPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground">Manage and resolve customer support requests</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Bulk Reply
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
          <Button>
            <Ticket className="mr-2 h-4 w-4" />
            Create Ticket
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search tickets..." className="w-full bg-white pl-8 shadow-sm" />
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
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <div className="ml-2">
                <div className="text-2xl font-bold">{mockTickets.filter((t) => t.status === "open").length}</div>
                <p className="text-sm text-muted-foreground">Open Tickets</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-500" />
              <div className="ml-2">
                <div className="text-2xl font-bold">{mockTickets.filter((t) => t.status === "in-progress").length}</div>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div className="ml-2">
                <div className="text-2xl font-bold">{mockTickets.filter((t) => t.status === "resolved").length}</div>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div className="ml-2">
                <div className="text-2xl font-bold">{mockTickets.filter((t) => t.priority === "high").length}</div>
                <p className="text-sm text-muted-foreground">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full bg-white shadow-sm">
          <TabsTrigger value="all" className="flex-1">
            All Tickets ({mockTickets.length})
          </TabsTrigger>
          <TabsTrigger value="open" className="flex-1">
            Open ({mockTickets.filter((t) => t.status === "open").length})
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="flex-1">
            In Progress ({mockTickets.filter((t) => t.status === "in-progress").length})
          </TabsTrigger>
          <TabsTrigger value="resolved" className="flex-1">
            Resolved ({mockTickets.filter((t) => t.status === "resolved").length})
          </TabsTrigger>
          <TabsTrigger value="escalated" className="flex-1">
            Escalated ({mockTickets.filter((t) => t.status === "escalated").length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>
                        <div className="font-medium">{ticket.id}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{ticket.customer}</p>
                          <p className="text-sm text-muted-foreground">{ticket.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[250px]">
                        <div>
                          <p className="font-medium truncate">{ticket.subject}</p>
                          <p className="text-sm text-muted-foreground truncate">{ticket.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                          {ticket.priority.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(ticket.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(ticket.status)}
                            {ticket.status.replace("-", " ").toUpperCase()}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="capitalize">{ticket.category.replace("-", " ")}</span>
                      </TableCell>
                      <TableCell>{ticket.assignedTo}</TableCell>
                      <TableCell>{new Date(ticket.createdDate).toLocaleDateString()}</TableCell>
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
                            <DropdownMenuItem>Reply</DropdownMenuItem>
                            <DropdownMenuItem>Assign</DropdownMenuItem>
                            <DropdownMenuItem>Change Status</DropdownMenuItem>
                            <DropdownMenuItem>Escalate</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Close Ticket</DropdownMenuItem>
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
        <TabsContent value="open" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTickets
                    .filter((t) => t.status === "open")
                    .map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          <div className="font-medium">{ticket.id}</div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{ticket.customer}</p>
                            <p className="text-sm text-muted-foreground">{ticket.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[250px]">
                          <div>
                            <p className="font-medium truncate">{ticket.subject}</p>
                            <p className="text-sm text-muted-foreground truncate">{ticket.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                            {ticket.priority.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(ticket.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(ticket.status)}
                              {ticket.status.replace("-", " ").toUpperCase()}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="capitalize">{ticket.category.replace("-", " ")}</span>
                        </TableCell>
                        <TableCell>{ticket.assignedTo}</TableCell>
                        <TableCell>{new Date(ticket.createdDate).toLocaleDateString()}</TableCell>
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
                              <DropdownMenuItem>Reply</DropdownMenuItem>
                              <DropdownMenuItem>Assign</DropdownMenuItem>
                              <DropdownMenuItem>Change Status</DropdownMenuItem>
                              <DropdownMenuItem>Escalate</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Close Ticket</DropdownMenuItem>
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
        <TabsContent value="in-progress" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTickets
                    .filter((t) => t.status === "in-progress")
                    .map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          <div className="font-medium">{ticket.id}</div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{ticket.customer}</p>
                            <p className="text-sm text-muted-foreground">{ticket.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[250px]">
                          <div>
                            <p className="font-medium truncate">{ticket.subject}</p>
                            <p className="text-sm text-muted-foreground truncate">{ticket.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                            {ticket.priority.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(ticket.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(ticket.status)}
                              {ticket.status.replace("-", " ").toUpperCase()}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="capitalize">{ticket.category.replace("-", " ")}</span>
                        </TableCell>
                        <TableCell>{ticket.assignedTo}</TableCell>
                        <TableCell>{new Date(ticket.createdDate).toLocaleDateString()}</TableCell>
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
                              <DropdownMenuItem>Reply</DropdownMenuItem>
                              <DropdownMenuItem>Assign</DropdownMenuItem>
                              <DropdownMenuItem>Change Status</DropdownMenuItem>
                              <DropdownMenuItem>Escalate</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Close Ticket</DropdownMenuItem>
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
        <TabsContent value="resolved" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTickets
                    .filter((t) => t.status === "resolved")
                    .map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          <div className="font-medium">{ticket.id}</div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{ticket.customer}</p>
                            <p className="text-sm text-muted-foreground">{ticket.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[250px]">
                          <div>
                            <p className="font-medium truncate">{ticket.subject}</p>
                            <p className="text-sm text-muted-foreground truncate">{ticket.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                            {ticket.priority.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(ticket.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(ticket.status)}
                              {ticket.status.replace("-", " ").toUpperCase()}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="capitalize">{ticket.category.replace("-", " ")}</span>
                        </TableCell>
                        <TableCell>{ticket.assignedTo}</TableCell>
                        <TableCell>{new Date(ticket.createdDate).toLocaleDateString()}</TableCell>
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
                              <DropdownMenuItem>Reply</DropdownMenuItem>
                              <DropdownMenuItem>Assign</DropdownMenuItem>
                              <DropdownMenuItem>Change Status</DropdownMenuItem>
                              <DropdownMenuItem>Escalate</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Close Ticket</DropdownMenuItem>
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
        <TabsContent value="escalated" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTickets
                    .filter((t) => t.status === "escalated")
                    .map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          <div className="font-medium">{ticket.id}</div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{ticket.customer}</p>
                            <p className="text-sm text-muted-foreground">{ticket.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[250px]">
                          <div>
                            <p className="font-medium truncate">{ticket.subject}</p>
                            <p className="text-sm text-muted-foreground truncate">{ticket.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                            {ticket.priority.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(ticket.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(ticket.status)}
                              {ticket.status.replace("-", " ").toUpperCase()}
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="capitalize">{ticket.category.replace("-", " ")}</span>
                        </TableCell>
                        <TableCell>{ticket.assignedTo}</TableCell>
                        <TableCell>{new Date(ticket.createdDate).toLocaleDateString()}</TableCell>
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
                              <DropdownMenuItem>Reply</DropdownMenuItem>
                              <DropdownMenuItem>Assign</DropdownMenuItem>
                              <DropdownMenuItem>Change Status</DropdownMenuItem>
                              <DropdownMenuItem>Escalate</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Close Ticket</DropdownMenuItem>
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
  )
}
