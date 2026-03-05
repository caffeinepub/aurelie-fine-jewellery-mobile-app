# Aurelie Fine Jewellery

## Current State

A full-stack luxury jewellery e-commerce app built on the Internet Computer. Version 91 is currently deployed. The app has:

- Homepage with marquee banner, For Him / For Her tabs, main carousel, New Arrivals, category carousels with horizontal scrollable product rows beneath each
- For Him page (sub-categories: Chains, Bracelet, Rings, Lab Diamonds) and For Her page (Bridal Jewellery, Rings, Earrings, Necklace, Anklets, Lab Diamonds)
- CategoryEditPage for admin to manage images, description, display order
- Product pages with masonry grid, animated card entrance, live filter bar, recently-viewed section
- Product detail page with quantity selector, Add to Cart (icon-only), Buy Now, WhatsApp Share
- Admin panel with separate pages per section (Products, Orders, Carousel, Banner, Categories, Site Content, Inquiries)
- Backend: Category type has name, description, displayOrder, isActive, primaryImage, images — no video field
- Backend: Product has standard fields — no ring size or metal colour variant fields
- Body background is currently animated satin beige

## Requested Changes (Diff)

### Add

- **Body background dark beige**: All page bodies updated to a darker, richer beige tone. All label/text colours remain bottle-green as in Version 91. Only the body background changes — header and footer are unchanged.
- **Ring size selector on product detail page**: When the product category is "rings" (for both For Him and For Her), show a ring size selector with options 5–20 and "Adjustable". Admin defines available sizes per ring product. Customer's selection is recorded in the cart/order.
- **Metal colour selector on product detail page**: For ring-category products, show a metal colour selector with options: Yellow Gold, Rose Gold, White Gold. Admin sets available colour options per product. Customer's selection is recorded in the cart/order.
- **Sub-category videos per category**: Each sub-category (For Him: Chains, Bracelet, Rings, Lab Diamonds; For Her: Bridal Jewellery, Rings, Earrings, Necklace, Anklets, Lab Diamonds) can have a video uploaded by admin. Video auto-plays muted and looped at the top of the sub-category page. Admin uploads/updates via the existing CategoryEditPage.

### Modify

- **CategoryEditPage**: Add a video upload section so admin can set/replace the sub-category video.
- **Category backend type**: Add optional `video` field (`?Storage.ExternalBlob`) to the `Category` type and `CategoryCreate` type so per-category videos can be stored.
- **Product backend types**: Add optional `ringVariants` field to `Product`, `ProductCreate`, `ProductUpdate` containing available ring sizes (array of text, e.g. ["5","6",...,"20","Adjustable"]) and metal colours (array of text, e.g. ["Yellow Gold","Rose Gold","White Gold"]).
- **Order / Cart**: The selected ring size and metal colour are recorded in the cart item and passed through to the order (new optional fields `ringSize` and `metalColour` in OrderCreate and Order).
- **BoysHomePage / GirlsHomePage**: Show the sub-category video (auto-play, muted, loop) at the very top of the sub-category product pages (i.e. the individual ProductCategoryPage for each sub-category), not on the home page list itself.
- **ProductCategoryPage (or equivalent per-category page)**: Fetch the category's video from backend and show it at the top if present.

### Remove

- Nothing removed.

## Implementation Plan

1. **Backend (main.mo)**:
   - Add `ringVariants` optional field to `Product`, `ProductCreate`, `ProductUpdate` types: `{ sizes: [Text]; colours: [Text] }`.
   - Add `video` optional field (`?Storage.ExternalBlob`) to `Category` and `CategoryCreate` types.
   - Add `ringSize` and `metalColour` optional fields to `Order` and `OrderCreate` types.
   - Update `addCategory`, `updateCategory` to accept and store the `video` field.
   - Add `updateCategoryVideo(name: Text, video: ?Storage.ExternalBlob)` admin function.
   - Update `addProduct` and `updateProduct` to handle `ringVariants`.
   - Update `createOrder` to accept and store `ringSize` and `metalColour`.

2. **Frontend — CategoryEditPage**:
   - Add a video upload/replace section using the existing blob-storage upload pattern.
   - Display current video if set, with option to remove or replace.

3. **Frontend — ProductCategoryPage / sub-category pages**:
   - Fetch the category entity and check if it has a `video` field.
   - If present, render a muted, auto-playing, looping `<video>` element at the top of the page.

4. **Frontend — ProductDetailPage**:
   - Detect if the product's category is "rings" (case-insensitive, matches common ring slugs for both For Him and For Her).
   - If rings category: show ring size selector (chips/buttons) and metal colour selector (colour swatches or chips).
   - Available sizes come from `product.ringVariants.sizes`; available colours from `product.ringVariants.colours`.
   - Selected values stored in component state; passed to `addItem` in cart.
   - Cart and checkout flow updated to carry `ringSize` and `metalColour` through to order creation.

5. **Frontend — Body background**:
   - Update CSS / tailwind to use a darker beige for all page body backgrounds.
   - Ensure text remains bottle-green throughout. Header and footer untouched.
