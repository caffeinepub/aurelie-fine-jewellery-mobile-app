import { l as createLucideIcon, c as useNavigate, m as useInternetIdentity, a as useActor, b as useQuery, j as jsxRuntimeExports, g as ShoppingCart } from "./index-DGBrfQOZ.js";
import { S as Shield } from "./shield-L633nJn2.js";
import { P as Package } from "./package-c_hAFtMN.js";
import { M as MessageSquare } from "./message-square-C3E63Jrl.js";
import { I as Image } from "./image-D10VW3SB.js";
import { T as Tag } from "./tag-BftBUSzy.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m3 11 18-5v12L3 14v-3z", key: "n962bs" }],
  ["path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6", key: "1yl0tm" }]
];
const Megaphone = createLucideIcon("megaphone", __iconNode);
function AdminDashboardPage() {
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
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-16 h-16 text-gold mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-serif text-foreground mb-2", children: "Authentication Required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Please log in to access the admin panel." })
    ] }) });
  }
  if (adminLoading || actorFetching) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Verifying access..." })
    ] }) });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-16 h-16 text-destructive mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-serif text-foreground mb-2", children: "Access Denied" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "You do not have admin privileges." })
    ] }) });
  }
  const adminSections = [
    {
      label: "Products",
      description: "Manage product inventory, add, edit, or remove products",
      icon: Package,
      route: "/admin/products",
      color: "text-gold"
    },
    {
      label: "Orders",
      description: "View and manage customer orders, update order status",
      icon: ShoppingCart,
      route: "/admin/orders",
      color: "text-gold"
    },
    {
      label: "Inquiries",
      description: "View and respond to customer inquiries and messages",
      icon: MessageSquare,
      route: "/admin/inquiries",
      color: "text-gold"
    },
    {
      label: "Site Content",
      description: "Edit contact details, policies, social links, and about us",
      icon: FileText,
      route: "/admin/site-content",
      color: "text-gold"
    },
    {
      label: "Carousel",
      description: "Manage homepage carousel slides, images, and links",
      icon: Image,
      route: "/admin/carousel",
      color: "text-gold"
    },
    {
      label: "Banner",
      description: "Manage marquee banner messages shown across the site",
      icon: Megaphone,
      route: "/admin/banner",
      color: "text-gold"
    },
    {
      label: "Categories",
      description: "Edit category images, names, and navigation settings",
      icon: Tag,
      route: "/admin/categories",
      color: "text-gold"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-transparent py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-serif text-foreground", children: "Admin Dashboard" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "Select a section below to manage your store" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-0.5 bg-gold mx-auto mt-4" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: adminSections.map((section) => {
      const Icon = section.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: section.route }),
          className: "group flex flex-col items-start p-6 bg-card border border-gold/30 rounded-lg hover:border-gold hover:shadow-lg hover:shadow-gold/10 transition-all duration-200 text-left",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between w-full mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-gold/10 rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-6 h-6 ${section.color}` }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all duration-200" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-1", children: section.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: section.description })
          ]
        },
        section.route
      );
    }) })
  ] }) });
}
export {
  AdminDashboardPage as default
};
