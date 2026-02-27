# Specification

## Summary
**Goal:** Polish product card UI and category page UX across the Aurelie Fine Jewellery app with four targeted improvements: icon-only cart buttons, a full-screen filter panel, a recently viewed section on the home page, and a shimmering gold border on all product cards.

**Planned changes:**
- Remove the "Add to Cart" text label from all product card and product detail page cart buttons app-wide, leaving only the cart icon visible
- Replace the inline filter bar/dropdowns on category pages with a single filter icon button that opens a full-screen filter panel containing all filter options (metal type, price range, occasion, sort order), with an active filter count badge
- Remove the static product grid at the bottom of the HomePage and replace it with a "Recently Viewed" horizontally scrollable card section tracked via localStorage; hide the section when no products have been viewed
- Add a thin off-white border with a continuously animating shimmering gold CSS keyframe effect to every product card across the app, defined in the global stylesheet

**User-visible outcome:** Product cards throughout the app display a clean icon-only cart button and a subtle shimmering gold border. Category pages show a minimal filter icon that opens a full-screen filter panel. The home page shows a "Recently Viewed" section that dynamically reflects the user's browsing history.
