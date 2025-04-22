import BoardScreen from "@/screens/BoardScreen";
import React from "react";

export default function BoardPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <BoardScreen id={params.id} />
    </div>
  );
}
