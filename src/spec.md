# Specification

## Summary
**Goal:** Add admin category editing (including multi-image management) and dedicated customer/admin orders pages, while keeping the homepage unchanged and excluding any Excel export.

**Planned changes:**
- Keep the existing homepage route and HomePage component unchanged.
- Add admin-only, dedicated edit pages per product category to update category metadata (name, display order/position, description) with backend persistence.
- Add admin multi-image management for product categories (add/remove/reorder) and persist ordered image lists in the backend, enforcing existing image limits with clear English validation.
- Apply the same multi-image add/remove/reorder workflow to category-specific carousels while preserving existing redirect URL editing behavior.
- Add an authenticated Customer Orders page accessible from an "Orders" entry in the signed-in user navigation, showing the user’s order history, statuses, and full order details (including cancellation reason when present).
- Add an admin-only Admin Orders page to view all orders, update order status, cancel orders (with required reason), assign tracking info, and filter orders by date range and month/year dropdowns.
- Ensure no Excel export/download UI, routes, utilities, or backend endpoints are added.

**User-visible outcome:** Customers can view their own orders and order details from a dedicated Orders page, and admins can edit categories (including images) and manage all orders (status, cancellations, tracking, filtering) via dedicated admin pages—without any changes to the homepage and without any Excel export option.
