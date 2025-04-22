"use client";

import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

import { AddMemberModal } from "./AddMemberModal";
import BoardNavbar from "./BoardNavbar";

export function KanbanBoard({ boardId }: { boardId: string }) {
  const [tasks, setTasks] = useState<KanbanTask[]>(generateMockTasks());

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

  return (
    <div className="flex flex-col min-h-screen">
      <BoardNavbar boardId={boardId} />

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
