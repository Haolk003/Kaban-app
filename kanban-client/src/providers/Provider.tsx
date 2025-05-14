"use client";

import React from "react";
import { graphqlClient } from "@/lib/graphql/gql.setup";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "./next-theme";
import  {TooltipProvider} from '@/components/ui/tooltip'

import { ToastContainer } from "react-toastify";
import AuthProvider from "./AuthProvider";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ApolloProvider client={graphqlClient}>
        <ThemeProvider>
          <ToastContainer />
          <TooltipProvider>
          <AuthProvider> {children}</AuthProvider>
          </TooltipProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
};
