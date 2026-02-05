import { useState, useEffect } from 'react';
import { useGetCategorySlides } from '../hooks/useQueries';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

interface CategoryCarouselProps {
  category: string;
  title: string;
}

export default function CategoryCarousel({ category, title }: CategoryCarouselProps) {
  const { data: slides, isLoading } = useGetCategorySlides(category);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Filter enabled slides and sort by order
  const enabledSlides = slides
    ?.filter(slide => slide.enabled)
    .sort((a, b) => Number(a.order) - Number(b.order)) || [];

  // Reset currentIndex when enabledSlides changes
  useEffect(() => {
    if (enabledSlides.length > 0 && currentIndex >= enabledSlides.length) {
      setCurrentIndex(0);
    }
  }, [enabledSlides.length, currentIndex]);

  // Auto-rotation effect with pause on hover
  useEffect(() => {
    // Only autoplay if there are 2+ slides and not hovering
    if (enabledSlides.length < 2 || isHovered) return;

    const interval = setInterval(() => {
      setDirection('right');
      setCurrentIndex((prev) => (prev + 1) % enabledSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [enabledSlides.length, isHovered]);

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
    setCurrentIndex((prev) => (prev - 1 + enabledSlides.length) % enabledSlides.length);
  };

  const goToNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % enabledSlides.length);
  };

  const handleSlideClick = (url: string) => {
    if (url) {
      window.location.href = url;
    }
  };

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-6 w-40 mb-3" />
        <div className="relative w-full">
          <div className="relative w-full aspect-square">
            <Skeleton className="absolute inset-0 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // Don't render if no enabled slides
  if (!enabledSlides || enabledSlides.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="font-serif text-xl font-semibold tracking-tight mb-3 gold-text">{title}</h2>
      
      <div 
        className="relative w-full group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Carousel Container with 1:1 aspect ratio for category carousels */}
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-bottle-green">
          {enabledSlides.map((slide, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + enabledSlides.length) % enabledSlides.length;
            const isNext = index === (currentIndex + 1) % enabledSlides.length;
            
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
                <div
                  className="w-full h-full cursor-pointer relative overflow-hidden"
                  onClick={() => handleSlideClick(slide.urlRedirect)}
                >
                  <img
                    src={slide.visualContent.getDirectURL()}
                    alt={`${title} - Slide ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  {/* Subtle gradient overlay for better text readability if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            );
          })}

          {/* Navigation Arrows */}
          {enabledSlides.length > 1 && (
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
        {enabledSlides.length > 1 && (
          <div className="flex justify-center gap-2 mt-3">
            {enabledSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-6 bg-gold-medium shadow-gold'
                    : 'w-1.5 bg-gold-medium/40 hover:bg-gold-medium/60'
                }`}
                aria-label={`Go to ${title} slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
