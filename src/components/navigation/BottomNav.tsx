import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { MoreHorizontal, LucideIcon } from 'lucide-react';

export interface BottomNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

interface BottomNavProps {
  items: BottomNavItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  onMoreClick: () => void;
  maxItems?: number;
}

export function BottomNav({
  items,
  activeSection,
  onSectionChange,
  onMoreClick,
  maxItems = 4
}: BottomNavProps) {
  const visibleItems = items.slice(0, maxItems);
  const hasMoreItems = items.length > maxItems;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 safe-area-inset-bottom">
      <div className="grid grid-cols-5 h-16">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${
                isActive
                  ? 'text-teal-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="relative">
                <Icon className="w-6 h-6" />
                {item.badge && item.badge > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-4 min-w-4 px-1 text-xs flex items-center justify-center"
                  >
                    {item.badge > 9 ? '9+' : item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs truncate max-w-full px-1">
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-teal-600 rounded-t-full" />
              )}
            </button>
          );
        })}
        
        {hasMoreItems && (
          <button
            onClick={onMoreClick}
            className="flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <MoreHorizontal className="w-6 h-6" />
            <span className="text-xs">Más</span>
          </button>
        )}
      </div>
    </nav>
  );
}
