"use client";
import { ExitIcon } from "@radix-ui/react-icons";
import { Compass, DollarSign, Home, Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

const navItems = [
  {
    name: "Home",
    path: "/",
    ele: <Home className="h-4 w-4" />
  },
  {
    name: "Pricing",
    path: "/pricing",
    ele: <DollarSign className="h-4 w-4" />
  },
  {
    name: "Explore",
    path: "/explore",
    ele: <Compass className="h-4 w-4" />
  }
];

const Navbar = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <nav className="py-4 md:px-[10%] px-[5%] w-full flex justify-between text-white items-center">
      <Link href={"/"} className="font-bold md:text-2xl text-lg">
        LinksVault
      </Link>
      <div className="md:flex hidden items-center gap-3 bg-zinc-900 rounded-lg px-2 py-1">
        {navItems.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.path}
              className="hover:bg-zinc-950 py-[5px] px-2 min-w-fit rounded-md flex items-center gap-1 cursor-pointer"
            >
              {item.ele}
              <p className="md:text-sm md:font-semibold">{item.name}</p>
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-4">
        <Link
          href={"/signup"}
          className=" font-medium flex items-center gap-2 text-sm"
        >
          <ExitIcon className="h-4 w-4 md:block hidden" /> <p>Login</p>
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Menu className="md:hidden cursor-pointer h-5 w-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px] bg-black/80 backdrop-blur-md border-r border-gray-800"
          >
            <SheetHeader className="hidden">
              <SheetTitle className="text-2xl font-bold text-white">
                Navigation
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-8 text-center">
              {navItems.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className="text-base text-gray-300 hover:text-white transition-colors duration-200 ease-in-out"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
