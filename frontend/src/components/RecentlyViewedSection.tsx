import { useNavigate } from '@tanstack/react-router';
import { Clock } from 'lucide-react';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { useGetProducts } from '../hooks/useQueries';
import { Skeleton } from './ui/skeleton';
import type { Product } from '../backend';

function formatINR(priceInCents: bigint): string {
  const amount = Number(priceInCents) / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function RecentlyViewedSection() {
  const navigate = useNavigate();
  const { viewedIds } = useRecentlyViewed();
  const { data: allProducts, isLoading } = useGetProducts();

  if (!isLoading && viewedIds.length === 0) return null;

  // Build ordered list of recently viewed products
  const recentProducts: Product[] = viewedIds
    .map((id) => allProducts?.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);

  if (!isLoading && recentProducts.length === 0) return null;

  return (
    <section className="py-12 bg-beige-light">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="flex items-center gap-3 mb-8">
          <Clock className="h-5 w-5 text-gold-medium" />
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-bottle-green-dark">
              Recently Viewed
            </h2>
            <div className="h-0.5 w-16 mt-1 bg-gradient-to-r from-gold-medium to-transparent" />
          </div>
        </div>

        {/* Horizontal scroll row */}
        <div
          className="flex gap-5 overflow-x-auto hide-scrollbar pb-4"
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="shrink-0 w-44 md:w-52">
                  <Skeleton className="w-full aspect-[3/4] rounded-lg mb-3" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))
            : recentProducts.map((product) => {
                const imageUrl = product.media.images.length > 0
                  ? product.media.images[0].getDirectURL()
                  : null;

                return (
                  <div
                    key={product.id}
                    className="shrink-0 w-44 md:w-52 cursor-pointer group product-card-shimmer rounded-lg"
                    onClick={() =>
                      navigate({ to: '/product/$productId', params: { productId: product.id } })
                    }
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-beige-champagne mb-3">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <span className="text-muted-foreground text-xs">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="px-1 pb-2">
                      <h3 className="font-serif text-sm font-semibold text-bottle-green-dark line-clamp-1 group-hover:text-gold-dark transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm font-bold text-gold-dark mt-0.5">
                        {formatINR(product.priceInCents)}
                      </p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
