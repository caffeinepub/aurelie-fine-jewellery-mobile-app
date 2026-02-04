import { useState, useEffect } from 'react';
import { useGetCarouselSlides } from '../hooks/useQueries';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

export default function HomeCarousel() {
  const { data: slides, isLoading } = useGetCarouselSlides();
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
    }, 2500);

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
      <div className="relative w-full mb-8">
        <div className="relative w-full aspect-video">
          <Skeleton className="absolute inset-0 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!enabledSlides || enabledSlides.length === 0) {
    return null;
  }

  return (
    <div 
      className="relative w-full mb-8 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Container with 16:9 aspect ratio */}
      <div className="relative w-full aspect-video overflow-hidden rounded-2xl shadow-bottle-green">
        {enabledSlides.map((slide, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + enabledSlides.length) % enabledSlides.length;
          const isNext = index === (currentIndex + 1) % enabledSlides.length;
          
          let slideClass = 'opacity-0 translate-x-full';
          
          if (isActive) {
            slideClass = 'opacity-100 translate-x-0';
          } else if (direction === 'right' && isPrev) {
            slideClass = 'opacity-0 -translate-x-full';
          } else if (direction === 'left' && isNext) {
            slideClass = 'opacity-0 translate-x-full';
          } else {
            slideClass = 'opacity-0 translate-x-full';
          }

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${slideClass}`}
              style={{ pointerEvents: isActive ? 'auto' : 'none' }}
            >
              <div
                className="w-full h-full cursor-pointer"
                onClick={() => handleSlideClick(slide.urlRedirect)}
              >
                <img
                  src={slide.visualContent.getDirectURL()}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
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
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      {/* Navigation Dots */}
      {enabledSlides.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {enabledSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-gold-medium'
                  : 'w-2 bg-gold-medium/40 hover:bg-gold-medium/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
