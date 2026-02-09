import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useCart } from '../hooks/useCart';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCreateOrder, useGetCallerUserProfile } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Loader2, CreditCard, ShieldCheck, Lock, CheckCircle2, MapPin, User, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';
import type { OrderCreate, ShippingAddress } from '../backend';
import CustomerPageStyleScope from '../components/CustomerPageStyleScope';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { items, getTotalPrice, clearCart } = useCart();
  const createOrder = useCreateOrder();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  
  const [checkoutStep, setCheckoutStep] = useState<'address' | 'payment'>('address');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Shipping address form state
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const isAuthenticated = !!identity;

  // Load user profile data into shipping address form
  useEffect(() => {
    if (userProfile) {
      setShippingAddress({
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone,
        address: userProfile.address,
      });
    }
  }, [userProfile]);

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
    navigate({ to: '/' });
    return null;
  }

  if (items.length === 0) {
    navigate({ to: '/cart' });
    return null;
  }

  const handleConfirmAddress = () => {
    // Validate shipping address
    if (!shippingAddress.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!shippingAddress.email.trim()) {
      toast.error('Please enter your email');
      return;
    }
    if (!shippingAddress.phone.trim()) {
      toast.error('Please enter your phone number');
      return;
    }
    if (!shippingAddress.address.trim()) {
      toast.error('Please enter your shipping address');
      return;
    }

    // Proceed to payment step
    setCheckoutStep('payment');
    toast.success('Shipping address confirmed');
  };

  const handlePayment = async () => {
    if (!upiId.trim()) {
      toast.error('Please enter your UPI ID');
      return;
    }

    if (!identity) return;

    setIsProcessing(true);

    try {
      // Create orders for each item in cart
      for (const item of items) {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const shippingAddressData: ShippingAddress = {
          name: shippingAddress.name.trim(),
          email: shippingAddress.email.trim(),
          phone: shippingAddress.phone.trim(),
          address: shippingAddress.address.trim(),
        };

        const orderInput: OrderCreate = {
          id: orderId,
          customer: identity.getPrincipal(),
          productId: item.product.id,
          quantity: BigInt(item.quantity),
          totalPriceInCents: item.product.priceInCents * BigInt(item.quantity),
          upiId: upiId.trim(),
          shippingAddress: shippingAddressData,
        };

        await createOrder.mutateAsync(orderInput);
      }

      clearCart();
      toast.success('Order placed successfully! Payment pending via UPI.');
      navigate({ to: '/dashboard' });
    } catch (error: any) {
      console.error('Order creation error:', error);
      toast.error(error.message || 'Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <CustomerPageStyleScope>
      <div className="container px-4 py-12 max-w-7xl mx-auto" data-customer-control="true">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl font-bold tracking-tight mb-4">
            Secure Checkout
          </h1>
          <p className="text-lg gold-text font-medium">
            Complete your purchase with confidence
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-gold-medium" />
              <span className="text-sm font-medium gold-text">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-gold-medium" />
              <span className="text-sm font-medium gold-text">Encrypted</span>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                checkoutStep === 'address' 
                  ? 'gold-gradient text-white' 
                  : 'bg-gold-medium text-white'
              }`}>
                1
              </div>
              <span className={`font-medium ${checkoutStep === 'address' ? 'gold-text' : 'text-muted-foreground'}`}>
                Shipping Address
              </span>
            </div>
            <div className="w-16 h-1 bg-gold-medium/30" />
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                checkoutStep === 'payment' 
                  ? 'gold-gradient text-white' 
                  : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <span className={`font-medium ${checkoutStep === 'payment' ? 'gold-text' : 'text-muted-foreground'}`}>
                Payment
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-3 space-y-6">
            {/* Shipping Address Step */}
            {checkoutStep === 'address' && (
              <Card className="gold-border chrome-surface backdrop-blur-sm shadow-elegant">
                <CardHeader className="border-b border-gold-medium/20 bg-gradient-to-r from-bottle-green-light/20 to-bottle-green-medium/20">
                  <CardTitle className="gold-text flex items-center gap-3 text-2xl">
                    <div className="p-2 rounded-lg bg-gold-gradient">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    Confirm Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-8 space-y-6">
                  {profileLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-gold-medium" />
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-base font-semibold gold-text flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={shippingAddress.name}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                          className="h-12 text-base border-2 border-gold-medium/30 focus:border-gold-medium focus:ring-gold-medium/20 bg-ivory-base/30"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-base font-semibold gold-text flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={shippingAddress.email}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                          className="h-12 text-base border-2 border-gold-medium/30 focus:border-gold-medium focus:ring-gold-medium/20 bg-ivory-base/30"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="phone" className="text-base font-semibold gold-text flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          value={shippingAddress.phone}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                          className="h-12 text-base border-2 border-gold-medium/30 focus:border-gold-medium focus:ring-gold-medium/20 bg-ivory-base/30"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="address" className="text-base font-semibold gold-text flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Shipping Address
                        </Label>
                        <textarea
                          id="address"
                          placeholder="Enter your complete shipping address"
                          value={shippingAddress.address}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-3 text-base border-2 border-gold-medium/30 rounded-md focus:border-gold-medium focus:ring-2 focus:ring-gold-medium/20 bg-ivory-base/30 resize-none text-foreground"
                        />
                      </div>

                      <div className="bg-bottle-green-dark/5 border-l-4 border-gold-medium p-4 rounded-r-lg">
                        <div className="flex gap-3">
                          <CheckCircle2 className="h-5 w-5 text-gold-medium flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm gold-text mb-1">
                              Verify Your Details
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Please ensure your shipping address is correct. Your order will be delivered to this address.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleConfirmAddress}
                        className="w-full h-14 text-lg font-semibold gold-gradient text-white shadow-gold hover:shadow-gold/70 transition-all duration-300 hover:scale-[1.02]"
                        size="lg"
                      >
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        Confirm Shipping Address
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Payment Step */}
            {checkoutStep === 'payment' && (
              <>
                {/* Confirmed Address Display */}
                <Card className="gold-border chrome-surface backdrop-blur-sm shadow-elegant">
                  <CardHeader className="border-b border-gold-medium/20 bg-gradient-to-r from-bottle-green-light/20 to-bottle-green-medium/20">
                    <div className="flex items-center justify-between">
                      <CardTitle className="gold-text flex items-center gap-3 text-xl">
                        <MapPin className="h-5 w-5 text-gold-medium" />
                        Shipping To
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCheckoutStep('address')}
                        className="text-gold-medium hover:text-gold-dark"
                      >
                        Edit
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-2 text-sm">
                      <p className="font-semibold text-gold-light">{shippingAddress.name}</p>
                      <p className="text-muted-foreground">{shippingAddress.email}</p>
                      <p className="text-muted-foreground">{shippingAddress.phone}</p>
                      <p className="text-muted-foreground">{shippingAddress.address}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* UPI Payment Card */}
                <Card className="gold-border chrome-surface backdrop-blur-sm shadow-elegant">
                  <CardHeader className="border-b border-gold-medium/20 bg-gradient-to-r from-bottle-green-light/20 to-bottle-green-medium/20">
                    <CardTitle className="gold-text flex items-center gap-3 text-2xl">
                      <div className="p-2 rounded-lg bg-gold-gradient">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      UPI Payment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="upiId" className="text-base font-semibold gold-text">
                        Enter Your UPI ID
                      </Label>
                      <Input
                        id="upiId"
                        type="text"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="h-14 text-lg border-2 border-gold-medium/30 focus:border-gold-medium focus:ring-gold-medium/20 bg-ivory-base/30"
                      />
                      <p className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-gold-medium mt-0.5 flex-shrink-0" />
                        <span>
                          Enter your UPI ID to complete the payment. You will receive a secure payment request on your UPI app.
                        </span>
                      </p>
                    </div>

                    <Separator className="bg-gold-medium/20" />

                    {/* Order Items Preview */}
                    <div className="space-y-4">
                      <h3 className="font-serif text-xl font-semibold gold-text">
                        Order Summary
                      </h3>
                      <div className="bg-gradient-to-br from-ivory-base/40 to-chrome-base/20 p-6 rounded-xl border-2 border-gold-medium/20 space-y-3">
                        {items.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex justify-between items-center py-3 border-b border-gold-medium/10 last:border-0"
                          >
                            <div className="flex-1">
                              <p className="font-semibold text-gold-light">
                                {item.product.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                            <span className="font-bold text-lg gold-text">
                              {formatINR(Number(item.product.priceInCents) * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div className="bg-bottle-green-dark/5 border-l-4 border-gold-medium p-4 rounded-r-lg">
                      <div className="flex gap-3">
                        <ShieldCheck className="h-5 w-5 text-gold-medium flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm gold-text mb-1">
                            Secure Transaction
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Your payment information is encrypted and secure. We never store your UPI credentials.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-2">
            <Card className="gold-border chrome-surface backdrop-blur-sm shadow-gold sticky top-24">
              <CardHeader className="border-b border-gold-medium/20 bg-gradient-to-br from-bottle-green-dark to-bottle-green-medium">
                <CardTitle className="text-gold-lightest text-2xl font-serif">
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Price Breakdown */}
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatINR(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-gold-medium">Free</span>
                  </div>
                  <Separator className="bg-gold-medium/20" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold gold-text">
                      {formatINR(getTotalPrice())}
                    </span>
                  </div>
                </div>

                {/* Complete Payment Button */}
                {checkoutStep === 'payment' && (
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing || !upiId.trim()}
                    className="w-full h-14 text-lg font-semibold gold-gradient text-white shadow-gold hover:shadow-gold/70 transition-all duration-300 hover:scale-[1.02]"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5 mr-2" />
                        Complete Payment
                      </>
                    )}
                  </Button>
                )}

                {/* Trust Badges */}
                <div className="pt-6 border-t border-gold-medium/20">
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="h-4 w-4 text-gold-medium" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Lock className="h-4 w-4 text-gold-medium" />
                      <span>Encrypted</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CustomerPageStyleScope>
  );
}
