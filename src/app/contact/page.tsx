"use client";

import type React from "react";

import { useState } from "react";
import { Navigation } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VVButton } from "@/components/ui/vv-button";
import {
  VVCard,
  VVCardContent,
  VVCardHeader,
  VVCardTitle,
} from "@/components/ui/vv-card";
import { VVInput } from "@/components/ui/vv-input";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our meals or need support? We&quot;re here to
            help you with anything you need.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <VVCard>
              <VVCardHeader>
                <VVCardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Send us a Message
                </VVCardTitle>
              </VVCardHeader>
              <VVCardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Full Name *
                      </label>
                      <VVInput
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-2"
                      >
                        Phone Number
                      </label>
                      <VVInput
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address *
                    </label>
                    <VVInput
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject *
                    </label>
                    <VVInput
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What can we help you with?"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>

                  <VVButton
                    type="submit"
                    className="w-full h-12"
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </VVButton>
                </form>
              </VVCardContent>
            </VVCard>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact Details */}
            <VVCard>
              <VVCardHeader>
                <VVCardTitle>Contact Information</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                    <p className="text-sm text-muted-foreground">
                      Mon-Sun, 8:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-muted-foreground">
                      support@vedicvogue.com
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We&quot;ll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-muted-foreground">
                      123 MG Road, Koramangala
                      <br />
                      Bangalore, Karnataka 560034
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Business Hours</h4>
                    <div className="text-muted-foreground text-sm space-y-1">
                      <p>Monday - Friday: 8:00 AM - 10:00 PM</p>
                      <p>Saturday - Sunday: 9:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </VVCardContent>
            </VVCard>

            {/* Quick Help */}
            <VVCard>
              <VVCardHeader>
                <VVCardTitle>Quick Help</VVCardTitle>
              </VVCardHeader>
              <VVCardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Common Questions:</h4>
                  <div className="space-y-1 text-sm">
                    <p className="text-muted-foreground">
                      • How to track my order?
                    </p>
                    <p className="text-muted-foreground">
                      • Delivery time and areas
                    </p>
                    <p className="text-muted-foreground">
                      • Subscription plans
                    </p>
                    <p className="text-muted-foreground">
                      • Dietary preferences
                    </p>
                  </div>
                </div>

                <VVButton variant="outline" className="w-full" asChild>
                  <a href="/help">Visit Help Center</a>
                </VVButton>
              </VVCardContent>
            </VVCard>

            {/* Emergency Contact */}
            <VVCard className="bg-orange-50 border-orange-200">
              <VVCardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="h-4 w-4 text-orange-600" />
                  <h4 className="font-medium text-orange-800">
                    Emergency Support
                  </h4>
                </div>
                <p className="text-sm text-orange-700 mb-2">
                  For urgent delivery issues or food safety concerns
                </p>
                <p className="font-medium text-orange-800">+91 98765 43211</p>
                <p className="text-xs text-orange-600">Available 24/7</p>
              </VVCardContent>
            </VVCard>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <VVCard>
            <VVCardHeader>
              <VVCardTitle className="text-center">
                Frequently Asked Questions
              </VVCardTitle>
            </VVCardHeader>
            <VVCardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">
                      How do I place an order?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Simply visit our booking page, select your meal, choose
                      delivery time, and confirm your order.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      What are your delivery areas?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      We currently deliver across Bangalore. Enter your pincode
                      during checkout to confirm delivery.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      Can I customize my meal?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Yes! You can specify dietary preferences and add-ons when
                      placing your order.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">
                      How do I track my order?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      You&quot;ll receive SMS updates and can track your order
                      in real-time through our website.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      What if I&quot;m not satisfied?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      We offer 100% money-back guarantee. Contact us within 2
                      hours of delivery for any issues.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      Do you offer subscriptions?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Yes! We have daily, weekly, and monthly subscription plans
                      with great discounts.
                    </p>
                  </div>
                </div>
              </div>
            </VVCardContent>
          </VVCard>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
