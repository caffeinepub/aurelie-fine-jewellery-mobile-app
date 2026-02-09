export interface ProductCategory {
  slug: string;
  title: string;
  description: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: 'necklace',
    title: 'Necklace',
    description: 'Elegant necklaces that frame your beauty, featuring intricate designs and premium materials.',
  },
  {
    slug: 'earrings',
    title: 'Earrings',
    description: 'Beautiful earrings that add grace and sophistication to any look, from subtle studs to dramatic drops.',
  },
  {
    slug: 'rings',
    title: 'Rings',
    description: 'Stunning rings crafted with precision, from everyday elegance to statement pieces that capture attention.',
  },
  {
    slug: 'anklets',
    title: 'Anklets',
    description: 'Delicate anklets that add a touch of charm and elegance to your every step.',
  },
  {
    slug: 'lab-diamonds-jewellery',
    title: 'Lab Diamonds Jewellery',
    description: 'Sustainable luxury with ethically sourced lab-grown diamonds, offering the same brilliance and beauty as natural diamonds.',
  },
  {
    slug: 'bridal-jewellery',
    title: 'Bridal Jewellery',
    description: 'Exquisite bridal pieces designed to make your special day unforgettable with timeless elegance and luxury.',
  },
];

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((cat) => cat.slug === slug);
}

export function isValidCategorySlug(slug: string): boolean {
  return PRODUCT_CATEGORIES.some((cat) => cat.slug === slug);
}

export function getCategoryOptions() {
  return PRODUCT_CATEGORIES.map((cat) => ({
    value: cat.slug,
    label: cat.title,
  }));
}
