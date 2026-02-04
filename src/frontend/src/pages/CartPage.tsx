import { useNavigate } from '@tanstack/react-router';
import { useCart } from '../hooks/useCart';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ShoppingCart, Trash2, Plus, Minus, Package } from 'lucide-react';

export default function CartPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();

  const isAuthenticated = !!identity;

  const formatINR = (priceInCents: number) => {
    const amount = priceInCents / 100;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!isAuthenticated) {
    return (
      <div className="container px-4 py-8">
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gold-medium" />
          <h2 className="text-2xl font-semibold mb-2 gold-text">Login Required</h2>
          <p className="text-muted-foreground">Please login to view your cart.</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container px-4 py-8">
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gold-medium" />
          <h2 className="text-2xl font-semibold mb-2 gold-text">Your Cart is Empty</h2>
          <p className="text-muted-foreground mb-6">Start shopping to add items to your cart.</p>
          <Button onClick={() => navigate({ to: '/' })} className="gold-gradient text-secondary shadow-gold">
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold tracking-tight mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">Review your items before checkout</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const firstImage = item.product.media.images[0];
            return (
              <Card key={item.product.id} className="overflow-hidden gold-border chrome-surface backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {firstImage ? (
                      <img
                        src={firstImage.getDirectURL()}
                        alt={item.product.name}
                        className="h-24 w-24 object-cover rounded border-2 border-gold-medium/30"
                      />
                    ) : (
                      <div className="h-24 w-24 flex items-center justify-center bg-muted rounded border-2 border-gold-medium/30">
                        <Package className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold gold-text mb-1">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {item.product.description}
                      </p>
                      <p className="text-lg font-semibold gold-text">
                        {formatINR(Number(item.product.priceInCents))}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="h-8 w-8 p-0 border-gold-medium"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="h-8 w-8 p-0 border-gold-medium"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <Card className="gold-border chrome-surface backdrop-blur sticky top-24">
            <CardHeader>
              <CardTitle className="gold-text">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatINR(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t border-gold-medium/30 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold gold-text">
                    {formatINR(getTotalPrice())}
                  </span>
                </div>
                <Button
                  onClick={() => navigate({ to: '/checkout' })}
                  className="w-full gold-gradient text-secondary shadow-gold"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
