# Specification

## Summary
**Goal:** Update the Aurelie floral icon asset from the newly uploaded artwork and make the site header fully transparent (including removing the orange/gold background behind the brand area) while keeping existing behavior intact.

**Planned changes:**
- Extract the floral emblem from `1770214375269~2.png`, remove the background to full transparency, tightly crop to the mark, and replace `frontend/public/assets/generated/aurelie-icon-transparent.dim_512x512.png` so existing references remain unchanged.
- Update `frontend/src/components/Layout.tsx` header styling so the header and brand/logo click target render fully transparent (no background/gradient/shimmer), while preserving sticky positioning and the current scroll-compress behavior (h-20 to h-16).
- Leave navigation buttons (Cart/Dashboard/Admin/Login/Logout) styling and behavior unchanged.

**User-visible outcome:** The header shows no colored background behind the brand area and remains sticky/compressing as before, and the updated floral icon appears everywhere the app uses the shared icon (including header and footer) without any broken image links.
