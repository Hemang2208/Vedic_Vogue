"use client";

import { useState } from "react";
import { Save, FileText, Edit, History } from "lucide-react";
import { VVCard } from "@/components/ui/vv-card";
import { VVButton } from "@/components/ui/vv-button";
import { VVBadge } from "@/components/ui/vv-badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const legalDocuments = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "2024-01-15",
    version: "2.1",
    content: `# Privacy Policy

## Information We Collect

At VedicVogue Kitchen, we collect information you provide directly to us, such as when you create an account, place an order, or contact us for support.

### Personal Information
- Name and contact information
- Delivery address and preferences
- Payment information
- Order history and preferences

### Usage Information
- How you interact with our service
- Device information and IP address
- Cookies and similar technologies

## How We Use Your Information

We use the information we collect to:
- Process and fulfill your orders
- Communicate with you about your orders
- Improve our services
- Send you promotional communications (with your consent)

## Information Sharing

We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy.

## Data Security

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## Your Rights

You have the right to:
- Access your personal information
- Correct inaccurate information
- Delete your account and data
- Opt-out of marketing communications

## Contact Us

If you have any questions about this Privacy Policy, please contact us at privacy@vedicvogue.com.

Last updated: January 15, 2024`,
  },
  terms: {
    title: "Terms of Service",
    lastUpdated: "2024-01-10",
    version: "1.8",
    content: `# Terms of Service

## Acceptance of Terms

By accessing and using VedicVogue Kitchen's services, you accept and agree to be bound by the terms and provision of this agreement.

## Use License

Permission is granted to temporarily use VedicVogue Kitchen's service for personal, non-commercial transitory viewing only.

### This license shall automatically terminate if you violate any of these restrictions:
- Modify or copy the materials
- Use the materials for commercial purposes
- Attempt to reverse engineer any software
- Remove any copyright or proprietary notations

## Service Description

VedicVogue Kitchen provides meal delivery services including:
- Daily meal subscriptions
- Custom meal planning
- Add-on items and beverages
- Nutritional consultation

## User Accounts

To use our service, you must:
- Provide accurate and complete information
- Maintain the security of your account
- Notify us of any unauthorized use
- Be responsible for all activities under your account

## Orders and Payment

### Order Placement
- All orders are subject to availability
- Prices are subject to change without notice
- We reserve the right to refuse any order

### Payment Terms
- Payment is due at the time of order
- We accept various payment methods
- Refunds are processed according to our refund policy

## Delivery

### Delivery Areas
We currently deliver to specified areas within our service zones.

### Delivery Times
- Lunch: 12:00 PM - 2:30 PM
- Dinner: 6:00 PM - 9:00 PM

## Cancellation and Refunds

### Cancellation Policy
- Orders can be cancelled up to 2 hours before delivery
- Subscription cancellations require 24-hour notice
- No-show deliveries may be charged

### Refund Policy
- Refunds for cancelled orders are processed within 5-7 business days
- Quality issues are addressed on a case-by-case basis

## Limitation of Liability

VedicVogue Kitchen shall not be liable for any indirect, incidental, special, consequential, or punitive damages.

## Contact Information

For questions about these Terms of Service, contact us at legal@vedicvogue.com.

Last updated: January 10, 2024`,
  },
  about: {
    title: "About Us",
    lastUpdated: "2024-01-05",
    version: "1.3",
    content: `# About VedicVogue Kitchen

## Our Story

VedicVogue Kitchen was founded in 2023 with a simple mission: to bring authentic, healthy, and delicious Indian meals to your doorstep. We believe that good food is the foundation of a healthy lifestyle.

## Our Mission

To provide fresh, nutritious, and authentic Indian meals that cater to diverse dietary preferences while maintaining the highest standards of quality and hygiene.

## Our Values

### Quality First
We source the finest ingredients and maintain strict quality control throughout our preparation process.

### Health & Nutrition
Every meal is carefully crafted by our nutritionists to ensure balanced nutrition without compromising on taste.

### Authenticity
Our chefs bring years of experience in traditional Indian cooking, ensuring authentic flavors in every dish.

### Sustainability
We are committed to sustainable practices, from sourcing ingredients to packaging and delivery.

## Our Team

Our team consists of experienced chefs, nutritionists, and food safety experts who are passionate about delivering exceptional meals.

### Chef Team
- Traditional cooking techniques
- Modern nutritional science
- Diverse regional expertise

### Nutrition Team
- Certified nutritionists
- Meal planning specialists
- Dietary requirement experts

## Our Kitchen

Our state-of-the-art kitchen facility maintains the highest standards of:
- Food safety and hygiene
- Temperature control
- Quality assurance
- Nutritional consistency

## Certifications

- FSSAI Licensed
- ISO 22000 Certified
- HACCP Compliant
- Organic Certified Suppliers

## Contact Us

**Address:** 123 Food Street, Bangalore, Karnataka 560001
**Phone:** +91 98765 43210
**Email:** hello@vedicvogue.com
**Website:** https://vedicvogue.com

## Business Hours

- Monday to Sunday: 6:00 AM - 10:00 PM
- Customer Support: 24/7
- Kitchen Operations: 5:00 AM - 11:00 PM

Last updated: January 5, 2024`,
  },
};

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState("privacy");
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState("");

  const handleEdit = (documentKey: string) => {
    setEditContent(
      legalDocuments[documentKey as keyof typeof legalDocuments].content
    );
    setEditMode(true);
  };

  const handleSave = () => {
    console.log("Saving legal document:", editContent);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditContent("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Legal Pages</h1>
          <p className="text-gray-600">
            Manage your legal documents and policies
          </p>
        </div>

        {editMode ? (
          <div className="flex gap-3">
            <VVButton onClick={handleCancel} variant="outline">
              Cancel
            </VVButton>
            <VVButton onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </VVButton>
          </div>
        ) : (
          <VVButton onClick={() => handleEdit(activeTab)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Document
          </VVButton>
        )}
      </div>

      {/* Document Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          <TabsTrigger value="about">About Us</TabsTrigger>
        </TabsList>

        {Object.entries(legalDocuments).map(([key, document]) => (
          <TabsContent key={key} value={key}>
            <VVCard>
              {/* Document Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-gray-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {document.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-500">
                          Version {document.version}
                        </span>
                        <span className="text-sm text-gray-500">
                          Last updated: {document.lastUpdated}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <VVBadge variant="success">Published</VVBadge>
                    <VVButton variant="outline" size="sm">
                      <History className="h-4 w-4 mr-2" />
                      View History
                    </VVButton>
                  </div>
                </div>
              </div>

              {/* Document Content */}
              <div className="p-6">
                {editMode && activeTab === key ? (
                  <div className="space-y-4">
                    <Label htmlFor="content">Document Content</Label>
                    <Textarea
                      id="content"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={25}
                      className="font-mono text-sm"
                      placeholder="Enter document content in Markdown format..."
                    />
                    <div className="text-sm text-gray-500">
                      You can use Markdown formatting for headers, lists, links,
                      and more.
                    </div>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                      {document.content}
                    </pre>
                  </div>
                )}
              </div>
            </VVCard>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
