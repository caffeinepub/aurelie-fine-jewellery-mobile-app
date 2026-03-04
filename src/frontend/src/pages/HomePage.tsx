import { useEffect, useState } from "react";
import HomeCarousel from "../components/HomeCarousel";
import HomeCategoryCarouselsSection from "../components/HomeCategoryCarouselsSection";
import NewArrivalsSection from "../components/NewArrivalsSection";
import RecentlyViewedSection from "../components/RecentlyViewedSection";
import { Skeleton } from "../components/ui/skeleton";

function HomePageSkeleton() {
  return (
    <div
      className="min-h-screen animate-pulse"
      data-ocid="homepage.loading_state"
    >
      {/* Banner skeleton – 16:9 */}
      <div className="w-full mb-8">
        <div className="relative w-full aspect-video">
          <Skeleton className="absolute inset-0 rounded-2xl" />
        </div>
      </div>

      {/* New Arrivals skeleton – row of 3 squares */}
      <div className="container mx-auto px-4 mb-10">
        <Skeleton className="h-7 w-40 mb-4 rounded" />
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="aspect-square rounded-xl" />
          ))}
        </div>
      </div>

      {/* Category carousels skeleton – 2 tall blocks */}
      <div className="container mx-auto px-4 space-y-8 mb-10">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-6 w-32 rounded" />
            <Skeleton className="w-full aspect-video rounded-2xl" />
            {/* Product row below carousel */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} className="aspect-square rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (showSkeleton) {
    return <HomePageSkeleton />;
  }

  return (
    <div className="min-h-screen">
      {/* Homepage Carousel - 16:9 aspect ratio */}
      <div className="w-full">
        <HomeCarousel />
      </div>

      {/* New Arrivals Section */}
      <NewArrivalsSection />

      {/* Category Carousels Section */}
      <HomeCategoryCarouselsSection />

      {/* Recently Viewed Section */}
      <RecentlyViewedSection />
    </div>
  );
}
