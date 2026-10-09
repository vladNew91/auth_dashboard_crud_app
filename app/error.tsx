"use client";

import { cn } from "@/utils/utils";
import { useEffect } from "react";
import "./globals.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const reloadPage = () => reset();

  return (
    <section className="flex h-dvh flex-col items-center justify-center bg-slate-950">
      <h1 className="text-2xl font-bold text-white">Something went wrong!</h1>
      <button
        onClick={reloadPage}
        className={cn(
          "mt-3 rounded-md bg-green-700 px-3 py-2 text-sm",
          "cursor-pointer font-semibold text-white hover:bg-green-900",
        )}
      >
        Try again
      </button>
    </section>
  );
}
