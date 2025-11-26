import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { 
  MessageSquare,
  Send,
  Search,
  Star,
  CheckCircle2,
  Clock,
  Filter,
  Package,
  Info,
  AlertCircle,
  Bug,
  User,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Users
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
  valoracion?: number;
  mensajes: Mensaje[];
}

export function ChatGerente() {
  const [conversacionSeleccionada, setConversacionSeleccionada] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('todas');
  const [filtroColaborador, setFiltroColaborador] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState('');

  const gerenteNombre = 'Ana García';
  const gerenteAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100';

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
          contenido: '¿Cuándo estará listo mi pedido de pan y bollería?',
          autor: 'María González',
          rol: 'cliente',
          timestamp: '2025-11-10T09:00:00',
          leido: true
        },
        {
          id: 'M2',
          contenido: 'Hola María, estoy revisando tu pedido PED-002. Debería estar listo para mañana por la tarde.',
          autor: 'Carlos Méndez',
          rol: 'colaborador',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          timestamp: '2025-11-10T10:15:00',
          leido: true
        }
      ]
    },
    {
      id: 'CHAT-002',
      tipo: 'informacion',
      asunto: 'Información sobre Pan Integral',
      cliente: 'Roberto Sánchez',
      estado: 'cerrado',
      fechaCreacion: '2025-11-09T11:00:00',
      fechaUltimoMensaje: '2025-11-09T11:30:00',
      asignadoA: 'Ana García',
      valoracion: 5,
      mensajes: [
        {
          id: 'M5',
          contenido: 'Hola, quisiera saber si tienen disponibilidad de Pan Integral de masa madre',
          autor: 'Roberto Sánchez',
          rol: 'cliente',
          timestamp: '2025-11-09T11:00:00',
          leido: true
        },
        {
          id: 'M6',
          contenido: 'Sí, tenemos disponibilidad. El precio es 89,90€ por unidad. ¿Cuántos necesitas?',
          autor: 'Ana García',
          rol: 'gerente',
          avatar: gerenteAvatar,
          timestamp: '2025-11-09T11:30:00',
          leido: true
        }
      ]
    },
    {
      id: 'CHAT-003',
      tipo: 'reclamacion',
      asunto: 'Factura incorrecta FAC-2025-0847',
      cliente: 'Laura Martínez',
      estado: 'cerrado',
      fechaCreacion: '2025-11-05T16:00:00',
      fechaUltimoMensaje: '2025-11-06T10:00:00',
      asignadoA: 'Ana García',
      valoracion: 5,
      mensajes: [
        {
          id: 'M7',
          contenido: 'La factura que recibí tiene un error en el total',
          autor: 'Laura Martínez',
          rol: 'cliente',
          timestamp: '2025-11-05T16:00:00',
          leido: true
        }
      ]
    },
    {
      id: 'CHAT-004',
      tipo: 'informacion',
      asunto: 'Disponibilidad de croissants',
      cliente: 'Pedro Gómez',
      estado: 'abierto',
      fechaCreacion: '2025-11-11T08:00:00',
      fechaUltimoMensaje: '2025-11-11T08:00:00',
      mensajes: [
        {
          id: 'M10',
          contenido: 'Buenos días, necesito croissants de mantequilla para mañana',
          autor: 'Pedro Gómez',
          rol: 'cliente',
          timestamp: '2025-11-11T08:00:00',
          leido: false
        }
      ]
    },
    {
      id: 'CHAT-005',
      tipo: 'pedido',
      asunto: 'Estado de reparación',
      cliente: 'Sofía Ruiz',
      estado: 'cerrado',
      fechaCreacion: '2025-11-08T10:00:00',
      fechaUltimoMensaje: '2025-11-08T16:00:00',
      asignadoA: 'Carlos Méndez',
      valoracion: 4,
      mensajes: []
    },
    {
      id: 'CHAT-006',
      tipo: 'fallo-app',
      asunto: 'Error al procesar pago',
      cliente: 'Diego Torres',
      estado: 'cerrado',
      fechaCreacion: '2025-11-07T14:00:00',
      fechaUltimoMensaje: '2025-11-07T15:30:00',
      asignadoA: 'Ana García',
      valoracion: 3,
      mensajes: []
    }
  ]);

  // KPIs
  const totalChats = conversaciones.length;
  const chatsAbiertos = conversaciones.filter(c => c.estado === 'abierto').length;
  const chatsCerrados = conversaciones.filter(c => c.estado === 'cerrado').length;
  const chatsEnCurso = conversaciones.filter(c => c.estado === 'en-curso').length;

  const valoraciones = conversaciones.filter(c => c.valoracion).map(c => c.valoracion!);
  const valoracionPromedio = valoraciones.length > 0 
    ? (valoraciones.reduce((a, b) => a + b, 0) / valoraciones.length).toFixed(1)
    : '0';

  const chatsPorTipo = {
    pedido: conversaciones.filter(c => c.tipo === 'pedido').length,
    informacion: conversaciones.filter(c => c.tipo === 'informacion').length,
    reclamacion: conversaciones.filter(c => c.tipo === 'reclamacion').length,
    falloApp: conversaciones.filter(c => c.tipo === 'fallo-app').length,
    otro: conversaciones.filter(c => c.tipo === 'otro').length
  };

  const tiempoRespuestaPromedio = '12 min'; // Simulado
  const tasaResolucion = chatsCerrados > 0 ? ((chatsCerrados / totalChats) * 100).toFixed(1) : '0';

  const conversacionActual = conversaciones.find(c => c.id === conversacionSeleccionada);

  const conversacionesFiltradas = conversaciones.filter(conv => {
    const matchEstado = filtroEstado === 'todas' || conv.estado === filtroEstado;
    const matchColaborador = filtroColaborador === 'todos' || conv.asignadoA === filtroColaborador;
    const matchBusqueda = conv.asunto.toLowerCase().includes(busqueda.toLowerCase()) ||
                          conv.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
                          conv.id.toLowerCase().includes(busqueda.toLowerCase());
    return matchEstado && matchColaborador && matchBusqueda;
  });

  const colaboradores = Array.from(new Set(conversaciones.map(c => c.asignadoA).filter(Boolean))) as string[];

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
              autor: gerenteNombre,
              rol: 'gerente',
              avatar: gerenteAvatar,
              timestamp: new Date().toISOString(),
              leido: true
            }
          ],
          fechaUltimoMensaje: new Date().toISOString()
        };
      }
      return conv;
    }));

    setMensaje('');
    toast.success('Mensaje enviado al cliente');
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
              rol: 'gerente',
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
                  {conversacionActual.asignadoA && (
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      <User className="w-3 h-3 mr-1" />
                      {conversacionActual.asignadoA}
                    </Badge>
                  )}
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

        <Card>
          <CardContent className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
            {conversacionActual.mensajes.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.rol === 'gerente' && msg.autor === gerenteNombre ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarImage src={msg.rol === 'cliente' ? conversacionActual.clienteAvatar : msg.avatar} />
                  <AvatarFallback className={msg.rol === 'cliente' ? 'bg-blue-100 text-blue-700' : 'bg-teal-100 text-teal-700'}>
                    {msg.autor.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className={`flex-1 max-w-[80%] ${msg.rol === 'gerente' && msg.autor === gerenteNombre ? 'text-right' : ''}`}>
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
                      msg.rol === 'gerente' && msg.autor === gerenteNombre
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

  // Vista principal con KPIs
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Gestión de Chats
          </h1>
          <p className="text-gray-600 mt-1">
            Panel de control de atención al cliente
          </p>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Chats</p>
            <p className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {totalChats}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-500">Abiertos: {chatsAbiertos}</span>
              <span className="text-xs text-gray-500">En curso: {chatsEnCurso}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Chats Cerrados</p>
            <p className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {chatsCerrados}
            </p>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span>Tasa resolución: {tasaResolucion}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Valoración Promedio</p>
            <p className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {valoracionPromedio} ⭐
            </p>
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.round(parseFloat(valoracionPromedio))
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Tiempo Respuesta</p>
            <p className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {tiempoRespuestaPromedio}
            </p>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <TrendingDown className="w-3 h-3" />
              <span>-15% vs. mes anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPIs por Tipo */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
            Distribución por Tipo de Consulta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Pedidos</span>
                </div>
                <span className="text-sm text-gray-600">{chatsPorTipo.pedido}</span>
              </div>
              <Progress value={(chatsPorTipo.pedido / totalChats) * 100} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Información</span>
                </div>
                <span className="text-sm text-gray-600">{chatsPorTipo.informacion}</span>
              </div>
              <Progress value={(chatsPorTipo.informacion / totalChats) * 100} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium">Reclamaciones</span>
                </div>
                <span className="text-sm text-gray-600">{chatsPorTipo.reclamacion}</span>
              </div>
              <Progress value={(chatsPorTipo.reclamacion / totalChats) * 100} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Bug className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium">Fallos de la app</span>
                </div>
                <span className="text-sm text-gray-600">{chatsPorTipo.falloApp}</span>
              </div>
              <Progress value={(chatsPorTipo.falloApp / totalChats) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar por cliente, asunto o ID..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filtroEstado} onValueChange={setFiltroEstado}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todos los estados</SelectItem>
            <SelectItem value="abierto">Pendientes</SelectItem>
            <SelectItem value="en-curso">En curso</SelectItem>
            <SelectItem value="cerrado">Cerrados</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filtroColaborador} onValueChange={setFiltroColaborador}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Users className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los colaboradores</SelectItem>
            {colaboradores.map(colab => (
              <SelectItem key={colab} value={colab}>{colab}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
                No hay conversaciones que mostrar con los filtros aplicados
              </p>
            </CardContent>
          </Card>
        ) : (
          conversacionesFiltradas.map((conv) => (
            <Card
              key={conv.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setConversacionSeleccionada(conv.id)}
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

                    <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
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
                      {conv.valoracion && (
                        <span className="flex items-center gap-1 text-yellow-600">
                          <Star className="w-3 h-3 fill-current" />
                          {conv.valoracion}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}