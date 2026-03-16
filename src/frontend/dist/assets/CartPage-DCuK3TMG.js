import { c as useNavigate, m as useInternetIdentity, f as useCart, j as jsxRuntimeExports, g as ShoppingCart, B as Button } from "./index-DGBrfQOZ.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BQ0hJXne.js";
import { P as Package } from "./package-c_hAFtMN.js";
import { T as Trash2 } from "./trash-2-DB3QD4XG.js";
import { M as Minus } from "./minus-CBqc1ZKA.js";
import { P as Plus } from "./plus-CZPFCqjF.js";
function CartPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
  const isAuthenticated = !!identity;
  const formatINR = (priceInCents) => {
    const amount = priceInCents / 100;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-16 w-16 mx-auto mb-4 text-gold-medium" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold mb-2 gold-text", children: "Login Required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Please login to view your cart." })
    ] }) });
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-16 w-16 mx-auto mb-4 text-gold-medium" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold mb-2 gold-text", children: "Your Cart is Empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Start shopping to add items to your cart." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => navigate({ to: "/" }),
          className: "gold-gradient text-secondary shadow-gold",
          children: "Browse Products"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container px-4 py-8", "data-customer-control": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl font-semibold tracking-tight mb-2", children: "Shopping Cart" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Review your items before checkout" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-4", children: items.map((item) => {
        const firstImage = item.product.media.images[0];
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "overflow-hidden gold-border chrome-surface backdrop-blur",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
              firstImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: firstImage.getDirectURL(),
                  alt: item.product.name,
                  className: "h-24 w-24 object-cover rounded border-2 border-gold-medium/30"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 w-24 flex items-center justify-center bg-muted rounded border-2 border-gold-medium/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-8 w-8 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold gold-text mb-1", children: item.product.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mb-2", children: item.product.description }),
                (item.ringSize || item.metalColour) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-2", children: [
                  item.ringSize && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs px-2 py-0.5 rounded-full border border-gold-medium/40 text-bottle-green-dark bg-gold-light/10 font-medium", children: [
                    "Size: ",
                    item.ringSize
                  ] }),
                  item.metalColour && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full border border-gold-medium/40 text-bottle-green-dark bg-gold-light/10 font-medium", children: item.metalColour })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold gold-text", children: formatINR(Number(item.product.priceInCents)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => removeItem(item.product.id),
                    className: "text-destructive hover:text-destructive",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => updateQuantity(item.product.id, item.quantity - 1),
                      className: "h-8 w-8 p-0 border-gold-medium",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-center font-medium", children: item.quantity }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => updateQuantity(item.product.id, item.quantity + 1),
                      className: "h-8 w-8 p-0 border-gold-medium",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" })
                    }
                  )
                ] })
              ] })
            ] }) })
          },
          item.product.id
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border chrome-surface backdrop-blur sticky top-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "gold-text", children: "Order Summary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(getTotalPrice()) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Calculated at checkout" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-gold-medium/30 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold gold-text", children: formatINR(getTotalPrice()) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => navigate({ to: "/checkout" }),
                className: "w-full gold-gradient text-secondary shadow-gold",
                size: "lg",
                children: "Proceed to Checkout"
              }
            )
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  CartPage as default
};
