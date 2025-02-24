"use client";
import ErrorPage from "@/screens/error/ErrorPage";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error();
  }, [error]);

  return (
    <div>
      <ErrorPage statusCode={500} />
    </div>
  );
}
