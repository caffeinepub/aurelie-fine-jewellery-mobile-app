import { c as useNavigate, r as reactExports, j as jsxRuntimeExports, S as Skeleton } from "./index-BAQMItKk.js";
import { H as HeaderCategoryNav } from "./HeaderCategoryNav-B4N65gmE.js";
import { u as useGetAllCategoryHeaders } from "./useCategoryHeaderNav-CwIAJWJO.js";
import { G as GIRLS_CATEGORIES } from "./productCategories-C8PMBVjD.js";
const CATEGORY_EMOJIS = {
  rings: "💍",
  earrings: "✨",
  necklace: "📿",
  anklets: "🌸",
  "bridal-jewellery": "👰",
  "lab-diamonds-jewellery": "💎"
};
function GirlsHomePage() {
  const navigate = useNavigate();
  const [visible, setVisible] = reactExports.useState(false);
  const { data: categoryHeaders, isLoading } = useGetAllCategoryHeaders();
  const headersMap = new Map(categoryHeaders || []);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeaderCategoryNav, { forceShow: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
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
      const directions = [
        { x: "-60px", y: "-60px" },
        { x: "0px", y: "-80px" },
        { x: "60px", y: "-60px" },
        { x: "-60px", y: "60px" },
        { x: "0px", y: "80px" },
        { x: "60px", y: "60px" }
      ];
      const dir = directions[index % directions.length];
      const header = headersMap.get(cat.slug);
      const imageUrl = (_a = header == null ? void 0 : header.image) == null ? void 0 : _a.getDirectURL();
      const redirectUrl = header == null ? void 0 : header.redirectUrl;
      const emoji = CATEGORY_EMOJIS[cat.slug] ?? "✦";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => handleCategoryClick(cat.slug, redirectUrl),
          className: "flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gold/5 transition-all duration-200 group",
          style: {
            opacity: visible ? 1 : 0,
            transform: visible ? "translate(0, 0)" : `translate(${dir.x}, ${dir.y})`,
            transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full overflow-hidden border border-gold/30 group-hover:border-gold/60 transition-all duration-200 flex items-center justify-center bg-gold/10", children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: imageUrl,
                alt: cat.title,
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: emoji }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground text-center leading-tight", children: cat.title })
          ]
        },
        cat.slug
      );
    }) }) })
  ] });
}
export {
  GirlsHomePage as default
};
