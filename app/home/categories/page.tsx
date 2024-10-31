"use client";

import { BookmarkCheck, Edit, Settings, Tags, Trash2 } from "lucide-react";
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

function Component() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Development", count: 45, color: "#0ea5e9" },
    { id: 2, name: "Technology", count: 32, color: "#8b5cf6" },
    { id: 3, name: "Business", count: 28, color: "#22c55e" },
    { id: 4, name: "Design", count: 24, color: "#f59e0b" },
    { id: 5, name: "Marketing", count: 19, color: "#ef4444" },
    { id: 6, name: "Productivity", count: 15, color: "#3b82f6" }
  ]);

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Tags className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Categories</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="overflow-hidden transition-all hover:shadow-lg"
            >
              <CardHeader className="p-4 bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookmarkCheck className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base">{category.name}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <span className="sr-only">Open menu</span>
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
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
                <p className="text-sm text-muted-foreground">
                  {category.count}{" "}
                  {category.count === 1 ? "bookmark" : "bookmarks"}
                </p>
              </CardContent>
              <CardFooter className="p-4 bg-muted/30">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`#view-${category.name.toLowerCase()}`}>
                    View Bookmarks
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Component;
