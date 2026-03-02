import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ShoppingCart } from 'lucide-react';
import { useGetNewArrivals } from '../hooks/useQueries';
import { useCart } from '../hooks/useCart';

function formatINR(priceInCents: bigint): string {
  const amount = Number(priceInCents) / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function NewArrivalsSection() {
  const navigate = useNavigate();
  const { data: products, isLoading } = useGetNewArrivals();
  const { addItem } = useCart();

  if (isLoading) {
    return (
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-serif text-foreground mb-6">Latest Release</h2>
          <div className="flex gap-3 overflow-x-auto pb-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="shrink-0 bg-card rounded-lg animate-pulse"
                style={{ width: 'calc(33.333% - 8px)', minWidth: '140px', maxWidth: '200px' }}
              >
                <div className="aspect-square bg-muted rounded-t-lg" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif text-foreground">Latest Release</h2>
          <div className="h-px flex-1 bg-gold/20 mx-4" />
          <span className="text-xs text-muted-foreground uppercase tracking-widest">New In</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory">
          {products.map((product) => {
            const firstImage =
              product.media.images.length > 0 ? product.media.images[0] : null;
            const imageUrl = firstImage ? firstImage.getDirectURL() : null;

            return (
              <div
                key={product.id}
                className="product-card-shimmer shrink-0 snap-start rounded-lg overflow-hidden cursor-pointer group"
                style={{ width: 'calc(33.333% - 8px)', minWidth: '140px', maxWidth: '200px' }}
                onClick={() => navigate({ to: `/product/${product.id}` })}
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-muted relative">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <span className="text-muted-foreground text-xs">No image</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-2 bg-card">
                  <h3 className="text-xs font-medium text-foreground truncate leading-tight mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gold font-semibold mb-2">
                    {formatINR(product.priceInCents)}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem(product);
                    }}
                    className="w-full flex items-center justify-center gap-1 py-1.5 bg-gold/10 hover:bg-gold/20 text-gold rounded text-xs transition-colors"
                  >
                    <ShoppingCart className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
