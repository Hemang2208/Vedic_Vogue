"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart, Clock, Flame } from "lucide-react";

const menuCategories = [
  { id: "all", name: "All Items", count: 48 },
  { id: "veg", name: "Vegetarian", count: 24 },
  { id: "fitness", name: "Fitness", count: 12 },
  { id: "office", name: "Office Light", count: 8 },
  { id: "diet", name: "Diet Special", count: 6 },
  { id: "addons", name: "Add-ons", count: 10 },
];

const meals = [
  {
    id: 1,
    name: "Classic Veg Thali",
    description:
      "Traditional Indian thali with dal, sabzi, rice, roti, pickle, and sweet",
    price: 120,
    originalPrice: 150,
    image: "/placeholder.svg?height=250&width=300",
    category: "veg",
    calories: 450,
    prepTime: "25 mins",
    tags: ["Popular", "Traditional"],
    dietary: ["Vegetarian", "Gluten-Free"],
    rating: 4.8,
    reviews: 234,
  },
  {
    id: 2,
    name: "Protein Power Bowl",
    description:
      "High-protein quinoa bowl with grilled paneer, mixed vegetables, and tahini dressing",
    price: 180,
    originalPrice: 200,
    image: "/placeholder.svg?height=250&width=300",
    category: "fitness",
    calories: 520,
    prepTime: "20 mins",
    tags: ["High Protein", "Keto-Friendly"],
    dietary: ["Vegetarian", "High Protein"],
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 3,
    name: "Office Light Combo",
    description:
      "Light and nutritious meal with mild curry, steamed rice, and fresh salad",
    price: 100,
    originalPrice: 120,
    image: "/placeholder.svg?height=250&width=300",
    category: "office",
    calories: 350,
    prepTime: "15 mins",
    tags: ["Quick", "Light"],
    dietary: ["Vegetarian", "Low Spice"],
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 4,
    name: "Keto Diet Special",
    description:
      "Low-carb, high-fat meal with cauliflower rice, grilled vegetables, and nuts",
    price: 160,
    originalPrice: 180,
    image: "/placeholder.svg?height=250&width=300",
    category: "diet",
    calories: 380,
    prepTime: "30 mins",
    tags: ["Keto", "Low Carb"],
    dietary: ["Keto-Friendly", "Diabetic-Friendly"],
    rating: 4.7,
    reviews: 67,
  },
  {
    id: 5,
    name: "South Indian Delight",
    description:
      "Authentic South Indian meal with sambar, rasam, rice, and coconut chutney",
    price: 140,
    originalPrice: 160,
    image: "/placeholder.svg?height=250&width=300",
    category: "veg",
    calories: 420,
    prepTime: "25 mins",
    tags: ["Authentic", "South Indian"],
    dietary: ["Vegetarian", "Gluten-Free"],
    rating: 4.8,
    reviews: 198,
  },
  {
    id: 6,
    name: "Fresh Fruit Bowl",
    description: "Seasonal fresh fruits with yogurt and honey - perfect add-on",
    price: 60,
    originalPrice: 80,
    image: "/placeholder.svg?height=250&width=300",
    category: "addons",
    calories: 180,
    prepTime: "5 mins",
    tags: ["Fresh", "Healthy"],
    dietary: ["Vegetarian", "Probiotic"],
    rating: 4.5,
    reviews: 45,
  },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredMeals = meals.filter((meal) => {
    const matchesCategory =
      selectedCategory === "all" || meal.category === selectedCategory;
    const matchesSearch =
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const sortedMeals = [...filteredMeals].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "calories":
        return a.calories - b.calories;
      default:
        return b.reviews - a.reviews;
    }
  });

  const toggleFavorite = (mealId: number) => {
    setFavorites((prev) =>
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId]
    );
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Our Menu</h1>
          <p className="text-xl text-muted-foreground">
            Discover our wide variety of fresh, authentic, and nutritious meals
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search meals, ingredients, or dietary preferences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="calories">Lowest Calories</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="mb-8"
        >
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            {menuCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="text-xs lg:text-sm"
              >
                {category.name}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Meals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sortedMeals.map((meal) => (
            <Card
              key={meal.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative">
                <Image
                  src={meal.image || "/placeholder.svg"}
                  alt={meal.name}
                  width={300}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  {meal.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => toggleFavorite(meal.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.includes(meal.id)
                        ? "fill-red-500 text-red-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </Button>
                {meal.originalPrice > meal.price && (
                  <Badge className="absolute bottom-2 left-2 bg-green-500">
                    Save ₹{meal.originalPrice - meal.price}
                  </Badge>
                )}
              </div>

              <CardContent className="p-4 space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg leading-tight">
                      {meal.name}
                    </h3>
                    <div className="text-right">
                      <div className="font-bold text-primary">
                        ₹{meal.price}
                      </div>
                      {meal.originalPrice > meal.price && (
                        <div className="text-sm text-muted-foreground line-through">
                          ₹{meal.originalPrice}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {meal.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {meal.prepTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="h-3 w-3" />
                    {meal.calories} cal
                  </div>
                  <div className="flex items-center gap-1">
                    ⭐ {meal.rating} ({meal.reviews})
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {meal.dietary.slice(0, 2).map((diet, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {diet}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" asChild>
                    <Link href="/booking">Add to Plan</Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 bg-muted/30 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Start Your Meal Plan?
          </h2>
          <p className="text-muted-foreground mb-6">
            Choose your favorite meals and create a personalized subscription
            plan
          </p>
          <Button size="lg" asChild>
            <Link href="/booking">Create Your Plan</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
