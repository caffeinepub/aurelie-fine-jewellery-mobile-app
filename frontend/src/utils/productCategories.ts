export interface ProductCategory {
  slug: string;
  title: string;
  description: string;
  gender: 'girls' | 'boys';
}

export const GIRLS_CATEGORIES: ProductCategory[] = [
  {
    slug: 'necklace',
    title: 'Necklace',
    description: 'Elegant necklaces that frame your beauty, featuring intricate designs and premium materials.',
    gender: 'girls',
  },
  {
    slug: 'earrings',
    title: 'Earrings',
    description: 'Beautiful earrings that add grace and sophistication to any look, from subtle studs to dramatic drops.',
    gender: 'girls',
  },
  {
    slug: 'rings',
    title: 'Rings',
    description: 'Stunning rings crafted with precision, from everyday elegance to statement pieces that capture attention.',
    gender: 'girls',
  },
  {
    slug: 'anklets',
    title: 'Anklets',
    description: 'Delicate anklets that add a touch of charm and elegance to your every step.',
    gender: 'girls',
  },
  {
    slug: 'lab-diamonds-jewellery',
    title: 'Lab Diamonds',
    description: 'Sustainable luxury with ethically sourced lab-grown diamonds, offering the same brilliance and beauty as natural diamonds.',
    gender: 'girls',
  },
  {
    slug: 'bridal-jewellery',
    title: 'Bridal Jewellery',
    description: 'Exquisite bridal pieces designed to make your special day unforgettable with timeless elegance and luxury.',
    gender: 'girls',
  },
];

export const BOYS_CATEGORIES: ProductCategory[] = [
  {
    slug: 'boys-chains',
    title: 'Chains',
    description: 'Bold and refined chains crafted for the modern gentleman, from sleek links to statement pieces.',
    gender: 'boys',
  },
  {
    slug: 'boys-bracelet',
    title: 'Bracelet',
    description: 'Sophisticated bracelets for men, blending strength and elegance in every design.',
    gender: 'boys',
  },
  {
    slug: 'boys-rings',
    title: 'Rings',
    description: 'Masculine rings crafted with precision, from classic bands to bold statement pieces.',
    gender: 'boys',
  },
  {
    slug: 'boys-lab-diamonds',
    title: 'Lab Diamonds',
    description: 'Premium lab-grown diamonds for men, offering exceptional brilliance with ethical sourcing.',
    gender: 'boys',
  },
];

// Keep PRODUCT_CATEGORIES as the girls categories for backward compatibility
export const PRODUCT_CATEGORIES: ProductCategory[] = GIRLS_CATEGORIES;

export const ALL_CATEGORIES: ProductCategory[] = [...GIRLS_CATEGORIES, ...BOYS_CATEGORIES];

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return ALL_CATEGORIES.find((cat) => cat.slug === slug);
}

export function isValidCategorySlug(slug: string): boolean {
  return ALL_CATEGORIES.some((cat) => cat.slug === slug);
}

export function getCategoryOptions() {
  return PRODUCT_CATEGORIES.map((cat) => ({
    value: cat.slug,
    label: cat.title,
  }));
}

export function getGirlsCategoryOptions() {
  return GIRLS_CATEGORIES.map((cat) => ({
    value: cat.slug,
    label: cat.title,
  }));
}

export function getBoysCategoryOptions() {
  return BOYS_CATEGORIES.map((cat) => ({
    value: cat.slug,
    label: cat.title,
  }));
}
