import { getPaginatedProducts, getAllProducts } from "./actions";
import { ProductsPagination } from "@/components/ProductsPagination";
import { ProductsList } from "@/components/ProductsList";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage: number = (params.page && +params.page) || 1;

  console.log(currentPage);

  const { products } = await getPaginatedProducts(currentPage);
  const { total } = await getAllProducts();

  return (
    <div className="w-full">
      <ProductsList products={products} />
      <ProductsPagination totalProducts={total} />
    </div>
  );
}
