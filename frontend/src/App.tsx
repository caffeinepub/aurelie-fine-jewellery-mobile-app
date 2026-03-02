import React, { Suspense, lazy } from 'react';
import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import RouteLoadingFallback from './components/RouteLoadingFallback';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ContactDetailsPage = lazy(() => import('./pages/ContactDetailsPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const CustomerDashboardPage = lazy(() => import('./pages/CustomerDashboardPage'));
const ProfileDetailsPage = lazy(() => import('./pages/ProfileDetailsPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const AdminProductsPage = lazy(() => import('./pages/admin/AdminProductsPage'));
const AdminOrdersPage = lazy(() => import('./pages/admin/AdminOrdersPage'));
const AdminInquiriesPage = lazy(() => import('./pages/admin/AdminInquiriesPage'));
const AdminSiteContentPage = lazy(() => import('./pages/admin/AdminSiteContentPage'));
const AdminCarouselPage = lazy(() => import('./pages/admin/AdminCarouselPage'));
const AdminBannerPage = lazy(() => import('./pages/admin/AdminBannerPage'));
const AdminCategoriesPage = lazy(() => import('./pages/admin/AdminCategoriesPage'));
const PaymentSuccessPage = lazy(() => import('./pages/PaymentSuccessPage'));
const PaymentFailurePage = lazy(() => import('./pages/PaymentFailurePage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const ShippingPolicyPage = lazy(() => import('./pages/ShippingPolicyPage'));
const TermsConditionsPage = lazy(() => import('./pages/TermsConditionsPage'));
const GirlsHomePage = lazy(() => import('./pages/GirlsHomePage'));
const BoysHomePage = lazy(() => import('./pages/BoysHomePage'));

// Category pages - Girls
const RingsPage = lazy(() => import('./pages/categories/RingsPage'));
const EarringsPage = lazy(() => import('./pages/categories/EarringsPage'));
const NecklacePage = lazy(() => import('./pages/categories/NecklacePage'));
const AnkletsPage = lazy(() => import('./pages/categories/AnkletsPage'));
const BridalJewelleryPage = lazy(() => import('./pages/categories/BridalJewelleryPage'));
const LabGrownDiamondsJewelleryPage = lazy(() => import('./pages/categories/LabGrownDiamondsJewelleryPage'));

// Category pages - Boys
const BoysChainsPage = lazy(() => import('./pages/categories/boys/BoysChainsPage'));
const BoysBraceletPage = lazy(() => import('./pages/categories/boys/BoysBraceletPage'));
const BoysRingsPage = lazy(() => import('./pages/categories/boys/BoysRingsPage'));
const BoysLabDiamondsPage = lazy(() => import('./pages/categories/boys/BoysLabDiamondsPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

// Root route uses Layout directly as component (Layout renders <Outlet /> internally)
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <HomePage />
    </Suspense>
  ),
});

const girlsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/girls',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <GirlsHomePage />
    </Suspense>
  ),
});

const boysRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/boys',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <BoysHomePage />
    </Suspense>
  ),
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$productId',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <ProductDetailPage />
    </Suspense>
  ),
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <CartPage />
    </Suspense>
  ),
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <CheckoutPage />
    </Suspense>
  ),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <ContactPage />
    </Suspense>
  ),
});

const contactDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact-details',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <ContactDetailsPage />
    </Suspense>
  ),
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/orders',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <OrdersPage />
    </Suspense>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <CustomerDashboardPage />
    </Suspense>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <ProfileDetailsPage />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <AdminDashboardPage />
    </Suspense>
  ),
});

const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/products',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <AdminProductsPage />
    </Suspense>
  ),
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/orders',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <AdminOrdersPage />
    </Suspense>
  ),
});

const adminInquiriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/inquiries',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <AdminInquiriesPage />
    </Suspense>
  ),
});

const adminSiteContentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/site-content',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <AdminSiteContentPage />
    </Suspense>
  ),
});

const adminCarouselRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/carousel',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <AdminCarouselPage />
    </Suspense>
  ),
});

const adminBannerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/banner',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <AdminBannerPage />
    </Suspense>
  ),
});

const adminCategoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/categories',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <AdminCategoriesPage />
    </Suspense>
  ),
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-success',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <PaymentSuccessPage />
    </Suspense>
  ),
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-failure',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <PaymentFailurePage />
    </Suspense>
  ),
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <PrivacyPolicyPage />
    </Suspense>
  ),
});

const shippingPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/shipping-policy',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <ShippingPolicyPage />
    </Suspense>
  ),
});

const termsConditionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms-conditions',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <TermsConditionsPage />
    </Suspense>
  ),
});

// Girls category routes
const ringsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/rings',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <RingsPage />
    </Suspense>
  ),
});

const earringsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/earrings',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <EarringsPage />
    </Suspense>
  ),
});

const necklaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/necklace',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <NecklacePage />
    </Suspense>
  ),
});

const ankletsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/anklets',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <AnkletsPage />
    </Suspense>
  ),
});

const bridalJewelleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bridal-jewellery',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <BridalJewelleryPage />
    </Suspense>
  ),
});

const labGrownDiamondsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lab-diamonds-jewellery',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <LabGrownDiamondsJewelleryPage />
    </Suspense>
  ),
});

// Boys category routes
const boysChainsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/boys/chains',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <BoysChainsPage />
    </Suspense>
  ),
});

const boysBraceletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/boys/bracelet',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <BoysBraceletPage />
    </Suspense>
  ),
});

const boysRingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/boys/rings',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <BoysRingsPage />
    </Suspense>
  ),
});

const boysLabDiamondsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/boys/lab-diamonds',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <BoysLabDiamondsPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  girlsRoute,
  boysRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  contactRoute,
  contactDetailsRoute,
  ordersRoute,
  dashboardRoute,
  profileRoute,
  adminRoute,
  adminProductsRoute,
  adminOrdersRoute,
  adminInquiriesRoute,
  adminSiteContentRoute,
  adminCarouselRoute,
  adminBannerRoute,
  adminCategoriesRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  privacyPolicyRoute,
  shippingPolicyRoute,
  termsConditionsRoute,
  ringsRoute,
  earringsRoute,
  necklaceRoute,
  ankletsRoute,
  bridalJewelleryRoute,
  labGrownDiamondsRoute,
  boysChainsRoute,
  boysBraceletRoute,
  boysRingsRoute,
  boysLabDiamondsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
