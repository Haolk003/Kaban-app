import { makeVar } from "@apollo/client";

export type AuthState = {
  isLoggedIn: boolean;
  user: null | {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
};

export const authVar = makeVar<AuthState>({
  isLoggedIn: false,
  user: null,
});
