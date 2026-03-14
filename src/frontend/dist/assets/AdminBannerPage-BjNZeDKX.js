import { l as createLucideIcon, a7 as useGetAllBannerMessages, a8 as useAddBannerMessage, a9 as useUpdateBannerMessage, aa as useDeleteBannerMessage, r as reactExports, j as jsxRuntimeExports, S as Skeleton, B as Button, k as ue, c as useNavigate, m as useInternetIdentity, a as useActor, b as useQuery } from "./index-BAQMItKk.js";
import { C as Card, b as CardHeader, a as CardContent, c as CardTitle } from "./card-8AfnzEi0.js";
import { I as Input } from "./input-DBNAPv1e.js";
import { L as Label } from "./label-DOtwcLdE.js";
import { S as Switch } from "./switch-4SAmBnpI.js";
import { P as Plus } from "./plus-DohDhFNc.js";
import { S as Save } from "./save-B5LJ4YKv.js";
import { T as Trash2 } from "./trash-2-ot8NF8iJ.js";
import { S as Shield } from "./shield-C3wjh2tk.js";
import { A as ArrowLeft } from "./arrow-left-C2IO3-vp.js";
import "./index-Bpb4Ixva.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
];
const GripVertical = createLucideIcon("grip-vertical", __iconNode);
function BannerManagement() {
  const { data: messages, isLoading } = useGetAllBannerMessages();
  const addMessage = useAddBannerMessage();
  const updateMessage = useUpdateBannerMessage();
  const deleteMessage = useDeleteBannerMessage();
  const [newMessage, setNewMessage] = reactExports.useState("");
  const [editingMessages, setEditingMessages] = reactExports.useState({});
  const sortedMessages = messages ? [...messages].sort((a, b) => Number(a.order) - Number(b.order)) : [];
  const handleAddMessage = async () => {
    if (!newMessage.trim()) {
      ue.error("Please enter a message");
      return;
    }
    try {
      const nextOrder = sortedMessages.length > 0 ? Math.max(...sortedMessages.map((m) => Number(m.order))) + 1 : 0;
      await addMessage.mutateAsync({
        message: newMessage.trim(),
        order: BigInt(nextOrder),
        enabled: true
      });
      setNewMessage("");
      ue.success("Banner message added successfully");
    } catch (error) {
      ue.error(error.message || "Failed to add banner message");
    }
  };
  const handleUpdateMessage = async (order, message, enabled) => {
    try {
      await updateMessage.mutateAsync({ order, message, enabled });
      ue.success("Banner message updated");
      const orderNum = Number(order);
      setEditingMessages((prev) => {
        const newState = { ...prev };
        delete newState[orderNum];
        return newState;
      });
    } catch (error) {
      ue.error(error.message || "Failed to update banner message");
    }
  };
  const handleToggleEnabled = async (msg) => {
    try {
      await updateMessage.mutateAsync({
        order: msg.order,
        message: msg.message,
        enabled: !msg.enabled
      });
      ue.success(`Banner message ${!msg.enabled ? "enabled" : "disabled"}`);
    } catch (error) {
      ue.error(error.message || "Failed to toggle banner message");
    }
  };
  const handleDeleteMessage = async (order) => {
    if (!confirm("Are you sure you want to delete this banner message?")) {
      return;
    }
    try {
      await deleteMessage.mutateAsync(order);
      ue.success("Banner message deleted");
    } catch (error) {
      ue.error(error.message || "Failed to delete banner message");
    }
  };
  const handleMoveUp = async (index) => {
    if (index === 0) return;
    const current = sortedMessages[index];
    const previous = sortedMessages[index - 1];
    try {
      await updateMessage.mutateAsync({
        order: current.order,
        message: current.message,
        enabled: current.enabled
      });
      await updateMessage.mutateAsync({
        order: previous.order,
        message: previous.message,
        enabled: previous.enabled
      });
      ue.success("Message order updated");
    } catch (error) {
      ue.error(error.message || "Failed to reorder messages");
    }
  };
  const handleMoveDown = async (index) => {
    if (index === sortedMessages.length - 1) return;
    const current = sortedMessages[index];
    const next = sortedMessages[index + 1];
    try {
      await updateMessage.mutateAsync({
        order: current.order,
        message: current.message,
        enabled: current.enabled
      });
      await updateMessage.mutateAsync({
        order: next.order,
        message: next.message,
        enabled: next.enabled
      });
      ue.success("Message order updated");
    } catch (error) {
      ue.error(error.message || "Failed to reorder messages");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border admin-surface", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-48" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }, i)) }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border admin-surface", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-bottle-green-dark", children: "Marquee Banner Messages" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-bottle-green-medium mt-2", children: "Manage scrolling banner messages that appear below the header. Messages scroll continuously in the order shown below." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 p-4 rounded-lg border border-gold-medium/30 bg-beige-champagne/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "new-message",
            className: "text-bottle-green-dark font-semibold",
            children: "Add New Message"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "new-message",
              value: newMessage,
              onChange: (e) => setNewMessage(e.target.value),
              placeholder: "Enter banner message...",
              className: "flex-1 border-gold-medium/30",
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  handleAddMessage();
                }
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleAddMessage,
              disabled: addMessage.isPending || !newMessage.trim(),
              className: "bg-gold-medium hover:bg-gold-dark text-navy-dark",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
                "Add"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-bottle-green-dark font-semibold", children: [
          "Current Messages (",
          sortedMessages.length,
          ")"
        ] }),
        sortedMessages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-bottle-green-medium", children: "No banner messages yet. Add your first message above." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: sortedMessages.map((msg, index) => {
          const orderNum = Number(msg.order);
          const isEditing = orderNum in editingMessages;
          const editValue = isEditing ? editingMessages[orderNum] : msg.message;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `p-4 rounded-lg border ${msg.enabled ? "border-gold-medium/50 bg-beige-light/80" : "border-gray-300 bg-gray-100/50"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleMoveUp(index),
                      disabled: index === 0 || updateMessage.isPending,
                      className: "text-bottle-green-medium hover:text-bottle-green-dark disabled:opacity-30 disabled:cursor-not-allowed",
                      title: "Move up",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-4 w-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleMoveDown(index),
                      disabled: index === sortedMessages.length - 1 || updateMessage.isPending,
                      className: "text-bottle-green-medium hover:text-bottle-green-dark disabled:opacity-30 disabled:cursor-not-allowed",
                      title: "Move down",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-4 w-4 rotate-180" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-bottle-green-medium", children: [
                      "#",
                      index + 1
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        checked: msg.enabled,
                        onCheckedChange: () => handleToggleEnabled(msg),
                        disabled: updateMessage.isPending
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-bottle-green-medium", children: msg.enabled ? "Enabled" : "Disabled" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: editValue,
                      onChange: (e) => {
                        setEditingMessages((prev) => ({
                          ...prev,
                          [orderNum]: e.target.value
                        }));
                      },
                      className: "border-gold-medium/30",
                      placeholder: "Banner message..."
                    }
                  ),
                  isEditing && editValue !== msg.message && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      onClick: () => handleUpdateMessage(
                        msg.order,
                        editValue,
                        msg.enabled
                      ),
                      disabled: updateMessage.isPending || !editValue.trim(),
                      className: "bg-gold-medium hover:bg-gold-dark text-navy-dark",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3 w-3 mr-1" }),
                        "Save Changes"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: () => handleDeleteMessage(msg.order),
                    disabled: deleteMessage.isPending,
                    className: "text-destructive hover:text-destructive/80 hover:bg-destructive/10",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                  }
                )
              ] })
            },
            orderNum
          );
        }) })
      ] }),
      sortedMessages.filter((m) => m.enabled).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-bottle-green-dark font-semibold", children: "Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg overflow-hidden border border-gold-medium/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gradient-to-r from-gold-dark via-gold-medium to-gold-dark overflow-hidden relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marquee-container-preview", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marquee-content-preview", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "marquee-text-preview", children: sortedMessages.filter((m) => m.enabled).map((m) => m.message).join(" ✨ ") }) }) }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
          .marquee-container-preview {
            display: flex;
            overflow: hidden;
            user-select: none;
            gap: 0;
            padding: 0.75rem 0;
          }
          
          .marquee-content-preview {
            flex-shrink: 0;
            display: flex;
            justify-content: space-around;
            gap: 0;
            min-width: 100%;
            animation: scroll-left-preview 30s linear infinite;
          }
          
          .marquee-text-preview {
            font-size: 0.95rem;
            font-weight: 600;
            letter-spacing: 0.05em;
            color: oklch(var(--beige-light));
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            white-space: nowrap;
            padding: 0 2rem;
          }
          
          @keyframes scroll-left-preview {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        ` })
    ] })
  ] });
}
function AdminBannerPage() {
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-serif text-foreground", children: "Banner Management" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BannerManagement, {}) })
  ] });
}
export {
  AdminBannerPage as default
};
