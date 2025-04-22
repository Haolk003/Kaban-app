import Link from "next/link";
import { CalendarDays, CheckCircle2, Users } from "lucide-react";
import type { Board } from "@/types/board";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";

interface BoardCardProps {
  board: Board;
}

export function BoardCard({ board }: BoardCardProps) {
  const completionPercentage =
    Math.round((board.tasksCount.completed / board.tasksCount.total) * 100) ||
    0;

  return (
    <Link href={`/board/${board.id}`} className="block">
      <Card className="h-full transition-all hover:border-primary/50 hover:shadow-sm px-4 py-4 border border-border/50 rounded-md">
        <CardContent className="p-5">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-lg">{board.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {board.description}
                </p>
              </div>
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: board.color || "#8b5cf6" }}
              />
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-sm text-muted-foreground mb-1.5">
                <span>Progress</span>
                <span>{completionPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${completionPercentage}%`,
                    backgroundColor: board.color || "#8b5cf6",
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-5 pt-2 flex justify-between border-t border-border/50 mt-4 ">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="mr-1 h-3.5 w-3.5" />
            <span>
              {new Date(board.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-1 h-3.5 w-3.5" />
            <span>{board.membersCount}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
            <span>
              {board.tasksCount.completed}/{board.tasksCount.total}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
