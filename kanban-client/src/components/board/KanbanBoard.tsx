"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FiMenu,
  FiSearch,
  FiMoon,
  FiShoppingCart,
  FiBell,
  FiGrid,
  FiMaximize,
  FiSettings,
} from "react-icons/fi";
import { KanbanColumn } from "./KanbanColumn";
import type { KanbanTask } from "@/types/kanban";
import { generateMockTasks } from "@/lib/mock-data";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { handleDragEnd, getColumnIdFromStatus } from "@/lib/drag-utils";
import { KanbanCard } from "./KanbanCard";

import { BoardSelector } from "./BoardSelector";
import { useAuthStore } from "@/store/userStore";
import { AddMemberModal } from "./AddMemberModal";

export function KanbanBoard() {
  const { user } = useAuthStore();

  const [tasks, setTasks] = useState<KanbanTask[]>(generateMockTasks());
  const [boards, setBoards] = useState<{ id: string; title: string }[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string | undefined>(
    boards[0]?.id
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const newTasks = tasks.filter((task) => task.status === "new");
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const ongoingTasks = tasks.filter((task) => task.status === "ongoing");
  const reviewTasks = tasks.filter((task) => task.status === "review");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Find the active task
  const activeTask = activeId
    ? tasks.find((task) => task.id === activeId)
    : null;

  const handleAddBoard = () => {
    // Logic to add a new board
    console.log("Add Board clicked");
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
    <div className="flex flex-col min-h-screen">
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
                onSelectBoard={setSelectedBoard}
                className="w-full"
                onAddBoard={handleAddBoard}
              />

              {/* {selectedBoard && (
                <div className="p-4 border rounded-md mt-4">
                  <h2 className="font-medium">
                    Selected Board:{" "}
                    {boards.find((b) => b.id === selectedBoard)?.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Board ID: {selectedBoard}
                  </p>
                </div>
              )} */}
            </div>
            {/* <Select>
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder="All Boards" />
              </SelectTrigger>
              <SelectContent className="w-[180px]">
                <SelectItem value="all">All Boards</SelectItem>
                {boards.map((board: any) => (
                  <SelectItem key={board.id} value={board.id}>
                    {board.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
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

      <div className="flex flex-col p-6 gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Kanban Board</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Task</span>
            <span className="mx-2">&gt;</span>
            <span className="font-medium text-foreground">Kanban Board</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort By</span>
              <Button variant="outline" className="h-9">
                <span className="mr-2">Default</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <path
                    d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Avatar key={i} className="border-2 border-background">
                  <AvatarImage
                    src={`/placeholder.svg?${i}`}
                    alt={`User ${i + 1}`}
                  />
                  <AvatarFallback>U{i + 1}</AvatarFallback>
                </Avatar>
              ))}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500 text-white text-xs font-medium border-2 border-background">
                +8
              </div>
              <AddMemberModal boardId="1232" />
            </div>

            <div className="flex items-center gap-2 ml-4">
              <Input className="h-9 w-[180px]" placeholder="Search" />
              <Button className="h-9">Search</Button>
            </div>
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={(event) => {
            setActiveId(event.active.id.toString());
          }}
          onDragEnd={(event) => {
            setActiveId(null);
            handleDragEnd(event, tasks, setTasks);
          }}
          onDragCancel={() => setActiveId(null)}
        >
          <ScrollArea className="w-full">
            <div className="flex gap-2 p-2">
              <KanbanColumn
                title="NEW"
                count={newTasks.length}
                tasks={newTasks}
                columnId={getColumnIdFromStatus("new")}
              />
              <KanbanColumn
                title="TODO"
                count={todoTasks.length}
                tasks={todoTasks}
                columnId={getColumnIdFromStatus("todo")}
              />
              <KanbanColumn
                title="ON GOING"
                count={ongoingTasks.length}
                tasks={ongoingTasks}
                columnId={getColumnIdFromStatus("ongoing")}
              />
              <KanbanColumn
                title="IN REVIEW"
                count={reviewTasks.length}
                tasks={reviewTasks}
                columnId={getColumnIdFromStatus("review")}
              />
              <KanbanColumn
                title="COMPLETED"
                count={completedTasks.length}
                tasks={completedTasks}
                columnId={getColumnIdFromStatus("completed")}
              />
            </div>
            <ScrollBar orientation="horizontal" className="h-1.5 hover:h-2" />
          </ScrollArea>
          <DragOverlay dropAnimation={null}>
            {activeTask ? <KanbanCard task={activeTask} isDragging /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
