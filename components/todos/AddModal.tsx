"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { ClipboardIcon, LoaderCircle } from "lucide-react";
import useZustStore from "@/store/useZustStore";

export default function AddModal({ isOpen, setIsOpen }) {
  const { addTodo } = useZustStore();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePaste = async (field: "url" | "title") => {
    try {
      const text = await navigator.clipboard.readText();
      if (field === "url") {
        setUrl(text);
      } else {
        setTitle(text);
      }
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  const handleAdd = async () => {
    try {
      await addTodo({ url, title }, setIsLoading);
      setUrl("");
      setTitle("");
      setIsOpen(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Add Bookmark
          </DialogTitle>
          <DialogDescription>
            Enter the URL and title for your content. Click add bookmark when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium">
              URL
            </Label>
            <div className="flex">
              <Input
                disabled={isLoading}
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow rounded-r-none"
                placeholder="https://example.com"
              />
              <Button
                disabled={isLoading}
                type="button"
                variant="secondary"
                size="icon"
                className="rounded-l-none border border-l-0 border-input ml-1"
                onClick={() => handlePaste("url")}
              >
                <ClipboardIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <div className="flex">
              <Input
                disabled={isLoading}
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-grow rounded-r-none"
                placeholder="Enter content title"
              />
              <Button
                disabled={isLoading}
                type="button"
                variant="secondary"
                size="icon"
                className="rounded-l-none border border-l-0 border-input ml-1"
                onClick={() => handlePaste("title")}
              >
                <ClipboardIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleAdd}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <LoaderCircle className="h-5 w-5 animate-spin" />
                Adding...
              </div>
            ) : (
              "Add Bookmark"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
