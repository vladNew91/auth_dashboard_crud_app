import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProductsPaginationProps {
  totalProducts: number;
}

export async function ProductsPagination({
  totalProducts = 0,
}: ProductsPaginationProps) {
  if (!totalProducts) return null;

  const firstPage = 1;
  // eslint-disable-next-line prefer-const
  let currentPage = 2;
  const productsPerPage = 12;
  const lastPage = Math.floor(totalProducts / productsPerPage);

  return (
    <Pagination className="my-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink isActive={currentPage === firstPage}>
            1
          </PaginationLink>
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
          <PaginationLink isActive={currentPage === lastPage}>
            {lastPage}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
