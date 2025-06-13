"use client"

import { useState, useMemo } from "react"
import { Eye, Filter, Search, Download, Clock, FileText, Users, Calendar, ChevronDown, ChevronRight, AlertCircle, CheckCircle } from "lucide-react"
import { VVCard } from "@/components/ui/vv-card"
import { VVButton } from "@/components/ui/vv-button"
import { VVBadge } from "@/components/ui/vv-badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock changelog data with enhanced structure
const mockChangelog = [
  {
    id: "CHG001",
    document: "Privacy Policy",
    version: "2.1",
    previousVersion: "2.0",
    changeType: "Major Update",
    summary: "Updated data collection practices and added GDPR compliance",
    changedBy: "Legal Team",
    changeDate: "2024-01-15",
    changeTime: "14:30",
    status: "Published",
    priority: "High",
    impact: "High",
    changes: [
      "Added section on GDPR compliance",
      "Updated data retention policies",
      "Clarified cookie usage",
      "Added user rights section",
    ],
    affectedSections: ["Data Collection", "User Rights", "Cookies"],
    reviewedBy: "Admin",
    publishedDate: "2024-01-15",
    approvalDate: "2024-01-15",
    changeReason: "Regulatory compliance requirement",
    notifications: 1250,
    changelog: "Enhanced privacy protection and compliance with European regulations",
  },
  {
    id: "CHG002",
    document: "Terms of Service",
    version: "1.8",
    previousVersion: "1.7",
    changeType: "Minor Update",
    summary: "Updated delivery terms and cancellation policy",
    changedBy: "Operations Team",
    changeDate: "2024-01-10",
    changeTime: "11:15",
    status: "Published",
    priority: "Medium",
    impact: "Medium",
    changes: [
      "Updated delivery time windows",
      "Modified cancellation policy",
      "Added no-show policy",
      "Updated refund processing time",
    ],
    affectedSections: ["Delivery", "Cancellation", "Refunds"],
    reviewedBy: "Admin",
    publishedDate: "2024-01-10",
    approvalDate: "2024-01-10",
    changeReason: "Operational improvement",
    notifications: 850,
    changelog: "Improved delivery and cancellation processes for better user experience",
  },
  {
    id: "CHG003",
    document: "About Us",
    version: "1.3",
    previousVersion: "1.2",
    changeType: "Content Update",
    summary: "Updated team information and certifications",
    changedBy: "Marketing Team",
    changeDate: "2024-01-05",
    changeTime: "16:45",
    status: "Published",
    priority: "Low",
    impact: "Low",
    changes: [
      "Added new team members",
      "Updated certification information",
      "Revised company mission",
      "Added sustainability section",
    ],
    affectedSections: ["Team", "Certifications", "Mission"],
    reviewedBy: "Admin",
    publishedDate: "2024-01-05",
    approvalDate: "2024-01-05",
    changeReason: "Regular content update",
    notifications: 320,
    changelog: "Refreshed company information and team details",
  },
  {
    id: "CHG004",
    document: "Privacy Policy",
    version: "2.2",
    previousVersion: "2.1",
    changeType: "Draft",
    summary: "Proposed updates for new data processing requirements",
    changedBy: "Legal Team",
    changeDate: "2024-01-20",
    changeTime: "09:30",
    status: "Draft",
    priority: "High",
    impact: "High",
    changes: [
      "Added AI data processing section",
      "Updated third-party integrations",
      "Enhanced security measures",
      "Added data portability rights",
    ],
    affectedSections: ["Data Processing", "Security", "User Rights"],
    reviewedBy: "Pending",
    publishedDate: null,
    approvalDate: null,
    changeReason: "AI compliance requirements",
    notifications: 0,
    changelog: "Preparing for new AI data processing regulations",
  },
  {
    id: "CHG005",
    document: "Cookie Policy",
    version: "1.5",
    previousVersion: "1.4",
    changeType: "Minor Update",
    summary: "Updated cookie categories and opt-out procedures",
    changedBy: "Legal Team",
    changeDate: "2024-01-08",
    changeTime: "10:20",
    status: "Under Review",
    priority: "Medium",
    impact: "Medium",
    changes: [
      "Added performance cookie category",
      "Updated opt-out instructions",
      "Clarified third-party cookies",
      "Added cookie duration details",
    ],
    affectedSections: ["Cookie Categories", "Opt-out", "Third-party"],
    reviewedBy: "In Progress",
    publishedDate: null,
    approvalDate: null,
    changeReason: "User feedback incorporation",
    notifications: 0,
    changelog: "Improving cookie transparency and user control",
  },
]

