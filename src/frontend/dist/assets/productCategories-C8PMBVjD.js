const GIRLS_CATEGORIES = [
  {
    slug: "necklace",
    title: "Necklace",
    description: "Elegant necklaces that frame your beauty, featuring intricate designs and premium materials.",
    gender: "girls"
  },
  {
    slug: "earrings",
    title: "Earrings",
    description: "Beautiful earrings that add grace and sophistication to any look, from subtle studs to dramatic drops.",
    gender: "girls"
  },
  {
    slug: "rings",
    title: "Rings",
    description: "Stunning rings crafted with precision, from everyday elegance to statement pieces that capture attention.",
    gender: "girls"
  },
  {
    slug: "anklets",
    title: "Anklets",
    description: "Delicate anklets that add a touch of charm and elegance to your every step.",
    gender: "girls"
  },
  {
    slug: "lab-diamonds-jewellery",
    title: "Lab Diamonds",
    description: "Sustainable luxury with ethically sourced lab-grown diamonds, offering the same brilliance and beauty as natural diamonds.",
    gender: "girls"
  },
  {
    slug: "bridal-jewellery",
    title: "Bridal Jewellery",
    description: "Exquisite bridal pieces designed to make your special day unforgettable with timeless elegance and luxury.",
    gender: "girls"
  }
];
const BOYS_CATEGORIES = [
  {
    slug: "boys-chains",
    title: "Chains",
    description: "Bold and refined chains crafted for the modern gentleman, from sleek links to statement pieces.",
    gender: "boys"
  },
  {
    slug: "boys-bracelet",
    title: "Bracelet",
    description: "Sophisticated bracelets for men, blending strength and elegance in every design.",
    gender: "boys"
  },
  {
    slug: "boys-rings",
    title: "Rings",
    description: "Masculine rings crafted with precision, from classic bands to bold statement pieces.",
    gender: "boys"
  },
  {
    slug: "boys-lab-diamonds",
    title: "Lab Diamonds",
    description: "Premium lab-grown diamonds for men, offering exceptional brilliance with ethical sourcing.",
    gender: "boys"
  }
];
const PRODUCT_CATEGORIES = GIRLS_CATEGORIES;
const ALL_CATEGORIES = [
  ...GIRLS_CATEGORIES,
  ...BOYS_CATEGORIES
];
function isValidCategorySlug(slug) {
  return ALL_CATEGORIES.some((cat) => cat.slug === slug);
}
export {
  BOYS_CATEGORIES as B,
  GIRLS_CATEGORIES as G,
  PRODUCT_CATEGORIES as P,
  isValidCategorySlug as i
};
