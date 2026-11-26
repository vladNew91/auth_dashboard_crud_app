"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function SearchElements() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const trimmedQuery = (formData.get("q") as string).trim();

      // Read live URL params inside the event handler to avoid hook dependencies
      const params = new URLSearchParams(window.location.search);
      if (trimmedQuery === (params.get("q") || "")) return;

      if (trimmedQuery) {
        params.set("q", trimmedQuery);
        params.set("page", "1");
      } else {
        params.delete("q");
        params.delete("page");
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router],
  );

  return (
    <form onSubmit={handleSubmit} className="px-4 pt-4">
      <ButtonGroup className="w-48 transition-[width] duration-300 focus-within:w-96">
        <Input
          key={currentQuery}
          name="q"
          type="text"
          defaultValue={currentQuery}
          placeholder="Search..."
        />
        <Button type="submit" variant="outline" aria-label="Search">
          <SearchIcon />
        </Button>
      </ButtonGroup>
    </form>
  );
}
