import { lazy, Suspense, useState, useEffect } from 'react';
import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import Layout from './components/Layout';
import RouteLoadingFallback from './components/RouteLoadingFallback';
import ProfileSetupModal from './components/ProfileSetupModal';
import SplashScreen from './components/SplashScreen';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const PaymentSuccessPage = lazy(() => import('./pages/PaymentSuccessPage'));
const PaymentFailurePage = lazy(() => import('./pages/PaymentFailurePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CustomerDashboardPage = lazy(() => import('./pages/CustomerDashboardPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const ProfileDetailsPage = lazy(() => import('./pages/ProfileDetailsPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const AdminOrdersPage = lazy(() => import('./pages/admin/AdminOrdersPage'));
const CategoryEditPage = lazy(() => import('./pages/admin/CategoryEditPage'));
const ProductCategoryPage = lazy(() => import('./pages/ProductCategoryPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const ShippingPolicyPage = lazy(() => import('./pages/ShippingPolicyPage'));
const TermsConditionsPage = lazy(() => import('./pages/TermsConditionsPage'));

// Gender home pages
const BoysHomePage = lazy(() => import('./pages/BoysHomePage'));
const GirlsHomePage = lazy(() => import('./pages/GirlsHomePage'));

// Girls category pages
const BridalJewelleryPage = lazy(() => import('./pages/categories/BridalJewelleryPage'));
const RingsPage = lazy(() => import('./pages/categories/RingsPage'));
const EarringsPage = lazy(() => import('./pages/categories/EarringsPage'));
const NecklacePage = lazy(() => import('./pages/categories/NecklacePage'));
const AnkletsPage = lazy(() => import('./pages/categories/AnkletsPage'));
const LabGrownDiamondsJewelleryPage = lazy(() => import('./pages/categories/LabGrownDiamondsJewelleryPage'));

// Boys category pages
const BoysChainsPage = lazy(() => import('./pages/categories/boys/BoysChainsPage'));
const BoysBraceletPage = lazy(() => import('./pages/categories/boys/BoysBraceletPage'));
const BoysRingsPage = lazy(() => import('./pages/categories/boys/BoysRingsPage'));
const BoysLabDiamondsPage = lazy(() => import('./pages/categories/boys/BoysLabDiamondsPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function ProfileSetupWrapper() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  const isAuthenticated = !!identity;

  useEffect(() => {
    if (isAuthenticated && !profileLoading && isFetched && userProfile === null) {
      setShowProfileSetup(true);
    } else {
      setShowProfileSetup(false);
    }
  }, [isAuthenticated, profileLoading, isFetched, userProfile]);

  return (
    <ProfileSetupModal
      open={showProfileSetup}
      onComplete={() => setShowProfileSetup(false)}
    />
  );
}

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

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <ContactPage />
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

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/orders',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <OrdersPage />
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

const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/orders',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <AdminOrdersPage />
    </Suspense>
  ),
});

const categoryEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/categories/$categorySlug/edit',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <CategoryEditPage />
    </Suspense>
  ),
});

const productCategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category/$categorySlug',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <ProductCategoryPage />
    </Suspense>
  ),
});

const bridalJewelleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category/bridal-jewellery',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <BridalJewelleryPage />
    </Suspense>
  ),
});

const ringsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category/rings',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <RingsPage />
    </Suspense>
  ),
});

const earringsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category/earrings',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <EarringsPage />
    </Suspense>
  ),
});

const necklaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category/necklace',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <NecklacePage />
    </Suspense>
  ),
});

const ankletsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category/anklets',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <AnkletsPage />
    </Suspense>
  ),
});

const labGrownDiamondsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category/lab-diamonds-jewellery',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <LabGrownDiamondsJewelleryPage />
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

// Gender home pages
const boysHomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/boys',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <BoysHomePage />
    </Suspense>
  ),
});

const girlsHomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/girls',
  component: () => (
    <Suspense fallback={<RouteLoadingFallback />}>
      <GirlsHomePage />
    </Suspense>
  ),
});

// Boys sub-category routes
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
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  contactRoute,
  dashboardRoute,
  ordersRoute,
  profileRoute,
  adminRoute,
  adminOrdersRoute,
  categoryEditRoute,
  productCategoryRoute,
  bridalJewelleryRoute,
  ringsRoute,
  earringsRoute,
  necklaceRoute,
  ankletsRoute,
  labGrownDiamondsRoute,
  privacyPolicyRoute,
  shippingPolicyRoute,
  termsConditionsRoute,
  // Gender home pages
  boysHomeRoute,
  girlsHomeRoute,
  // Boys sub-category routes
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
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if splash has been shown in this session
    const splashShown = sessionStorage.getItem('splashShown');
    if (splashShown) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <RouterProvider router={router} />
        <Toaster />
        <ProfileSetupWrapper />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
