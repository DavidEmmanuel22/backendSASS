import { useState } from 'react';
import { Button } from './ui/button';
import { Sidebar, MenuItem, QuickAction as SidebarQuickAction } from './navigation/Sidebar';
import { BottomNav, BottomNavItem } from './navigation/BottomNav';
import { MobileDrawer, DrawerMenuItem } from './navigation/MobileDrawer';
import { QuickActions, QuickAction } from './navigation/QuickActions';
import { KPICards, KPIData } from './navigation/KPICards';
import { Breadcrumb, BreadcrumbItem } from './navigation/Breadcrumb';
import { Dashboard360 } from './gerente/Dashboard360';
import { OperativaGerente } from './gerente/OperativaGerente';
import { ClientesGerente } from './gerente/ClientesGerente';
import { FacturacionFinanzas } from './gerente/FacturacionFinanzas';
import { PersonalRRHH } from './gerente/PersonalRRHH';
import { StockProveedores } from './gerente/StockProveedores';
import { ProductividadGerente } from './gerente/ProductividadGerente';
import { EquipoRRHH } from './gerente/EquipoRRHH';
import { TiendaGerente } from './gerente/TiendaGerente';
import { NotificacionesGerente } from './gerente/NotificacionesGerente';
import { AyudaGerente } from './gerente/AyudaGerente';
import { ConfiguracionGerente } from './gerente/ConfiguracionGerente';
import type { User } from '../App';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner@2.0.3';
import { 
  LayoutDashboard, 
  Users, 
  Euro, 
  UserCheck, 
  Package, 
  Sparkles, 
  MessageSquare, 
  Store, 
  Bell, 
  HelpCircle, 
  Settings,
  FileText,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  UserPlus,
  ClipboardList,
  Receipt,
  Wallet,
  CheckSquare,
  FileCheck,
  Percent,
  UserMinus,
  LogOut,
  Coffee
} from 'lucide-react';

interface GerenteDashboardProps {
  user: User;
  onLogout: () => void;
}

