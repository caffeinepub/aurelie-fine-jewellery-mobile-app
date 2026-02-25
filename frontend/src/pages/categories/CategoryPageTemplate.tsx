import { useNavigate } from '@tanstack/react-router';
import { useGetProducts } from '../../hooks/useQueries';
import { Loader2, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { toast } from 'sonner';
import { useCart } from '../../hooks/useCart';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import CustomerPageStyleScope from '../../components/CustomerPageStyleScope';
import { Gender } from '../../backend';

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

  // Filter products by category and optionally by gender
  const categoryProducts = products?.filter((product) => {
    const categoryMatch = product.category.toLowerCase() === categorySlug.toLowerCase();
    if (!categoryMatch) return false;
    if (genderFilter) {
      // Gender is a TypeScript enum with string values "boys" | "girls"
      const productGender = product.gender as unknown as string;
      return productGender === genderFilter;
    }
    return true;
  }) || [];

  const handleAddToCart = (product: any) => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to cart');
      return;
    }
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = (product: any) => {
    if (!isAuthenticated) {
      toast.error('Please log in to purchase');
      return;
    }
    addItem(product, 1);
    navigate({ to: '/checkout' });
  };

  const handleViewDetails = (productId: string) => {
    navigate({ to: `/product/${productId}` });
  };

  const formatINR = (priceInCents: bigint): string => {
    const priceInRupees = Number(priceInCents) / 100;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(priceInRupees);
  };

  return (
    <CustomerPageStyleScope>
      <div className="min-h-screen">
        {/* Category Header */}
        <div className="offwhite-surface py-16">
          <div className="container px-4 text-center">
            <h1 className="font-serif text-5xl font-bold tracking-tight mb-4">
              {categoryTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {categoryDescription}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="offwhite-surface py-16">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {categoryProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden gold-border offwhite-surface hover:shadow-gold transition-all duration-300"
                  >
                    <div
                      className="relative aspect-square overflow-hidden cursor-pointer offwhite-surface"
                      onClick={() => handleViewDetails(product.id)}
                    >
                      {product.media.images.length > 0 ? (
                        <img
                          src={product.media.images[0].getDirectURL()}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <Eye className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="font-serif text-xl font-semibold tracking-tight line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                          {product.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold gold-text">
                          {formatINR(product.priceInCents)}
                        </span>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            product.inStock
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                          className="flex-1 customer-cta-btn"
                          size="sm"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          onClick={() => handleBuyNow(product)}
                          disabled={!product.inStock}
                          variant="outline"
                          className="flex-1 border-gold-medium hover:bg-gold-medium/10"
                          size="sm"
                        >
                          Buy Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </CustomerPageStyleScope>
  );
}
