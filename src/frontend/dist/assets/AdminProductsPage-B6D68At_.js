import { l as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as useComposedRefs, z as createContextScope, D as composeEventHandlers, M as createSlottable, F as cn, N as buttonVariants, O as useAddProduct, Q as useUpdateProduct, B as Button, X, k as ue, T as ExternalBlob, d as useGetProducts, V as useDeleteProduct, c as useNavigate, m as useInternetIdentity, a as useActor, b as useQuery } from "./index-DkYKhr--.js";
import { c as createDialogScope, R as Root, W as WarningProvider, C as Content, T as Title, D as Description, a as Close, P as Portal, O as Overlay, b as Trigger } from "./index-BBHhZke1.js";
import { B as Badge } from "./badge-jbImzOok.js";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from "./card-CC26QeCo.js";
import { o as optimizeVideo, a as optimizeImage } from "./mediaOptimization-Di4zYeQE.js";
import { B as BOYS_CATEGORIES, G as GIRLS_CATEGORIES } from "./productCategories-C8PMBVjD.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-DfPFwKt9.js";
import { I as Input } from "./input-HY9wQfXD.js";
import { L as Label } from "./label-DUZhBnb3.js";
import { S as ScrollArea } from "./scroll-area-C8W74Ff8.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BF1OWe6B.js";
import { S as Switch } from "./switch-BC36oS-Y.js";
import { T as Textarea } from "./textarea-DtjD6z-3.js";
import { I as Image } from "./image-BRFxV4xo.js";
import { P as Package } from "./package-D7hSC7yC.js";
import { P as Plus } from "./plus-8N7TeRCC.js";
import { T as Trash2 } from "./trash-2-CO03pDyG.js";
import { S as Shield } from "./shield-CEGWGgO8.js";
import { A as ArrowLeft } from "./arrow-left-CHVqEs04.js";
import "./index-DfDjRE5L.js";
import "./chevron-up-g8Zs0cBf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = createLucideIcon("square-pen", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
const Video = createLucideIcon("video", __iconNode);
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
function ProductFormModal({
  open,
  onClose,
  product
}) {
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const [name, setName] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [price, setPrice] = reactExports.useState("");
  const [inStock, setInStock] = reactExports.useState(true);
  const [category, setCategory] = reactExports.useState("");
  const [gender, setGender] = reactExports.useState("girls");
  const [videoFile, setVideoFile] = reactExports.useState(null);
  const [videoPreview, setVideoPreview] = reactExports.useState("");
  const [imageFiles, setImageFiles] = reactExports.useState([]);
  const [imagePreviews, setImagePreviews] = reactExports.useState([]);
  const [existingVideo, setExistingVideo] = reactExports.useState(null);
  const [existingImages, setExistingImages] = reactExports.useState([]);
  const [isOptimizing, setIsOptimizing] = reactExports.useState(false);
  const availableCategories = gender === "boys" ? BOYS_CATEGORIES : GIRLS_CATEGORIES;
  reactExports.useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice((Number(product.priceInCents) / 100).toFixed(0));
      setInStock(product.inStock);
      setCategory(product.category || "");
      const productGender = product.gender.__kind__ ?? product.gender;
      setGender(productGender === "boys" ? "boys" : "girls");
      setExistingVideo(product.media.video || null);
      setExistingImages(product.media.images);
      if (product.media.video) {
        setVideoPreview(product.media.video.getDirectURL());
      }
      setImagePreviews(product.media.images.map((img) => img.getDirectURL()));
      setVideoFile(null);
      setImageFiles([]);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setInStock(true);
      setCategory("");
      setGender("girls");
      setVideoFile(null);
      setVideoPreview("");
      setImageFiles([]);
      setImagePreviews([]);
      setExistingVideo(null);
      setExistingImages([]);
    }
  }, [product, open]);
  const handleGenderChange = (newGender) => {
    setGender(newGender);
    setCategory("");
  };
  const handleVideoChange = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) {
      setIsOptimizing(true);
      try {
        const optimized = await optimizeVideo(file);
        setVideoFile(optimized.file);
        setVideoPreview(optimized.previewUrl);
        setExistingVideo(null);
      } catch (error) {
        console.error("Video optimization failed:", error);
        ue.error("Failed to process video");
      } finally {
        setIsOptimizing(false);
      }
    }
  };
  const handleRemoveVideo = () => {
    if (videoPreview == null ? void 0 : videoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoFile(null);
    setVideoPreview("");
    setExistingVideo(null);
  };
  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files || []);
    const totalImages2 = imageFiles.length + existingImages.length + files.length;
    if (totalImages2 > 5) {
      ue.error("Maximum 5 images allowed per product");
      return;
    }
    const filesToOptimize = files.slice(
      0,
      5 - existingImages.length - imageFiles.length
    );
    setIsOptimizing(true);
    try {
      const optimizedImages = await Promise.all(
        filesToOptimize.map((file) => optimizeImage(file, 1200, 0.85))
      );
      const newImageFiles = [
        ...imageFiles,
        ...optimizedImages.map((opt) => opt.file)
      ];
      const newPreviews = [
        ...imagePreviews,
        ...optimizedImages.map((opt) => opt.previewUrl)
      ];
      setImageFiles(newImageFiles);
      setImagePreviews(newPreviews);
    } catch (error) {
      console.error("Image optimization failed:", error);
      ue.error("Failed to process some images");
    } finally {
      setIsOptimizing(false);
    }
  };
  const handleRemoveImage = (index) => {
    const totalExisting = existingImages.length;
    if (index < totalExisting) {
      setExistingImages(existingImages.filter((_, i) => i !== index));
      setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    } else {
      const newIndex = index - totalExisting;
      const previewToRevoke = imagePreviews[index];
      if (previewToRevoke == null ? void 0 : previewToRevoke.startsWith("blob:")) {
        URL.revokeObjectURL(previewToRevoke);
      }
      setImageFiles(imageFiles.filter((_, i) => i !== newIndex));
      setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !price) {
      ue.error("Please fill in all fields");
      return;
    }
    const totalImages2 = existingImages.length + imageFiles.length;
    if (totalImages2 === 0) {
      ue.error("Please add at least one image");
      return;
    }
    try {
      const priceInCents = Math.round(Number.parseFloat(price) * 100);
      let videoBlob = void 0;
      if (videoFile) {
        const arrayBuffer = await videoFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        videoBlob = ExternalBlob.fromBytes(uint8Array);
      } else if (existingVideo) {
        videoBlob = existingVideo;
      }
      const imageBlobs = [...existingImages];
      for (const file of imageFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        imageBlobs.push(ExternalBlob.fromBytes(uint8Array));
      }
      const genderValue = gender === "boys" ? { __kind__: "boys", boys: null } : { __kind__: "girls", girls: null };
      if (product) {
        const updates = {
          name: name.trim(),
          description: description.trim(),
          priceInCents: BigInt(priceInCents),
          inStock,
          category: category || "uncategorized",
          media: {
            video: videoBlob,
            images: imageBlobs
          },
          gender: genderValue
        };
        await updateProduct.mutateAsync({ productId: product.id, updates });
        ue.success("Product updated successfully");
      } else {
        const productData = {
          id: `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: name.trim(),
          description: description.trim(),
          priceInCents: BigInt(priceInCents),
          inStock,
          category: category || "uncategorized",
          media: {
            video: videoBlob,
            images: imageBlobs
          },
          gender: genderValue
        };
        await addProduct.mutateAsync(productData);
        ue.success("Product added successfully");
      }
      onClose();
    } catch (error) {
      console.error("Failed to save product:", error);
      ue.error(error.message || "Failed to save product");
    }
  };
  const totalImages = existingImages.length + imageFiles.length;
  const canAddMoreImages = totalImages < 5;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-2xl max-h-[90vh] overflow-hidden gold-border admin-surface backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-bottle-green-dark font-serif text-2xl", children: product ? "Edit Product" : "Add New Product" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-bottle-green-medium", children: product ? "Update product details and media" : "Create a new jewellery product with up to 5 images and 1 video" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "max-h-[calc(90vh-120px)] pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "admin-label-text", children: "Product Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "name",
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "e.g., Diamond Ring",
            className: "border-gold-medium/30 text-bottle-green-dark"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", className: "admin-label-text", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "description",
            value: description,
            onChange: (e) => setDescription(e.target.value),
            placeholder: "Describe the product...",
            rows: 4,
            className: "border-gold-medium/30 text-bottle-green-dark"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "gender", className: "admin-label-text", children: "Section" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: gender,
            onValueChange: (v) => handleGenderChange(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "border-gold-medium/30 text-bottle-green-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select section" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "girls", children: "Girls" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "boys", children: "Boys" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "category", className: "admin-label-text", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: setCategory, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "border-gold-medium/30 text-bottle-green-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a category" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: availableCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat.slug, children: cat.title }, cat.slug)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "price", className: "admin-label-text", children: "Price (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "price",
              type: "number",
              value: price,
              onChange: (e) => setPrice(e.target.value),
              placeholder: "e.g., 5000",
              min: "0",
              step: "1",
              className: "border-gold-medium/30 text-bottle-green-dark"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-label-text", children: "In Stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: inStock, onCheckedChange: setInStock }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-bottle-green-medium", children: inStock ? "Available" : "Out of Stock" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "admin-label-text", children: "Product Video (optional)" }),
        videoPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              src: videoPreview,
              controls: true,
              className: "w-full rounded-lg border border-gold-medium/30 max-h-48"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: handleRemoveVideo,
              className: "absolute top-2 right-2 bg-background/80 hover:bg-background",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-2 border-dashed border-gold-medium/30 rounded-lg p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-8 w-8 mx-auto mb-2 text-gold-medium/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "file",
              accept: "video/*",
              onChange: handleVideoChange,
              className: "border-gold-medium/30",
              disabled: isOptimizing
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-bottle-green-medium mt-1", children: "MP4, MOV up to 50MB" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "admin-label-text", children: [
          "Product Images (",
          totalImages,
          "/5)"
        ] }),
        imagePreviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 mb-2", children: imagePreviews.map((preview, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: preview,
              alt: "Product preview",
              className: "w-full h-full object-cover rounded-lg border border-gold-medium/30"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: () => handleRemoveImage(index),
              className: "absolute top-1 right-1 h-6 w-6 bg-background/80 hover:bg-background",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
            }
          ),
          index === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-1 left-1 text-xs bg-gold-medium text-secondary px-1 rounded", children: "Main" })
        ] }, preview)) }),
        canAddMoreImages && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-2 border-dashed border-gold-medium/30 rounded-lg p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-8 w-8 mx-auto mb-2 text-gold-medium/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "file",
              accept: "image/*",
              multiple: true,
              onChange: handleImagesChange,
              className: "border-gold-medium/30",
              disabled: isOptimizing
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-bottle-green-medium mt-1", children: isOptimizing ? "Optimizing images..." : `Add up to ${5 - totalImages} more image(s)` })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: onClose,
            className: "flex-1 border-gold-medium/30",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: addProduct.isPending || updateProduct.isPending || isOptimizing,
            className: "flex-1 bg-gold-medium hover:bg-gold-dark text-secondary",
            children: addProduct.isPending || updateProduct.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-2 animate-spin" }),
              "Saving..."
            ] }) : product ? "Update Product" : "Add Product"
          }
        )
      ] })
    ] }) })
  ] }) });
}
function ProductManagement() {
  const { data: products, isLoading } = useGetProducts();
  const deleteProduct = useDeleteProduct();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editingProduct, setEditingProduct] = reactExports.useState(null);
  const [deletingProduct, setDeletingProduct] = reactExports.useState(null);
  const formatINR = (priceInCents) => {
    const amount = Number(priceInCents) / 100;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };
  const handleDelete = async () => {
    if (!deletingProduct) return;
    try {
      await deleteProduct.mutateAsync(deletingProduct.id);
      ue.success("Product deleted successfully");
      setDeletingProduct(null);
    } catch (error) {
      console.error("Failed to delete product:", error);
      ue.error(error.message || "Failed to delete product");
    }
  };
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border admin-surface backdrop-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-bottle-green-dark flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5" }),
            "Product Inventory Management"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-bottle-green-medium mt-1", children: "Add, edit, and manage your jewellery products" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowForm(true),
            className: "gap-2 gold-gradient text-secondary shadow-gold",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              "Add Product"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-bottle-green-medium", children: "Loading products..." }) }) : products && products.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: products.map((product) => {
        const firstImage = product.media.images[0];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-4 p-4 border border-gold-medium/30 rounded-lg hover:bg-emerald-light/10 transition-colors",
            children: [
              firstImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: firstImage.getDirectURL(),
                  alt: product.name,
                  className: "h-20 w-20 object-cover rounded border-2 border-gold-medium/30"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 flex items-center justify-center bg-muted rounded border-2 border-gold-medium/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-8 w-8 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-bottle-green-dark", children: product.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: product.inStock ? "default" : "secondary",
                      className: product.inStock ? "bg-gold-medium text-secondary" : "",
                      children: product.inStock ? "In Stock" : "Out of Stock"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-bottle-green-medium line-clamp-1", children: product.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-bottle-green-dark mt-1", children: formatINR(product.priceInCents) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => handleEdit(product),
                    className: "gap-2 border-gold-medium hover:bg-gold-medium/20 text-bottle-green-dark",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" }),
                      "Edit"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "destructive",
                    size: "sm",
                    onClick: () => setDeletingProduct(product),
                    className: "gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
                      "Delete"
                    ]
                  }
                )
              ] })
            ]
          },
          product.id
        );
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-16 w-16 mx-auto mb-4 text-gold-medium opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-bottle-green-medium mb-4", children: "No products yet. Add your first product to get started." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowForm(true),
            className: "gap-2 gold-gradient text-secondary shadow-gold",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              "Add Your First Product"
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProductFormModal,
      {
        open: showForm,
        onClose: handleCloseForm,
        product: editingProduct
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deletingProduct,
        onOpenChange: () => setDeletingProduct(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "gold-border admin-surface backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "text-bottle-green-dark", children: "Delete Product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { className: "text-bottle-green-medium", children: [
              'Are you sure you want to delete "',
              deletingProduct == null ? void 0 : deletingProduct.name,
              '"? This action cannot be undone.'
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "border-gold-medium text-bottle-green-dark", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                disabled: deleteProduct.isPending,
                className: "bg-destructive text-destructive-foreground",
                children: deleteProduct.isPending ? "Deleting..." : "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function AdminProductsPage() {
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-serif text-foreground", children: "Product Management" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductManagement, {}) })
  ] });
}
export {
  AdminProductsPage as default
};
