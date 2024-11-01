"use client";

import { Bell, BookmarkCheck, Plus, Search, Star, Tags } from "lucide-react";
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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/clerk-react";

export default function UserNavbar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-transparent md:px-[5%] sticky top-0 z-50 w-full ">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="font-semibold text-lg">
            LinksVault
          </Link>
          <div className="hidden lg:flex lg:w-[300px]">
            <form className="w-full">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search bookmarks..."
                  className="w-full pl-8 bg-transparent border border-[#3b3b3b]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
        <NavigationMenu className="hidden ml-auto lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/home"
                  className="px-2 flex items-center space-x-1 text-white bg-transparent"
                >
                  <BookmarkCheck className="h-4 w-4" />
                  <span>All</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/home/fav"
                  className="px-2 flex items-center space-x-1 text-white bg-transparent"
                >
                  <Star className="h-4 w-4" />
                  <span>Fav</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/home/categories"
                  className="px-2 mr-4 flex items-center space-x-1 text-white bg-transparent"
                >
                  <Tags className="h-4 w-4" />
                  <span>Categories</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-2 ml-auto lg:ml-0">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          {/* user button */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
      <div className="container flex lg:hidden py-2">
        <form className="w-full">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookmarks..."
              className="w-full pl-8 bg-muted"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
    </header>
  );
}
