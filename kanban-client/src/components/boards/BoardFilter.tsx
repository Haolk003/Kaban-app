"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type FilterOption = {
  value: string;
  label: string;
};

const filterOptions: FilterOption[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "archived", label: "Archived" },
  { value: "draft", label: "Draft" },
  { value: "my", label: "My Boards" },
];

interface BoardFilterProps {
  onFilterChange?: (value: string) => void;
}

export function BoardFilter({ onFilterChange }: BoardFilterProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("all");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[180px] justify-between"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>
              {filterOptions.find((option) => option.value === value)?.label ||
                "Filter Boards"}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0">
        <Command>
          <CommandInput placeholder="Search filter..." />
          <CommandList>
            <CommandEmpty>No filter found.</CommandEmpty>
            <CommandGroup>
              {filterOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    const newValue =
                      currentValue === value ? "all" : currentValue;
                    setValue(newValue);
                    onFilterChange?.(newValue);
                    setOpen(false);
                  }}
                  className="text-[12px]"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-[10px]",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
