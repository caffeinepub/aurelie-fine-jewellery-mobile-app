import { useState } from 'react';
import { useGetCustomerOrders, useGetCustomerInquiries } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { Button } from '../components/ui/button';
import { Package, MessageSquare, Clock, CheckCircle, Truck, Home, Mail, XCircle } from 'lucide-react';
import { Order } from '../backend';
import { useNavigate } from '@tanstack/react-router';
import OrderDetailModal from '../components/OrderDetailModal';

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, variant: 'secondary' as const },
  confirmed: { label: 'Confirmed', icon: CheckCircle, variant: 'default' as const },
  shipped: { label: 'Shipped', icon: Truck, variant: 'default' as const },
  delivered: { label: 'Delivered', icon: Home, variant: 'outline' as const },
  cancelled: { label: 'Cancelled', icon: XCircle, variant: 'destructive' as const },
};

export default function CustomerDashboardPage() {
  const { identity } = useInternetIdentity();
  const { data: orders, isLoading: ordersLoading } = useGetCustomerOrders();
  const { data: inquiries, isLoading: inquiriesLoading } = useGetCustomerInquiries();
  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

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

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setOrderModalOpen(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="container px-4 py-8">
        <div className="text-center py-12">
          <Package className="h-16 w-16 mx-auto mb-4 text-gold-medium" />
          <h2 className="text-2xl font-semibold mb-2 gold-text">Login Required</h2>
          <p className="text-muted-foreground">Please login to view your dashboard.</p>
        </div>
      </div>
    );
  }

  const getStatusInfo = (order: Order) => {
    if (order.status.__kind__ === 'cancelled') {
      return statusConfig.cancelled;
    }
    return statusConfig[order.status.__kind__ as keyof typeof statusConfig] || statusConfig.pending;
  };

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold tracking-tight mb-2">My Dashboard</h1>
        <p className="text-muted-foreground">Track your orders and inquiries</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card className="gold-border bg-beige-light/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium gold-text">My Orders</CardTitle>
            <Package className="h-4 w-4 text-gold-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gold-text">{orders?.length || 0}</div>
          </CardContent>
        </Card>

        <Card className="gold-border bg-beige-light/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium gold-text">My Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-gold-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gold-text">{inquiries?.length || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-bottle-green-medium/20 border border-gold-medium/30">
          <TabsTrigger value="orders" className="gold-text data-[state=active]:bg-gold-medium data-[state=active]:text-secondary">
            My Orders
          </TabsTrigger>
          <TabsTrigger value="inquiries" className="gold-text data-[state=active]:bg-gold-medium data-[state=active]:text-secondary">
            My Inquiries
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          {ordersLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i} className="gold-border">
                  <CardHeader>
                    <Skeleton className="h-6 w-1/3" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : orders && orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => {
                const statusInfo = getStatusInfo(order);
                const StatusIcon = statusInfo.icon;

                return (
                  <Card 
                    key={order.id} 
                    className="overflow-hidden gold-border bg-beige-light/80 backdrop-blur shadow-gold cursor-pointer hover:shadow-gold-lg transition-shadow"
                    onClick={() => handleOrderClick(order)}
                  >
                    <CardHeader className="bg-bottle-green-medium/20">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-medium gold-text">Order #{order.id.slice(-8)}</CardTitle>
                        <Badge variant={statusInfo.variant} className="gap-1 bg-gold-medium text-secondary">
                          <StatusIcon className="h-3 w-3" />
                          {statusInfo.label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Product ID</p>
                          <p className="font-medium">{order.productId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Quantity</p>
                          <p className="font-medium">{order.quantity.toString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                          <p className="text-xl font-semibold gold-text">
                            {formatINR(order.totalPriceInCents)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">UPI ID</p>
                          <p className="font-medium">{order.upiId}</p>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-muted-foreground">
                        Click to view details and manage order
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-16 w-16 mx-auto mb-4 text-gold-medium" />
              <h2 className="text-2xl font-semibold mb-2 gold-text">No Orders Yet</h2>
              <p className="text-muted-foreground mb-6">Start shopping to see your orders here.</p>
              <Button onClick={() => navigate({ to: '/' })} className="gold-gradient text-secondary shadow-gold">
                Browse Products
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="inquiries">
          {inquiriesLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i} className="gold-border">
                  <CardHeader>
                    <Skeleton className="h-6 w-1/3" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : inquiries && inquiries.length > 0 ? (
            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <Card key={inquiry.id} className="overflow-hidden gold-border bg-beige-light/80 backdrop-blur">
                  <CardHeader className="bg-bottle-green-medium/20">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium gold-text">Inquiry #{inquiry.id.slice(-8)}</CardTitle>
                      <Badge variant={inquiry.response ? 'default' : 'secondary'} className={inquiry.response ? 'bg-gold-medium text-secondary' : ''}>
                        {inquiry.response ? 'Answered' : 'Pending'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Your Message</p>
                      <p className="text-sm">{inquiry.message}</p>
                    </div>
                    {inquiry.response && (
                      <div className="bg-bottle-green-light/10 p-4 rounded-lg border border-gold-medium/30">
                        <p className="text-sm text-muted-foreground mb-1">Response</p>
                        <p className="text-sm">{inquiry.response}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gold-medium" />
              <h2 className="text-2xl font-semibold mb-2 gold-text">No Inquiries Yet</h2>
              <p className="text-muted-foreground mb-6">Contact us if you have any questions.</p>
              <Button onClick={() => navigate({ to: '/contact' })} className="gold-gradient text-secondary shadow-gold">
                <Mail className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        open={orderModalOpen}
        onOpenChange={setOrderModalOpen}
      />
    </div>
  );
}
