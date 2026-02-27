import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetProducts } from '../../hooks/useQueries';
import { Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { useCart } from '../../hooks/useCart';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import CustomerPageStyleScope from '../../components/CustomerPageStyleScope';
import MasonryProductGrid from '../../components/MasonryProductGrid';
import FilterIconButton from '../../components/FilterIconButton';
import FilterPanel from '../../components/FilterPanel';
import HeaderCategoryNav from '../../components/HeaderCategoryNav';
import { useProductFilters } from '../../hooks/useProductFilters';
import type { Product } from '../../backend';

interface CategoryPageTemplateProps {
  categorySlug: string;
  categoryTitle: string;
  categoryDescription: string;
  genderFilter?: 'boys' | 'girls';
}

export default function CategoryPageTemplate({
  categorySlug,
  categoryTitle,
  categoryDescription,
  genderFilter,
}: CategoryPageTemplateProps) {
  const navigate = useNavigate();
  const { data: products, isLoading } = useGetProducts();
  const { addItem } = useCart();
  const { identity } = useInternetIdentity();
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const isAuthenticated = !!identity;

  // Filter products by category and optionally by gender first
  const categoryProducts: Product[] = products?.filter((product) => {
    const categoryMatch = product.category.toLowerCase() === categorySlug.toLowerCase();
    if (!categoryMatch) return false;
    if (genderFilter) {
      const productGender = product.gender as unknown as string;
      return productGender === genderFilter;
    }
    return true;
  }) || [];

  // Apply live filters on top of category products
  const {
    filters,
    filteredProducts,
    activeFilterCount,
    setMetalType,
    setPriceRange,
    setOccasion,
    setSortOrder,
    clearFilters,
  } = useProductFilters(categoryProducts);

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to cart');
      return;
    }
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = (product: Product) => {
    if (!isAuthenticated) {
      toast.error('Please log in to purchase');
      return;
    }
    addItem(product, 1);
    navigate({ to: '/checkout' });
  };

  return (
    <CustomerPageStyleScope>
      <div className="min-h-screen">
        {/* Category Navigation Bar */}
        <HeaderCategoryNav forceShow />

        {/* Category Header */}
        <div className="offwhite-surface py-12 md:py-16">
          <div className="container px-4">
            <div className="flex items-start justify-between gap-4">
              <div className="text-center flex-1">
                <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  {categoryTitle}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {categoryDescription}
                </p>
              </div>
              {/* Filter Icon Button */}
              {!isLoading && categoryProducts.length > 0 && (
                <div className="shrink-0 pt-2">
                  <FilterIconButton
                    activeFilterCount={activeFilterCount}
                    onClick={() => setFilterPanelOpen(true)}
                  />
                </div>
              )}
            </div>

            {/* Active filter summary */}
            {activeFilterCount > 0 && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>
                  Showing {filteredProducts.length} of {categoryProducts.length} products
                </span>
                <button
                  onClick={clearFilters}
                  className="text-gold-dark hover:text-gold-medium underline text-xs"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter Panel (Sheet overlay) */}
        <FilterPanel
          open={filterPanelOpen}
          onOpenChange={setFilterPanelOpen}
          filters={filters}
          activeFilterCount={activeFilterCount}
          totalProducts={categoryProducts.length}
          filteredCount={filteredProducts.length}
          onMetalTypeChange={setMetalType}
          onPriceRangeChange={setPriceRange}
          onOccasionChange={setOccasion}
          onSortOrderChange={setSortOrder}
          onClearFilters={clearFilters}
        />

        {/* Products Masonry Grid */}
        <div className="offwhite-surface py-8 md:py-12">
          <div className="container px-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-gold-medium" />
              </div>
            ) : categoryProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-8">
                  No products available in this category yet.
                </p>
                <Button onClick={() => navigate({ to: '/' })}>
                  Browse All Products
                </Button>
              </div>
            ) : (
              <MasonryProductGrid
                products={filteredProducts}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            )}
          </div>
        </div>
      </div>
    </CustomerPageStyleScope>
  );
}
