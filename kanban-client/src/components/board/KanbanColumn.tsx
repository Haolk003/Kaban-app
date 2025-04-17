import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { KanbanCard } from "./KanbanCard";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useDroppable } from "@dnd-kit/core";
import type { KanbanTask } from "@/types/kanban";

interface KanbanColumnProps {
  title: string;
  count: number;
  tasks: KanbanTask[];
  columnId: string;
}

export function KanbanColumn({
  title,
  count,
  tasks,
  columnId,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: columnId,
  });
  return (
    <div className="flex flex-col gap-4 w-[350px] p-3">
      <div className="flex items-center justify-between">
        <h2 className="font-medium">
          {title} - {count}
        </h2>
        <Button variant="ghost" size="sm">
          <FiPlus className="h-4 w-4" />
          <span className="ml-1">Add Task</span>
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-200px)]  ">
        <div
          ref={setNodeRef}
          className={`flex flex-col gap-4 overflow-y-auto pr-2 rounded-md transition-colors ${
            isOver ? "bg-slate-100" : ""
          }`}
          style={{ height: "calc(100% - 40px)", minHeight: "100px" }}
        >
          {tasks.map((task) => (
            <KanbanCard key={task.id} task={task} />
          ))}
        </div>
        <ScrollBar orientation="vertical" className="w-2" />
      </ScrollArea>
    </div>
  );
}
