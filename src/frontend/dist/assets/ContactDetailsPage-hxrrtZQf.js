import { a as useActor, c as useNavigate, b as useQuery, j as jsxRuntimeExports, q as SiInstagram, s as SiFacebook, t as SiX } from "./index-DkYKhr--.js";
import { C as CustomerPageStyleScope } from "./CustomerPageStyleScope-CkHkC8Gv.js";
import { A as ArrowLeft } from "./arrow-left-CHVqEs04.js";
import { P as Phone } from "./phone-Ct0vjwLO.js";
import { M as Mail } from "./mail-C3CCbMrY.js";
import { M as MapPin } from "./map-pin-D4g4IjT-.js";
import { C as Clock } from "./clock-CbKlHbX5.js";
function ContactDetailsPage() {
  const { actor, isFetching: actorFetching } = useActor();
  const navigate = useNavigate();
  const { data: contactInfo, isLoading } = useQuery({
    queryKey: ["contactInfo"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getContactInfo();
    },
    enabled: !!actor && !actorFetching
  });
  const { data: siteContent } = useQuery({
    queryKey: ["siteContent"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSiteContent();
    },
    enabled: !!actor && !actorFetching
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerPageStyleScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#f5f5f0] py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/" }),
        className: "flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Back to Home" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-serif text-foreground mb-3", children: "Contact Us" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-0.5 bg-gold mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "We'd love to hear from you. Reach out through any of the channels below." })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-gold/30 rounded-lg p-6 flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-gold/10 rounded-full shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-gold" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: (contactInfo == null ? void 0 : contactInfo.phoneNumber) || "+91 98765 43210" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-gold/30 rounded-lg p-6 flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-gold/10 rounded-full shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5 text-gold" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `mailto:${(contactInfo == null ? void 0 : contactInfo.contactEmail) || "contact@aurelie.com"}`,
              className: "text-gold hover:underline",
              children: (contactInfo == null ? void 0 : contactInfo.contactEmail) || "contact@aurelie.com"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-gold/30 rounded-lg p-6 flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-gold/10 rounded-full shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-gold" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1", children: "Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: (contactInfo == null ? void 0 : contactInfo.address) || "Mumbai, Maharashtra, India" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-gold/30 rounded-lg p-6 flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-gold/10 rounded-full shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-gold" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1", children: "Business Hours" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Monday – Saturday: 10:00 AM – 7:00 PM" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Sunday: 11:00 AM – 5:00 PM" })
        ] })
      ] }),
      siteContent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-gold/30 rounded-lg p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-4", children: "Follow Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          siteContent.instagramUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: siteContent.instagramUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "p-3 bg-gold/10 rounded-full hover:bg-gold/20 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SiInstagram, { className: "w-5 h-5 text-gold" })
            }
          ),
          siteContent.facebookUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: siteContent.facebookUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "p-3 bg-gold/10 rounded-full hover:bg-gold/20 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SiFacebook, { className: "w-5 h-5 text-gold" })
            }
          ),
          siteContent.xUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: siteContent.xUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "p-3 bg-gold/10 rounded-full hover:bg-gold/20 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SiX, { className: "w-5 h-5 text-gold" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gold/5 border border-gold/40 rounded-lg p-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground mb-3", children: "Have a specific question or inquiry?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/contact" }),
            className: "px-6 py-2 bg-gold text-white rounded-full text-sm font-medium hover:bg-gold/90 transition-colors",
            children: "Send Us a Message"
          }
        )
      ] })
    ] })
  ] }) }) });
}
export {
  ContactDetailsPage as default
};
