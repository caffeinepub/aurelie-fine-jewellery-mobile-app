import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import ProfileSetupModal from './components/ProfileSetupModal';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import RouteLoadingFallback from './components/RouteLoadingFallback';

// Lazy load non-home routes for code splitting
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CustomerDashboardPage = lazy(() => import('./pages/CustomerDashboardPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const ProductCategoryPage = lazy(() => import('./pages/ProductCategoryPage'));

function AppContent() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <>
      <ProfileSetupModal
        open={showProfileSetup}
        onComplete={() => {}}
      />
    </>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Layout />
      <AppContent />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$productId',
  component: ProductDetailPage,
});

// New unified category route for /category/<slug>
const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category/$categorySlug',
  component: ProductCategoryPage,
});

const customerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: CustomerDashboardPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboardPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: CheckoutPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productRoute,
  categoryRoute,
  customerDashboardRoute,
  contactRoute,
  adminRoute,
  cartRoute,
  checkoutRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
