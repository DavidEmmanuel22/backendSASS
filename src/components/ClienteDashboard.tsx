import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Sidebar, MenuItem } from './navigation/Sidebar';
import { BottomNav, BottomNavItem } from './navigation/BottomNav';
import { MobileDrawer, DrawerMenuItem } from './navigation/MobileDrawer';
import { QuickActions, QuickAction } from './navigation/QuickActions';
import { KPICards, KPIData } from './navigation/KPICards';
import { Breadcrumb, BreadcrumbItem } from './navigation/Breadcrumb';
import { InicioCliente } from './cliente/InicioCliente';
import { CatalogoPromos } from './cliente/CatalogoPromos';
import { PresupuestosCliente } from './cliente/PresupuestosCliente';
import { PedidosCliente } from './cliente/PedidosCliente';
import { MiGaraje } from './cliente/MiGaraje';
import { NotificacionesCliente } from './cliente/NotificacionesCliente';
import { QuienesSomos } from './cliente/QuienesSomos';
import { ChatCliente } from './cliente/ChatCliente';
import { ConfiguracionCliente } from './ConfiguracionCliente';
import { PerfilCliente } from './cliente/PerfilCliente';
import { CestaOverlay } from './cliente/CestaOverlay';
import { NuevaCitaModal } from './cliente/NuevaCitaModal';
import { AsistenciaModal } from './cliente/AsistenciaModal';
import { YaEstoyAquiModal } from './cliente/YaEstoyAquiModal';
import { TurnoBanner } from './cliente/TurnoBanner';
import { TurnoDetallesModal } from './cliente/TurnoDetallesModal';
import { 
  Home,
  Store,
  ShoppingBag,
  MoreHorizontal,
  Bell,
  MessageSquare,
  Settings,
  LogOut,
  ShoppingCart,
  // User,
  Tag,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  Coffee,
  Info
} from 'lucide-react';
import type { AppUser } from '../App';
import { useUser } from '../context/UserContext';
import { toast } from 'sonner';


interface ClienteDashboardProps {
  user: AppUser;
  onLogout: () => void;
}

