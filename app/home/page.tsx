"use client";

import {
  BookmarkCheck,
  Heart,
  LoaderCircle,
  Plus,
  SquarePen,
  Trash2,
  Search
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import useZustStore from "@/store/useZustStore";
import UpdateModal from "@/components/todos/UpdateModal";
import AddModal from "@/components/todos/AddModal";

export default function Component() {
  const { addTodo, getAllTodos, todos, deleteTodo, user, getUser } =
    useZustStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingAllTodos, setIsLoadingAllTodos] = useState(true);
  const [updateOpen, setUpdateOpen] = useState(-1);
  const [addOpen, setAddOpen] = useState(false);
  const [isLoadingDel, setIsLoadingDel] = useState<boolean>(false);
  const [getDeleteItem, setGetDeleteItem] = useState("");

  const categories = [
    "All",
    "Development",
    "Technology",
    "Business",
    "Design",
    "Marketing"
  ];

  const filteredBookmarks = todos.filter((bookmark) => {
    const matchesSearch =
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.link.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory.toLowerCase() === "all" ||
      (bookmark.category &&
        bookmark.category.toLowerCase() === selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  async function handleDeleteTodo(id: string) {
    try {
      setGetDeleteItem(id);
      await deleteTodo(id, setIsLoadingDel);
    } catch (err: any) {
      console.error(err);
    } finally {
      setGetDeleteItem(null);
    }
  }

  useEffect(() => {
    async function fetchAllTodos() {
      await getAllTodos(setIsLoadingAllTodos);
    }
    fetchAllTodos();
  }, [getAllTodos]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-2">
              <BookmarkCheck className="h-5 w-5 text-white" />
              <h2 className="text-lg font-semibold">All Bookmarks</h2>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search bookmarks..."
                  className="pl-8 w-full border border-zinc-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                {/* hidden element */}
                <SelectTrigger className="w-full sm:w-[180px] hidden">
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
                disabled={!user || user.credit === 0}
                onClick={() => setAddOpen(true)}
                className="w-full sm:w-auto rounded-[7px] mt-2 md:mt-0"
              >
                {user && user.credit > 0 ? (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Bookmark
                  </>
                ) : (
                  <p className="text-center">No credit left</p>
                )}
              </Button>
            </div>
          </div>
          {isLoadingAllTodos ? (
            <div className="flex items-center justify-center mt-[5%] text-base text-zinc-500 gap-2">
              <LoaderCircle className="h-5 w-5 animate-spin" />
              <p>Loading...</p>
            </div>
          ) : filteredBookmarks.length === 0 ? (
            <div className="h-full w-full flex justify-center mt-[30vh]">
              <p className="text-zinc-400 text-sm font-medium text-center">
                No bookmarks found
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBookmarks.map((bookmark, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-all duration-200"
                >
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-sm text-zinc-100 leading-tight mr-2">
                        {bookmark.title}
                      </h3>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-zinc-400"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-zinc-400"
                          onClick={() => setUpdateOpen(index)}
                        >
                          <SquarePen className="h-4 w-4" />
                        </Button>
                        <Button
                          disabled={isLoadingDel}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-zinc-400"
                          onClick={() => handleDeleteTodo(bookmark.id)}
                        >
                          {isLoadingDel && bookmark.id === getDeleteItem ? (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="break-all">
                      <Link
                        href={bookmark.link}
                        className="text-xs text-zinc-400 hover:text-zinc-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {bookmark.link}
                      </Link>
                    </div>
                    <div className="flex flex-wrap items-center justify-between text-xs gap-2">
                      <span className="text-zinc-500">
                        {new Date(bookmark.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
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
          )}
        </div>
      </div>
      <AddModal isOpen={addOpen} setIsOpen={setAddOpen} />
      {updateOpen !== -1 && (
        <UpdateModal
          prevLink={todos[updateOpen].link}
          prevTitle={todos[updateOpen].title}
          id={todos[updateOpen].id}
          isOpen={updateOpen !== -1}
          setIsOpen={() => setUpdateOpen(-1)}
        />
      )}
    </main>
  );
}
