import { KanbanBoard } from "@/components/board/KanbanBoard";
import React from "react";

const HomeScreen = () => {
  return (
    <main className="min-h-screen bg-background">
      <KanbanBoard />
    </main>
  );
};

export default HomeScreen;
