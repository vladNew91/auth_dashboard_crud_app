"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

export function ProductsPagination({
  totalProducts = 0,
}: {
  totalProducts: number;
}) {
  const one = 1;
  const productsPerPage = 12;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || one);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  if (!totalProducts) return null;

  return (
    <Pagination className="my-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={
              currentPage > one
                ? `${createPageURL(currentPage - one)}`
                : undefined
            }
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href={
              totalPages > one
                ? `${createPageURL(currentPage + one)}`
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
