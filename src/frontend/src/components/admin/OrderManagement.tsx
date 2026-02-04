import { useGetOrders, useUpdateOrderStatus, useGetProducts } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Clock, CheckCircle, Truck, Home, XCircle, ShoppingBag, Printer, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Order, OrderStatus, Product } from '../../backend';
import { Button } from '../ui/button';

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, variant: 'secondary' as const },
  confirmed: { label: 'Confirmed', icon: CheckCircle, variant: 'default' as const },
  shipped: { label: 'Shipped', icon: Truck, variant: 'default' as const },
  delivered: { label: 'Delivered', icon: Home, variant: 'outline' as const },
  cancelled: { label: 'Cancelled', icon: XCircle, variant: 'destructive' as const },
};

export default function OrderManagement() {
  const { data: orders, isLoading } = useGetOrders();
  const { data: products } = useGetProducts();
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

  const getProductName = (productId: string): string => {
    const product = products?.find((p) => p.id === productId);
    return product?.name || 'Unknown Product';
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

  const handlePrintOrder = (order: Order) => {
    const statusInfo = getStatusInfo(order);
    const productName = getProductName(order.productId);
    const cancellationReason = getCancellationReason(order);

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow pop-ups to print orders');
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order #${order.id.slice(-8)} - Aurelie Fine Jewellery</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Playfair Display', serif;
              padding: 40px;
              color: #2c3e2c;
              background: linear-gradient(135deg, #f5f1e8 0%, #e8dcc8 100%);
            }
            
            .container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
              padding: 40px;
              border: 2px solid #d4af37;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            
            .header {
              text-align: center;
              border-bottom: 2px solid #d4af37;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            
            .header h1 {
              color: #d4af37;
              font-size: 32px;
              font-weight: 700;
              margin-bottom: 8px;
            }
            
            .header p {
              color: #2c3e2c;
              font-size: 14px;
              opacity: 0.8;
            }
            
            .order-info {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 30px;
            }
            
            .info-section {
              background: #f5f1e8;
              padding: 20px;
              border-radius: 6px;
              border-left: 4px solid #d4af37;
            }
            
            .info-section h2 {
              color: #d4af37;
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 12px;
            }
            
            .info-row {
              margin-bottom: 8px;
            }
            
            .info-label {
              color: #2c3e2c;
              font-size: 12px;
              opacity: 0.7;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .info-value {
              color: #2c3e2c;
              font-size: 14px;
              font-weight: 600;
              margin-top: 2px;
            }
            
            .status-badge {
              display: inline-block;
              padding: 6px 12px;
              background: #d4af37;
              color: white;
              border-radius: 4px;
              font-size: 14px;
              font-weight: 600;
              margin-top: 4px;
            }
            
            .status-badge.cancelled {
              background: #dc2626;
            }
            
            .product-details {
              background: #2c3e2c;
              color: #d4af37;
              padding: 20px;
              border-radius: 6px;
              margin-bottom: 30px;
            }
            
            .product-details h2 {
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 12px;
            }
            
            .product-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 16px;
            }
            
            .product-item {
              border-top: 1px solid rgba(212, 175, 55, 0.3);
              padding-top: 8px;
            }
            
            .shipping-section {
              background: #f5f1e8;
              padding: 20px;
              border-radius: 6px;
              border: 2px solid #d4af37;
              margin-bottom: 30px;
            }
            
            .shipping-section h2 {
              color: #d4af37;
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 12px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            
            .cancellation-notice {
              background: #fee;
              border: 2px solid #dc2626;
              padding: 16px;
              border-radius: 6px;
              margin-bottom: 20px;
            }
            
            .cancellation-notice h3 {
              color: #dc2626;
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 8px;
            }
            
            .cancellation-notice p {
              color: #991b1b;
              font-size: 14px;
            }
            
            .footer {
              text-align: center;
              padding-top: 20px;
              border-top: 2px solid #d4af37;
              margin-top: 30px;
              color: #2c3e2c;
              opacity: 0.7;
              font-size: 12px;
            }
            
            @media print {
              body {
                background: white;
                padding: 0;
              }
              
              .container {
                box-shadow: none;
                border: 2px solid #d4af37;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Aurelie Fine Jewellery</h1>
              <p>Order Receipt & Details</p>
            </div>
            
            <div class="order-info">
              <div class="info-section">
                <h2>Order Information</h2>
                <div class="info-row">
                  <div class="info-label">Order ID</div>
                  <div class="info-value">#${order.id.slice(-8)}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Order Date</div>
                  <div class="info-value">${formatDate(order.timestamp)}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Status</div>
                  <div class="status-badge ${order.status.__kind__ === 'cancelled' ? 'cancelled' : ''}">${statusInfo.label}</div>
                </div>
              </div>
              
              <div class="info-section">
                <h2>Customer Details</h2>
                <div class="info-row">
                  <div class="info-label">Customer ID</div>
                  <div class="info-value">${order.customer.toString().slice(0, 16)}...</div>
                </div>
                <div class="info-row">
                  <div class="info-label">UPI ID</div>
                  <div class="info-value">${order.upiId}</div>
                </div>
              </div>
            </div>
            
            ${cancellationReason ? `
              <div class="cancellation-notice">
                <h3>Order Cancelled</h3>
                <p><strong>Reason:</strong> ${cancellationReason}</p>
              </div>
            ` : ''}
            
            <div class="product-details">
              <h2>Product Details</h2>
              <div class="product-grid">
                <div class="product-item">
                  <div class="info-label" style="color: rgba(212, 175, 55, 0.7);">Product</div>
                  <div class="info-value" style="color: #d4af37;">${productName}</div>
                </div>
                <div class="product-item">
                  <div class="info-label" style="color: rgba(212, 175, 55, 0.7);">Quantity</div>
                  <div class="info-value" style="color: #d4af37;">${order.quantity.toString()}</div>
                </div>
                <div class="product-item">
                  <div class="info-label" style="color: rgba(212, 175, 55, 0.7);">Total Amount</div>
                  <div class="info-value" style="color: #d4af37;">${formatINR(order.totalPriceInCents)}</div>
                </div>
              </div>
            </div>
            
            <div class="shipping-section">
              <h2>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Shipping Address
              </h2>
              <div class="info-row">
                <div class="info-label">Name</div>
                <div class="info-value">${order.shippingAddress.name || 'Not provided'}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Email</div>
                <div class="info-value">${order.shippingAddress.email || 'Not provided'}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Phone</div>
                <div class="info-value">${order.shippingAddress.phone || 'Not provided'}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Address</div>
                <div class="info-value">${order.shippingAddress.address || 'Not provided'}</div>
              </div>
            </div>
            
            <div class="footer">
              <p>© 2025 Aurelie Fine Jewellery. All rights reserved.</p>
              <p style="margin-top: 4px;">Built with love using caffeine.ai</p>
            </div>
          </div>
          
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
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
    <Card className="gold-border chrome-surface backdrop-blur">
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
                    <div className="flex items-center gap-2">
                      <Badge variant={statusInfo.variant} className="gap-1 bg-gold-medium text-secondary">
                        <StatusIcon className="h-3 w-3" />
                        {statusInfo.label}
                      </Badge>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handlePrintOrder(order)}
                        className="h-8 w-8 border-gold-medium/30 hover:bg-gold-medium/10"
                        title="Print Order"
                      >
                        <Printer className="h-4 w-4 text-gold-medium" />
                      </Button>
                    </div>
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

                  {/* Shipping Address Section */}
                  <div className="mb-3 p-3 bg-emerald-light/10 rounded-lg border border-gold-medium/20">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-gold-medium" />
                      <p className="text-sm font-semibold gold-text">Shipping Address</p>
                    </div>
                    <div className="grid gap-1 text-sm">
                      <p className="gold-text">
                        <span className="opacity-70">Name:</span>{' '}
                        <span className="font-medium">{order.shippingAddress.name || 'Not provided'}</span>
                      </p>
                      <p className="gold-text">
                        <span className="opacity-70">Email:</span>{' '}
                        <span className="font-medium">{order.shippingAddress.email || 'Not provided'}</span>
                      </p>
                      <p className="gold-text">
                        <span className="opacity-70">Phone:</span>{' '}
                        <span className="font-medium">{order.shippingAddress.phone || 'Not provided'}</span>
                      </p>
                      <p className="gold-text">
                        <span className="opacity-70">Address:</span>{' '}
                        <span className="font-medium">{order.shippingAddress.address || 'Not provided'}</span>
                      </p>
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
                        <SelectContent className="gold-border chrome-surface backdrop-blur">
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
