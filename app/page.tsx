import { Button } from "@/components/ui/button";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div className="h-screen text-white">
      {/* herosection */}
      <section className="mt-16">
        <h1 className="md:text-center text-start text-gradient leading-tight md:text-7xl md:font-semibold">
          Streamline Your Links
        </h1>
        <p className="md:text-sm opacity-50 text-center mt-4">
          Effortlessly organize and categorize your links with AI-driven
          precision, <br /> making access and management simple and efficient.
        </p>
        <div className="flex md:flex-row flex-col md:justify-center gap-5 md:mt-5 w-full">
          <Button
            variant="outline"
            className="rounded-lg bg-transparent text-sm"
          >
            Watch Demo
          </Button>
          <Link href="/signin">
            <Button className="rounded-lg text-sm flex gap-2 w-full">
              <BadgePlus /> Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
