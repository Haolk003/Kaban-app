import { KanbanBoard } from "@/components/board/KanbanBoard";
import React from "react";

interface BoardScreenProps {
  id: string;
}
const BoardScreen = ({ id }: BoardScreenProps) => {
  return (
    <main className="min-h-screen bg-background">
      <KanbanBoard boardId={id} />
    </main>
  );
};

export default BoardScreen;
