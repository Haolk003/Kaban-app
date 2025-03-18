import { SafeUser } from ".";
import { BoardMember } from "../board";
import { UserTask } from ".";

// Types for API responses
export type ApiUserResponse = {
  user: SafeUser;
  boardMemberships: BoardMember[];
  recentTasks: UserTask[];
};
