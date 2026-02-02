import { useGetOrders, useUpdateOrderStatus } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Clock, CheckCircle, Truck, Home, XCircle, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { Order, OrderStatus } from '../../backend';

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, variant: 'secondary' as const },
  confirmed: { label: 'Confirmed', icon: CheckCircle, variant: 'default' as const },
  shipped: { label: 'Shipped', icon: Truck, variant: 'default' as const },
  delivered: { label: 'Delivered', icon: Home, variant: 'outline' as const },
  cancelled: { label: 'Cancelled', icon: XCircle, variant: 'destructive' as const },
};

export default function OrderManagement() {
  const { data: orders, isLoading } = useGetOrders();
  const updateStatus = useUpdateOrderStatus();

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

  const handleStatusChange = async (orderId: string, newStatusKind: string) => {
    try {
      let status: OrderStatus;
      
      switch (newStatusKind) {
        case 'pending':
          status = { __kind__: 'pending', pending: null };
          break;
        case 'confirmed':
          status = { __kind__: 'confirmed', confirmed: null };
          break;
        case 'shipped':
          status = { __kind__: 'shipped', shipped: null };
          break;
        case 'delivered':
          status = { __kind__: 'delivered', delivered: null };
          break;
        default:
          throw new Error('Invalid status');
      }

      await updateStatus.mutateAsync({ orderId, status });
      toast.success('Order status updated successfully');
    } catch (error: any) {
      console.error('Failed to update order status:', error);
      toast.error(error.message || 'Failed to update order status');
    }
  };

  const getStatusInfo = (order: Order) => {
    if (order.status.__kind__ === 'cancelled') {
      return statusConfig.cancelled;
    }
    return statusConfig[order.status.__kind__ as keyof typeof statusConfig] || statusConfig.pending;
  };

  const getCancellationReason = (order: Order) => {
    if (order.status.__kind__ === 'cancelled') {
      return order.status.cancelled.reason;
    }
    return null;
  };

  return (
    <Card className="gold-border bg-card/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="gold-text flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Realtime Order Tracking
        </CardTitle>
        <CardDescription className="gold-text opacity-70">
          Monitor all customer orders with live status updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <p className="gold-text opacity-70">Loading orders...</p>
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order);
              const StatusIcon = statusInfo.icon;
              const cancellationReason = getCancellationReason(order);
              const isCancelled = order.status.__kind__ === 'cancelled';

              return (
                <div
                  key={order.id}
                  className="p-4 border border-gold-medium/30 rounded-lg hover:bg-emerald-light/10 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold gold-text">Order #{order.id.slice(-8)}</h3>
                      <p className="text-sm gold-text opacity-70">
                        Customer: {order.customer.toString().slice(0, 10)}...
                      </p>
                      <p className="text-xs gold-text opacity-60 mt-1">
                        {formatDate(order.timestamp)}
                      </p>
                    </div>
                    <Badge variant={statusInfo.variant} className="gap-1 bg-gold-medium text-secondary">
                      <StatusIcon className="h-3 w-3" />
                      {statusInfo.label}
                    </Badge>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 mb-3">
                    <div>
                      <p className="text-sm gold-text opacity-70">Product ID</p>
                      <p className="font-medium text-sm gold-text">{order.productId}</p>
                    </div>
                    <div>
                      <p className="text-sm gold-text opacity-70">Quantity</p>
                      <p className="font-medium text-sm gold-text">{order.quantity.toString()}</p>
                    </div>
                    <div>
                      <p className="text-sm gold-text opacity-70">Total Amount</p>
                      <p className="font-semibold gold-text">
                        {formatINR(order.totalPriceInCents)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm gold-text opacity-70">UPI ID</p>
                      <p className="font-medium text-sm gold-text">{order.upiId}</p>
                    </div>
                  </div>

                  {cancellationReason && (
                    <div className="mb-3 p-3 bg-destructive/10 rounded-lg border border-destructive/30">
                      <p className="text-sm font-medium text-destructive mb-1">Cancellation Reason</p>
                      <p className="text-sm text-destructive/80">{cancellationReason}</p>
                    </div>
                  )}

                  {!isCancelled && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium gold-text">Update Status:</span>
                      <Select
                        value={order.status.__kind__}
                        onValueChange={(value) => handleStatusChange(order.id, value)}
                        disabled={updateStatus.isPending}
                      >
                        <SelectTrigger className="w-40 border-gold-medium/30 gold-text">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="gold-border bg-card/95 backdrop-blur">
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gold-medium opacity-50" />
            <p className="gold-text opacity-70">No orders yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
