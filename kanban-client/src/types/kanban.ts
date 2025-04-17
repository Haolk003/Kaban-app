export type KanbanStatus = "new" | "todo" | "ongoing" | "review" | "completed";

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  status: KanbanStatus;
  createdDate: string;
  daysLeft: number;
  labels: string[];
  likes: number;
  comments: number;
  assignees: number[];
  image?: string;
  hasMore?: boolean;
}
