export type BoardStatus = "ACTIVE" | "ARCHIVED" | "DRAFT";

export interface Board {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: BoardStatus;
  isOwner: boolean;
  membersCount: number;
  tasksCount: {
    total: number;
    completed: number;
  };
  color?: string;
}
