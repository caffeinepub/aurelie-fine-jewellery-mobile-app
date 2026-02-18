import { Outlet, useNavigate } from '@tanstack/react-router';
import { Suspense } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { ShoppingCart, User, LogOut, UserCircle, ShoppingBag, Settings } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import RouteLoadingFallback from './RouteLoadingFallback';
import FooterSystem from './footer/FooterSystem';
import { PRODUCT_CATEGORIES } from '../utils/productCategories';
import HeaderCategoryNav from './HeaderCategoryNav';
import { useIsCallerAdmin } from '../hooks/useQueries';

export default function Layout() {
  const navigate = useNavigate();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { items } = useCart();
  const { data: isAdmin } = useIsCallerAdmin();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gold-medium/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <button
            onClick={() => navigate({ to: '/' })}
            className="header-brand-btn flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/assets/generated/aurelie-lockup-transparent.dim_1000x320.png"
              alt="Aurelie Fine Jewellery"
              className="h-10 w-auto"
            />
          </button>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            {/* Our Products Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-bottle-green-dark hover:text-gold-medium">
                  Our Products
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background/95 backdrop-blur border-gold-medium/30">
                {PRODUCT_CATEGORIES.map((category) => (
                  <DropdownMenuItem
                    key={category.slug}
                    onClick={() => navigate({ to: `/category/${category.slug}` })}
                    className="cursor-pointer hover:bg-gold-medium/10"
                  >
                    {category.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate({ to: '/cart' })}
              className="relative text-bottle-green-dark hover:text-gold-medium"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gold-medium text-xs font-semibold text-secondary flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {/* Account / Login */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-bottle-green-dark hover:text-gold-medium">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background/95 backdrop-blur border-gold-medium/30">
                  <DropdownMenuItem
                    onClick={() => navigate({ to: '/profile' })}
                    className="cursor-pointer hover:bg-gold-medium/10"
                  >
                    <UserCircle className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate({ to: '/orders' })}
                    className="cursor-pointer hover:bg-gold-medium/10"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Orders
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => navigate({ to: '/admin' })}
                        className="cursor-pointer hover:bg-gold-medium/10"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Admin
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleAuth}
                    className="cursor-pointer hover:bg-gold-medium/10"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleAuth}
                disabled={disabled}
                className="bg-gold-medium hover:bg-gold-dark text-secondary"
              >
                {disabled ? 'Logging in...' : 'Login'}
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Header Category Navigation */}
      <HeaderCategoryNav />

      {/* Main Content */}
      <main className="flex-1 bg-beige-champagne">
        <Suspense fallback={<RouteLoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>

      {/* Footer */}
      <FooterSystem />
    </div>
  );
}
