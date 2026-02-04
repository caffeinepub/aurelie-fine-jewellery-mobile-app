import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import type { ProductMedia } from '../backend';

interface ProductMediaCarouselProps {
  media: ProductMedia;
  productName: string;
}

export default function ProductMediaCarousel({ media, productName }: ProductMediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Build media array: video first (if present), then images
  const mediaItems: Array<{ type: 'video' | 'image'; url: string }> = [];
  
  if (media.video) {
    mediaItems.push({ type: 'video', url: media.video.getDirectURL() });
  }
  
  media.images.forEach(image => {
    mediaItems.push({ type: 'image', url: image.getDirectURL() });
  });

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (mediaItems.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-lg gold-border bg-bottle-green-light/20 shadow-gold flex items-center justify-center" style={{ paddingBottom: '100%' }}>
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          No media available
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full group">
      {/* Media Container with square aspect ratio */}
      <div className="relative overflow-hidden rounded-lg gold-border bg-bottle-green-light/20 shadow-gold">
        <div className="relative w-full" style={{ paddingBottom: '100%' }}>
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ pointerEvents: index === currentIndex ? 'auto' : 'none' }}
            >
              {item.type === 'video' ? (
                <video
                  src={item.url}
                  controls
                  className="w-full h-full object-cover"
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={item.url}
                  alt={`${productName} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {mediaItems.length > 1 && (
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
      {mediaItems.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {mediaItems.map((item, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-gold-medium'
                  : 'w-2 bg-gold-medium/40 hover:bg-gold-medium/60'
              }`}
              aria-label={`Go to ${item.type} ${index + 1}`}
              title={item.type === 'video' ? 'Video' : `Image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Media Type Indicator */}
      {mediaItems.length > 0 && (
        <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {mediaItems[currentIndex].type === 'video' ? 'Video' : `${currentIndex + 1} / ${mediaItems.length}`}
        </div>
      )}
    </div>
  );
}
