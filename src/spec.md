# Specification

## Summary
**Goal:** Ensure category product listing pages show only products belonging to the selected category.

**Planned changes:**
- Update the category product listing page to filter products by the current `categorySlug` route parameter, rendering only items where `product.category` matches the selected slug.
- Keep the existing empty-state behavior, showing it only when the selected category has zero matching products.
- Leave the HomePage product listing behavior unchanged.

**User-visible outcome:** When a user navigates to a category-specific products route, they see only products from that category (or an empty-state message if none exist).
