import { r as reactExports, x as useDirection, y as useControllableState, j as jsxRuntimeExports, z as createContextScope, A as useId, P as Primitive, C as createRovingFocusGroupScope, R as Root, I as Item, D as composeEventHandlers, E as Presence, F as cn, m as useInternetIdentity, v as useGetCustomerOrders, G as useGetCustomerInquiries, c as useNavigate, S as Skeleton, B as Button } from "./index-DkYKhr--.js";
import { C as CustomerPageStyleScope } from "./CustomerPageStyleScope-CkHkC8Gv.js";
import { O as OrderDetailModal } from "./OrderDetailModal-DjVW4ZL0.js";
import { B as Badge } from "./badge-jbImzOok.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-CC26QeCo.js";
import { P as Package } from "./package-D7hSC7yC.js";
import { M as MessageSquare } from "./message-square-CuiyAb-K.js";
import { M as Mail } from "./mail-C3CCbMrY.js";
import { C as CircleX } from "./circle-x-DT1givym.js";
import { H as House } from "./house-DKiVjAI7.js";
import { T as Truck, C as CircleCheckBig } from "./truck-B0wK8-yE.js";
import { C as Clock } from "./clock-CbKlHbX5.js";
import "./dialog-DfPFwKt9.js";
import "./index-BBHhZke1.js";
import "./label-DUZhBnb3.js";
import "./select-BF1OWe6B.js";
import "./index-DfDjRE5L.js";
import "./chevron-up-g8Zs0cBf.js";
import "./textarea-DtjD6z-3.js";
import "./loader-circle-CrVz2Dtp.js";
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
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
function CustomerDashboardPage() {
  const { identity } = useInternetIdentity();
  const { data: orders, isLoading: ordersLoading } = useGetCustomerOrders();
  const { data: inquiries, isLoading: inquiriesLoading } = useGetCustomerInquiries();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = reactExports.useState(null);
  const [orderModalOpen, setOrderModalOpen] = reactExports.useState(false);
  const isAuthenticated = !!identity;
  const formatINR = (priceInCents) => {
    const amount = Number(priceInCents) / 100;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setOrderModalOpen(true);
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerPageStyleScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-16 w-16 mx-auto mb-4 text-gold-medium" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold mb-2 gold-text", children: "Login Required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Please login to view your dashboard." })
    ] }) }) });
  }
  const getStatusInfo = (order) => {
    if (order.status.__kind__ === "cancelled") {
      return statusConfig.cancelled;
    }
    return statusConfig[order.status.__kind__] || statusConfig.pending;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerPageStyleScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl font-semibold tracking-tight mb-2", children: "My Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Track your orders and inquiries" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border chrome-surface backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium gold-text", children: "My Orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-gold-medium" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold gold-text", children: (orders == null ? void 0 : orders.length) || 0 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border chrome-surface backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium gold-text", children: "My Inquiries" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 text-gold-medium" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold gold-text", children: (inquiries == null ? void 0 : inquiries.length) || 0 }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "orders", className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-2 bg-bottle-green-medium/20 border border-gold-medium/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "orders",
            className: "gold-text data-[state=active]:bg-gold-medium data-[state=active]:text-secondary",
            children: "My Orders"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "inquiries",
            className: "gold-text data-[state=active]:bg-gold-medium data-[state=active]:text-secondary",
            children: "My Inquiries"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "orders", children: ordersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-1/3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" })
        ] })
      ] }, i)) }) : orders && orders.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: orders.map((order) => {
        const statusInfo = getStatusInfo(order);
        const StatusIcon = statusInfo.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "overflow-hidden gold-border chrome-surface backdrop-blur shadow-gold cursor-pointer hover:shadow-gold-lg transition-shadow",
            onClick: () => handleOrderClick(order),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "bg-bottle-green-medium/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg font-medium gold-text", children: [
                  "Order #",
                  order.id.slice(-8)
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
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
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
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-sm text-muted-foreground", children: "Click to view details and manage order" })
              ] })
            ]
          },
          order.id
        );
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-16 w-16 mx-auto mb-4 text-gold-medium" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold mb-2 gold-text", children: "No Orders Yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Start shopping to see your orders here." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => navigate({ to: "/" }),
            className: "gold-gradient text-secondary shadow-gold",
            children: "Browse Products"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "inquiries", children: inquiriesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-1/3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" })
        ] })
      ] }, i)) }) : inquiries && inquiries.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: inquiries.map((inquiry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "overflow-hidden gold-border chrome-surface backdrop-blur",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "bg-bottle-green-medium/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg font-medium gold-text", children: [
                "Inquiry #",
                inquiry.id.slice(-8)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: inquiry.response ? "default" : "secondary",
                  className: inquiry.response ? "bg-gold-medium text-secondary" : "",
                  children: inquiry.response ? "Answered" : "Pending"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Your Message" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: inquiry.message })
              ] }),
              inquiry.response && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-bottle-green-light/10 p-4 rounded-lg border border-gold-medium/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Response" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: inquiry.response })
              ] })
            ] })
          ]
        },
        inquiry.id
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-16 w-16 mx-auto mb-4 text-gold-medium" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold mb-2 gold-text", children: "No Inquiries Yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Contact us if you have any questions." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => navigate({ to: "/contact" }),
            className: "gold-gradient text-secondary shadow-gold",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 mr-2" }),
              "Contact Us"
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrderDetailModal,
      {
        order: selectedOrder,
        open: orderModalOpen,
        onOpenChange: setOrderModalOpen
      }
    )
  ] }) });
}
export {
  CustomerDashboardPage as default
};
