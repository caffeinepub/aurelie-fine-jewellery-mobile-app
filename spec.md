# Aurelie Fine Jewellery — Label Audit, For Him Animation Fix, Shimmer Border Stagger

## Current State
- App is on version 106 with static #F7E7CE body across all pages
- CSS has `[data-customer-page]` and `[data-admin-scope]` label rules for #006A4E but buttons, button borders are not covered
- BoysHomePage has swipe-in animation logic (`category-circle-swipe` + `arrived` classes) but `overflow-x-hidden` on the outer wrapper clips horizontal slide-ins
- `product-card-shimmer` class exists with keyframe animation but all cards animate at the same rate (no stagger)
- Admin body is #F7E7CE (no change requested)

## Requested Changes (Diff)

### Add
- CSS rules scoping button text color and button border color to #006A4E for `[data-customer-page]` and `[data-admin-scope]` elements (excluding shimmer/gold buttons)
- Inline `animationDelay` on each product card in MasonryProductGrid for staggered shimmer (every 0.3s offset per card index)
- Apply `product-card-shimmer` class to CategoryProductRow cards, NewArrivalsSection cards, and any other product card surfaces app-wide

### Modify
- Remove `overflow-x-hidden` from BoysHomePage outer wrapper so circles can animate from outside container bounds (replace with `overflow-hidden` only on specific inner wrappers where needed)
- Ensure swipe-in animation classes (`from-left`, `from-right`, `from-top`, `from-bottom`) are assigned to all 4 For Him category circles with correct staggered direction assignment
- Extend CSS label audit to explicitly cover: `button` text color, `button` border color, `input` placeholder-related label text, `select` labels, filter chip labels inside filter components

### Remove
- Nothing removed

## Implementation Plan
1. Update `index.css`: add button text/border color rules under `[data-customer-page]` and `[data-admin-scope]` scopes; add stagger animation-delay variables for shimmer
2. Fix `BoysHomePage.tsx`: remove `overflow-x-hidden` from outer div, verify swipe direction assignment cycles correctly through all 4 directions
3. Update `MasonryProductGrid.tsx`: add `animationDelay` inline style staggered by card index (e.g. `index * 0.3s` capped at ~2s)
4. Audit `CategoryProductRow.tsx`, `NewArrivalsSection.tsx`, and any other card-rendering components to ensure `product-card-shimmer` class is applied
5. Validate build
