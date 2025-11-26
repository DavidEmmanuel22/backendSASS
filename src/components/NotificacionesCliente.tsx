import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bell, Package, CreditCard, MessageSquare, Gift, Settings as SettingsIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

interface Notificacion {
  id: string;
  tipo: 'pedido' | 'pago' | 'mensaje' | 'promocion';
  titulo: string;
  descripcion: string;
  fecha: string;
  leida: boolean;
}

export function NotificacionesCliente() {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    {
      id: '1',
      tipo: 'pedido',
      titulo: 'Pedido en camino',
      descripcion: 'Tu pedido #PED001 está en camino. Llegará en 15 minutos.',
      fecha: '2025-11-10T14:30:00',
      leida: false,
    },
    {
      id: '2',
      tipo: 'promocion',
      titulo: '¡2x1 en Pizzas!',
      descripcion: 'Pizza Napoletana tiene una promoción especial este fin de semana.',
      fecha: '2025-11-10T10:00:00',
      leida: false,
    },
    {
      id: '3',
      tipo: 'pago',
      titulo: 'Pago confirmado',
      descripcion: 'Tu pago de $45.50 ha sido procesado exitosamente.',
      fecha: '2025-11-09T18:20:00',
      leida: true,
    },
    {
      id: '4',
      tipo: 'mensaje',
      titulo: 'Nuevo mensaje',
      descripcion: 'La Taquería del Centro te ha enviado un mensaje.',
      fecha: '2025-11-09T12:15:00',
      leida: true,
    },
  ]);

  const [configuracion, setConfiguracion] = useState({
    pedidos: true,
    pagos: true,
    mensajes: true,
    promociones: true,
    email: true,
    push: true,
  });

  const getIcono = (tipo: Notificacion['tipo']) => {
    const iconos = {
      pedido: Package,
      pago: CreditCard,
      mensaje: MessageSquare,
      promocion: Gift,
    };
    return iconos[tipo];
  };

  const getColorFondo = (tipo: Notificacion['tipo']) => {
    const colores = {
      pedido: 'bg-blue-100',
      pago: 'bg-green-100',
      mensaje: 'bg-purple-100',
      promocion: 'bg-orange-100',
    };
    return colores[tipo];
  };

  const getColorIcono = (tipo: Notificacion['tipo']) => {
    const colores = {
      pedido: 'text-blue-600',
      pago: 'text-green-600',
      mensaje: 'text-purple-600',
      promocion: 'text-orange-600',
    };
    return colores[tipo];
  };

  const marcarComoLeida = (id: string) => {
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
    );
  };

  const notificacionesNoLeidas = notificaciones.filter((n) => !n.leida).length;

  const formatearFecha = (fecha: string) => {
    const ahora = new Date();
    const fechaNotif = new Date(fecha);
    const diff = ahora.getTime() - fechaNotif.getTime();
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);

    if (minutos < 60) return `Hace ${minutos} min`;
    if (horas < 24) return `Hace ${horas} h`;
    return `Hace ${dias} días`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Notificaciones</h2>
          <p className="text-gray-600">
            Tienes {notificacionesNoLeidas} notificación{notificacionesNoLeidas !== 1 ? 'es' : ''} sin leer
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-teal-600">{notificacionesNoLeidas} Nuevas</Badge>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <SettingsIcon className="w-4 h-4 mr-2" />
                Configuración
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Configuración de Notificaciones</DialogTitle>
                <DialogDescription>
                  Personaliza cómo y cuándo recibir notificaciones
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div>
                  <p className="text-gray-700 mb-4">Tipo de Notificaciones</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">Pedidos</span>
                      </div>
                      <Switch
                        checked={configuracion.pedidos}
                        onCheckedChange={(checked) =>
                          setConfiguracion({ ...configuracion, pedidos: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">Pagos</span>
                      </div>
                      <Switch
                        checked={configuracion.pagos}
                        onCheckedChange={(checked) =>
                          setConfiguracion({ ...configuracion, pagos: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">Mensajes</span>
                      </div>
                      <Switch
                        checked={configuracion.mensajes}
                        onCheckedChange={(checked) =>
                          setConfiguracion({ ...configuracion, mensajes: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Gift className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">Promociones</span>
                      </div>
                      <Switch
                        checked={configuracion.promociones}
                        onCheckedChange={(checked) =>
                          setConfiguracion({ ...configuracion, promociones: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-gray-700 mb-4">Canales de Entrega</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">Notificaciones Push</span>
                      </div>
                      <Switch
                        checked={configuracion.push}
                        onCheckedChange={(checked) =>
                          setConfiguracion({ ...configuracion, push: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">Email</span>
                      </div>
                      <Switch
                        checked={configuracion.email}
                        onCheckedChange={(checked) =>
                          setConfiguracion({ ...configuracion, email: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  Guardar Preferencias
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Lista de Notificaciones */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recientes</CardTitle>
            <CardDescription>Tus últimas notificaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notificaciones.map((notif) => {
                const Icono = getIcono(notif.tipo);
                return (
                  <div
                    key={notif.id}
                    onClick={() => marcarComoLeida(notif.id)}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      !notif.leida ? 'bg-teal-50 border-teal-200' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 ${getColorFondo(notif.tipo)} rounded-full flex items-center justify-center shrink-0`}>
                        <Icono className={`w-5 h-5 ${getColorIcono(notif.tipo)}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <p className="text-gray-900">{notif.titulo}</p>
                          {!notif.leida && (
                            <div className="w-2 h-2 bg-teal-600 rounded-full" />
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{notif.descripcion}</p>
                        <span className="text-gray-500 text-xs">{formatearFecha(notif.fecha)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}