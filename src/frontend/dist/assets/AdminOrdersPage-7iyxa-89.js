import { i as createLucideIcon, W as useIsCallerAdmin, Y as useGetOrders, b as useGetProducts, Z as useUpdateOrderStatus, r as reactExports, j as jsxRuntimeExports, S as Skeleton, w as ShoppingBag, B as Button, X, h as ue } from "./index-aj0lqbRn.js";
import { B as Badge } from "./badge-C7OOuLHx.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent, d as CardDescription } from "./card-scimD28y.js";
import { I as Input } from "./input-HIqWFnkP.js";
import { L as Label } from "./label-DQfuwohG.js";
import { S as ScrollArea } from "./scroll-area-EF_MzE2Y.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-ChzfF6B6.js";
import { S as Separator } from "./separator-D2SrJpR0.js";
import { M as MapPin } from "./map-pin-CBP1JYBR.js";
import { C as CircleX } from "./circle-x-BPU35x5B.js";
import { H as House } from "./house-BpXj35pB.js";
import { T as Truck, C as CircleCheckBig } from "./truck-ldBXO7rX.js";
import { C as Clock } from "./clock-BfONzFqX.js";
import "./index-DtBbohZu.js";
import "./chevron-up-DpzikAIe.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
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
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode);
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
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const YEARS = Array.from(
  { length: 10 },
  (_, i) => (/* @__PURE__ */ new Date()).getFullYear() - i
);
function AdminOrdersPage() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: orders, isLoading: ordersLoading } = useGetOrders();
  const { data: products } = useGetProducts();
  const updateStatus = useUpdateOrderStatus();
  const [selectedOrder, setSelectedOrder] = reactExports.useState(null);
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [selectedMonth, setSelectedMonth] = reactExports.useState("");
  const [selectedYear, setSelectedYear] = reactExports.useState("");
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
  const getCancellationReason = (order) => {
    if (order.status.__kind__ === "cancelled") {
      return order.status.cancelled.reason;
    }
    return null;
  };
  const filteredOrders = reactExports.useMemo(() => {
    if (!orders) return [];
    return orders.filter((order) => {
      const orderDate = new Date(Number(order.timestamp) / 1e6);
      if (dateFrom) {
        const fromDate = new Date(dateFrom);
        if (orderDate < fromDate) return false;
      }
      if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        if (orderDate > toDate) return false;
      }
      if (selectedMonth && selectedYear) {
        const monthIndex = MONTHS.indexOf(selectedMonth);
        if (orderDate.getMonth() !== monthIndex || orderDate.getFullYear() !== Number.parseInt(selectedYear)) {
          return false;
        }
      } else if (selectedMonth) {
        const monthIndex = MONTHS.indexOf(selectedMonth);
        if (orderDate.getMonth() !== monthIndex) return false;
      } else if (selectedYear) {
        if (orderDate.getFullYear() !== Number.parseInt(selectedYear))
          return false;
      }
      return true;
    });
  }, [orders, dateFrom, dateTo, selectedMonth, selectedYear]);
  const handleStatusChange = async (orderId, newStatusKind) => {
    try {
      let status;
      switch (newStatusKind) {
        case "pending":
          status = { __kind__: "pending", pending: null };
          break;
        case "confirmed":
          status = { __kind__: "confirmed", confirmed: null };
          break;
        case "shipped":
          status = { __kind__: "shipped", shipped: null };
          break;
        case "delivered":
          status = { __kind__: "delivered", delivered: null };
          break;
        default:
          throw new Error("Invalid status");
      }
      await updateStatus.mutateAsync({ orderId, status });
      ue.success("Order status updated successfully");
    } catch (error) {
      console.error("Failed to update order status:", error);
      ue.error(error.message || "Failed to update order status");
    }
  };
  const clearFilters = () => {
    setDateFrom("");
    setDateTo("");
    setSelectedMonth("");
    setSelectedYear("");
  };
  const hasActiveFilters = dateFrom || dateTo || selectedMonth || selectedYear;
  if (adminLoading || ordersLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-64 mb-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48" }, i)) })
    ] });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-16 w-16 mx-auto mb-4 text-gold-medium" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold mb-2 gold-text", children: "Access Denied" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "gold-text opacity-80", children: "You don't have permission to access this page." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl font-semibold tracking-tight mb-2 text-bottle-green-dark", children: "Order Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-bottle-green-medium", children: "View and manage all customer orders" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[300px_1fr] gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border admin-surface h-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-bottle-green-dark flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-5 w-5" }),
            "Filters"
          ] }),
          hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: clearFilters,
              className: "text-gold-medium hover:text-gold-dark",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mr-1" }),
                "Clear All"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-bottle-green-dark flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
              "Date Range"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: dateFrom,
                  onChange: (e) => setDateFrom(e.target.value),
                  className: "bg-navy-medium border-gold-medium/30 text-beige-champagne",
                  placeholder: "From"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: dateTo,
                  onChange: (e) => setDateTo(e.target.value),
                  className: "bg-navy-medium border-gold-medium/30 text-beige-champagne",
                  placeholder: "To"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-gold-medium/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-bottle-green-dark", children: "Month" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedMonth, onValueChange: setSelectedMonth, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-navy-medium border-gold-medium/30 text-beige-champagne", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select month" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: MONTHS.map((month) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: month, children: month }, month)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-bottle-green-dark", children: "Year" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedYear, onValueChange: setSelectedYear, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-navy-medium border-gold-medium/30 text-beige-champagne", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select year" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: YEARS.map((year) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: year.toString(), children: year }, year)) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "gold-border admin-surface", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-bottle-green-dark", children: [
            filteredOrders.length,
            " ",
            filteredOrders.length === 1 ? "Order" : "Orders"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-bottle-green-medium", children: hasActiveFilters ? "Filtered results" : "All orders" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[calc(100vh-300px)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 pr-4", children: filteredOrders.length > 0 ? filteredOrders.map((order) => {
          const statusInfo = getStatusInfo(order);
          const StatusIcon = statusInfo.icon;
          const cancellationReason = getCancellationReason(order);
          const isCancelled = order.status.__kind__ === "cancelled";
          const isSelected = (selectedOrder == null ? void 0 : selectedOrder.id) === order.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: `gold-border admin-surface cursor-pointer transition-all ${isSelected ? "ring-2 ring-gold-medium" : ""}`,
              onClick: () => setSelectedOrder(order),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-bottle-green-dark", children: [
                      "Order #",
                      order.id.slice(-8)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-bottle-green-medium", children: formatDate(order.timestamp) })
                  ] }),
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
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm admin-table-text", children: "Product" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-bottle-green-dark", children: getProductName(order.productId) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm admin-table-text", children: "Quantity" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-bottle-green-dark", children: order.quantity.toString() })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm admin-table-text", children: "Total Amount" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-bottle-green-dark", children: formatINR(order.totalPriceInCents) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm admin-table-text", children: "Customer" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-sm text-bottle-green-dark", children: [
                      order.customer.toString().slice(0, 16),
                      "..."
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 p-3 bg-emerald-light/10 rounded-lg border border-gold-medium/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-gold-medium" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold admin-table-text", children: "Shipping Address" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-bottle-green-dark", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-table-text", children: "Name:" }),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: order.shippingAddress.name || "Not provided" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-bottle-green-dark", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-table-text", children: "Email:" }),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: order.shippingAddress.email || "Not provided" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-bottle-green-dark", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-table-text", children: "Phone:" }),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: order.shippingAddress.phone || "Not provided" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-bottle-green-dark", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-table-text", children: "Address:" }),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: order.shippingAddress.address || "Not provided" })
                    ] })
                  ] })
                ] }),
                cancellationReason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 p-3 bg-red-50 border border-red-200 rounded-lg", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-red-800", children: "Cancellation Reason:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-700 mt-1", children: cancellationReason })
                ] }),
                !isCancelled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm admin-table-text", children: "Update Status:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: order.status.__kind__,
                      onValueChange: (value) => handleStatusChange(order.id, value),
                      disabled: updateStatus.isPending,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[180px] bg-navy-medium border-gold-medium/30 text-beige-champagne", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "confirmed", children: "Confirmed" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "shipped", children: "Shipped" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "delivered", children: "Delivered" })
                        ] })
                      ]
                    }
                  )
                ] })
              ] })
            },
            order.id
          );
        }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "gold-border admin-surface", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-16 w-16 mx-auto mb-4 text-gold-medium" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-bottle-green-dark mb-2", children: "No Orders Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-bottle-green-medium", children: hasActiveFilters ? "No orders match your filter criteria. Try adjusting your filters." : "No orders have been placed yet." })
        ] }) }) }) })
      ] })
    ] })
  ] });
}
export {
  AdminOrdersPage as default
};
