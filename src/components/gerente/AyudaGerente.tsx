import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { 
  MessageSquare, 
  Users, 
  UserCheck,
  ExternalLink,
  Plus,
  Search,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Paperclip,
  MoreVertical
} from 'lucide-react';
import { format } from 'date-fns@4.1.0';
import { es } from 'date-fns@4.1.0/locale';
import { toast } from 'sonner@2.0.3';

interface Chat {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: 'clientes' | 'empleados' | 'externos';
  estado: 'abierto' | 'en-proceso' | 'resuelto' | 'cerrado';
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  creador: string;
  asignadoA?: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  mensajes: ChatMensaje[];
}

interface ChatMensaje {
  id: string;
  autor: string;
  mensaje: string;
  fecha: string;
  esGerente: boolean;
}

export function AyudaGerente() {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'clientes' | 'empleados' | 'externos'>('todos');
  const [chatSeleccionado, setChatSeleccionado] = useState<Chat | null>(null);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const chats: Chat[] = [
    {
      id: 'TKT-001',
      titulo: 'Problema con pedido de pan integral',
      descripcion: 'El cliente reporta que el pan integral llegó en mal estado',
      categoria: 'clientes',
      estado: 'abierto',
      prioridad: 'alta',
      creador: 'María González (Cliente)',
      asignadoA: 'Ana Rodríguez',
      fechaCreacion: '2025-11-18T09:30:00',
      fechaActualizacion: '2025-11-18T10:15:00',
      mensajes: [
        {
          id: 'MSG-001',
          autor: 'María González (Cliente)',
          mensaje: 'El pan integral llegó en mal estado',
          fecha: '2025-11-18T09:30:00',
          esGerente: false
        },
        {
          id: 'MSG-002',
          autor: 'Ana Rodríguez',
          mensaje: 'Hemos recibido tu consulta. Estamos trabajando en ello.',
          fecha: '2025-11-18T10:15:00',
          esGerente: true
        }
      ]
    },
    {
      id: 'TKT-002',
      titulo: 'Consulta sobre horarios de trabajo',
      descripcion: 'Solicitud de cambio de turno para próxima semana',
      categoria: 'empleados',
      estado: 'en-proceso',
      prioridad: 'media',
      creador: 'Carlos Méndez (Empleado)',
      asignadoA: 'Gerente',
      fechaCreacion: '2025-11-18T08:00:00',
      fechaActualizacion: '2025-11-18T11:30:00',
      mensajes: [
        {
          id: 'MSG-003',
          autor: 'Carlos Méndez (Empleado)',
          mensaje: 'Solicito cambio de turno para próxima semana',
          fecha: '2025-11-18T08:00:00',
          esGerente: false
        },
        {
          id: 'MSG-004',
          autor: 'Gerente',
          mensaje: 'Revisaremos tu solicitud y te contactaremos.',
          fecha: '2025-11-18T11:30:00',
          esGerente: true
        }
      ]
    },
    {
      id: 'TKT-003',
      titulo: 'Pedido especial para evento corporativo',
      descripcion: 'Empresa solicita 200 unidades de bollería variada para el viernes',
      categoria: 'clientes',
      estado: 'en-proceso',
      prioridad: 'urgente',
      creador: 'Roberto Sánchez (Cliente)',
      asignadoA: 'María González',
      fechaCreacion: '2025-11-17T14:20:00',
      fechaActualizacion: '2025-11-18T09:00:00',
      mensajes: [
        {
          id: 'MSG-005',
          autor: 'Roberto Sánchez (Cliente)',
          mensaje: 'Necesitamos 200 unidades de bollería variada para el viernes',
          fecha: '2025-11-17T14:20:00',
          esGerente: false
        },
        {
          id: 'MSG-006',
          autor: 'María González',
          mensaje: 'Confirmamos el pedido. Se enviará el viernes.',
          fecha: '2025-11-18T09:00:00',
          esGerente: true
        }
      ]
    },
    {
      id: 'TKT-004',
      titulo: 'Consulta proveedores de harina',
      descripcion: 'Solicitud de información sobre nuevos proveedores de harina integral',
      categoria: 'externos',
      estado: 'abierto',
      prioridad: 'media',
      creador: 'Proveedores S.L.',
      fechaCreacion: '2025-11-17T16:45:00',
      fechaActualizacion: '2025-11-17T16:45:00',
      mensajes: [
        {
          id: 'MSG-007',
          autor: 'Proveedores S.L.',
          mensaje: '¿Tienen información sobre nuevos proveedores de harina integral?',
          fecha: '2025-11-17T16:45:00',
          esGerente: false
        }
      ]
    },
    {
      id: 'TKT-005',
      titulo: 'Solicitud de vacaciones',
      descripcion: 'Solicitud de vacaciones para periodo navideño',
      categoria: 'empleados',
      estado: 'resuelto',
      prioridad: 'baja',
      creador: 'Laura Martínez (Empleada)',
      asignadoA: 'Gerente',
      fechaCreacion: '2025-11-15T10:00:00',
      fechaActualizacion: '2025-11-16T12:00:00',
      mensajes: [
        {
          id: 'MSG-008',
          autor: 'Laura Martínez (Empleada)',
          mensaje: 'Solicito vacaciones para el periodo navideño',
          fecha: '2025-11-15T10:00:00',
          esGerente: false
        },
        {
          id: 'MSG-009',
          autor: 'Gerente',
          mensaje: 'Vacaciones aprobadas para el periodo navideño.',
          fecha: '2025-11-16T12:00:00',
          esGerente: true
        }
      ]
    },
    {
      id: 'TKT-006',
      titulo: 'Devolución por producto defectuoso',
      descripcion: 'Cliente solicita devolución de croissants por problemas de calidad',
      categoria: 'clientes',
      estado: 'cerrado',
      prioridad: 'alta',
      creador: 'Ana García (Cliente)',
      asignadoA: 'Ana Rodríguez',
      fechaCreacion: '2025-11-14T11:30:00',
      fechaActualizacion: '2025-11-15T09:00:00',
      mensajes: [
        {
          id: 'MSG-010',
          autor: 'Ana García (Cliente)',
          mensaje: 'Solicito devolución de croissants por problemas de calidad',
          fecha: '2025-11-14T11:30:00',
          esGerente: false
        },
        {
          id: 'MSG-011',
          autor: 'Ana Rodríguez',
          mensaje: 'Hemos recibido tu solicitud. Se procesará la devolución.',
          fecha: '2025-11-15T09:00:00',
          esGerente: true
        }
      ]
    },
    {
      id: 'TKT-007',
      titulo: 'Propuesta comercial mayorista',
      descripcion: 'Cadena de hoteles interesada en compra mayorista semanal',
      categoria: 'externos',
      estado: 'en-proceso',
      prioridad: 'alta',
      creador: 'Hoteles Costa S.A.',
      asignadoA: 'Gerente',
      fechaCreacion: '2025-11-16T09:00:00',
      fechaActualizacion: '2025-11-17T15:30:00',
      mensajes: [
        {
          id: 'MSG-012',
          autor: 'Hoteles Costa S.A.',
          mensaje: 'Estamos interesados en una propuesta comercial mayorista semanal',
          fecha: '2025-11-16T09:00:00',
          esGerente: false
        },
        {
          id: 'MSG-013',
          autor: 'Gerente',
          mensaje: 'Prepararemos una propuesta comercial para ti.',
          fecha: '2025-11-17T15:30:00',
          esGerente: true
        }
      ]
    },
    {
      id: 'TKT-008',
      titulo: 'Problema con equipo de amasado',
      descripcion: 'La amasadora principal presenta fallos intermitentes',
      categoria: 'empleados',
      estado: 'abierto',
      prioridad: 'urgente',
      creador: 'Javier Torres (Empleado)',
      asignadoA: 'Gerente',
      fechaCreacion: '2025-11-18T06:00:00',
      fechaActualizacion: '2025-11-18T06:30:00',
      mensajes: [
        {
          id: 'MSG-014',
          autor: 'Javier Torres (Empleado)',
          mensaje: 'La amasadora principal presenta fallos intermitentes',
          fecha: '2025-11-18T06:00:00',
          esGerente: false
        },
        {
          id: 'MSG-015',
          autor: 'Gerente',
          mensaje: 'Revisaremos el equipo y te contactaremos.',
          fecha: '2025-11-18T06:30:00',
          esGerente: true
        }
      ]
    },
    {
      id: 'TKT-009',
      titulo: 'Consulta sobre precios mayoristas',
      descripcion: 'Restaurante consulta tarifas para pedidos recurrentes',
      categoria: 'clientes',
      estado: 'abierto',
      prioridad: 'media',
      creador: 'Restaurante El Fogón',
      fechaCreacion: '2025-11-17T12:00:00',
      fechaActualizacion: '2025-11-17T12:00:00',
      mensajes: [
        {
          id: 'MSG-016',
          autor: 'Restaurante El Fogón',
          mensaje: '¿Tienen tarifas para pedidos recurrentes?',
          fecha: '2025-11-17T12:00:00',
          esGerente: false
        }
      ]
    },
    {
      id: 'TKT-010',
      titulo: 'Solicitud de certificado de calidad',
      descripcion: 'Auditoría externa solicita certificados de calidad alimentaria',
      categoria: 'externos',
      estado: 'en-proceso',
      prioridad: 'alta',
      creador: 'SGS Auditores',
      asignadoA: 'Gerente',
      fechaCreacion: '2025-11-16T14:00:00',
      fechaActualizacion: '2025-11-17T10:00:00',
      mensajes: [
        {
          id: 'MSG-017',
          autor: 'SGS Auditores',
          mensaje: 'Solicitamos certificados de calidad alimentaria',
          fecha: '2025-11-16T14:00:00',
          esGerente: false
        },
        {
          id: 'MSG-018',
          autor: 'Gerente',
          mensaje: 'Prepararemos los certificados para ti.',
          fecha: '2025-11-17T10:00:00',
          esGerente: true
        }
      ]
    }
  ];

  const chatsFiltrados = chats.filter(chat => {
    const matchCategoria = activeFilter === 'todos' || chat.categoria === activeFilter;
    const matchBusqueda = chat.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                         chat.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
                         chat.creador.toLowerCase().includes(busqueda.toLowerCase());
    return matchCategoria && matchBusqueda;
  });

  const getEstadoBadge = (estado: string) => {
    const configs = {
      abierto: { className: 'bg-blue-600', label: 'Abierto' },
      'en-proceso': { className: 'bg-yellow-600', label: 'En Proceso' },
      resuelto: { className: 'bg-green-600', label: 'Resuelto' },
      cerrado: { className: 'bg-gray-600', label: 'Cerrado' }
    };
    const config = configs[estado as keyof typeof configs];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPrioridadBadge = (prioridad: string) => {
    const configs = {
      baja: { className: 'bg-gray-500', label: 'Baja' },
      media: { className: 'bg-blue-500', label: 'Media' },
      alta: { className: 'bg-orange-500', label: 'Alta' },
      urgente: { className: 'bg-red-500', label: 'Urgente' }
    };
    const config = configs[prioridad as keyof typeof configs];
    return <Badge variant="outline" className={`border-2 ${config.className.replace('bg-', 'border-')} ${config.className.replace('bg-', 'text-')}`}>{config.label}</Badge>;
  };

  const getEstadoIcon = (estado: string) => {
    const icons = {
      abierto: <AlertCircle className="w-5 h-5 text-blue-600" />,
      'en-proceso': <Clock className="w-5 h-5 text-yellow-600" />,
      resuelto: <CheckCircle2 className="w-5 h-5 text-green-600" />,
      cerrado: <XCircle className="w-5 h-5 text-gray-600" />
    };
    return icons[estado as keyof typeof icons];
  };

  const handleEnviarMensaje = () => {
    if (nuevoMensaje.trim()) {
      toast.success('Mensaje enviado correctamente');
      setNuevoMensaje('');
    }
  };

  const contadores = {
    todos: chats.length,
    clientes: chats.filter(t => t.categoria === 'clientes').length,
    empleados: chats.filter(t => t.categoria === 'empleados').length,
    externos: chats.filter(t => t.categoria === 'externos').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Chat y Soporte
          </h2>
          <p className="text-gray-600 text-sm">
            Gestión de chats y consultas de clientes, empleados y externos
          </p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Chat
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={activeFilter === 'todos' ? 'default' : 'outline'}
          onClick={() => setActiveFilter('todos')}
          className={activeFilter === 'todos' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Todos ({contadores.todos})
        </Button>
        <Button
          variant={activeFilter === 'clientes' ? 'default' : 'outline'}
          onClick={() => setActiveFilter('clientes')}
          className={activeFilter === 'clientes' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <Users className="w-4 h-4 mr-2" />
          Clientes ({contadores.clientes})
        </Button>
        <Button
          variant={activeFilter === 'empleados' ? 'default' : 'outline'}
          onClick={() => setActiveFilter('empleados')}
          className={activeFilter === 'empleados' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <UserCheck className="w-4 h-4 mr-2" />
          Empleados ({contadores.empleados})
        </Button>
        <Button
          variant={activeFilter === 'externos' ? 'default' : 'outline'}
          onClick={() => setActiveFilter('externos')}
          className={activeFilter === 'externos' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Externos ({contadores.externos})
        </Button>
      </div>

      {/* Lista de Chats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna Izquierda - Lista */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              Tickets {activeFilter !== 'todos' && `- ${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`}
            </CardTitle>
            <p className="text-sm text-gray-600">
              {chatsFiltrados.length} {chatsFiltrados.length === 1 ? 'ticket encontrado' : 'tickets encontrados'}
            </p>
          </CardHeader>
          <CardContent>
            {chatsFiltrados.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>No hay tickets que mostrar</p>
                <p className="text-sm mt-1">
                  Ajusta los filtros o crea un nuevo ticket
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {chatsFiltrados.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setChatSeleccionado(chat)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      chatSeleccionado?.id === chat.id
                        ? 'border-teal-500 bg-teal-50 shadow-md'
                        : 'border-gray-200 hover:border-teal-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getEstadoIcon(chat.estado)}
                        <h3 className="font-medium text-gray-900">{chat.titulo}</h3>
                      </div>
                      <span className="text-xs text-gray-500">{chat.id}</span>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {chat.descripcion}
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      {getEstadoBadge(chat.estado)}
                      {getPrioridadBadge(chat.prioridad)}
                      <Badge variant="outline" className="text-xs">
                        {chat.categoria === 'clientes' && <Users className="w-3 h-3 mr-1" />}
                        {chat.categoria === 'empleados' && <UserCheck className="w-3 h-3 mr-1" />}
                        {chat.categoria === 'externos' && <ExternalLink className="w-3 h-3 mr-1" />}
                        {chat.categoria.charAt(0).toUpperCase() + chat.categoria.slice(1)}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Por: {chat.creador}</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {chat.mensajes.length}
                        </span>
                        <span>{format(new Date(chat.fechaCreacion), 'dd/MM/yy HH:mm')}</span>
                      </div>
                    </div>

                    {chat.asignadoA && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <span className="text-xs text-gray-600">
                          Asignado a: <span className="font-medium">{chat.asignadoA}</span>
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Columna Derecha - Detalle del Chat */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              {chatSeleccionado ? 'Detalle del Chat' : ''}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!chatSeleccionado ? (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-30" />
              </div>
            ) : (
              <div className="space-y-4">
                {(() => {
                  const chat = chatSeleccionado;
                  if (!chat) return null;

                  return (
                    <>
                      {/* Cabecera del Ticket */}
                      <div className="pb-4 border-b">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-medium text-gray-900 mb-1">{chat.titulo}</h3>
                            <p className="text-sm text-gray-600">{chat.id}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          {getEstadoBadge(chat.estado)}
                          {getPrioridadBadge(chat.prioridad)}
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">Creado por:</span>
                            <span className="font-medium">{chat.creador}</span>
                          </div>
                          {chat.asignadoA && (
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Asignado a:</span>
                              <span className="font-medium">{chat.asignadoA}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">Creado:</span>
                            <span>{format(new Date(chat.fechaCreacion), "d 'de' MMMM, HH:mm", { locale: es })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">Última actualización:</span>
                            <span>{format(new Date(chat.fechaActualizacion), "d 'de' MMMM, HH:mm", { locale: es })}</span>
                          </div>
                        </div>
                      </div>

                      {/* Descripción */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Descripción</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {chat.descripcion}
                        </p>
                      </div>

                      {/* Mensajes */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">
                          Conversación ({chat.mensajes.length} mensajes)
                        </h4>
                        <div className="space-y-3 max-h-[200px] overflow-y-auto mb-4">
                          {chat.mensajes.map(mensaje => (
                            <div
                              key={mensaje.id}
                              className={`bg-${mensaje.esGerente ? 'teal' : 'gray'}-50 p-3 rounded-lg ${mensaje.esGerente ? 'ml-4' : ''}`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium">{mensaje.autor}</span>
                                <span className="text-xs text-gray-500">
                                  {format(new Date(mensaje.fecha), 'HH:mm')}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">{mensaje.mensaje}</p>
                            </div>
                          ))}
                        </div>

                        {/* Input para nuevo mensaje */}
                        <div className="space-y-2">
                          <Textarea
                            placeholder="Escribe un mensaje..."
                            value={nuevoMensaje}
                            onChange={(e) => setNuevoMensaje(e.target.value)}
                            rows={3}
                          />
                          <div className="flex items-center justify-between">
                            <Button variant="outline" size="sm">
                              <Paperclip className="w-4 h-4 mr-2" />
                              Adjuntar
                            </Button>
                            <Button 
                              onClick={handleEnviarMensaje}
                              className="bg-teal-600 hover:bg-teal-700"
                              size="sm"
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Enviar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}