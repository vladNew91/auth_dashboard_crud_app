import { cache } from "react";
import { Product } from "@/types";

const URL = "https://dummyjson.com/products";

const zero = 0;
const firstPage = 1;
const peoductsPerPage = 12;

export const getProduct = async (id: string): Promise<Product | null> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
};

type getProductsProps = {
  page?: number;
  query?: string;
};

export const getProducts = cache(
  async ({ page = 1, query = "" }: getProductsProps) => {
    // if first page, skip 0 products, else skip products peoductsPerPage
    const skipNumber = page === firstPage ? zero : peoductsPerPage * page;

    const res = await fetch(
      // join fetch url for search product and pagination
      query
        ? `${URL}/search?q=${query}&skip=${skipNumber}&limit=${peoductsPerPage}`
        : `${URL}?skip=${skipNumber}&limit=${peoductsPerPage}`,
      {
        next: { revalidate: 120 },
      },
    );

    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  },
);
