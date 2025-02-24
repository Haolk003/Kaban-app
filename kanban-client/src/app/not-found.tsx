"use client";

import "./globals.css";
import AnimatedBackground from "@/screens/error/AnimatedBackground";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
export default function NotFound() {
  return (
    <div className="relative w-screen h-screen text-white">
      <AnimatedBackground />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center gap-4 flex-col z-50">
        <h2 className="text-5xl font-semibold ">404</h2>
        <p className="text-lg font-semibold">
          Oops 😓,The page you are looking for is not available.
        </p>
        <p className="text[12px] text-gray-700">
          We are sorry for the inconvenience, The page you are trying to access
          has been removed or never been existed.
        </p>
        <Link href="/" className="flex items-center gap-5">
          <IoChevronBack /> BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
