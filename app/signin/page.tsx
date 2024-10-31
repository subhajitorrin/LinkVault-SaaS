"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Component() {
  return (
    <div className=" min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white">LinksVault</h1>
        </div>
        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader className="space-y-1">
            <h2 className="text-2xl font-semibold text-white">Login</h2>
            <p className="text-zinc-400 text-sm">
              Effortlessly organize and categorize your links with AI-driven
              precision.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <Input
                className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-400"
                placeholder="Email"
                type="email"
              />
              <Input
                className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-400"
                placeholder="Password"
                type="password"
              />
            </div>

            <Button className="w-full bg-white text-black hover:bg-zinc-200">
              Sign In with Email
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900 px-2 text-zinc-400">
                  or continue with
                </span>
              </div>
            </div>
            <Button className="w-full text-white bg-zinc-950 border border-[#1c1c1c]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="64"
                height="64"
                viewBox="0 0 64 64"
                className="fill-white"
              >
                <path d="M 32.521484 6 C 18.158484 6 6.515625 17.642 6.515625 32 C 6.515625 46.358 18.158484 58 32.521484 58 C 54.209484 58 59.098453 37.865969 57.064453 27.667969 L 51.181641 27.667969 L 49.269531 27.667969 L 32.515625 27.667969 L 32.515625 36.333984 L 49.279297 36.333984 C 47.351759 43.804816 40.588119 49.332031 32.515625 49.332031 C 22.943625 49.332031 15.181641 41.572 15.181641 32 C 15.181641 22.428 22.943625 14.667969 32.515625 14.667969 C 36.868625 14.667969 40.834906 16.283594 43.878906 18.933594 L 50.033203 12.779297 C 45.410203 8.5672969 39.266484 6 32.521484 6 z"></path>
              </svg>{" "}
              Google
            </Button>
          </CardContent>
          
        </Card>
      </div>
      <div className="w-full h-3/6 absolute rounded-[50%] radial--blur opacity-20 mx-10 pointer-events-none" />
    </div>
  );
}
