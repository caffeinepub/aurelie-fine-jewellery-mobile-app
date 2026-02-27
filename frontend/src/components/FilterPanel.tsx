import { useState } from 'react';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import type {
  FilterState,
  MetalType,
  PriceRange,
  Occasion,
  SortOrder,
} from '../hooks/useProductFilters';

interface FilterPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  activeFilterCount: number;
  totalProducts: number;
  filteredCount: number;
  onMetalTypeChange: (value: MetalType) => void;
  onPriceRangeChange: (value: PriceRange) => void;
  onOccasionChange: (value: Occasion) => void;
  onSortOrderChange: (value: SortOrder) => void;
  onClearFilters: () => void;
}

export default function FilterPanel({
  open,
  onOpenChange,
  filters,
  activeFilterCount,
  totalProducts,
  filteredCount,
  onMetalTypeChange,
  onPriceRangeChange,
  onOccasionChange,
  onSortOrderChange,
  onClearFilters,
}: FilterPanelProps) {
  // Local draft state so changes only apply when user taps "Apply"
  const [draft, setDraft] = useState<FilterState>(filters);

  // Sync draft when panel opens
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) setDraft(filters);
    onOpenChange(isOpen);
  };

  const handleApply = () => {
    onMetalTypeChange(draft.metalType);
    onPriceRangeChange(draft.priceRange);
    onOccasionChange(draft.occasion);
    onSortOrderChange(draft.sortOrder);
    onOpenChange(false);
  };

  const handleClearAll = () => {
    const cleared: FilterState = {
      metalType: 'all',
      priceRange: 'all',
      occasion: 'all',
      sortOrder: 'default',
    };
    setDraft(cleared);
    onClearFilters();
    onOpenChange(false);
  };

  const draftActiveCount = [
    draft.metalType !== 'all',
    draft.priceRange !== 'all',
    draft.occasion !== 'all',
    draft.sortOrder !== 'default',
  ].filter(Boolean).length;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-[400px] bg-beige-light border-l border-gold-medium/20 flex flex-col p-0"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-gold-medium/20 bg-beige-champagne">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-gold-medium" />
              <SheetTitle className="font-serif text-xl text-bottle-green-dark">
                Filters
              </SheetTitle>
              {draftActiveCount > 0 && (
                <Badge className="bg-gold-medium text-white text-xs px-2 py-0.5 rounded-full border-0">
                  {draftActiveCount}
                </Badge>
              )}
            </div>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-bottle-green-dark hover:text-gold-medium"
                data-no-admin-style
                data-no-customer-style
              >
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Showing {filteredCount} of {totalProducts} products
          </p>
        </SheetHeader>

        {/* Filter Controls */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Metal Type */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-bottle-green-dark tracking-wide uppercase">
              Metal Type
            </label>
            <Select
              value={draft.metalType}
              onValueChange={(v) => setDraft((d) => ({ ...d, metalType: v as MetalType }))}
            >
              <SelectTrigger className="w-full border-gold-medium/30 bg-white/80 focus:ring-gold-medium/30 text-bottle-green-dark">
                <SelectValue placeholder="All Metals" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Metals</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
                <SelectItem value="rose-gold">Rose Gold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-bottle-green-dark tracking-wide uppercase">
              Price Range
            </label>
            <Select
              value={draft.priceRange}
              onValueChange={(v) => setDraft((d) => ({ ...d, priceRange: v as PriceRange }))}
            >
              <SelectTrigger className="w-full border-gold-medium/30 bg-white/80 focus:ring-gold-medium/30 text-bottle-green-dark">
                <SelectValue placeholder="All Prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-5000">Under ₹5,000</SelectItem>
                <SelectItem value="5000-10000">₹5,000 – ₹10,000</SelectItem>
                <SelectItem value="10000-20000">₹10,000 – ₹20,000</SelectItem>
                <SelectItem value="above-20000">Above ₹20,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Occasion */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-bottle-green-dark tracking-wide uppercase">
              Occasion
            </label>
            <Select
              value={draft.occasion}
              onValueChange={(v) => setDraft((d) => ({ ...d, occasion: v as Occasion }))}
            >
              <SelectTrigger className="w-full border-gold-medium/30 bg-white/80 focus:ring-gold-medium/30 text-bottle-green-dark">
                <SelectValue placeholder="All Occasions" />
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
          </div>

          {/* Sort Order */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-bottle-green-dark tracking-wide uppercase">
              Sort By
            </label>
            <Select
              value={draft.sortOrder}
              onValueChange={(v) => setDraft((d) => ({ ...d, sortOrder: v as SortOrder }))}
            >
              <SelectTrigger className="w-full border-gold-medium/30 bg-white/80 focus:ring-gold-medium/30 text-bottle-green-dark">
                <SelectValue placeholder="Default Order" />
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

        {/* Footer Actions */}
        <div className="px-6 py-5 border-t border-gold-medium/20 bg-beige-champagne space-y-3">
          <Button
            onClick={handleApply}
            className="w-full bg-gold-medium hover:bg-gold-dark text-white font-semibold"
            data-no-admin-style
            data-no-customer-style
          >
            Apply Filters
            {draftActiveCount > 0 && (
              <span className="ml-2 bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
                {draftActiveCount}
              </span>
            )}
          </Button>
          {draftActiveCount > 0 && (
            <Button
              variant="ghost"
              onClick={handleClearAll}
              className="w-full text-bottle-green-dark hover:text-gold-medium gap-2"
              data-no-admin-style
              data-no-customer-style
            >
              <RotateCcw className="h-4 w-4" />
              Clear All Filters
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
