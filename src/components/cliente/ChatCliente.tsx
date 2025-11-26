import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
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
  Star,
  X,
  CheckCircle2,
  Clock,
  Filter,
  Package,
  Info,
  AlertCircle,
  Bug,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

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
  estado: 'abierto' | 'en-curso' | 'cerrado';
  fechaCreacion: string;
  fechaUltimoMensaje: string;
  mensajesNoLeidos: number;
  valoracion?: number;
  mensajes: Mensaje[];
}

interface FAQ {
  id: string;
  categoria: string;
  pregunta: string;
  respuesta: string;
}

export function ChatCliente() {
  const [conversacionSeleccionada, setConversacionSeleccionada] = useState<string | null>(null);
  const [tipoConsulta, setTipoConsulta] = useState<'pedido' | 'informacion' | 'reclamacion' | 'fallo-app' | 'otro'>('informacion');
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState<string>('general'); // Nueva variable de estado
  const [asuntoNuevo, setAsuntoNuevo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState('');
  const [busquedaFAQ, setBusquedaFAQ] = useState('');
  const [dialogValoracion, setDialogValoracion] = useState(false);
  const [valoracionSeleccionada, setValoracionSeleccionada] = useState(0);
  const [conversacionACerrar, setConversacionACerrar] = useState<string | null>(null);
  const [faqAbierta, setFaqAbierta] = useState<string | null>(null);

  // Listado de tiendas (del componente QuienesSomos)
  const tiendas = [
    { nombre: 'Can Farines Centro', ciudad: 'Badalona' },
    { nombre: 'Can Farines Llefià', ciudad: 'Badalona' },
    { nombre: 'Can Farines Montigalà', ciudad: 'Badalona' },
    { nombre: 'Can Farines Casagemes', ciudad: 'Badalona' },
    { nombre: 'Can Farines La Mina', ciudad: 'Sant Adrià del Besòs' },
    { nombre: 'Can Farines Sant Adrià Centro', ciudad: 'Sant Adrià del Besòs' },
    { nombre: 'Can Farines Besòs', ciudad: 'Sant Adrià del Besòs' },
    { nombre: 'Can Farines Poblenou', ciudad: 'Barcelona' },
    { nombre: 'Can Farines Sagrada Família', ciudad: 'Barcelona' },
    { nombre: 'Can Farines Gràcia', ciudad: 'Barcelona' }
  ];

  const [conversaciones, setConversaciones] = useState<Conversacion[]>([
    {
      id: 'CHAT-001',
      tipo: 'pedido',
      asunto: 'Consulta sobre pedido PED-002',
      estado: 'en-curso',
      fechaCreacion: '2025-11-10T09:00:00',
      fechaUltimoMensaje: '2025-11-10T14:30:00',
      mensajesNoLeidos: 2,
      mensajes: [
        {
          id: 'M1',
          contenido: '¿Cuándo estará lista mi hamburguesa BBQ Bacon con patatas?',
          autor: 'Cliente',
          rol: 'cliente',
          timestamp: '2025-11-10T09:00:00',
          leido: true
        },
        {
          id: 'M2',
          contenido: 'Hola, estoy revisando tu pedido PED-002. Estamos preparando tu hamburguesa y debería estar lista en 10 minutos.',
          autor: 'Carlos Méndez',
          rol: 'colaborador',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          timestamp: '2025-11-10T10:15:00',
          leido: true
        },
        {
          id: 'M3',
          contenido: 'Perfecto, ¿puedo pasar a recogerlo en 15 minutos?',
          autor: 'Cliente',
          rol: 'cliente',
          timestamp: '2025-11-10T10:20:00',
          leido: true
        },
        {
          id: 'M4',
          contenido: 'Sí, sin problema. Te avisaré cuando esté todo preparado y empaquetado.',
          autor: 'Carlos Méndez',
          rol: 'colaborador',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          timestamp: '2025-11-10T14:30:00',
          leido: false
        }
      ]
    },
    {
      id: 'CHAT-002',
      tipo: 'informacion',
      asunto: 'Información sobre Pizza Carbonara sin bacon',
      estado: 'abierto',
      fechaCreacion: '2025-11-09T11:00:00',
      fechaUltimoMensaje: '2025-11-09T11:30:00',
      mensajesNoLeidos: 0,
      mensajes: [
        {
          id: 'M5',
          contenido: 'Hola, quisiera saber si pueden hacer la Pizza Carbonara sin bacon, tengo alergia',
          autor: 'Cliente',
          rol: 'cliente',
          timestamp: '2025-11-09T11:00:00',
          leido: true
        },
        {
          id: 'M6',
          contenido: 'Sí, sin problema. Podemos prepararla sin bacon y añadir más champiñones sin coste adicional. ¿Te parece bien?',
          autor: 'Ana García',
          rol: 'gerente',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
          timestamp: '2025-11-09T11:30:00',
          leido: true
        }
      ]
    },
    {
      id: 'CHAT-003',
      tipo: 'reclamacion',
      asunto: 'Pedido incompleto PED-095',
      estado: 'cerrado',
      fechaCreacion: '2025-11-05T16:00:00',
      fechaUltimoMensaje: '2025-11-06T10:00:00',
      mensajesNoLeidos: 0,
      valoracion: 5,
      mensajes: [
        {
          id: 'M7',
          contenido: 'Mi pedido llegó pero faltaba la Coca-Cola que pedí. Solo recibí las pizzas.',
          autor: 'Cliente',
          rol: 'cliente',
          timestamp: '2025-11-05T16:00:00',
          leido: true
        },
        {
          id: 'M8',
          contenido: 'Disculpa las molestias. Voy a revisar tu pedido de inmediato.',
          autor: 'Ana García',
          rol: 'gerente',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
          timestamp: '2025-11-05T17:00:00',
          leido: true
        },
        {
          id: 'M9',
          contenido: 'Tienes razón, hubo un error en la preparación. Te envío ahora mismo la Coca-Cola junto con un postre de cortesía como disculpa. Llegarán en 15 minutos.',
          autor: 'Ana García',
          rol: 'gerente',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
          timestamp: '2025-11-06T10:00:00',
          leido: true
        }
      ]
    }
  ]);

  const faqs: FAQ[] = [
    {
      id: 'FAQ001',
      categoria: 'Pedidos',
      pregunta: '¿Cómo puedo rastrear mi pedido?',
      respuesta: 'Puedes rastrear tu pedido en la sección "Pedidos" del menú principal. Allí encontrarás el estado actualizado en tiempo real: En preparación, Listo para recoger, o En camino. También recibirás notificaciones automáticas cuando cambie el estado de tu pedido.'
    },
    {
      id: 'FAQ002',
      categoria: 'Pedidos',
      pregunta: '¿Puedo cancelar un pedido?',
      respuesta: 'Sí, puedes cancelar un pedido siempre que no haya entrado en fase de preparación (primeros 5 minutos). Para cancelarlo, ve a "Pedidos", selecciona el pedido y pulsa "Cancelar pedido". Si ya está en preparación, contacta con nosotros inmediatamente.'
    },
    {
      id: 'FAQ003',
      categoria: 'Pedidos',
      pregunta: '¿Cuánto tarda en estar listo mi pedido?',
      respuesta: 'El tiempo de preparación varía según el pedido: Hamburguesas 10-15 minutos, Pizzas 15-20 minutos. Siempre recibirás una estimación al hacer el pedido y te notificaremos cuando esté listo para recoger o salga para entrega.'
    },
    {
      id: 'FAQ004',
      categoria: 'Pagos',
      pregunta: '¿Cuáles son las formas de pago?',
      respuesta: 'Aceptamos múltiples formas de pago: tarjetas de crédito/débito (Visa, Mastercard), PayPal, Bizum, y pago en efectivo al recoger o recibir el pedido. El pago online es más rápido y tiene prioridad en preparación.'
    },
    {
      id: 'FAQ005',
      categoria: 'Pagos',
      pregunta: '¿Cuándo se cobra mi pedido?',
      respuesta: 'Si pagas con tarjeta online, el cargo se realiza al confirmar el pedido. Si eliges pago al recoger o en entrega, pagarás cuando recibas tu pedido. Recomendamos pago online para agilizar el proceso.'
    },
    {
      id: 'FAQ006',
      categoria: 'Pagos',
      pregunta: '¿Puedo obtener un ticket o factura?',
      respuesta: 'Sí, todas las compras incluyen ticket. Puedes descargar el comprobante desde "Pedidos" > "Ver detalles" > "Descargar ticket". Si necesitas factura con datos fiscales, solicítala en el momento del pedido o contacta con nosotros.'
    },
    {
      id: 'FAQ007',
      categoria: 'Entregas',
      pregunta: '¿Hacen entregas a domicilio?',
      respuesta: 'Sí, ofrecemos servicio de entrega a domicilio en un radio de 5km. El coste de envío es de €2.50 y gratis en pedidos superiores a €20. El tiempo estimado de entrega es de 30-45 minutos desde la confirmación del pedido.'
    },
    {
      id: 'FAQ008',
      categoria: 'Alimentación',
      pregunta: '¿Tienen opciones vegetarianas y veganas?',
      respuesta: 'Sí, contamos con varias opciones: Hamburguesa Vegetal (100% vegana), Pizza Vegetal, y diversos complementos sin productos de origen animal. Puedes filtrar por estas opciones en el catálogo o preguntar al hacer tu pedido.'
    },
    {
      id: 'FAQ009',
      categoria: 'Alimentación',
      pregunta: '¿Informan sobre alérgenos?',
      respuesta: 'Sí, todos nuestros productos tienen información de alérgenos disponible. Los principales alérgenos son: gluten, lácteos, huevo, frutos secos y sésamo. Consulta en cada producto o contáctanos si tienes alergias específicas.'
    }
  ];

  const conversacionActual = conversaciones.find(c => c.id === conversacionSeleccionada);

  const conversacionesFiltradas = conversaciones.filter(conv => {
    const matchTipo = filtroTipo === 'todas' || conv.tipo === filtroTipo;
    const matchBusqueda = conv.asunto.toLowerCase().includes(busqueda.toLowerCase()) ||
                          conv.id.toLowerCase().includes(busqueda.toLowerCase());
    return matchTipo && matchBusqueda;
  });

  const faqsFiltradas = faqs.filter(faq => {
    const searchLower = busquedaFAQ.toLowerCase();
    return faq.pregunta.toLowerCase().includes(searchLower) ||
           faq.respuesta.toLowerCase().includes(searchLower) ||
           faq.categoria.toLowerCase().includes(searchLower);
  });

  const categoriasFAQ = Array.from(new Set(faqs.map(f => f.categoria)));

  const handleCrearNuevaConsulta = () => {
    if (!asuntoNuevo.trim() || !mensaje.trim()) {
      toast.error('Completa el asunto y el mensaje');
      return;
    }

    const nuevaConversacion: Conversacion = {
      id: `CHAT-${String(conversaciones.length + 1).padStart(3, '0')}`,
      tipo: tipoConsulta,
      asunto: asuntoNuevo,
      estado: 'abierto',
      fechaCreacion: new Date().toISOString(),
      fechaUltimoMensaje: new Date().toISOString(),
      mensajesNoLeidos: 0,
      mensajes: [
        {
          id: `M${Date.now()}`,
          contenido: mensaje,
          autor: 'Cliente',
          rol: 'cliente',
          timestamp: new Date().toISOString(),
          leido: true
        }
      ]
    };

    setConversaciones([nuevaConversacion, ...conversaciones]);
    setAsuntoNuevo('');
    setMensaje('');
    setTipoConsulta('informacion');
    toast.success('Consulta creada. Un colaborador te responderá pronto.');
  };

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
              autor: 'Cliente',
              rol: 'cliente',
              timestamp: new Date().toISOString(),
              leido: true
            }
          ],
          fechaUltimoMensaje: new Date().toISOString(),
          estado: conv.estado === 'abierto' ? 'en-curso' : conv.estado
        };
      }
      return conv;
    }));

    setMensaje('');
    toast.success('Mensaje enviado');
  };

  const handleCerrarChat = (chatId: string) => {
    setConversacionACerrar(chatId);
    setDialogValoracion(true);
  };

  const handleEnviarValoracion = () => {
    if (valoracionSeleccionada === 0) {
      toast.error('Por favor selecciona una valoración');
      return;
    }

    setConversaciones(prev => prev.map(conv => {
      if (conv.id === conversacionACerrar) {
        return {
          ...conv,
          estado: 'cerrado',
          valoracion: valoracionSeleccionada,
          mensajes: [
            ...conv.mensajes,
            {
              id: `M${Date.now()}`,
              contenido: `Chat cerrado. Valoración: ${valoracionSeleccionada} ⭐`,
              autor: 'Sistema',
              rol: 'colaborador',
              timestamp: new Date().toISOString(),
              leido: true
            }
          ]
        };
      }
      return conv;
    }));

    toast.success('¡Gracias por tu valoración!');
    setDialogValoracion(false);
    setValoracionSeleccionada(0);
    setConversacionACerrar(null);
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
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">Abierto</Badge>;
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
        {/* Header de conversación */}
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
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {conversacionActual.asunto}
                  </h2>
                  <Badge variant="outline" className={getTipoBadgeColor(conversacionActual.tipo)}>
                    {getTipoIcon(conversacionActual.tipo)}
                    <span className="ml-1">{getTipoLabel(conversacionActual.tipo)}</span>
                  </Badge>
                  {getEstadoBadge(conversacionActual.estado)}
                </div>
                <p className="text-sm text-gray-500 mt-1">ID: {conversacionActual.id}</p>
              </div>

              {conversacionActual.estado !== 'cerrado' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCerrarChat(conversacionActual.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cerrar chat
                </Button>
              )}
            </div>

            {conversacionActual.valoracion && (
              <div className="flex items-center gap-2 p-2 bg-green-50 rounded border border-green-200">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">
                  Valoración: {conversacionActual.valoracion} ⭐
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mensajes */}
        <Card>
          <CardContent className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
            {conversacionActual.mensajes.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.rol === 'cliente' ? 'flex-row-reverse' : ''}`}
              >
                {msg.rol !== 'cliente' && (
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarImage src={msg.avatar} />
                    <AvatarFallback className="bg-teal-100 text-teal-700 text-xs">
                      {msg.autor.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={`flex-1 max-w-[80%] ${msg.rol === 'cliente' ? 'text-right' : ''}`}>
                  {msg.rol !== 'cliente' && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{msg.autor}</span>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        {msg.rol === 'gerente' ? 'Gerente' : 'Colaborador'}
                      </Badge>
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-lg ${
                      msg.rol === 'cliente'
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

        {/* Input de mensaje (solo si no está cerrado) */}
        {conversacionActual.estado !== 'cerrado' && (
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Escribe tu mensaje..."
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

  // Vista principal con tabs
  return (
    <Tabs defaultValue="chat" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="chat">
          <MessageSquare className="w-4 h-4 mr-2" />
          Chat
        </TabsTrigger>
        <TabsTrigger value="faqs">
          <HelpCircle className="w-4 h-4 mr-2" />
          FAQs
        </TabsTrigger>
      </TabsList>

      {/* Tab Chat */}
      <TabsContent value="chat" className="space-y-6 mt-6">
        {/* Nuevo mensaje arriba */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              Nueva Consulta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Tipo de consulta
              </label>
              <Select value={tipoConsulta} onValueChange={(v: any) => setTipoConsulta(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pedido">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Sobre un pedido
                    </div>
                  </SelectItem>
                  <SelectItem value="informacion">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Información general
                    </div>
                  </SelectItem>
                  <SelectItem value="reclamacion">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Reclamación
                    </div>
                  </SelectItem>
                  <SelectItem value="fallo-app">
                    <div className="flex items-center gap-2">
                      <Bug className="w-4 h-4" />
                      Fallo de la app
                    </div>
                  </SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Tienda
              </label>
              <Select value={tiendaSeleccionada} onValueChange={setTiendaSeleccionada}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  {tiendas.map(tienda => (
                    <SelectItem key={tienda.nombre} value={tienda.nombre}>
                      {tienda.nombre} ({tienda.ciudad})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Asunto
              </label>
              <Input
                placeholder="Ej: Consulta sobre pedido PED-002"
                value={asuntoNuevo}
                onChange={(e) => setAsuntoNuevo(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Mensaje
              </label>
              <Textarea
                placeholder="Describe tu consulta..."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                rows={3}
              />
            </div>

            <Button
              onClick={handleCrearNuevaConsulta}
              className="w-full bg-teal-600 hover:bg-teal-700"
              disabled={!asuntoNuevo.trim() || !mensaje.trim()}
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar Consulta
            </Button>
          </CardContent>
        </Card>

        <Separator />

        {/* Filtros y búsqueda */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar conversaciones..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filtroTipo} onValueChange={setFiltroTipo}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas las consultas</SelectItem>
              <SelectItem value="pedido">Pedidos</SelectItem>
              <SelectItem value="informacion">Información</SelectItem>
              <SelectItem value="reclamacion">Reclamaciones</SelectItem>
              <SelectItem value="fallo-app">Fallos de la app</SelectItem>
              <SelectItem value="otro">Otros</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lista de conversaciones */}
        <div className="space-y-3">
          {conversacionesFiltradas.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">No hay conversaciones</h3>
                <p className="text-sm text-gray-500">
                  Crea una nueva consulta para comenzar
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
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge variant="outline" className={`text-xs ${getTipoBadgeColor(conv.tipo)}`}>
                          {getTipoIcon(conv.tipo)}
                          <span className="ml-1">{getTipoLabel(conv.tipo)}</span>
                        </Badge>
                        {getEstadoBadge(conv.estado)}
                        {conv.mensajesNoLeidos > 0 && (
                          <Badge className="bg-red-600 text-white text-xs">
                            {conv.mensajesNoLeidos} nuevo{conv.mensajesNoLeidos > 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{conv.asunto}</h4>
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
                      </div>
                    </div>

                    {conv.valoracion && (
                      <div className="flex items-center gap-1 text-yellow-500 ml-2">
                        {[...Array(conv.valoracion)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </TabsContent>

      {/* Tab FAQs */}
      <TabsContent value="faqs" className="space-y-6 mt-6">
        {/* Búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar en preguntas frecuentes..."
            value={busquedaFAQ}
            onChange={(e) => setBusquedaFAQ(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* FAQs por categoría */}
        {categoriasFAQ.map(categoria => {
          const faqsCategoria = faqsFiltradas.filter(f => f.categoria === categoria);
          if (faqsCategoria.length === 0) return null;

          return (
            <div key={categoria}>
              <h3 className="text-lg font-medium text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {categoria}
              </h3>
              <div className="space-y-2">
                {faqsCategoria.map(faq => (
                  <Collapsible
                    key={faq.id}
                    open={faqAbierta === faq.id}
                    onOpenChange={(open) => setFaqAbierta(open ? faq.id : null)}
                  >
                    <Card className="hover:shadow-sm transition-shadow">
                      <CollapsibleTrigger className="w-full">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-start gap-3 flex-1 text-left">
                              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                                <HelpCircle className="w-4 h-4 text-teal-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{faq.pregunta}</h4>
                              </div>
                            </div>
                            {faqAbierta === faq.id ? (
                              <ChevronUp className="w-5 h-5 text-gray-400 shrink-0 ml-2" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 ml-2" />
                            )}
                          </div>
                        </CardContent>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="px-4 pb-4 pt-0">
                          <div className="pl-11">
                            <p className="text-sm text-gray-600">{faq.respuesta}</p>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </div>
            </div>
          );
        })}

        {faqsFiltradas.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">No se encontraron resultados</h3>
              <p className="text-sm text-gray-500 mb-4">
                Intenta con otros términos de búsqueda
              </p>
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        <Card className="bg-teal-50 border-teal-200">
          <CardContent className="p-5 text-center">
            <p className="text-sm text-gray-700 mb-3">
              ¿No encuentras la respuesta que buscas?
            </p>
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => {
              // Cambiar a la pestaña de chat
              const tabsList = document.querySelector('[role="tablist"]');
              const chatTab = tabsList?.querySelector('[value="chat"]') as HTMLElement;
              chatTab?.click();
            }}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Contactar con Soporte
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Dialog de valoración */}
      <Dialog open={dialogValoracion} onOpenChange={setDialogValoracion}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              Valora la atención recibida
            </DialogTitle>
            <DialogDescription>
              ¿Cómo calificarías la atención que recibiste?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setValoracionSeleccionada(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= valoracionSeleccionada
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            {valoracionSeleccionada > 0 && (
              <p className="text-center text-sm text-gray-600">
                {valoracionSeleccionada === 5 && '¡Excelente! Nos alegra haberte ayudado'}
                {valoracionSeleccionada === 4 && 'Muy bien, gracias por tu feedback'}
                {valoracionSeleccionada === 3 && 'Gracias, trabajaremos para mejorar'}
                {valoracionSeleccionada === 2 && 'Lamentamos no haber cumplido tus expectativas'}
                {valoracionSeleccionada === 1 && 'Sentimos mucho tu experiencia, trabajaremos para mejorar'}
              </p>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setDialogValoracion(false);
                setValoracionSeleccionada(0);
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleEnviarValoracion}
              className="bg-teal-600 hover:bg-teal-700"
              disabled={valoracionSeleccionada === 0}
            >
              Enviar valoración
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
}