"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Edit, Trash2, Save, Copy } from "lucide-react";
import { VVCard } from "@/components/ui/vv-card";
import { VVButton } from "@/components/ui/vv-button";
import { VVInput } from "@/components/ui/vv-input";
import { VVBadge } from "@/components/ui/vv-badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

// Mock subscription plans data
const mockPlans = [
  {
    id: "PLAN-001",
    name: "Daily Flex",
    type: "daily",
    description: "Order meals on a daily basis with complete flexibility",
    price: 180,
    duration: 1,
    durationUnit: "day",
    features: ["Order anytime", "No commitment", "Same day delivery"],
    active: true,
    popular: false,
    maxMealsPerDay: 3,
    cancellationPolicy: "2 hours before delivery",
  },
  {
    id: "PLAN-002",
    name: "Weekly Pro",
    type: "weekly",
    description: "Weekly meal plans with 15% savings and priority delivery",
    price: 1050,
    duration: 7,
    durationUnit: "days",
    features: [
      "15% savings",
      "Priority delivery",
      "Meal customization",
      "Weekly menu planning",
    ],
    active: true,
    popular: true,
    maxMealsPerDay: 3,
    cancellationPolicy: "24 hours before delivery",
  },
  {
    id: "PLAN-003",
    name: "Monthly Basic",
    type: "monthly",
    description:
      "Monthly subscription with maximum savings and premium support",
    price: 4200,
    duration: 30,
    durationUnit: "days",
    features: [
      "25% savings",
      "Premium support",
      "Free add-ons",
      "Nutrition consultation",
    ],
    active: true,
    popular: false,
    maxMealsPerDay: 3,
    cancellationPolicy: "48 hours before delivery",
  },
];

