import { SlidersHorizontal } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface FilterIconButtonProps {
  activeFilterCount: number;
  onClick: () => void;
}

export default function FilterIconButton({ activeFilterCount, onClick }: FilterIconButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className="relative border-gold-medium/40 hover:border-gold-medium hover:bg-gold-medium/10 text-bottle-green-dark"
      aria-label={`Open filters${activeFilterCount > 0 ? ` (${activeFilterCount} active)` : ''}`}
    >
      <SlidersHorizontal className="h-4 w-4" />
      {activeFilterCount > 0 && (
        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-gold-medium text-white border-0 rounded-full">
          {activeFilterCount}
        </Badge>
      )}
    </Button>
  );
}
