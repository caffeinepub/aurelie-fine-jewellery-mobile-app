import { l as createLucideIcon, r as reactExports, H as useCancelOrder, J as useIsOrderCancellable, j as jsxRuntimeExports, B as Button, k as ue } from "./index-DGBrfQOZ.js";
import { B as Badge } from "./badge-3EuYNkT5.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-DNRhk95G.js";
import { L as Label } from "./label-BefYQ-pD.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BJFdiPyH.js";
import { T as Textarea } from "./textarea-Boz6xmu7.js";
import { L as LoaderCircle } from "./loader-circle-CpRKOCiw.js";
import { C as CircleX } from "./circle-x-BksbBW42.js";
import { H as House } from "./house-BefNtRRZ.js";
import { T as Truck, C as CircleCheckBig } from "./truck-rooqinyR.js";
import { C as Clock } from "./clock-BwDECfyB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode);
const statusConfig = {
  pending: { label: "Pending", icon: Clock, variant: "secondary" },
  confirmed: {
    label: "Confirmed",
    icon: CircleCheckBig,
    variant: "default"
  },
  shipped: { label: "Shipped", icon: Truck, variant: "default" },
  delivered: { label: "Delivered", icon: House, variant: "outline" },
  cancelled: {
    label: "Cancelled",
    icon: CircleX,
    variant: "destructive"
  }
};
const cancellationReasons = [
  "Changed my mind",
  "Found a better price elsewhere",
  "Ordered by mistake",
  "Delivery time too long",
  "Product no longer needed",
  "Other"
];
function OrderDetailModal({
  order,
  open,
  onOpenChange
}) {
  const [showCancelForm, setShowCancelForm] = reactExports.useState(false);
  const [selectedReason, setSelectedReason] = reactExports.useState("");
  const [customReason, setCustomReason] = reactExports.useState("");
  const cancelOrder = useCancelOrder();
  const { data: isCancellable, isLoading: checkingCancellable } = useIsOrderCancellable((order == null ? void 0 : order.id) || "");
  if (!order) return null;
  const formatINR = (priceInCents) => {
    const amount = Number(priceInCents) / 100;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  const getStatusInfo = () => {
    if (order.status.__kind__ === "cancelled") {
      return statusConfig.cancelled;
    }
    return statusConfig[order.status.__kind__] || statusConfig.pending;
  };
  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;
  const handleCancelOrder = async () => {
    if (!order) return;
    const reasonText = selectedReason === "Other" ? customReason : selectedReason;
    if (!reasonText.trim()) {
      ue.error("Please provide a cancellation reason");
      return;
    }
    try {
      await cancelOrder.mutateAsync({
        orderId: order.id,
        reason: { reason: reasonText }
      });
      ue.success("Order cancelled successfully");
      setShowCancelForm(false);
      setSelectedReason("");
      setCustomReason("");
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to cancel order:", error);
      ue.error(error.message || "Failed to cancel order");
    }
  };
  const getCancellationReason = () => {
    if (order.status.__kind__ === "cancelled") {
      return order.status.cancelled.reason;
    }
    return null;
  };
  const cancellationReason = getCancellationReason();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl gold-border bg-beige-light/95 backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-serif gold-text", children: "Order Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
        "Order #",
        order.id.slice(-8)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: statusInfo.variant,
            className: "gap-1 bg-gold-medium text-secondary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { className: "h-3 w-3" }),
              statusInfo.label
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 p-4 bg-bottle-green-medium/10 rounded-lg border border-gold-medium/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Product ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: order.productId })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Quantity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: order.quantity.toString() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Total Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-semibold gold-text", children: formatINR(order.totalPriceInCents) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "UPI ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: order.upiId })
        ] }),
        order.ringSize && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Ring Size" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: order.ringSize })
        ] }),
        order.metalColour && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Metal Colour" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: order.metalColour })
        ] })
      ] }),
      cancellationReason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-destructive/10 rounded-lg border border-destructive/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive mb-1", children: "Cancellation Reason" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: cancellationReason })
      ] }),
      !showCancelForm && order.status.__kind__ !== "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: checkingCancellable ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-gold-medium" }) }) : isCancellable ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "destructive",
            onClick: () => setShowCancelForm(true),
            className: "w-full",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 mr-2" }),
              "Cancel Order"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 bg-amber-500/10 rounded-lg border border-amber-500/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700", children: "Cancel is available for 12hrs post order is placed. For more help contact customer support." })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 bg-muted rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Cancellation period has expired. Please contact customer support for assistance." })
      ] }) }),
      showCancelForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-4 bg-destructive/5 rounded-lg border border-destructive/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reason", className: "gold-text", children: "Cancellation Reason" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: selectedReason,
              onValueChange: setSelectedReason,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "reason", className: "border-gold-medium/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a reason" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "gold-border bg-card/95 backdrop-blur", children: cancellationReasons.map((reason) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: reason, children: reason }, reason)) })
              ]
            }
          )
        ] }),
        selectedReason === "Other" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "customReason", className: "gold-text", children: "Please specify" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "customReason",
              value: customReason,
              onChange: (e) => setCustomReason(e.target.value),
              placeholder: "Enter your reason for cancellation",
              className: "border-gold-medium/30 min-h-[80px]"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => {
                setShowCancelForm(false);
                setSelectedReason("");
                setCustomReason("");
              },
              className: "flex-1",
              disabled: cancelOrder.isPending,
              children: "Back"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "destructive",
              onClick: handleCancelOrder,
              className: "flex-1",
              disabled: cancelOrder.isPending || !selectedReason,
              children: cancelOrder.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                "Cancelling..."
              ] }) : "Confirm Cancellation"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "outline",
        onClick: () => onOpenChange(false),
        className: "border-gold-medium/30",
        children: "Close"
      }
    ) })
  ] }) });
}
export {
  OrderDetailModal as O
};
