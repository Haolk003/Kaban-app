import type { Board } from "@/types/board";

export const boards: Board[] = [
  {
    id: "board-1",
    title: "Product Development",
    description: "Track product features and bug fixes",
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-06-20"),
    status: "active",
    owner: "John Doe",
    members: 5,
    tasksCount: {
      total: 24,
      completed: 18,
    },
    color: "#8b5cf6", // Purple
  },
  {
    id: "board-2",
    title: "Marketing Campaign",
    description: "Q3 marketing initiatives and content calendar",
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-18"),
    status: "active",
    owner: "Jane Smith",
    members: 3,
    tasksCount: {
      total: 15,
      completed: 7,
    },
    color: "#ec4899", // Pink
  },
  {
    id: "board-3",
    title: "Website Redesign",
    description: "Complete overhaul of company website",
    createdAt: new Date("2023-04-10"),
    updatedAt: new Date("2023-06-15"),
    status: "active",
    owner: "Alex Johnson",
    members: 4,
    tasksCount: {
      total: 32,
      completed: 28,
    },
    color: "#3b82f6", // Blue
  },
  {
    id: "board-4",
    title: "Customer Feedback",
    description: "Track and implement customer suggestions",
    createdAt: new Date("2023-05-20"),
    updatedAt: new Date("2023-06-10"),
    status: "active",
    owner: "Sarah Williams",
    members: 2,
    tasksCount: {
      total: 18,
      completed: 12,
    },
    color: "#10b981", // Green
  },
  {
    id: "board-5",
    title: "Mobile App Development",
    description: "iOS and Android app features and bugs",
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-06-22"),
    status: "active",
    owner: "Mike Brown",
    members: 6,
    tasksCount: {
      total: 45,
      completed: 30,
    },
    color: "#f59e0b", // Amber
  },
  {
    id: "board-6",
    title: "HR Initiatives",
    description: "Employee onboarding and training programs",
    createdAt: new Date("2023-06-05"),
    updatedAt: new Date("2023-06-21"),
    status: "draft",
    owner: "Emily Davis",
    members: 3,
    tasksCount: {
      total: 12,
      completed: 4,
    },
    color: "#ef4444", // Red
  },
];
