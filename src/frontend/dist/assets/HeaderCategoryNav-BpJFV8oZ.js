import { c as useNavigate, ac as useLocation, j as jsxRuntimeExports } from "./index-DGBrfQOZ.js";
import { u as useGetAllCategoryHeaders } from "./useCategoryHeaderNav-CYitveWz.js";
import { P as PRODUCT_CATEGORIES } from "./productCategories-C8PMBVjD.js";
function HeaderCategoryNav({
  forceShow = false
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: categoryHeaders } = useGetAllCategoryHeaders();
  if (!forceShow && location.pathname.startsWith("/admin")) {
    return null;
  }
  const headersMap = new Map(categoryHeaders || []);
  const handleCategoryClick = (categorySlug, redirectUrl) => {
    if (redirectUrl == null ? void 0 : redirectUrl.trim()) {
      if (redirectUrl.startsWith("http://") || redirectUrl.startsWith("https://")) {
        window.location.href = redirectUrl;
      } else {
        navigate({ to: redirectUrl });
      }
    } else {
      navigate({ to: `/category/${categorySlug}` });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-b border-gold-medium/20 bg-transparent backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-6 overflow-x-auto hide-scrollbar", children: PRODUCT_CATEGORIES.map((category) => {
    var _a;
    const header = headersMap.get(category.slug);
    const imageUrl = (_a = header == null ? void 0 : header.image) == null ? void 0 : _a.getDirectURL();
    const redirectUrl = header == null ? void 0 : header.redirectUrl;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => handleCategoryClick(category.slug, redirectUrl),
        className: "flex flex-col items-center gap-2 min-w-[80px] hover:opacity-80 transition-opacity group shrink-0",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full overflow-hidden border-2 border-gold-medium/30 group-hover:border-gold-medium transition-all flex items-center justify-center bg-transparent category-circle-glow", children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: category.title,
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-beige-champagne/50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-bottle-green-medium text-center px-1", children: category.title.split(" ")[0] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-bottle-green-dark text-center leading-tight", children: category.title })
        ]
      },
      category.slug
    );
  }) }) }) });
}
export {
  HeaderCategoryNav as H
};
