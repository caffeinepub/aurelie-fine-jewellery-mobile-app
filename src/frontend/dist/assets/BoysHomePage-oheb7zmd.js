import { a as useNavigate, ag as useLocation, ae as useGetAllCategories, r as reactExports, j as jsxRuntimeExports, S as Skeleton } from "./index-aj0lqbRn.js";
import { C as CustomerPageStyleScope } from "./CustomerPageStyleScope-DzIK5pre.js";
import { u as useGetAllCategoryHeaders } from "./useCategoryHeaderNav-7ThgdJwO.js";
import { B as BOYS_CATEGORIES } from "./productCategories-C8PMBVjD.js";
const SWIPE_DIRECTIONS = ["from-left", "from-top", "from-right", "from-bottom"];
function BoysHomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: categoryHeaders, isLoading } = useGetAllCategoryHeaders();
  const { data: allCategories } = useGetAllCategories();
  const [animated, setAnimated] = reactExports.useState(false);
  const mountCounterRef = reactExports.useRef(0);
  const [mountKey, setMountKey] = reactExports.useState(0);
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
    for (const cat of BOYS_CATEGORIES) {
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
  const handleCategoryClick = (categorySlug, redirectUrl) => {
    if (redirectUrl == null ? void 0 : redirectUrl.trim()) {
      if (redirectUrl.startsWith("http://") || redirectUrl.startsWith("https://")) {
        window.location.href = redirectUrl;
      } else {
        navigate({ to: redirectUrl });
      }
    } else {
      navigate({ to: `/boys/${categorySlug.replace("boys-", "")}` });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CustomerPageStyleScope, { children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "offwhite-surface py-12 text-center border-b border-gold-medium/20 bg-[#F7E7CE]/80 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl md:text-5xl font-bold tracking-tight mb-3 text-bottle-green-dark", children: "For Him" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-bottle-green-medium text-lg max-w-xl mx-auto", children: "Refined jewellery crafted for the modern gentleman" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-12", style: { overflow: "visible" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container px-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-start gap-8 overflow-x-auto hide-scrollbar pb-4 justify-center flex-wrap md:flex-nowrap",
          "data-ocid": "boys.loading_state",
          children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center gap-3 min-w-[100px] shrink-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-24 h-24 md:w-28 md:h-28 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16 rounded" })
              ]
            },
            i
          ))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-8 overflow-x-auto hide-scrollbar pb-4 justify-center flex-wrap md:flex-nowrap", children: BOYS_CATEGORIES.map((category, index) => {
        var _a;
        const header = headersMap.get(category.slug);
        const imageUrl = (_a = header == null ? void 0 : header.image) == null ? void 0 : _a.getDirectURL();
        const redirectUrl = header == null ? void 0 : header.redirectUrl;
        const direction = SWIPE_DIRECTIONS[index % SWIPE_DIRECTIONS.length];
        const shimmerDelay = `${index * 0.4}s`;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => handleCategoryClick(category.slug, redirectUrl),
            onMouseEnter: () => setHoveredSlug(category.slug),
            onMouseLeave: () => setHoveredSlug(null),
            className: `flex flex-col items-center gap-3 min-w-[100px] hover:opacity-80 transition-all duration-200 group shrink-0 category-circle-swipe ${direction} ${animated ? "arrived" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gold-medium/40 group-hover:border-gold-medium transition-all duration-200 shadow-md group-hover:shadow-gold bg-beige-champagne flex items-center justify-center circle-shimmer-border",
                  style: { animationDelay: shimmerDelay },
                  children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: imageUrl,
                      alt: category.title,
                      className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-beige-champagne to-gold-medium/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-serif text-gold-medium font-bold", children: category.title.charAt(0) }) })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-white drop-shadow tracking-wide text-center font-serif", children: category.title })
            ]
          },
          category.slug
        );
      }) }) }) }, mountKey),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-24 bg-gold-medium/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-4 text-gold-medium text-lg", children: "✦" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-24 bg-gold-medium/60" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center pb-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-white drop-shadow italic text-base", children: "Select a category to explore our exclusive collection" }) })
    ] })
  ] });
}
export {
  BoysHomePage as default
};
