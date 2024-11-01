import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { BadgePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen text-white px-[5%] md:px-[10%]">
        {/* herosection */}
        <section className="mt-16">
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
            <Link href="/signin" className="w-full md:w-auto">
              <Button className="rounded-md text-sm flex gap-2 w-full">
                <BadgePlus /> Get Started
              </Button>
            </Link>
          </div>

          <div className="relative py-20">
            <div className="w-full h-3/6 absolute rounded-[50%] radial--blur opacity-40 mx-10" />
            <div className="w-full aspect-video relative">
              <Image
                priority
                src="/dashboard-snippet.png"
                className="opacity-[0.95]"
                alt="snippet"
                sizes="100vw"
                fill
                objectFit="contain"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
