"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {
  ChefHat,
  Phone,
  User,
  ShoppingCart,
  Calendar,
  HelpCircle,
  Home,
  Utensils,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 group flex-shrink-0"
            >
              <ChefHat className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-orange-600 transition-transform group-hover:rotate-12" />
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                <span className="hidden sm:inline">VedicVogue Kitchen</span>
                <span className="sm:hidden">VedicVogue</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList className="gap-1">
                {/* Home */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className="flex items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-sm"
                      >
                        <Home className="h-4 w-4" />
                        Home
                      </Button>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Menu */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/menu" className="flex items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-sm"
                      >
                        <Utensils className="h-4 w-4" />
                        Our Menu
                      </Button>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Booking */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="gap-1 text-sm">
                    <Calendar className="h-4 w-4" />
                    Booking
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="rounded-lg shadow-lg">
                    <div className="p-2 w-48">
                      <NavigationMenuLink asChild>
                        <Link href="/book">
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-sm"
                          >
                            <Calendar className="h-4 w-4" />
                            Book Table
                          </Button>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/booking">
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-sm"
                          >
                            <Calendar className="h-4 w-4" />
                            Manage Booking
                          </Button>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Orders */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="gap-1 text-sm">
                    <ShoppingCart className="h-4 w-4" />
                    Orders
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="rounded-lg shadow-lg">
                    <div className="p-2 w-48">
                      <NavigationMenuLink asChild>
                        <Link href="/orders">
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-sm"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            My Orders
                          </Button>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/order-summary">
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-sm"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            Order Summary
                          </Button>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Support */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="gap-1 text-sm">
                    <HelpCircle className="h-4 w-4" />
                    Support
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="rounded-lg shadow-lg">
                    <div className="p-2 w-48">
                      <NavigationMenuLink asChild>
                        <Link href="/help">
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-sm"
                          >
                            <HelpCircle className="h-4 w-4" />
                            Help Center
                          </Button>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/contact">
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-sm"
                          >
                            <Phone className="h-4 w-4" />
                            Contact Us
                          </Button>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/feedback">
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-sm"
                          >
                            <HelpCircle className="h-4 w-4" />
                            Feedback
                          </Button>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop User Menu */}
              <NavigationMenu className="hidden md:block">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="gap-1 text-sm">
                      <User className="h-4 w-4" />
                      <span className="hidden lg:inline">Account</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="rounded-lg shadow-lg">
                      <div className="p-2 w-48">
                        <NavigationMenuLink asChild>
                          <Link href="/sign-in">
                            <Button
                              variant="ghost"
                              className="w-full justify-start gap-2 text-sm"
                            >
                              <User className="h-4 w-4" />
                              Sign In
                            </Button>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/sign-up">
                            <Button
                              variant="ghost"
                              className="w-full justify-start gap-2 text-sm"
                            >
                              <User className="h-4 w-4" />
                              Sign Up
                            </Button>
                          </Link>
                        </NavigationMenuLink>
                        <div className="h-px bg-gray-100 my-1" />
                        <NavigationMenuLink asChild>
                          <Link href="/profile">
                            <Button
                              variant="ghost"
                              className="w-full justify-start gap-2 text-sm"
                            >
                              <User className="h-4 w-4" />
                              My Profile
                            </Button>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/dashboard">
                            <Button
                              variant="ghost"
                              className="w-full justify-start gap-2 text-sm"
                            >
                              <User className="h-4 w-4" />
                              Dashboard
                            </Button>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* CTA Button */}
              <Link href="/book" className="hidden sm:block">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-1 text-sm px-3 sm:px-4">
                  <Phone className="h-4 w-4" />
                  <span className="hidden md:inline">Order Now</span>
                  <span className="md:hidden">Order</span>
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {/* Mobile Navigation Links */}
              <Link href="/" onClick={closeMobileMenu}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 py-3 text-base"
                >
                  <Home className="h-5 w-5" />
                  Home
                </Button>
              </Link>

              <Link href="/menu" onClick={closeMobileMenu}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 py-3 text-base"
                >
                  <Utensils className="h-5 w-5" />
                  Our Menu
                </Button>
              </Link>

              {/* Mobile Booking Dropdown */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between gap-3 py-3 text-base"
                  onClick={() => toggleDropdown("booking")}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5" />
                    Booking
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openDropdown === "booking" ? "rotate-180" : ""
                    }`}
                  />
                </Button>
                {openDropdown === "booking" && (
                  <div className="ml-8 space-y-1 mt-2">
                    <Link href="/book" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <Calendar className="h-4 w-4" />
                        Book Table
                      </Button>
                    </Link>
                    <Link href="/booking" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <Calendar className="h-4 w-4" />
                        Manage Booking
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Orders Dropdown */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between gap-3 py-3 text-base"
                  onClick={() => toggleDropdown("orders")}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="h-5 w-5" />
                    Orders
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openDropdown === "orders" ? "rotate-180" : ""
                    }`}
                  />
                </Button>
                {openDropdown === "orders" && (
                  <div className="ml-8 space-y-1 mt-2">
                    <Link href="/orders" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        My Orders
                      </Button>
                    </Link>
                    <Link href="/order-summary" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Order Summary
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Support Dropdown */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between gap-3 py-3 text-base"
                  onClick={() => toggleDropdown("support")}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5" />
                    Support
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openDropdown === "support" ? "rotate-180" : ""
                    }`}
                  />
                </Button>
                {openDropdown === "support" && (
                  <div className="ml-8 space-y-1 mt-2">
                    <Link href="/help" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <HelpCircle className="h-4 w-4" />
                        Help Center
                      </Button>
                    </Link>
                    <Link href="/contact" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <Phone className="h-4 w-4" />
                        Contact Us
                      </Button>
                    </Link>
                    <Link href="/feedback" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <HelpCircle className="h-4 w-4" />
                        Feedback
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Account Dropdown */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between gap-3 py-3 text-base"
                  onClick={() => toggleDropdown("account")}
                >
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5" />
                    Account
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openDropdown === "account" ? "rotate-180" : ""
                    }`}
                  />
                </Button>
                {openDropdown === "account" && (
                  <div className="ml-8 space-y-1 mt-2">
                    <Link href="/sign-in" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <User className="h-4 w-4" />
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/sign-up" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <User className="h-4 w-4" />
                        Sign Up
                      </Button>
                    </Link>
                    <div className="h-px bg-gray-100 my-2" />
                    <Link href="/profile" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Button>
                    </Link>
                    <Link href="/dashboard" onClick={closeMobileMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-2 text-sm"
                      >
                        <User className="h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile CTA Button */}
              <div className="pt-4 border-t border-gray-100">
                <Link href="/book" onClick={closeMobileMenu}>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white gap-2 py-3 text-base">
                    <Phone className="h-5 w-5" />
                    Order Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

// Bottom Tab Navigation Component (Alternative Mobile Navigation)
export function BottomTabNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 sm:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg z-40">
      <div className="flex justify-around items-center py-2 px-2 safe-area-pb">
        <Link href="/" className="flex flex-col items-center min-w-0 flex-1">
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto gap-1 p-2 w-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
          >
            <Home className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs font-medium">Home</span>
          </Button>
        </Link>

        <Link
          href="/menu"
          className="flex flex-col items-center min-w-0 flex-1"
        >
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto gap-1 p-2 w-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
          >
            <Utensils className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs font-medium">Menu</span>
          </Button>
        </Link>

        <Link
          href="/book"
          className="flex flex-col items-center min-w-0 flex-1"
        >
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto gap-1 p-2 w-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
          >
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs font-medium">Book</span>
          </Button>
        </Link>

        <Link
          href="/orders"
          className="flex flex-col items-center min-w-0 flex-1"
        >
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto gap-1 p-2 w-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
          >
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs font-medium">Orders</span>
          </Button>
        </Link>

        <Link
          href="/profile"
          className="flex flex-col items-center min-w-0 flex-1"
        >
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto gap-1 p-2 w-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
          >
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs font-medium">Profile</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
