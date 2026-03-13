import { l as createLucideIcon, j as jsxRuntimeExports, B as Button, F as cn, X, r as reactExports, c as useNavigate, g as ShoppingCart, d as useGetProducts, aw as useGetCategory, f as useCart, m as useInternetIdentity, k as ue } from "./index-B1_sVdMb.js";
import { C as CustomerPageStyleScope } from "./CustomerPageStyleScope-OGDA4U6s.js";
import { B as Badge } from "./badge-bl5zitdd.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C3J02y9B.js";
import { R as Root, C as Content, a as Close, T as Title, P as Portal, O as Overlay } from "./index-DnaRw3xr.js";
import { H as HeaderCategoryNav } from "./HeaderCategoryNav-Bj331ht8.js";
import { C as Card, a as CardContent } from "./card-sJlFJuS-.js";
import { L as LoaderCircle } from "./loader-circle-B6eg7Twa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
function FilterIconButton({
  activeFilterCount,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      variant: "outline",
      size: "icon",
      onClick,
      className: "relative border-gold-medium/40 hover:border-gold-medium hover:bg-gold-medium/10 text-bottle-green-dark",
      "aria-label": `Open filters${activeFilterCount > 0 ? ` (${activeFilterCount} active)` : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
        activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-gold-medium text-white border-0 rounded-full", children: activeFilterCount })
      ]
    }
  );
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "sheet", ...props });
}
function SheetClose({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { "data-slot": "sheet-close", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function FilterPanel({
  open,
  onOpenChange,
  filters,
  activeFilterCount: _activeFilterCount,
  totalProducts,
  filteredCount,
  onMetalTypeChange,
  onPriceRangeChange,
  onOccasionChange,
  onSortOrderChange,
  onClearFilters
}) {
  const [draft, setDraft] = reactExports.useState(filters);
  const handleOpenChange = (isOpen) => {
    if (isOpen) setDraft(filters);
    onOpenChange(isOpen);
  };
  const handleApply = () => {
    onMetalTypeChange(draft.metalType);
    onPriceRangeChange(draft.priceRange);
    onOccasionChange(draft.occasion);
    onSortOrderChange(draft.sortOrder);
    onOpenChange(false);
  };
  const handleClearAll = () => {
    const cleared = {
      metalType: "all",
      priceRange: "all",
      occasion: "all",
      sortOrder: "default"
    };
    setDraft(cleared);
    onClearFilters();
    onOpenChange(false);
  };
  const draftActiveCount = [
    draft.metalType !== "all",
    draft.priceRange !== "all",
    draft.occasion !== "all",
    draft.sortOrder !== "default"
  ].filter(Boolean).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange: handleOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      side: "right",
      className: "w-full sm:w-[400px] bg-beige-light border-l border-gold-medium/20 flex flex-col p-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "px-6 py-5 border-b border-gold-medium/20 bg-beige-champagne", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-5 w-5 text-gold-medium" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-serif text-xl text-bottle-green-dark", children: "Filters" }),
              draftActiveCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-gold-medium text-white text-xs px-2 py-0.5 rounded-full border-0", children: draftActiveCount })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetClose, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "text-bottle-green-dark hover:text-gold-medium",
                "data-no-admin-style": true,
                "data-no-customer-style": true,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            "Showing ",
            filteredCount,
            " of ",
            totalProducts,
            " products"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-6 py-6 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "filter-metal",
                className: "text-sm font-semibold text-bottle-green-dark tracking-wide uppercase",
                children: "Metal Type"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: draft.metalType,
                onValueChange: (v) => setDraft((d) => ({ ...d, metalType: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "filter-metal",
                      className: "w-full border-gold-medium/30 bg-white/80 focus:ring-gold-medium/30 text-bottle-green-dark",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Metals" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Metals" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "gold", children: "Gold" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "silver", children: "Silver" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "platinum", children: "Platinum" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rose-gold", children: "Rose Gold" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "filter-price",
                className: "text-sm font-semibold text-bottle-green-dark tracking-wide uppercase",
                children: "Price Range"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: draft.priceRange,
                onValueChange: (v) => setDraft((d) => ({ ...d, priceRange: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "filter-price",
                      className: "w-full border-gold-medium/30 bg-white/80 focus:ring-gold-medium/30 text-bottle-green-dark",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Prices" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Prices" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "under-5000", children: "Under ₹5,000" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "5000-10000", children: "₹5,000 – ₹10,000" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "10000-20000", children: "₹10,000 – ₹20,000" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "above-20000", children: "Above ₹20,000" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "filter-occasion",
                className: "text-sm font-semibold text-bottle-green-dark tracking-wide uppercase",
                children: "Occasion"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: draft.occasion,
                onValueChange: (v) => setDraft((d) => ({ ...d, occasion: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "filter-occasion",
                      className: "w-full border-gold-medium/30 bg-white/80 focus:ring-gold-medium/30 text-bottle-green-dark",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Occasions" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Occasions" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "wedding", children: "Wedding" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "anniversary", children: "Anniversary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "birthday", children: "Birthday" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "casual", children: "Casual" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "daily-wear", children: "Daily Wear" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "filter-sort",
                className: "text-sm font-semibold text-bottle-green-dark tracking-wide uppercase",
                children: "Sort By"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: draft.sortOrder,
                onValueChange: (v) => setDraft((d) => ({ ...d, sortOrder: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "filter-sort",
                      className: "w-full border-gold-medium/30 bg-white/80 focus:ring-gold-medium/30 text-bottle-green-dark",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Default Order" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "default", children: "Default Order" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price-asc", children: "Price: Low to High" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price-desc", children: "Price: High to Low" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "newest", children: "New Arrivals First" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "name-az", children: "Name: A to Z" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-5 border-t border-gold-medium/20 bg-beige-champagne space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleApply,
              className: "w-full bg-gold-medium hover:bg-gold-dark text-white font-semibold",
              "data-no-admin-style": true,
              "data-no-customer-style": true,
              children: [
                "Apply Filters",
                draftActiveCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full", children: draftActiveCount })
              ]
            }
          ),
          draftActiveCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              onClick: handleClearAll,
              className: "w-full text-bottle-green-dark hover:text-gold-medium gap-2",
              "data-no-admin-style": true,
              "data-no-customer-style": true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
                "Clear All Filters"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
const DIRECTIONS = [
  "from-left",
  "from-right",
  "from-top",
  "from-bottom"
];
function getDirection(index) {
  return DIRECTIONS[index % DIRECTIONS.length];
}
function formatINR(priceInCents) {
  const priceInRupees = Number(priceInCents) / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(priceInRupees);
}
function MasonryProductGrid({
  products,
  onAddToCart,
  onBuyNow
}) {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = reactExports.useState(/* @__PURE__ */ new Set());
  const gridRef = reactExports.useRef(null);
  const observerRef = reactExports.useRef(null);
  const cardRefs = reactExports.useRef([]);
  reactExports.useEffect(() => {
    setVisibleCards(/* @__PURE__ */ new Set());
    cardRefs.current = cardRefs.current.slice(0, products.length);
  }, [products]);
  reactExports.useEffect(() => {
    var _a;
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    observerRef.current = new IntersectionObserver(
      (entries) => {
        var _a2;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number.parseInt(
              entry.target.getAttribute("data-index") || "0",
              10
            );
            setTimeout(() => {
              setVisibleCards((prev) => /* @__PURE__ */ new Set([...prev, index]));
            }, index * 80);
            (_a2 = observerRef.current) == null ? void 0 : _a2.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    for (const ref of cardRefs.current) {
      if (ref) (_a = observerRef.current) == null ? void 0 : _a.observe(ref);
    }
    return () => {
      var _a2;
      (_a2 = observerRef.current) == null ? void 0 : _a2.disconnect();
    };
  });
  if (products.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground mb-8", children: "No products match your current filters." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Try adjusting or clearing your filters." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: gridRef,
      className: "masonry-grid",
      style: {
        columns: "var(--masonry-cols, 2)",
        columnGap: "1.5rem"
      },
      children: products.map((product, index) => {
        const direction = getDirection(index);
        const isVisible = visibleCards.has(index);
        const imageUrl = product.media.images.length > 0 ? product.media.images[0].getDirectURL() : null;
        const aspectVariants = [
          "aspect-square",
          "aspect-[3/4]",
          "aspect-[4/5]",
          "aspect-[2/3]"
        ];
        const aspectClass = aspectVariants[index % aspectVariants.length];
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: (el) => {
              cardRefs.current[index] = el;
            },
            "data-index": index,
            className: `masonry-card mb-6 card-entrance ${direction} ${isVisible ? "arrived" : ""} product-card-shimmer`,
            style: { breakInside: "avoid" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group overflow-hidden offwhite-surface hover:shadow-gold transition-all duration-300 border-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: `relative ${aspectClass} overflow-hidden cursor-pointer offwhite-surface w-full focus:outline-none`,
                  onClick: () => navigate({ to: `/product/${product.id}` }),
                  children: [
                    imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: imageUrl,
                        alt: product.name,
                        loading: "lazy",
                        className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-12 w-12 text-muted-foreground" }) }),
                    Number(product.createdAt) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gold-medium text-white text-xs px-2 py-0.5 rounded-full font-medium", children: "New" }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-base font-semibold tracking-tight line-clamp-1", children: product.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 mt-1", children: product.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold gold-text", children: formatINR(product.priceInCents) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs px-2 py-0.5 rounded-full font-medium ${product.inStock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`,
                      children: product.inStock ? "In Stock" : "Out of Stock"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: () => onAddToCart(product),
                      disabled: !product.inStock,
                      className: "flex-1 customer-cta-btn text-xs",
                      size: "sm",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-3 w-3" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: () => onBuyNow(product),
                      disabled: !product.inStock,
                      variant: "outline",
                      className: "flex-1 border-gold-medium hover:bg-gold-medium/10 text-xs",
                      size: "sm",
                      children: "Buy Now"
                    }
                  )
                ] })
              ] })
            ] })
          },
          product.id
        );
      })
    }
  );
}
const defaultFilters = {
  metalType: "all",
  priceRange: "all",
  occasion: "all",
  sortOrder: "default"
};
function matchesMetalType(product, metalType) {
  if (metalType === "all") return true;
  const text = `${product.name} ${product.description}`.toLowerCase();
  switch (metalType) {
    case "gold":
      return text.includes("gold") && !text.includes("rose gold");
    case "silver":
      return text.includes("silver");
    case "platinum":
      return text.includes("platinum");
    case "rose-gold":
      return text.includes("rose gold");
    default:
      return true;
  }
}
function matchesPriceRange(product, priceRange) {
  if (priceRange === "all") return true;
  const priceInRupees = Number(product.priceInCents) / 100;
  switch (priceRange) {
    case "under-5000":
      return priceInRupees < 5e3;
    case "5000-10000":
      return priceInRupees >= 5e3 && priceInRupees <= 1e4;
    case "10000-20000":
      return priceInRupees > 1e4 && priceInRupees <= 2e4;
    case "above-20000":
      return priceInRupees > 2e4;
    default:
      return true;
  }
}
function matchesOccasion(product, occasion) {
  if (occasion === "all") return true;
  const text = `${product.name} ${product.description} ${product.category}`.toLowerCase();
  switch (occasion) {
    case "wedding":
      return text.includes("wedding") || text.includes("bridal");
    case "anniversary":
      return text.includes("anniversary");
    case "birthday":
      return text.includes("birthday");
    case "casual":
      return text.includes("casual");
    case "daily-wear":
      return text.includes("daily") || text.includes("everyday") || text.includes("everyday wear");
    default:
      return true;
  }
}
function sortProducts(products, sortOrder) {
  const sorted = [...products];
  switch (sortOrder) {
    case "price-asc":
      return sorted.sort(
        (a, b) => Number(a.priceInCents) - Number(b.priceInCents)
      );
    case "price-desc":
      return sorted.sort(
        (a, b) => Number(b.priceInCents) - Number(a.priceInCents)
      );
    case "newest":
      return sorted.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
    case "name-az":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}
function useProductFilters(products) {
  const [filters, setFilters] = reactExports.useState(defaultFilters);
  const filteredProducts = reactExports.useMemo(() => {
    let result = products.filter((product) => {
      return matchesMetalType(product, filters.metalType) && matchesPriceRange(product, filters.priceRange) && matchesOccasion(product, filters.occasion);
    });
    return sortProducts(result, filters.sortOrder);
  }, [products, filters]);
  const activeFilterCount = reactExports.useMemo(() => {
    let count = 0;
    if (filters.metalType !== "all") count++;
    if (filters.priceRange !== "all") count++;
    if (filters.occasion !== "all") count++;
    if (filters.sortOrder !== "default") count++;
    return count;
  }, [filters]);
  const setMetalType = (metalType) => setFilters((f) => ({ ...f, metalType }));
  const setPriceRange = (priceRange) => setFilters((f) => ({ ...f, priceRange }));
  const setOccasion = (occasion) => setFilters((f) => ({ ...f, occasion }));
  const setSortOrder = (sortOrder) => setFilters((f) => ({ ...f, sortOrder }));
  const clearFilters = () => setFilters(defaultFilters);
  return {
    filters,
    filteredProducts,
    activeFilterCount,
    setMetalType,
    setPriceRange,
    setOccasion,
    setSortOrder,
    clearFilters
  };
}
function CategoryPageTemplate({
  categorySlug,
  categoryTitle,
  categoryDescription,
  genderFilter
}) {
  var _a;
  const navigate = useNavigate();
  const { data: products, isLoading } = useGetProducts();
  const { data: categoryData } = useGetCategory(categorySlug);
  const { addItem } = useCart();
  const { identity } = useInternetIdentity();
  const [filterPanelOpen, setFilterPanelOpen] = reactExports.useState(false);
  const isAuthenticated = !!identity;
  const categoryVideoUrl = ((_a = categoryData == null ? void 0 : categoryData.video) == null ? void 0 : _a.getDirectURL()) ?? null;
  const categoryProducts = (products == null ? void 0 : products.filter((product) => {
    const categoryMatch = product.category.toLowerCase() === categorySlug.toLowerCase();
    if (!categoryMatch) return false;
    if (genderFilter) {
      const productGender = product.gender;
      return productGender === genderFilter;
    }
    return true;
  })) || [];
  const {
    filters,
    filteredProducts,
    activeFilterCount,
    setMetalType,
    setPriceRange,
    setOccasion,
    setSortOrder,
    clearFilters
  } = useProductFilters(categoryProducts);
  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      ue.error("Please log in to add items to cart");
      return;
    }
    addItem(product, void 0, void 0, 1);
    ue.success(`${product.name} added to cart`);
  };
  const handleBuyNow = (product) => {
    if (!isAuthenticated) {
      ue.error("Please log in to purchase");
      return;
    }
    addItem(product, void 0, void 0, 1);
    navigate({ to: "/checkout" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerPageStyleScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeaderCategoryNav, { forceShow: true }),
    categoryVideoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-video bg-black overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "video",
      {
        src: categoryVideoUrl,
        autoPlay: true,
        muted: true,
        loop: true,
        playsInline: true,
        className: "w-full h-full object-cover"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "offwhite-surface py-12 md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4", children: categoryTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: categoryDescription })
        ] }),
        !isLoading && categoryProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilterIconButton,
          {
            activeFilterCount,
            onClick: () => setFilterPanelOpen(true)
          }
        ) })
      ] }),
      activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Showing ",
          filteredProducts.length,
          " of ",
          categoryProducts.length,
          " ",
          "products"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: clearFilters,
            className: "text-gold-dark hover:text-gold-medium underline text-xs",
            children: "Clear filters"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FilterPanel,
      {
        open: filterPanelOpen,
        onOpenChange: setFilterPanelOpen,
        filters,
        activeFilterCount,
        totalProducts: categoryProducts.length,
        filteredCount: filteredProducts.length,
        onMetalTypeChange: setMetalType,
        onPriceRangeChange: setPriceRange,
        onOccasionChange: setOccasion,
        onSortOrderChange: setSortOrder,
        onClearFilters: clearFilters
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "offwhite-surface py-8 md:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container px-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-12 w-12 animate-spin text-gold-medium" }) }) : categoryProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground mb-8", children: "No products available in this category yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({ to: "/" }), children: "Browse All Products" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      MasonryProductGrid,
      {
        products: filteredProducts,
        onAddToCart: handleAddToCart,
        onBuyNow: handleBuyNow
      }
    ) }) })
  ] }) });
}
export {
  CategoryPageTemplate as C
};
