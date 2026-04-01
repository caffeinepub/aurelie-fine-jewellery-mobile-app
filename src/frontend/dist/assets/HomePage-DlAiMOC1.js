import { u as useGetCarouselSlides, r as reactExports, j as jsxRuntimeExports, S as Skeleton, B as Button, a as useNavigate, b as useGetProducts, c as useGetNewArrivals, d as useCart, e as ShoppingCart } from "./index-aj0lqbRn.js";
import { C as ChevronLeft, a as ChevronRight, u as useRecentlyViewed } from "./useRecentlyViewed-CPrcL5k5.js";
import { i as isValidCategorySlug, P as PRODUCT_CATEGORIES } from "./productCategories-C8PMBVjD.js";
import { u as useGetCategoryCarouselImages, a as useGetCarouselRedirect } from "./useCategoryCarouselQueries-DVPzzA-o.js";
import { C as Clock } from "./clock-BfONzFqX.js";
function HomeCarousel() {
  const { data: slides, isLoading } = useGetCarouselSlides();
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [isHovered, setIsHovered] = reactExports.useState(false);
  const [direction, setDirection] = reactExports.useState("right");
  const enabledSlides = (slides == null ? void 0 : slides.filter((slide) => slide.enabled).sort((a, b) => Number(a.order) - Number(b.order))) || [];
  reactExports.useEffect(() => {
    if (enabledSlides.length > 0 && currentIndex >= enabledSlides.length) {
      setCurrentIndex(0);
    }
  }, [enabledSlides.length, currentIndex]);
  reactExports.useEffect(() => {
    if (enabledSlides.length < 2 || isHovered) return;
    const interval = setInterval(() => {
      setDirection("right");
      setCurrentIndex((prev) => (prev + 1) % enabledSlides.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [enabledSlides.length, isHovered]);
  const goToSlide = (index) => {
    if (index > currentIndex) {
      setDirection("right");
    } else if (index < currentIndex) {
      setDirection("left");
    }
    setCurrentIndex(index);
  };
  const goToPrevious = () => {
    setDirection("left");
    setCurrentIndex(
      (prev) => (prev - 1 + enabledSlides.length) % enabledSlides.length
    );
  };
  const goToNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % enabledSlides.length);
  };
  const handleSlideClick = (url) => {
    if (url) {
      window.location.href = url;
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-video", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "absolute inset-0 rounded-2xl" }) }) });
  }
  if (!enabledSlides || enabledSlides.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full mb-8 group",
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full aspect-video overflow-hidden rounded-2xl shadow-bottle-green", children: [
          enabledSlides.map((slide, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + enabledSlides.length) % enabledSlides.length;
            const isNext = index === (currentIndex + 1) % enabledSlides.length;
            let slideClass = "opacity-0 translate-x-full";
            if (isActive) {
              slideClass = "opacity-100 translate-x-0";
            } else if (direction === "right" && isPrev) {
              slideClass = "opacity-0 -translate-x-full";
            } else if (direction === "left" && isNext) {
              slideClass = "opacity-0 translate-x-full";
            } else {
              slideClass = "opacity-0 translate-x-full";
            }
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `absolute inset-0 transition-all duration-700 ease-in-out ${slideClass}`,
                style: { pointerEvents: isActive ? "auto" : "none" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "w-full h-full cursor-pointer focus:outline-none",
                    onClick: () => handleSlideClick(slide.urlRedirect),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: slide.visualContent.getDirectURL(),
                        alt: `Slide ${index + 1}`,
                        className: "w-full h-full object-cover",
                        loading: index === 0 ? "eager" : "lazy",
                        decoding: "async"
                      }
                    )
                  }
                )
              },
              `home-slide-${String(slide.order)}-${index}`
            );
          }),
          enabledSlides.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity",
                onClick: goToPrevious,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-6 w-6" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity",
                onClick: goToNext,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-6 w-6" })
              }
            )
          ] })
        ] }),
        enabledSlides.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-2 mt-4", children: enabledSlides.map((slide, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => goToSlide(index),
            className: `h-2 rounded-full transition-all ${index === currentIndex ? "w-8 bg-gold-medium" : "w-2 bg-gold-medium/40 hover:bg-gold-medium/60"}`,
            "aria-label": `Go to slide ${index + 1}`
          },
          `home-dot-${String(slide.order)}-${slide.urlRedirect || index}`
        )) })
      ]
    }
  );
}
function CategoryImageCarousel({
  categorySlug,
  carouselIndex,
  title
}) {
  const { data: images, isLoading } = useGetCategoryCarouselImages(
    categorySlug,
    carouselIndex
  );
  const { data: redirectUrl } = useGetCarouselRedirect(categorySlug);
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [isHovered, setIsHovered] = reactExports.useState(false);
  const enabledImages = (images == null ? void 0 : images.filter((img) => img)) || [];
  reactExports.useEffect(() => {
    if (enabledImages.length > 0 && currentIndex >= enabledImages.length) {
      setCurrentIndex(0);
    }
  }, [enabledImages.length, currentIndex]);
  reactExports.useEffect(() => {
    if (enabledImages.length < 2 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % enabledImages.length);
    }, 3e3);
    return () => clearInterval(interval);
  }, [enabledImages.length, isHovered]);
  if (!categorySlug || !isValidCategorySlug(categorySlug)) {
    return null;
  }
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex(
      (prev) => (prev - 1 + enabledImages.length) % enabledImages.length
    );
  };
  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % enabledImages.length);
  };
  const handleCarouselClick = () => {
    if (redirectUrl == null ? void 0 : redirectUrl.trim()) {
      window.location.href = redirectUrl;
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      title && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-40 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-video", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "absolute inset-0 rounded-2xl" }) }) })
    ] });
  }
  if (!enabledImages || enabledImages.length === 0) {
    return null;
  }
  const isClickable = redirectUrl == null ? void 0 : redirectUrl.trim();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    title && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-xl font-semibold tracking-tight mb-3 gold-text", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative w-full group",
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: `relative w-full aspect-video overflow-hidden rounded-2xl shadow-bottle-green ${isClickable ? "cursor-pointer" : "cursor-default"} focus:outline-none`,
              onClick: isClickable ? handleCarouselClick : void 0,
              children: [
                enabledImages.map((image, index) => {
                  const isActive = index === currentIndex;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `absolute inset-0 transition-opacity duration-500 ease-in-out ${isActive ? "opacity-100" : "opacity-0"}`,
                      style: { pointerEvents: isActive ? "auto" : "none" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full relative overflow-hidden", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: image.getDirectURL(),
                            alt: `${title || "Carousel"} - Slide ${index + 1}`,
                            className: "w-full h-full object-cover",
                            loading: index === 0 ? "eager" : "lazy",
                            decoding: "async"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" })
                      ] })
                    },
                    `carousel-img-${image.getDirectURL()}`
                  );
                }),
                enabledImages.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm h-8 w-8 z-10",
                      onClick: goToPrevious,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm h-8 w-8 z-10",
                      onClick: goToNext,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" })
                    }
                  )
                ] })
              ]
            }
          ),
          enabledImages.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-2 mt-3", children: enabledImages.map((image, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                goToSlide(index);
              },
              className: `h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-6 bg-gold-medium shadow-gold" : "w-1.5 bg-gold-medium/40 hover:bg-gold-medium/60"}`,
              "aria-label": `Go to slide ${index + 1}`
            },
            `img-dot-${image.getDirectURL()}`
          )) })
        ]
      }
    )
  ] });
}
function formatINR$2(priceInCents) {
  const amount = Number(priceInCents) / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
function CategoryProductRow({
  categorySlug,
  genderFilter
}) {
  const navigate = useNavigate();
  const { data: allProducts, isLoading } = useGetProducts();
  const scrollRef = reactExports.useRef(null);
  const products = (allProducts || []).filter((product) => {
    const categoryMatch = product.category.toLowerCase() === categorySlug.toLowerCase();
    if (!categoryMatch) return false;
    if (genderFilter) {
      const productGender = product.gender;
      return productGender === genderFilter;
    }
    return true;
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-hidden", children: ["a", "b", "c"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "shrink-0",
        style: { width: "calc((100% - 1.5rem) / 3)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4 mt-2 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2 mt-1 rounded" })
        ]
      },
      `skeleton-${id}`
    )) });
  }
  if (products.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: scrollRef,
      className: "flex gap-3 overflow-x-scroll",
      style: {
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .category-product-row::-webkit-scrollbar {
          display: none;
        }
      ` }),
        products.map((product, index) => {
          var _a;
          const imageUrl = ((_a = product.media.images[0]) == null ? void 0 : _a.getDirectURL()) ?? null;
          const shimmerDelay = `${Math.min(index * 0.25, 2)}s`;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate({
                to: "/product/$productId",
                params: { productId: product.id }
              }),
              className: "shrink-0 text-left group focus:outline-none product-card-shimmer",
              style: {
                width: "calc((100% - 1.5rem) / 3)",
                scrollSnapAlign: "start",
                animationDelay: shimmerDelay
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square w-full rounded-xl overflow-hidden bg-beige-light group-hover:shadow-gold transition-all duration-200", children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: imageUrl,
                    alt: product.name,
                    loading: "lazy",
                    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-beige-champagne/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-bottle-green-medium text-center px-2 leading-tight", children: product.name }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 px-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-bottle-green-dark line-clamp-1 leading-tight", children: product.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-gold-dark mt-0.5", children: formatINR$2(product.priceInCents) })
                ] })
              ]
            },
            product.id
          );
        })
      ]
    }
  );
}
function HomeCategoryCarouselsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "w-full py-12 bg-beige-light/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-serif font-bold text-center mb-12 text-bottle-green-dark", children: "Explore Our Collections" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-16", children: PRODUCT_CATEGORIES.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h3",
          {
            className: "text-2xl font-serif font-semibold mb-2",
            style: { color: "#B5860D" },
            children: category.title
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-bottle-green-medium max-w-2xl mx-auto", children: category.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CategoryImageCarousel,
          {
            categorySlug: category.slug,
            carouselIndex: 1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CategoryImageCarousel,
          {
            categorySlug: category.slug,
            carouselIndex: 2
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CategoryProductRow,
        {
          categorySlug: category.slug,
          genderFilter: "girls"
        }
      ) })
    ] }, category.slug)) })
  ] }) });
}
function formatINR$1(priceInCents) {
  const amount = Number(priceInCents) / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}
function NewArrivalsSection() {
  const navigate = useNavigate();
  const { data: products, isLoading } = useGetNewArrivals();
  const { addItem } = useCart();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-8 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-serif text-foreground mb-6", children: "Latest Release" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto pb-4", children: ["a", "b", "c"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "shrink-0 bg-card rounded-lg animate-pulse",
          style: {
            width: "calc(33.333% - 8px)",
            minWidth: "140px",
            maxWidth: "200px"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-muted rounded-t-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-3/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-1/2" })
            ] })
          ]
        },
        `new-arrivals-skeleton-${id}`
      )) })
    ] }) });
  }
  if (!products || products.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-8 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-serif text-foreground", children: "Latest Release" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-gold/20 mx-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-widest", children: "New In" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory", children: products.map((product, index) => {
      const firstImage = product.media.images.length > 0 ? product.media.images[0] : null;
      const imageUrl = firstImage ? firstImage.getDirectURL() : null;
      const shimmerDelay = `${Math.min(index * 0.25, 2)}s`;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "product-card-shimmer shrink-0 snap-start rounded-lg overflow-hidden cursor-pointer group text-left",
          style: {
            width: "calc(33.333% - 8px)",
            minWidth: "140px",
            maxWidth: "200px",
            animationDelay: shimmerDelay
          },
          onClick: () => navigate({ to: `/product/${product.id}` }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden bg-muted relative", children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: imageUrl,
                alt: product.name,
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "No image" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 bg-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-medium text-foreground truncate leading-tight mb-1", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gold font-semibold mb-2", children: formatINR$1(product.priceInCents) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    addItem(product, void 0, void 0);
                  },
                  className: "w-full flex items-center justify-center gap-1 py-1.5 bg-gold/10 hover:bg-gold/20 text-gold rounded text-xs transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3 h-3" })
                }
              )
            ] })
          ]
        },
        product.id
      );
    }) })
  ] }) });
}
function formatINR(priceInCents) {
  const amount = Number(priceInCents) / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
function RecentlyViewedSection() {
  const navigate = useNavigate();
  const { viewedIds } = useRecentlyViewed();
  const { data: allProducts, isLoading } = useGetProducts();
  if (!isLoading && viewedIds.length === 0) return null;
  const recentProducts = viewedIds.map((id) => allProducts == null ? void 0 : allProducts.find((p) => p.id === id)).filter((p) => p !== void 0);
  if (!isLoading && recentProducts.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 bg-beige-light", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 text-gold-medium" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl md:text-3xl font-bold text-bottle-green-dark", children: "Recently Viewed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 w-16 mt-1 bg-gradient-to-r from-gold-medium to-transparent" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-5 overflow-x-auto hide-scrollbar pb-4", children: isLoading ? ["a", "b", "c", "d"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "shrink-0 w-44 md:w-52",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-[3/4] rounded-lg mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4 mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
        ]
      },
      `rv-skeleton-${id}`
    )) : recentProducts.map((product) => {
      const imageUrl = product.media.images.length > 0 ? product.media.images[0].getDirectURL() : null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "shrink-0 w-44 md:w-52 cursor-pointer group product-card-shimmer rounded-lg text-left",
          onClick: () => navigate({
            to: "/product/$productId",
            params: { productId: product.id }
          }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-beige-champagne mb-3", children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: imageUrl,
                alt: product.name,
                loading: "lazy",
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "No image" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-1 pb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-sm font-semibold text-bottle-green-dark line-clamp-1 group-hover:text-gold-dark transition-colors", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-gold-dark mt-0.5", children: formatINR(product.priceInCents) })
            ] })
          ]
        },
        product.id
      );
    }) })
  ] }) });
}
function HomePageSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen animate-pulse",
      "data-ocid": "homepage.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-video", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "absolute inset-0 rounded-2xl" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-40 mb-4 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl" }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 space-y-8 mb-10", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-video rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [1, 2, 3].map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl" }, j)) })
        ] }, i)) })
      ]
    }
  );
}
function HomePage() {
  const [showSkeleton, setShowSkeleton] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 800);
    return () => clearTimeout(timer);
  }, []);
  if (showSkeleton) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(HomePageSkeleton, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HomeCarousel, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewArrivalsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HomeCategoryCarouselsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RecentlyViewedSection, {})
  ] });
}
export {
  HomePage as default
};
