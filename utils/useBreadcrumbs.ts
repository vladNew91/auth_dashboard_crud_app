"use client";

import { usePathname } from "next/navigation";

export function useBreadcrumbs(): [segments: string[], length: number] | [] {
  const pathname = usePathname();
  // Split the pathname into segments and remove empty strings
  const segments = pathname.split("/").filter((segment) => segment !== "");
  const length = segments.length;

  return [segments, length];
}
