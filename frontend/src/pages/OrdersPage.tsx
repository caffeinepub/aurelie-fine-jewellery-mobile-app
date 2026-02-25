import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCustomerOrders, useGetProducts } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { ShoppingBag, Clock, CheckCircle, Truck, Home, XCircle, Package } from 'lucide-react';
import { useState } from 'react';
import OrderDetailModal from '../components/OrderDetailModal';
import { Order } from '../backend';
import CustomerPageStyleScope from '../components/CustomerPageStyleScope';

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'bg-yellow-500' },
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'bg-blue-500' },
  shipped: { label: 'Shipped', icon: Truck, color: 'bg-purple-500' },
  delivered: { label: 'Delivered', icon: Home, color: 'bg-green-500' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'bg-red-500' },
};

export default function OrdersPage() {
  const { identity } = useInternetIdentity();
  const { data: orders, isLoading } = useGetCustomerOrders();
  const { data: products } = useGetProducts();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const formatINR = (priceInCents: bigint) => {
    const amount = Number(priceInCents) / 100;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const getProductName = (productId: string): string => {
    const product = products?.find((p) => p.id === productId);
    return product?.name || 'Unknown Product';
  };

  const getStatusInfo = (order: Order) => {
    if (order.status.__kind__ === 'cancelled') {
      return statusConfig.cancelled;
    }
    return statusConfig[order.status.__kind__ as keyof typeof statusConfig] || statusConfig.pending;
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleModalClose = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      setSelectedOrder(null);
    }
  };

  if (!identity) {
    return (
      <CustomerPageStyleScope>
        <div className="container px-4 py-8">
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gold-medium" />
            <h2 className="text-2xl font-semibold mb-2">Please Log In</h2>
            <p className="text-muted-foreground">You need to be logged in to view your orders.</p>
          </div>
        </div>
      </CustomerPageStyleScope>
    );
  }

  if (isLoading) {
    return (
      <CustomerPageStyleScope>
        <div className="container px-4 py-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        </div>
      </CustomerPageStyleScope>
    );
  }

  return (
    <CustomerPageStyleScope>
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-semibold tracking-tight mb-2">My Orders</h1>
          <p className="text-muted-foreground">View your order history and track deliveries</p>
        </div>

        {orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order);
              const StatusIcon = statusInfo.icon;
              const cancellationReason = order.status.__kind__ === 'cancelled' ? order.status.cancelled.reason : null;

              return (
                <Card
                  key={order.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow border-gold-medium/30"
                  onClick={() => handleOrderClick(order)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id.slice(-8)}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDate(order.timestamp)}
                        </p>
                      </div>
                      <Badge className={`${statusInfo.color} text-white gap-1`}>
                        <StatusIcon className="h-3 w-3" />
                        {statusInfo.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Product</p>
                        <p className="font-medium">{getProductName(order.productId)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="font-medium">{order.quantity.toString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                        <p className="font-semibold text-lg">{formatINR(order.totalPriceInCents)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium">{statusInfo.label}</p>
                      </div>
                    </div>

                    {cancellationReason && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm font-semibold text-red-800">Cancellation Reason:</p>
                        <p className="text-sm text-red-700 mt-1">{cancellationReason}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border-gold-medium/30">
            <CardContent className="py-12 text-center">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
              <p className="text-muted-foreground">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
            </CardContent>
          </Card>
        )}

        <OrderDetailModal
          order={selectedOrder}
          open={modalOpen}
          onOpenChange={handleModalClose}
        />
      </div>
    </CustomerPageStyleScope>
  );
}