export default function SubscriptionPlansPage() {
  const [plans, setPlans] = useState(mockPlans);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: "",
    type: "daily",
    description: "",
    price: "",
    duration: "",
    durationUnit: "days",
    features: [""],
    active: true,
    popular: false,
    maxMealsPerDay: 3,
    cancellationPolicy: "",
  });

  const handleSavePlan = () => {
    if (editingPlan) {
      setPlans(
        plans.map((plan) => (plan.id === editingPlan.id ? editingPlan : plan))
      );
      setEditingPlan(null);
    }
  };

  const handleAddPlan = () => {
    const newPlanData = {
      id: `PLAN-${Date.now()}`,
      ...newPlan,
      price: Number.parseFloat(newPlan.price),
      duration: Number.parseInt(newPlan.duration),
      features: newPlan.features.filter((f) => f.trim() !== ""),
    };
    setPlans([...plans, newPlanData]);
    setNewPlan({
      name: "",
      type: "daily",
      description: "",
      price: "",
      duration: "",
      durationUnit: "days",
      features: [""],
      active: true,
      popular: false,
      maxMealsPerDay: 3,
      cancellationPolicy: "",
    });
    setIsAddingNew(false);
  };

  const handleDeletePlan = (id: string) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  const togglePlanStatus = (id: string) => {
    setPlans(
      plans.map((plan) =>
        plan.id === id ? { ...plan, active: !plan.active } : plan
      )
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const duplicatePlan = (plan: any) => {
    const duplicated = {
      ...plan,
      id: `PLAN-${Date.now()}`,
      name: `${plan.name} (Copy)`,
      active: false,
    };
    setPlans([...plans, duplicated]);
  };

  const addFeature = (
    features: string[],
    setFeatures: (features: string[]) => void
  ) => {
    setFeatures([...features, ""]);
  };

  const updateFeature = (
    index: number,
    value: string,
    features: string[],
    setFeatures: (features: string[]) => void
  ) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const removeFeature = (
    index: number,
    features: string[],
    setFeatures: (features: string[]) => void
  ) => {
    setFeatures(features.filter((_, i) => i !== index));
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
          <h1 className="text-2xl font-bold text-gray-900">
            Subscription Plans
          </h1>
          <p className="text-gray-600">
            Manage subscription plans and pricing tiers
          </p>
        </div>
        <VVButton onClick={() => setIsAddingNew(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Plan
        </VVButton>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <VVCard
            key={plan.id}
            className={`p-6 relative ${
              plan.popular ? "ring-2 ring-orange-500" : ""
            }`}
          >
            {plan.popular && (
              <VVBadge className="absolute -top-2 left-4 bg-orange-500">
                Most Popular
              </VVBadge>
            )}

            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {plan.name}
                  </h3>
                  <VVBadge variant="outline" className="mt-1">
                    {plan.type}
                  </VVBadge>
                </div>
                <VVBadge variant={plan.active ? "success" : "secondary"}>
                  {plan.active ? "Active" : "Inactive"}
                </VVBadge>
              </div>

              <div className="text-center py-4">
                <div className="text-3xl font-bold text-gray-900">
                  ₹{plan.price}
                </div>
                <div className="text-sm text-gray-600">
                  per {plan.duration} {plan.durationUnit}
                </div>
              </div>

              <p className="text-sm text-gray-600">{plan.description}</p>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Features:</h4>
                <ul className="space-y-1">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <div>Max meals/day: {plan.maxMealsPerDay}</div>
                <div>Cancellation: {plan.cancellationPolicy}</div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <Switch
                  checked={plan.active}
                  onCheckedChange={() => togglePlanStatus(plan.id)}
                />

                <div className="flex gap-1">
                  <VVButton
                    variant="ghost"
                    size="sm"
                    onClick={() => duplicatePlan(plan)}
                  >
                    <Copy className="w-4 h-4" />
                  </VVButton>

                  <Dialog>
                    <DialogTrigger asChild>
                      <VVButton
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingPlan({ ...plan })}
                      >
                        <Edit className="w-4 h-4" />
                      </VVButton>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Plan</DialogTitle>
                      </DialogHeader>
                      {editingPlan && (
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="edit-name">Plan Name</Label>
                              <VVInput
                                id="edit-name"
                                value={editingPlan.name}
                                onChange={(e) =>
                                  setEditingPlan({
                                    ...editingPlan,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-type">Plan Type</Label>
                              <Select
                                value={editingPlan.type}
                                onValueChange={(value) =>
                                  setEditingPlan({
                                    ...editingPlan,
                                    type: value,
                                  })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="daily">Daily</SelectItem>
                                  <SelectItem value="weekly">Weekly</SelectItem>
                                  <SelectItem value="monthly">
                                    Monthly
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="edit-description">
                              Description
                            </Label>
                            <Textarea
                              id="edit-description"
                              value={editingPlan.description}
                              onChange={(e) =>
                                setEditingPlan({
                                  ...editingPlan,
                                  description: e.target.value,
                                })
                              }
                              rows={2}
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="edit-price">Price (₹)</Label>
                              <VVInput
                                id="edit-price"
                                type="number"
                                value={editingPlan.price}
                                onChange={(e) =>
                                  setEditingPlan({
                                    ...editingPlan,
                                    price: Number.parseFloat(e.target.value),
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-duration">Duration</Label>
                              <VVInput
                                id="edit-duration"
                                type="number"
                                value={editingPlan.duration}
                                onChange={(e) =>
                                  setEditingPlan({
                                    ...editingPlan,
                                    duration: Number.parseInt(e.target.value),
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-unit">Unit</Label>
                              <Select
                                value={editingPlan.durationUnit}
                                onValueChange={(value) =>
                                  setEditingPlan({
                                    ...editingPlan,
                                    durationUnit: value,
                                  })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="day">Day</SelectItem>
                                  <SelectItem value="days">Days</SelectItem>
                                  <SelectItem value="week">Week</SelectItem>
                                  <SelectItem value="month">Month</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label>Features</Label>
                            <div className="space-y-2">
                              {editingPlan.features.map(
                                (feature: string, index: number) => (
                                  <div key={index} className="flex gap-2">
                                    <VVInput
                                      value={feature}
                                      onChange={(e) =>
                                        updateFeature(
                                          index,
                                          e.target.value,
                                          editingPlan.features,
                                          (features) =>
                                            setEditingPlan({
                                              ...editingPlan,
                                              features,
                                            })
                                        )
                                      }
                                      placeholder="Enter feature"
                                    />
                                    <VVButton
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        removeFeature(
                                          index,
                                          editingPlan.features,
                                          (features) =>
                                            setEditingPlan({
                                              ...editingPlan,
                                              features,
                                            })
                                        )
                                      }
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </VVButton>
                                  </div>
                                )
                              )}
                              <VVButton
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  addFeature(editingPlan.features, (features) =>
                                    setEditingPlan({ ...editingPlan, features })
                                  )
                                }
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Feature
                              </VVButton>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="edit-meals">Max Meals/Day</Label>
                              <VVInput
                                id="edit-meals"
                                type="number"
                                value={editingPlan.maxMealsPerDay}
                                onChange={(e) =>
                                  setEditingPlan({
                                    ...editingPlan,
                                    maxMealsPerDay: Number.parseInt(
                                      e.target.value
                                    ),
                                  })
                                }
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={editingPlan.popular}
                                onCheckedChange={(checked) =>
                                  setEditingPlan({
                                    ...editingPlan,
                                    popular: checked,
                                  })
                                }
                              />
                              <Label>Mark as Popular</Label>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="edit-cancellation">
                              Cancellation Policy
                            </Label>
                            <VVInput
                              id="edit-cancellation"
                              value={editingPlan.cancellationPolicy}
                              onChange={(e) =>
                                setEditingPlan({
                                  ...editingPlan,
                                  cancellationPolicy: e.target.value,
                                })
                              }
                              placeholder="e.g., 24 hours before delivery"
                            />
                          </div>

                          <div className="flex gap-2 pt-4">
                            <VVButton
                              onClick={handleSavePlan}
                              className="flex-1"
                            >
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </VVButton>
                            <VVButton
                              variant="outline"
                              onClick={() => setEditingPlan(null)}
                            >
                              Cancel
                            </VVButton>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <VVButton
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeletePlan(plan.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </VVButton>
                </div>
              </div>
            </div>
          </VVCard>
        ))}
      </div>

      {/* Add New Plan Dialog */}
      <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-name">Plan Name</Label>
                <VVInput
                  id="new-name"
                  placeholder="e.g., Premium Weekly"
                  value={newPlan.name}
                  onChange={(e) =>
                    setNewPlan({
                      ...newPlan,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="new-type">Plan Type</Label>
                <Select
                  value={newPlan.type}
                  onValueChange={(value) =>
                    setNewPlan({
                      ...newPlan,
                      type: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="new-description">Description</Label>
              <Textarea
                id="new-description"
                placeholder="Describe this plan..."
                value={newPlan.description}
                onChange={(e) =>
                  setNewPlan({
                    ...newPlan,
                    description: e.target.value,
                  })
                }
                rows={2}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="new-price">Price (₹)</Label>
                <VVInput
                  id="new-price"
                  type="number"
                  placeholder="180"
                  value={newPlan.price}
                  onChange={(e) =>
                    setNewPlan({
                      ...newPlan,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="new-duration">Duration</Label>
                <VVInput
                  id="new-duration"
                  type="number"
                  placeholder="7"
                  value={newPlan.duration}
                  onChange={(e) =>
                    setNewPlan({
                      ...newPlan,
                      duration: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="new-unit">Unit</Label>
                <Select
                  value={newPlan.durationUnit}
                  onValueChange={(value) =>
                    setNewPlan({
                      ...newPlan,
                      durationUnit: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Features</Label>
              <div className="space-y-2">
                {newPlan.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <VVInput
                      value={feature}
                      onChange={(e) =>
                        updateFeature(
                          index,
                          e.target.value,
                          newPlan.features,
                          (features) => setNewPlan({ ...newPlan, features })
                        )
                      }
                      placeholder="Enter feature"
                    />
                    <VVButton
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        removeFeature(index, newPlan.features, (features) =>
                          setNewPlan({ ...newPlan, features })
                        )
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </VVButton>
                  </div>
                ))}
                <VVButton
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    addFeature(newPlan.features, (features) =>
                      setNewPlan({ ...newPlan, features })
                    )
                  }
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Feature
                </VVButton>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-meals">Max Meals/Day</Label>
                <VVInput
                  id="new-meals"
                  type="number"
                  value={newPlan.maxMealsPerDay}
                  onChange={(e) =>
                    setNewPlan({
                      ...newPlan,
                      maxMealsPerDay: Number.parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={newPlan.popular}
                  onCheckedChange={(checked) =>
                    setNewPlan({
                      ...newPlan,
                      popular: checked,
                    })
                  }
                />
                <Label>Mark as Popular</Label>
              </div>
            </div>

            <div>
              <Label htmlFor="new-cancellation">Cancellation Policy</Label>
              <VVInput
                id="new-cancellation"
                value={newPlan.cancellationPolicy}
                onChange={(e) =>
                  setNewPlan({
                    ...newPlan,
                    cancellationPolicy: e.target.value,
                  })
                }
                placeholder="e.g., 24 hours before delivery"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <VVButton onClick={handleAddPlan} className="flex-1">
                <Plus className="w-4 h-4 mr-2" />
                Add Plan
              </VVButton>
              <VVButton variant="outline" onClick={() => setIsAddingNew(false)}>
                Cancel
              </VVButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
