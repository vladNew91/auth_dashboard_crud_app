import Image from "next/image";
import { Product } from "@/types";
import { cn } from "@/utils/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discountPercentage > 1;
  const finalPrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  return (
    <div
      className={cn(
        "bg-muted/50 relative aspect-square overflow-hidden rounded-xl",
        "group flex flex-col justify-between p-3 transition-colors",
        "cursor-pointer",
      )}
    >
      {/* Top Bar: Brand & Discount Tag */}
      <div className="z-10 flex w-full justify-between">
        {hasDiscount && (
          <span
            className={cn(
              "bg-destructive text-destructive-foreground items-start font-bold",
              "rounded-md px-1.5 py-0.5",
            )}
          >
            -{product.discountPercentage}%
          </span>
        )}

        {product.brand && (
          <span
            className={cn(
              "bg-background/80 text-[10px] font-semibold backdrop-blur-xs",
              "rounded-md px-2 py-0.5 tracking-wider uppercase",
              "text-muted-foreground shadow-xs",
            )}
          >
            {product.brand}
          </span>
        )}
      </div>

      {/* Center: Main Image Layout */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center p-8",
          "mix-blend-multiply dark:mix-blend-normal",
        )}
      >
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-w-768px) 50vw, 20vw"
            className={cn(
              "object-contain p-6 transition-transform",
              "duration-300 group-hover:scale-105",
            )}
          />
        ) : (
          <span className="text-muted-foreground/60 text-xs">No image</span>
        )}
      </div>

      {/* Bottom Layout: Title & Pricing Grid Wrapper */}
      <div
        className={cn(
          "from-background/90 via-background/60 z-10 bg-gradient-to-t",
          "-mb-3 to-transparent pt-6 pb-3",
        )}
      >
        <h3 className="text-foreground truncate text-sm font-semibold">
          {product.title}
        </h3>

        <div className="mt-1 flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-foreground text-sm font-bold">
              ${finalPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-muted-foreground text-[10px] line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <span className="font-medium text-amber-500">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
