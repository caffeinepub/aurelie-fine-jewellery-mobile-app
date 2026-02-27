import { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import type { Product } from '../backend';

interface MasonryProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

// Directions for staggered entrance animations
const DIRECTIONS = ['from-left', 'from-right', 'from-top', 'from-bottom'] as const;
type Direction = typeof DIRECTIONS[number];

function getDirection(index: number): Direction {
  return DIRECTIONS[index % DIRECTIONS.length];
}

function formatINR(priceInCents: bigint): string {
  const priceInRupees = Number(priceInCents) / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceInRupees);
}

export default function MasonryProductGrid({ products, onAddToCart, onBuyNow }: MasonryProductGridProps) {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Reset visible cards when products change
    setVisibleCards(new Set());
    cardRefs.current = cardRefs.current.slice(0, products.length);
  }, [products]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            // Stagger the animation by index
            setTimeout(() => {
              setVisibleCards((prev) => new Set([...prev, index]));
            }, index * 80);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground mb-8">
          No products match your current filters.
        </p>
        <p className="text-sm text-muted-foreground">Try adjusting or clearing your filters.</p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="masonry-grid"
      style={{
        columns: 'var(--masonry-cols, 2)',
        columnGap: '1.5rem',
      }}
    >
      {products.map((product, index) => {
        const direction = getDirection(index);
        const isVisible = visibleCards.has(index);
        const imageUrl = product.media.images.length > 0
          ? product.media.images[0].getDirectURL()
          : null;

        // Vary image aspect ratios for masonry effect
        const aspectVariants = ['aspect-square', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[2/3]'];
        const aspectClass = aspectVariants[index % aspectVariants.length];

        return (
          <div
            key={product.id}
            ref={(el) => { cardRefs.current[index] = el; }}
            data-index={index}
            className={`masonry-card mb-6 card-entrance ${direction} ${isVisible ? 'arrived' : ''} product-card-shimmer`}
            style={{ breakInside: 'avoid' }}
          >
            <Card className="group overflow-hidden offwhite-surface hover:shadow-gold transition-all duration-300 border-0">
              <div
                className={`relative ${aspectClass} overflow-hidden cursor-pointer offwhite-surface`}
                onClick={() => navigate({ to: `/product/${product.id}` })}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Eye className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                {/* New badge for recently added */}
                {Number(product.createdAt) > 0 && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-gold-medium text-white text-xs px-2 py-0.5 rounded-full font-medium">
                      New
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-serif text-base font-semibold tracking-tight line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold gold-text">
                    {formatINR(product.priceInCents)}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      product.inStock
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => onAddToCart(product)}
                    disabled={!product.inStock}
                    className="flex-1 customer-cta-btn text-xs"
                    size="sm"
                  >
                    <ShoppingCart className="h-3 w-3" />
                  </Button>
                  <Button
                    onClick={() => onBuyNow(product)}
                    disabled={!product.inStock}
                    variant="outline"
                    className="flex-1 border-gold-medium hover:bg-gold-medium/10 text-xs"
                    size="sm"
                  >
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
