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

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const bookmarks = [
    {
      id: 1,
      title: "How to Build a SaaS Platform",
      url: "https://example.com/saas-guide",
      category: "Development",
      dateAdded: "2024-02-15",
      favicon: "https://example.com/favicon.ico"
    },
    {
      id: 2,
      title: "The Future of AI in 2024",
      url: "https://example.com/ai-future",
      category: "Technology",
      dateAdded: "2024-02-14",
      favicon: "https://example.com/favicon.ico"
    },
    {
      id: 3,
      title: "Marketing Strategies for Startups",
      url: "https://example.com/marketing",
      category: "Business",
      dateAdded: "2024-02-13",
      favicon: "https://example.com/favicon.ico"
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      url: "https://example.com/ui-ux-design",
      category: "Design",
      dateAdded: "2024-02-12",
      favicon: "https://example.com/favicon.ico"
    },
    {
      id: 5,
      title: "Introduction to Machine Learning",
      url: "https://example.com/machine-learning",
      category: "Technology",
      dateAdded: "2024-02-11",
      favicon: "https://example.com/favicon.ico"
    }
  ];

  const categories = [
    "All",
    "Development",
    "Technology",
    "Business",
    "Design",
    "Marketing"
  ];

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch =
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory.toLowerCase() === "all" ||
      bookmark.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <main className=" flex-1 flex flex-col h-full overflow-hidden">
      {/* Bookmarks Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All Bookmarks</h2>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBookmarks.map((bookmark) => (
              <Card
                key={bookmark.id}
                className="overflow-hidden transition-all hover:shadow-lg"
              >
                <CardHeader className="p-4 bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={bookmark.favicon}
                        alt=""
                        className="w-5 h-5 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src =
                            "/placeholder.svg?height=20&width=20";
                        }}
                      />
                      <span className="font-semibold truncate">
                        {bookmark.title}
                      </span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Add to Favorites</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground truncate">
                    {bookmark.url}
                  </p>
                </CardContent>
                <CardFooter className="p-4 bg-muted/30 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {bookmark.dateAdded}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {bookmark.category}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      asChild
                    >
                      <Link
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Open link</span>
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
