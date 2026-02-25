/**
 * Coupon control component for checkout page.
 * Allows users to apply/remove coupon codes with inline validation.
 */

import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Tag, X, CheckCircle2 } from 'lucide-react';
import { validateCoupon } from '../../utils/pricing';

interface CouponControlProps {
  appliedCoupon: string;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
}

export default function CouponControl({
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}: CouponControlProps) {
  const [couponInput, setCouponInput] = useState('');
  const [error, setError] = useState('');

  const handleApply = () => {
    const code = couponInput.trim();
    
    if (!code) {
      setError('Please enter a coupon code');
      return;
    }
    
    if (!validateCoupon(code)) {
      setError('Invalid coupon code');
      return;
    }
    
    setError('');
    onApplyCoupon(code);
    setCouponInput('');
  };

  const handleRemove = () => {
    onRemoveCoupon();
    setCouponInput('');
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="coupon" className="text-base font-semibold gold-text flex items-center gap-2">
        <Tag className="h-4 w-4" />
        Apply Coupon Code
      </Label>
      
      {appliedCoupon ? (
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gold-medium/10 to-gold-light/10 border-2 border-gold-medium/30 rounded-lg">
          <CheckCircle2 className="h-5 w-5 text-gold-medium flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-gold-light">
              Coupon Applied: {appliedCoupon}
            </p>
            <p className="text-sm text-muted-foreground">
              10% discount applied to your order
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-gold-medium hover:text-gold-dark"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <Input
              id="coupon"
              type="text"
              placeholder="Enter coupon code"
              value={couponInput}
              onChange={(e) => {
                setCouponInput(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              className="h-12 text-base border-2 border-gold-medium/30 focus:border-gold-medium focus:ring-gold-medium/20 bg-ivory-base/30"
            />
            <Button
              onClick={handleApply}
              className="h-12 px-6 gold-gradient text-white shadow-gold hover:shadow-gold/70"
            >
              Apply
            </Button>
          </div>
          
          {error && (
            <p className="text-sm text-destructive flex items-center gap-2">
              <X className="h-4 w-4" />
              {error}
            </p>
          )}
          
          <p className="text-xs text-muted-foreground">
            Use code <span className="font-semibold text-gold-medium">AFJ10</span> for 10% off
          </p>
        </>
      )}
    </div>
  );
}
