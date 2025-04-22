"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import type { Board } from "@/types/board";
import { Button } from "@/components/ui/button";
import { BoardCard } from "@/components/boards/BoardCard";
import { CreateBoardCard } from "@/components/boards/CreateBoardCard";
import { BoardFilter } from "@/components/boards/BoardFilter";
import { BoardSearch } from "@/components/boards/BoardSearch";
import { useQuery } from "@apollo/client";
import { GET_BOARDS } from "@/lib/graphql/actions/board/getBoards.action";
import LoadingUI from "@/components/ui/LoadingUI";

export default function DashboardPage() {
  const { data: boardsData, loading } = useQuery(GET_BOARDS);
  const [boards, setBoards] = useState<Board[]>([]);
  const [filteredBoards, setFilteredBoards] = useState<Board[]>(boards);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let result = [...boards];

    // Apply status filter
    if (filter === "active") {
      result = result.filter((board) => board.status === "ACTIVE");
    } else if (filter === "archived") {
      result = result.filter((board) => board.status === "ARCHIVED");
    } else if (filter === "draft") {
      result = result.filter((board) => board.status === "DRAFT");
    } else if (filter === "my") {
      // In a real app, you would filter by the current user
      result = result.filter((board) => board.isOwner === true);
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((board) =>
        board.title.toLowerCase().includes(query)
      );
    }

    setFilteredBoards(result);
  }, [filter, searchQuery]);

  useEffect(() => {
    if (boardsData) {
      console.log(boardsData.getBoardsByUserId);
      setBoards(boardsData.getBoardsByUserId);
      setFilteredBoards(boardsData.getBoardsByUserId);
    }
  }, [boardsData]);

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Boards</h1>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Board
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <BoardFilter onFilterChange={handleFilterChange} />
          <BoardSearch onSearch={handleSearch} />
        </div>

        {filteredBoards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <svg
                className="h-10 w-10 text-muted-foreground"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="8" rx="2" width="16" x="4" y="5" />
                <rect height="8" rx="2" width="16" x="4" y="17" />
                <path d="M8 9h8" />
                <path d="M8 13h4" />
                <path d="M8 21h8" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">No boards found</h3>
            <p className="text-muted-foreground mt-2 mb-4 max-w-md">
              {searchQuery
                ? `No boards match your search "${searchQuery}". Try a different search term.`
                : "You don't have any boards yet. Create your first board to get started."}
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Board
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBoards.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
            <CreateBoardCard />
          </div>
        )}
      </div>
      {loading && <LoadingUI />}
    </div>
  );
}
