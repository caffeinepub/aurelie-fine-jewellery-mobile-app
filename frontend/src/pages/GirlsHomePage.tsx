import { useNavigate } from '@tanstack/react-router';
import { useGetAllCategoryHeaders } from '../hooks/useCategoryHeaderNav';
import { GIRLS_CATEGORIES } from '../utils/productCategories';
import CustomerPageStyleScope from '../components/CustomerPageStyleScope';
import HeaderCategoryNav from '../components/HeaderCategoryNav';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

// Directions for each circle index (cycles through all 4 edges)
const SWIPE_DIRECTIONS = ['from-left', 'from-top', 'from-right', 'from-bottom', 'from-left', 'from-top'];

export default function GirlsHomePage() {
  const navigate = useNavigate();
  const { data: categoryHeaders, isLoading } = useGetAllCategoryHeaders();
  const [animated, setAnimated] = useState(false);

  const headersMap = new Map(categoryHeaders || []);

  // Trigger animation on mount / each navigation to this page
  useEffect(() => {
    setAnimated(false);
    const timer = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (categorySlug: string, redirectUrl?: string) => {
    if (redirectUrl && redirectUrl.trim()) {
      if (redirectUrl.startsWith('http://') || redirectUrl.startsWith('https://')) {
        window.location.href = redirectUrl;
      } else {
        navigate({ to: redirectUrl as any });
      }
    } else {
      navigate({ to: `/category/${categorySlug}` as any });
    }
  };

  return (
    <CustomerPageStyleScope>
      <div className="min-h-screen overflow-x-hidden">
        {/* Hero Header */}
        <div className="offwhite-surface py-12 text-center border-b border-gold-medium/20">
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-3 text-bottle-green-dark">
            For Her
          </h1>
          <p className="text-bottle-green-medium text-lg max-w-xl mx-auto">
            Timeless elegance and luxury jewellery for every occasion
          </p>
        </div>

        {/* Product Category Navigation (moved from global header) */}
        <div className="offwhite-surface border-b border-gold-medium/20">
          <HeaderCategoryNav forceShow />
        </div>

        {/* Sub-categories */}
        <div className="offwhite-surface py-12 overflow-hidden">
          <div className="container px-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-10 w-10 animate-spin text-gold-medium" />
              </div>
            ) : (
              <div className="flex items-start gap-8 overflow-x-auto hide-scrollbar pb-4 justify-center flex-wrap md:flex-nowrap">
                {GIRLS_CATEGORIES.map((category, index) => {
                  const header = headersMap.get(category.slug);
                  const imageUrl = header?.image?.getDirectURL();
                  const redirectUrl = header?.redirectUrl;
                  const direction = SWIPE_DIRECTIONS[index % SWIPE_DIRECTIONS.length];

                  return (
                    <button
                      key={category.slug}
                      onClick={() => handleCategoryClick(category.slug, redirectUrl)}
                      className={`flex flex-col items-center gap-3 min-w-[100px] hover:opacity-80 transition-all duration-200 group shrink-0 category-circle-swipe ${direction} ${animated ? 'arrived' : ''}`}
                      style={{ transitionDelay: `${index * 0}ms` }}
                    >
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gold-medium/40 group-hover:border-gold-medium transition-all duration-200 shadow-md group-hover:shadow-gold bg-beige-champagne flex items-center justify-center">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={category.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-beige-champagne to-gold-medium/20">
                            <span className="text-2xl font-serif text-gold-medium font-bold">
                              {category.title.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium text-bottle-green-dark tracking-wide text-center font-serif">
                        {category.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center py-6">
          <div className="h-px w-24 bg-gold-medium/40" />
          <div className="mx-4 text-gold-medium text-lg">✦</div>
          <div className="h-px w-24 bg-gold-medium/40" />
        </div>

        {/* Tagline */}
        <div className="text-center pb-12 px-4">
          <p className="font-serif text-bottle-green-medium italic text-base">
            Select a category to explore our exclusive collection
          </p>
        </div>
      </div>
    </CustomerPageStyleScope>
  );
}
