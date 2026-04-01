import { a as useNavigate, k as useInternetIdentity, m as useGetCallerUserProfile, K as useSaveCallerUserProfile, r as reactExports, j as jsxRuntimeExports, B as Button, h as ue } from "./index-aj0lqbRn.js";
import { C as CustomerPageStyleScope } from "./CustomerPageStyleScope-DzIK5pre.js";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from "./card-scimD28y.js";
import { I as Input } from "./input-HIqWFnkP.js";
import { L as Label } from "./label-DQfuwohG.js";
import { L as LoaderCircle } from "./loader-circle-8zVxuiuX.js";
import { A as ArrowLeft } from "./arrow-left-YTOjLTCh.js";
import { S as Save } from "./save-Df_x20ll.js";
function ProfileDetailsPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const [formData, setFormData] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: ""
  });
  const [hasChanges, setHasChanges] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!identity && !profileLoading) {
      navigate({ to: "/" });
    }
  }, [identity, profileLoading, navigate]);
  reactExports.useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        address: userProfile.address || "",
        dob: userProfile.dob || ""
      });
    }
  }, [userProfile]);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };
  const handleSave = async () => {
    if (!formData.name.trim()) {
      ue.error("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      ue.error("Email is required");
      return;
    }
    if (!formData.phone.trim()) {
      ue.error("Phone number is required");
      return;
    }
    if (!formData.address.trim()) {
      ue.error("Address is required");
      return;
    }
    try {
      await saveProfile.mutateAsync(formData);
      ue.success("Profile updated successfully");
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      ue.error(error.message || "Failed to save profile");
    }
  };
  if (!identity) {
    return null;
  }
  if (profileLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerPageStyleScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-gold-medium" }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerPageStyleScope, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        onClick: () => navigate({ to: "/dashboard" }),
        className: "mb-6 text-bottle-green-dark hover:text-bottle-green-medium",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
          "Back to Dashboard"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-gold-medium/30 shadow-elegant", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-serif text-bottle-green-dark", children: "Profile Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-bottle-green-medium", children: "View and edit your personal information" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "name",
              className: "text-bottle-green-dark font-medium",
              children: "Name *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              value: formData.name,
              onChange: (e) => handleInputChange("name", e.target.value),
              placeholder: "Enter your full name",
              className: "border-gold-medium/30 focus:border-gold-medium"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "email",
              className: "text-bottle-green-dark font-medium",
              children: "Email *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "email",
              type: "email",
              value: formData.email,
              onChange: (e) => handleInputChange("email", e.target.value),
              placeholder: "Enter your email address",
              className: "border-gold-medium/30 focus:border-gold-medium"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "phone",
              className: "text-bottle-green-dark font-medium",
              children: "Phone Number *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "phone",
              type: "tel",
              value: formData.phone,
              onChange: (e) => handleInputChange("phone", e.target.value),
              placeholder: "Enter your phone number",
              className: "border-gold-medium/30 focus:border-gold-medium"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "address",
              className: "text-bottle-green-dark font-medium",
              children: "Shipping Address *"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "address",
              value: formData.address,
              onChange: (e) => handleInputChange("address", e.target.value),
              placeholder: "Enter your full address",
              className: "border-gold-medium/30 focus:border-gold-medium"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "dob",
              className: "text-bottle-green-dark font-medium",
              children: "Date of Birth"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "dob",
              type: "date",
              value: formData.dob,
              onChange: (e) => handleInputChange("dob", e.target.value),
              className: "border-gold-medium/30 focus:border-gold-medium"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSave,
              disabled: !hasChanges || saveProfile.isPending,
              className: "flex-1 bg-gold-medium hover:bg-gold-dark text-silver-oxidized",
              children: saveProfile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                "Saving..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-2" }),
                "Save Changes"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => navigate({ to: "/dashboard" }),
              className: "border-gold-medium/30 text-bottle-green-dark hover:bg-gold-medium/10",
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
export {
  ProfileDetailsPage as default
};
