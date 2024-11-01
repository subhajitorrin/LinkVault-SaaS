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
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { ClipboardIcon, SquarePen } from "lucide-react";

export default function UpdateModal({ id, isOpen, setIsOpen }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

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

  const handleUpdate = () => {
    // Implement your update logic here
    console.log("Updating with URL:", url, "and Title:", title);
    // setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Update Content
          </DialogTitle>
          <DialogDescription>
            Enter the URL and title for your content. Click update when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium">
              URL
            </Label>
            <div className="flex">
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow rounded-r-none"
                placeholder="https://example.com"
              />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="rounded-l-none border border-l-0 border-input"
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
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-grow rounded-r-none"
                placeholder="Enter content title"
              />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="rounded-l-none border border-l-0 border-input"
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
            onClick={handleUpdate}
            className="w-full sm:w-auto"
          >
            Update Content
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
