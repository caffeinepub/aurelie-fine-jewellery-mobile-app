import { X, SlidersHorizontal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { MetalType, PriceRange, Occasion, SortOrder, FilterState } from '../hooks/useProductFilters';

interface ProductFilterBarProps {
  filters: FilterState;
  activeFilterCount: number;
  onMetalTypeChange: (value: MetalType) => void;
  onPriceRangeChange: (value: PriceRange) => void;
  onOccasionChange: (value: Occasion) => void;
  onSortOrderChange: (value: SortOrder) => void;
  onClearFilters: () => void;
  totalProducts: number;
  filteredCount: number;
}

export default function ProductFilterBar({
  filters,
  activeFilterCount,
  onMetalTypeChange,
  onPriceRangeChange,
  onOccasionChange,
  onSortOrderChange,
  onClearFilters,
  totalProducts,
  filteredCount,
}: ProductFilterBarProps) {
  return (
    <div className="w-full bg-beige-light border-b border-gold-medium/20 py-4 px-4 mb-8">
      <div className="container mx-auto">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-gold-medium" />
            <span className="text-sm font-semibold text-bottle-green-dark">Filters</span>
            {activeFilterCount > 0 && (
              <Badge className="bg-gold-medium text-white text-xs px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {filteredCount} of {totalProducts} items
            </span>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-xs text-gold-dark hover:text-gold-medium h-7 px-2 gap-1"
              >
                <X className="h-3 w-3" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap gap-3">
          {/* Metal Type */}
          <Select value={filters.metalType} onValueChange={(v) => onMetalTypeChange(v as MetalType)}>
            <SelectTrigger className="h-9 w-[140px] text-xs border-gold-medium/30 bg-white/70 focus:ring-gold-medium/30">
              <SelectValue placeholder="Metal Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Metals</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="silver">Silver</SelectItem>
              <SelectItem value="platinum">Platinum</SelectItem>
              <SelectItem value="rose-gold">Rose Gold</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Range */}
          <Select value={filters.priceRange} onValueChange={(v) => onPriceRangeChange(v as PriceRange)}>
            <SelectTrigger className="h-9 w-[160px] text-xs border-gold-medium/30 bg-white/70 focus:ring-gold-medium/30">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="under-5000">Under ₹5,000</SelectItem>
              <SelectItem value="5000-10000">₹5,000 – ₹10,000</SelectItem>
              <SelectItem value="10000-20000">₹10,000 – ₹20,000</SelectItem>
              <SelectItem value="above-20000">Above ₹20,000</SelectItem>
            </SelectContent>
          </Select>

          {/* Occasion */}
          <Select value={filters.occasion} onValueChange={(v) => onOccasionChange(v as Occasion)}>
            <SelectTrigger className="h-9 w-[150px] text-xs border-gold-medium/30 bg-white/70 focus:ring-gold-medium/30">
              <SelectValue placeholder="Occasion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Occasions</SelectItem>
              <SelectItem value="wedding">Wedding</SelectItem>
              <SelectItem value="anniversary">Anniversary</SelectItem>
              <SelectItem value="birthday">Birthday</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="daily-wear">Daily Wear</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort Order */}
          <Select value={filters.sortOrder} onValueChange={(v) => onSortOrderChange(v as SortOrder)}>
            <SelectTrigger className="h-9 w-[180px] text-xs border-gold-medium/30 bg-white/70 focus:ring-gold-medium/30">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Order</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">New Arrivals First</SelectItem>
              <SelectItem value="name-az">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
