import { ExitIcon } from "@radix-ui/react-icons";
import { Compass, DollarSign, Home } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

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
  return (
    <nav className="py-4 px-[10%] w-full flex justify-between text-white items-center">
      <Link href={"/"} className="font-bold text-2xl">
        LinksVault
      </Link>
      <div className="flex items-center gap-3 bg-zinc-900 rounded-lg px-2 py-1">
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
      <Link
        href={"/signup"}
        className=" font-medium flex items-center gap-2 text-sm"
      >
        <ExitIcon className="h-4 w-4" /> <p>Login</p>
      </Link>
    </nav>
  );
};

export default Navbar;
