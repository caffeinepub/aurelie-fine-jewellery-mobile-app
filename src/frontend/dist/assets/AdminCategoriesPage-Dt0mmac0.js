import { r as reactExports, j as jsxRuntimeExports, z as createContextScope, P as Primitive, F as cn, B as Button, T as ExternalBlob, k as ue, c as useNavigate, m as useInternetIdentity, a as useActor, b as useQuery } from "./index-BAQMItKk.js";
import { u as useGetAllCategoryHeaders, a as useSetCategoryHeader } from "./useCategoryHeaderNav-CwIAJWJO.js";
import { a as optimizeImage } from "./mediaOptimization-Di4zYeQE.js";
import { B as BOYS_CATEGORIES, P as PRODUCT_CATEGORIES } from "./productCategories-C8PMBVjD.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-8AfnzEi0.js";
import { I as Input } from "./input-DBNAPv1e.js";
import { L as Label } from "./label-DOtwcLdE.js";
import { L as LoaderCircle } from "./loader-circle-Cdp1lq9-.js";
import { S as Save } from "./save-B5LJ4YKv.js";
import { S as Shield } from "./shield-C3wjh2tk.js";
import { A as ArrowLeft } from "./arrow-left-C2IO3-vp.js";
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
function BoysHeaderCategoryNavManagement() {
  const { data: categoryHeaders } = useGetAllCategoryHeaders();
  const setCategoryHeader = useSetCategoryHeader();
  const headersMap = new Map(categoryHeaders || []);
  const [categoryStates, setCategoryStates] = reactExports.useState(() => {
    const initial = {};
    for (const cat of BOYS_CATEGORIES) {
      const existing = headersMap.get(cat.slug);
      initial[cat.slug] = {
        image: (existing == null ? void 0 : existing.image) || null,
        redirectUrl: (existing == null ? void 0 : existing.redirectUrl) || "",
        uploadProgress: 0
      };
    }
    return initial;
  });
  const [savingCategory, setSavingCategory] = reactExports.useState(null);
  const handleImageUpload = async (categorySlug, file) => {
    try {
      setCategoryStates((prev) => ({
        ...prev,
        [categorySlug]: { ...prev[categorySlug], uploadProgress: 0 }
      }));
      const optimized = await optimizeImage(file);
      const arrayBuffer = await optimized.file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress(
        (percentage) => {
          setCategoryStates((prev) => ({
            ...prev,
            [categorySlug]: {
              ...prev[categorySlug],
              uploadProgress: percentage
            }
          }));
        }
      );
      setCategoryStates((prev) => ({
        ...prev,
        [categorySlug]: {
          ...prev[categorySlug],
          image: blob,
          uploadProgress: 100
        }
      }));
      ue.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload error:", error);
      ue.error("Failed to upload image");
    }
  };
  const handleSave = async (categorySlug) => {
    const state = categoryStates[categorySlug];
    if (!state.image) {
      ue.error("Please upload an image first");
      return;
    }
    try {
      setSavingCategory(categorySlug);
      await setCategoryHeader.mutateAsync({
        categorySlug,
        header: {
          image: state.image,
          redirectUrl: state.redirectUrl.trim()
        }
      });
      ue.success("Boys category header saved successfully");
    } catch (error) {
      console.error("Save error:", error);
      ue.error("Failed to save category header");
    } finally {
      setSavingCategory(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border admin-surface", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-bottle-green-dark", children: "Boys Category Navigation" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-bottle-green-medium mb-6", children: "Manage circular category images and redirect URLs for the Boys section sub-categories" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: BOYS_CATEGORIES.map((category) => {
        var _a, _b;
        const state = categoryStates[category.slug];
        const existingHeader = headersMap.get(category.slug);
        const imageUrl = ((_a = state.image) == null ? void 0 : _a.getDirectURL()) || ((_b = existingHeader == null ? void 0 : existingHeader.image) == null ? void 0 : _b.getDirectURL());
        const isSaving = savingCategory === category.slug;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "border border-gold-medium/30 rounded-lg p-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-bottle-green-dark mb-4", children: category.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-bottle-green-dark mb-2 block", children: "Category Image" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                    imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full overflow-hidden border-2 border-gold-medium/30 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: imageUrl,
                        alt: category.title,
                        className: "w-full h-full object-cover"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          type: "file",
                          accept: "image/*",
                          onChange: (e) => {
                            var _a2;
                            const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
                            if (file) handleImageUpload(category.slug, file);
                          },
                          className: "border-gold-medium/30"
                        }
                      ),
                      state.uploadProgress > 0 && state.uploadProgress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Progress,
                        {
                          value: state.uploadProgress,
                          className: "mt-2"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: `url-boys-${category.slug}`,
                      className: "text-bottle-green-dark mb-2 block",
                      children: "Redirect URL (optional)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: `url-boys-${category.slug}`,
                      value: state.redirectUrl,
                      onChange: (e) => setCategoryStates((prev) => ({
                        ...prev,
                        [category.slug]: {
                          ...prev[category.slug],
                          redirectUrl: e.target.value
                        }
                      })),
                      placeholder: `/boys/${category.slug.replace("boys-", "")}`,
                      className: "border-gold-medium/30 text-bottle-green-dark"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => handleSave(category.slug),
                  disabled: isSaving || !state.image,
                  className: "bg-gold-medium hover:bg-gold-dark text-secondary",
                  size: "sm",
                  children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                    "Saving..."
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-2" }),
                    "Save"
                  ] })
                }
              ) })
            ]
          },
          category.slug
        );
      }) })
    ] })
  ] });
}
function HeaderCategoryNavManagement() {
  const { data: categoryHeaders } = useGetAllCategoryHeaders();
  const setCategoryHeader = useSetCategoryHeader();
  const headersMap = new Map(categoryHeaders || []);
  const [categoryStates, setCategoryStates] = reactExports.useState(() => {
    const initial = {};
    for (const cat of PRODUCT_CATEGORIES) {
      const existing = headersMap.get(cat.slug);
      initial[cat.slug] = {
        image: (existing == null ? void 0 : existing.image) || null,
        redirectUrl: (existing == null ? void 0 : existing.redirectUrl) || "",
        uploadProgress: 0
      };
    }
    return initial;
  });
  const [savingCategory, setSavingCategory] = reactExports.useState(null);
  const handleImageUpload = async (categorySlug, file) => {
    try {
      setCategoryStates((prev) => ({
        ...prev,
        [categorySlug]: { ...prev[categorySlug], uploadProgress: 0 }
      }));
      const optimized = await optimizeImage(file);
      const arrayBuffer = await optimized.file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress(
        (percentage) => {
          setCategoryStates((prev) => ({
            ...prev,
            [categorySlug]: {
              ...prev[categorySlug],
              uploadProgress: percentage
            }
          }));
        }
      );
      setCategoryStates((prev) => ({
        ...prev,
        [categorySlug]: {
          ...prev[categorySlug],
          image: blob,
          uploadProgress: 100
        }
      }));
      ue.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload error:", error);
      ue.error("Failed to upload image");
    }
  };
  const handleSave = async (categorySlug) => {
    const state = categoryStates[categorySlug];
    if (!state.image) {
      ue.error("Please upload an image first");
      return;
    }
    try {
      setSavingCategory(categorySlug);
      await setCategoryHeader.mutateAsync({
        categorySlug,
        header: {
          image: state.image,
          redirectUrl: state.redirectUrl.trim()
        }
      });
      ue.success("Category header saved successfully");
    } catch (error) {
      console.error("Save error:", error);
      ue.error("Failed to save category header");
    } finally {
      setSavingCategory(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border admin-surface", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-bottle-green-dark", children: "Header Category Navigation" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-bottle-green-medium mb-6", children: "Manage circular category images and redirect URLs for the header navigation row" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: PRODUCT_CATEGORIES.map((category) => {
        var _a;
        const state = categoryStates[category.slug];
        const imageUrl = (_a = state.image) == null ? void 0 : _a.getDirectURL();
        const isSaving = savingCategory === category.slug;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "border border-gold-medium/30 rounded-lg p-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-bottle-green-dark mb-4", children: category.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-bottle-green-dark mb-2 block", children: "Category Image" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                    imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full overflow-hidden border-2 border-gold-medium/30 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: imageUrl,
                        alt: category.title,
                        className: "w-full h-full object-cover"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          type: "file",
                          accept: "image/*",
                          onChange: (e) => {
                            var _a2;
                            const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
                            if (file) handleImageUpload(category.slug, file);
                          },
                          className: "border-gold-medium/30"
                        }
                      ),
                      state.uploadProgress > 0 && state.uploadProgress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Progress,
                        {
                          value: state.uploadProgress,
                          className: "mt-2"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: `url-${category.slug}`,
                      className: "text-bottle-green-dark mb-2 block",
                      children: "Redirect URL (optional)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: `url-${category.slug}`,
                      type: "text",
                      placeholder: `/category/${category.slug}`,
                      value: state.redirectUrl,
                      onChange: (e) => setCategoryStates((prev) => ({
                        ...prev,
                        [category.slug]: {
                          ...prev[category.slug],
                          redirectUrl: e.target.value
                        }
                      })),
                      className: "border-gold-medium/30"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-bottle-green-medium mt-1", children: "Leave empty to use default category page" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => handleSave(category.slug),
                  disabled: !state.image || isSaving,
                  className: "bg-gold-medium hover:bg-gold-dark text-navy-dark",
                  children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                    "Saving..."
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-2" }),
                    "Save"
                  ] })
                }
              ) })
            ]
          },
          category.slug
        );
      }) })
    ] })
  ] });
}
function AdminCategoriesPage() {
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-serif text-foreground", children: "Category Management" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6 space-y-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground mb-4 pb-2 border-b border-gold/20", children: "Girls Category Navigation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeaderCategoryNavManagement, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground mb-4 pb-2 border-b border-gold/20", children: "Boys Category Navigation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BoysHeaderCategoryNavManagement, {})
      ] })
    ] })
  ] });
}
export {
  AdminCategoriesPage as default
};
