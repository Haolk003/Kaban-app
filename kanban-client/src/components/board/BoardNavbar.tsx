import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  FiBell,
  FiGrid,
  FiMaximize,
  FiMenu,
  FiMoon,
  FiSearch,
  FiSettings,
  FiShoppingCart,
} from "react-icons/fi";
import { BoardSelector } from "./BoardSelector";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { useAuthStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

const BoardNavbar = ({ boardId }: { boardId: string }) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [boards, setBoards] = useState<{ id: string; title: string }[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string | undefined>(
    boardId || undefined
  );

  const handleAddBoard = () => {
    // Logic to add a new board
    console.log("Add Board clicked");
  };

  const handleOnSelectBoard = (boardId: string) => {
    setSelectedBoard(boardId);
    router.push(`/board/${boardId}`);
  };

  useEffect(() => {
    if (user && user.boardMembers && user.boardMembers.length > 0) {
      const boardData = user.boardMembers.map((board) => ({
        id: board.board.id,
        title: board.board.title,
      }));
      console.log(boardData);
      setBoards(boardData);
    }
  }, [user]);

  return (
    <header className="border-b">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <FiMenu className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <div className="space-y-4">
            <BoardSelector
              boards={boards}
              selectedBoard={selectedBoard}
              onSelectBoard={handleOnSelectBoard}
              className="w-full"
              onAddBoard={handleAddBoard}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <FiSearch className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-1 px-2 py-1 border rounded-md">
            <Avatar className="h-5 w-5">
              <AvatarImage src="/placeholder.svg" alt="US" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">EN</span>
          </div>

          <Button variant="ghost" size="icon">
            <FiMoon className="h-5 w-5" />
          </Button>

          <div className="relative">
            <Button variant="ghost" size="icon">
              <FiShoppingCart className="h-5 w-5" />
            </Button>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-[10px] font-medium text-white">
              5
            </span>
          </div>

          <div className="relative">
            <Button variant="ghost" size="icon">
              <FiBell className="h-5 w-5" />
            </Button>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-medium text-white">
              8
            </span>
          </div>

          <Button variant="ghost" size="icon">
            <FiGrid className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon">
            <FiMaximize className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Jason Taylor" />
              <AvatarFallback>JT</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Jason Taylor</p>
              <p className="text-xs text-muted-foreground">Web Designer</p>
            </div>
          </div>

          <Button variant="ghost" size="icon">
            <FiSettings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default BoardNavbar;
