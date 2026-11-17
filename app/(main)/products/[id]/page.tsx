import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";

// Note: Changed discountPercentage to `number` and reviews to an array `[]`
// so dynamic API responses type-check cleanly.
export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  weight: number;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  meta: {
    createdAt: string;
  };
  thumbnail: unknown;
  images: string[];
};

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm">
        <Link href="/products" className="hover:text-gray-300">
          Products
        </Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span className="truncate font-medium">{product.title}</span>
      </nav>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Left: Image Gallery */}
        <ProductGallery
          images={product.images}
          thumbnail={product.thumbnail}
          title={product.title}
        />

        {/* Right: Product Info */}
        <div className="flex flex-col">
          {/* Category & Brand */}
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-800 capitalize">
              {product.category}
            </span>

            {product.brand && (
              <span className="font-medium">
                Brand: <strong>{product.brand}</strong>
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-100">
            {product.title}
          </h1>

          {/* Rating & Stock */}
          <div className="mt-3 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 font-medium text-amber-500">
              <span>★</span>
              <span className="text-gray-200">{product.rating.toFixed(1)}</span>
              <span className="text-gray-500">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>
            <span className="text-gray-300">|</span>
            {product.stock > 0 ? (
              <span className="font-medium text-emerald-600">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="font-medium text-red-600">Out of Stock</span>
            )}
          </div>

          {/* Price Block */}
          <div className="mt-6 flex items-baseline gap-3 border-y border-gray-100 py-5">
            <span className="text-3xl font-bold">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-sm font-semibold text-emerald-700">
                  -{product.discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="mt-6 leading-relaxed text-gray-200">
            {product.description}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={product.stock === 0}
              className="flex-1 rounded-xl bg-blue-800 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-900"
            >
              Add to Cart
            </button>

            <button
              type="button"
              className="rounded-xl bg-blue-100 px-6 py-3.5 font-semibold text-gray-900 transition hover:bg-green-300"
            >
              Save to Wishlist
            </button>
          </div>

          {/* Technical Metadata */}
          <dl className="mt-8 grid grid-cols-2 gap-4 rounded-xl bg-gray-200 p-4 text-sm">
            <div>
              <dt className="text-gray-500">Product ID</dt>
              <dd className="font-medium text-gray-900">#{product.id}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Weight</dt>
              <dd className="font-medium text-gray-900">{product.weight} g</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-gray-500">Listed On</dt>
              <dd className="font-medium text-gray-900">
                {new Date(product.meta.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="mt-16 border-t border-gray-200 pt-10">
        <h2 className="text-xl font-bold text-gray-100">
          Customer Reviews ({product.reviews?.length || 0})
        </h2>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-amber-500">
                      {"★".repeat(review.rating)}
                      <span className="text-gray-300">
                        {"★".repeat(5 - review.rating)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-700">
                    &quot;{review.comment}&quot;
                  </p>
                </div>

                <div className="mt-4 border-t border-gray-100 pt-3">
                  <p className="text-sm font-medium text-gray-900">
                    {review.reviewerName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {review.reviewerEmail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-500">
            No reviews yet for this product.
          </p>
        )}
      </section>
    </main>
  );
}
