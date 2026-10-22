import { Product } from "@/types";
import { cache } from "react";

const URL = "https://dummyjson.com/products";

export const getAllProducts = cache(async () => {
  const res = await fetch(URL, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch");
  return res.json() as Promise<{ products: Product[] }>;
});
