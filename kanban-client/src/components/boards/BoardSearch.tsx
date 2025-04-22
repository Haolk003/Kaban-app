"use client";

import type React from "react";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BoardSearchProps {
  onSearch?: (query: string) => void;
}

export function BoardSearch({ onSearch }: BoardSearchProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch?.(newQuery);
  };

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search boards..."
        className="w-full pl-9 md:w-[300px]"
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
}
