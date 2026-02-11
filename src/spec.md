# Specification

## Summary
**Goal:** Add an AFJ10 coupon (10% off) and dynamic UPI payment (deep link + QR) to checkout so customers can pay the exact final amount.

**Planned changes:**
- Add a coupon code input on the checkout flow with apply/remove actions; apply a 10% discount when code `AFJ10` is entered and show errors for invalid/empty codes.
- Update the checkout payment summary to clearly display Subtotal, Discount, and Final Total (with discount applied before shipping).
- Generate a UPI deep link using the final payable amount (after coupon changes) and render a scannable QR code that updates automatically when totals change.
- Add controls to copy the generated UPI URI, and on mobile provide a “Pay using UPI” action that opens the UPI app via the `upi://pay...` deep link with fallback guidance if blocked.
- Ensure order creation totals sent to the backend reflect the discounted final payable amount when `AFJ10` is applied (otherwise keep current totals unchanged).

**User-visible outcome:** Customers can apply the `AFJ10` coupon at checkout to get 10% off, see updated totals, and pay via a dynamically generated UPI QR code or deep link (including automatic opening of UPI apps on mobile), with recorded order totals matching the final amount shown.
