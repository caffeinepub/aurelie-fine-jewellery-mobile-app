import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { ShoppingCart, LayoutDashboard, LogIn, LogOut, Mail, Phone, MapPin } from 'lucide-react';
import { useIsCallerAdmin, useGetContactInfo } from '../hooks/useQueries';
import { useCart } from '../hooks/useCart';
import { Heart } from 'lucide-react';
import { Badge } from './ui/badge';

export default function Layout() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();
  const { data: contactInfo } = useGetContactInfo();
  const { getTotalItems } = useCart();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const routerState = useRouterState();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';
  const cartItemCount = getTotalItems();

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
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gold-medium/30 bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/90">
        <div className="container flex h-20 items-center justify-between px-4">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <img
              src="/assets/IMG_20260122_212029_590-2.webp"
              alt="Aurelie Fine Jewellery"
              className="h-14 w-14 object-contain"
            />
            <span className="font-serif text-2xl font-bold tracking-tight">
              Aurelie
            </span>
          </button>

          <nav className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate({ to: '/cart' })}
                  className="gap-2 relative"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItemCount}
                    </Badge>
                  )}
                  <span className="hidden sm:inline">Cart</span>
                </Button>
                <Button
                  variant={currentPath === '/dashboard' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => navigate({ to: '/dashboard' })}
                  className="gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
                {isAdmin && (
                  <Button
                    variant={currentPath === '/admin' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => navigate({ to: '/admin' })}
                    className="gap-2"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span className="hidden sm:inline">Admin</span>
                  </Button>
                )}
              </>
            )}
            <Button
              onClick={handleAuth}
              disabled={disabled}
              size="sm"
              variant={isAuthenticated ? 'outline' : 'default'}
            >
              {isAuthenticated ? (
                <>
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
                </>
              )}
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content with Animated Luxury Satin Ivory Shimmer Background */}
      <main className="flex-1 shimmering-ivory">
        <Outlet />
      </main>

      {/* Footer with Blood Maroon Background */}
      <footer className="border-t border-gold-medium/30 bg-blood-maroon backdrop-blur py-8">
        <div className="container px-4">
          <div className="flex flex-col items-center gap-6 text-center">
            <img
              src="/assets/IMG_20260122_212029_590-2.webp"
              alt="Aurelie Fine Jewellery"
              className="h-16 w-16 object-contain"
            />
            
            {/* Contact Details */}
            {contactInfo && (
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center text-sm">
                <a 
                  href={`mailto:${contactInfo.contactEmail}`}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <Mail className="h-4 w-4" />
                  <span>{contactInfo.contactEmail}</span>
                </a>
                <a 
                  href={`tel:${contactInfo.phoneNumber}`}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <Phone className="h-4 w-4" />
                  <span>{contactInfo.phoneNumber}</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{contactInfo.address}</span>
                </div>
              </div>
            )}

            <p className="text-sm">
              © 2026. Built with <Heart className="inline h-4 w-4 fill-current" /> using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:opacity-80 hover:underline transition-opacity"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
