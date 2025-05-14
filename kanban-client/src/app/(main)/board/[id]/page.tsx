
import React from "react";
import BoardScreen from "@/screens/BoardScreen";

export default function BoardPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <BoardScreen  />
    </div>
  );
}
