import { a2 as useGetSiteContent, a3 as useUpdateSiteContent, r as reactExports, j as jsxRuntimeExports, B as Button, k as ue, c as useNavigate, m as useInternetIdentity, a as useActor, b as useQuery } from "./index-B1_sVdMb.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle, d as CardDescription } from "./card-sJlFJuS-.js";
import { I as Input } from "./input--sJB7DWu.js";
import { L as Label } from "./label-C09FS6ob.js";
import { T as Textarea } from "./textarea-DmQsRMIB.js";
import { L as LoaderCircle } from "./loader-circle-B6eg7Twa.js";
import { S as Save } from "./save-Dd2w26XR.js";
import { S as Shield } from "./shield-JPkjdBGx.js";
import { A as ArrowLeft } from "./arrow-left-D7dWfhPX.js";
function SiteContentManagement() {
  const { data: siteContent, isLoading } = useGetSiteContent();
  const updateSiteContent = useUpdateSiteContent();
  const [formData, setFormData] = reactExports.useState({
    contactEmail: "",
    phoneNumber: "",
    address: "",
    officialName: "",
    aboutUs: "",
    generalInfo: "",
    termsOfService: "",
    privacyPolicy: "",
    shippingPolicy: "",
    billingPolicy: "",
    generalDisclaimer: "",
    footerContent: "",
    facebookUrl: "",
    instagramUrl: "",
    xUrl: ""
  });
  reactExports.useEffect(() => {
    if (siteContent) {
      setFormData(siteContent);
    }
  }, [siteContent]);
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSiteContent.mutateAsync(formData);
      ue.success("Site content updated successfully!");
    } catch (error) {
      console.error("Failed to update site content:", error);
      ue.error(error.message || "Failed to update site content");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "gold-border admin-surface backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-bottle-green-dark", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Loading site content..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border admin-surface backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-bottle-green-dark", children: "Edit Site Content" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-bottle-green-medium", children: "Manage contact details, footer information, social media links, and static text content" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-bottle-green-dark border-b border-gold-medium/30 pb-2", children: "Contact Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contactEmail", className: "admin-label-text", children: "Contact Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "contactEmail",
                type: "email",
                value: formData.contactEmail,
                onChange: (e) => handleChange("contactEmail", e.target.value),
                className: "border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phoneNumber", className: "admin-label-text", children: "Phone Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "phoneNumber",
                value: formData.phoneNumber,
                onChange: (e) => handleChange("phoneNumber", e.target.value),
                className: "border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address", className: "admin-label-text", children: "Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "address",
              value: formData.address,
              onChange: (e) => handleChange("address", e.target.value),
              className: "border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "officialName", className: "admin-label-text", children: "Official Business Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "officialName",
              value: formData.officialName,
              onChange: (e) => handleChange("officialName", e.target.value),
              className: "border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-bottle-green-dark border-b border-gold-medium/30 pb-2", children: "Social Media Links" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "instagramUrl", className: "admin-label-text", children: "Instagram URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "instagramUrl",
              type: "url",
              value: formData.instagramUrl,
              onChange: (e) => handleChange("instagramUrl", e.target.value),
              placeholder: "https://instagram.com/yourprofile",
              className: "border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "facebookUrl", className: "admin-label-text", children: "Facebook URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "facebookUrl",
              type: "url",
              value: formData.facebookUrl,
              onChange: (e) => handleChange("facebookUrl", e.target.value),
              placeholder: "https://facebook.com/yourpage",
              className: "border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "xUrl", className: "admin-label-text", children: "X (Twitter) URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "xUrl",
              type: "url",
              value: formData.xUrl,
              onChange: (e) => handleChange("xUrl", e.target.value),
              placeholder: "https://x.com/yourprofile",
              className: "border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-bottle-green-dark border-b border-gold-medium/30 pb-2", children: "About & General Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "aboutUs", className: "admin-label-text", children: "About Us" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "aboutUs",
              value: formData.aboutUs,
              onChange: (e) => handleChange("aboutUs", e.target.value),
              rows: 3,
              className: "border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "generalInfo", className: "admin-label-text", children: "General Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "generalInfo",
              value: formData.generalInfo,
              onChange: (e) => handleChange("generalInfo", e.target.value),
              rows: 4,
              className: "border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-bottle-green-dark border-b border-gold-medium/30 pb-2", children: "Policies & Legal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "termsOfService", className: "admin-label-text", children: "Terms of Service" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "termsOfService",
              value: formData.termsOfService,
              onChange: (e) => handleChange("termsOfService", e.target.value),
              rows: 4,
              className: "border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "privacyPolicy", className: "admin-label-text", children: "Privacy Policy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "privacyPolicy",
              value: formData.privacyPolicy,
              onChange: (e) => handleChange("privacyPolicy", e.target.value),
              rows: 4,
              className: "border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "shippingPolicy", className: "admin-label-text", children: "Shipping Policy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "shippingPolicy",
              value: formData.shippingPolicy,
              onChange: (e) => handleChange("shippingPolicy", e.target.value),
              rows: 3,
              className: "border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "billingPolicy", className: "admin-label-text", children: "Billing Policy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "billingPolicy",
              value: formData.billingPolicy,
              onChange: (e) => handleChange("billingPolicy", e.target.value),
              rows: 3,
              className: "border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "generalDisclaimer", className: "admin-label-text", children: "General Disclaimer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "generalDisclaimer",
              value: formData.generalDisclaimer,
              onChange: (e) => handleChange("generalDisclaimer", e.target.value),
              rows: 3,
              className: "border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-bottle-green-dark border-b border-gold-medium/30 pb-2", children: "Footer Content" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "footerContent", className: "admin-label-text", children: "Footer Text" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "footerContent",
              value: formData.footerContent,
              onChange: (e) => handleChange("footerContent", e.target.value),
              rows: 2,
              placeholder: "e.g., Follow us on social media | LinkedIn | Facebook",
              className: "border-gold-medium/30 focus:border-gold-medium text-bottle-green-dark"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          className: "w-full gap-2 gold-gradient text-secondary shadow-gold",
          disabled: updateSiteContent.isPending,
          children: updateSiteContent.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            "Saving..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
            "Save Changes"
          ] })
        }
      )
    ] }) })
  ] });
}
function AdminSiteContentPage() {
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-serif text-foreground", children: "Site Content Management" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SiteContentManagement, {}) })
  ] });
}
export {
  AdminSiteContentPage as default
};