const documentTypes = ["Privacy Policy", "Terms of Service", "About Us", "Cookie Policy"]
const statusTypes = ["Published", "Draft", "Under Review", "Pending"]
const changeTypes = ["Major Update", "Minor Update", "Content Update", "Draft"]

export default function ChangeLogPage() {
  const [selectedDocument, setSelectedDocument] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedChangeType, setSelectedChangeType] = useState("all")  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedChange, setSelectedChange] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [viewMode, setViewMode] = useState("table")
  const [expandedCards, setExpandedCards] = useState<string[]>([])

  const filteredAndSortedChanges = useMemo(() => {
    const filtered = mockChangelog.filter((change) => {
      const matchesDocument = selectedDocument === "all" || change.document === selectedDocument
      const matchesStatus = selectedStatus === "all" || change.status.toLowerCase() === selectedStatus
      const matchesChangeType = selectedChangeType === "all" || change.changeType === selectedChangeType
      const matchesSearch = searchQuery === "" || 
        change.document.toLowerCase().includes(searchQuery.toLowerCase()) ||
        change.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        change.changedBy.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesDocument && matchesStatus && matchesChangeType && matchesSearch
    })

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case "date":
          aValue = new Date(a.changeDate).getTime()
          bValue = new Date(b.changeDate).getTime()
          break
        case "document":
          aValue = a.document.toLowerCase()
          bValue = b.document.toLowerCase()
          break
        case "version":
          aValue = parseFloat(a.version)
          bValue = parseFloat(b.version)
          break
        case "priority":
          const priorityOrder = { "High": 3, "Medium": 2, "Low": 1 }
          aValue = priorityOrder[a.priority as keyof typeof priorityOrder] || 0
          bValue = priorityOrder[b.priority as keyof typeof priorityOrder] || 0
          break
        default:
          aValue = a.changeDate
          bValue = b.changeDate
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [selectedDocument, selectedStatus, selectedChangeType, searchQuery, sortBy, sortOrder])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "published": return "success"
      case "draft": return "warning"
      case "under review": return "secondary"
      case "pending": return "destructive"
      default: return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "published": return <CheckCircle className="h-4 w-4" />
      case "draft": return <FileText className="h-4 w-4" />
      case "under review": return <Clock className="h-4 w-4" />
      case "pending": return <AlertCircle className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getChangeTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "major update": return "destructive"
      case "minor update": return "warning"
      case "content update": return "secondary"
      case "draft": return "outline"
      default: return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "destructive"
      case "medium": return "warning"
      case "low": return "secondary"
      default: return "secondary"
    }
  }

  const toggleCardExpansion = (id: string) => {
    setExpandedCards(prev => 
      prev.includes(id) 
        ? prev.filter(cardId => cardId !== id)
        : [...prev, id]
    )
  }

  const exportChangelog = () => {
    const dataStr = JSON.stringify(filteredAndSortedChanges, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `changelog-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const stats = {
    total: mockChangelog.length,
    published: mockChangelog.filter(c => c.status === "Published").length,
    draft: mockChangelog.filter(c => c.status === "Draft").length,
    pending: mockChangelog.filter(c => c.status === "Under Review" || c.status === "Pending").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
              Legal Document Change Log
            </h1>
            <p className="text-lg text-gray-600">
              Track, monitor, and manage all changes to legal documents with comprehensive audit trails
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <VVButton 
              variant="outline" 
              onClick={exportChangelog}
              className="bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Log
            </VVButton>
            <VVButton className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
              <FileText className="h-4 w-4 mr-2" />
              New Change Request
            </VVButton>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <VVCard className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-700 text-sm font-medium">Total Changes</p>
                  <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </VVCard>

          <VVCard className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-700 text-sm font-medium">Published</p>
                  <p className="text-3xl font-bold text-green-900">{stats.published}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </VVCard>

          <VVCard className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-yellow-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-700 text-sm font-medium">Draft</p>
                  <p className="text-3xl font-bold text-yellow-900">{stats.draft}</p>
                </div>
                <FileText className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </VVCard>

          <VVCard className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-700 text-sm font-medium">Pending Review</p>
                  <p className="text-3xl font-bold text-orange-900">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </VVCard>
        </div>

        {/* Filters and Search */}
        <VVCard className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <div className="p-6 space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex items-center gap-3">
                <Filter className="h-5 w-5 text-indigo-600" />
                <span className="text-lg font-semibold text-gray-800">Filters & Search</span>
              </div>
              
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search changes, documents, or team members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/70 border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                <SelectTrigger className="bg-white/70 border-gray-200">
                  <SelectValue placeholder="All Documents" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Documents</SelectItem>
                  {documentTypes.map(doc => (
                    <SelectItem key={doc} value={doc}>{doc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="bg-white/70 border-gray-200">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statusTypes.map(status => (
                    <SelectItem key={status} value={status.toLowerCase()}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedChangeType} onValueChange={setSelectedChangeType}>
                <SelectTrigger className="bg-white/70 border-gray-200">
                  <SelectValue placeholder="All Change Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Change Types</SelectItem>
                  {changeTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-white/70 border-gray-200">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="version">Version</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="bg-white/70 border-gray-200">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Newest First</SelectItem>
                  <SelectItem value="asc">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </VVCard>

        {/* View Toggle */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            Showing {filteredAndSortedChanges.length} of {mockChangelog.length} changes
          </p>
          <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto">
            <TabsList className="bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="cards">Card View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        <Tabs value={viewMode} onValueChange={setViewMode}>
          <TabsContent value="table" className="space-y-0">
            <VVCard className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50/30">
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Document & Version</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Type & Priority</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Summary</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Team & Review</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Date & Time</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedChanges.map((change) => (
                      <tr key={change.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/20 transition-all duration-200">
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="font-semibold text-gray-900 text-lg">{change.document}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                              <span className="bg-gray-100 px-2 py-1 rounded text-xs">v{change.previousVersion}</span>
                              <span>→</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">v{change.version}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-2">
                            <VVBadge variant={getChangeTypeColor(change.changeType)}>{change.changeType}</VVBadge>
                            <VVBadge variant={getPriorityColor(change.priority)} className="ml-2">{change.priority}</VVBadge>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="max-w-xs space-y-2">
                            <p className="text-sm text-gray-900 font-medium line-clamp-2">{change.summary}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {change.changes.length} changes in {change.affectedSections.length} sections
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm space-y-1">
                            <div className="flex items-center gap-2">
                              <Users className="h-3 w-3 text-gray-400" />
                              <span className="text-gray-900 font-medium">{change.changedBy}</span>
                            </div>
                            <div className="text-gray-500 text-xs">Reviewed by: {change.reviewedBy}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm space-y-1">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span className="text-gray-900">{change.changeDate}</span>
                            </div>
                            <div className="text-gray-500 text-xs flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {change.changeTime}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(change.status)}
                            <VVBadge variant={getStatusColor(change.status)}>{change.status}</VVBadge>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Dialog>
                            <DialogTrigger asChild>
                              <VVButton 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedChange(change)}
                                className="bg-white/80 hover:bg-white shadow-sm"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </VVButton>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-900">
                                  Change Details - {change.document} v{change.version}
                                </DialogTitle>
                              </DialogHeader>
                              {selectedChange && (
                                <div className="space-y-8 p-2">
                                  {/* Header Info */}
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                                    <div className="text-center">
                                      <div className="text-2xl font-bold text-gray-900">{selectedChange.document}</div>
                                      <div className="text-sm text-gray-600 mt-1">Document Name</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-2xl font-bold text-blue-600">v{selectedChange.version}</div>
                                      <div className="text-sm text-gray-600 mt-1">Current Version</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="flex items-center justify-center gap-2">
                                        {getStatusIcon(selectedChange.status)}
                                        <VVBadge variant={getStatusColor(selectedChange.status)} className="text-sm px-3 py-1">
                                          {selectedChange.status}
                                        </VVBadge>
                                      </div>
                                      <div className="text-sm text-gray-600 mt-1">Current Status</div>
                                    </div>
                                  </div>

                                  {/* Key Information */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                      <label className="text-sm font-semibold text-gray-700">Version Change</label>
                                      <div className="flex items-center gap-2">
                                        <span className="bg-gray-100 px-3 py-1 rounded-md text-sm">v{selectedChange.previousVersion}</span>
                                        <span className="text-gray-400">→</span>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-medium">v{selectedChange.version}</span>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-semibold text-gray-700">Change Type</label>
                                      <VVBadge variant={getChangeTypeColor(selectedChange.changeType)} className="text-sm px-3 py-1">
                                        {selectedChange.changeType}
                                      </VVBadge>
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-semibold text-gray-700">Priority</label>
                                      <VVBadge variant={getPriorityColor(selectedChange.priority)} className="text-sm px-3 py-1">
                                        {selectedChange.priority}
                                      </VVBadge>
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-semibold text-gray-700">Changed By</label>
                                      <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-900">{selectedChange.changedBy}</span>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-semibold text-gray-700">Change Date</label>
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-900">{selectedChange.changeDate} at {selectedChange.changeTime}</span>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-semibold text-gray-700">Impact Level</label>
                                      <VVBadge variant={getPriorityColor(selectedChange.impact)} className="text-sm px-3 py-1">
                                        {selectedChange.impact} Impact
                                      </VVBadge>
                                    </div>
                                  </div>
                                  
                                  {/* Summary */}
                                  <div className="space-y-3">
                                    <label className="text-lg font-semibold text-gray-800">Summary</label>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                      <p className="text-gray-900 leading-relaxed">{selectedChange.summary}</p>
                                    </div>
                                  </div>

                                  {/* Change Reason */}
                                  <div className="space-y-3">
                                    <label className="text-lg font-semibold text-gray-800">Change Reason</label>
                                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                                      <p className="text-gray-900">{selectedChange.changeReason}</p>
                                    </div>
                                  </div>
                                  
                                  {/* Detailed Changes */}
                                  <div className="space-y-3">
                                    <label className="text-lg font-semibold text-gray-800">Detailed Changes</label>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                      <ul className="space-y-3">
                                        {selectedChange.changes.map((change: string, index: number) => (
                                          <li key={index} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                                              <CheckCircle className="h-3 w-3 text-green-600" />
                                            </div>
                                            <span className="text-gray-900 leading-relaxed">{change}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                  
                                  {/* Affected Sections */}
                                  <div className="space-y-3">
                                    <label className="text-lg font-semibold text-gray-800">Affected Sections</label>
                                    <div className="flex flex-wrap gap-2">
                                      {selectedChange.affectedSections.map((section: string, index: number) => (
                                        <VVBadge key={index} variant="outline" className="px-3 py-1 bg-blue-50 border-blue-200 text-blue-800">
                                          {section}
                                        </VVBadge>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Timeline */}
                                  <div className="space-y-3">
                                    <label className="text-lg font-semibold text-gray-800">Timeline</label>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                      <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                          <div className="flex-1">
                                            <div className="font-medium text-gray-900">Change Created</div>
                                            <div className="text-sm text-gray-600">{selectedChange.changeDate} at {selectedChange.changeTime}</div>
                                          </div>
                                        </div>
                                        {selectedChange.approvalDate && (
                                          <div className="flex items-center gap-4">
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <div className="flex-1">
                                              <div className="font-medium text-gray-900">Approved</div>
                                              <div className="text-sm text-gray-600">{selectedChange.approvalDate}</div>
                                            </div>
                                          </div>
                                        )}
                                        {selectedChange.publishedDate && (
                                          <div className="flex items-center gap-4">
                                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                            <div className="flex-1">
                                              <div className="font-medium text-gray-900">Published</div>
                                              <div className="text-sm text-gray-600">{selectedChange.publishedDate}</div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Notifications */}
                                  {selectedChange.notifications > 0 && (
                                    <div className="space-y-3">
                                      <label className="text-lg font-semibold text-gray-800">User Notifications</label>
                                      <div className="bg-indigo-50 p-4 rounded-lg flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                          <Users className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div>
                                          <div className="font-semibold text-indigo-900">{selectedChange.notifications.toLocaleString()} users notified</div>
                                          <div className="text-sm text-indigo-700">About this change</div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Action Buttons */}
                                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                                    <VVButton variant="outline" className="bg-white hover:bg-gray-50">
                                      <FileText className="h-4 w-4 mr-2" />
                                      View Document
                                    </VVButton>
                                    <VVButton variant="outline" className="bg-white hover:bg-gray-50">
                                      <Download className="h-4 w-4 mr-2" />
                                      Download Changes
                                    </VVButton>
                                    {selectedChange.status === "Draft" && (
                                      <VVButton className="bg-blue-600 hover:bg-blue-700 text-white">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Approve Changes
                                      </VVButton>
                                    )}
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </VVCard>
          </TabsContent>

          <TabsContent value="cards" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedChanges.map((change) => (
                <VVCard 
                  key={change.id} 
                  className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500"
                >
                  <div className="p-6 space-y-4">
                    {/* Card Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{change.document}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">v{change.previousVersion}</span>
                          <span className="text-gray-400">→</span>
                          <VVBadge variant="secondary" className="text-xs">v{change.version}</VVBadge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(change.status)}
                        <VVBadge variant={getStatusColor(change.status)} className="text-xs">
                          {change.status}
                        </VVBadge>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <VVBadge variant={getChangeTypeColor(change.changeType)} className="text-xs">
                        {change.changeType}
                      </VVBadge>
                      <VVBadge variant={getPriorityColor(change.priority)} className="text-xs">
                        {change.priority}
                      </VVBadge>
                    </div>

                    {/* Summary */}
                    <p className="text-sm text-gray-700 line-clamp-2">{change.summary}</p>

                    {/* Expandable Details */}
                    <div className="space-y-3">
                      <button
                        onClick={() => toggleCardExpansion(change.id)}
                        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {expandedCards.includes(change.id) ? (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronRight className="h-4 w-4" />
                            Show Details
                          </>
                        )}
                      </button>

                      {expandedCards.includes(change.id) && (
                        <div className="space-y-3 pl-4 border-l-2 border-gray-100">
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Changes:</span>
                            <ul className="mt-1 space-y-1">
                              {change.changes.slice(0, 3).map((changeItem, index) => (
                                <li key={index} className="text-gray-600 text-xs flex items-start gap-2">
                                  <span className="text-green-500 mt-1">•</span>
                                  {changeItem}
                                </li>
                              ))}
                              {change.changes.length > 3 && (
                                <li className="text-blue-600 text-xs">+{change.changes.length - 3} more changes</li>
                              )}
                            </ul>
                          </div>
                          
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Affected Sections:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {change.affectedSections.map((section, index) => (
                                <VVBadge key={index} variant="outline" className="text-xs">
                                  {section}
                                </VVBadge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer Info */}
                    <div className="pt-3 border-t border-gray-100 space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {change.changedBy}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {change.changeDate}
                        </div>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <VVButton 
                            variant="outline" 
                            size="sm" 
                            className="w-full bg-white/80 hover:bg-white"
                            onClick={() => setSelectedChange(change)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Full Details
                          </VVButton>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-gray-900">
                              Change Details - {change.document} v{change.version}
                            </DialogTitle>
                          </DialogHeader>
                          {selectedChange && (
                            <div className="space-y-8 p-2">
                              {/* Same detailed dialog content as in table view */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-gray-900">{selectedChange.document}</div>
                                  <div className="text-sm text-gray-600 mt-1">Document Name</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-blue-600">v{selectedChange.version}</div>
                                  <div className="text-sm text-gray-600 mt-1">Current Version</div>
                                </div>
                                <div className="text-center">
                                  <div className="flex items-center justify-center gap-2">
                                    {getStatusIcon(selectedChange.status)}
                                    <VVBadge variant={getStatusColor(selectedChange.status)} className="text-sm px-3 py-1">
                                      {selectedChange.status}
                                    </VVBadge>
                                  </div>
                                  <div className="text-sm text-gray-600 mt-1">Current Status</div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                  <label className="text-sm font-semibold text-gray-700">Version Change</label>
                                  <div className="flex items-center gap-2">
                                    <span className="bg-gray-100 px-3 py-1 rounded-md text-sm">v{selectedChange.previousVersion}</span>
                                    <span className="text-gray-400">→</span>
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-medium">v{selectedChange.version}</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-semibold text-gray-700">Change Type</label>
                                  <VVBadge variant={getChangeTypeColor(selectedChange.changeType)} className="text-sm px-3 py-1">
                                    {selectedChange.changeType}
                                  </VVBadge>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-semibold text-gray-700">Priority</label>
                                  <VVBadge variant={getPriorityColor(selectedChange.priority)} className="text-sm px-3 py-1">
                                    {selectedChange.priority}
                                  </VVBadge>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <label className="text-lg font-semibold text-gray-800">Summary</label>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="text-gray-900 leading-relaxed">{selectedChange.summary}</p>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <label className="text-lg font-semibold text-gray-800">Detailed Changes</label>
                                <div className="bg-green-50 p-4 rounded-lg">
                                  <ul className="space-y-3">
                                    {selectedChange.changes.map((changeItem: string, index: number) => (
                                      <li key={index} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                                          <CheckCircle className="h-3 w-3 text-green-600" />
                                        </div>
                                        <span className="text-gray-900 leading-relaxed">{changeItem}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                                <VVButton variant="outline" className="bg-white hover:bg-gray-50">
                                  <FileText className="h-4 w-4 mr-2" />
                                  View Document
                                </VVButton>
                                <VVButton variant="outline" className="bg-white hover:bg-gray-50">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Changes
                                </VVButton>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </VVCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {filteredAndSortedChanges.length === 0 && (
          <VVCard className="bg-white/90 backdrop-blur-sm shadow-lg">
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Changes Found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search criteria to find the changes you&apos;re looking for.
              </p>
              <VVButton 
                variant="outline" 
                onClick={() => {
                  setSelectedDocument("all")
                  setSelectedStatus("all")
                  setSelectedChangeType("all")
                  setSearchQuery("")
                }}
                className="bg-white hover:bg-gray-50"
              >
                Clear All Filters
              </VVButton>
            </div>
          </VVCard>
        )}
      </div>
    </div>
  )
}