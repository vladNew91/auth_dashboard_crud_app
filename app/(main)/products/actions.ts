import { cache } from "react";
import { Product } from "@/types";

const URL = "https://dummyjson.com/products";

const zero = 0;
const firstPage = 1;
const productsPerPage = 12;

export const getProduct = async (id: string): Promise<Product | null> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
};

export const getProducts = cache(
  async ({
    page = 1,
    query = "",
    sortBy = "",
  }: {
    page?: number;
    query?: string;
    sortBy?: string;
  }) => {
    // if first page, skip 0 products, else skip products productsPerPage
    const skipNumber = page === firstPage ? zero : productsPerPage * page;

    const res = await fetch(
      `${URL}/search?q=${query}&skip=${skipNumber}` +
        `&limit=${productsPerPage}&sortBy=${sortBy}&order=asc`,
      {
        next: { revalidate: 120 },
      },
    );

    if (!res.ok) return null;
    return res.json();
  },
);
