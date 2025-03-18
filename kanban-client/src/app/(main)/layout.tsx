import BoardHeader from "@/components/board/BoardHeader";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <BoardHeader />
      <div className="">{children}</div>
    </div>
  );
}
