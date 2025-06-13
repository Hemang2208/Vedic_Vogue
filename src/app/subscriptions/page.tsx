"use client"

import { useState } from "react"
import { Navigation } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import Link from "next/link"
import { Check, Clock, Users, Zap, ArrowRight } from "lucide-react"

const subscriptionPlans = [
  {
    id: "daily-flexi",
    name: "Daily Flexi",
    description: "Perfect for trying out our service",
    price: 150,
    originalPrice: 180,
    duration: "per meal",
    badge: "Flexible",
    badgeColor: "bg-blue-500",
    popular: false,
    features: ["Order on-demand", "No commitment", "Same day delivery", "Cancel anytime", "All meal types available"],
    savings: "0%",
    bestFor: "First-time users, occasional orders",
  },
  {
    id: "weekly-basic",
    name: "Weekly Basic",
    description: "Great for office-goers",
    price: 135,
    originalPrice: 150,
    duration: "per meal",
    badge: "Popular",
    badgeColor: "bg-green-500",
    popular: true,
    features: ["5-7 meals per week", "10% discount", "Skip weekends option", "Consistent schedule", "Priority support"],
    savings: "10%",
    bestFor: "Working professionals, students",
  },
  {
    id: "weekly-pro",
    name: "Weekly Pro",
    description: "Complete nutrition solution",
    price: 128,
    originalPrice: 150,
    duration: "per meal",
    badge: "Complete",
    badgeColor: "bg-purple-500",
    popular: false,
    features: [
      "12-14 meals per week",
      "15% discount",
      "Breakfast + Lunch + Dinner",
      "Customizable menu",
      "Free add-ons",
    ],
    savings: "15%",
    bestFor: "Busy professionals, families",
  },
  {
    id: "monthly-premium",
    name: "Monthly Premium",
    description: "Best value for regular users",
    price: 112,
    originalPrice: 150,
    duration: "per meal",
    badge: "Best Value",
    badgeColor: "bg-orange-500",
    popular: false,
    features: [
      "60+ meals per month",
      "25% discount",
      "All meal types included",
      "Premium ingredients",
      "Dedicated support",
      "Free delivery",
    ],
    savings: "25%",
    bestFor: "Regular subscribers, health enthusiasts",
  },
]

const mealTypes = [
  {
    id: "vegetarian",
    name: "Vegetarian",
    description: "Pure vegetarian meals with authentic flavors",
    icon: "🥬",
    plans: ["daily-flexi", "weekly-basic", "weekly-pro", "monthly-premium"],
  },
  {
    id: "fitness",
    name: "Fitness",
    description: "High-protein, calorie-smart nutrition",
    icon: "💪",
    plans: ["daily-flexi", "weekly-pro", "monthly-premium"],
  },
  {
    id: "office-light",
    name: "Office Light",
    description: "Light, easily digestible meals for work",
    icon: "💼",
    plans: ["daily-flexi", "weekly-basic", "weekly-pro"],
  },
  {
    id: "diet-special",
    name: "Diet Special",
    description: "Keto, diabetic-friendly, specialized diets",
    icon: "🎯",
    plans: ["weekly-pro", "monthly-premium"],
  },
]

