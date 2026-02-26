import { useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetNewArrivals } from '../hooks/useQueries';
import { Skeleton } from './ui/skeleton';
import { ChevronRight, Sparkles } from 'lucide-react';

function formatINR(priceInCents: bigint): string {
  const amount = Number(priceInCents) / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function NewArrivalsSection() {
  const { data: products = [], isLoading } = useGetNewArrivals();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!isLoading && products.length === 0) return null;

  return (
    <section className="py-12 bg-beige-champagne">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-gold-medium" />
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-bottle-green-dark">
                New Arrivals
              </h2>
              <div className="h-0.5 w-16 mt-1 bg-gradient-to-r from-gold-medium to-transparent" />
            </div>
          </div>
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-1 text-xs tracking-widest uppercase text-gold-dark hover:text-gold-medium transition-colors font-medium"
          >
            View All <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        {/* Horizontal scroll row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto hide-scrollbar pb-4"
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="shrink-0 w-48 md:w-56">
                  <Skeleton className="w-full aspect-[3/4] rounded-lg mb-3" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))
            : products.map((product) => {
                const imageUrl = product.media.images.length > 0
                  ? product.media.images[0].getDirectURL()
                  : null;

                return (
                  <div
                    key={product.id}
                    className="shrink-0 w-48 md:w-56 cursor-pointer group"
                    onClick={() => navigate({ to: `/product/${product.id}` })}
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-beige-light mb-3 border border-gold-medium/15">
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
                      {/* New badge */}
                      <div className="absolute top-2 left-2">
                        <span className="bg-gold-medium text-white text-[10px] px-2 py-0.5 rounded-full font-semibold tracking-wide">
                          NEW
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div>
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
