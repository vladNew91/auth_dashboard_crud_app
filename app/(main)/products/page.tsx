import { getPaginatedProducts, getAllProducts } from "./actions";
import { ProductsPagination } from "@/components/ProductsPagination";
import { ProductsList } from "@/components/ProductsList";

export default async function Products() {
  const { products } = await getPaginatedProducts();
  const { total } = await getAllProducts();

  return (
    <div className="w-full">
      <ProductsList products={products} />
      <ProductsPagination totalProducts={total} />
    </div>
  );
}
