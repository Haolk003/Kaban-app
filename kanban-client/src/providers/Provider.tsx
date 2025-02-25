"use client";

import React from "react";
import { graphqlClient } from "@/graphql/gql.setup";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "./next-theme";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ApolloProvider client={graphqlClient}>
        <ThemeProvider>{children}</ThemeProvider>
      </ApolloProvider>
    </>
  );
};
