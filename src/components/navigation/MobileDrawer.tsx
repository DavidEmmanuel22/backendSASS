import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { LucideIcon, X } from 'lucide-react';

export interface DrawerMenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: DrawerMenuItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  title?: string;
}

export function MobileDrawer({
  isOpen,
  onOpenChange,
  items,
  activeSection,
  onSectionChange,
  title = "Más opciones"
}: MobileDrawerProps) {
  const handleItemClick = (id: string) => {
    onSectionChange(id);
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        
        <nav className="p-4 overflow-y-auto max-h-[calc(100vh-5rem)]">
          <div className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <Badge variant="secondary">
                      {item.badge > 99 ? '99+' : item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}