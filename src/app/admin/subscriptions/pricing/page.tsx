"use client";

import { useState } from "react";
import { ArrowLeft, Save, RefreshCw, TrendingDown } from "lucide-react";
import { VVCard } from "@/components/ui/vv-card";
import { VVButton } from "@/components/ui/vv-button";
import { VVInput } from "@/components/ui/vv-input";
import { VVBadge } from "@/components/ui/vv-badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";

// Mock pricing data
const mockPricingRules = {
  basePrices: {
    daily: 180,
    weekly: 1050,
    monthly: 4200,
  },
  discounts: {
    weekly: 15,
    monthly: 25,
  },
  dynamicPricing: {
    enabled: true,
    peakHourMultiplier: 1.1,
    offPeakDiscount: 0.9,
    demandBasedPricing: true,
  },
  bulkDiscounts: [
    { minOrders: 10, discount: 5 },
    { minOrders: 20, discount: 10 },
    { minOrders: 50, discount: 15 },
  ],
  seasonalPricing: {
    enabled: false,
    festivalSurcharge: 20,
    offSeasonDiscount: 10,
  },
};

export default function PricingPage() {
  const [pricing, setPricing] = useState(mockPricingRules);
  const [hasChanges, setHasChanges] = useState(false);

  const updateBasePrice = (type: string, value: number) => {
    setPricing({
      ...pricing,
      basePrices: {
        ...pricing.basePrices,
        [type]: value,
      },
    });
    setHasChanges(true);
  };

  const updateDiscount = (type: string, value: number) => {
    setPricing({
      ...pricing,
      discounts: {
        ...pricing.discounts,
        [type]: value,
      },
    });
    setHasChanges(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateDynamicPricing = (key: string, value: any) => {
    setPricing({
      ...pricing,
      dynamicPricing: {
        ...pricing.dynamicPricing,
        [key]: value,
      },
    });
    setHasChanges(true);
  };

  const savePricing = () => {
    // Save pricing logic here
    console.log("Saving pricing:", pricing);
    setHasChanges(false);
  };

  const resetPricing = () => {
    setPricing(mockPricingRules);
    setHasChanges(false);
  };

  const calculateEffectivePrice = (basePrice: number, discount: number) => {
    return Math.round(basePrice * (1 - discount / 100));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/subscriptions">
          <VVButton variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Subscriptions
          </VVButton>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Dynamic Pricing</h1>
          <p className="text-gray-600">Configure pricing rules and discounts</p>
        </div>
        <div className="flex gap-2">
          {hasChanges && (
            <VVButton variant="outline" onClick={resetPricing}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </VVButton>
          )}
          <VVButton onClick={savePricing} disabled={!hasChanges}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </VVButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Base Pricing */}
        <VVCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Base Pricing</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="daily-price">Daily Plan Base Price (₹)</Label>
              <VVInput
                id="daily-price"
                type="number"
                value={pricing.basePrices.daily}
                onChange={(e) =>
                  updateBasePrice("daily", Number.parseFloat(e.target.value))
                }
              />
              <p className="text-sm text-gray-500 mt-1">
                Price per single meal order
              </p>
            </div>

            <div>
              <Label htmlFor="weekly-price">Weekly Plan Base Price (₹)</Label>
              <VVInput
                id="weekly-price"
                type="number"
                value={pricing.basePrices.weekly}
                onChange={(e) =>
                  updateBasePrice("weekly", Number.parseFloat(e.target.value))
                }
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>
                  7 days × ₹{pricing.basePrices.daily} = ₹
                  {pricing.basePrices.daily * 7}
                </span>
                <span className="text-green-600">
                  Save ₹
                  {pricing.basePrices.daily * 7 - pricing.basePrices.weekly}
                </span>
              </div>
            </div>

            <div>
              <Label htmlFor="monthly-price">Monthly Plan Base Price (₹)</Label>
              <VVInput
                id="monthly-price"
                type="number"
                value={pricing.basePrices.monthly}
                onChange={(e) =>
                  updateBasePrice("monthly", Number.parseFloat(e.target.value))
                }
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>
                  30 days × ₹{pricing.basePrices.daily} = ₹
                  {pricing.basePrices.daily * 30}
                </span>
                <span className="text-green-600">
                  Save ₹
                  {pricing.basePrices.daily * 30 - pricing.basePrices.monthly}
                </span>
              </div>
            </div>
          </div>
        </VVCard>

        {/* Subscription Discounts */}
        <VVCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Subscription Discounts</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Weekly Plan Discount</Label>
                <span className="text-sm font-medium">
                  {pricing.discounts.weekly}%
                </span>
              </div>
              <Slider
                value={[pricing.discounts.weekly]}
                onValueChange={(value) => updateDiscount("weekly", value[0])}
                max={30}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  Effective: ₹
                  {calculateEffectivePrice(
                    pricing.basePrices.weekly,
                    pricing.discounts.weekly
                  )}
                </span>
                <span>
                  Per meal: ₹
                  {Math.round(
                    calculateEffectivePrice(
                      pricing.basePrices.weekly,
                      pricing.discounts.weekly
                    ) / 7
                  )}
                </span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Monthly Plan Discount</Label>
                <span className="text-sm font-medium">
                  {pricing.discounts.monthly}%
                </span>
              </div>
              <Slider
                value={[pricing.discounts.monthly]}
                onValueChange={(value) => updateDiscount("monthly", value[0])}
                max={40}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  Effective: ₹
                  {calculateEffectivePrice(
                    pricing.basePrices.monthly,
                    pricing.discounts.monthly
                  )}
                </span>
                <span>
                  Per meal: ₹
                  {Math.round(
                    calculateEffectivePrice(
                      pricing.basePrices.monthly,
                      pricing.discounts.monthly
                    ) / 30
                  )}
                </span>
              </div>
            </div>
          </div>
        </VVCard>

        {/* Dynamic Pricing */}
        <VVCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Dynamic Pricing</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Dynamic Pricing</Label>
                <p className="text-sm text-gray-500">
                  Adjust prices based on demand and time
                </p>
              </div>
              <Switch
                checked={pricing.dynamicPricing.enabled}
                onCheckedChange={(checked) =>
                  updateDynamicPricing("enabled", checked)
                }
              />
            </div>

            {pricing.dynamicPricing.enabled && (
              <>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Peak Hour Multiplier</Label>
                    <span className="text-sm font-medium">
                      {pricing.dynamicPricing.peakHourMultiplier}x
                    </span>
                  </div>
                  <Slider
                    value={[pricing.dynamicPricing.peakHourMultiplier]}
                    onValueChange={(value) =>
                      updateDynamicPricing("peakHourMultiplier", value[0])
                    }
                    min={1}
                    max={1.5}
                    step={0.1}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Peak hours: 12-2 PM, 7-9 PM
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Off-Peak Discount</Label>
                    <span className="text-sm font-medium">
                      {pricing.dynamicPricing.offPeakDiscount}x
                    </span>
                  </div>
                  <Slider
                    value={[pricing.dynamicPricing.offPeakDiscount]}
                    onValueChange={(value) =>
                      updateDynamicPricing("offPeakDiscount", value[0])
                    }
                    min={0.7}
                    max={1}
                    step={0.05}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Off-peak hours: 3-6 PM, 10 PM-11 AM
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Demand-Based Pricing</Label>
                    <p className="text-sm text-gray-500">
                      Adjust based on order volume
                    </p>
                  </div>
                  <Switch
                    checked={pricing.dynamicPricing.demandBasedPricing}
                    onCheckedChange={(checked) =>
                      updateDynamicPricing("demandBasedPricing", checked)
                    }
                  />
                </div>
              </>
            )}
          </div>
        </VVCard>

        {/* Bulk Discounts */}
        <VVCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Bulk Order Discounts</h3>
          <div className="space-y-3">
            {pricing.bulkDiscounts.map((bulk, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <VVBadge variant="outline">{bulk.minOrders}+ orders</VVBadge>
                  <span className="text-sm text-gray-600">
                    {bulk.discount}% discount
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    ₹
                    {Math.round(
                      (pricing.basePrices.daily * bulk.discount) / 100
                    )}{" "}
                    off per meal
                  </span>
                </div>
              </div>
            ))}
          </div>
        </VVCard>
      </div>

      {/* Pricing Preview */}
      <VVCard className="p-6">
        <h3 className="text-lg font-semibold mb-4">Pricing Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900">Daily Plan</h4>
            <div className="text-2xl font-bold text-gray-900 mt-2">
              ₹{pricing.basePrices.daily}
            </div>
            <p className="text-sm text-gray-500">per meal</p>
            {pricing.dynamicPricing.enabled && (
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Peak:</span>
                  <span>
                    ₹
                    {Math.round(
                      pricing.basePrices.daily *
                        pricing.dynamicPricing.peakHourMultiplier
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Off-peak:</span>
                  <span>
                    ₹
                    {Math.round(
                      pricing.basePrices.daily *
                        pricing.dynamicPricing.offPeakDiscount
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="text-center p-4 border rounded-lg bg-orange-50 border-orange-200">
            <h4 className="font-medium text-gray-900">Weekly Plan</h4>
            <div className="text-2xl font-bold text-gray-900 mt-2">
              ₹
              {calculateEffectivePrice(
                pricing.basePrices.weekly,
                pricing.discounts.weekly
              )}
            </div>
            <p className="text-sm text-gray-500">
              ₹
              {Math.round(
                calculateEffectivePrice(
                  pricing.basePrices.weekly,
                  pricing.discounts.weekly
                ) / 7
              )}{" "}
              per meal
            </p>
            <VVBadge variant="warning" className="mt-2">
              {pricing.discounts.weekly}% OFF
            </VVBadge>
          </div>

          <div className="text-center p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900">Monthly Plan</h4>
            <div className="text-2xl font-bold text-gray-900 mt-2">
              ₹
              {calculateEffectivePrice(
                pricing.basePrices.monthly,
                pricing.discounts.monthly
              )}
            </div>
            <p className="text-sm text-gray-500">
              ₹
              {Math.round(
                calculateEffectivePrice(
                  pricing.basePrices.monthly,
                  pricing.discounts.monthly
                ) / 30
              )}{" "}
              per meal
            </p>
            <VVBadge variant="success" className="mt-2">
              {pricing.discounts.monthly}% OFF
            </VVBadge>
          </div>
        </div>
      </VVCard>
    </div>
  );
}
