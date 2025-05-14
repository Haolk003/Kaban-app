"use client";

import React, {useEffect} from "react";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Check, ChevronsUpDown, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {useMutation} from "@apollo/client";
import {ADD_TASK} from "@/lib/graphql/actions/task/add-task.action";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/Badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {uploadAttachment} from '@/lib/api/upload-attachment.client'

// Define the form schema with zod
const taskFormSchema = z.object({
  name: z.string().min(1, { message: "Task name is required" }),
  description: z.string().optional(),
  assignedTo: z.array(z.string()).default([]),
  targetDate: z.date().optional(),
  tags: z.array(z.string()).default([]),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

// Infer the type from the schema
type TaskFormValues = z.infer<typeof taskFormSchema>;

interface CreateTaskModalProps {
  listId:string
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: TaskFormValues & { attachments: File[] }) => void;
}

export function CreateTaskModal({
  listId,
  open,
  onOpenChange,
  onSubmit,
}: CreateTaskModalProps) {
  const [addTask,{data,loading,error}] = useMutation(ADD_TASK)
  // File attachments are handled separately from the form
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Available tags for the tag selector
  const [availableTags, setAvailableTags] = useState([
    "urgent",
    "bug",
    "feature",
    "enhancement",
    "documentation",
    "design",
    "testing",
  ]);
  const [tagInputValue, setTagInputValue] = useState("");
  const [tagPopoverOpen, setTagPopoverOpen] = useState(false);

  // Add these state variables after the other state declarations
  const [assigneePopoverOpen, setAssigneePopoverOpen] = useState(false);
  const [teamMembers] = useState([
    { id: "john", name: "John Doe" },
    { id: "jane", name: "Jane Smith" },
    { id: "alex", name: "Alex Johnson" },
    { id: "sarah", name: "Sarah Williams" },
    { id: "mike", name: "Mike Brown" },
  ]);

  // Initialize react-hook-form
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),

    defaultValues: {
      name: "",
      description: "",
      assignedTo: [],
      targetDate: undefined,
      tags: [],
      priority: "medium",
    },
  });

  // File handling functions
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setAttachments((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Tag handling functions
  const handleSelectTag = (tag: string) => {
    const currentTags = form.getValues("tags");
    if (!currentTags.includes(tag)) {
      form.setValue("tags", [...currentTags, tag], { shouldValidate: true });
    }
    setTagInputValue("");
    setTagPopoverOpen(false);
  };

  const handleCreateTag = () => {
    if (tagInputValue && !availableTags.includes(tagInputValue)) {
      // Add to available tags
      setAvailableTags((prev) => [...prev, tagInputValue]);
      // Select the new tag
      handleSelectTag(tagInputValue);
    }
  };

  const removeTag = (tag: string) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags.filter((t) => t !== tag),
      { shouldValidate: true }
    );
  };

  // Form submission
  const handleSubmit =async (data: { name: string; assignedTo: string[]; tags: string[]; priority: "low" | "medium" | "high"; description?: string | undefined; targetDate?: Date | undefined; } & { attachments: File[]; }) => {
    const res=await uploadAttachment(attachments);
      if(res){
        await addTask({variables:{listId,title:data.name,description:data.description,priority:"medium"}})
      }

    if (onSubmit) {

      onSubmit({
        ...data,
        attachments,
        name: "",
        assignedTo: [],
        tags: [],
        priority: "low",
      });
    }

    // Reset form
    form.reset();
    setAttachments([]);
    setTagInputValue("");
    onOpenChange(false);
  }

  useEffect(() => {
    if(data && data.createTask){
      console.log(data);
    }

  }, [data,error]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Task</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Task Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write Description"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label>File Attachments</Label>
              <div
                className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
                <p className="text-sm text-muted-foreground">
                  Drag & Drop your files or{" "}
                  <span className="text-primary underline">Browse</span>
                </p>
              </div>

              {attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-muted/50 p-2 rounded-md"
                    >
                      <span className="text-sm truncate max-w-[90%]">
                        {file.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="assignedTo"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Assigned To</FormLabel>
                  <Popover
                    open={assigneePopoverOpen}
                    onOpenChange={setAssigneePopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={assigneePopoverOpen}
                          className="w-full justify-between"
                        >
                          <span className="truncate">
                            {field.value.length > 0
                              ? `${field.value.length} members assigned`
                              : "Assign team members"}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search team members..." />
                        <CommandList>
                          <CommandEmpty>No team member found</CommandEmpty>
                          <CommandGroup>
                            {teamMembers.map((member) => (
                              <CommandItem
                                key={member.id}
                                value={member.id}
                                onSelect={() => {
                                  const currentAssignees = field.value || [];
                                  const newAssignees =
                                    currentAssignees.includes(member.id)
                                      ? currentAssignees.filter(
                                          (id) => id !== member.id
                                        )
                                      : [...currentAssignees, member.id];

                                  form.setValue("assignedTo", newAssignees, {
                                    shouldValidate: true,
                                  });
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value?.includes(member.id)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {member.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {field.value.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((memberId) => {
                        const member = teamMembers.find(
                          (m) => m.id === memberId
                        );
                        return (
                          <Badge
                            key={memberId}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {member?.name || memberId}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 p-0 hover:bg-transparent"
                              onClick={() => {
                                form.setValue(
                                  "assignedTo",
                                  field.value.filter((id) => id !== memberId),
                                  { shouldValidate: true }
                                );
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className=""
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low" className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Low
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium" className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                          Medium
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high" className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                          High
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="targetDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Target Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, "PPP")
                              : "Choose date and time"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tags</FormLabel>
                    <Popover
                      open={tagPopoverOpen}
                      onOpenChange={setTagPopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={tagPopoverOpen}
                            className="w-full justify-between"
                          >
                            <span className="truncate">
                              {field.value.length > 0
                                ? `${field.value.length} selected`
                                : "Select Tags"}
                            </span>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search tags..."
                            value={tagInputValue}
                            onValueChange={setTagInputValue}
                          />
                          <CommandList>
                            <CommandEmpty>
                              <div className="flex items-center justify-between px-4 py-2">
                                <span>No tags found</span>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={handleCreateTag}
                                >
                                  <Plus className="mr-2 h-4 w-4" />
                                  Create &#34;{tagInputValue}&#34;
                                </Button>
                              </div>
                            </CommandEmpty>
                            <CommandGroup>
                              {availableTags
                                .filter((tag) =>
                                  tag
                                    .toLowerCase()
                                    .includes(tagInputValue.toLowerCase())
                                )
                                .map((tag) => (
                                  <CommandItem
                                    key={tag}
                                    value={tag}
                                    onSelect={() => handleSelectTag(tag)}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value.includes(tag)
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {tag}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {field.value.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {tag}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 p-0 hover:bg-transparent"
                              onClick={() => removeTag(tag)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Add Task</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
