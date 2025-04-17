import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "../ui/Card";
import { Badge } from "../ui/Badge";
import {
  FiMoreVertical,
  FiThumbsUp,
  FiMessageSquare,
  FiCheck,
} from "react-icons/fi";
import type { KanbanTask } from "@/types/kanban";
import { useDraggable } from "@dnd-kit/core";

interface KanbanCardProps {
  task: KanbanTask;

  isDragging?: boolean;
}

export function KanbanCard({ task, isDragging = false }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const getLabelColor = (label: string) => {
    const colors: Record<string, string> = {
      "UI/UX": "bg-green-100 text-green-800",
      Admin: "bg-pink-100 text-pink-800",
      Development: "bg-red-100 text-red-800",
      Design: "bg-purple-100 text-purple-800",
      Marketing: "bg-blue-100 text-blue-800",
      Finance: "bg-yellow-100 text-yellow-800",
      Planning: "bg-teal-100 text-teal-800",
      Product: "bg-cyan-100 text-cyan-800",
      Designing: "bg-indigo-100 text-indigo-800",
      Review: "bg-violet-100 text-violet-800",
      Discussion: "bg-fuchsia-100 text-fuchsia-800",
    };
    return colors[label] || "bg-gray-100 text-gray-800";
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={isDragging ? "z-50" : ""}
    >
      <Card
        className={`overflow-hidden py-2 w-[320px] relative shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out ${
          isDragging ? "shadow-lg" : ""
        }`}
      >
        <CardContent className="">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                >
                  <path
                    d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4779 10.2794 11.496 9.31166C10.7245 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Created - {task.createdDate}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {task.daysLeft} days left
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                #{task.id}
              </span>
              <div className="flex flex-wrap gap-1">
                {task.labels.map((label, index) => (
                  <Badge
                    key={index}
                    className={`text-[9px] font-medium ${getLabelColor(label)}`}
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FiMoreVertical className="h-4 w-4" />
            </Button>
          </div>

          <h3 className="font-medium mb-2">{task.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {task.description}
          </p>

          {task.image && (
            <div className="mb-4">
              <img
                src={task.image || "/placeholder.svg"}
                alt={task.title}
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
          )}
        </CardContent>

        <CardFooter className=" flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center ">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <FiThumbsUp className="h-4 w-4" />
              </Button>
              <span className="text-sm">{task.likes}</span>
            </div>
            <div className="flex items-center ">
              <Button variant="ghost" size="icon" className="h-4 w-4">
                <FiMessageSquare className="h-4 w-4" />
              </Button>
              <span className="text-sm">{task.comments}</span>
            </div>
          </div>

          <div className="flex space-x-1">
            {task.assignees.map((assignee, index) => (
              <Avatar key={index} className="border-2 border-background">
                <AvatarImage
                  src={`/placeholder.svg?${assignee}`}
                  alt={`User ${assignee}`}
                />
                <AvatarFallback className="text-xs">U{assignee}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </CardFooter>

        {task.status === "completed" && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-100 text-green-800">
              <FiCheck className="h-3 w-3 mr-1" />
              Done
            </Badge>
          </div>
        )}

        {task.hasMore && (
          <div className="px-4 pb-4">
            <Button variant="secondary" className="w-full text-sm">
              View More
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
