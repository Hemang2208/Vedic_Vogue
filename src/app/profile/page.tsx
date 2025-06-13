"use client"

import { useState } from "react"
import { Navigation } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { VVButton } from "@/components/ui/vv-button"
import { VVCard, VVCardContent, VVCardHeader, VVCardTitle } from "@/components/ui/vv-card"
import { VVInput } from "@/components/ui/vv-input"
import { VVBadge } from "@/components/ui/vv-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import Link from "next/link"
import { User, Mail, Phone, MapPin, Settings, Camera, Edit, Save, Star } from "lucide-react"

const userProfile = {
  name: "Priya Sharma",
  email: "priya.sharma@email.com",
  phone: "+91 98765 43210",
  avatar: "/placeholder.svg?height=100&width=100",
  memberSince: "January 2024",
  totalOrders: 45,
  favoriteCategory: "Vegetarian",
  rating: 4.8,
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(userProfile)

  const handleSave = () => {
    setIsEditing(false)
    // In a real app, save to backend
    console.log("Saving profile:", profileData)
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </motion.div>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="preferences" asChild>
                <Link href="/profile/preferences">Preferences</Link>
              </TabsTrigger>
              <TabsTrigger value="address" asChild>
                <Link href="/profile/address">Address</Link>
              </TabsTrigger>
              <TabsTrigger value="security" asChild>
                <Link href="/profile/security">Security</Link>
              </TabsTrigger>
            </TabsList>

            {/* Personal Information */}
            <TabsContent value="personal">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <VVCard>
                  <VVCardHeader>
                    <div className="flex items-center justify-between">
                      <VVCardTitle>Personal Information</VVCardTitle>
                      <VVButton
                        variant={isEditing ? "default" : "outline"}
                        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                      >
                        {isEditing ? (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        ) : (
                          <>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                          </>
                        )}
                      </VVButton>
                    </div>
                  </VVCardHeader>
                  <VVCardContent className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-lg">
                            {profileData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <VVButton
                            size="icon"
                            variant="outline"
                            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                          >
                            <Camera className="h-4 w-4" />
                          </VVButton>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{profileData.name}</h3>
                        <p className="text-muted-foreground">{profileData.email}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <VVBadge variant="secondary">Premium Member</VVBadge>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{profileData.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <VVInput
                        label="Full Name"
                        value={profileData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        disabled={!isEditing}
                        leftIcon={<User className="h-4 w-4" />}
                      />

                      <VVInput
                        label="Email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={!isEditing}
                        leftIcon={<Mail className="h-4 w-4" />}
                      />

                      <VVInput
                        label="Phone Number"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={!isEditing}
                        leftIcon={<Phone className="h-4 w-4" />}
                      />

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Member Since</label>
                        <div className="p-3 bg-muted/50 rounded-md text-sm text-muted-foreground">
                          {profileData.memberSince}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{profileData.totalOrders}</div>
                        <div className="text-sm text-muted-foreground">Total Orders</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{profileData.rating}</div>
                        <div className="text-sm text-muted-foreground">Average Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{profileData.favoriteCategory}</div>
                        <div className="text-sm text-muted-foreground">Favorite Category</div>
                      </div>
                    </div>
                  </VVCardContent>
                </VVCard>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <VVCard>
              <VVCardHeader>
                <VVCardTitle>Quick Actions</VVCardTitle>
              </VVCardHeader>
              <VVCardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <VVButton variant="outline" className="h-auto p-4 flex-col" asChild>
                    <Link href="/profile/preferences">
                      <Settings className="h-6 w-6 mb-2" />
                      <span className="text-sm">Preferences</span>
                    </Link>
                  </VVButton>
                  <VVButton variant="outline" className="h-auto p-4 flex-col" asChild>
                    <Link href="/profile/address">
                      <MapPin className="h-6 w-6 mb-2" />
                      <span className="text-sm">Addresses</span>
                    </Link>
                  </VVButton>
                  <VVButton variant="outline" className="h-auto p-4 flex-col" asChild>
                    <Link href="/orders">
                      <User className="h-6 w-6 mb-2" />
                      <span className="text-sm">My Orders</span>
                    </Link>
                  </VVButton>
                  <VVButton variant="outline" className="h-auto p-4 flex-col" asChild>
                    <Link href="/profile/security">
                      <Settings className="h-6 w-6 mb-2" />
                      <span className="text-sm">Security</span>
                    </Link>
                  </VVButton>
                </div>
              </VVCardContent>
            </VVCard>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
