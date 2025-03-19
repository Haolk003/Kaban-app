import { makeVar } from "@apollo/client";

export type AuthState = {
  isLoggedIn: boolean;
  user: null | {
    id: string;
    email: string;
    name: string;
    avatar?: {
      public_id?: string;
      url?: string;
    };
  };
};

export const authVar = makeVar<AuthState>({
  isLoggedIn: false,
  user: null,
});
