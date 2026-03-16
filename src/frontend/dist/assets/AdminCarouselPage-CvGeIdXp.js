import { u as useGetCarouselSlides, a4 as useUpdateCarouselSlide, a5 as useToggleCarouselSlide, a6 as useReorderCarouselSlides, r as reactExports, j as jsxRuntimeExports, S as Skeleton, B as Button, k as ue, T as ExternalBlob, c as useNavigate, m as useInternetIdentity, a as useActor, b as useQuery } from "./index-DGBrfQOZ.js";
import { a as optimizeImage } from "./mediaOptimization-Di4zYeQE.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BQ0hJXne.js";
import { I as Input } from "./input-ClQ96bi4.js";
import { L as Label } from "./label-BefYQ-pD.js";
import { S as Switch } from "./switch-C8keXTYA.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-9dzRlH33.js";
import { I as Image } from "./image-D10VW3SB.js";
import { S as Save } from "./save-BMfnDLaV.js";
import { S as Shield } from "./shield-L633nJn2.js";
import { A as ArrowLeft } from "./arrow-left-BLmmJxb_.js";
import "./index-DSz8p0AP.js";
function CarouselManagement() {
  const { data: slides, isLoading } = useGetCarouselSlides();
  const updateSlide = useUpdateCarouselSlide();
  const toggleSlide = useToggleCarouselSlide();
  const reorderSlides = useReorderCarouselSlides();
  const [editingSlides, setEditingSlides] = reactExports.useState({});
  const slideSlots = Array.from({ length: 5 }, (_, index) => {
    const existingSlide = slides == null ? void 0 : slides.find((s) => Number(s.order) === index);
    return existingSlide || null;
  });
  const handleImageUpload = async (index, file) => {
    setEditingSlides((prev) => {
      var _a, _b;
      return {
        ...prev,
        [index]: {
          url: ((_a = prev[index]) == null ? void 0 : _a.url) || ((_b = slideSlots[index]) == null ? void 0 : _b.urlRedirect) || "",
          image: null,
          uploadProgress: 0,
          isOptimizing: true
        }
      };
    });
    try {
      const optimized = await optimizeImage(file, 1200, 0.85);
      setEditingSlides((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          image: optimized.file,
          isOptimizing: false
        }
      }));
    } catch (error) {
      console.error("Image optimization failed:", error);
      ue.error("Failed to optimize image");
      setEditingSlides((prev) => {
        const newState = { ...prev };
        delete newState[index];
        return newState;
      });
    }
  };
  const handleUrlChange = (index, url) => {
    setEditingSlides((prev) => {
      var _a, _b, _c;
      return {
        ...prev,
        [index]: {
          url,
          image: ((_a = prev[index]) == null ? void 0 : _a.image) || null,
          uploadProgress: ((_b = prev[index]) == null ? void 0 : _b.uploadProgress) || 0,
          isOptimizing: ((_c = prev[index]) == null ? void 0 : _c.isOptimizing) || false
        }
      };
    });
  };
  const handleSaveSlide = async (index) => {
    const editing = editingSlides[index];
    const existingSlide = slideSlots[index];
    if (!editing && !existingSlide) {
      ue.error("No changes to save");
      return;
    }
    try {
      let imageBlob;
      if (editing == null ? void 0 : editing.image) {
        const arrayBuffer = await editing.image.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        imageBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress(
          (percentage) => {
            setEditingSlides((prev) => ({
              ...prev,
              [index]: { ...prev[index], uploadProgress: percentage }
            }));
          }
        );
      } else if (existingSlide) {
        imageBlob = existingSlide.visualContent;
      } else {
        ue.error("Please upload an image");
        return;
      }
      const url = (editing == null ? void 0 : editing.url) !== void 0 ? editing.url : (existingSlide == null ? void 0 : existingSlide.urlRedirect) || "";
      const updatedSlide = {
        visualContent: imageBlob,
        urlRedirect: url,
        enabled: (existingSlide == null ? void 0 : existingSlide.enabled) ?? true,
        order: BigInt(index)
      };
      await updateSlide.mutateAsync({ slideIndex: index, updatedSlide });
      setEditingSlides((prev) => {
        const newState = { ...prev };
        delete newState[index];
        return newState;
      });
      ue.success("Slide updated successfully");
    } catch (error) {
      console.error("Error saving slide:", error);
      ue.error(error.message || "Failed to save slide");
    }
  };
  const handleToggle = async (index, enabled) => {
    try {
      await toggleSlide.mutateAsync({ slideIndex: index, enabled });
      ue.success(enabled ? "Slide enabled" : "Slide disabled");
    } catch (error) {
      console.error("Error toggling slide:", error);
      ue.error(error.message || "Failed to toggle slide");
    }
  };
  const handleMoveUp = async (index) => {
    if (index === 0) return;
    const newOrder = slideSlots.map((_, i) => {
      if (i === index - 1) return index;
      if (i === index) return index - 1;
      return i;
    });
    try {
      await reorderSlides.mutateAsync(newOrder);
      ue.success("Slide moved up");
    } catch (error) {
      console.error("Error reordering slides:", error);
      ue.error(error.message || "Failed to reorder slides");
    }
  };
  const handleMoveDown = async (index) => {
    if (index === 4) return;
    const newOrder = slideSlots.map((_, i) => {
      if (i === index) return index + 1;
      if (i === index + 1) return index;
      return i;
    });
    try {
      await reorderSlides.mutateAsync(newOrder);
      ue.success("Slide moved down");
    } catch (error) {
      console.error("Error reordering slides:", error);
      ue.error(error.message || "Failed to reorder slides");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border admin-surface backdrop-blur mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-bottle-green-dark", children: "Homepage Carousel Management" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full" }, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border admin-surface backdrop-blur mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-bottle-green-dark", children: "Homepage Carousel Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-bottle-green-medium", children: "Manage up to 5 carousel slides. Images are automatically optimized. Auto-rotates every 2.5 seconds on the homepage." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-6", children: slideSlots.map((slide, index) => {
      const editing = editingSlides[index];
      const hasChanges = editing !== void 0;
      const slotKey = slide ? `slot-order-${String(slide.order)}` : `slot-empty-${index}`;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "border border-gold-medium/30 rounded-lg p-4 space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-bottle-green-dark", children: [
                "Slide ",
                index + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: () => handleMoveUp(index),
                    disabled: index === 0 || !slide,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: () => handleMoveDown(index),
                    disabled: index === 4 || !slide,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-label-text", children: "Image" }),
                slide && !(editing == null ? void 0 : editing.image) ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-video rounded-lg overflow-hidden border border-gold-medium/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: slide.visualContent.getDirectURL(),
                    alt: `Slide ${index + 1}`,
                    className: "w-full h-full object-cover"
                  }
                ) }) : (editing == null ? void 0 : editing.image) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video rounded-lg overflow-hidden border border-gold-medium/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: URL.createObjectURL(editing.image),
                      alt: `Preview ${index + 1}`,
                      className: "w-full h-full object-cover"
                    }
                  ),
                  editing.uploadProgress > 0 && editing.uploadProgress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white text-sm", children: [
                    "Uploading: ",
                    editing.uploadProgress,
                    "%"
                  ] }) })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video rounded-lg border-2 border-dashed border-gold-medium/30 flex items-center justify-center", children: (editing == null ? void 0 : editing.isOptimizing) ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gold-medium text-sm", children: "Optimizing..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-12 w-12 text-gold-medium/50" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "file",
                    accept: "image/*",
                    onChange: (e) => {
                      var _a;
                      const file = (_a = e.target.files) == null ? void 0 : _a[0];
                      if (file) handleImageUpload(index, file);
                    },
                    className: "border-gold-medium/30",
                    disabled: editing == null ? void 0 : editing.isOptimizing
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: `url-${index}`,
                      className: "admin-label-text",
                      children: "Click URL (Product Category/Page)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: `url-${index}`,
                      type: "url",
                      placeholder: "https://example.com/category",
                      value: (editing == null ? void 0 : editing.url) !== void 0 ? editing.url : (slide == null ? void 0 : slide.urlRedirect) || "",
                      onChange: (e) => handleUrlChange(index, e.target.value),
                      className: "border-gold-medium/30"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: `enabled-${index}`,
                      className: "admin-label-text",
                      children: "Enabled"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Switch,
                    {
                      id: `enabled-${index}`,
                      checked: (slide == null ? void 0 : slide.enabled) ?? false,
                      onCheckedChange: (checked) => handleToggle(index, checked),
                      disabled: !slide
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: () => handleSaveSlide(index),
                    disabled: updateSlide.isPending || !hasChanges && !slide || (editing == null ? void 0 : editing.isOptimizing),
                    className: "w-full gold-gradient text-secondary shadow-gold",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-2" }),
                      updateSlide.isPending ? "Saving..." : "Save Slide"
                    ]
                  }
                )
              ] })
            ] })
          ]
        },
        slotKey
      );
    }) })
  ] });
}
function AdminCarouselPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const { data: isAdmin, isLoading: adminLoading } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching
  });
  if (!identity || !adminLoading && !isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-16 h-16 text-destructive mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-serif text-foreground mb-2", children: "Access Denied" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "You do not have admin privileges." })
    ] }) });
  }
  if (adminLoading || actorFetching) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-gold/20 bg-card px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/admin" }),
          className: "flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Back to Dashboard" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-px bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-serif text-foreground", children: "Carousel Management" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselManagement, {}) })
  ] });
}
export {
  AdminCarouselPage as default
};
