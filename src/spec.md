# Specification

## Summary
**Goal:** Update the header dropdown labeling/styling and show only the relevant category carousel at the top of each product detail page based on a per-product category identifier.

**Planned changes:**
- Rename the header navigation dropdown label from “Categories” to “Our Products”.
- Make the header dropdown menu container background transparent while keeping menu items readable and clickable.
- Add a persistent category slug/identifier field to Product data, ensure it’s editable in the admin product create/edit flow, and returned by product APIs (without breaking legacy products).
- Update the product detail page to render only the carousel(s) for the product’s configured category (as defined by existing admin category carousel configuration) at the top of the page; omit the section if no category is set.

**User-visible outcome:** The header shows “Our Products” with a transparent dropdown menu, and each product page displays only its relevant category carousel at the top (or no carousel if the product has no category set).
