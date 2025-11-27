import { useState } from 'react';
import { useEffect } from 'react';
import { 
  User, 
  ShoppingCart, 
  Home, 
  FileText, 
  Settings, 
  Users, 
  Package, 
  BarChart3, 
  CreditCard,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MessageSquare,
  Star,
  Gift,
  Receipt,
  Clock,
  Store,
  DollarSign,
  Menu,
  Search,
  X as CloseIcon,
  LucideIcon
} from 'lucide-react';
import { Button } from '../ui/button';
import type { AppUser } from '../../App';
import { useUser } from '../../context/UserContext';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CanFarinesLogo } from '../CanFarinesLogo';
import logoImage from 'figma:asset/5bc3860bbf58f9c2c789e5c86a7e8c37e091a16f.png';

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  submenu?: MenuItem[];
  tooltip?: string;
  onClick?: () => void;
}

export interface QuickAction {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'purple' | 'orange';
  tooltip?: string;
}

interface SidebarProps {
  user: AppUser;
  menuItems: MenuItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  roleLabel: string;
  avatarUrl?: string;
  primaryAction?: React.ReactNode; // Nuevo prop para botón primario
  quickActions?: QuickAction[]; // Botones de acceso rápido
}

export function Sidebar({
  user: userProp,
  menuItems,
  activeSection,
  onSectionChange,
  collapsed,
  onCollapsedChange,
  roleLabel,
  avatarUrl,
  primaryAction,
  quickActions
}: SidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const { user, setUser } = useUser();
  const [searchQuery, setSearchQuery] = useState('');

  // Obtener datos reales del usuario al montar
  useEffect(() => {
    if (user?.id) {
      fetch(`https://mytreefam.com/sass/api/clientes/${user.id}`)
        .then(res => res.json())
        .then(data => {
          setUser(data);
        });
    }
  }, [user?.id]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const renderMenuItem = (item: MenuItem, isSubmenu = false) => {
    const Icon = item.icon;
    const isActive = activeSection === item.id;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedGroups.includes(item.id);

    const handleClick = () => {
      if (item.onClick) {
        // Si tiene onClick personalizado, ejecutarlo en lugar de cambiar sección
        item.onClick();
      } else if (hasSubmenu) {
        toggleGroup(item.id);
      } else {
        onSectionChange(item.id);
      }
    };

    if (collapsed && !isSubmenu) {
      return (
        <TooltipProvider key={item.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleClick}
                className={`w-full flex items-center justify-center p-3 rounded-lg transition-colors relative min-h-[44px] ${
                  isActive
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {/* Badge eliminado para evitar desplazamiento y saturación visual */}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.tooltip || item.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <div key={item.id}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleClick}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors min-h-[44px] ${
                  isActive
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-50'
                } ${isSubmenu ? 'pl-12' : ''}`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="flex-1 text-left truncate">{item.label}</span>
                {/* Badge eliminado para evitar desplazamiento y saturación visual */}
                {hasSubmenu && (
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                )}
              </button>
            </TooltipTrigger>
            {item.tooltip && !collapsed && (
              <TooltipContent side="right">
                <p>{item.tooltip}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        {hasSubmenu && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.submenu!.map(subItem => renderMenuItem(subItem, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`hidden md:flex flex-col bg-white border-r h-screen sticky top-0 transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-[280px]'
      }`}
    >
      {/* Header - Logo */}
      <div className={`p-4 border-b shrink-0 ${collapsed ? 'flex justify-center' : ''}`}>
        <div className="flex items-center gap-3">
          <CanFarinesLogo className={`shrink-0 ${collapsed ? 'h-8' : 'h-12'}`} />
          {!collapsed && (
            <div>
              <h2 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Can Farines
              </h2>
              <p className="text-gray-500 text-xs">Panadería Artesanal</p>
            </div>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className={`p-4 border-b shrink-0 ${collapsed ? 'flex justify-center' : ''}`}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onSectionChange('perfil')}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="relative shrink-0">
                  <ImageWithFallback
                    src={avatarUrl || user?.avatar || userProp?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Cliente"}
                    alt={user?.name || userProp?.name || 'Usuario'}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                {!collapsed && (
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-gray-900 truncate text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {user?.name || userProp?.name || 'Usuario'}
                    </p>
                    <p className="text-gray-500 text-xs truncate">{user?.email || userProp?.email || ''}</p>
                    {user?.ciudad && <p className="text-xs text-gray-400">{user.ciudad}</p>}
                    <p className="text-gray-500 text-xs truncate">{roleLabel}</p>
                  </div>
                )}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                <p>{(user?.name || userProp?.name || 'Usuario')} - {roleLabel}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="p-4 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </div>
      )}

      {/* Primary Action Button - Between Search and Menu */}
      {primaryAction && !collapsed && (
        <div className="px-4 pb-4 shrink-0">
          {primaryAction}
        </div>
      )}

      {/* Quick Actions */}
      {quickActions && quickActions.length > 0 && !collapsed && (
        <div className="px-4 pb-4 shrink-0">
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => {
              const colorClasses = action.variant === 'primary' 
                ? 'bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-sm'
                : action.variant === 'secondary'
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm'
                : action.variant === 'success'
                ? 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-sm'
                : action.variant === 'warning'
                ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-sm'
                : action.variant === 'purple'
                ? 'bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-sm'
                : action.variant === 'orange'
                ? 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-sm'
                : 'bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-sm';
              
              return (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={action.onClick}
                        className={`${colorClasses} rounded-lg p-3 flex flex-col items-center justify-center gap-2 transition-all hover:shadow-md aspect-square min-h-[80px]`}
                      >
                        <action.icon className="w-6 h-6" />
                        <span className="text-xs text-center leading-tight">{action.label}</span>
                      </button>
                    </TooltipTrigger>
                    {action.tooltip && (
                      <TooltipContent side="right">
                        <p>{action.tooltip}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
      )}

      {/* Menu Items - Scrollable */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems
            .filter(item => 
              !searchQuery || 
              item.label.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(item => renderMenuItem(item))
          }
        </div>
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t shrink-0 hidden xl:block">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCollapsedChange(!collapsed)}
          className="w-full flex items-center justify-center gap-2"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Colapsar</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}