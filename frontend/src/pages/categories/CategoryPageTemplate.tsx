import { useNavigate } from '@tanstack/react-router';
import { useGetProducts } from '../../hooks/useQueries';
import { Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { useCart } from '../../hooks/useCart';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import CustomerPageStyleScope from '../../components/CustomerPageStyleScope';
import MasonryProductGrid from '../../components/MasonryProductGrid';
import ProductFilterBar from '../../components/ProductFilterBar';
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
          <div className="container px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {categoryTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {categoryDescription}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        {!isLoading && categoryProducts.length > 0 && (
          <ProductFilterBar
            filters={filters}
            activeFilterCount={activeFilterCount}
            onMetalTypeChange={setMetalType}
            onPriceRangeChange={setPriceRange}
            onOccasionChange={setOccasion}
            onSortOrderChange={setSortOrder}
            onClearFilters={clearFilters}
            totalProducts={categoryProducts.length}
            filteredCount={filteredProducts.length}
          />
        )}

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
