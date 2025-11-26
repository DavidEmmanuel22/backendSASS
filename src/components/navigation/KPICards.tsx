import { Card, CardContent } from '../ui/card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

export interface KPIData {
  id: string;
  label: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
}

interface KPICardsProps {
  kpis: KPIData[];
}

export function KPICards({ kpis }: KPICardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const isPositive = kpi.change !== undefined && kpi.change > 0;
        const isNegative = kpi.change !== undefined && kpi.change < 0;
        
        return (
          <Card key={kpi.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600 text-sm">{kpi.label}</p>
                <Icon className={`w-5 h-5 ${kpi.iconColor || 'text-gray-400'}`} />
              </div>
              <p className="text-gray-900 text-2xl mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {kpi.value}
              </p>
              {kpi.change !== undefined && (
                <div className="flex items-center gap-1">
                  {isPositive && <TrendingUp className="w-4 h-4 text-green-600" />}
                  {isNegative && <TrendingDown className="w-4 h-4 text-red-600" />}
                  <span className={`text-sm ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'}`}>
                    {isPositive && '+'}{kpi.change}%
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
