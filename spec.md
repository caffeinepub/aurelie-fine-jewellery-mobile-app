# Aurelie Fine Jewellery

## Current State
- Labels, headings, and form field text use OKLCH bottle-green tokens (`--bottle-green-dark`) in CSS
- Banner (`MarqueeBanner.tsx`) uses `oklch(var(--gold-medium))` for background and `oklch(var(--bottle-green-dark))` for text via CSS class
- `BoysHomePage.tsx` has swipe-in animation CSS already defined in `index.css` (`.category-circle-swipe` with direction classes), and the animation is triggered via `animated` state on mount
- `GirlsHomePage.tsx` (For Her page) has its own category circles — swipe-in animation is NOT wired there

## Requested Changes (Diff)

### Add
- For Him (`BoysHomePage.tsx`) category circles: ensure swipe-in from all 4 directions is working correctly (already partially implemented — verify and fix if needed)

### Modify
1. **Label/heading/form field text color** — update all `[data-customer-page="true"]` and `[data-admin-scope="true"]` label, h1–h6 selectors in `src/index.css` to use `#006A4E` instead of `oklch(var(--bottle-green-dark))`
2. **Banner background** — update `MarqueeBanner.tsx` inline style from `oklch(var(--gold-medium))` to `#FFBF00`
3. **Banner text color** — update `.marquee-text` color in `MarqueeBanner.tsx` from `oklch(var(--bottle-green-dark))` to `#142d12`
4. **For Him category circles swipe-in** — verify `BoysHomePage.tsx` swipe animation is correctly triggering from all 4 directions simultaneously; fix any issues

### Remove
- Nothing removed

## Implementation Plan
1. In `src/frontend/src/index.css`: change all label/heading color rules under `[data-customer-page="true"]` and `[data-admin-scope="true"]` from `oklch(var(--bottle-green-dark))` to `#006A4E`
2. In `MarqueeBanner.tsx`: change the banner wrapper `backgroundColor` style from `oklch(var(--gold-medium))` to `#FFBF00`; change `.marquee-text` color from `oklch(var(--bottle-green-dark))` to `#142d12`
3. In `BoysHomePage.tsx`: confirm swipe animation directions cycle through `from-left`, `from-top`, `from-right`, `from-bottom` for indices 0–3; ensure `animated` state triggers correctly on mount; verify all 4 circles animate in simultaneously from their respective edges
