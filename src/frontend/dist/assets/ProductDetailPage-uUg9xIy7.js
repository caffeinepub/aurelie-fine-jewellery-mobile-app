import { r as reactExports, j as jsxRuntimeExports, B as Button, h as useParams, c as useNavigate, i as useGetProduct, f as useCart, g as ShoppingCart, k as ue } from "./index-B1_sVdMb.js";
import { C as CustomerPageStyleScope } from "./CustomerPageStyleScope-OGDA4U6s.js";
import { C as ChevronLeft, a as ChevronRight, u as useRecentlyViewed } from "./useRecentlyViewed-CSFm2m7U.js";
import { C as Card, a as CardContent } from "./card-sJlFJuS-.js";
import { A as ArrowLeft } from "./arrow-left-D7dWfhPX.js";
import { M as Minus } from "./minus-BifgbI12.js";
import { P as Plus } from "./plus-2wIcCt3Q.js";
function ProductMediaCarousel({
  media,
  productName
}) {
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const mediaItems = [];
  if (media.video) {
    mediaItems.push({ type: "video", url: media.video.getDirectURL() });
  }
  for (const image of media.images) {
    mediaItems.push({ type: "image", url: image.getDirectURL() });
  }
  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length
    );
  };
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  if (mediaItems.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "relative overflow-hidden rounded-lg gold-border bg-bottle-green-light/20 shadow-gold flex items-center justify-center",
        style: { paddingBottom: "100%" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center text-muted-foreground", children: "No media available" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-lg gold-border bg-bottle-green-light/20 shadow-gold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full", style: { paddingBottom: "100%" }, children: mediaItems.map((item, index) => {
        const isActive = index === currentIndex;
        const isAdjacent = Math.abs(index - currentIndex) <= 1 || currentIndex === 0 && index === mediaItems.length - 1 || currentIndex === mediaItems.length - 1 && index === 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`,
            style: { pointerEvents: isActive ? "auto" : "none" },
            children: item.type === "video" ? (
              // biome-ignore lint/a11y/useMediaCaption: decorative product video
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "video",
                {
                  src: item.url,
                  controls: true,
                  className: "w-full h-full object-cover",
                  preload: isActive ? "auto" : "metadata",
                  children: "Your browser does not support the video tag."
                }
              )
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.url,
                alt: `${productName} - ${index + 1}`,
                className: "w-full h-full object-cover",
                loading: isAdjacent ? "eager" : "lazy",
                decoding: "async"
              }
            )
          },
          `media-item-${item.url}`
        );
      }) }),
      mediaItems.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
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
    mediaItems.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-2 mt-4", children: mediaItems.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => goToSlide(index),
        className: `h-2 rounded-full transition-all ${index === currentIndex ? "w-8 bg-gold-medium" : "w-2 bg-gold-medium/40 hover:bg-gold-medium/60"}`,
        "aria-label": `Go to ${item.type} ${index + 1}`,
        title: item.type === "video" ? "Video" : `Image ${index + 1}`
      },
      `media-dot-${item.url}`
    )) }),
    mediaItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded", children: mediaItems[currentIndex].type === "video" ? "Video" : `${currentIndex + 1} / ${mediaItems.length}` })
  ] });
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
function isRingCategory(category) {
  return /\brings?\b/i.test(category);
}
const METAL_COLOUR_SWATCHES = {
  "Yellow Gold": "#FFD700",
  "Rose Gold": "#B76E79",
  "White Gold": "#E8E8E8"
};
function ProductDetailPage() {
  var _a, _b;
  const { productId } = useParams({ from: "/product/$productId" });
  const navigate = useNavigate();
  const { data: product, isLoading } = useGetProduct(productId);
  const { addItem } = useCart();
  const [quantity, setQuantity] = reactExports.useState(1);
  const [selectedRingSize, setSelectedRingSize] = reactExports.useState(null);
  const [selectedMetalColour, setSelectedMetalColour] = reactExports.useState(
    null
  );
  const { addProduct } = useRecentlyViewed();
  reactExports.useEffect(() => {
    if (productId) {
      addProduct(productId);
    }
  }, [productId, addProduct]);
  const isRing = product ? isRingCategory(product.category) : false;
  const hasSizes = isRing && ((_a = product == null ? void 0 : product.ringVariants) == null ? void 0 : _a.sizes) && product.ringVariants.sizes.length > 0;
  const hasColours = isRing && ((_b = product == null ? void 0 : product.ringVariants) == null ? void 0 : _b.colours) && product.ringVariants.colours.length > 0;
  const handleAddToCart = () => {
    if (!product) return;
    addItem(
      product,
      selectedRingSize ?? void 0,
      selectedMetalColour ?? void 0,
      quantity
    );
    ue.success(`${quantity} × ${product.name} added to cart`);
  };
  const handleBuyNow = () => {
    handleAddToCart();
    navigate({ to: "/cart" });
  };
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerPageStyleScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-pulse space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 bg-muted rounded w-1/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-muted rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 bg-muted rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-muted rounded" })
        ] })
      ] })
    ] }) }) });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerPageStyleScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-serif font-bold mb-4", children: "Product not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({ to: "/" }), children: "Return to Home" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerPageStyleScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => navigate({ to: "/" }),
        className: "mb-6 text-bottle-green-dark hover:text-bottle-green-medium",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
          "Back to Products"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProductMediaCarousel,
        {
          media: product.media,
          productName: product.name
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-serif font-bold text-bottle-green-dark mb-2", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold text-gold-dark", children: formatINR(product.priceInCents) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `inline-block px-4 py-2 rounded-full text-sm font-medium ${product.inStock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`,
            children: product.inStock ? "In Stock" : "Out of Stock"
          }
        ),
        hasSizes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "ring.size_selector", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-bottle-green-dark tracking-wide uppercase", children: [
            "Ring Size",
            selectedRingSize && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 font-normal text-gold-dark normal-case", children: [
              "— ",
              selectedRingSize
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: product.ringVariants.sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedRingSize(
                selectedRingSize === size ? null : size
              ),
              className: `w-11 h-11 rounded-full border-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-medium ${selectedRingSize === size ? "border-gold-dark bg-gold-medium text-white shadow-md" : "border-gold-medium/40 text-bottle-green-dark hover:border-gold-medium hover:bg-gold-light/20"}`,
              "aria-pressed": selectedRingSize === size,
              children: size
            },
            size
          )) })
        ] }),
        hasColours && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "ring.colour_selector", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-bottle-green-dark tracking-wide uppercase", children: [
            "Metal Colour",
            selectedMetalColour && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 font-normal text-gold-dark normal-case", children: [
              "— ",
              selectedMetalColour
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: product.ringVariants.colours.map((colour) => {
            const swatchColour = METAL_COLOUR_SWATCHES[colour] ?? "#cccccc";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setSelectedMetalColour(
                  selectedMetalColour === colour ? null : colour
                ),
                className: `flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-medium ${selectedMetalColour === colour ? "border-gold-dark bg-gold-medium/10 shadow-md" : "border-gold-medium/40 hover:border-gold-medium hover:bg-gold-light/10"}`,
                "aria-pressed": selectedMetalColour === colour,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-4 h-4 rounded-full border border-black/10 shrink-0",
                      style: { backgroundColor: swatchColour },
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-bottle-green-dark", children: colour })
                ]
              },
              colour
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-gold-medium/30 bg-off-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-serif font-semibold mb-3 text-bottle-green-dark", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-bottle-green-medium leading-relaxed", children: product.description })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-bottle-green-dark", children: "Quantity:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                onClick: decrementQuantity,
                disabled: !product.inStock,
                className: "border-gold-medium/30",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-12 text-center font-semibold text-bottle-green-dark", children: quantity }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                onClick: incrementQuantity,
                disabled: !product.inStock,
                className: "border-gold-medium/30",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleAddToCart,
              disabled: !product.inStock,
              className: "w-full bg-gold-medium hover:bg-gold-dark text-white customer-cta-btn",
              size: "lg",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleBuyNow,
              disabled: !product.inStock,
              variant: "outline",
              className: "w-full border-gold-medium text-white hover:bg-gold-medium/10 customer-cta-btn",
              size: "lg",
              children: "Buy Now"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => {
                const url = `https://wa.me/?text=${encodeURIComponent(`Check out this product from Aurelie Fine Jewellery: ${window.location.href}`)}`;
                window.open(url, "_blank");
              },
              variant: "outline",
              className: "w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]",
              size: "lg",
              "data-ocid": "product.whatsapp_share_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    className: "h-5 w-5 mr-2 shrink-0",
                    role: "img",
                    "aria-label": "WhatsApp",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 0C5.373 0 0 5.373 0 12c0 2.1.546 4.07 1.5 5.785L0 24l6.395-1.68A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.924 0-3.72-.503-5.272-1.385L2 22l1.417-4.608A9.954 9.954 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" })
                    ]
                  }
                ),
                "Share on WhatsApp"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] }) }) });
}
export {
  ProductDetailPage as default
};
