import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertCircle, Clock, CheckCircle, Truck, Home, XCircle, Loader2 } from 'lucide-react';
import { Order } from '../backend';
import { useCancelOrder, useIsOrderCancellable } from '../hooks/useQueries';
import { toast } from 'sonner';

interface OrderDetailModalProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, variant: 'secondary' as const },
  confirmed: { label: 'Confirmed', icon: CheckCircle, variant: 'default' as const },
  shipped: { label: 'Shipped', icon: Truck, variant: 'default' as const },
  delivered: { label: 'Delivered', icon: Home, variant: 'outline' as const },
  cancelled: { label: 'Cancelled', icon: XCircle, variant: 'destructive' as const },
};

const cancellationReasons = [
  'Changed my mind',
  'Found a better price elsewhere',
  'Ordered by mistake',
  'Delivery time too long',
  'Product no longer needed',
  'Other',
];

export default function OrderDetailModal({ order, open, onOpenChange }: OrderDetailModalProps) {
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [customReason, setCustomReason] = useState('');

  const cancelOrder = useCancelOrder();
  const { data: isCancellable, isLoading: checkingCancellable } = useIsOrderCancellable(order?.id || '');

  if (!order) return null;

  const formatINR = (priceInCents: bigint) => {
    const amount = Number(priceInCents) / 100;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusInfo = () => {
    if (order.status.__kind__ === 'cancelled') {
      return statusConfig.cancelled;
    }
    return statusConfig[order.status.__kind__ as keyof typeof statusConfig] || statusConfig.pending;
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  const handleCancelOrder = async () => {
    if (!order) return;

    const reasonText = selectedReason === 'Other' ? customReason : selectedReason;

    if (!reasonText.trim()) {
      toast.error('Please provide a cancellation reason');
      return;
    }

    try {
      await cancelOrder.mutateAsync({ orderId: order.id, reason: { reason: reasonText } });
      toast.success('Order cancelled successfully');
      setShowCancelForm(false);
      setSelectedReason('');
      setCustomReason('');
      onOpenChange(false);
    } catch (error: any) {
      console.error('Failed to cancel order:', error);
      toast.error(error.message || 'Failed to cancel order');
    }
  };

  const getCancellationReason = () => {
    if (order.status.__kind__ === 'cancelled') {
      return order.status.cancelled.reason;
    }
    return null;
  };

  const cancellationReason = getCancellationReason();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gold-border bg-beige-light/95 backdrop-blur">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif gold-text">Order Details</DialogTitle>
          <DialogDescription>Order #{order.id.slice(-8)}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Status</span>
            <Badge variant={statusInfo.variant} className="gap-1 bg-gold-medium text-secondary">
              <StatusIcon className="h-3 w-3" />
              {statusInfo.label}
            </Badge>
          </div>

          {/* Order Information */}
          <div className="grid gap-4 sm:grid-cols-2 p-4 bg-bottle-green-medium/10 rounded-lg border border-gold-medium/30">
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

          {/* Cancellation Reason (if cancelled) */}
          {cancellationReason && (
            <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/30">
              <p className="text-sm font-medium text-destructive mb-1">Cancellation Reason</p>
              <p className="text-sm">{cancellationReason}</p>
            </div>
          )}

          {/* Cancel Order Section */}
          {!showCancelForm && order.status.__kind__ !== 'cancelled' && (
            <div className="space-y-3">
              {checkingCancellable ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-gold-medium" />
                </div>
              ) : isCancellable ? (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => setShowCancelForm(true)}
                    className="w-full"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel Order
                  </Button>
                  <div className="flex items-start gap-2 p-3 bg-amber-500/10 rounded-lg border border-amber-500/30">
                    <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-700">
                      Cancel is available for 12hrs post order is placed. For more help contact customer support.
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                  <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Cancellation period has expired. Please contact customer support for assistance.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Cancel Form */}
          {showCancelForm && (
            <div className="space-y-4 p-4 bg-destructive/5 rounded-lg border border-destructive/30">
              <div className="space-y-2">
                <Label htmlFor="reason" className="gold-text">Cancellation Reason</Label>
                <Select value={selectedReason} onValueChange={setSelectedReason}>
                  <SelectTrigger id="reason" className="border-gold-medium/30">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent className="gold-border bg-card/95 backdrop-blur">
                    {cancellationReasons.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedReason === 'Other' && (
                <div className="space-y-2">
                  <Label htmlFor="customReason" className="gold-text">Please specify</Label>
                  <Textarea
                    id="customReason"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Enter your reason for cancellation"
                    className="border-gold-medium/30 min-h-[80px]"
                  />
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCancelForm(false);
                    setSelectedReason('');
                    setCustomReason('');
                  }}
                  className="flex-1"
                  disabled={cancelOrder.isPending}
                >
                  Back
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleCancelOrder}
                  className="flex-1"
                  disabled={cancelOrder.isPending || !selectedReason}
                >
                  {cancelOrder.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    'Confirm Cancellation'
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gold-medium/30"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
