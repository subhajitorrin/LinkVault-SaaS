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
import {
  CheckCircle2,
  CircleDollarSign,
  LoaderCircle
} from "lucide-react";
import useZustStore from "@/store/useZustStore";

export default function BillingPage() {
  const { user } = useZustStore();
  const [currentPlan, setCurrentPlan] = useState("Free");
  const [daysLeft, setDaysLeft] = useState(0);
  const [bookmarksLimit, setBookmarksLimit] = useState(5);

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

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-base text-zinc-500 gap-2">
        <LoaderCircle className="h-5 w-5 animate-spin" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-100 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 mb-6">
          <CircleDollarSign className="h-6 w-6 sm:h-8 sm:w-8" />
          <h2 className="text-xl sm:text-2xl font-semibold">Billing</h2>
        </div>

        <Card className="mb-8 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white text-lg sm:text-xl">
              Current Plan: {currentPlan}
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm sm:text-base">
              Your subscription renews on{" "}
              {new Date(
                Date.now() + daysLeft * 24 * 60 * 60 * 1000
              ).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
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
                  className="w-full h-2 bg-zinc-700"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">
                    Bookmark usage
                  </span>
                  <span className="text-sm font-medium text-gray-300">
                    {bookmarksLimit - user.credit} / {bookmarksLimit}
                  </span>
                </div>
                <Progress
                  value={
                    ((bookmarksLimit - user.credit) / bookmarksLimit) * 100
                  }
                  className="w-full h-2 bg-zinc-700"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  <span className="bg-zinc-700 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    Current Plan
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-white text-lg sm:text-xl">{plan.name}</CardTitle>
                <CardDescription className="text-gray-400 text-sm sm:text-base">
                  {plan.price} / month
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <ul className="space-y-2 flex-grow mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300 text-sm sm:text-base">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-zinc-900 hover:opacity-90 transition-all ease-linear duration-200 text-white border border-[#393939] text-sm sm:text-base"
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