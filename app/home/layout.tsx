"use client";
import UserNavbar from "@/components/navbar/UserNavbar";
import { Separator } from "@/components/ui/separator";

const layout = ({ children }) => {
  return (
    <div className="bg-black text-white flex flex-col h-screen w-full ">
      <UserNavbar />
      <div className="border-b border-[#2a2a2a]"></div>
      <div className="md:px-[5%]">{children}</div>
    </div>
  );
};

export default layout;
