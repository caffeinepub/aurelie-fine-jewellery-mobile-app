import { useNavigate } from '@tanstack/react-router';
import { useGetProducts } from '../../hooks/useQueries';
import { useCart } from '../../hooks/useCart';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { ShoppingCart, Zap, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import CustomerPageStyleScope from '../../components/CustomerPageStyleScope';
import CategoryImageCarousel from '../../components/CategoryImageCarousel';

interface CategoryPageTemplateProps {
  categorySlug: string;
  title: string;
  description: string;
}

export default function CategoryPageTemplate({ categorySlug, title, description }: CategoryPageTemplateProps) {
  const navigate = useNavigate();
  const { data: products, isLoading } = useGetProducts();
  const { addItem } = useCart();
  const { identity } = useInternetIdentity();

  const isAuthenticated = !!identity;

  // Filter products by category
  const filteredProducts = products?.filter(
    (product) => product.category === categorySlug
  ) || [];

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    if (!product.inStock) {
      toast.error('This product is currently out of stock');
      return;
    }
    addItem(product, 1);
    toast.success('Added to cart');
  };

  const handleBuyNow = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please login to make a purchase');
      return;
    }
    navigate({ to: '/product/$productId', params: { productId } });
  };

  const formatINR = (priceInCents: bigint) => {
    const amount = Number(priceInCents) / 100;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <CustomerPageStyleScope>
      <div className="container px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/' })}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-semibold tracking-tight mb-3">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {description}
          </p>
        </div>

        {/* Two Carousels Stacked */}
        <div className="space-y-8 mb-12">
          <CategoryImageCarousel categorySlug={categorySlug} carouselIndex={1} />
          <CategoryImageCarousel categorySlug={categorySlug} carouselIndex={2} />
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden gold-border">
                <Skeleton className="h-64 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const firstImage = product.media.images[0];

              return (
                <Card
                  key={product.id}
                  className="group overflow-hidden transition-all hover:shadow-gold cursor-pointer gold-border chrome-surface backdrop-blur"
                  onClick={() => navigate({ to: '/product/$productId', params: { productId: product.id } })}
                >
                  <div className="relative overflow-hidden bg-bottle-green-light/20">
                    {firstImage ? (
                      <img
                        src={firstImage.getDirectURL()}
                        alt={product.name}
                        className="h-64 w-full object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="h-64 w-full flex items-center justify-center bg-muted">
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}
                    {!product.inStock && (
                      <Badge variant="secondary" className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="font-serif text-xl gold-text">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-2xl font-semibold gold-text mt-3">
                      {formatINR(product.priceInCents)}
                    </p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 gap-2 border-gold-medium hover:bg-gold-medium/20"
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 gap-2 gold-gradient text-secondary shadow-gold"
                      onClick={(e) => handleBuyNow(e, product.id)}
                      disabled={!product.inStock}
                    >
                      <Zap className="h-4 w-4" />
                      Buy Now
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products available in this category at the moment.</p>
          </div>
        )}
      </div>
    </CustomerPageStyleScope>
  );
}
