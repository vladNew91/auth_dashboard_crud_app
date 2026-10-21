import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const productImage = product.images?.[0];

  // Price calculations
  const hasDiscount = product.discountPercentage > 0;
  const originalPrice = product.price;
  const discountedPrice = hasDiscount
    ? originalPrice * (1 - product.discountPercentage / 100)
    : originalPrice;

  // Stock status logic
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="bg-muted/50 relative aspect-square rounded-xl">
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col items-start gap-1.5">
        {product.brand && (
          <span className="rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm dark:bg-slate-100 dark:text-slate-950">
            {product.brand}
          </span>
        )}
        {hasDiscount && (
          <span className="rounded-full bg-rose-500 px-2.5 py-1 text-xs font-semibold tracking-wide text-white">
            -{product.discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Main Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50 dark:bg-slate-950">
        {productImage ? (
          <Image
            src={productImage}
            alt={product.title}
            fill
            sizes="(max-w-7xl) 100vw, 350px"
            className="h-100% object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
            No image available
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category & Weight row */}
        <div className="mb-1 flex items-center justify-between text-xs font-medium tracking-wider text-slate-400 uppercase dark:text-slate-500">
          <span>{product.category}</span>
          <span>{product.weight}g</span>
        </div>

        {/* Title */}
        <h3 className="line-clamp-1 text-lg font-bold text-slate-800 transition-colors group-hover:text-indigo-600 dark:text-slate-100">
          {product.title}
        </h3>

        {/* Description */}
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-slate-500 dark:text-slate-400">
          {product.description}
        </p>

        {/* Ratings & Total Reviews Summary */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-current" : "text-slate-200 dark:text-slate-700"}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            ({product.reviews?.length || 0} reviews)
          </span>
        </div>

        {/* Pricing Layout & Inventory Alerts */}
        <div className="mt-4 flex items-end justify-between border-t border-slate-50 pt-3 dark:border-slate-800">
          <div>
            {hasDiscount && (
              <span className="mb-0.5 block text-xs text-slate-400 line-through dark:text-slate-500">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              ${discountedPrice.toFixed(2)}
            </span>
          </div>

          {/* Stock availability indicator */}
          <div className="text-right">
            {isOutOfStock ? (
              <span className="rounded bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-500 dark:bg-rose-950/30">
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="rounded bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-500 dark:bg-amber-950/30">
                Only {product.stock} left!
              </span>
            ) : (
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-500 dark:bg-emerald-950/30">
                In Stock
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          disabled={isOutOfStock}
          className={`mt-4 w-full rounded-xl py-3 text-center text-sm font-semibold transition-all duration-200 ${
            isOutOfStock
              ? "cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600"
              : "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 active:scale-[0.98] dark:bg-indigo-500 dark:hover:bg-indigo-600"
          }`}
        >
          {isOutOfStock ? "Sold Out" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
