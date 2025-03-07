"use client";

import { useEffect } from "react";
import { CHECK_AUTH_QUERY } from "@/lib/graphql/actions/me.action";

import { useQuery } from "@apollo/client";
import { authVar } from "@/lib/apollo/cache";

export default function AuthProvider() {
  const { data } = useQuery(CHECK_AUTH_QUERY, { fetchPolicy: "network-only" });

  useEffect(() => {
    if (data?.me) {
      authVar({
        isLoggedIn: true,
        user: data.me,
      });
    }
  }, [data]);

  return null;
}
