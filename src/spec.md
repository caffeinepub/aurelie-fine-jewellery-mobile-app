# Specification

## Summary
**Goal:** Make all app buttons render with a shimmering gold background and metallic silver labels, and change global non-button text from animated silver shimmer to a static gold metallic finish.

**Planned changes:**
- Centralize global button styling overrides so all button variants (primary/secondary/outline/ghost/destructive) render with a shimmering gold background across storefront, admin, header, and footer, without modifying immutable Shadcn UI component source files.
- Set button label/icon color to a metallic silver treatment that remains readable and is not overridden by global non-button text styling.
- Replace the global shimmering silver body text effect with a static (non-animated) gold metallic/shimmer gradient style applied to non-button text consistently across the app.

**User-visible outcome:** All buttons across the app appear in shimmering gold with metallic silver text/icons, and all other text displays a static gold metallic finish with no shimmer animation.
