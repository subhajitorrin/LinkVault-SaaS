"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, CircleDollarSign, HelpCircle } from "lucide-react";

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState("Free");
  const [daysLeft, setDaysLeft] = useState(18);
  const [bookmarksUsed, setBookmarksUsed] = useState(732);
  const [bookmarksLimit, setBookmarksLimit] = useState(1000);

  const plans = [
    {
      name: "Free",
      price: "$0.00",
      features: ["5 bookmarks per month", "Basic tag organization"]
    },
    {
      name: "Pro",
      price: "$7.00",
      features: [
        "40 bookmarks per month",
        "Advanced tag management",
        "Web browser extension"
      ]
    },
    {
      name: "Enterprise",
      price: "$30.00",
      features: [
        "Unlimited bookmarks",
        "Advanced tag management",
        "Web browser extension"
      ]
    }
  ];

  return (
    <div className="min-h-screenk text-gray-100">
      <div className="py-6">
        <div className="flex items-center space-x-2">
          <CircleDollarSign className="h-4 w-4" />
          <h2 className="text-lg font-semibold">Billing</h2>
        </div>

        <Card className="mb-8 bg-zinc-900 border-zinc-800 mt-4">
          <CardHeader>
            <CardTitle className="text-white">
              Current Plan: {currentPlan}
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your subscription renews on{" "}
              {new Date(
                Date.now() + daysLeft * 24 * 60 * 60 * 1000
              ).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">
                    Billing cycle
                  </span>
                  <span className="text-sm font-medium text-gray-300">
                    {daysLeft} days left
                  </span>
                </div>
                <Progress
                  value={((30 - daysLeft) / 30) * 100}
                  className="w-full h-1 bg-white"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">
                    Bookmark usage
                  </span>
                  <span className="text-sm font-medium text-gray-300">
                    {bookmarksUsed} / {bookmarksLimit}
                  </span>
                </div>
                <Progress
                  value={(bookmarksUsed / bookmarksLimit) * 100}
                  className="w-full h-1 bg-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`bg-zinc-900 border-zinc-800 relative ${
                plan.name === currentPlan
                  ? "ring-2 ring-zinc-700 border-transparent"
                  : ""
              }`}
            >
              {plan.name === currentPlan && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-zinc-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Current Plan
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-white">{plan.name}</CardTitle>
                <CardDescription className="text-gray-400">
                  {plan.price} / month
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <ul className="space-y-2 flex-grow mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-zinc-900 hover:opacity-90 transition-all ease-linear duration-200 text-white border border-[#393939]"
                  variant={plan.name === currentPlan ? "outline" : "default"}
                  disabled={plan.name === currentPlan}
                >
                  {plan.name === currentPlan ? "Current Plan" : "Subscribe"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
