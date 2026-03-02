# Specification

## Summary
**Goal:** Fix two bugs on the For Her page (GirlsHomePage): category circle images not syncing with admin uploads, and an incorrect body background color.

**Planned changes:**
- Update GirlsHomePage to fetch category header nav data from the backend (same pattern as BoysHomePage) so uploaded images are displayed in the sliding category circles instead of falling back to emoji/icons.
- Show the emoji/icon only as a true fallback when no image has been uploaded for a category.
- Fix the body background color of GirlsHomePage to match other customer-facing pages (e.g., HomePage, BoysHomePage), leaving header and footer styling untouched.

**User-visible outcome:** On the For Her page, category circles show the images uploaded via the admin panel, and the page body background color is consistent with the rest of the site.
