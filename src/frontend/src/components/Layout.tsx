import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { ShoppingCart, LayoutDashboard, LogIn, LogOut } from 'lucide-react';
import { useIsCallerAdmin, useGetContactInfo, useGetSiteContent } from '../hooks/useQueries';
import { useCart } from '../hooks/useCart';
import { Badge } from './ui/badge';
import { useState, useEffect } from 'react';
import FooterSystem from './footer/FooterSystem';

export default function Layout() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();
  const { data: contactInfo } = useGetContactInfo();
  const { data: siteContent } = useGetSiteContent();
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

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      navigate({ to: '/' });
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

  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with New Branding - Fully Transparent */}
      <header
        className={`sticky top-0 z-50 w-full border-b border-gold-medium/20 bg-transparent transition-all duration-300 ${
          scrolled ? 'h-16' : 'h-20'
        }`}
      >
        <div className="container flex items-center justify-between px-4 h-full">
          <button
            onClick={() => navigate({ to: '/' })}
            className={`header-brand-btn flex items-center gap-3 transition-all duration-300 hover:opacity-80 ${
              scrolled ? 'scale-90' : 'scale-100'
            }`}
          >
            <img
              src="/assets/generated/aurelie-icon-transparent.dim_512x512.png"
              alt="Aurelie Icon"
              className={`object-contain transition-all duration-300 ${scrolled ? 'h-10 w-10' : 'h-14 w-14'}`}
            />
            <img
              src="/assets/generated/aurelie-wordmark-goldshine-transparent.dim_1600x500.png"
              alt="Aurelie Fine Jewellery"
              className={`object-contain transition-all duration-300 ${scrolled ? 'h-6' : 'h-8'}`}
              style={{ width: 'auto' }}
            />
          </button>

          <nav className="flex items-center gap-1">
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
            <button
              onClick={handleAuth}
              disabled={disabled}
              className="header-nav-btn-didot gap-2 px-4 py-2 rounded-md transition-opacity hover:opacity-70"
            >
              {isAuthenticated ? (
                <>
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm font-light tracking-wide">Logout</span>
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm font-light tracking-wide">Login</span>
                </>
              )}
            </button>
          </nav>
        </div>
        <div className="hairline-gold-divider" />
      </header>

      {/* Main Content with Shimmering Beige Background */}
      <main className="flex-1 shimmering-beige">
        <Outlet />
      </main>

      {/* Footer System - Always Split Layout */}
      <FooterSystem
        contactInfo={contactInfo}
        footerContent={siteContent?.footerContent}
      />
    </div>
  );
}
