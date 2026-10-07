"use client";

import { usePathname } from "next/navigation";

export function useBreadcrumbs(): string[] | undefined {
  const pathname = usePathname();
  // Split the pathname into segments and remove empty strings
  const segments = pathname.split("/").filter((segment) => segment !== "");

  return segments;
}
