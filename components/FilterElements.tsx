"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

const filterBy = ["title", "price", "rating"];

export function FilterElements() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Derive the current value directly from searchParams to avoid state sync bugs
  const currentSort = searchParams.get("sortBy") || "";

  const handleSortBy = (item: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (item) {
      params.set("sortBy", item);
      params.set("page", "1");
    } else {
      params.delete("sortBy");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="max-w-40 px-4 pt-4">
      <Combobox
        items={filterBy}
        value={currentSort}
        onValueChange={handleSortBy}
      >
        <ComboboxInput placeholder="Sort by..." />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