export function GerenteDashboard({ user, onLogout }: GerenteDashboardProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accionRapidaDialog, setAccionRapidaDialog] = useState<string | null>(null);

  // Badges para el menú
  const alertas = 3;
  const impagos = 5;
  const urgentes = 2;
  const noLeidos = 8;

  const menuItems: MenuItem[] = [
    { 
      id: 'dashboard', 
      label: 'Dashboard 360', 
      icon: LayoutDashboard, 
      badge: alertas > 0 ? alertas : undefined 
    },
    { 
      id: 'tienda', 
      label: 'TPV Farines', 
      icon: Store 
    },
    { 
      id: 'clientes', 
      label: 'Clientes y Facturación', 
      icon: Users 
    },
    { 
      id: 'equipo', 
      label: 'Equipo y RRHH', 
      icon: UserCheck 
    },
    { 
      id: 'proveedores', 
      label: 'Stock y Proveedores', 
      icon: Package 
    },
    { 
      id: 'operativa', 
      label: 'Operativa', 
      icon: Coffee, 
      badge: urgentes > 0 ? urgentes : undefined 
    },
    { 
      id: 'notificaciones', 
      label: 'Notificaciones', 
      icon: Bell 
    },
    { 
      id: 'ayuda', 
      label: 'Chat y Soporte', 
      icon: HelpCircle 
    },
    { 
      id: 'configuracion', 
      label: 'Configuración', 
      icon: Settings
    },
  ];

  // Bottom nav items para móvil (primeros 4 + más)
  const bottomNavItems: BottomNavItem[] = [
    { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard, badge: alertas },
    { id: 'tienda', label: 'TPV Farines', icon: Store },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'operativa', label: 'Operativa', icon: Coffee, badge: urgentes },
  ];

  // Items para el drawer (resto de opciones)
  const drawerItems: DrawerMenuItem[] = menuItems.slice(4);

  // Botones rápidos para el sidebar
  const sidebarQuickActions: SidebarQuickAction[] = [
    {
      label: 'Aprobar compra',
      icon: Receipt,
      onClick: () => {
        toast.success('Abriendo compras pendientes...');
        handleAccionRapida('aprobar-compra');
      },
      variant: 'warning',
      tooltip: 'Revisar y aprobar compras'
    },
    {
      label: 'Autorizar pago',
      icon: Wallet,
      onClick: () => {
        toast.info('Abriendo pagos pendientes...');
        handleAccionRapida('autorizar-pago');
      },
      variant: 'orange',
      tooltip: 'Autorizar pagos pendientes'
    }
  ];

  const quickActions: QuickAction[] = [
    { 
      id: 'aprobar-presupuesto', 
      label: 'Aprobar Presupuesto', 
      icon: CheckSquare, 
      variant: 'green',
      onClick: () => handleAccionRapida('aprobar-presupuesto')
    },
    { 
      id: 'crear-presupuesto', 
      label: 'Crear Presupuesto', 
      icon: FileCheck, 
      variant: 'teal',
      onClick: () => handleAccionRapida('crear-presupuesto')
    },
    { 
      id: 'autorizar-pago', 
      label: 'Autorizar Pago', 
      icon: DollarSign, 
      variant: 'blue',
      onClick: () => handleAccionRapida('autorizar-pago')
    },
    { 
      id: 'alta-rapida', 
      label: 'Alta Rápida', 
      icon: UserPlus, 
      variant: 'purple',
      onClick: () => handleAccionRapida('alta-rapida')
    },
  ];

  const kpis: KPIData[] = [
    { 
      id: 'mrr', 
      label: 'MRR', 
      value: '€12,450', 
      change: 12.5, 
      icon: TrendingUp, 
      iconColor: 'text-green-600' 
    },
    { 
      id: 'nps', 
      label: 'NPS', 
      value: '8.4', 
      change: 5.2, 
      icon: UserCheck, 
      iconColor: 'text-blue-600' 
    },
    { 
      id: 'margen', 
      label: 'Margen', 
      value: '34%', 
      change: -2.1, 
      icon: Percent, 
      iconColor: 'text-orange-600' 
    },
    { 
      id: 'churn', 
      label: 'Churn', 
      value: '2.1%', 
      change: -8.3, 
      icon: UserMinus, 
      iconColor: 'text-red-600' 
    },
  ];

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Gerente' },
    { label: getSectionLabel(activeSection) },
  ];

  function getSectionLabel(id: string): string {
    const item = menuItems.find(item => item.id === id);
    if (item) return item.label;
    
    // Check submenu items
    for (const menuItem of menuItems) {
      if (menuItem.submenu) {
        const subItem = menuItem.submenu.find(sub => sub.id === id);
        if (subItem) return subItem.label;
      }
    }
    
    return 'Dashboard';
  }

  const handleAccionRapida = (id: string) => {
    setAccionRapidaDialog(id);
  };

  const handleConfirmarAccion = () => {
    toast.success('Acción ejecutada correctamente');
    setAccionRapidaDialog(null);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard360 />;
      case 'operativa':
        return <OperativaGerente />;
      case 'clientes':
        return <ClientesGerente />;
      case 'facturacion':
        return <FacturacionFinanzas />;
      case 'personal':
        return <PersonalRRHH />;
      case 'proveedores':
        return <StockProveedores />;
      case 'productividad':
        return <ProductividadGerente />;
      case 'equipo':
        return <EquipoRRHH />;
      case 'tienda':
        return <TiendaGerente />;
      case 'notificaciones':
        return <NotificacionesGerente />;
      case 'ayuda':
        return <AyudaGerente />;
      case 'configuracion':
        return <ConfiguracionGerente activeSubsection={activeSection} />;
      default:
        return <Dashboard360 />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop & Tablet */}
      <Sidebar
        user={user}
        menuItems={menuItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        roleLabel="Gerente"
        avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjI2NzM4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        quickActions={sidebarQuickActions}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        {/* Top Bar */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb items={breadcrumbs} />
            <div className="flex items-center justify-between">
              <h1 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {getSectionLabel(activeSection)}
              </h1>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="hidden lg:flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Section Content */}
          {renderContent()}
        </div>
      </main>

      {/* Bottom Navigation - Mobile */}
      <BottomNav
        items={bottomNavItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onMoreClick={() => setDrawerOpen(true)}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        onOpenChange={setDrawerOpen}
        items={drawerItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        title="Más opciones"
      />

      {/* Dialogs para Acciones Rápidas */}
      <Dialog open={accionRapidaDialog !== null} onOpenChange={() => setAccionRapidaDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              {accionRapidaDialog === 'aprobar-presupuesto' && 'Aprobar Presupuesto'}
              {accionRapidaDialog === 'crear-presupuesto' && 'Crear Presupuesto'}
              {accionRapidaDialog === 'autorizar-pago' && 'Autorizar Pago'}
              {accionRapidaDialog === 'alta-rapida' && 'Alta Rápida'}
              {!accionRapidaDialog && 'Acción Rápida'}
            </DialogTitle>
            <DialogDescription>
              {accionRapidaDialog === 'aprobar-presupuesto' && 'Revisa y aprueba los presupuestos pendientes'}
              {accionRapidaDialog === 'crear-presupuesto' && 'Crea un nuevo presupuesto para un cliente'}
              {accionRapidaDialog === 'autorizar-pago' && 'Autoriza pagos pendientes'}
              {accionRapidaDialog === 'alta-rapida' && 'Da de alta un nuevo cliente o empleado'}
              {!accionRapidaDialog && 'Selecciona una acción para continuar'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end mt-4">
            <Button variant="outline" onClick={() => setAccionRapidaDialog(null)}>
              Cancelar
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleConfirmarAccion}>
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}