import { useState, useEffect } from 'react';
import { useGetCategoryCarouselImages } from '../hooks/useCategoryCarouselQueries';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { isValidCategorySlug } from '../utils/productCategories';

interface CategoryImageCarouselProps {
  categorySlug: string;
  carouselIndex: 1 | 2;
  title?: string;
}

export default function CategoryImageCarousel({ categorySlug, carouselIndex, title }: CategoryImageCarouselProps) {
  // All hooks must be called before any conditional returns
  const { data: images, isLoading } = useGetCategoryCarouselImages(categorySlug, carouselIndex);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Filter out empty images
  const enabledImages = images?.filter(img => img) || [];

  // Reset currentIndex when enabledImages changes
  useEffect(() => {
    if (enabledImages.length > 0 && currentIndex >= enabledImages.length) {
      setCurrentIndex(0);
    }
  }, [enabledImages.length, currentIndex]);

  // Auto-rotation effect with pause on hover
  useEffect(() => {
    // Only autoplay if there are 2+ images and not hovering
    if (enabledImages.length < 2 || isHovered) return;

    const interval = setInterval(() => {
      setDirection('right');
      setCurrentIndex((prev) => (prev + 1) % enabledImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [enabledImages.length, isHovered]);

  // Guard against invalid category slugs - AFTER all hooks
  if (!categorySlug || !isValidCategorySlug(categorySlug)) {
    return null;
  }

  const goToSlide = (index: number) => {
    if (index > currentIndex) {
      setDirection('right');
    } else if (index < currentIndex) {
      setDirection('left');
    }
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + enabledImages.length) % enabledImages.length);
  };

  const goToNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % enabledImages.length);
  };

  if (isLoading) {
    return (
      <div>
        {title && <Skeleton className="h-6 w-40 mb-3" />}
        <div className="relative w-full">
          <div className="relative w-full aspect-square">
            <Skeleton className="absolute inset-0 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // Don't render if no enabled images
  if (!enabledImages || enabledImages.length === 0) {
    return null;
  }

  return (
    <div>
      {title && <h2 className="font-serif text-xl font-semibold tracking-tight mb-3 gold-text">{title}</h2>}
      
      <div 
        className="relative w-full group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Carousel Container with 1:1 aspect ratio for category carousels */}
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-bottle-green">
          {enabledImages.map((image, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + enabledImages.length) % enabledImages.length;
            const isNext = index === (currentIndex + 1) % enabledImages.length;
            
            let slideClass = 'opacity-0';
            let transformClass = '';
            
            if (isActive) {
              slideClass = 'opacity-100';
              transformClass = 'translate-x-0 scale-100';
            } else if (direction === 'right' && isPrev) {
              transformClass = '-translate-x-full scale-95';
            } else if (direction === 'left' && isNext) {
              transformClass = 'translate-x-full scale-95';
            } else {
              transformClass = 'translate-x-full scale-95';
            }

            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-out ${slideClass} ${transformClass}`}
                style={{ pointerEvents: isActive ? 'auto' : 'none' }}
              >
                <div className="w-full h-full relative overflow-hidden">
                  <img
                    src={image.getDirectURL()}
                    alt={`${title || 'Carousel'} - Slide ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  {/* Subtle gradient overlay for better visual depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            );
          })}

          {/* Navigation Arrows */}
          {enabledImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm h-8 w-8"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm h-8 w-8"
                onClick={goToNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>

        {/* Navigation Dots */}
        {enabledImages.length > 1 && (
          <div className="flex justify-center gap-2 mt-3">
            {enabledImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-6 bg-gold-medium shadow-gold'
                    : 'w-1.5 bg-gold-medium/40 hover:bg-gold-medium/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
