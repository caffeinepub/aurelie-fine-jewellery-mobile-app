import { Outlet, useNavigate, useLocation } from '@tanstack/react-router';
import { Suspense, useState, useRef, useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { ShoppingCart, User, LogOut, UserCircle, ShoppingBag, Settings, Search, X } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import RouteLoadingFallback from './RouteLoadingFallback';
import FooterSystem from './footer/FooterSystem';
import MarqueeBanner from './MarqueeBanner';
import GenderCategoryTabs from './GenderCategoryTabs';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { useNavigate as useTanstackNavigate } from '@tanstack/react-router';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { items } = useCart();
  const { data: isAdmin } = useIsCallerAdmin();

  // Search bar state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';
  const isHomePage = location.pathname === '/';
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  // Close search on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to home with search query as hash/param for filtering
      navigate({ to: '/', search: { q: searchQuery.trim() } as any });
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

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
      <header
        className={`sticky top-0 z-50 w-full border-b border-gold-medium/20 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
          isHomePage ? 'bg-[#fafaf8]' : 'bg-background/95'
        }`}
      >
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
          <nav className="flex items-center gap-2">
            {/* Search bar container */}
            <div ref={searchContainerRef} className="flex items-center">
              {/* Animated search input */}
              <div
                className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${
                  searchOpen ? 'w-48 sm:w-64 opacity-100' : 'w-0 opacity-0'
                }`}
              >
                <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search jewellery..."
                    className="w-full h-8 px-3 text-sm bg-beige-light border border-gold-medium/30 rounded-l-full focus:outline-none focus:border-gold-medium text-bottle-green-dark placeholder:text-muted-foreground"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="h-8 px-2 bg-beige-light border-t border-b border-gold-medium/30 text-muted-foreground hover:text-bottle-green-dark"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </form>
              </div>

              {/* Search icon button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (searchOpen && searchQuery.trim()) {
                    handleSearchSubmit({ preventDefault: () => {} } as React.FormEvent);
                  } else {
                    setSearchOpen((prev) => !prev);
                    if (searchOpen) setSearchQuery('');
                  }
                }}
                className={`text-bottle-green-dark hover:text-gold-medium transition-colors ${
                  searchOpen ? 'text-gold-medium' : ''
                }`}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>

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

      {/* Marquee Banner - just below header, above gender tabs */}
      {!isAdminRoute && <MarqueeBanner />}

      {/* Gender Category Tabs - hidden on admin routes */}
      {!isAdminRoute && <GenderCategoryTabs />}

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
