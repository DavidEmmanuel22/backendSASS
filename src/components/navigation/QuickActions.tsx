import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { LucideIcon } from 'lucide-react';

export interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  variant?: 'default' | 'teal' | 'blue' | 'green' | 'orange' | 'purple';
  onClick: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
  title?: string;
}

const variantColors = {
  default: 'bg-gray-600 hover:bg-gray-700',
  teal: 'bg-teal-600 hover:bg-teal-700',
  blue: 'bg-blue-600 hover:bg-blue-700',
  green: 'bg-green-600 hover:bg-green-700',
  orange: 'bg-orange-600 hover:bg-orange-700',
  purple: 'bg-purple-600 hover:bg-purple-700',
};

export function QuickActions({ actions, title = "Acciones Rápidas" }: QuickActionsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {title}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            const colorClass = variantColors[action.variant || 'default'];
            
            return (
              <Button
                key={action.id}
                onClick={action.onClick}
                className={`h-auto py-4 flex flex-col gap-2 ${colorClass}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs text-center leading-tight">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
