import { a2 as useGetSiteContent, j as jsxRuntimeExports } from "./index-DGBrfQOZ.js";
import { C as CustomerPageStyleScope } from "./CustomerPageStyleScope-B_I3RJHf.js";
import { L as LoaderCircle } from "./loader-circle-CpRKOCiw.js";
function PrivacyPolicyPage() {
  const { data: siteContent, isLoading } = useGetSiteContent();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerPageStyleScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Loading..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerPageStyleScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-serif font-bold text-bottle-green-dark mb-8", children: "Privacy Policy" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-lg max-w-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap text-bottle-green-dark leading-relaxed", children: (siteContent == null ? void 0 : siteContent.privacyPolicy) || "Privacy policy content not available." }) })
  ] }) }) });
}
export {
  PrivacyPolicyPage as default
};
