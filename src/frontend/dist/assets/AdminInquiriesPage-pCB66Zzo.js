import { a0 as useGetInquiries, a1 as useRespondToInquiry, r as reactExports, j as jsxRuntimeExports, B as Button, k as ue, c as useNavigate, m as useInternetIdentity, a as useActor, b as useQuery } from "./index-DkYKhr--.js";
import { B as Badge } from "./badge-jbImzOok.js";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from "./card-CC26QeCo.js";
import { T as Textarea } from "./textarea-DtjD6z-3.js";
import { M as MessageSquare } from "./message-square-CuiyAb-K.js";
import { S as Send } from "./send-XEGDk8d3.js";
import { S as Shield } from "./shield-CEGWGgO8.js";
import { A as ArrowLeft } from "./arrow-left-CHVqEs04.js";
function InquiryManagement() {
  const { data: inquiries, isLoading } = useGetInquiries();
  const respondToInquiry = useRespondToInquiry();
  const [respondingTo, setRespondingTo] = reactExports.useState(null);
  const [response, setResponse] = reactExports.useState("");
  const handleRespond = async (inquiryId) => {
    if (!response.trim()) {
      ue.error("Please enter a response");
      return;
    }
    try {
      await respondToInquiry.mutateAsync({
        inquiryId,
        response: response.trim()
      });
      ue.success("Response sent successfully");
      setRespondingTo(null);
      setResponse("");
    } catch (error) {
      console.error("Failed to send response:", error);
      ue.error(error.message || "Failed to send response");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border admin-surface backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-bottle-green-dark flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-5 w-5" }),
        "Customer Inquiries"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-bottle-green-medium", children: "View and respond to customer inquiries" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-bottle-green-medium", children: "Loading inquiries..." }) }) : inquiries && inquiries.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: inquiries.map((inquiry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-4 border border-gold-medium/30 rounded-lg hover:bg-emerald-light/10 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-bottle-green-dark", children: inquiry.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-bottle-green-medium", children: inquiry.email })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: inquiry.response ? "outline" : "default",
                className: !inquiry.response ? "bg-gold-medium text-secondary" : "",
                children: inquiry.response ? "Answered" : "Pending"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium admin-label-text mb-1", children: "Message:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-bottle-green-dark", children: inquiry.message })
          ] }),
          inquiry.response ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-bottle-green-light/10 p-3 rounded border border-gold-medium/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium admin-label-text mb-1", children: "Your Response:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-bottle-green-dark", children: inquiry.response })
          ] }) : respondingTo === inquiry.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: response,
                onChange: (e) => setResponse(e.target.value),
                placeholder: "Type your response...",
                rows: 4,
                className: "border-gold-medium/30 text-bottle-green-dark"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => {
                    setRespondingTo(null);
                    setResponse("");
                  },
                  className: "border-gold-medium text-bottle-green-dark",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  onClick: () => handleRespond(inquiry.id),
                  disabled: respondToInquiry.isPending,
                  className: "gap-2 gold-gradient text-secondary shadow-gold",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
                    respondToInquiry.isPending ? "Sending..." : "Send Response"
                  ]
                }
              )
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setRespondingTo(inquiry.id),
              className: "gap-2 border-gold-medium text-bottle-green-dark hover:bg-gold-medium/20",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
                "Respond"
              ]
            }
          )
        ]
      },
      inquiry.id
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-16 w-16 mx-auto mb-4 text-gold-medium opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-bottle-green-medium", children: "No inquiries yet." })
    ] }) })
  ] });
}
function AdminInquiriesPage() {
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
  if (!identity || !adminLoading && !isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-16 h-16 text-destructive mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-serif text-foreground mb-2", children: "Access Denied" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "You do not have admin privileges." })
    ] }) });
  }
  if (adminLoading || actorFetching) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-gold/20 bg-card px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/admin" }),
          className: "flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Back to Dashboard" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-px bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-serif text-foreground", children: "Inquiry Management" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InquiryManagement, {}) })
  ] });
}
export {
  AdminInquiriesPage as default
};
