"use client";

import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ME } from "@/graphql/actions/me.action";
const HomeScreen = () => {
  const { data } = useQuery(ME);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return <div>HomeScreen</div>;
};

export default HomeScreen;
