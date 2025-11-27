import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Bell,
  Package,
  CalendarDays,
  Tag,
  Wrench,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { format } from 'date-fns@4.1.0';
import { es } from 'date-fns@4.1.0/locale';

interface Notificacion {
  id: string;
  tipo: 'pedido' | 'cita' | 'promocion' | 'sistema';
  titulo: string;
  mensaje: string;
  fecha: Date;
  leida: boolean;
}

interface HistorialAccion {
  id: string;
  tipo: 'pedido' | 'cita' | 'pago' | 'vehiculo';
  accion: string;
  detalles: string;
  fecha: Date;
}

export function NotificacionesCliente() {
  const [activeTab, setActiveTab] = useState('alertas');
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

  // Obtiene el id del usuario logueado desde localStorage
  const clienteId = (() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        return user.id;
      }
    } catch {}
    return 1;
  })();

  // Petición para traer las notificaciones del cliente
  useEffect(() => {
    fetch(`https://mytreefam.com/sass/api/clientes/${clienteId}/notificaciones`)
      .then(res => res.json())
      .then(data => {
        // Si la fecha viene como string, conviértela a Date
        const notifs = Array.isArray(data)
          ? data.map((n: any) => ({ ...n, fecha: n.fecha ? new Date(n.fecha) : new Date() }))
          : [];
        setNotificaciones(notifs);
      })
      .catch(() => setNotificaciones([]));
  }, [clienteId]);

  const historial: HistorialAccion[] = [
    {
      id: '1',
      tipo: 'pedido',
      accion: 'Pedido creado',
      detalles: 'Pedido #1234 - 10 Barras Pan + Croissants - 28,50 €',
      fecha: new Date(2025, 10, 10, 15, 45),
    },
    {
      id: '2',
      tipo: 'pedido',
      accion: 'Pedido completado',
      detalles: 'Pedido #1233 - Bollería variada - 32,90 €',
      fecha: new Date(2025, 10, 8, 11, 20),
    },
    {
      id: '3',
      tipo: 'pago',
      accion: 'Pago completado',
      detalles: 'Pedido #1232 - 45,50 € (Tarjeta VISA)',
      fecha: new Date(2025, 10, 5, 9, 15),
    },
    {
      id: '4',
      tipo: 'pedido',
      accion: 'Pedido creado',
      detalles: 'Pedido #1231 - Pan Artesanal + Ensaimadas - 38,90 €',
      fecha: new Date(2025, 10, 1, 14, 30),
    },
    {
      id: '5',
      tipo: 'pedido',
      accion: 'Pedido completado',
      detalles: 'Pedido #1230 - Menú Desayuno - 15,90 € - 25 Oct 2025',
      fecha: new Date(2025, 9, 25, 17, 0),
    },
  ];

  const noLeidas = notificaciones.filter(n => !n.leida).length;

  const marcarComoLeida = (id: string) => {
    setNotificaciones(prev => 
      prev.map(n => n.id === id ? { ...n, leida: true } : n)
    );
    toast.success('Notificación marcada como leída');
  };

  const marcarTodasComoLeidas = () => {
    setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })));
    toast.success('Todas las notificaciones marcadas como leídas');
  };

  const eliminarNotificacion = (id: string) => {
    setNotificaciones(prev => prev.filter(n => n.id !== id));
    toast.success('Notificación eliminada');
  };

  const getTipoIcon = (tipo: string) => {
    const icons: Record<string, { icon: any; color: string }> = {
      pedido: { icon: Package, color: 'text-blue-600' },
      cita: { icon: CalendarDays, color: 'text-teal-600' },
      promocion: { icon: Tag, color: 'text-green-600' },
      sistema: { icon: Bell, color: 'text-gray-600' },
      pago: { icon: CheckCircle2, color: 'text-green-600' },
      vehiculo: { icon: Wrench, color: 'text-orange-600' },
    };
    return icons[tipo] || icons.sistema;
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="alertas" className="relative">
            Notificaciones
            {noLeidas > 0 && (
              <Badge className="ml-2 bg-red-500 text-white h-5 min-w-[20px] px-1">
                {noLeidas}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
        </TabsList>

        {/* TAB: NOTIFICACIONES */}
        <TabsContent value="alertas" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Notificaciones del Sistema
                </CardTitle>
                {noLeidas > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={marcarTodasComoLeidas}
                  >
                    Marcar todas como leídas
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {notificaciones.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>No tienes notificaciones</p>
                  <p className="text-sm mt-1">
                    Aquí aparecerán las alertas del sistema
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notificaciones.map((notif) => {
                    const tipoInfo = getTipoIcon(notif.tipo);
                    const Icon = tipoInfo.icon;
                    return (
                      <div
                        key={notif.id}
                        className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                          notif.leida 
                            ? 'bg-white border-gray-200' 
                            : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          notif.leida ? 'bg-gray-100' : 'bg-blue-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${tipoInfo.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className={`font-medium ${!notif.leida ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notif.titulo}
                            </p>
                            {!notif.leida && (
                              <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {notif.mensaje}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">
                              {format(notif.fecha, "d 'de' MMMM, HH:mm", { locale: es })}
                            </p>
                            <div className="flex items-center gap-2">
                              {!notif.leida && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => marcarComoLeida(notif.id)}
                                  className="h-8 text-xs"
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  Marcar leída
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => eliminarNotificacion(notif.id)}
                                className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: HISTORIAL */}
        <TabsContent value="historial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                Registro de Actividad
              </CardTitle>
            </CardHeader>
            <CardContent>
              {historial.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>No hay actividad registrada</p>
                  <p className="text-sm mt-1">
                    Aquí verás un log de todas tus acciones
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {historial.map((item, index) => {
                    const tipoInfo = getTipoIcon(item.tipo);
                    const Icon = tipoInfo.icon;
                    const esUltimo = index === historial.length - 1;
                    
                    return (
                      <div key={item.id} className="flex items-start gap-4 py-3 relative">
                        {/* Línea vertical */}
                        {!esUltimo && (
                          <div className="absolute left-[20px] top-12 bottom-0 w-0.5 bg-gray-200" />
                        )}
                        
                        {/* Icono */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gray-100 z-10 relative`}>
                          <Icon className={`w-5 h-5 ${tipoInfo.color}`} />
                        </div>
                        
                        {/* Contenido */}
                        <div className="flex-1 pt-1">
                          <p className="font-medium text-gray-900">{item.accion}</p>
                          <p className="text-sm text-gray-600 mb-1">{item.detalles}</p>
                          <p className="text-xs text-gray-500">
                            {format(item.fecha, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}