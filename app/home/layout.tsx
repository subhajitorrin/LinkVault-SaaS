"use client";

import {
  Bell,
  Bookmark,
  ExternalLink,
  Grid,
  Home,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Star,
  Tags,
  Trash2
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

const categories = [
  "All",
  "Development",
  "Technology",
  "Business",
  "Design",
  "Marketing"
];

const layout = ({ children }) => {
  return (
    <div className="bg-white flex">
      <aside className="hidden lg:flex h-full w-64 flex-col border-r">
        <div className="p-4">
          <h1 className="text-2xl font-bold">LinksVault</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-primary hover:bg-muted transition-colors"
            href="/home"
          >
            <Bookmark className="h-4 w-4" />
            All Bookmarks
          </Link>
          <Link
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted transition-colors"
            href="/home/favorites"
          >
            <Star className="h-4 w-4" />
            Favorites
          </Link>
          <Link
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted transition-colors"
            href="/home/categories"
          >
            <Tags className="h-4 w-4" />
            Categories
          </Link>
        </nav>
      </aside>
      <div className="flex flex-col h-screen w-full">
        <header className="border-b">
          <div className="flex h-14 items-center gap-4 px-6">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Grid className="h-4 w-4" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
            <div className="flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search bookmarks..."
                    className="pl-8 bg-muted"
                  />
                </div>
              </form>
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" className="rounded-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Bookmark
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Add New Bookmark</SheetTitle>
                  <SheetDescription>
                    Add a new URL to your collection
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Input type="url" placeholder="Enter URL" />
                  <Input type="text" placeholder="Title (Optional)" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {categories.slice(1).map((category) => (
                          <SelectItem
                            key={category}
                            value={category.toLowerCase()}
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button>Save Bookmark</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default layout;
