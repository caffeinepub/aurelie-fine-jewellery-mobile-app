import { useLocation, useNavigate } from '@tanstack/react-router';

export default function GenderCategoryTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const isBoysActive = location.pathname.startsWith('/boys');
  const isGirlsActive = location.pathname.startsWith('/girls');

  return (
    <div className="w-full border-b border-gold-medium/20 bg-[#fafaf8]">
      <div className="container px-4">
        <div className="flex items-center justify-center gap-0">
          <button
            onClick={() => navigate({ to: '/boys' })}
            className={`relative px-10 py-3 font-serif text-sm tracking-widest uppercase transition-all duration-200 gender-label-glow ${
              isBoysActive
                ? 'text-bottle-green-dark border-b-2 border-gold-medium font-semibold'
                : 'text-bottle-green-medium hover:text-bottle-green-dark hover:border-b-2 hover:border-gold-medium/50'
            }`}
          >
            For Him
          </button>
          <div className="w-px h-5 bg-gold-medium/30 mx-2" />
          <button
            onClick={() => navigate({ to: '/girls' })}
            className={`relative px-10 py-3 font-serif text-sm tracking-widest uppercase transition-all duration-200 gender-label-glow ${
              isGirlsActive
                ? 'text-bottle-green-dark border-b-2 border-gold-medium font-semibold'
                : 'text-bottle-green-medium hover:text-bottle-green-dark hover:border-b-2 hover:border-gold-medium/50'
            }`}
          >
            For Her
          </button>
        </div>
      </div>
    </div>
  );
}
