import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sidebar, MenuItem, QuickAction as SidebarQuickAction } from './navigation/Sidebar';
import { BottomNav, BottomNavItem } from './navigation/BottomNav';
import { MobileDrawer, DrawerMenuItem } from './navigation/MobileDrawer';
import { QuickActions, QuickAction } from './navigation/QuickActions';
import { KPICards, KPIData } from './navigation/KPICards';
import { Breadcrumb, BreadcrumbItem } from './navigation/Breadcrumb';
import { 
  Home,
  ClipboardList,
  Clock,
  CalendarDays,
  MessageSquare,
  BarChart3,
  GraduationCap,
  HelpCircle,
  Settings,
  LogOut,
  Package,
  ListTodo,
  CheckCircle2,
  PackagePlus,
  FileText,
  CreditCard,
  Cog,
  TruckIcon,
  Bell
} from 'lucide-react';
import { InicioTrabajador } from './trabajador/InicioTrabajador';
import { TareasTrabajador } from './trabajador/TareasTrabajador';
import { FichajeTrabajador } from './trabajador/FichajeTrabajador';
import { AgendaTrabajador } from './trabajador/AgendaTrabajador';
import { MaterialTrabajador } from './trabajador/MaterialTrabajador';
import { ChatTrabajador } from './trabajador/ChatTrabajador';
import { ReportesTrabajador } from './trabajador/ReportesTrabajador';
import { FormacionTrabajador } from './trabajador/FormacionTrabajador';
import { DocumentacionTrabajador } from './trabajador/DocumentacionTrabajador';
import { NotificacionesTrabajador } from './trabajador/NotificacionesTrabajador';
import { SoporteTrabajador } from './trabajador/SoporteTrabajador';
import { ConfiguracionTrabajador } from './trabajador/ConfiguracionTrabajador';
import { TPVLosPecados } from './trabajador/TPVLosPecados';
import { PedidosTrabajador } from './trabajador/PedidosTrabajador';
import type { User } from '../App';
import { toast } from 'sonner@2.0.3';

interface TrabajadorDashboardProps {
  user: User;
  onLogout: () => void;
}

