import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import HeaderCategoryNav from "../components/HeaderCategoryNav";
import { Skeleton } from "../components/ui/skeleton";
import { useGetAllCategoryHeaders } from "../hooks/useCategoryHeaderNav";
import { useGetAllCategories } from "../hooks/useQueries";
import { GIRLS_CATEGORIES } from "../utils/productCategories";

const CATEGORY_EMOJIS: Record<string, string> = {
  rings: "💍",
  earrings: "✨",
  necklace: "📿",
  anklets: "🌸",
  "bridal-jewellery": "👰",
  "lab-diamonds-jewellery": "💎",
};

// Swipe-in direction per circle index (6 circles → 6 edges)
const SWIPE_DIRECTIONS = [
  "from-left",
  "from-top",
  "from-right",
  "from-left",
  "from-bottom",
  "from-right",
];

export default function GirlsHomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [animated, setAnimated] = useState(false);
  const mountCounterRef = useRef(0);
  const [mountKey, setMountKey] = useState(0);
  const { data: categoryHeaders, isLoading } = useGetAllCategoryHeaders();
  const { data: allCategories } = useGetAllCategories();
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const headersMap = new Map(categoryHeaders || []);

  // Build a map of slug -> video URL from allCategories
  const categoryVideoMap = new Map<string, string>();
  if (allCategories) {
    for (const cat of allCategories) {
      if (cat.video) {
        const videoUrl = cat.video.getDirectURL();
        categoryVideoMap.set(cat.name, videoUrl);
      }
    }
  }

  // Determine active video: hovered category's video, or first girls category with a video
  const activeVideoUrl = (() => {
    if (hoveredSlug && categoryVideoMap.has(hoveredSlug)) {
      return categoryVideoMap.get(hoveredSlug);
    }
    for (const cat of GIRLS_CATEGORIES) {
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

  const handleCategoryClick = (slug: string, redirectUrl?: string) => {
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
      navigate({ to: `/${slug}` as any });
    }
  };

  return (
    <div className="min-h-screen relative">
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

      {/* Content above the video */}
      <div className="relative z-10">
        {/* Header Category Nav (product category row) */}
        <HeaderCategoryNav forceShow />

        {/* Category Grid — overflow visible so circles can animate from edges */}
        <div
          key={mountKey}
          className="px-4 py-6"
          style={{ overflow: "visible" }}
        >
          {isLoading ? (
            <div
              className="grid grid-cols-3 gap-3 max-w-sm mx-auto"
              data-ocid="girls.loading_state"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-3">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <Skeleton className="h-3 w-14 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
              {GIRLS_CATEGORIES.map((cat, index) => {
                const header = headersMap.get(cat.slug);
                const imageUrl = header?.image?.getDirectURL();
                const redirectUrl = header?.redirectUrl;
                const emoji = CATEGORY_EMOJIS[cat.slug] ?? "✦";
                const direction =
                  SWIPE_DIRECTIONS[index % SWIPE_DIRECTIONS.length];
                const shimmerDelay = `${index * 0.35}s`;

                return (
                  <button
                    type="button"
                    key={cat.slug}
                    onClick={() => handleCategoryClick(cat.slug, redirectUrl)}
                    onMouseEnter={() => setHoveredSlug(cat.slug)}
                    onMouseLeave={() => setHoveredSlug(null)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gold/5 transition-all duration-200 group category-circle-swipe ${direction} ${animated ? "arrived" : ""}`}
                  >
                    <div
                      className="w-16 h-16 rounded-full overflow-hidden border border-gold/30 group-hover:border-gold/60 transition-all duration-200 flex items-center justify-center bg-gold/10 circle-shimmer-border"
                      style={{ animationDelay: shimmerDelay }}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <span className="text-2xl">{emoji}</span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-white drop-shadow text-center leading-tight">
                      {cat.title}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
