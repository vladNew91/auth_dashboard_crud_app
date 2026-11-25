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
  const [query, setQuery] = React.useState(searchParams.get("q") || "");

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set("q", query);
      params.set("page", "1");
    } else {
      params.delete("q");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <ButtonGroup className="w-48 px-4 pt-4 transition-all duration-300 focus-within:w-96">
      <Input
        type="text"
        value={query}
        placeholder="Search..."
        onChange={handleChangeQuery}
      />
      <Button variant="outline" aria-label="Search" onClick={handleSearch}>
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
}
