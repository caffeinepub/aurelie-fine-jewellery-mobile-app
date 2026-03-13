import { m as useInternetIdentity, v as useGetCustomerOrders, d as useGetProducts, r as reactExports, j as jsxRuntimeExports, w as ShoppingBag, S as Skeleton } from "./index-B1_sVdMb.js";
import { C as CustomerPageStyleScope } from "./CustomerPageStyleScope-OGDA4U6s.js";
import { O as OrderDetailModal } from "./OrderDetailModal-IWRQcM62.js";
import { B as Badge } from "./badge-bl5zitdd.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-sJlFJuS-.js";
import { P as Package } from "./package-DebtcKjN.js";
import { C as CircleX } from "./circle-x--d4eJs2C.js";
import { H as House } from "./house-DxZ6RZt9.js";
import { T as Truck, C as CircleCheckBig } from "./truck-Du6nVGCY.js";
import { C as Clock } from "./clock-BWFKelYj.js";
import "./dialog-CbUzuoMS.js";
import "./index-DnaRw3xr.js";
import "./label-C09FS6ob.js";
import "./select-C3J02y9B.js";
import "./index-CcVhyL7k.js";
import "./chevron-up-DDB1HhY_.js";
import "./textarea-DmQsRMIB.js";
import "./loader-circle-B6eg7Twa.js";
const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-500" },
  confirmed: { label: "Confirmed", icon: CircleCheckBig, color: "bg-blue-500" },
  shipped: { label: "Shipped", icon: Truck, color: "bg-purple-500" },
  delivered: { label: "Delivered", icon: House, color: "bg-green-500" },
  cancelled: { label: "Cancelled", icon: CircleX, color: "bg-red-500" }
};
function OrdersPage() {
  const { identity } = useInternetIdentity();
  const { data: orders, isLoading } = useGetCustomerOrders();
  const { data: products } = useGetProducts();
  const [selectedOrder, setSelectedOrder] = reactExports.useState(null);
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const formatINR = (priceInCents) => {
    const amount = Number(priceInCents) / 100;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp) / 1e6);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  };
  const getProductName = (productId) => {
    const product = products == null ? void 0 : products.find((p) => p.id === productId);
    return (product == null ? void 0 : product.name) || "Unknown Product";
  };
  const getStatusInfo = (order) => {
    if (order.status.__kind__ === "cancelled") {
      return statusConfig.cancelled;
    }
    return statusConfig[order.status.__kind__] || statusConfig.pending;
  };
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };
  const handleModalClose = (open) => {
    setModalOpen(open);
    if (!open) {
      setSelectedOrder(null);
    }
  };
  if (!identity) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerPageStyleScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-16 w-16 mx-auto mb-4 text-gold-medium" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold mb-2", children: "Please Log In" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "You need to be logged in to view your orders." })
    ] }) }) });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerPageStyleScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-64 mb-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48" }, i)) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerPageStyleScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl font-semibold tracking-tight mb-2", children: "My Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "View your order history and track deliveries" })
    ] }),
    orders && orders.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: orders.map((order) => {
      const statusInfo = getStatusInfo(order);
      const StatusIcon = statusInfo.icon;
      const cancellationReason = order.status.__kind__ === "cancelled" ? order.status.cancelled.reason : null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "cursor-pointer hover:shadow-lg transition-shadow border-gold-medium/30",
          onClick: () => handleOrderClick(order),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg", children: [
                  "Order #",
                  order.id.slice(-8)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: formatDate(order.timestamp) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: `${statusInfo.color} text-white gap-1`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { className: "h-3 w-3" }),
                statusInfo.label
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Product" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: getProductName(order.productId) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Quantity" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: order.quantity.toString() })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Total Amount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-lg", children: formatINR(order.totalPriceInCents) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: statusInfo.label })
                ] }),
                order.ringSize && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Ring Size" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: order.ringSize })
                ] }),
                order.metalColour && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Metal Colour" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: order.metalColour })
                ] })
              ] }),
              cancellationReason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 p-3 bg-red-50 border border-red-200 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-red-800", children: "Cancellation Reason:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-700 mt-1", children: cancellationReason })
              ] })
            ] })
          ]
        },
        order.id
      );
    }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-gold-medium/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-16 w-16 mx-auto mb-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-2", children: "No Orders Yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "You haven't placed any orders yet. Start shopping to see your orders here." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrderDetailModal,
      {
        order: selectedOrder,
        open: modalOpen,
        onOpenChange: handleModalClose
      }
    )
  ] }) });
}
export {
  OrdersPage as default
};
