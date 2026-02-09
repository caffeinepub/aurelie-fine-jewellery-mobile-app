# Specification

## Summary
**Goal:** Remove the orange/gold button-style background behind the header logo/brand lockup without affecting the header background, layout, or other header button styles.

**Planned changes:**
- Override global button background styles for the header logo button only (the element with class `header-brand-btn` in `frontend/src/components/Layout.tsx`) so its background is transparent.
- Ensure the logo button’s hover/focus/active states remain transparent while preserving the existing logo/brand sizing, positioning, and scroll-compress behavior.
- Keep all other header buttons (Cart/Dashboard/Admin/Login/Logout) using their current styling.

**User-visible outcome:** The header logo/brand area remains clickable but no longer shows any orange/gold background behind it on any page or interaction state, while the rest of the header appearance stays the same.
