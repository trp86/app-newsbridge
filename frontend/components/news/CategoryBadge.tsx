import { Category } from "@/lib/types/news";
import { CATEGORIES } from "@/lib/constants/categories";
import { cn } from "@/lib/utils/cn";

interface CategoryBadgeProps {
  category: Category;
  variant?: 'default' | 'light' | 'accent';
  className?: string;
}

export function CategoryBadge({ category, variant = 'default', className }: CategoryBadgeProps) {
  const categoryInfo = CATEGORIES[category];

  const variantStyles = {
    default: 'bg-accent text-white',
    light: 'bg-white/30 text-white backdrop-blur-sm border border-white/40',
    accent: 'bg-accent text-white',
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {categoryInfo.label}
    </span>
  );
}
