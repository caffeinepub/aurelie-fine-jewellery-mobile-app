import { c as useNavigate, j as jsxRuntimeExports, B as Button } from "./index-BAQMItKk.js";
import { C as CustomerPageStyleScope } from "./CustomerPageStyleScope-VBx4IwUL.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-8AfnzEi0.js";
import { C as CircleCheck } from "./circle-check-NdFRTq3l.js";
import { P as Package } from "./package-B6x4s2pt.js";
import { H as House } from "./house-DNxGqTMT.js";
function PaymentSuccessPage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerPageStyleScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "container px-4 py-16 max-w-3xl mx-auto",
      "data-checkout-scope": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border offwhite-surface backdrop-blur-sm shadow-elegant", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center pt-12 pb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-12 w-12 text-emerald-600" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-4xl font-serif gold-text mb-4", children: "Payment Successful!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Thank you for your purchase. Your order has been confirmed." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pb-12 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-emerald-900 mb-2", children: "What's Next?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm text-emerald-800 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• You will receive an order confirmation email shortly" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Track your order status in your dashboard" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• We'll notify you when your order ships" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 pt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => navigate({ to: "/dashboard" }),
                className: "flex-1 h-12",
                size: "lg",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5 mr-2" }),
                  "View Orders"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => navigate({ to: "/" }),
                variant: "outline",
                className: "flex-1 h-12",
                size: "lg",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-5 w-5 mr-2" }),
                  "Back to Home"
                ]
              }
            )
          ] })
        ] })
      ] })
    }
  ) });
}
export {
  PaymentSuccessPage as default
};
