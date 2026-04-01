import { i as createLucideIcon, a as useNavigate, W as useIsCallerAdmin, ae as useGetAllCategories, j as jsxRuntimeExports, S as Skeleton, B as Button, af as useUpdateCategoryVideo, r as reactExports, h as ue, T as ExternalBlob } from "./index-aj0lqbRn.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-scimD28y.js";
import { S as Shield } from "./shield-C38o6CG8.js";
import { A as ArrowLeft } from "./arrow-left-YTOjLTCh.js";
import { T as Trash2 } from "./trash-2-Ct_JsJ_U.js";
import { U as Upload } from "./upload-D4LnVbN8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 3v18", key: "bbkbws" }],
  ["path", { d: "M3 7.5h4", key: "zfgn84" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 16.5h4", key: "1230mu" }],
  ["path", { d: "M17 3v18", key: "in4fa5" }],
  ["path", { d: "M17 7.5h4", key: "myr1c1" }],
  ["path", { d: "M17 16.5h4", key: "go4c1d" }]
];
const Film = createLucideIcon("film", __iconNode);
const FOR_HER_CATEGORIES = [
  { slug: "necklace", title: "Necklace" },
  { slug: "earrings", title: "Earrings" },
  { slug: "rings", title: "Rings" },
  { slug: "anklets", title: "Anklets" },
  { slug: "lab-diamonds-jewellery", title: "Lab Diamonds" },
  { slug: "bridal-jewellery", title: "Bridal Jewellery" }
];
const FOR_HIM_CATEGORIES = [
  { slug: "boys-chains", title: "Chains" },
  { slug: "boys-bracelet", title: "Bracelet" },
  { slug: "boys-rings", title: "Rings" },
  { slug: "boys-lab-diamonds", title: "Lab Diamonds" }
];
function CategoryVideoCard({ config, videoUrl }) {
  const updateVideo = useUpdateCategoryVideo();
  const videoInputRef = reactExports.useRef(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const handleUpload = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      ue.error("Please select a valid video file");
      return;
    }
    setIsUploading(true);
    setUploadProgress(0);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
        (pct) => setUploadProgress(pct)
      );
      await updateVideo.mutateAsync({ name: config.slug, video: blob });
      ue.success(`Video uploaded for ${config.title}`);
    } catch (error) {
      console.error("Failed to upload video:", error);
      ue.error(error.message || "Failed to upload video");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (videoInputRef.current) videoInputRef.current.value = "";
    }
  };
  const handleRemove = async () => {
    try {
      await updateVideo.mutateAsync({ name: config.slug, video: null });
      ue.success(`Video removed for ${config.title}`);
    } catch (error) {
      console.error("Failed to remove video:", error);
      ue.error(error.message || "Failed to remove video");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "border border-[#B5860D]/30 bg-[#F7E7CE]/60 backdrop-blur-sm",
      "data-ocid": "page_videos.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-serif text-[#033500] flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4 text-[#B5860D]" }),
          config.title
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          videoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-video rounded-lg overflow-hidden border border-[#B5860D]/30 bg-black/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "video",
              {
                src: videoUrl,
                controls: true,
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: handleRemove,
                disabled: updateVideo.isPending,
                className: "border-red-400/50 text-red-600 hover:bg-red-50 hover:text-red-700 w-full",
                "data-ocid": "page_videos.delete_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-2" }),
                  updateVideo.isPending ? "Removing..." : "Remove Video"
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-video rounded-lg border-2 border-dashed border-[#B5860D]/30 flex items-center justify-center bg-[#B5860D]/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-8 h-8 text-[#B5860D]/40 mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#033500]/60", children: "No video uploaded" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: videoInputRef,
              type: "file",
              accept: "video/*",
              onChange: handleUpload,
              className: "hidden",
              id: `video-upload-${config.slug}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => {
                var _a;
                return (_a = videoInputRef.current) == null ? void 0 : _a.click();
              },
              disabled: isUploading,
              className: "border-[#B5860D]/40 text-[#033500] hover:border-[#B5860D] hover:bg-[#B5860D]/10 w-full",
              "data-ocid": "page_videos.upload_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-2" }),
                isUploading ? `Uploading… ${uploadProgress}%` : videoUrl ? "Replace Video" : "Upload Video"
              ]
            }
          ),
          isUploading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-1.5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-[#B5860D] transition-all duration-300",
              style: { width: `${uploadProgress}%` }
            }
          ) })
        ] })
      ]
    }
  );
}
function PageVideosAdminPage() {
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: allCategories, isLoading: categoriesLoading } = useGetAllCategories();
  const videoMap = /* @__PURE__ */ new Map();
  if (allCategories) {
    for (const cat of allCategories) {
      if (cat.video) {
        videoMap.set(cat.name, cat.video.getDirectURL());
      }
    }
  }
  if (adminLoading || categoriesLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container px-4 py-8 bg-transparent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-48 mb-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-lg" }, i)) })
    ] });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-16 h-16 text-[#B5860D] mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-serif text-[#033500] mb-2", children: "Access Denied" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#033500]/70", children: "You do not have admin privileges." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-transparent py-8 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => navigate({ to: "/admin" }),
        className: "mb-6 text-[#033500] hover:text-[#B5860D]",
        "data-ocid": "page_videos.back_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
          "Back to Admin"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-7 h-7 text-[#B5860D]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl text-[#033500]", children: "Page Videos" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#033500]/70 text-sm", children: "Upload background videos for For Him and For Her category pages. Videos auto-play muted and looped behind the category circles." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-0.5 bg-[#B5860D] mt-4" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", "data-ocid": "page_videos.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-serif text-xl text-[#033500] mb-1 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#B5860D]", children: "✦" }),
        " For Her"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#033500]/60 mb-5", children: "Videos for each sub-category under the For Her section" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: FOR_HER_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        CategoryVideoCard,
        {
          config: cat,
          videoUrl: videoMap.get(cat.slug)
        },
        cat.slug
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "page_videos.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-serif text-xl text-[#033500] mb-1 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#B5860D]", children: "✦" }),
        " For Him"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#033500]/60 mb-5", children: "Videos for each sub-category under the For Him section" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: FOR_HIM_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        CategoryVideoCard,
        {
          config: cat,
          videoUrl: videoMap.get(cat.slug)
        },
        cat.slug
      )) })
    ] })
  ] }) });
}
export {
  PageVideosAdminPage as default
};
