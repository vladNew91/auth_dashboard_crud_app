import { getPaginatedProducts, getAllProducts } from "./actions";
import { PagePagination } from "@/components/PagePagination";
import { ProductsList } from "@/components/ProductsList";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const firstPage = 1;
  const currentPage: number = (params.page && +params.page) || firstPage;

  const { products } = await getPaginatedProducts(currentPage);
  const { total } = await getAllProducts();

  return (
    <div className="w-full">
      <ProductsList products={products} />
      <PagePagination totalElements={total} />
    </div>
  );
}
