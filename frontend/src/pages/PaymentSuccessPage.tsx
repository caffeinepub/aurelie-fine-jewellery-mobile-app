import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle2, Package, Home } from 'lucide-react';
import CustomerPageStyleScope from '../components/CustomerPageStyleScope';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <CustomerPageStyleScope>
      <div className="container px-4 py-16 max-w-3xl mx-auto" data-checkout-scope="true">
        <Card className="gold-border offwhite-surface backdrop-blur-sm shadow-elegant">
          <CardHeader className="text-center pt-12 pb-6">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-600" />
              </div>
            </div>
            <CardTitle className="text-4xl font-serif gold-text mb-4">
              Payment Successful!
            </CardTitle>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </CardHeader>
          <CardContent className="pb-12 space-y-6">
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
              <div className="flex gap-4">
                <Package className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-emerald-900 mb-2">What's Next?</h3>
                  <ul className="text-sm text-emerald-800 space-y-2">
                    <li>• You will receive an order confirmation email shortly</li>
                    <li>• Track your order status in your dashboard</li>
                    <li>• We'll notify you when your order ships</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={() => navigate({ to: '/dashboard' })}
                className="flex-1 h-12"
                size="lg"
              >
                <Package className="h-5 w-5 mr-2" />
                View Orders
              </Button>
              <Button
                onClick={() => navigate({ to: '/' })}
                variant="outline"
                className="flex-1 h-12"
                size="lg"
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerPageStyleScope>
  );
}
