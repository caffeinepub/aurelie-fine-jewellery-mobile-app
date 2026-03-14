import { c as useNavigate, j as jsxRuntimeExports, B as Button, g as ShoppingCart } from "./index-BAQMItKk.js";
import { C as CustomerPageStyleScope } from "./CustomerPageStyleScope-VBx4IwUL.js";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from "./card-8AfnzEi0.js";
import { C as CircleX } from "./circle-x-C2_DdKIh.js";
import { H as House } from "./house-DNxGqTMT.js";
function PaymentFailurePage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerPageStyleScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen flex items-center justify-center p-4",
      "data-checkout-scope": true,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md gold-border off-white-surface", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-10 w-10 text-red-600 shrink-0" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-serif", children: "Payment Failed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-base", children: "Unfortunately, your payment could not be processed. Please try again or contact support if the issue persists." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => navigate({ to: "/cart" }),
              className: "w-full",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-4 w-4 mr-2" }),
                "Return to Cart"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => navigate({ to: "/" }),
              variant: "outline",
              className: "w-full border-gold-medium hover:bg-gold-medium/10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-4 w-4 mr-2" }),
                "Back to Home"
              ]
            }
          )
        ] })
      ] })
    }
  ) });
}
export {
  PaymentFailurePage as default
};
