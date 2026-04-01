import { a as useNavigate, ag as useLocation, r as reactExports, ae as useGetAllCategories, j as jsxRuntimeExports, S as Skeleton } from "./index-aj0lqbRn.js";
import { H as HeaderCategoryNav } from "./HeaderCategoryNav-htO4vJNj.js";
import { u as useGetAllCategoryHeaders } from "./useCategoryHeaderNav-7ThgdJwO.js";
import { G as GIRLS_CATEGORIES } from "./productCategories-C8PMBVjD.js";
const CATEGORY_EMOJIS = {
  rings: "💍",
  earrings: "✨",
  necklace: "📿",
  anklets: "🌸",
  "bridal-jewellery": "👰",
  "lab-diamonds-jewellery": "💎"
};
const SWIPE_DIRECTIONS = [
  "from-left",
  "from-top",
  "from-right",
  "from-left",
  "from-bottom",
  "from-right"
];
function GirlsHomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [animated, setAnimated] = reactExports.useState(false);
  const mountCounterRef = reactExports.useRef(0);
  const [mountKey, setMountKey] = reactExports.useState(0);
  const { data: categoryHeaders, isLoading } = useGetAllCategoryHeaders();
  const { data: allCategories } = useGetAllCategories();
  const [hoveredSlug, setHoveredSlug] = reactExports.useState(null);
  const headersMap = new Map(categoryHeaders || []);
  const categoryVideoMap = /* @__PURE__ */ new Map();
  if (allCategories) {
    for (const cat of allCategories) {
      if (cat.video) {
        const videoUrl = cat.video.getDirectURL();
        categoryVideoMap.set(cat.name, videoUrl);
      }
    }
  }
  const activeVideoUrl = (() => {
    if (hoveredSlug && categoryVideoMap.has(hoveredSlug)) {
      return categoryVideoMap.get(hoveredSlug);
    }
    for (const cat of GIRLS_CATEGORIES) {
      if (categoryVideoMap.has(cat.slug)) {
        return categoryVideoMap.get(cat.slug);
      }
    }
    return void 0;
  })();
  reactExports.useEffect(() => {
    location.pathname;
    mountCounterRef.current += 1;
    setMountKey((k) => k + 1);
    setAnimated(false);
    const timer = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(timer);
  }, [location.pathname]);
  const handleCategoryClick = (slug, redirectUrl) => {
    if (redirectUrl == null ? void 0 : redirectUrl.trim()) {
      if (redirectUrl.startsWith("http://") || redirectUrl.startsWith("https://")) {
        window.location.href = redirectUrl;
      } else {
        navigate({ to: redirectUrl });
      }
    } else {
      navigate({ to: `/${slug}` });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-0 pointer-events-none", children: [
      activeVideoUrl && // biome-ignore lint/a11y/useMediaCaption: background decorative video
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "video",
        {
          src: activeVideoUrl,
          autoPlay: true,
          muted: true,
          loop: true,
          playsInline: true,
          className: "w-full h-full object-cover"
        },
        activeVideoUrl
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/30" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeaderCategoryNav, { forceShow: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "px-4 py-6",
          style: { overflow: "visible" },
          children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-3 gap-3 max-w-sm mx-auto",
              "data-ocid": "girls.loading_state",
              children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-16 h-16 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-14 rounded" })
              ] }, i))
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 max-w-sm mx-auto", children: GIRLS_CATEGORIES.map((cat, index) => {
            var _a;
            const header = headersMap.get(cat.slug);
            const imageUrl = (_a = header == null ? void 0 : header.image) == null ? void 0 : _a.getDirectURL();
            const redirectUrl = header == null ? void 0 : header.redirectUrl;
            const emoji = CATEGORY_EMOJIS[cat.slug] ?? "✦";
            const direction = SWIPE_DIRECTIONS[index % SWIPE_DIRECTIONS.length];
            const shimmerDelay = `${index * 0.35}s`;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleCategoryClick(cat.slug, redirectUrl),
                onMouseEnter: () => setHoveredSlug(cat.slug),
                onMouseLeave: () => setHoveredSlug(null),
                className: `flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gold/5 transition-all duration-200 group category-circle-swipe ${direction} ${animated ? "arrived" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-16 h-16 rounded-full overflow-hidden border border-gold/30 group-hover:border-gold/60 transition-all duration-200 flex items-center justify-center bg-gold/10 circle-shimmer-border",
                      style: { animationDelay: shimmerDelay },
                      children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: imageUrl,
                          alt: cat.title,
                          className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: emoji })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-white drop-shadow text-center leading-tight", children: cat.title })
                ]
              },
              cat.slug
            );
          }) })
        },
        mountKey
      )
    ] })
  ] });
}
export {
  GirlsHomePage as default
};
