import { useGetAllCategoryHeaders } from '../hooks/useCategoryHeaderNav';
import { PRODUCT_CATEGORIES } from '../utils/productCategories';
import { useNavigate, useLocation } from '@tanstack/react-router';

interface HeaderCategoryNavProps {
  /** When true, renders regardless of route (used when embedded inside a page) */
  forceShow?: boolean;
}

export default function HeaderCategoryNav({ forceShow = false }: HeaderCategoryNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: categoryHeaders } = useGetAllCategoryHeaders();

  // Don't show on admin routes (unless forceShow)
  if (!forceShow && location.pathname.startsWith('/admin')) {
    return null;
  }

  // Create a map for quick lookup
  const headersMap = new Map(categoryHeaders || []);

  const handleCategoryClick = (categorySlug: string, redirectUrl?: string) => {
    if (redirectUrl && redirectUrl.trim()) {
      // Check if it's an absolute URL
      if (redirectUrl.startsWith('http://') || redirectUrl.startsWith('https://')) {
        window.location.href = redirectUrl;
      } else {
        // Internal navigation
        navigate({ to: redirectUrl as any });
      }
    } else {
      // Default to category page
      navigate({ to: `/category/${categorySlug}` });
    }
  };

  return (
    <div className="w-full border-b border-gold-medium/20 bg-transparent backdrop-blur">
      <div className="container px-4 py-3">
        <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar">
          {PRODUCT_CATEGORIES.map((category) => {
            const header = headersMap.get(category.slug);
            const imageUrl = header?.image?.getDirectURL();
            const redirectUrl = header?.redirectUrl;

            return (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category.slug, redirectUrl)}
                className="flex flex-col items-center gap-2 min-w-[80px] hover:opacity-80 transition-opacity group shrink-0"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold-medium/30 group-hover:border-gold-medium transition-all flex items-center justify-center bg-transparent category-circle-glow">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-beige-champagne/50 flex items-center justify-center">
                      <span className="text-xs text-bottle-green-medium text-center px-1">
                        {category.title.split(' ')[0]}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium text-bottle-green-dark text-center leading-tight">
                  {category.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
