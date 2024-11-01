"use client";
import UserNavbar from "@/components/navbar/UserNavbar";
import { Separator } from "@/components/ui/separator";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";

const layout = ({ children }) => {
  return (
    <div className="bg-black text-white flex flex-col h-screen w-full relative">
      <ClerkLoading>
        <div className="flex items-center justify-center h-full text-base">
          <LoaderCircle className="h-5 w-5 animate-spin" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <UserNavbar />
        <div className="border-b border-[#2a2a2a]"></div>
        <div className="md:px-[5%]">{children}</div>
      </ClerkLoaded>
      <div className="w-full h-3/6 mt-[10%] absolute rounded-[50%] radial--blur opacity-25 pointer-events-none" />
    </div>
  );
};

export default layout;
