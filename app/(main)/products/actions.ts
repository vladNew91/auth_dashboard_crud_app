import { Product } from "@/types";
import { cache } from "react";

const URL = "https://dummyjson.com/products";

export const getAllProducts = cache(async () => {
  const res = await fetch(`${URL}?limit=0`, {
    next: { revalidate: false },
  });

  if (!res.ok) throw new Error("Failed to fetch");
  return res.json() as Promise<{ total: number; products: Product[] }>;
});

const zero = 0;
const firstPage = 1;
const peoductsPerPage = 12;

export const getPaginatedProducts = cache(async (page = 2) => {
  // if first page, skeep 0 products, else skip peoductsPerPage products
  const skipNumber = page === firstPage ? zero : peoductsPerPage * page;

  const res = await fetch(
    `${URL}?skip=${skipNumber}&limit=${peoductsPerPage}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) throw new Error("Failed to fetch");
  return res.json() as Promise<{ products: Product[] }>;
});
