# Specification

## Summary
**Goal:** Rename gender labels, add swipe-in animations to category circles, update footer colour, and relocate the header category section to the For Her page only.

**Planned changes:**
- Rename all "Boys" labels/tabs to "For Him" and all "Girls" labels/tabs to "For Her" throughout the frontend (tabs, headings, route labels, hardcoded strings)
- Add simultaneous swipe-in entrance animation to product category circles on both the For Him and For Her home pages — each circle animates in from a different edge (top, bottom, left, right) converging into final grid positions on page load
- Update the footer background colour to off-white (e.g., `bg-stone-50` / `#f5f5f0`)
- Move the product category section that currently renders globally below the header so it only appears on the For Her (GirlsHomePage), removing it from all other pages

**User-visible outcome:** Gender tabs and page headings now read "For Him" and "For Her"; category circles animate in from all directions on load; the footer appears in off-white; and the top category section is exclusive to the For Her page.
