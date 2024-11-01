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

export default function AddModal({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
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
      <DialogContent className="w-[90vw] max-w-[425px] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Add Bookmark
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Enter the URL and title for your content. Click add bookmark when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium">
              URL
            </Label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Input
                disabled={isLoading}
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow sm:rounded-r-none"
                placeholder="https://example.com"
              />
              <Button
                disabled={isLoading}
                type="button"
                variant="secondary"
                size="icon"
                className="w-full sm:w-auto sm:rounded-l-none sm:border sm:border-l-0 sm:border-input"
                onClick={() => handlePaste("url")}
              >
                <ClipboardIcon className="h-4 w-4 mr-2 sm:mr-0" />
                <span className="sm:hidden">Paste URL</span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Input
                disabled={isLoading}
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-grow sm:rounded-r-none"
                placeholder="Enter content title"
              />
              <Button
                disabled={isLoading}
                type="button"
                variant="secondary"
                size="icon"
                className="w-full sm:w-auto sm:rounded-l-none sm:border sm:border-l-0 sm:border-input"
                onClick={() => handlePaste("title")}
              >
                <ClipboardIcon className="h-4 w-4 mr-2 sm:mr-0" />
                <span className="sm:hidden">Paste Title</span>
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleAdd}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
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
