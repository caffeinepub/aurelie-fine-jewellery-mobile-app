import { useState, useMemo } from 'react';
import type { Product } from '../backend';

export type MetalType = 'all' | 'gold' | 'silver' | 'platinum' | 'rose-gold';
export type PriceRange = 'all' | 'under-5000' | '5000-10000' | '10000-20000' | 'above-20000';
export type Occasion = 'all' | 'wedding' | 'anniversary' | 'birthday' | 'casual' | 'daily-wear';
export type SortOrder = 'default' | 'price-asc' | 'price-desc' | 'newest' | 'name-az';

export interface FilterState {
  metalType: MetalType;
  priceRange: PriceRange;
  occasion: Occasion;
  sortOrder: SortOrder;
}

const defaultFilters: FilterState = {
  metalType: 'all',
  priceRange: 'all',
  occasion: 'all',
  sortOrder: 'default',
};

function matchesMetalType(product: Product, metalType: MetalType): boolean {
  if (metalType === 'all') return true;
  const text = `${product.name} ${product.description}`.toLowerCase();
  switch (metalType) {
    case 'gold': return text.includes('gold') && !text.includes('rose gold');
    case 'silver': return text.includes('silver');
    case 'platinum': return text.includes('platinum');
    case 'rose-gold': return text.includes('rose gold');
    default: return true;
  }
}

function matchesPriceRange(product: Product, priceRange: PriceRange): boolean {
  if (priceRange === 'all') return true;
  const priceInRupees = Number(product.priceInCents) / 100;
  switch (priceRange) {
    case 'under-5000': return priceInRupees < 5000;
    case '5000-10000': return priceInRupees >= 5000 && priceInRupees <= 10000;
    case '10000-20000': return priceInRupees > 10000 && priceInRupees <= 20000;
    case 'above-20000': return priceInRupees > 20000;
    default: return true;
  }
}

function matchesOccasion(product: Product, occasion: Occasion): boolean {
  if (occasion === 'all') return true;
  const text = `${product.name} ${product.description} ${product.category}`.toLowerCase();
  switch (occasion) {
    case 'wedding': return text.includes('wedding') || text.includes('bridal');
    case 'anniversary': return text.includes('anniversary');
    case 'birthday': return text.includes('birthday');
    case 'casual': return text.includes('casual');
    case 'daily-wear': return text.includes('daily') || text.includes('everyday') || text.includes('everyday wear');
    default: return true;
  }
}

function sortProducts(products: Product[], sortOrder: SortOrder): Product[] {
  const sorted = [...products];
  switch (sortOrder) {
    case 'price-asc':
      return sorted.sort((a, b) => Number(a.priceInCents) - Number(b.priceInCents));
    case 'price-desc':
      return sorted.sort((a, b) => Number(b.priceInCents) - Number(a.priceInCents));
    case 'newest':
      return sorted.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
    case 'name-az':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

export function useProductFilters(products: Product[]) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      return (
        matchesMetalType(product, filters.metalType) &&
        matchesPriceRange(product, filters.priceRange) &&
        matchesOccasion(product, filters.occasion)
      );
    });
    return sortProducts(result, filters.sortOrder);
  }, [products, filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.metalType !== 'all') count++;
    if (filters.priceRange !== 'all') count++;
    if (filters.occasion !== 'all') count++;
    if (filters.sortOrder !== 'default') count++;
    return count;
  }, [filters]);

  const setMetalType = (metalType: MetalType) => setFilters(f => ({ ...f, metalType }));
  const setPriceRange = (priceRange: PriceRange) => setFilters(f => ({ ...f, priceRange }));
  const setOccasion = (occasion: Occasion) => setFilters(f => ({ ...f, occasion }));
  const setSortOrder = (sortOrder: SortOrder) => setFilters(f => ({ ...f, sortOrder }));
  const clearFilters = () => setFilters(defaultFilters);

  return {
    filters,
    filteredProducts,
    activeFilterCount,
    setMetalType,
    setPriceRange,
    setOccasion,
    setSortOrder,
    clearFilters,
  };
}
