# Specification

## Summary
**Goal:** Add a small, horizontally scrollable circular category navigation row under the header, with admin-managed category images and click-through URLs, plus an Admin link in the user dropdown for admins.

**Planned changes:**
- Add a horizontal, scrollable row of small circular category tiles directly below the site header on customer-facing pages; show the category image inside a circle with the category name below in bottle-green.
- Make each category tile navigate to an admin-configured URL when set; otherwise default to the existing internal route `/category/<categorySlug>` (support external `http(s)` URLs too).
- Add backend persistence and APIs to store/retrieve per-`categorySlug` data for the header row: circular image blob and optional URL; restrict updates to admin-only callers.
- Add an Admin Dashboard UI to upload/replace each category’s image and set/update its URL; save to backend and reflect changes on the customer-facing header row after save.
- Update the authenticated user dropdown in the header to show an “Admin” menu item only for admin users, routing to `/admin`.

**User-visible outcome:** Customers see a small, scrollable circular category strip under the header that navigates to the correct category links, while admins can manage each category’s image and URL from the Admin Dashboard and see an “Admin” option in their header dropdown.
