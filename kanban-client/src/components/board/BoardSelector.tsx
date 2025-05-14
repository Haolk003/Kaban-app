"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AddBoardDialog } from "./AddBoardDialog";
import { FiPlus } from "react-icons/fi";

interface Board {
  id: string;
  title: string;
}

interface BoardSelectorProps {
  boards: Board[];
  selectedBoard?: string;
  onSelectBoard: (boardId: string) => void;
  onAddBoard?: () => void;
  className?: string;
}

export function BoardSelector({
  boards,
  selectedBoard,
  onSelectBoard,
  onAddBoard,
  className,
}: BoardSelectorProps) {
  const [open, setOpen] = React.useState(false);

  const selectedBoardName = React.useMemo(() => {
    const board = boards.find((board) => board.id === selectedBoard);
    return board?.title || "Select a board";
  }, [selectedBoard, boards]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <span className="truncate">{selectedBoardName}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search boards..." />
          <CommandList>
            <CommandEmpty>No boards found.</CommandEmpty>
            <CommandGroup heading="Boards">
              {boards.map((board) => (
                <CommandItem
                  key={board.id}
                  value={board.id}
                  onSelect={() => {
                    onSelectBoard(board.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedBoard === board.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {board.title}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <AddBoardDialog
                onAddBoard={onAddBoard}
                trigger={
                  <Button
                    variant="outline"
                    className="h-9 bg-iris8 hover:bg-iris9 text-white hover:text-white hover:shadow-sm mt-4"
                  >
                    <FiPlus className="mr-2 h-4 w-4" />
                    Add Board
                  </Button>
                }
              />
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
