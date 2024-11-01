import Navbar from "@/components/navbar/Navbar";
import { BadgePlus, CheckCircle2, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Link2, Search, Tags, FolderTree, Brain, Lock } from "lucide-react";

const features = [
  {
    icon: <Link2 className="w-6 h-6 text-primary" />,
    title: "Link Storage",
    description:
      "Save and organize links from any website for easy access later."
  },
  {
    icon: <FolderTree className="w-6 h-6 text-primary" />,
    title: "AI Categorization",
    description:
      "Automatically categorize your links using advanced AI algorithms."
  },
  {
    icon: <Tags className="w-6 h-6 text-primary" />,
    title: "Smart Tagging",
    description:
      "AI-powered tag suggestions for efficient organization and retrieval."
  },
  {
    icon: <Search className="w-6 h-6 text-primary" />,
    title: "Intelligent Search",
    description:
      "Quickly find your saved links with AI-enhanced search capabilities."
  },
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    title: "AI Insights",
    description:
      "Gain valuable insights and recommendations based on your link collection."
  },
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    title: "Secure Storage",
    description: "Keep your links safe with our robust security measures."
  }
];

const plans = [
  {
    name: "Free",
    price: "$0.00",
    features: [
      "5 bookmarks/month",
      "No tag organization",
      "No browser extension",
      "Basic support",
      "Limited community access"
    ]
  },
  {
    name: "Pro",
    price: "$7.00",
    features: [
      "40 bookmarks/month",
      "Advanced tag management",
      "Browser extension",
      "Priority support",
      "Exclusive resources"
    ]
  },
  {
    name: "Enterprise",
    price: "$30.00",
    features: [
      "Unlimited bookmarks",
      "Custom tag management",
      "Enhanced browser extension",
      "Dedicated account manager",
      "Custom reporting"
    ]
  }
];

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen text-white px-[5%] md:px-[10%]">
        {/* herosection */}
        <section className="mt-16" id="home">
          <h1 className="md:text-center text-start text-gradient leading-tight md:text-7xl text-3xl font-semibold">
            Streamline Your Links
          </h1>
          <p className="md:text-sm text-xs opacity-50 md:text-center text-start md:mt-4">
            Effortlessly organize and categorize your links with AI-driven
            precision, <br className="md:block hidden" /> making access and
            management simple and efficient.
          </p>
          <div className="flex items-center md:flex-row flex-col md:justify-center gap-2 md:gap-5 mt-5 w-full">
            <Button
              variant="outline"
              className="rounded-md bg-transparent text-sm w-full md:w-auto border border-[#1e1e1e]"
            >
              Watch Demo
            </Button>
            <Link href="/sign-in" className="w-full md:w-auto">
              <Button className="rounded-md text-sm flex gap-2 w-full">
                <BadgePlus /> Get Started
              </Button>
            </Link>
          </div>

          <div className="relative md:pt-20 mt-8">
            <div className="w-full h-3/6 absolute rounded-[50%] radial--blur opacity-40 mx-10" />
            <div className="w-full aspect-video relative">
              <Image
                priority
                src="/dashimg.png"
                className="opacity-[0.95] rounded-lg"
                alt="snippet"
                sizes="100vw"
                fill
                objectFit="contain"
              />
              <div className="w-full h-[30%] bg-black z-10 absolute bottom-[-10%] blur-3xl"></div>
              <div className="w-[10%] h-full bg-black z-10 absolute left-[-10%] blur-2xl"></div>
              <div className="w-[10%] h-full bg-black z-10 absolute right-[-10%] blur-2xl"></div>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 md:px-6 lg:px-8 " id="feature">
          <div className="max-w-7xl mx-auto">
            <h2 className=" text-3xl md:text-5xl font-bold text-center mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-l from-primary to-primary-foreground">
                Powerful Features
              </span>
            </h2>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Discover how our AI-powered platform revolutionizes link
              management, boosting your productivity and streamlining your
              digital workflow.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-zinc-950 border-zinc-800 text-white"
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {React.cloneElement(feature.icon, {
                        className: "w-4 h-4 text-white"
                      })}
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="mt-20 text-center">
              <Link href="/sign-in">
                <Button className="rounded-full text-sm px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Organizing Your Links
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="md:mt-16" id="pricing">
          <div className="">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-l from-primary to-primary-foreground">
                Choose Your Plan
              </span>
            </h2>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Select a pricing plan that fits your needs. Our flexible options
              allow you to choose the right features for your link management
              journey, ensuring you get the most out of our platform.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`bg-zinc-950 border-zinc-800 relative `}
              >
                <div className="w-full h-3/6 absolute rounded-[50%] radial--blur opacity-30 mx-10" />

                <CardHeader>
                  <CardTitle className="text-white text-lg sm:text-xl">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm sm:text-base">
                    {plan.price} / month
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-300 text-sm sm:text-base"
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={"/sign-in"}>
                    <Button className="w-full bg-zinc-900 hover:opacity-90 transition-all ease-linear duration-200 text-white border border-[#393939] text-sm sm:text-base">
                      Subscribe
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16 flex justify-end mr-[5%]">
          <Link href={"/"}>
            <p className="text-center text-zinc-500 flex items-center cursor-pointer ">
              <Github className="h-4 w-4 mr-1 relative mt-1" />
              subhajitorrin
            </p>
          </Link>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
