"use client";
import UserNavbar from "@/components/navbar/UserNavbar";
import { Separator } from "@/components/ui/separator";

const layout = ({ children }) => {
  return (
    <div className="bg-white flex flex-col h-screen w-full ">
      <UserNavbar />
      <Separator />
      <div className="md:px-[5%]">{children}</div>
    </div>
  );
};

export default layout;
