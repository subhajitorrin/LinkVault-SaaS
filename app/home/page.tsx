/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import {
  BookmarkIcon,
  ExternalLinkIcon,
  HeartIcon,
  Share2Icon
} from "lucide-react";
import { CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Component() {
  // @ts-ignore
  const { getAllTodos, todos, deleteTodo, user, getUser } = useZustStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoadingAllTodos, setIsLoadingAllTodos] = useState(true);
  const [updateOpen, setUpdateOpen] = useState(-1);
  const [addOpen, setAddOpen] = useState<boolean | null | number>(false);
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
    } catch (err: unknown) {
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
        <div className="max-w-8xl mx-auto space-y-6">
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
            <div className="md:grid md:gap-4 md:grid-cols-3 flex flex-col gap-4">
              {filteredBookmarks.map((bookmark, index: number) => {
                const tags = bookmark.tags.sort(
                  (a: string, b: string) => a.length - b.length
                );
                return (
                  <Card
                    key={index}
                    className="md:max-w-md w-full bg-card bg-zinc-900 text-white border-none relative"
                  >
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                      <div className="flex items-center gap-2">
                        <Badge className="text-xs font-normal text-white bg-zinc-800 border-none hover:bg-zinc-800">
                          {bookmark.platform}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <HeartIcon className="h-4 w-4" />
                          <span className="sr-only">Like</span>
                        </Button>
                        <Button
                          onClick={() => setUpdateOpen(index)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <SquarePen className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          disabled={isLoadingDel}
                          onClick={() => handleDeleteTodo(bookmark.id)}
                        >
                          {isLoadingDel && bookmark.id === getDeleteItem ? (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <Link
                        href={bookmark.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <h2 className="text-base font-semibold leading-tight tracking-tight group-hover:underline">
                          {bookmark.title.length > 40
                            ? bookmark.title.substring(0, 40) + "..."
                            : bookmark.title}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground truncate">
                          {bookmark.link}
                        </p>
                      </Link>
                    </CardContent>
                    <CardFooter className="pt-0 ">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
                        <span>•</span>
                        {tags.slice(0, 2).map((tag: string, i: number) => {
                          return (
                            <span
                              key={`${index}_${i}`}
                              className="inline-flex items-center rounded-full bg-zinc-800/50 px-2 py-1 text-xs font-medium text-zinc-300 ring-1 ring-inset ring-zinc-700/50"
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
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
          // @ts-ignore
          isOpen={updateOpen !== -1}
          setIsOpen={() => setUpdateOpen(-1)}
        />
      )}
    </main>
  );
}
