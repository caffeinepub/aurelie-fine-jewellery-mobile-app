import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Shield } from "lucide-react";
import React from "react";
import BoysHeaderCategoryNavManagement from "../../components/admin/BoysHeaderCategoryNavManagement";
import CategoryCarouselManagement from "../../components/admin/CategoryCarouselManagement";
import HeaderCategoryNavManagement from "../../components/admin/HeaderCategoryNavManagement";
import { useActor } from "../../hooks/useActor";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

const GIRL_CATEGORIES = [
  { slug: "rings", label: "Rings" },
  { slug: "earrings", label: "Earrings" },
  { slug: "necklace", label: "Necklace" },
  { slug: "anklets", label: "Anklets" },
  { slug: "bridal-jewellery", label: "Bridal Jewellery" },
  { slug: "lab-diamonds-jewellery", label: "Lab Diamonds Jewellery" },
];

const BOY_CATEGORIES = [
  { slug: "boys-chains", label: "Chains (For Him)" },
  { slug: "boys-bracelet", label: "Bracelet (For Him)" },
  { slug: "boys-rings", label: "Rings (For Him)" },
  { slug: "boys-lab-diamonds", label: "Lab Diamonds (For Him)" },
];

export default function AdminCategoriesPage() {
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

  if (!identity || (!adminLoading && !isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
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

  if (adminLoading || actorFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-gold/20 bg-card px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate({ to: "/admin" })}
            className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Dashboard</span>
          </button>
          <div className="h-4 w-px bg-border" />
          <h1 className="text-xl font-serif text-foreground">
            Category Management
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
        {/* Category Navigation */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-gold/20">
            For Her — Category Navigation
          </h2>
          <HeaderCategoryNavManagement />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-gold/20">
            For Him — Category Navigation
          </h2>
          <BoysHeaderCategoryNavManagement />
        </div>

        {/* Product Category Carousels — For Her */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-gold/20">
            For Her — Product Category Carousels
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Manage the 16:9 carousel images displayed on the homepage for each
            For Her product category.
          </p>
          <div className="space-y-6">
            {GIRL_CATEGORIES.map((cat) => (
              <CategoryCarouselManagement
                key={cat.slug}
                categorySlug={cat.slug}
                carouselIndex={1}
                title={`${cat.label} — Carousel`}
              />
            ))}
          </div>
        </div>

        {/* Product Category Carousels — For Him */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-gold/20">
            For Him — Product Category Carousels
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Manage the 16:9 carousel images displayed on the homepage for each
            For Him product category.
          </p>
          <div className="space-y-6">
            {BOY_CATEGORIES.map((cat) => (
              <CategoryCarouselManagement
                key={cat.slug}
                categorySlug={cat.slug}
                carouselIndex={1}
                title={`${cat.label} — Carousel`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
