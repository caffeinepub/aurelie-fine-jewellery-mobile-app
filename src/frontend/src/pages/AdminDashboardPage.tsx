import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  FileText,
  Image,
  Megaphone,
  MessageSquare,
  Package,
  Shield,
  ShoppingCart,
  Tag,
} from "lucide-react";
import React from "react";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();

  const { data: isAdmin, isLoading: adminLoading } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
  });

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gold mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-foreground mb-2">
            Authentication Required
          </h2>
          <p className="text-muted-foreground">
            Please log in to access the admin panel.
          </p>
        </div>
      </div>
    );
  }

  if (adminLoading || actorFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-center">
          <Shield className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-foreground mb-2">
            Access Denied
          </h2>
          <p className="text-muted-foreground">
            You do not have admin privileges.
          </p>
        </div>
      </div>
    );
  }

  const adminSections = [
    {
      label: "Products",
      description: "Manage product inventory, add, edit, or remove products",
      icon: Package,
      route: "/admin/products",
      color: "text-gold",
    },
    {
      label: "Orders",
      description: "View and manage customer orders, update order status",
      icon: ShoppingCart,
      route: "/admin/orders",
      color: "text-gold",
    },
    {
      label: "Inquiries",
      description: "View and respond to customer inquiries and messages",
      icon: MessageSquare,
      route: "/admin/inquiries",
      color: "text-gold",
    },
    {
      label: "Site Content",
      description: "Edit contact details, policies, social links, and about us",
      icon: FileText,
      route: "/admin/site-content",
      color: "text-gold",
    },
    {
      label: "Carousel",
      description: "Manage homepage carousel slides, images, and links",
      icon: Image,
      route: "/admin/carousel",
      color: "text-gold",
    },
    {
      label: "Banner",
      description: "Manage marquee banner messages shown across the site",
      icon: Megaphone,
      route: "/admin/banner",
      color: "text-gold",
    },
    {
      label: "Categories",
      description: "Edit category images, names, and navigation settings",
      icon: Tag,
      route: "/admin/categories",
      color: "text-gold",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-gold" />
            <h1 className="text-4xl font-serif text-foreground">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Select a section below to manage your store
          </p>
          <div className="w-24 h-0.5 bg-gold mx-auto mt-4" />
        </div>

        {/* Navigation Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                type="button"
                key={section.route}
                onClick={() => navigate({ to: section.route })}
                className="group flex flex-col items-start p-6 bg-card border border-gold/30 rounded-lg hover:border-gold hover:shadow-lg hover:shadow-gold/10 transition-all duration-200 text-left"
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="p-2 bg-gold/10 rounded-md">
                    <Icon className={`w-6 h-6 ${section.color}`} />
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all duration-200" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {section.label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {section.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
