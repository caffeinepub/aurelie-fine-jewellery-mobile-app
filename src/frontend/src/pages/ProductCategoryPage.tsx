import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetProducts } from '../hooks/useQueries';
import { Loader2, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner';
import { useCart } from '../hooks/useCart';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import CustomerPageStyleScope from '../components/CustomerPageStyleScope';
import CategoryImageCarousel from '../components/CategoryImageCarousel';
import { getCategoryBySlug, isValidCategorySlug } from '../utils/productCategories';

export default function ProductCategoryPage() {
  const { categorySlug } = useParams({ strict: false });
  const navigate = useNavigate();
  const { data: products, isLoading } = useGetProducts();
  const { addItem } = useCart();
  const { identity } = useInternetIdentity();

  const isAuthenticated = !!identity;

  // Validate category slug
  if (!categorySlug || !isValidCategorySlug(categorySlug)) {
    return (
      <CustomerPageStyleScope>
        <div className="container px-4 py-16 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The category you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate({ to: '/' })}>
            Back to Home
          </Button>
        </div>
      </CustomerPageStyleScope>
    );
  }

  const category = getCategoryBySlug(categorySlug);
  
  // Filter products by category
  const categoryProducts = products?.filter(
    (product) => product.category.toLowerCase() === categorySlug.toLowerCase()
  ) || [];

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
              {category?.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {category?.description}
            </p>
          </div>
        </div>

        {/* Category Carousels */}
        <div className="offwhite-surface pb-8">
          <div className="container px-4 space-y-8">
            <CategoryImageCarousel categorySlug={categorySlug} carouselIndex={1} />
            <CategoryImageCarousel categorySlug={categorySlug} carouselIndex={2} />
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
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center offwhite-surface">
                          <span className="text-muted-foreground">No image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(product.id);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="font-serif text-xl font-semibold mb-2 line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {product.description}
                        </p>
                        <p className="text-2xl font-bold gold-text">
                          {formatINR(product.priceInCents)}
                        </p>
                      </div>
                      <div className="flex gap-2" data-customer-control="true">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                          className="flex-1"
                          size="sm"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          onClick={() => handleBuyNow(product)}
                          disabled={!product.inStock}
                          variant="outline"
                          className="flex-1"
                          size="sm"
                        >
                          Buy Now
                        </Button>
                      </div>
                      {!product.inStock && (
                        <p className="text-sm text-destructive text-center">Out of Stock</p>
                      )}
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
