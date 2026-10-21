import { ProductCard } from "@/components/ProductCard";
import { getAllProducts } from "./actions";

export default async function Products() {
  const { products } = await getAllProducts();

  console.log(products);

  if (!products) return null;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
