"use client"

import React,{useEffect} from "react";
import HomeScreen from "@/screens/HomeScreen";
import {useRouter} from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/boards')
  }, []);
  return <div></div>;
}
