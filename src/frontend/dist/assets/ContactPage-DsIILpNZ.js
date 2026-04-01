import { k as useInternetIdentity, n as useSubmitInquiry, r as reactExports, j as jsxRuntimeExports, B as Button, h as ue } from "./index-aj0lqbRn.js";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from "./card-scimD28y.js";
import { I as Input } from "./input-HIqWFnkP.js";
import { L as Label } from "./label-DQfuwohG.js";
import { T as Textarea } from "./textarea-BHCqC9cH.js";
import { M as Mail } from "./mail-DDYTRs8j.js";
import { L as LoaderCircle } from "./loader-circle-8zVxuiuX.js";
import { S as Send } from "./send-VkjL9WPF.js";
function ContactPage() {
  const { identity } = useInternetIdentity();
  const submitInquiry = useSubmitInquiry();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [message, setMessage] = reactExports.useState("");
  const isAuthenticated = !!identity;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      ue.error("Please fill in all fields");
      return;
    }
    if (!identity) {
      ue.error("Please login to submit an inquiry");
      return;
    }
    try {
      const inquiry = {
        id: `inquiry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        customer: identity.getPrincipal(),
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        response: void 0
      };
      await submitInquiry.mutateAsync(inquiry);
      ue.success("Inquiry submitted successfully! We will respond soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
      ue.error(error.message || "Failed to submit inquiry");
    }
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-16 w-16 mx-auto mb-4 text-gold-medium" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold mb-2 gold-text", children: "Login Required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Please login to contact us." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl font-semibold tracking-tight mb-2", children: "Contact Us" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Have a question? We're here to help." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "gold-border chrome-surface backdrop-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "gold-text flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-5 w-5" }),
          "Send us a message"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "gold-text opacity-70", children: "Fill out the form below and we'll get back to you as soon as possible" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "gold-text", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Your full name",
              className: "border-gold-medium/30 gold-text bg-ivory-base/30",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "gold-text", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "email",
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "your.email@example.com",
              className: "border-gold-medium/30 gold-text bg-ivory-base/30",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "message", className: "gold-text", children: "Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "message",
              value: message,
              onChange: (e) => setMessage(e.target.value),
              placeholder: "Tell us how we can help you...",
              rows: 6,
              className: "border-gold-medium/30 gold-text bg-ivory-base/30",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full gold-gradient text-secondary shadow-gold",
            disabled: submitInquiry.isPending,
            children: submitInquiry.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }),
              "Sending..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4 mr-2" }),
              "Send Message"
            ] })
          }
        )
      ] }) })
    ] }) })
  ] });
}
export {
  ContactPage as default
};
