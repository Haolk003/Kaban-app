"use client";

import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { CHECK_AUTH_QUERY } from "@/lib/graphql/actions/me.action";
const HomeScreen = () => {
  const { data } = useQuery(CHECK_AUTH_QUERY);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return <div>HomeScreen</div>;
};

export default HomeScreen;
