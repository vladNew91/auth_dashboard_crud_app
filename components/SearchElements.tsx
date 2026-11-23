"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function SearchElements() {
  return (
    <ButtonGroup className="px-4 pt-4">
      <Input
        placeholder="Search..."
        className="w-48 transition-all duration-300 ease-in-out focus:w-80"
      />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
}
