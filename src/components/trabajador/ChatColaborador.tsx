import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { 
  MessageSquare,
  Send,
  Search,
  CheckCircle2,
  Clock,
  Filter,
  Package,
  Info,
  AlertCircle,
  Bug,
  User,
  Plus,
  Building2,
  UserCircle2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Mensaje {
  id: string;
  contenido: string;
  autor: string;
  rol: 'cliente' | 'colaborador' | 'gerente';
  avatar?: string;
  timestamp: string;
  leido: boolean;
}

interface Conversacion {
  id: string;
  tipo: 'pedido' | 'informacion' | 'reclamacion' | 'fallo-app' | 'otro';
  asunto: string;
  cliente: string;
  clienteAvatar?: string;
  estado: 'abierto' | 'en-curso' | 'cerrado';
  fechaCreacion: string;
  fechaUltimoMensaje: string;
  asignadoA?: string;
  mensajes: Mensaje[];
  categoria: 'clientes' | 'otras-tiendas' | 'gerente'; // Nueva propiedad
  tienda?: string; // Para chats de otras tiendas
}

export function ChatColaborador() {
  const [conversacionSeleccionada, setConversacionSeleccionada] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('abierto');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas'); // Nuevo filtro
  const [busqueda, setBusqueda] = useState('');

  // Nombre del colaborador actual (vendría de props o contexto)
  const colaboradorActual = 'Carlos Méndez';
  const colaboradorAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100';

  const [conversaciones, setConversaciones] = useState<Conversacion[]>([
    {
      id: 'CHAT-001',
      tipo: 'pedido',
      asunto: 'Consulta sobre pedido PED-002',
      cliente: 'María González',
      clienteAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      estado: 'en-curso',
      fechaCreacion: '2025-11-10T09:00:00',
      fechaUltimoMensaje: '2025-11-10T14:30:00',
      asignadoA: 'Carlos Méndez',
      mensajes: [
        {
          id: 'M1',
          contenido: '¿Cuándo estará lista mi pizza? Llevo esperando 20 minutos',
          autor: 'María González',
          rol: 'cliente',
          timestamp: '2025-11-10T09:00:00',
          leido: true
        },
        {
          id: 'M2',
          contenido: 'Hola María, disculpa la espera. Tu Pizza Pepperoni está saliendo del horno ahora mismo. Estará lista en 2 minutos.',
          autor: 'Carlos Méndez',
          rol: 'colaborador',
          avatar: colaboradorAvatar,
          timestamp: '2025-11-10T10:15:00',
          leido: true
        },
        {
          id: 'M3',
          contenido: 'Perfecto, gracias por la información',
          autor: 'María González',
          rol: 'cliente',
          timestamp: '2025-11-10T10:20:00',
          leido: true
        },
        {
          id: 'M4',
          contenido: 'De nada, disfruta tu pizza!',
          autor: 'Carlos Méndez',
          rol: 'colaborador',
          avatar: colaboradorAvatar,
          timestamp: '2025-11-10T14:30:00',
          leido: true
        }
      ],
      categoria: 'clientes'
    },
    {
      id: 'CHAT-004',
      tipo: 'informacion',
      asunto: 'Ingredientes de la hamburguesa vegetariana',
      cliente: 'Roberto Sánchez',
      estado: 'abierto',
      fechaCreacion: '2025-11-11T08:00:00',
      fechaUltimoMensaje: '2025-11-11T08:00:00',
      mensajes: [
        {
          id: 'M10',
          contenido: 'Buenos días, soy alérgico a los frutos secos. ¿La hamburguesa vegetariana contiene nueces?',
          autor: 'Roberto Sánchez',
          rol: 'cliente',
          timestamp: '2025-11-11T08:00:00',
          leido: false
        }
      ],
      categoria: 'clientes'
    },
    {
      id: 'CHAT-005',
      tipo: 'pedido',
      asunto: 'Cambio en el pedido',
      cliente: 'Laura Martínez',
      estado: 'abierto',
      fechaCreacion: '2025-11-11T09:30:00',
      fechaUltimoMensaje: '2025-11-11T09:30:00',
      mensajes: [
        {
          id: 'M11',
          contenido: 'Hola, hice un pedido pero me olvidé de pedir extra de queso. ¿Puedo agregarlo?',
          autor: 'Laura Martínez',
          rol: 'cliente',
          timestamp: '2025-11-11T09:30:00',
          leido: false
        }
      ],
      categoria: 'clientes'
    },
    {
      id: 'CHAT-006',
      tipo: 'reclamacion',
      asunto: 'Pizza llegó fría',
      cliente: 'Pedro López',
      estado: 'abierto',
      fechaCreacion: '2025-11-11T10:00:00',
      fechaUltimoMensaje: '2025-11-11T10:00:00',
      mensajes: [
        {
          id: 'M12',
          contenido: 'Mi pizza llegó fría. Me gustaría una solución por favor.',
          autor: 'Pedro López',
          rol: 'cliente',
          timestamp: '2025-11-11T10:00:00',
          leido: false
        }
      ],
      categoria: 'clientes'
    },
    {
      id: 'CHAT-007',
      tipo: 'informacion',
      asunto: 'Consulta sobre promociones',
      cliente: 'Tienda Badalona Centro',
      estado: 'abierto',
      fechaCreacion: '2025-11-11T11:00:00',
      fechaUltimoMensaje: '2025-11-11T11:00:00',
      mensajes: [
        {
          id: 'M13',
          contenido: 'Hola, ¿tenéis disponibles las promociones de pan de payés para esta semana?',
          autor: 'Tienda Badalona Centro',
          rol: 'colaborador',
          timestamp: '2025-11-11T11:00:00',
          leido: false
        }
      ],
      categoria: 'otras-tiendas',
      tienda: 'Tienda Badalona Centro'
    },
    {
      id: 'CHAT-008',
      tipo: 'pedido',
      asunto: 'Solicitud de inventario',
      cliente: 'Jorge Martín - Gerente',
      clienteAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      estado: 'abierto',
      fechaCreacion: '2025-11-11T12:00:00',
      fechaUltimoMensaje: '2025-11-11T12:00:00',
      mensajes: [
        {
          id: 'M14',
          contenido: 'Buenos días, necesito el reporte de inventario actualizado para la reunión de las 15:00h',
          autor: 'Jorge Martín - Gerente',
          rol: 'gerente',
          timestamp: '2025-11-11T12:00:00',
          leido: false
        }
      ],
      categoria: 'gerente'
    },
    {
      id: 'CHAT-009',
      tipo: 'informacion',
      asunto: 'Transferencia de productos',
      cliente: 'Tienda Poblenou',
      estado: 'en-curso',
      fechaCreacion: '2025-11-10T16:00:00',
      fechaUltimoMensaje: '2025-11-11T09:00:00',
      asignadoA: 'Carlos Méndez',
      mensajes: [
        {
          id: 'M15',
          contenido: 'Necesitamos 20 baguettes para mañana temprano, ¿podéis enviarnos?',
          autor: 'Tienda Poblenou',
          rol: 'colaborador',
          timestamp: '2025-11-10T16:00:00',
          leido: true
        },
        {
          id: 'M16',
          contenido: 'Sí, sin problema. Las tendremos listas antes de las 7:00h',
          autor: 'Carlos Méndez',
          rol: 'colaborador',
          avatar: colaboradorAvatar,
          timestamp: '2025-11-11T09:00:00',
          leido: true
        }
      ],
      categoria: 'otras-tiendas',
      tienda: 'Tienda Poblenou'
    },
    {
      id: 'CHAT-010',
      tipo: 'reclamacion',
      asunto: 'Revisión de procedimientos',
      cliente: 'Jorge Martín - Gerente',
      clienteAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      estado: 'en-curso',
      fechaCreacion: '2025-11-09T10:00:00',
      fechaUltimoMensaje: '2025-11-11T08:30:00',
      asignadoA: 'Carlos Méndez',
      mensajes: [
        {
          id: 'M17',
          contenido: 'Carlos, he recibido comentarios sobre los tiempos de espera. Necesitamos revisar el proceso del TPV.',
          autor: 'Jorge Martín - Gerente',
          rol: 'gerente',
          timestamp: '2025-11-09T10:00:00',
          leido: true
        },
        {
          id: 'M18',
          contenido: 'Entendido. He implementado el nuevo sistema de Estado TPV que ayudará con las aperturas y cierres. ¿Podemos reunirnos para revisarlo?',
          autor: 'Carlos Méndez',
          rol: 'colaborador',
          avatar: colaboradorAvatar,
          timestamp: '2025-11-11T08:30:00',
          leido: true
        }
      ],
      categoria: 'gerente'
    }
  ]);

  const conversacionActual = conversaciones.find(c => c.id === conversacionSeleccionada);

  const conversacionesFiltradas = conversaciones.filter(conv => {
    const matchEstado = filtroEstado === 'todas' || conv.estado === filtroEstado;
    const matchBusqueda = conv.asunto.toLowerCase().includes(busqueda.toLowerCase()) ||
                          conv.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
                          conv.id.toLowerCase().includes(busqueda.toLowerCase());
    const matchCategoria = filtroCategoria === 'todas' || conv.categoria === filtroCategoria;
    return matchEstado && matchBusqueda && matchCategoria;
  });

  const chatsPendientes = conversaciones.filter(c => c.estado === 'abierto').length;
  const chatsEnCurso = conversaciones.filter(c => c.estado === 'en-curso' && c.asignadoA === colaboradorActual).length;

  const handleEnviarMensaje = () => {
    if (!mensaje.trim() || !conversacionSeleccionada) return;

    setConversaciones(prev => prev.map(conv => {
      if (conv.id === conversacionSeleccionada) {
        return {
          ...conv,
          mensajes: [
            ...conv.mensajes,
            {
              id: `M${Date.now()}`,
              contenido: mensaje,
              autor: colaboradorActual,
              rol: 'colaborador',
              avatar: colaboradorAvatar,
              timestamp: new Date().toISOString(),
              leido: true
            }
          ],
          fechaUltimoMensaje: new Date().toISOString(),
          estado: conv.estado === 'abierto' ? 'en-curso' : conv.estado,
          asignadoA: conv.estado === 'abierto' ? colaboradorActual : conv.asignadoA
        };
      }
      return conv;
    }));

    setMensaje('');
    toast.success('Mensaje enviado al cliente');
  };

  const handleTomarChat = (chatId: string) => {
    setConversaciones(prev => prev.map(conv => {
      if (conv.id === chatId) {
        return {
          ...conv,
          estado: 'en-curso',
          asignadoA: colaboradorActual
        };
      }
      return conv;
    }));
    setConversacionSeleccionada(chatId);
    toast.success('Chat asignado a ti');
  };

  const handleCerrarChat = (chatId: string) => {
    setConversaciones(prev => prev.map(conv => {
      if (conv.id === chatId) {
        return {
          ...conv,
          estado: 'cerrado',
          mensajes: [
            ...conv.mensajes,
            {
              id: `M${Date.now()}`,
              contenido: 'El chat ha sido cerrado. Por favor, valora la atención recibida.',
              autor: 'Sistema',
              rol: 'colaborador',
              timestamp: new Date().toISOString(),
              leido: false
            }
          ]
        };
      }
      return conv;
    }));
    toast.success('Chat cerrado. Se ha solicitado valoración al cliente.');
    setConversacionSeleccionada(null);
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'pedido':
        return <Package className="w-4 h-4" />;
      case 'informacion':
        return <Info className="w-4 h-4" />;
      case 'reclamacion':
        return <AlertCircle className="w-4 h-4" />;
      case 'fallo-app':
        return <Bug className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'pedido':
        return 'Pedido';
      case 'informacion':
        return 'Información';
      case 'reclamacion':
        return 'Reclamación';
      case 'fallo-app':
        return 'Fallo de la app';
      default:
        return 'Otro';
    }
  };

  const getTipoBadgeColor = (tipo: string) => {
    switch (tipo) {
      case 'pedido':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'informacion':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'reclamacion':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'fallo-app':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'abierto':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">Pendiente</Badge>;
      case 'en-curso':
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">En curso</Badge>;
      case 'cerrado':
        return <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">Cerrado</Badge>;
      default:
        return null;
    }
  };

  // Vista de conversación individual
  if (conversacionSeleccionada && conversacionActual) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setConversacionSeleccionada(null)}
                  >
                    ← Volver
                  </Button>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={conversacionActual.clienteAvatar} />
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {conversacionActual.cliente.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {conversacionActual.cliente}
                    </h3>
                    <p className="text-sm text-gray-600">{conversacionActual.asunto}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className={getTipoBadgeColor(conversacionActual.tipo)}>
                    {getTipoIcon(conversacionActual.tipo)}
                    <span className="ml-1">{getTipoLabel(conversacionActual.tipo)}</span>
                  </Badge>
                  {getEstadoBadge(conversacionActual.estado)}
                  <span className="text-xs text-gray-500">ID: {conversacionActual.id}</span>
                </div>
              </div>

              {conversacionActual.estado !== 'cerrado' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCerrarChat(conversacionActual.id)}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Cerrar chat
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Mensajes */}
        <Card>
          <CardContent className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
            {conversacionActual.mensajes.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.rol === 'colaborador' && msg.autor === colaboradorActual ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarImage src={msg.rol === 'cliente' ? conversacionActual.clienteAvatar : msg.avatar} />
                  <AvatarFallback className={msg.rol === 'cliente' ? 'bg-blue-100 text-blue-700' : 'bg-teal-100 text-teal-700'}>
                    {msg.autor.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className={`flex-1 max-w-[80%] ${msg.rol === 'colaborador' && msg.autor === colaboradorActual ? 'text-right' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{msg.autor}</span>
                    {msg.rol !== 'cliente' && (
                      <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">
                        {msg.rol === 'gerente' ? 'Gerente' : 'Colaborador'}
                      </Badge>
                    )}
                  </div>

                  <div
                    className={`p-3 rounded-lg ${
                      msg.rol === 'colaborador' && msg.autor === colaboradorActual
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.contenido}</p>
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Input de mensaje */}
        {conversacionActual.estado !== 'cerrado' && (
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Escribe tu respuesta..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  rows={2}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleEnviarMensaje();
                    }
                  }}
                />
                <Button
                  onClick={handleEnviarMensaje}
                  className="bg-teal-600 hover:bg-teal-700 self-end"
                  disabled={!mensaje.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Vista principal
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Atención al Cliente
          </h1>
          <p className="text-gray-600 mt-1">
            Gestiona las consultas y chats con los clientes
          </p>
        </div>
        
        <Button 
          className="bg-teal-600 hover:bg-teal-700"
          onClick={() => {
            toast.success('Función de chat en desarrollo');
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Empezar Chat
        </Button>
      </div>

      {/* Filtros de búsqueda y categoría */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar por cliente, asunto o ID..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtros de categoría como botones */}
        <div className="overflow-x-auto">
          <div className="flex gap-2 pb-2">
            <Button
              onClick={() => setFiltroCategoria('todas')}
              variant={filtroCategoria === 'todas' ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${
                filtroCategoria === 'todas' 
                  ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
              }`}
            >
              Todas las categorías
            </Button>
            <Button
              onClick={() => setFiltroCategoria('clientes')}
              variant={filtroCategoria === 'clientes' ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${
                filtroCategoria === 'clientes' 
                  ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
              }`}
            >
              Clientes
            </Button>
            <Button
              onClick={() => setFiltroCategoria('otras-tiendas')}
              variant={filtroCategoria === 'otras-tiendas' ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${
                filtroCategoria === 'otras-tiendas' 
                  ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
              }`}
            >
              Otras tiendas
            </Button>
            <Button
              onClick={() => setFiltroCategoria('gerente')}
              variant={filtroCategoria === 'gerente' ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${
                filtroCategoria === 'gerente' 
                  ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
              }`}
            >
              Gerente
            </Button>
          </div>
        </div>

        {/* Filtros de estado como botones */}
        <div className="overflow-x-auto">
          <div className="flex gap-2 pb-2">
            <Button
              onClick={() => setFiltroEstado('todas')}
              variant={filtroEstado === 'todas' ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${
                filtroEstado === 'todas' 
                  ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
              }`}
            >
              Todos los chats
            </Button>
            <Button
              onClick={() => setFiltroEstado('abierto')}
              variant={filtroEstado === 'abierto' ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${
                filtroEstado === 'abierto' 
                  ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
              }`}
            >
              Pendientes
            </Button>
            <Button
              onClick={() => setFiltroEstado('en-curso')}
              variant={filtroEstado === 'en-curso' ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${
                filtroEstado === 'en-curso' 
                  ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
              }`}
            >
              En curso
            </Button>
            <Button
              onClick={() => setFiltroEstado('cerrado')}
              variant={filtroEstado === 'cerrado' ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${
                filtroEstado === 'cerrado' 
                  ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
              }`}
            >
              Cerrados
            </Button>
          </div>
        </div>
      </div>

      {/* Lista de chats */}
      <div className="space-y-3">
        {conversacionesFiltradas.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">No hay chats</h3>
              <p className="text-sm text-gray-500">
                No hay conversaciones que mostrar
              </p>
            </CardContent>
          </Card>
        ) : (
          conversacionesFiltradas.map((conv) => (
            <Card
              key={conv.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                if (conv.estado === 'abierto') {
                  handleTomarChat(conv.id);
                } else {
                  setConversacionSeleccionada(conv.id);
                }
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12 shrink-0">
                    <AvatarImage src={conv.clienteAvatar} />
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {conv.cliente.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-medium text-gray-900">{conv.cliente}</h4>
                      <Badge variant="outline" className={`text-xs ${getTipoBadgeColor(conv.tipo)}`}>
                        {getTipoIcon(conv.tipo)}
                        <span className="ml-1">{getTipoLabel(conv.tipo)}</span>
                      </Badge>
                      {getEstadoBadge(conv.estado)}
                    </div>

                    <p className="text-sm text-gray-900 mb-1">{conv.asunto}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      {conv.mensajes[conv.mensajes.length - 1]?.contenido.substring(0, 80)}
                      {conv.mensajes[conv.mensajes.length - 1]?.contenido.length > 80 ? '...' : ''}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(conv.fechaUltimoMensaje).toLocaleString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <span>ID: {conv.id}</span>
                      {conv.asignadoA && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {conv.asignadoA}
                        </span>
                      )}
                    </div>
                  </div>

                  {conv.estado === 'abierto' && (
                    <Button
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTomarChat(conv.id);
                      }}
                    >
                      Tomar chat
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}