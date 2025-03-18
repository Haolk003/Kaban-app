import { MemberRole } from "../user/enum";
import { SafeUser } from "../user/index";

export type BoardMember = {
  userId: string;
  role: MemberRole;
  user: Pick<SafeUser, "id" | "name" | "imageUrl">;
};