export function TrabajadorDashboard({ user, onLogout }: TrabajadorDashboardProps) {
  const [activeSection, setActiveSection] = useState('tpv');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [enTurno, setEnTurno] = useState(false);

  // Badges
  const tareasPendientes = 5;
  const mensajesNoLeidos = 3;
  const cursosPendientes = 2;

  const handleFicharClick = () => {
    setEnTurno(!enTurno);
    if (!enTurno) {
      toast.success('Entrada registrada correctamente');
    } else {
      toast.success('Salida registrada correctamente');
    }
    setActiveSection('fichaje');
  };

  const menuItems: MenuItem[] = [
    { id: 'tpv', label: 'TPV Farines', icon: CreditCard },
    { id: 'pedidos', label: 'Clientes', icon: ClipboardList },
    { id: 'chat', label: 'Chat de clientes', icon: MessageSquare, badge: mensajesNoLeidos },
    { id: 'material', label: 'Material', icon: Package },
    { id: 'tareas', label: 'Tareas', icon: ClipboardList, badge: tareasPendientes },
    { id: 'fichaje', label: 'Fichaje', icon: Clock },
    { id: 'formacion', label: 'Formación', icon: GraduationCap, badge: cursosPendientes },
    { id: 'documentacion', label: 'Documentación', icon: FileText },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'soporte', label: 'Soporte', icon: HelpCircle },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
  ];

  // Bottom nav items para móvil (primeros 4 + más)
  const bottomNavItems: BottomNavItem[] = [
    { id: 'tpv', label: 'TPV Farines', icon: CreditCard },
    { id: 'pedidos', label: 'Clientes', icon: ClipboardList },
    { id: 'chat', label: 'Chat', icon: MessageSquare, badge: mensajesNoLeidos },
    { id: 'material', label: 'Material', icon: Package },
  ];

  // Items para el drawer (resto de opciones)
  const drawerItems: DrawerMenuItem[] = menuItems.slice(4);

  // Botones rápidos para el sidebar
  const sidebarQuickActions: SidebarQuickAction[] = [
    {
      label: enTurno ? 'Fichar Salida' : 'Fichar Entrada',
      icon: Clock,
      onClick: handleFicharClick,
      variant: enTurno ? 'warning' : 'success',
      tooltip: enTurno ? 'Registrar salida' : 'Registrar entrada/salida'
    },
    {
      label: 'Recepcionar Pedido',
      icon: TruckIcon,
      onClick: () => {
        setActiveSection('material');
        toast.info('Recepcionando pedido de productos...');
      },
      variant: 'purple',
      tooltip: 'Recepcionar pedido de proveedores'
    }
  ];

  const quickActions: QuickAction[] = [
    { 
      id: 'fichar', 
      label: 'Fichar Entrada/Salida', 
      icon: Clock, 
      variant: 'green',
      onClick: handleFicharClick
    },
    { 
      id: 'abrir-tareas-hoy', 
      label: 'Abrir Tareas de Hoy', 
      icon: ListTodo, 
      variant: 'teal',
      onClick: () => setActiveSection('tareas')
    },
  ];

  const kpis: KPIData[] = [
    { 
      id: 'tareas-completadas', 
      label: 'Tareas Completadas', 
      value: '23', 
      change: 15.3, 
      icon: CheckCircle2, 
      iconColor: 'text-green-600' 
    },
    { 
      id: 'tareas-pendientes', 
      label: 'Tareas Pendientes', 
      value: '5', 
      icon: ClipboardList, 
      iconColor: 'text-orange-600' 
    },
    { 
      id: 'horas-trabajadas', 
      label: 'Horas (esta semana)', 
      value: '38h', 
      icon: Clock, 
      iconColor: 'text-blue-600' 
    },
    { 
      id: 'desempeno', 
      label: 'Desempeño', 
      value: '92%', 
      change: 8.2, 
      icon: BarChart3, 
      iconColor: 'text-teal-600' 
    },
  ];

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Colaborador' },
    { label: getSectionLabel(activeSection) },
  ];

  function getSectionLabel(id: string): string {
    const item = menuItems.find(item => item.id === id);
    return item ? item.label : 'Inicio';
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'inicio':
        return <InicioTrabajador />;
      case 'tareas':
        return <TareasTrabajador />;
      case 'fichaje':
        return <FichajeTrabajador enTurno={enTurno} onFicharChange={setEnTurno} />;
      case 'material':
        return <MaterialTrabajador />;
      case 'chat':
        return <ChatTrabajador />;
      case 'formacion':
        return <FormacionTrabajador />;
      case 'documentacion':
        return <DocumentacionTrabajador />;
      case 'notificaciones':
        return <NotificacionesTrabajador />;
      case 'soporte':
        return <SoporteTrabajador />;
      case 'configuracion':
        return <ConfiguracionTrabajador />;
      case 'tpv':
        return <TPVLosPecados />;
      case 'pedidos':
        return <PedidosTrabajador />;
      default:
        return <InicioTrabajador />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop & Tablet */}
      <Sidebar
        user={{ ...user, name: 'Juan Pérez' }}
        menuItems={menuItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        roleLabel="Panadero"
        avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MzE2MTMyMDh8MA&ixlib=rb-4.0.3&q=80&w=200"
        quickActions={sidebarQuickActions}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        {/* Top Bar */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            {/* Solo mostrar breadcrumbs si NO estamos en Inicio */}
            {activeSection !== 'inicio' && <Breadcrumb items={breadcrumbs} />}
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
          {/* Section Content - Los KPIs están ahora integrados en InicioTrabajador */}
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
    </div>
  );
}