import CategoryImageCarousel from './CategoryImageCarousel';
import { PRODUCT_CATEGORIES } from '../utils/productCategories';

export default function HomeCategoryCarouselsSection() {
  return (
    <section className="w-full py-12 bg-beige-light/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-bottle-green-dark">
          Explore Our Collections
        </h2>
        
        <div className="space-y-16">
          {PRODUCT_CATEGORIES.map((category) => (
            <div key={category.slug} className="space-y-6">
              {/* Category Title */}
              <div className="text-center">
                <h3 className="text-2xl font-serif font-semibold text-gold-dark mb-2">
                  {category.title}
                </h3>
                <p className="text-bottle-green-medium max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>
              
              {/* Category Carousels */}
              <div className="space-y-6">
                <CategoryImageCarousel 
                  categorySlug={category.slug} 
                  carouselIndex={1}
                />
                <CategoryImageCarousel 
                  categorySlug={category.slug} 
                  carouselIndex={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
