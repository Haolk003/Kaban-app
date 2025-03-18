// stores/auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { graphqlClient } from "@/lib/graphql/gql.setup";
import { CHECK_AUTH_QUERY } from "@/lib/graphql/actions/me.action";

type AuthStore = {
  user: null | {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
  };
  loading: boolean;
  error: null | string;
  setUser: (user: AuthStore["user"]) => void;
  clearUser: () => void;
  initializeAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      error: null,
      setUser: (user) => set({ user, loading: false }),
      clearUser: () => set({ user: null, loading: false }),
      initializeAuth: async () => {
        set({ loading: true, error: null });
        try {
          const { data } = await graphqlClient.query({
            query: CHECK_AUTH_QUERY,
            fetchPolicy: "network-only",
          });

          set({ user: data.me, loading: false });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        } catch (error: any) {
          set({ user: null, loading: false, error: "Unauthorized" });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
