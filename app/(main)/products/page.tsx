import { getProducts } from "./actions";
import { FilterElements } from "@/components/FilterElements";
import { PagePagination } from "@/components/PagePagination";
import { ProductsList } from "@/components/ProductsList";
import { SearchElements } from "@/components/SearchElements";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; sortBy?: string }>;
}) {
  const params = await searchParams;
  const firstPage = 1;
  const currentPage: number = (params.page && +params.page) || firstPage;
  const { total, products } = await getProducts({
    page: currentPage,
    query: params.q,
    sortBy: params.sortBy,
  });

  return (
    <div className="w-full">
      <div className="flex flex-wrap">
        <SearchElements />
        <FilterElements />
      </div>

      <ProductsList products={products} />
      <PagePagination totalElements={total} />
    </div>
  );
}
