"use client";

import type * as React from "react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { NEW_BOARD } from "@/lib/graphql/actions/board/newBoard.action";
import { useMutation } from "@apollo/client";
import LoadingUI from "../ui/LoadingUI";

import { showToast } from "../ui/Toast";

interface AddBoardDialogProps {
  onAddBoard?: (title: string, description: string) => void;
  trigger?: React.ReactNode;
}

export function AddBoardDialog({ onAddBoard, trigger }: AddBoardDialogProps) {
  const [newBoardAction, { loading, data, error }] = useMutation(NEW_BOARD);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      newBoardAction({
        variables: {
          title,
          description,
        },
      });
    }
  };

  useEffect(() => {
    if (data && data.newBoard && !data.newBoard.error) {
      setOpen(false);
      showToast("success", "Board created successfully");
      setTitle("");
      setDescription("");
      if (onAddBoard) {
        onAddBoard(data.newBoard.title, data.newBoard.description);
      }
    }
    if (error) {
      console.log(error);
    }
  }, [loading, data, error]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Add Board</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Add Board</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="board-title" className="text-sm font-medium">
                  Task Board Title
                </label>
                <Input
                  id="board-title"
                  placeholder="Board Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full"
                  autoComplete="off"
                />
              </div>
              <div className="space-y-2 mt-2">
                <label htmlFor="board-title" className="text-sm font-medium">
                  Task Board Description
                </label>
                <Input
                  id="board-description"
                  placeholder="Board Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-end sm:justify-end mt-5 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Add Board
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      {loading && <LoadingUI />}
    </Dialog>
  );
}
