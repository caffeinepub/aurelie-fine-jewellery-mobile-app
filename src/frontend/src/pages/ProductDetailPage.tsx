import { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useGetProduct } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCart } from '../hooks/useCart';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { ArrowLeft, ShoppingCart, Zap } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { productId } = useParams({ from: '/product/$productId' });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: product, isLoading } = useGetProduct(productId);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const isAuthenticated = !!identity;

  const formatINR = (priceInCents: bigint) => {
    const amount = Number(priceInCents) / 100;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    if (!product) return;

    if (!product.inStock) {
      toast.error('This product is currently out of stock');
      return;
    }

    addItem(product, quantity);
    toast.success(`Added ${quantity} item(s) to cart`);
    navigate({ to: '/cart' });
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.error('Please login to make a purchase');
      return;
    }

    if (!product) return;

    if (!product.inStock) {
      toast.error('This product is currently out of stock');
      return;
    }

    addItem(product, quantity);
    navigate({ to: '/checkout' });
  };

  if (isLoading) {
    return (
      <div className="container px-4 py-8">
        <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6 gap-2 text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Collection
        </Button>
        <div className="grid gap-8 lg:grid-cols-2">
          <Skeleton className="h-96 w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container px-4 py-8">
        <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6 gap-2 text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Collection
        </Button>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Product not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6 gap-2 text-foreground hover:text-accent">
        <ArrowLeft className="h-4 w-4" />
        Back to Collection
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg gold-border bg-bottle-green-light/20 shadow-gold">
          <img
            src={product.image.getDirectURL()}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="font-serif text-4xl font-bold tracking-tight gold-text">{product.name}</h1>
              {!product.inStock && (
                <Badge variant="secondary" className="bg-secondary text-secondary-foreground">Out of Stock</Badge>
              )}
            </div>
            <p className="text-3xl font-semibold gold-text">
              {formatINR(product.priceInCents)}
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-2 gold-text">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <Card className="gold-border bg-beige-light/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg gold-text">Purchase Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!product.inStock}
                    className="border-gold-medium hover:bg-gold-medium/20"
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.inStock}
                    className="border-gold-medium hover:bg-gold-medium/20"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gold-medium/30">
                <span className="font-semibold">Total:</span>
                <span className="text-2xl font-bold gold-text">
                  {formatINR(product.priceInCents * BigInt(quantity))}
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  variant="outline"
                  className="flex-1 gap-2 border-gold-medium hover:bg-gold-medium/20"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="flex-1 gap-2 gold-gradient text-secondary shadow-gold"
                  size="lg"
                >
                  <Zap className="h-5 w-5" />
                  Buy Now
                </Button>
              </div>

              {!isAuthenticated && (
                <p className="text-sm text-muted-foreground text-center">
                  Please login to make a purchase
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
