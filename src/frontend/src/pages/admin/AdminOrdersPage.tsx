import { useState, useMemo } from 'react';
import { useIsCallerAdmin, useGetOrders, useUpdateOrderStatus, useGetProducts } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Skeleton } from '../../components/ui/skeleton';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Separator } from '../../components/ui/separator';
import { Clock, CheckCircle, Truck, Home, XCircle, ShoppingBag, Filter, X, Calendar, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Order, OrderStatus } from '../../backend';

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, variant: 'secondary' as const },
  confirmed: { label: 'Confirmed', icon: CheckCircle, variant: 'default' as const },
  shipped: { label: 'Shipped', icon: Truck, variant: 'default' as const },
  delivered: { label: 'Delivered', icon: Home, variant: 'outline' as const },
  cancelled: { label: 'Cancelled', icon: XCircle, variant: 'destructive' as const },
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const YEARS = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

export default function AdminOrdersPage() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: orders, isLoading: ordersLoading } = useGetOrders();
  const { data: products } = useGetProducts();
  const updateStatus = useUpdateOrderStatus();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

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

  const getCancellationReason = (order: Order) => {
    if (order.status.__kind__ === 'cancelled') {
      return order.status.cancelled.reason;
    }
    return null;
  };

  // Filter orders based on date range and month/year
  const filteredOrders = useMemo(() => {
    if (!orders) return [];

    return orders.filter((order) => {
      const orderDate = new Date(Number(order.timestamp) / 1_000_000);

      // Date range filter
      if (dateFrom) {
        const fromDate = new Date(dateFrom);
        if (orderDate < fromDate) return false;
      }
      if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        if (orderDate > toDate) return false;
      }

      // Month/Year filter
      if (selectedMonth && selectedYear) {
        const monthIndex = MONTHS.indexOf(selectedMonth);
        if (orderDate.getMonth() !== monthIndex || orderDate.getFullYear() !== parseInt(selectedYear)) {
          return false;
        }
      } else if (selectedMonth) {
        const monthIndex = MONTHS.indexOf(selectedMonth);
        if (orderDate.getMonth() !== monthIndex) return false;
      } else if (selectedYear) {
        if (orderDate.getFullYear() !== parseInt(selectedYear)) return false;
      }

      return true;
    });
  }, [orders, dateFrom, dateTo, selectedMonth, selectedYear]);

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

  const clearFilters = () => {
    setDateFrom('');
    setDateTo('');
    setSelectedMonth('');
    setSelectedYear('');
  };

  const hasActiveFilters = dateFrom || dateTo || selectedMonth || selectedYear;

  if (adminLoading || ordersLoading) {
    return (
      <div className="container px-4 py-8">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container px-4 py-8">
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gold-medium" />
          <h2 className="text-2xl font-semibold mb-2 gold-text">Access Denied</h2>
          <p className="gold-text opacity-80">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold tracking-tight mb-2 text-bottle-green-dark">
          Order Management
        </h1>
        <p className="text-bottle-green-medium">View and manage all customer orders</p>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        {/* Filters Sidebar */}
        <Card className="gold-border admin-surface h-fit">
          <CardHeader>
            <CardTitle className="text-bottle-green-dark flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gold-medium hover:text-gold-dark"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Date Range Filter */}
            <div className="space-y-2">
              <Label className="text-bottle-green-dark flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date Range
              </Label>
              <div className="space-y-2">
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-navy-medium border-gold-medium/30 text-beige-champagne"
                  placeholder="From"
                />
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="bg-navy-medium border-gold-medium/30 text-beige-champagne"
                  placeholder="To"
                />
              </div>
            </div>

            <Separator className="bg-gold-medium/30" />

            {/* Month/Year Filter */}
            <div className="space-y-2">
              <Label className="text-bottle-green-dark">Month</Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="bg-navy-medium border-gold-medium/30 text-beige-champagne">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-bottle-green-dark">Year</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="bg-navy-medium border-gold-medium/30 text-beige-champagne">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          <Card className="gold-border admin-surface">
            <CardHeader>
              <CardTitle className="text-bottle-green-dark">
                {filteredOrders.length} {filteredOrders.length === 1 ? 'Order' : 'Orders'}
              </CardTitle>
              <CardDescription className="text-bottle-green-medium">
                {hasActiveFilters ? 'Filtered results' : 'All orders'}
              </CardDescription>
            </CardHeader>
          </Card>

          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-4 pr-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const statusInfo = getStatusInfo(order);
                  const StatusIcon = statusInfo.icon;
                  const cancellationReason = getCancellationReason(order);
                  const isCancelled = order.status.__kind__ === 'cancelled';
                  const isSelected = selectedOrder?.id === order.id;

                  return (
                    <Card
                      key={order.id}
                      className={`gold-border admin-surface cursor-pointer transition-all ${
                        isSelected ? 'ring-2 ring-gold-medium' : ''
                      }`}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-bottle-green-dark">
                              Order #{order.id.slice(-8)}
                            </h3>
                            <p className="text-sm text-bottle-green-medium">
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
                            <p className="text-sm admin-table-text">Product</p>
                            <p className="font-medium text-sm text-bottle-green-dark">
                              {getProductName(order.productId)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm admin-table-text">Quantity</p>
                            <p className="font-medium text-sm text-bottle-green-dark">
                              {order.quantity.toString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm admin-table-text">Total Amount</p>
                            <p className="font-semibold text-bottle-green-dark">
                              {formatINR(order.totalPriceInCents)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm admin-table-text">Customer</p>
                            <p className="font-medium text-sm text-bottle-green-dark">
                              {order.customer.toString().slice(0, 16)}...
                            </p>
                          </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="mb-3 p-3 bg-emerald-light/10 rounded-lg border border-gold-medium/20">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-gold-medium" />
                            <p className="text-sm font-semibold admin-table-text">Shipping Address</p>
                          </div>
                          <div className="grid gap-1 text-sm">
                            <p className="text-bottle-green-dark">
                              <span className="admin-table-text">Name:</span>{' '}
                              <span className="font-medium">{order.shippingAddress.name || 'Not provided'}</span>
                            </p>
                            <p className="text-bottle-green-dark">
                              <span className="admin-table-text">Email:</span>{' '}
                              <span className="font-medium">{order.shippingAddress.email || 'Not provided'}</span>
                            </p>
                            <p className="text-bottle-green-dark">
                              <span className="admin-table-text">Phone:</span>{' '}
                              <span className="font-medium">{order.shippingAddress.phone || 'Not provided'}</span>
                            </p>
                            <p className="text-bottle-green-dark">
                              <span className="admin-table-text">Address:</span>{' '}
                              <span className="font-medium">{order.shippingAddress.address || 'Not provided'}</span>
                            </p>
                          </div>
                        </div>

                        {cancellationReason && (
                          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm font-semibold text-red-800">Cancellation Reason:</p>
                            <p className="text-sm text-red-700 mt-1">{cancellationReason}</p>
                          </div>
                        )}

                        {!isCancelled && (
                          <div className="flex items-center gap-2">
                            <Label className="text-sm admin-table-text">Update Status:</Label>
                            <Select
                              value={order.status.__kind__}
                              onValueChange={(value) => handleStatusChange(order.id, value)}
                              disabled={updateStatus.isPending}
                            >
                              <SelectTrigger className="w-[180px] bg-navy-medium border-gold-medium/30 text-beige-champagne">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Card className="gold-border admin-surface">
                  <CardContent className="py-12 text-center">
                    <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gold-medium" />
                    <h3 className="text-xl font-semibold text-bottle-green-dark mb-2">No Orders Found</h3>
                    <p className="text-bottle-green-medium">
                      {hasActiveFilters
                        ? 'No orders match your filter criteria. Try adjusting your filters.'
                        : 'No orders have been placed yet.'}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
