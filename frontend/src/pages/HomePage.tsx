import { useGetProducts } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { toast } from 'sonner';
import HomeCarousel from '../components/HomeCarousel';
import HomeCategoryCarouselsSection from '../components/HomeCategoryCarouselsSection';

function formatINR(priceInCents: bigint): string {
  const amount = Number(priceInCents) / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function HomePage() {
  const { data: products = [], isLoading } = useGetProducts();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleAddToCart = (product: any) => {
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = (product: any) => {
    handleAddToCart(product);
    navigate({ to: '/cart' });
  };

  return (
    <div className="min-h-screen">
      {/* Homepage Carousel - 16:9 aspect ratio */}
      <div className="w-full">
        <HomeCarousel />
      </div>

      {/* Category Carousels Section */}
      <HomeCategoryCarouselsSection />

      {/* Product Catalog */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-serif font-bold text-center mb-8 text-bottle-green-dark">
          Our Products
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="aspect-square bg-muted" />
                <CardContent className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const firstImage = product.media.images[0];
              const imageUrl = firstImage ? firstImage.getDirectURL() : null;

              return (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-gold transition-shadow duration-300 border-gold-medium/20 bg-off-white"
                >
                  <div className="aspect-square relative overflow-hidden bg-beige-light">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <Eye className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-serif font-semibold text-lg text-bottle-green-dark line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-bottle-green-medium line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gold-dark">
                        {formatINR(product.priceInCents)}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
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
                        className="flex-1 bg-gold-medium hover:bg-gold-dark text-white customer-cta-btn"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => handleBuyNow(product)}
                        disabled={!product.inStock}
                        variant="outline"
                        className="flex-1 border-gold-medium text-bottle-green-dark hover:bg-gold-medium/10"
                        size="sm"
                      >
                        Buy Now
                      </Button>
                    </div>
                    <Button
                      onClick={() => navigate({ to: '/product/$productId', params: { productId: product.id } })}
                      variant="ghost"
                      className="w-full text-bottle-green-dark hover:text-gold-medium"
                      size="sm"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