export function ClienteDashboard({ user, onLogout }: ClienteDashboardProps) {

  const { user: userCtx, setUser } = useUser();
  const userData = userCtx || user;
  const [activeSection, setActiveSection] = useState('inicio');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cestaOpen, setCestaOpen] = useState(false);
  const [perfilOpen, setPerfilOpen] = useState(false);
  const [nuevaCitaModalOpen, setNuevaCitaModalOpen] = useState(false);
  const [asistenciaModalOpen, setAsistenciaModalOpen] = useState(false);
  const [citasProgramadas, setCitasProgramadas] = useState(2);
  
  // Estado para "Ya estoy aquí"
  // Estado para forzar recarga de pedidos
  const [pedidosRefreshKey, setPedidosRefreshKey] = useState(0);
  const [yaEstoyAquiModalOpen, setYaEstoyAquiModalOpen] = useState(false);
  const [turnoActivo, setTurnoActivo] = useState<any>(null);
  const [turnoDetallesModalOpen, setTurnoDetallesModalOpen] = useState(false);

  // Obtener turno activo del cliente al cargar el dashboard
  useEffect(() => {
    const clienteId = user?.id;
    if (!clienteId) return;
    fetch(`https://mytreefam.com/sass/api//clientes/${clienteId}/turno-activo`)
      .then(res => res.json())
      .then(data => {
        if (data && data.id) {
          setTurnoActivo(data);
        } else {
          setTurnoActivo(null);
        }
      })
      .catch(() => setTurnoActivo(null));
  }, [user]);
  // Badges
  const [pedidosNoCompletados, setPedidosNoCompletados] = useState(0);
    // Obtener pedidos no completados del backend
    useEffect(() => {
      const clienteId = userData?.id ?? 1;
      fetch(`https://mytreefam.com/sass/api//clientes/${clienteId}/pedidos`)
        .then(res => res.json())
        .then(data => {
          const activos = Array.isArray(data) ? data.filter((p: any) => p.estado !== 'completado').length : 0;
          setPedidosNoCompletados(activos);
        })
        .catch(() => setPedidosNoCompletados(0));
    }, [userData]);
  const presupuestosPendientes = 1;
  const [itemsEnCesta, setItemsEnCesta] = useState(0);
  // Actualizar itemsEnCesta en tiempo real desde localStorage
  useEffect(() => {
    const updateCesta = () => {
      try {
        const stored = localStorage.getItem('carrito');
        setItemsEnCesta(stored ? JSON.parse(stored).length : 0);
      } catch {
        setItemsEnCesta(0);
      }
    };
    updateCesta();
    window.addEventListener('storage', updateCesta);
    const interval = setInterval(updateCesta, 500);
    return () => {
      window.removeEventListener('storage', updateCesta);
      clearInterval(interval);
    };
  }, []);

  // Número de aseguradora (simulado - debería venir de la configuración del usuario)
  const [numeroAseguradora, setNumeroAseguradora] = useState<string | null>(null); // null = no configurado
  // Ejemplo con número: setNumeroAseguradora('+34912345678');

  // Vehículos de ejemplo
  const vehiculos = [
    { id: '1', nombre: 'Ford Focus - ABC1234', activo: true },
    { id: '2', nombre: 'Volkswagen Golf - XYZ5678', activo: false },
  ];

  // Verificar si hay citas próximas (menos de 7 días)
  const citasProximas = citasProgramadas >= 1 ? citasProgramadas : undefined;
  
  // Notificaciones no leídas
  const [notificacionesNoLeidas, setNotificacionesNoLeidas] = useState(0);

  // Obtener notificaciones no leídas del backend
  useEffect(() => {
    const clienteId = userData?.id ?? 1;
    fetch(`https://mytreefam.com/sass/api/clientes/${clienteId}/notificaciones`)
      .then(res => res.json())
      .then(data => {
        const count = Array.isArray(data) ? data.filter((n: any) => !n.leida).length : 0;
        setNotificacionesNoLeidas(count);
      })
      .catch(() => setNotificacionesNoLeidas(0));
  }, [userData]);

  // Handler para Asistencia 24/7
  const handleAsistencia247 = () => {
    if (numeroAseguradora) {
      // Si hay número, crear enlace tel:
      window.location.href = `tel:${numeroAseguradora}`;
      toast.info(`Llamando a ${numeroAseguradora}`);
    } else {
      // Si no hay número, mostrar modal
      setAsistenciaModalOpen(true);
    }
  };

  // Handler para "Ya estoy aquí"
  const handleYaEstoyAqui = async () => {
    // Buscar pedido pendiente del cliente
    const clienteId = userData?.id;
    if (!clienteId) return toast.error('No se encontró el cliente');
    const pedidosRes = await fetch(`https://mytreefam.com/sass/api/clientes/${clienteId}/pedidos`);
    const pedidos = await pedidosRes.json();
    const pedidoPendiente = Array.isArray(pedidos)
      ? pedidos.find((p: any) => p.estado === 'pendiente' || p.estado === 'por entregar')
      : null;
    if (!pedidoPendiente) return toast.error('No tienes pedidos pendientes para generar turno');
    // Crear turno en backend
    const turnoRes = await fetch('https://mytreefam.com/sass/api/turnos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numero: `T-${Math.floor(Math.random() * 1000)}`,
        estado: 'pendiente',
        clienteId,
        pedidoId: pedidoPendiente.id,
        tiempoEstimado: '10 min'
      })
    });
    if (turnoRes.ok) {
      const turno = await turnoRes.json();
      setTurnoActivo(turno);
      toast.success(`¡Turno generado! Tu turno es ${turno.numero}`);
      setYaEstoyAquiModalOpen(true);
    } else {
      toast.error('Error al generar el turno');
    }
  };

  // Handler para confirmar ubicación y asignar turno
  const handleConfirmarUbicacion = () => {
    // Simular asignación de turno
    const turno = {
      numero: 'A-24',
      personasEspera: 2,
      tiempoEstimado: '8 min'
    };
    
    setTurnoActivo(turno);
    toast.success(`¡Turno asignado! Tu turno es ${turno.numero}`);
    
    // Simular notificación después de un tiempo
    setTimeout(() => {
      toast.info('Tu turno se acerca. Prepárate para ser atendido.', {
        duration: 5000
      });
    }, 15000);
  };

  // Handler para ver detalles del turno
  const handleVerDetallesTurno = () => {
    setTurnoDetallesModalOpen(true);
  };

  // Handler para cancelar turno
  const handleCancelarTurno = async () => {
    if (turnoActivo && turnoActivo.id) {
      try {
        const res = await fetch(`https://mytreefam.com/sass/api/turnos/${turnoActivo.id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          setTurnoActivo(null);
          toast.success('Tu turno ha sido cancelado');
        } else {
          toast.error('No se pudo cancelar el turno');
        }
      } catch {
        toast.error('Error al cancelar el turno');
      }
    } else {
      setTurnoActivo(null);
      toast.success('Tu turno ha sido cancelado');
    }
  };

  const menuItems: MenuItem[] = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'catalogo', label: 'Elige tu producto', icon: Store },
    { id: 'pedidos', label: 'Pedidos', icon: ShoppingBag, badge: pedidosNoCompletados },
    { id: 'quienes-somos', label: '¿Quiénes somos?', icon: Info },
    { id: 'chat', label: 'Chat y Soporte', icon: MessageSquare },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell, badge: notificacionesNoLeidas },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
    { 
      id: 'logout', 
      label: 'Salir', 
      icon: LogOut, 
      onClick: () => {
        toast.success('Cerrando sesión...');
        onLogout();
      }
    },
  ];

  // Bottom nav items para móvil (primeros 4 + más)
  const bottomNavItems: BottomNavItem[] = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'catalogo', label: 'Catálogo', icon: Store },
    { id: 'pedidos', label: 'Pedidos', icon: ShoppingBag,  },
    { id: 'chat', label: 'Chat y Soporte', icon: MessageSquare },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell, badge: notificacionesNoLeidas },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
  ];

  // Items para el drawer (resto de opciones)
  const drawerItems: DrawerMenuItem[] = menuItems.slice(3);

  const quickActions: QuickAction[] = [
    { 
      id: 'ya-estoy-aqui', 
      label: 'Ya estoy aquí', 
      icon: MapPin, 
      variant: 'teal',
      onClick: () => {
        handleYaEstoyAqui();
      }
    },
    { 
      id: 'ver-carrito', 
      label: 'Ver Carrito', 
      icon: ShoppingCart, 
      variant: 'orange',
      onClick: () => {
        toast.info('Carrito de compras');
        setCestaOpen(true);
      }
    },
  ];

  const kpis: KPIData[] = [
    { 
      id: 'pedidos-pendientes', 
      label: 'Pedidos Pendientes', 
      value: citasProgramadas.toString(), 
      icon: Package, 
      iconColor: 'text-teal-600' 
    },
    { 
      id: 'pedidos-activos', 
      label: 'Pedidos en Preparación', 
      value: pedidosNoCompletados.toString(), 
      icon: ShoppingBag, 
      iconColor: 'text-blue-600' 
    },
    { 
      id: 'pedidos-completados', 
      label: 'Pedidos Completados', 
      value: '18', 
      icon: CheckCircle2, 
      iconColor: 'text-green-600' 
    },
    { 
      id: 'proximo-pedido', 
      label: 'Tiempo Estimado', 
      value: '15 min', 
      icon: Clock, 
      iconColor: 'text-orange-600' 
    },
  ];

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Cliente' },
    { label: getSectionLabel(activeSection) },
  ];

  function getSectionLabel(id: string): string {
    const item = menuItems.find(item => item.id === id);
    return item ? item.label : 'Inicio';
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'inicio':
        return <InicioCliente onOpenCesta={() => setActiveSection('catalogo')} onOpenNuevaCita={() => setNuevaCitaModalOpen(true)} onYaEstoyAqui={handleYaEstoyAqui} />;
      case 'catalogo':
        return <CatalogoPromos />;
      case 'presupuestos':
        return <PresupuestosCliente />;
      case 'pedidos':
        return <PedidosCliente 
          onNavigateToChat={() => setActiveSection('chat')}
          onPedidosCountChange={setPedidosNoCompletados}
        />;
      case 'garaje':
        return <MiGaraje onNavigateToPerfil={() => setActiveSection('configuracion')} />;
      case 'quienes-somos':
        return <QuienesSomos />;
      case 'chat':
        return <ChatCliente />;
      case 'notificaciones':
        return <NotificacionesCliente />;
      case 'configuracion':
        return <ConfiguracionCliente user={userData} />;
      default:
        return <InicioCliente onYaEstoyAqui={handleYaEstoyAqui} />;
    }
  };

  const handleCitaCreada = () => {
    setCitasProgramadas(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop & Tablet */}
      <Sidebar
        user={userData}
        menuItems={menuItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        roleLabel="Cliente"
        avatarUrl={userData?.avatar}
        primaryAction={
          <div className="space-y-3">
            <Button
              onClick={() => {
                toast.success('Abriendo catálogo para realizar pedido');
                setActiveSection('catalogo');
              }}
              className="w-full bg-teal-600 hover:bg-teal-700 h-12 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Nuevo Pedido</span>
            </Button>
            <Button
              onClick={handleYaEstoyAqui}
              className="w-full bg-orange-600 hover:bg-orange-700 h-12 flex items-center justify-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              <span>Ya estoy aquí</span>
            </Button>
          </div>
        }
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
              <div className="flex items-center gap-2">
                {/* Botón de Carrito */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCestaOpen(true)}
                  className="relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {itemsEnCesta > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center">
                      {itemsEnCesta}
                    </span>
                  )}
                </Button>
                {/* Campana de notificaciones */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveSection('notificaciones')}
                  className="relative"
                >
                  <Bell className="w-5 h-5" />
                  {notificacionesNoLeidas > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notificacionesNoLeidas}
                    </span>
                  )}
                </Button>
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
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Turno Banner - Se muestra en toda la app cuando hay turno activo */}
          {turnoActivo && (
            <TurnoBanner 
              turno={turnoActivo}
              onVerDetalles={handleVerDetallesTurno}
            />
          )}

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

      {/* Cesta Overlay */}
      <CestaOverlay
        isOpen={cestaOpen}
        onOpenChange={setCestaOpen}
        itemsEnCesta={itemsEnCesta}
      />

      {/* Perfil Overlay */}
      <PerfilCliente
        isOpen={perfilOpen}
        onOpenChange={setPerfilOpen}
        user={user}
      />

      {/* Nueva Cita Modal */}
      <NuevaCitaModal
        isOpen={nuevaCitaModalOpen}
        onOpenChange={setNuevaCitaModalOpen}
        vehiculos={vehiculos}
        onCitaCreada={handleCitaCreada}
        onVerTodasCitas={() => setActiveSection('citas')}
      />

      {/* Asistencia Modal */}
      <AsistenciaModal
        isOpen={asistenciaModalOpen}
        onOpenChange={setAsistenciaModalOpen}
        numeroAseguradora={numeroAseguradora}
        onIrAPerfil={() => {
          setAsistenciaModalOpen(false);
          setActiveSection('configuracion');
        }}
      />

      {/* Ya estoy aquí Modal */}
      <YaEstoyAquiModal
        isOpen={yaEstoyAquiModalOpen}
        onOpenChange={setYaEstoyAquiModalOpen}
        onConfirmar={handleConfirmarUbicacion}
      />

      {/* Turno Detalles Modal */}
      {turnoActivo && (
        <TurnoDetallesModal
          isOpen={turnoDetallesModalOpen}
          onOpenChange={setTurnoDetallesModalOpen}
          turno={turnoActivo}
          onCancelarTurno={handleCancelarTurno}
        />
      )}
    </div>
  );
}