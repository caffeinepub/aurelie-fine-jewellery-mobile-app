# Specification

## Summary
**Goal:** Restore the homepage’s 16:9, auto-playing product carousel (admin-managed slides with redirect URLs) and update the Home page product-card “Buy Now” text color to dark bottle green, without any header/footer changes.

**Planned changes:**
- Re-enable the Home page carousel to render above the product catalog when at least one enabled slide exists in Admin, using admin-managed slide images and redirect URLs.
- Ensure the carousel matches prior behavior: 16:9 aspect ratio across breakpoints, auto-play enabled, horizontal slide transitions, and left/right navigation arrows.
- Update the Home page product grid “Buy Now” button text color to the existing dark bottle-green token/class, consistently for both admin and customer viewers on the same route.
- Keep header and footer components/styling unchanged.

**User-visible outcome:** Visitors see a working 16:9 auto-playing carousel with arrow controls above the Home page catalog, can click slides to navigate to their configured URLs, and the Home page “Buy Now” button text displays in dark bottle green.
