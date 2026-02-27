import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetProduct } from '../hooks/useQueries';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { toast } from 'sonner';
import ProductMediaCarousel from '../components/ProductMediaCarousel';
import CustomerPageStyleScope from '../components/CustomerPageStyleScope';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';

function formatINR(priceInCents: bigint): string {
  const amount = Number(priceInCents) / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProductDetailPage() {
  const { productId } = useParams({ from: '/product/$productId' });
  const navigate = useNavigate();
  const { data: product, isLoading } = useGetProduct(productId);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { addProduct } = useRecentlyViewed();

  // Track this product as recently viewed
  useEffect(() => {
    if (productId) {
      addProduct(productId);
    }
  }, [productId, addProduct]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    toast.success(`${quantity} × ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate({ to: '/cart' });
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  if (isLoading) {
    return (
      <CustomerPageStyleScope>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded" />
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-24 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </CustomerPageStyleScope>
    );
  }

  if (!product) {
    return (
      <CustomerPageStyleScope>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate({ to: '/' })}>Return to Home</Button>
        </div>
      </CustomerPageStyleScope>
    );
  }

  return (
    <CustomerPageStyleScope>
      <div className="min-h-screen">
        {/* Product Details */}
        <div className="container mx-auto px-4 py-12">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: '/' })}
            className="mb-6 text-bottle-green-dark hover:text-bottle-green-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Media Carousel */}
            <div>
              <ProductMediaCarousel media={product.media} productName={product.name} />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-serif font-bold text-bottle-green-dark mb-2">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold text-gold-dark">
                  {formatINR(product.priceInCents)}
                </p>
              </div>

              <div
                className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                  product.inStock
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </div>

              <Card className="border-gold-medium/30 bg-off-white">
                <CardContent className="p-6">
                  <h2 className="text-lg font-serif font-semibold mb-3 text-bottle-green-dark">
                    Description
                  </h2>
                  <p className="text-bottle-green-medium leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-medium text-bottle-green-dark">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={!product.inStock}
                    className="border-gold-medium/30"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold text-bottle-green-dark">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={!product.inStock}
                    className="border-gold-medium/30"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-gold-medium hover:bg-gold-dark text-white customer-cta-btn"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  variant="outline"
                  className="w-full border-gold-medium text-white hover:bg-gold-medium/10 customer-cta-btn"
                  size="lg"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerPageStyleScope>
  );
}
