/**
 * UPI payment utilities for generating UPI deep links.
 * Builds UPI URI with exact payee details and amount.
 */

export interface UpiPaymentDetails {
  payeeVpa: string;
  payeeName: string;
  amountInCents: number;
  currency: string;
}

/**
 * Build UPI payment URI (upi://pay...)
 * @param details Payment details including VPA, name, amount, currency
 * @returns UPI deep link string
 */
export function buildUpiUri(details: UpiPaymentDetails): string {
  const { payeeVpa, payeeName, amountInCents, currency } = details;
  
  // Convert cents to rupees with 2 decimal places
  const amountInRupees = (amountInCents / 100).toFixed(2);
  
  // Build UPI URI with proper encoding
  const params = new URLSearchParams({
    pa: payeeVpa,
    pn: payeeName,
    am: amountInRupees,
    cu: currency,
  });
  
  return `upi://pay?${params.toString()}`;
}

/**
 * Generate UPI payment URI for Aurelie Fine Jewellery
 * @param amountInCents Final payable amount in cents
 * @returns UPI deep link string
 */
export function generateAurelieUpiUri(amountInCents: number): string {
  return buildUpiUri({
    payeeVpa: 'arjun.tapse-1@okhdfcbank',
    payeeName: 'Arjun Tapse',
    amountInCents,
    currency: 'INR',
  });
}
