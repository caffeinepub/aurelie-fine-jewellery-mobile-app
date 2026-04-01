import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import CustomerPageStyleScope from "../components/CustomerPageStyleScope";
import { Skeleton } from "../components/ui/skeleton";
import { useGetAllCategoryHeaders } from "../hooks/useCategoryHeaderNav";
import { useGetAllCategories } from "../hooks/useQueries";
import { BOYS_CATEGORIES } from "../utils/productCategories";

// Distribute circles across all 4 edges for the swipe-in effect
const SWIPE_DIRECTIONS = ["from-left", "from-top", "from-right", "from-bottom"];

export default function BoysHomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: categoryHeaders, isLoading } = useGetAllCategoryHeaders();
  const { data: allCategories } = useGetAllCategories();
  const [animated, setAnimated] = useState(false);
  const mountCounterRef = useRef(0);
  const [mountKey, setMountKey] = useState(0);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const headersMap = new Map(categoryHeaders || []);

  // Build a map of slug -> video URL from allCategories
  const categoryVideoMap = new Map<string, string>();
  if (allCategories) {
    for (const cat of allCategories) {
      if (cat.video) {
        // Backend category name matches slug
        const videoUrl = cat.video.getDirectURL();
        categoryVideoMap.set(cat.name, videoUrl);
      }
    }
  }

  // Determine active video: hovered category's video, or first boys category with a video
  const activeVideoUrl = (() => {
    if (hoveredSlug && categoryVideoMap.has(hoveredSlug)) {
      return categoryVideoMap.get(hoveredSlug);
    }
    for (const cat of BOYS_CATEGORIES) {
      if (categoryVideoMap.has(cat.slug)) {
        return categoryVideoMap.get(cat.slug);
      }
    }
    return undefined;
  })();

  // Re-trigger swipe animation on every navigation to this page.
  useEffect(() => {
    const _path = location.pathname;
    void _path;
    mountCounterRef.current += 1;
    setMountKey((k) => k + 1);
    setAnimated(false);
    const timer = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleCategoryClick = (categorySlug: string, redirectUrl?: string) => {
    if (redirectUrl?.trim()) {
      if (
        redirectUrl.startsWith("http://") ||
        redirectUrl.startsWith("https://")
      ) {
        window.location.href = redirectUrl;
      } else {
        navigate({ to: redirectUrl as any });
      }
    } else {
      navigate({ to: `/boys/${categorySlug.replace("boys-", "")}` as any });
    }
  };

  return (
    <CustomerPageStyleScope>
      {/* Fullscreen background video layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {activeVideoUrl && (
          // biome-ignore lint/a11y/useMediaCaption: background decorative video
          <video
            key={activeVideoUrl}
            src={activeVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        )}
        {/* Semi-transparent overlay so circles remain readable */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* No overflow-hidden on the outermost wrapper — circles must animate
          from outside the viewport without being clipped */}
      <div className="min-h-screen relative z-10">
        {/* Hero Header */}
        <div className="offwhite-surface py-12 text-center border-b border-gold-medium/20 bg-[#F7E7CE]/80 backdrop-blur-sm">
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-3 text-bottle-green-dark">
            For Him
          </h1>
          <p className="text-bottle-green-medium text-lg max-w-xl mx-auto">
            Refined jewellery crafted for the modern gentleman
          </p>
        </div>

        {/* Sub-categories — key forces DOM remount on every navigation.
            overflow: visible so circles can enter from outside container edges */}
        <div key={mountKey} className="py-12" style={{ overflow: "visible" }}>
          <div className="container px-4">
            {isLoading ? (
              <div
                className="flex items-start gap-8 overflow-x-auto hide-scrollbar pb-4 justify-center flex-wrap md:flex-nowrap"
                data-ocid="boys.loading_state"
              >
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-3 min-w-[100px] shrink-0"
                  >
                    <Skeleton className="w-24 h-24 md:w-28 md:h-28 rounded-full" />
                    <Skeleton className="h-4 w-16 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-start gap-8 overflow-x-auto hide-scrollbar pb-4 justify-center flex-wrap md:flex-nowrap">
                {BOYS_CATEGORIES.map((category, index) => {
                  const header = headersMap.get(category.slug);
                  const imageUrl = header?.image?.getDirectURL();
                  const redirectUrl = header?.redirectUrl;
                  const direction =
                    SWIPE_DIRECTIONS[index % SWIPE_DIRECTIONS.length];
                  // Stagger shimmer delay per circle
                  const shimmerDelay = `${index * 0.4}s`;

                  return (
                    <button
                      type="button"
                      key={category.slug}
                      onClick={() =>
                        handleCategoryClick(category.slug, redirectUrl)
                      }
                      onMouseEnter={() => setHoveredSlug(category.slug)}
                      onMouseLeave={() => setHoveredSlug(null)}
                      className={`flex flex-col items-center gap-3 min-w-[100px] hover:opacity-80 transition-all duration-200 group shrink-0 category-circle-swipe ${direction} ${animated ? "arrived" : ""}`}
                    >
                      <div
                        className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gold-medium/40 group-hover:border-gold-medium transition-all duration-200 shadow-md group-hover:shadow-gold bg-beige-champagne flex items-center justify-center circle-shimmer-border"
                        style={{ animationDelay: shimmerDelay }}
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={category.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-beige-champagne to-gold-medium/20">
                            <span className="text-2xl font-serif text-gold-medium font-bold">
                              {category.title.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium text-white drop-shadow tracking-wide text-center font-serif">
                        {category.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center py-6">
          <div className="h-px w-24 bg-gold-medium/60" />
          <div className="mx-4 text-gold-medium text-lg">✦</div>
          <div className="h-px w-24 bg-gold-medium/60" />
        </div>

        {/* Tagline */}
        <div className="text-center pb-12 px-4">
          <p className="font-serif text-white drop-shadow italic text-base">
            Select a category to explore our exclusive collection
          </p>
        </div>
      </div>
    </CustomerPageStyleScope>
  );
}
