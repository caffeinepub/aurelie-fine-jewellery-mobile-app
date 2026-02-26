# Specification

## Summary
**Goal:** Remove the Our Story strip from the homepage, ensure product category pages have filters and category navigation, and add horizontally scrollable product card rows below each category carousel on the homepage.

**Planned changes:**
- Remove the `OurStoryStrip` component from `HomePage.tsx` with no leftover gap
- Verify that all product category pages include `ProductFilterBar` (metal type, price range, occasion, sort order) and a category navigation bar (`HeaderCategoryNav`); add either if missing
- Below each category carousel section on the homepage, add a horizontally scrollable row of small square product cards showing products from the relevant category — 3 cards visible at once, no visible scrollbar, each card showing product image, name, and price in INR; clicking navigates to the product detail page

**User-visible outcome:** The homepage no longer shows the Our Story strip, and each category carousel is followed by a swipeable row of 3 square product cards. Product category pages consistently display filter controls and category navigation for browsing and filtering items.
