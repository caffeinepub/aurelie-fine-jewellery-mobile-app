# Aurelie Fine Jewellery

## Current State
The app applies `aurora-body` (animated champagne beige #F7E7CE) to customer-facing pages and `admin-champagne-body` (static lighter #fdf5e8) to admin pages. Several admin pages also have `bg-background` overrides on their root divs, preventing the layout background from showing through.

## Requested Changes (Diff)

### Add
- Nothing new.

### Modify
- `index.css`: Update `.admin-champagne-body` to use the same aurora drift animation as customer pages, anchored to `#F7E7CE`.
- `Layout.tsx`: Apply `aurora-body` class to the `<main>` element for ALL routes (admin and customer), removing the conditional.
- `AdminDashboardPage.tsx`, `AdminProductsPage.tsx`: Replace `bg-background` on root/wrapper divs with `bg-transparent` so the layout aurora body shows through.

### Remove
- The distinction between `admin-champagne-body` and `aurora-body` — admin pages will now use the same aurora body.

## Implementation Plan
1. Update `.admin-champagne-body` in `index.css` to match `aurora-body` with `#F7E7CE` tones.
2. In `Layout.tsx`, remove the conditional on `<main>` className — always use `aurora-body`.
3. In `AdminDashboardPage.tsx`, replace `bg-background` on outer divs with `bg-transparent`.
4. In `AdminProductsPage.tsx`, replace `bg-background` on outer divs with `bg-transparent`.
