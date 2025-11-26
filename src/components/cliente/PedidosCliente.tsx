import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Package,
  MessageSquare,
  CheckCircle2,
  Clock,
  Truck,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  LifeBuoy
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PedidosClienteProps {
  onNavigateToChat?: () => void;
  onPedidosCountChange?: (count: number) => void;
  refreshKey?: number;
}

export function PedidosCliente({ onNavigateToChat }: PedidosClienteProps = {}) {

  const [activeTab, setActiveTab] = useState('seguimiento');
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [completados, setCompletados] = useState<any[]>([]);
  // Obtener callback y refreshKey para actualizar badge y recarga
  const { onPedidosCountChange, refreshKey } = arguments[0] || {};

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

  // Petición para traer los pedidos del cliente
  useEffect(() => {
    fetch(`http://localhost:4000/clientes/${clienteId}/pedidos`)
      .then(res => res.json())
      .then(data => {
        // Formatear fechas y ordenar descendente
        const formatFecha = (fecha: string) => {
          if (!fecha) return '';
          const d = new Date(fecha);
          return d.toLocaleString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        };
        const pedidosOrdenados = Array.isArray(data)
          ? [...data].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
          : [];
        pedidosOrdenados.forEach((p: any) => {
          p.fecha = formatFecha(p.fecha);
          if (Array.isArray(p.timeline)) {
            p.timeline.forEach((step: any) => {
              step.fecha = formatFecha(step.fecha);
            });
          }
        });
        // Separar pedidos en seguimiento y completados
        const seg = pedidosOrdenados.filter((p: any) => p.estado !== 'completado');
        const comp = pedidosOrdenados.filter((p: any) => p.estado === 'completado');
        setPedidos(seg);
        setCompletados(comp);
        // Actualizar badge del menú si hay callback
        if (typeof onPedidosCountChange === 'function') {
          onPedidosCountChange(seg.length);
        }
      })
      .catch(() => {
        setPedidos([]);
        setCompletados([]);
      });
  }, [clienteId, refreshKey]);

  const handleChatPedido = (pedidoId: string) => {
    if (onNavigateToChat) {
      onNavigateToChat();
      toast.success(`Abriendo chat para pedido ${pedidoId}`);
    } else {
      toast.info(`Abriendo chat para pedido ${pedidoId}`);
    }
  };

  const handleAsistenciaCarretera = (pedidoId: string) => {
    toast.info(`Solicitando asistencia para pedido ${pedidoId}`);
  };

  const getEstadoBadge = (estado: string) => {
    const badges: Record<string, { label: string; className: string }> = {
      recibido: { label: 'Recibido', className: 'bg-blue-100 text-blue-700 border-blue-200' },
      preparacion: { label: 'En Preparación', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
      enviado: { label: 'Enviado', className: 'bg-purple-100 text-purple-700 border-purple-200' },
      'en-carretera': { label: 'En Carretera', className: 'bg-red-100 text-red-700 border-red-200' },
      completado: { label: 'Completado', className: 'bg-green-100 text-green-700 border-green-200' }
    };
    const badge = badges[estado];
    if (!badge) {
      return <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">{estado || 'Desconocido'}</Badge>;
    }
    return <Badge variant="outline" className={badge.className}>{badge.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="seguimiento">Seguimiento</TabsTrigger>
          <TabsTrigger value="completados">Completados</TabsTrigger>
        </TabsList>

        {/* Tab Seguimiento */}
        <TabsContent value="seguimiento" className="space-y-4 mt-6">
          {pedidos.map((pedido) => (
            <Card key={pedido.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Pedido {pedido.id}
                  </CardTitle>
                  {getEstadoBadge(pedido.estado)}
                </div>
                <p className="text-sm text-gray-500">{pedido.fecha}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Timeline de Estados */}
                <div className="space-y-3">
                  {(pedido.timeline ?? []).map((step: any, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        step.completado ? 'bg-teal-100' : 'bg-gray-100'
                      }`}>
                        {step.completado ? (
                          <CheckCircle2 className="w-5 h-5 text-teal-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className={`text-sm font-medium ${
                          step.completado ? 'text-gray-900' : 'text-gray-400'
                        }`}>
                          {step.estado === 'recibido' && 'Pedido Recibido'}
                          {step.estado === 'preparacion' && 'En Preparación'}
                          {step.estado === 'enviado' && 'Enviado / Listo para Recogida'}
                          {step.estado === 'completado' && 'Completado'}
                        </p>
                        {step.fecha && (
                          <p className="text-xs text-gray-500">{step.fecha}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Productos */}
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600 mb-2">Productos:</p>
                  <ul className="text-sm space-y-1">
                    {(pedido.productos ?? []).map((prod: any, idx: number) => (
                      <li key={idx} className="text-gray-700">• {prod}</li>
                    ))}
                  </ul>
                  
                  {/* Link contextual a Asistencia para pedidos en-carretera */}
                  {pedido.estado === 'en-carretera' && (
                    <button
                      onClick={() => handleAsistenciaCarretera(pedido.id)}
                      className="flex items-center gap-1.5 mt-3 text-sm text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      <LifeBuoy className="w-4 h-4" />
                      <span className="underline underline-offset-2">Solicitar asistencia</span>
                    </button>
                  )}
                </div>

                {/* Total y Acciones */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <p style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Total: <span className="text-teal-600">€{pedido.total.toFixed(2)}</span>
                  </p>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => handleChatPedido(pedido.id)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat con este pedido
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Tab Completados */}
        <TabsContent value="completados" className="space-y-4 mt-6">
          {completados.map((pedido) => (
            <Card key={pedido.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <h3 className="font-medium">{pedido.id}</h3>
                    </div>
                    <p className="text-sm text-gray-500">{pedido.fecha}</p>
                  </div>
                  <p className="text-teal-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    €{pedido.total.toFixed(2)}
                  </p>
                </div>
                <div className="text-sm space-y-1">
                  {(pedido.productos ?? []).map((prod: any, idx: number) => (
                    <p key={idx} className="text-gray-600">• {prod}</p>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <Package className="w-4 h-4 mr-2" />
                  Repetir Pedido
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}