"use client";

import {
  Bell,
  BookmarkCheck,
  CircleDollarSign,
  Menu,
  Plus,
  Search,
  Star,
  Tags
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { ClerkLoaded, ClerkLoading, SignedIn } from "@clerk/clerk-react";

export default function UserNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/home", icon: BookmarkCheck, label: "All" },
    { href: "/home/fav", icon: Star, label: "Fav" },
    { href: "/home/categories", icon: Tags, label: "Categories" },
    { href: "/home/billing", icon: CircleDollarSign, label: "Billing" }
  ];

  return (
    <header className="bg-transparent backdrop-blur-xl px-4 md:px-[5%] sticky top-0 z-50 w-full border-b border-gray-900">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-semibold text-lg">
            LinksVault
          </Link>
        </div>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className="px-3 py-2 flex items-center space-x-1 text-white bg-transparent hover:bg-gray-800 rounded-md transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <ClerkLoaded>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </ClerkLoaded>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6">
                <ul className="space-y-4">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center space-x-2 text-lg hover:text-gray-300 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
