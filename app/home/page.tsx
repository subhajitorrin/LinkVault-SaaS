"use client";

import {
  BookmarkCheck,
  Heart,
  LoaderCircle,
  Plus,
  SquarePen,
  Trash2
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import useZustStore from "@/store/useZustStore";
import UpdateModal from "@/components/todos/UpdateModal";
import AddModal from "@/components/todos/AddModal";

export default function Component() {
  const { addTodo, getAllTodos, todos, deleteTodo } = useZustStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [enteredUrl, setEnteredUrl] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingAllTodos, setIsLoadingAllTodos] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [isLoadingDel, setIsLoadingDel] = useState(false);

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

  async function handleAddBookmark(e: React.FormEvent) {
    e.preventDefault();
    try {
      await addTodo({ url: enteredUrl, title: enteredTitle }, setIsLoading);
      setEnteredUrl("");
      setEnteredTitle("");
      setOpen(false);
    } catch (err: any) {
      console.error(err);
    }
  }

  async function handleDeleteTodo(id: string) {
    try {
      await deleteTodo(id, setIsLoadingDel);
    } catch (err: any) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function fetchAllTodos() {
      await getAllTodos(setIsLoadingAllTodos);
    }
    fetchAllTodos();
  }, [getAllTodos]);

  return (
    <main className=" flex-1 flex flex-col h-full overflow-hidden">
      {/* Bookmarks Content */}
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <BookmarkCheck className="h-5 w-5 text-white" />
              <h2 className="text-lg font-semibold">All Bookmarks</h2>
            </div>
            <div className="flex gap-2">
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
              <Button
                onClick={() => setAddOpen(true)}
                className="rounded-[7px]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Bookmark
              </Button>
              <AddModal isOpen={addOpen} setIsOpen={setAddOpen} />
            </div>
          </div>
          {isLoadingAllTodos ? (
            <div className="flex items-center justify-center mt-[5%] text-base text-zinc-500 gap-2">
              <LoaderCircle className="h-5 w-5 animate-spin" />
              <p>Loading...</p>
            </div>
          ) : todos.length === 0 ? (
            <div className="h-full w-full flex justify-center mt-[30vh]">
              <p className="text-zinc-400 text-sm font-medium text-center">
                No bookmarks found
              </p>
            </div>
          ) : null}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {todos.length > 0 &&
              todos.map((bookmark, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-all duration-200"
                >
                  <CardContent className="p-4 space-y-4">
                    <div className=" flex justify-between items-center">
                      <h3 className="font-medium text-sm text-zinc-100 leading-none">
                        {bookmark.title}
                      </h3>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-zinc-400 "
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-zinc-400 "
                          onClick={() => setUpdateOpen(true)}
                        >
                          <SquarePen className="h-4 w-4 " />
                        </Button>
                        <UpdateModal
                          prevLink={bookmark.link}
                          prevTitle={bookmark.title}
                          id={bookmark.id}
                          isOpen={updateOpen}
                          setIsOpen={setUpdateOpen}
                        />
                        <Button
                          disabled={isLoadingDel}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-zinc-400 "
                          onClick={() => handleDeleteTodo(bookmark.id)}
                        >
                          {isLoadingDel ? (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="">
                      <Link
                        href={bookmark.link}
                        className="text-xs text-zinc-400 hover:text-zinc-300 truncate block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {bookmark.link}
                      </Link>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">
                        {new Date(bookmark.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                          }
                        )}
                        &nbsp;•&nbsp;
                        {new Date(bookmark.createdAt).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                          }
                        )}
                      </span>

                      <span className="inline-flex items-center rounded-full bg-zinc-800/50 px-2 py-1 text-xs font-medium text-zinc-300 ring-1 ring-inset ring-zinc-700/50">
                        {bookmark.category ? bookmark.category : "Nothing"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
