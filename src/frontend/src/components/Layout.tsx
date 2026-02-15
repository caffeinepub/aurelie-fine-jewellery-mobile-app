import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { ShoppingCart, LayoutDashboard, LogIn, User, LogOut, ChevronDown } from 'lucide-react';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { useCart } from '../hooks/useCart';
import { Badge } from './ui/badge';
import { useState, useEffect, Suspense } from 'react';
import FooterSystem from './footer/FooterSystem';
import RouteLoadingFallback from './RouteLoadingFallback';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';

const CATEGORIES = [
  { slug: 'necklace', label: 'Necklace' },
  { slug: 'earrings', label: 'Earrings' },
  { slug: 'rings', label: 'Rings' },
  { slug: 'anklets', label: 'Anklets' },
  { slug: 'lab-diamonds-jewellery', label: 'Lab Diamonds Jewellery' },
  { slug: 'bridal-jewellery', label: 'Bridal Jewellery' },
];

export default function Layout() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();
  const { getTotalItems } = useCart();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const routerState = useRouterState();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';
  const cartItemCount = getTotalItems();

  const [scrolled, setScrolled] = useState(false);

  // Scroll listener for compress behavior
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
  };

  const handleCategoryClick = (slug: string) => {
    navigate({ to: '/category/$categorySlug', params: { categorySlug: slug } });
  };

  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Transparent Logo Lockup */}
      <header
        className={`sticky top-0 z-50 w-full border-b border-gold-medium/20 bg-transparent transition-all duration-300 ${
          scrolled ? 'h-16' : 'h-20'
        }`}
      >
        <div className="container flex items-center justify-between px-4 h-full">
          <button
            onClick={() => navigate({ to: '/' })}
            className={`header-brand-btn flex items-center transition-all duration-300 hover:opacity-80 ${
              scrolled ? 'scale-90' : 'scale-100'
            }`}
          >
            <img
              src="/assets/generated/aurelie-lockup-transparent.dim_1000x320.png"
              alt="Aurelie Fine Jewellery"
              className={`object-contain transition-all duration-300 ${
                scrolled ? 'h-12' : 'h-16'
              }`}
            />
          </button>

          <nav className="flex items-center gap-1">
            {/* Our Products Dropdown with Transparent Background */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="header-nav-btn-didot gap-1 px-3 py-2 rounded-md transition-opacity hover:opacity-70">
                  <span className="text-sm font-light tracking-wide">Our Products</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-transparent backdrop-blur-md border-gold-medium/30"
              >
                {CATEGORIES.map((category) => (
                  <DropdownMenuItem
                    key={category.slug}
                    onClick={() => handleCategoryClick(category.slug)}
                    className="cursor-pointer text-foreground hover:bg-gold-medium/20"
                  >
                    {category.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {isAuthenticated && (
              <>
                <button
                  onClick={() => navigate({ to: '/cart' })}
                  className="header-nav-btn-didot gap-2 relative px-3 py-2 rounded-md transition-opacity hover:opacity-70"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItemCount}
                    </Badge>
                  )}
                  <span className="hidden sm:inline text-sm font-light tracking-wide">Cart</span>
                </button>
                <button
                  onClick={() => navigate({ to: '/dashboard' })}
                  className={`header-nav-btn-didot gap-2 px-3 py-2 rounded-md transition-opacity hover:opacity-70 ${
                    currentPath === '/dashboard' ? 'opacity-100' : 'opacity-70'
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm font-light tracking-wide">Dashboard</span>
                </button>
                {isAdmin && (
                  <button
                    onClick={() => navigate({ to: '/admin' })}
                    className={`header-nav-btn-didot gap-2 px-3 py-2 rounded-md transition-opacity hover:opacity-70 ${
                      currentPath === '/admin' ? 'opacity-100' : 'opacity-70'
                    }`}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span className="hidden sm:inline text-sm font-light tracking-wide">Admin</span>
                  </button>
                )}
              </>
            )}

            {/* Auth Control - Dropdown when logged in, Login button when logged out */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="header-nav-btn-didot gap-2 px-3 py-2 rounded-md transition-opacity hover:opacity-70">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline text-sm font-light tracking-wide">Account</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-48 bg-transparent backdrop-blur-md border-gold-medium/30"
                >
                  <DropdownMenuItem
                    onClick={() => navigate({ to: '/profile' })}
                    className="cursor-pointer text-foreground hover:bg-gold-medium/20"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gold-medium/20" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-foreground hover:bg-gold-medium/20"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={handleLogin}
                disabled={disabled}
                className="header-nav-btn-didot gap-2 px-4 py-2 rounded-md transition-opacity hover:opacity-70 disabled:opacity-50"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline text-sm font-light tracking-wide">
                  {disabled ? 'Logging in...' : 'Login'}
                </span>
              </button>
            )}
          </nav>
        </div>
        <div className="hairline-gold-divider" />
      </header>

      {/* Main Content with Shimmering Beige Background */}
      <main className="flex-1 shimmering-beige">
        <Suspense fallback={<RouteLoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>

      {/* Footer System - Always Split Layout */}
      <FooterSystem />
    </div>
  );
}
