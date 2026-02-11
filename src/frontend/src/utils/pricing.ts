/**
 * Centralized pricing utilities for checkout with coupon support.
 * Handles subtotal calculation, coupon validation, discount computation, and final payable amount.
 */

import type { Product } from '../backend';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const VALID_COUPON_CODE = 'AFJ10';
export const COUPON_DISCOUNT_PERCENT = 10;

/**
 * Compute cart subtotal in cents (sum of all items before discount)
 */
export function computeSubtotalInCents(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    return sum + Number(item.product.priceInCents) * item.quantity;
  }, 0);
}

/**
 * Validate coupon code (case-insensitive)
 */
export function validateCoupon(code: string): boolean {
  return code.trim().toUpperCase() === VALID_COUPON_CODE;
}

/**
 * Compute discount amount in cents based on subtotal
 */
export function computeDiscountInCents(subtotalInCents: number, couponCode: string): number {
  if (!validateCoupon(couponCode)) {
    return 0;
  }
  // Apply 10% discount, rounded to nearest cent
  return Math.round(subtotalInCents * (COUPON_DISCOUNT_PERCENT / 100));
}

/**
 * Compute final payable amount in cents (subtotal - discount)
 */
export function computeFinalAmountInCents(subtotalInCents: number, discountInCents: number): number {
  return Math.max(0, subtotalInCents - discountInCents);
}

/**
 * Format amount in cents to INR currency string
 */
export function formatINR(amountInCents: number): string {
  const amount = amountInCents / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Compute discounted line total for a single cart item (for order creation)
 */
export function computeDiscountedLineTotal(
  priceInCents: bigint,
  quantity: number,
  couponCode: string
): bigint {
  const lineTotal = Number(priceInCents) * quantity;
  const discount = computeDiscountInCents(lineTotal, couponCode);
  return BigInt(lineTotal - discount);
}