export default function SubscriptionsPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [selectedMealType, setSelectedMealType] = useState("vegetarian")

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Subscription Plans</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan that fits your lifestyle and budget. All plans include fresh, authentic meals
            delivered to your doorstep.
          </p>
        </motion.div>

        <Tabs defaultValue="plans" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
            <TabsTrigger value="meal-types">Meal Types</TabsTrigger>
          </TabsList>

          {/* Subscription Plans */}
          <TabsContent value="plans">
            <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {subscriptionPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${
                      plan.popular ? "ring-2 ring-primary scale-105" : ""
                    } ${selectedPlan === plan.id ? "ring-2 ring-blue-500" : ""}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-2 text-sm font-medium">
                        Most Popular
                      </div>
                    )}

                    <div className={`h-2 ${plan.badgeColor}`}></div>

                    <CardHeader className={plan.popular ? "pt-8" : ""}>
                      <div className="flex items-center justify-between">
                        <Badge className={`${plan.badgeColor} text-white`}>{plan.badge}</Badge>
                        {plan.savings !== "0%" && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Save {plan.savings}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <p className="text-muted-foreground text-sm">{plan.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-3xl font-bold text-primary">₹{plan.price}</span>
                          <span className="text-lg text-muted-foreground line-through">₹{plan.originalPrice}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{plan.duration}</p>
                      </div>

                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="space-y-3">
                        <div className="text-xs text-muted-foreground">
                          <strong>Best for:</strong> {plan.bestFor}
                        </div>

                        <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                          <Link href={`/subscriptions/details/${plan.id}`}>
                            Choose Plan
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Comparison Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Plan Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3">Features</th>
                          {subscriptionPlans.map((plan) => (
                            <th key={plan.id} className="text-center py-3 min-w-32">
                              {plan.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { feature: "Price per meal", values: subscriptionPlans.map((p) => `₹${p.price}`) },
                          { feature: "Discount", values: subscriptionPlans.map((p) => p.savings) },
                          { feature: "Flexibility", values: ["High", "Medium", "Medium", "Low"] },
                          { feature: "Commitment", values: ["None", "1 Week", "1 Week", "1 Month"] },
                          { feature: "Free Delivery", values: ["❌", "✅", "✅", "✅"] },
                          { feature: "Priority Support", values: ["❌", "✅", "✅", "✅"] },
                          { feature: "Custom Menu", values: ["❌", "❌", "✅", "✅"] },
                        ].map((row, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 font-medium">{row.feature}</td>
                            {row.values.map((value, i) => (
                              <td key={i} className="text-center py-3">
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Meal Types */}
          <TabsContent value="meal-types">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mealTypes.map((mealType, index) => (
                <motion.div
                  key={mealType.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`cursor-pointer hover:shadow-lg transition-all duration-300 ${
                      selectedMealType === mealType.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedMealType(mealType.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">{mealType.icon}</div>
                      <h3 className="font-semibold text-lg mb-2">{mealType.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{mealType.description}</p>
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Available in:</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {mealType.plans.map((planId) => {
                            const plan = subscriptionPlans.find((p) => p.id === planId)
                            return (
                              <Badge key={planId} variant="outline" className="text-xs">
                                {plan?.name}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {selectedMealType && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>{mealTypes.find((m) => m.id === selectedMealType)?.name} Plans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {subscriptionPlans
                        .filter((plan) => mealTypes.find((m) => m.id === selectedMealType)?.plans.includes(plan.id))
                        .map((plan) => (
                          <Card key={plan.id} className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{plan.name}</h4>
                              <Badge className={plan.badgeColor}>{plan.badge}</Badge>
                            </div>
                            <div className="flex items-baseline gap-2 mb-3">
                              <span className="text-xl font-bold text-primary">₹{plan.price}</span>
                              <span className="text-sm text-muted-foreground">per meal</span>
                            </div>
                            <Button size="sm" className="w-full" asChild>
                              <Link href={`/subscriptions/details/${plan.id}`}>Select Plan</Link>
                            </Button>
                          </Card>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <Card className="text-center p-6">
            <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h4 className="font-bold text-lg mb-2">Flexible Scheduling</h4>
            <p className="text-muted-foreground">Pause, skip, or modify your plan anytime with 24-hour notice</p>
          </Card>

          <Card className="text-center p-6">
            <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h4 className="font-bold text-lg mb-2">Family Plans</h4>
            <p className="text-muted-foreground">Add family members and customize meals for each person</p>
          </Card>

          <Card className="text-center p-6">
            <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h4 className="font-bold text-lg mb-2">Instant Changes</h4>
            <p className="text-muted-foreground">Make real-time changes to your subscription through our app</p>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-orange-500/5">
            <CardContent>
              <h3 className="text-2xl font-bold mb-4">Still Not Sure?</h3>
              <p className="text-muted-foreground mb-6">
                Try our Daily Flexi plan with no commitment, or contact our team for personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/book">Try Daily Flexi</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/support">Contact Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
