"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/store/userStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initializeAuth, user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      initializeAuth();
    }
  }, [user, initializeAuth]);

  return <>{children}</>;
}
