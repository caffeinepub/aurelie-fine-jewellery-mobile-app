import { useNavigate } from '@tanstack/react-router';
import HomeCarousel from '../components/HomeCarousel';
import HomeCategoryCarouselsSection from '../components/HomeCategoryCarouselsSection';
import NewArrivalsSection from '../components/NewArrivalsSection';
import RecentlyViewedSection from '../components/RecentlyViewedSection';

export default function HomePage() {
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
