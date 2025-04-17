import { TaskPriority } from "./enum";
import { MemberRole } from "./enum";
export type SafeUser = {
  id: string;
  email: string;
  name: string;
  avatar?: {
    url: string;
    public_id?: string;
  };
  jobName?: string;
  location?: string;
  bio?: string;
};

export type BoardMember = {
  userId: string;
  role: MemberRole;
  user: Pick<SafeUser, "id" | "name" | "avatar">;
};

export type UserProfile = Pick<
  SafeUser,
  "id" | "name" | "email" | "avatar" | "jobName" | "location" | "bio"
> & {
  totalBoards?: number | 0;
  totalTasks?: number | 0;
};

export type UserTask = {
  id: string;
  title: string;
  priority: TaskPriority;
  boardId: string;
  boardTitle: string;
  dueDate?: string;
};

// Types for authentication flows
export type AuthUser = {
  email: string;
  name?: string;
  password?: string;
};

// Types for board relationships
export type UserBoard = {
  id: string;
  title: string;
  projectKey: string;
  role: MemberRole;
  lastAccessed: string;
};
