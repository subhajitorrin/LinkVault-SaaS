"use client";

import { ExternalLink, Heart, MoreHorizontal, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function FavoritesComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const favorites = [
    {
      id: 1,
      title: "The Future of AI in 2024",
      url: "https://example.com/ai-future",
      favicon: "https://example.com/favicon.ico",
      dateAdded: "2024-02-15",
      category: "Technology"
    },
    {
      id: 2,
      title: "10 Must-Know Web Development Trends",
      url: "https://example.com/web-dev-trends",
      favicon: "https://example.com/favicon.ico",
      dateAdded: "2024-02-14",
      category: "Development"
    },
    {
      id: 3,
      title: "The Ultimate Guide to Product Management",
      url: "https://example.com/product-management",
      favicon: "https://example.com/favicon.ico",
      dateAdded: "2024-02-13",
      category: "Business"
    },
    {
      id: 4,
      title: "Mastering React Hooks",
      url: "https://example.com/react-hooks",
      favicon: "https://example.com/favicon.ico",
      dateAdded: "2024-02-12",
      category: "Development"
    },
    {
      id: 5,
      title: "The Psychology of UX Design",
      url: "https://example.com/ux-psychology",
      favicon: "https://example.com/favicon.ico",
      dateAdded: "2024-02-11",
      category: "Design"
    }
  ];

  const filteredFavorites = favorites.filter((favorite) =>
    favorite.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Favourites</h2>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date Added</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedFavorites.map((favorite) => (
          <Card key={favorite.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
              <Image
                src={favorite.favicon}
                alt=""
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=32&width=32";
                }}
              />
              <CardTitle className="text-base">{favorite.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground truncate">
                {favorite.url}
              </p>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                  {favorite.category}
                </span>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <span>{favorite.dateAdded}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between mt-auto">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href={favorite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Link
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Heart className="mr-2 h-4 w-4" />
                    Remove from Favorites
                  </DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
