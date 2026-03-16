import { useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import type { Product } from "../backend";
import { useGetProducts } from "../hooks/useQueries";
import { Skeleton } from "./ui/skeleton";

interface CategoryProductRowProps {
  categorySlug: string;
  genderFilter?: "boys" | "girls";
}

function formatINR(priceInCents: bigint): string {
  const amount = Number(priceInCents) / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function CategoryProductRow({
  categorySlug,
  genderFilter,
}: CategoryProductRowProps) {
  const navigate = useNavigate();
  const { data: allProducts, isLoading } = useGetProducts();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter products by category and optional gender
  const products: Product[] = (allProducts || []).filter((product) => {
    const categoryMatch =
      product.category.toLowerCase() === categorySlug.toLowerCase();
    if (!categoryMatch) return false;
    if (genderFilter) {
      const productGender = product.gender as unknown as string;
      return productGender === genderFilter;
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-hidden">
        {(["a", "b", "c"] as const).map((id) => (
          <div
            key={`skeleton-${id}`}
            className="shrink-0"
            style={{ width: "calc((100% - 1.5rem) / 3)" }}
          >
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="h-3 w-3/4 mt-2 rounded" />
            <Skeleton className="h-3 w-1/2 mt-1 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div
      ref={scrollRef}
      className="flex gap-3 overflow-x-scroll"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <style>{`
        .category-product-row::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {products.map((product, index) => {
        const imageUrl = product.media.images[0]?.getDirectURL() ?? null;
        // Stagger shimmer animation delay per card
        const shimmerDelay = `${Math.min(index * 0.25, 2.0)}s`;

        return (
          <button
            type="button"
            key={product.id}
            onClick={() =>
              navigate({
                to: "/product/$productId",
                params: { productId: product.id },
              })
            }
            className="shrink-0 text-left group focus:outline-none product-card-shimmer"
            style={{
              width: "calc((100% - 1.5rem) / 3)",
              scrollSnapAlign: "start",
              animationDelay: shimmerDelay,
            }}
          >
            {/* Square image */}
            <div className="aspect-square w-full rounded-xl overflow-hidden bg-beige-light group-hover:shadow-gold transition-all duration-200">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-beige-champagne/40">
                  <span className="text-xs text-bottle-green-medium text-center px-2 leading-tight">
                    {product.name}
                  </span>
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="mt-2 px-0.5">
              <p className="text-xs font-semibold text-bottle-green-dark line-clamp-1 leading-tight">
                {product.name}
              </p>
              <p className="text-xs font-bold text-gold-dark mt-0.5">
                {formatINR(product.priceInCents)}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
