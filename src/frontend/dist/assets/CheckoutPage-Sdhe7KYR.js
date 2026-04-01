import { i as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, X, h as ue, a as useNavigate, k as useInternetIdentity, d as useCart, l as useCreateOrder, m as useGetCallerUserProfile, U as User } from "./index-aj0lqbRn.js";
import { C as CustomerPageStyleScope } from "./CustomerPageStyleScope-DzIK5pre.js";
import { I as Input } from "./input-HIqWFnkP.js";
import { L as Label } from "./label-DQfuwohG.js";
import { T as Tag } from "./tag-GLGnHFLm.js";
import { C as CircleCheck } from "./circle-check-CbAzvhUC.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-scimD28y.js";
import { S as Separator } from "./separator-D2SrJpR0.js";
import { M as MapPin } from "./map-pin-CBP1JYBR.js";
import { L as LoaderCircle } from "./loader-circle-8zVxuiuX.js";
import { M as Mail } from "./mail-DDYTRs8j.js";
import { P as Phone } from "./phone-DNNnt6yj.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
const VALID_COUPON_CODE = "AFJ10";
const COUPON_DISCOUNT_PERCENT = 10;
function computeSubtotalInCents(items) {
  return items.reduce((sum, item) => {
    return sum + Number(item.product.priceInCents) * item.quantity;
  }, 0);
}
function validateCoupon(code) {
  return code.trim().toUpperCase() === VALID_COUPON_CODE;
}
function computeDiscountInCents(subtotalInCents, couponCode) {
  if (!validateCoupon(couponCode)) {
    return 0;
  }
  return Math.round(subtotalInCents * (COUPON_DISCOUNT_PERCENT / 100));
}
function computeFinalAmountInCents(subtotalInCents, discountInCents) {
  return Math.max(0, subtotalInCents - discountInCents);
}
function formatINR(amountInCents) {
  const amount = amountInCents / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
function computeDiscountedLineTotal(priceInCents, quantity, couponCode) {
  const lineTotal = Number(priceInCents) * quantity;
  const discount = computeDiscountInCents(lineTotal, couponCode);
  return BigInt(lineTotal - discount);
}
function CouponControl({
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon
}) {
  const [couponInput, setCouponInput] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const handleApply = () => {
    const code = couponInput.trim();
    if (!code) {
      setError("Please enter a coupon code");
      return;
    }
    if (!validateCoupon(code)) {
      setError("Invalid coupon code");
      return;
    }
    setError("");
    onApplyCoupon(code);
    setCouponInput("");
  };
  const handleRemove = () => {
    onRemoveCoupon();
    setCouponInput("");
    setError("");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleApply();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Label,
      {
        htmlFor: "coupon",
        className: "text-base font-semibold gold-text flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-4 w-4" }),
          "Apply Coupon Code"
        ]
      }
    ),
    appliedCoupon ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 bg-gradient-to-r from-gold-medium/10 to-gold-light/10 border-2 border-gold-medium/30 rounded-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-gold-medium flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-gold-light", children: [
          "Coupon Applied: ",
          appliedCoupon
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "10% discount applied to your order" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: handleRemove,
          className: "text-gold-medium hover:text-gold-dark",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "coupon",
            type: "text",
            placeholder: "Enter coupon code",
            value: couponInput,
            onChange: (e) => {
              setCouponInput(e.target.value);
              setError("");
            },
            onKeyPress: handleKeyPress,
            className: "h-12 text-base border-2 border-gold-medium/30 focus:border-gold-medium focus:ring-gold-medium/20 bg-ivory-base/30"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleApply,
            className: "h-12 px-6 gold-gradient text-white shadow-gold hover:shadow-gold/70",
            children: "Apply"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-destructive flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
        error
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Use code",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gold-medium", children: "AFJ10" }),
        " for 10% off"
      ] })
    ] })
  ] });
}
function UpiQrCode({ upiUri, size = 256 }) {
  const [copied, setCopied] = reactExports.useState(false);
  const [qrCodeUrl, setQrCodeUrl] = reactExports.useState("");
  reactExports.useEffect(() => {
    const encodedUri = encodeURIComponent(upiUri);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedUri}&format=svg`;
    setQrCodeUrl(url);
  }, [upiUri, size]);
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(upiUri);
      setCopied(true);
      ue.success("UPI link copied to clipboard");
      setTimeout(() => setCopied(false), 2e3);
    } catch (_error) {
      ue.error("Failed to copy link");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center p-6 bg-white rounded-xl border-2 border-gold-medium/20", children: qrCodeUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: qrCodeUrl,
        alt: "UPI Payment QR Code",
        width: size,
        height: size,
        style: { maxWidth: "100%", height: "auto" }
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center bg-gray-100",
        style: { width: size, height: size },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-500", children: "Loading QR Code..." })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium gold-text", children: "Scan QR code with any UPI app" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: handleCopyLink,
          className: "w-full border-gold-medium/30 hover:border-gold-medium hover:bg-gold-medium/5",
          children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 mr-2 text-gold-medium" }),
            "Copied!"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4 mr-2" }),
            "Copy UPI Link"
          ] })
        }
      )
    ] })
  ] });
}
function buildUpiUri(details) {
  const { payeeVpa, payeeName, amountInCents, currency } = details;
  const amountInRupees = (amountInCents / 100).toFixed(2);
  const params = new URLSearchParams({
    pa: payeeVpa,
    pn: payeeName,
    am: amountInRupees,
    cu: currency
  });
  return `upi://pay?${params.toString()}`;
}
function generateAurelieUpiUri(amountInCents) {
  return buildUpiUri({
    payeeVpa: "arjun.tapse-1@okhdfcbank",
    payeeName: "Arjun Tapse",
    amountInCents,
    currency: "INR"
  });
}
function generateGooglePayUri(amountInCents) {
  const upiUri = generateAurelieUpiUri(amountInCents);
  return `gpay://upi/pay?${upiUri.split("?")[1]}`;
}
function generatePhonePeUri(amountInCents) {
  const upiUri = generateAurelieUpiUri(amountInCents);
  return `phonepe://pay?${upiUri.split("?")[1]}`;
}
function CheckoutPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { items, getTotalPrice: _getTotalPrice, clearCart } = useCart();
  const createOrder = useCreateOrder();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const [checkoutStep, setCheckoutStep] = reactExports.useState(
    "address"
  );
  const [upiId, setUpiId] = reactExports.useState("");
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [appliedCoupon, setAppliedCoupon] = reactExports.useState("");
  const [shippingAddress, setShippingAddress] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const isAuthenticated = !!identity;
  reactExports.useEffect(() => {
    if (userProfile) {
      setShippingAddress({
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone,
        address: userProfile.address
      });
    }
  }, [userProfile]);
  const subtotalInCents = computeSubtotalInCents(items);
  const discountInCents = computeDiscountInCents(
    subtotalInCents,
    appliedCoupon
  );
  const finalAmountInCents = computeFinalAmountInCents(
    subtotalInCents,
    discountInCents
  );
  const upiUri = generateAurelieUpiUri(finalAmountInCents);
  const googlePayUri = generateGooglePayUri(finalAmountInCents);
  const phonePeUri = generatePhonePeUri(finalAmountInCents);
  if (!isAuthenticated) {
    navigate({ to: "/" });
    return null;
  }
  if (items.length === 0) {
    navigate({ to: "/cart" });
    return null;
  }
  const handleConfirmAddress = () => {
    if (!shippingAddress.name.trim()) {
      ue.error("Please enter your name");
      return;
    }
    if (!shippingAddress.email.trim()) {
      ue.error("Please enter your email");
      return;
    }
    if (!shippingAddress.phone.trim()) {
      ue.error("Please enter your phone number");
      return;
    }
    if (!shippingAddress.address.trim()) {
      ue.error("Please enter your shipping address");
      return;
    }
    setCheckoutStep("payment");
    ue.success("Shipping address confirmed");
  };
  const handleApplyCoupon = (code) => {
    setAppliedCoupon(code.trim().toUpperCase());
    ue.success("Coupon applied successfully!");
  };
  const handleRemoveCoupon = () => {
    setAppliedCoupon("");
    ue.info("Coupon removed");
  };
  const handlePayment = async () => {
    if (!upiId.trim()) {
      ue.error("Please enter your UPI ID");
      return;
    }
    if (!identity) return;
    setIsProcessing(true);
    try {
      for (const item of items) {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const shippingAddressData = {
          name: shippingAddress.name.trim(),
          email: shippingAddress.email.trim(),
          phone: shippingAddress.phone.trim(),
          address: shippingAddress.address.trim()
        };
        const discountedTotal = computeDiscountedLineTotal(
          item.product.priceInCents,
          item.quantity,
          appliedCoupon
        );
        const orderInput = {
          id: orderId,
          customer: identity.getPrincipal(),
          productId: item.product.id,
          quantity: BigInt(item.quantity),
          totalPriceInCents: discountedTotal,
          upiId: upiId.trim(),
          shippingAddress: shippingAddressData,
          ringSize: item.ringSize,
          metalColour: item.metalColour
        };
        await createOrder.mutateAsync(orderInput);
      }
      clearCart();
      ue.success("Order placed successfully! Payment pending via UPI.");
      navigate({ to: "/dashboard" });
    } catch (error) {
      console.error("Order creation error:", error);
      ue.error(error.message || "Failed to place order");
    } finally {
      setIsProcessing(false);
    }
  };
  const handleAppPayment = (appUri, appName) => {
    if (!upiId.trim()) {
      ue.error("Please enter your UPI ID");
      return;
    }
    try {
      window.location.href = appUri;
      setTimeout(() => {
        ue.info(
          `If ${appName} did not open, please scan the QR code or copy the link`,
          {
            duration: 5e3
          }
        );
      }, 1500);
    } catch (_error) {
      ue.error(
        `Unable to open ${appName}. Please scan the QR code or copy the link.`
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerPageStyleScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container px-4 py-12 max-w-7xl mx-auto",
      "data-checkout-scope": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-5xl font-bold tracking-tight mb-4", children: "Secure Checkout" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg gold-text font-medium", children: "Complete your purchase with confidence" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-6 mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 text-gold-medium" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium gold-text", children: "Secure Payment" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5 text-gold-medium" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium gold-text", children: "Encrypted" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-10 h-10 rounded-full flex items-center justify-center font-semibold ${checkoutStep === "address" ? "gold-gradient text-white" : "bg-gold-medium text-white"}`,
                children: "1"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `font-medium ${checkoutStep === "address" ? "gold-text" : "text-muted-foreground"}`,
                children: "Shipping Address"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-1 bg-gold-medium/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-10 h-10 rounded-full flex items-center justify-center font-semibold ${checkoutStep === "payment" ? "gold-gradient text-white" : "bg-gray-300 text-gray-600"}`,
                children: "2"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `font-medium ${checkoutStep === "payment" ? "gold-text" : "text-muted-foreground"}`,
                children: "Payment"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-6", children: [
            checkoutStep === "address" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border offwhite-surface backdrop-blur-sm shadow-elegant", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-b border-gold-medium/20 bg-gradient-to-r from-bottle-green-light/20 to-bottle-green-medium/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "gold-text flex items-center gap-3 text-2xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-gold-gradient", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-6 w-6 text-white" }) }),
                "Confirm Shipping Address"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-8 space-y-6", children: profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-gold-medium" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "name",
                      className: "text-base font-semibold gold-text flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
                        "Full Name"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "name",
                      type: "text",
                      placeholder: "Enter your full name",
                      value: shippingAddress.name,
                      onChange: (e) => setShippingAddress({
                        ...shippingAddress,
                        name: e.target.value
                      }),
                      className: "h-12 text-base border-2 border-gold-medium/30 focus:border-gold-medium focus:ring-gold-medium/20 bg-ivory-base/30"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "email",
                      className: "text-base font-semibold gold-text flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
                        "Email Address"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "email",
                      type: "email",
                      placeholder: "your.email@example.com",
                      value: shippingAddress.email,
                      onChange: (e) => setShippingAddress({
                        ...shippingAddress,
                        email: e.target.value
                      }),
                      className: "h-12 text-base border-2 border-gold-medium/30 focus:border-gold-medium focus:ring-gold-medium/20 bg-ivory-base/30"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "phone",
                      className: "text-base font-semibold gold-text flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
                        "Phone Number"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "phone",
                      type: "tel",
                      placeholder: "+91 XXXXX XXXXX",
                      value: shippingAddress.phone,
                      onChange: (e) => setShippingAddress({
                        ...shippingAddress,
                        phone: e.target.value
                      }),
                      className: "h-12 text-base border-2 border-gold-medium/30 focus:border-gold-medium focus:ring-gold-medium/20 bg-ivory-base/30"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "address",
                      className: "text-base font-semibold gold-text flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
                        "Shipping Address"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      id: "address",
                      placeholder: "Enter your complete shipping address",
                      value: shippingAddress.address,
                      onChange: (e) => setShippingAddress({
                        ...shippingAddress,
                        address: e.target.value
                      }),
                      rows: 4,
                      className: "w-full px-4 py-3 text-base border-2 border-gold-medium/30 rounded-md focus:border-gold-medium focus:ring-2 focus:ring-gold-medium/20 bg-ivory-base/30 resize-none text-foreground"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-bottle-green-dark/5 border-l-4 border-gold-medium p-4 rounded-r-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-gold-medium flex-shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm gold-text mb-1", children: "Verify Your Details" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Please ensure your shipping address is correct. Your order will be delivered to this address." })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: handleConfirmAddress,
                    className: "w-full h-14 text-lg font-semibold",
                    size: "lg",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 mr-2" }),
                      "Confirm Shipping Address"
                    ]
                  }
                )
              ] }) })
            ] }),
            checkoutStep === "payment" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border offwhite-surface backdrop-blur-sm shadow-elegant", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-b border-gold-medium/20 bg-gradient-to-r from-bottle-green-light/20 to-bottle-green-medium/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "gold-text flex items-center gap-3 text-xl", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-gold-medium" }),
                    "Shipping To"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      onClick: () => setCheckoutStep("address"),
                      className: "text-gold-medium hover:text-gold-dark",
                      children: "Edit"
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gold-light", children: shippingAddress.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: shippingAddress.email }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: shippingAddress.phone }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: shippingAddress.address })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border offwhite-surface backdrop-blur-sm shadow-elegant", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-b border-gold-medium/20 bg-gradient-to-r from-bottle-green-light/20 to-bottle-green-medium/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "gold-text flex items-center gap-3 text-xl", children: "Apply Discount Coupon" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CouponControl,
                  {
                    appliedCoupon,
                    onApplyCoupon: handleApplyCoupon,
                    onRemoveCoupon: handleRemoveCoupon
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border offwhite-surface backdrop-blur-sm shadow-elegant", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-b border-gold-medium/20 bg-gradient-to-r from-bottle-green-light/20 to-bottle-green-medium/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "gold-text flex items-center gap-3 text-2xl", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-gold-gradient", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-6 w-6 text-white" }) }),
                  "UPI Payment"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-8 space-y-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-serif text-xl font-semibold gold-text text-center", children: [
                      "Scan to Pay ",
                      formatINR(finalAmountInCents)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UpiQrCode, { upiUri, size: 220 })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-gold-medium/20" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-lg font-semibold gold-text text-center", children: "Or Pay with App" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 justify-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleAppPayment(googlePayUri, "Google Pay"),
                          className: "flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gold-medium/30 hover:border-gold-medium hover:bg-gold-medium/5 transition-all",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "img",
                              {
                                src: "/assets/generated/gpay-icon.dim_128x128.png",
                                alt: "Google Pay",
                                className: "w-16 h-16 object-contain"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium gold-text", children: "Google Pay" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleAppPayment(phonePeUri, "PhonePe"),
                          className: "flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-gold-medium/30 hover:border-gold-medium hover:bg-gold-medium/5 transition-all",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "img",
                              {
                                src: "/assets/generated/phonepe-icon.dim_128x128.png",
                                alt: "PhonePe",
                                className: "w-16 h-16 object-contain"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium gold-text", children: "PhonePe" })
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-gold-medium/20" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "upiId",
                        className: "text-base font-semibold gold-text",
                        children: "Enter Your UPI ID (for confirmation)"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "upiId",
                        type: "text",
                        placeholder: "yourname@upi",
                        value: upiId,
                        onChange: (e) => setUpiId(e.target.value),
                        className: "h-12 text-base border-2 border-gold-medium/30 focus:border-gold-medium focus:ring-gold-medium/20 bg-ivory-base/30"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Enter the UPI ID you'll use for payment confirmation" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-bottle-green-dark/5 border-l-4 border-gold-medium p-4 rounded-r-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5 text-gold-medium flex-shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm gold-text mb-1", children: "Secure Payment Process" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: 'After completing the UPI payment, click "Confirm Payment" below to finalize your order.' })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: handlePayment,
                      disabled: isProcessing || !upiId.trim(),
                      className: "w-full h-14 text-lg font-semibold",
                      size: "lg",
                      children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 mr-2 animate-spin" }),
                        "Processing Order..."
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 mr-2" }),
                        "Confirm Payment & Place Order"
                      ] })
                    }
                  )
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border offwhite-surface backdrop-blur-sm shadow-elegant sticky top-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-b border-gold-medium/20 bg-gradient-to-r from-bottle-green-light/20 to-bottle-green-medium/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "gold-text text-2xl", children: "Order Summary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: items.map((item) => {
                const firstImage = item.product.media.images[0];
                const imageUrl = firstImage ? firstImage.getDirectURL() : null;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-lg overflow-hidden bg-beige-light flex-shrink-0", children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: imageUrl,
                      alt: item.product.name,
                      className: "w-full h-full object-cover"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-8 w-8 text-muted-foreground" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm gold-text line-clamp-1", children: item.product.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                      "Qty: ",
                      item.quantity
                    ] }),
                    (item.ringSize || item.metalColour) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 mt-1", children: [
                      item.ringSize && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs px-1.5 py-0.5 rounded border border-gold-medium/30 text-gold-dark bg-gold-light/10", children: [
                        "Size: ",
                        item.ringSize
                      ] }),
                      item.metalColour && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-1.5 py-0.5 rounded border border-gold-medium/30 text-gold-dark bg-gold-light/10", children: item.metalColour })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gold-medium mt-1", children: formatINR(Number(item.product.priceInCents)) })
                  ] })
                ] }, item.product.id);
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-gold-medium/20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatINR(subtotalInCents) })
                ] }),
                appliedCoupon && discountInCents > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-600 font-medium", children: [
                    "Discount (",
                    appliedCoupon,
                    ")"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-600 font-semibold", children: [
                    "-",
                    formatINR(discountInCents)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-gold-medium/20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-lg font-bold", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: formatINR(finalAmountInCents) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-bottle-green-dark/5 border border-gold-medium/20 p-4 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5 text-gold-medium flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold gold-text mb-1", children: "Secure Checkout" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your payment information is encrypted and secure" })
                ] })
              ] }) })
            ] })
          ] }) })
        ] })
      ]
    }
  ) });
}
export {
  CheckoutPage as default
};
