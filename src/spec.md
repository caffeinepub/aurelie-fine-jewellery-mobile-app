# Specification

## Summary
**Goal:** Extract a transparent Aurelie logo lockup from the provided brand image and use it as the sole branding element in both the header and footer.

**Planned changes:**
- Create a new transparent PNG by tightly cropping `1770306231356.png` to include only the flower mark, “Aurelie”, and “Fine Jewellery”, removing the beige/cream background, and save it under `frontend/public/assets/generated/`.
- Update `frontend/src/components/Layout.tsx` to use the new transparent logo lockup asset for the header branding image, keeping the existing header layout/behavior unchanged.
- Update `frontend/src/components/footer/FooterSystem.tsx` to replace the footer’s current branding block (separate logo + text) with the new single-image transparent logo lockup, leaving all other footer content unchanged.

**User-visible outcome:** The site header and footer both display the same Aurelie logo lockup with a truly transparent background (no visible background box/edges), while the rest of the layout and behavior remains the same.
