import { useNavigate } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { XCircle, Home, ShoppingCart } from 'lucide-react';
import CustomerPageStyleScope from '../components/CustomerPageStyleScope';

export default function PaymentFailurePage() {
  const navigate = useNavigate();

  return (
    <CustomerPageStyleScope>
      <div className="min-h-screen flex items-center justify-center p-4" data-checkout-scope>
        <Card className="w-full max-w-md gold-border off-white-surface">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-10 w-10 text-red-600 shrink-0" />
            </div>
            <CardTitle className="text-2xl font-serif">Payment Failed</CardTitle>
            <CardDescription className="text-base">
              Unfortunately, your payment could not be processed. Please try again or contact support if the issue persists.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => navigate({ to: '/cart' })}
              className="w-full"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Return to Cart
            </Button>
            <Button
              onClick={() => navigate({ to: '/' })}
              variant="outline"
              className="w-full border-gold-medium hover:bg-gold-medium/10"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </CustomerPageStyleScope>
  );
}
