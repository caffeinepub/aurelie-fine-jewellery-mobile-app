import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import HeaderCategoryNav from "../components/HeaderCategoryNav";
import { Skeleton } from "../components/ui/skeleton";
import { useGetAllCategoryHeaders } from "../hooks/useCategoryHeaderNav";
import { GIRLS_CATEGORIES } from "../utils/productCategories";

const CATEGORY_EMOJIS: Record<string, string> = {
  rings: "💍",
  earrings: "✨",
  necklace: "📿",
  anklets: "🌸",
  "bridal-jewellery": "👰",
  "lab-diamonds-jewellery": "💎",
};

export default function GirlsHomePage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { data: categoryHeaders, isLoading } = useGetAllCategoryHeaders();

  const headersMap = new Map(categoryHeaders || []);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="min-h-screen">
      {/* Header Category Nav (product category row) */}
      <HeaderCategoryNav forceShow />

      {/* Category Grid */}
      <div className="px-4 py-6">
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
              const directions = [
                { x: "-60px", y: "-60px" },
                { x: "0px", y: "-80px" },
                { x: "60px", y: "-60px" },
                { x: "-60px", y: "60px" },
                { x: "0px", y: "80px" },
                { x: "60px", y: "60px" },
              ];
              const dir = directions[index % directions.length];
              const header = headersMap.get(cat.slug);
              const imageUrl = header?.image?.getDirectURL();
              const redirectUrl = header?.redirectUrl;
              const emoji = CATEGORY_EMOJIS[cat.slug] ?? "✦";

              return (
                <button
                  type="button"
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat.slug, redirectUrl)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gold/5 transition-all duration-200 group"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible
                      ? "translate(0, 0)"
                      : `translate(${dir.x}, ${dir.y})`,
                    transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
                  }}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-gold/30 group-hover:border-gold/60 transition-all duration-200 flex items-center justify-center bg-gold/10">
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
                  <span className="text-xs font-medium text-foreground text-center leading-tight">
                    {cat.title}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
