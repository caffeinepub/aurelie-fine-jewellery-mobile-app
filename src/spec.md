# Aurelie Fine Jewellery Mobile App

## Overview
A mobile-responsive e-commerce application for Aurelie Fine Jewellery featuring UPI payments, order management, and customer communication with separate dashboards for customers and admins.

## Core Features

### Customer Dashboard
- **Product Catalog**: Browse and view fine jewellery products with detailed information and images
- **Shopping Cart**: Add products to cart and manage cart items
- **UPI Payments**: Pay with UPI functionality at checkout with UPI ID input or QR code display
- **Buy Now**: Direct purchase option bypassing cart for immediate checkout
- **Authentication**: Internet Identity integration for secure customer login
- **Order Tracking**: View own order history and real-time order status updates (pending, confirmed, shipped, delivered, cancelled)
- **Order Cancellation**: Cancel orders within 12 hours of placement with reason selection/input and automatic button disable after time limit
- **Contact Form**: Customer inquiry form for personalized requests and general communication
- **Inquiry History**: View own submitted inquiries and responses
- **Shipping Address Confirmation**: Checkout process includes shipping address confirmation step with automatic retrieval of stored personal details (name, email, phone, address) from user profile and editable form for address validation

### Admin Dashboard
- **Administrative Interface**: Separate admin dashboard for business management
- **Add Product Tab**: Form interface for creating new products and editing existing products with all necessary fields
- **Product List and Inventory Management**: View all products with stock levels, sales status, and inventory monitoring capabilities
- **Realtime Order Tracking**: Live view of all customer orders with current status updates, order details, and cancellation reasons
- **Order Management**: View all customer orders and update order statuses including cancelled orders
- **Customer Communications**: Access and respond to customer inquiries
- **Edit Tab**: Administrative interface to modify general site content including contact details, footer information, and static informational text

## Data Storage (Backend)
- **Products**: Jewellery items with details, pricing, and availability
- **Shopping Carts**: Customer cart items and quantities
- **Orders**: Customer purchase records with status tracking, UPI payment details, order timestamps, cancellation status, and cancellation reasons
- **Customer Inquiries**: Contact form submissions and communications
- **User Profiles**: Customer account information linked to Internet Identity
- **Site Content**: Editable contact details, footer information, and static text content
- **Admin Permissions**: User roles and administrative access controls with email-based admin identification

## Admin Access Control
- **Email-based Admin Access**: Grant admin role to user account associated with email `aureliefinejewellery06@gmail.com`
- **Full Administrative Permissions**: Admin user has complete access to manage products, view and update orders, respond to inquiries, and edit site content
- **Role Verification**: System verifies admin permissions for dashboard access and administrative functions

## Order Cancellation System
- **Time-based Cancellation**: Orders can be cancelled within 12 hours of placement
- **Cancellation Reasons**: Customers can select from dropdown options or enter custom cancellation reasons
- **Status Updates**: Cancelled orders update status to "Cancelled" with reason recording
- **Automatic Disabling**: Cancel button automatically hides/disables after 12-hour window
- **Help Note**: Display "Cancel is available for 12hrs post order is placed. For more help contact customer support."
- **Admin Visibility**: Cancelled orders and reasons visible in admin dashboard for tracking

## Checkout Process
- **Shipping Address Confirmation**: Prominent step in checkout process to confirm shipping address before payment
- **Profile Data Retrieval**: Automatically retrieve user's stored personal details (name, email, phone, address) using existing `getCallerUserProfile` query
- **Address Validation**: Display retrieved details in editable form section for user confirmation and updates
- **Confirmation Step**: Required "Confirm Shipping Address" step before proceeding to UPI payment

## Currency and Pricing
- **Indian Rupee (INR)**: All prices displayed in Indian Rupees with ₹ symbol
- **Currency Formatting**: Indian currency style formatting (e.g., ₹12,999)
- **Consistent Display**: INR pricing across all interfaces including product cards, product detail pages, cart, checkout, order summaries, receipts, admin panels, product management forms, and inventory displays

## Design Requirements
- Mobile-responsive design optimized for mobile devices
- **Multi-toned beige gradients** throughout the body background for a warmer luxury feel
- **Dark bottle green backgrounds** as the primary color for headers, navigation, and key sections
- **Reduced mushroom ivory** usage with selective application for cards and complementary elements
- **Metallic golden text color** for all text elements including navigation links, labels, headings, and paragraphs throughout the application
- **Gold gradients** for headings, buttons, and borders to harmonize with the logo's serif gold lettering
- **Elegant serif typography** (Playfair Display or similar luxury serif font) matching the logo's sophisticated style
- **Aurelie logo integration** seamlessly overlaid with header and footer themes, naturally integrated with dark bottle green and beige gradient backgrounds
- **Polished footer** with gold-styled contact details including official email, phone number, and address with proper layout and legibility
- Premium luxury aesthetic maintaining readability and elegance across the new color palette
- Application content in English

## CheckoutPage Professional Redesign
- **Professional Theme**: Redesigned CheckoutPage with refined color gradients, polished typography, and high-end UI elements
- **Luxury Branding Consistency**: Maintain consistency with Aurelie's luxury branding throughout the checkout experience
- **Premium Aesthetic**: Apply refined tone with metallic gold accents complementing the main bottle green and beige palette
- **Typography Consistency**: Use the same elegant serif typography (Playfair Display) and metallic golden text color rules
- **Cohesive Design**: Ensure the checkout experience looks premium and cohesive with the overall application design

## Authentication
- Internet Identity integration for secure customer authentication
- Admin access controls for dashboard functionality with email-based admin role assignment
- Role-based dashboard routing (customers vs admins)

## Payment Processing
- UPI payment integration for secure payment processing
- UPI ID input functionality and QR code display options
- Support for standard UPI payment methods within the app

## Product Interaction
- **Add to Cart** buttons on all product cards and detail pages
- **Buy Now** buttons on all product cards and detail pages for direct checkout
- Cart management with quantity updates and item removal
