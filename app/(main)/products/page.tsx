import { ProductCard } from "@/components/ProductCard";
import { getAllProducts } from "./actions";

export default async function Products() {
  const { products } = await getAllProducts();

  if (!products) return null;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
