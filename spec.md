# Aurelie Fine Jewellery — Version 101 Lock: Label Audit + For Him Animation Fix

## Current State
- Version 101 is the locked base. All changes build on top of it.
- Labels: CSS in `index.css` already has broad selectors for `[data-customer-page="true"]` and `[data-admin-scope="true"]` targeting `label`, `h1-h6`, `span`, `p`, `th`, `legend`, `dt`, `figcaption`. Several element types are missing: `li`, `td`, `small`, `strong`, `em`, `caption`, `option`, `time`, `blockquote`.
- For Him circles: `BoysHomePage.tsx` uses `category-circle-swipe` CSS classes + `arrived` state toggle. The parent container `<div className="offwhite-surface py-12 overflow-hidden">` has `overflow-hidden` which clips the circles before they animate in from outside the container bounds — this is why the swipe animation is invisible.

## Requested Changes (Diff)

### Add
- Additional element selectors to the label color rule (`#006A4E`) in `index.css`: `li`, `td`, `small`, `strong`, `em`, `caption`, `time`, `blockquote` — for both `[data-customer-page="true"]` and `[data-admin-scope="true"]` scopes.

### Modify
- `BoysHomePage.tsx`: Remove `overflow-hidden` from the inner category section container (`offwhite-surface py-12 overflow-hidden`). Keep `overflow-x-hidden` only on the outermost `div.min-h-screen` wrapper (already present). This allows the circles to visibly swipe in from outside bounds before arriving.
- `index.css`: Ensure the `category-circle-swipe` transitions are correct and `overflow-hidden` is not blocking the animation at any ancestor level that could be globally applied.

### Remove
- Nothing removed.

## Implementation Plan
1. In `index.css`, extend the `[data-customer-page="true"]` label color block to also target `li`, `td`, `small`, `strong`, `em`, `caption`, `time`, `blockquote` with `color: #006A4E`.
2. Apply the same additional selectors to the `[data-admin-scope="true"]` block.
3. In `BoysHomePage.tsx`, remove `overflow-hidden` from the inner section container so circles can animate in from off-screen without being clipped.
4. Validate and build.
