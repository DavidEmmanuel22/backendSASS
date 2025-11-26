import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { 
  Users, 
  TrendingDown, 
  FileText, 
  DollarSign, 
  Search, 
  Plus,
  ShoppingCart,
  MapPin,
  Eye,
  TrendingUp,
  Star,
  Gift,
  CheckCircle,
  Package,
  Truck,
  Coffee
} from 'lucide-react';
import { toast } from 'sonner';

interface Cliente {
  id: string;
  nombre: string;
  foto: string;
  codigoPostal: string;
  numeroPedidos: number;
  ticketMedio: number;
  ticketMedioAnterior: number;
  valoracion: number;
  fechaRegistro: string;
  tipo: 'Premium' | 'Regular' | 'Nuevo';
}

interface Factura {
  id: string;
  clienteId: string;
  clienteNombre: string;
  fecha: string;
  total: number;
  productos: string[];
  verifactu: boolean;
}

interface Envio {
  id: string;
  clienteId: string;
  clienteNombre: string;
  fecha: string;
  estado: 'Solicitado' | 'Preparado' | 'Enviado' | 'Recibido';
  direccion: string;
  productos: string;
}

interface Valoracion {
  id: string;
  clienteId: string;
  clienteNombre: string;
  productoId: string;
  productoNombre: string;
  puntuacion: number;
  comentario: string;
  fecha: string;
}

export function ClientesGerente() {
  const [activeTab, setActiveTab] = useState('clientes');
  const [busqueda, setBusqueda] = useState('');
  const [modalAñadirPromocion, setModalAñadirPromocion] = useState(false);
  const [nuevaPromocion, setNuevaPromocion] = useState({
    titulo: '',
    descripcion: '',
    descuento: '',
    tipo: '',
    precioOriginal: '',
    precioFinal: '',
    validoHasta: ''
  });

  const handleAñadirPromocion = () => {
    if (!nuevaPromocion.titulo || !nuevaPromocion.descripcion || !nuevaPromocion.descuento) {
      toast.error('Por favor, completa todos los campos obligatorios');
      return;
    }
    
    toast.success(`Promoción "${nuevaPromocion.titulo}" creada correctamente`);
    setModalAñadirPromocion(false);
    setNuevaPromocion({ 
      titulo: '', 
      descripcion: '', 
      descuento: '', 
      tipo: '', 
      precioOriginal: '', 
      precioFinal: '', 
      validoHasta: '' 
    });
  };

  const clientes: Cliente[] = [
    {
      id: 'CLI-0015',
      nombre: 'Laura Martínez',
      foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
      codigoPostal: '28001',
      numeroPedidos: 2,
      ticketMedio: 28.50,
      ticketMedioAnterior: 25.00,
      valoracion: 5,
      fechaRegistro: '2025-11-13T18:30:00',
      tipo: 'Nuevo'
    },
    {
      id: 'CLI-0014',
      nombre: 'Carlos Hernández',
      foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      codigoPostal: '28015',
      numeroPedidos: 5,
      ticketMedio: 32.80,
      ticketMedioAnterior: 35.20,
      valoracion: 4,
      fechaRegistro: '2025-11-12T14:20:00',
      tipo: 'Regular'
    },
    {
      id: 'CLI-0013',
      nombre: 'Ana García',
      foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
      codigoPostal: '28008',
      numeroPedidos: 24,
      ticketMedio: 45.90,
      ticketMedioAnterior: 42.30,
      valoracion: 5,
      fechaRegistro: '2025-11-10T09:15:00',
      tipo: 'Premium'
    },
    {
      id: 'CLI-0012',
      nombre: 'Roberto Díaz',
      foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
      codigoPostal: '28020',
      numeroPedidos: 8,
      ticketMedio: 29.40,
      ticketMedioAnterior: 31.50,
      valoracion: 3,
      fechaRegistro: '2025-11-09T16:45:00',
      tipo: 'Regular'
    },
    {
      id: 'CLI-0011',
      nombre: 'María López',
      foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      codigoPostal: '28003',
      numeroPedidos: 18,
      ticketMedio: 38.60,
      ticketMedioAnterior: 36.80,
      valoracion: 5,
      fechaRegistro: '2025-11-08T11:30:00',
      tipo: 'Premium'
    },
    {
      id: 'CLI-0010',
      nombre: 'Javier Torres',
      foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Javier',
      codigoPostal: '28012',
      numeroPedidos: 12,
      ticketMedio: 34.20,
      ticketMedioAnterior: 34.20,
      valoracion: 4,
      fechaRegistro: '2025-11-07T10:00:00',
      tipo: 'Regular'
    },
  ];

  const facturas: Factura[] = [
    {
      id: 'COM-001',
      clienteId: 'CLI-0013',
      clienteNombre: 'Ana García',
      fecha: '2025-11-15T10:30:00',
      total: 45.90,
      productos: ['Pan de Pueblo 1kg', 'Baguette Tradicional 250g'],
      verifactu: true
    },
    {
      id: 'COM-002',
      clienteId: 'CLI-0015',
      clienteNombre: 'Laura Martínez',
      fecha: '2025-11-14T15:20:00',
      total: 28.50,
      productos: ['Croissants Mantequilla 6u', 'Ensaimadas 4u'],
      verifactu: true
    },
    {
      id: 'COM-003',
      clienteId: 'CLI-0011',
      clienteNombre: 'María López',
      fecha: '2025-11-13T09:15:00',
      total: 38.60,
      productos: ['Pan Integral 1kg', 'Magdalenas 12u'],
      verifactu: true
    },
    {
      id: 'COM-004',
      clienteId: 'CLI-0014',
      clienteNombre: 'Carlos Hernández',
      fecha: '2025-11-12T14:45:00',
      total: 32.80,
      productos: ['Napolitanas Chocolate 6u', 'Palmeras 8u'],
      verifactu: true
    },
  ];

  const envios: Envio[] = [
    {
      id: 'ENV-001',
      clienteId: 'CLI-0013',
      clienteNombre: 'Ana García',
      fecha: '2025-11-15T10:30:00',
      estado: 'Recibido',
      direccion: 'Calle Mayor 45, 28008 Madrid',
      productos: 'Pan de Pueblo 1kg, Baguette Tradicional 250g'
    },
    {
      id: 'ENV-002',
      clienteId: 'CLI-0015',
      clienteNombre: 'Laura Martínez',
      fecha: '2025-11-14T15:20:00',
      estado: 'Enviado',
      direccion: 'Av. de la Castellana 120, 28001 Madrid',
      productos: 'Croissants Mantequilla 6u, Ensaimadas 4u'
    },
    {
      id: 'ENV-003',
      clienteId: 'CLI-0011',
      clienteNombre: 'María López',
      fecha: '2025-11-13T09:15:00',
      estado: 'Preparado',
      direccion: 'Plaza España 8, 28003 Madrid',
      productos: 'Pan Integral 1kg, Magdalenas 12u'
    },
    {
      id: 'ENV-004',
      clienteId: 'CLI-0014',
      clienteNombre: 'Carlos Hernández',
      fecha: '2025-11-12T14:45:00',
      estado: 'Solicitado',
      direccion: 'Calle Alcalá 200, 28015 Madrid',
      productos: 'Napolitanas Chocolate 6u, Palmeras 8u'
    },
  ];

  const valoraciones: Valoracion[] = [
    {
      id: 'VAL-001',
      clienteId: 'CLI-0013',
      clienteNombre: 'Ana García',
      productoId: 'PROD-001',
      productoNombre: 'Pan de Pueblo Artesanal',
      puntuacion: 5,
      comentario: 'Excelente pan, corteza crujiente y miga esponjosa. Perfecto para tostadas.',
      fecha: '2025-11-15T11:00:00'
    },
    {
      id: 'VAL-002',
      clienteId: 'CLI-0015',
      clienteNombre: 'Laura Martínez',
      productoId: 'PROD-009',
      productoNombre: 'Croissants Mantequilla',
      puntuacion: 5,
      comentario: 'Mis favoritos para el desayuno. Crujientes y con mucha mantequilla.',
      fecha: '2025-11-14T16:00:00'
    },
    {
      id: 'VAL-003',
      clienteId: 'CLI-0011',
      clienteNombre: 'María López',
      productoId: 'PROD-002',
      productoNombre: 'Pan Integral Masa Madre',
      puntuacion: 5,
      comentario: 'Increíble sabor y textura. Perfecto para una dieta saludable.',
      fecha: '2025-11-13T10:30:00'
    },
    {
      id: 'VAL-004',
      clienteId: 'CLI-0014',
      clienteNombre: 'Carlos Hernández',
      productoId: 'PROD-005',
      productoNombre: 'Napolitanas de Chocolate',
      puntuacion: 4,
      comentario: 'Muy buenas, aunque me gustaría más chocolate. El hojaldre es excelente.',
      fecha: '2025-11-12T15:30:00'
    },
    {
      id: 'VAL-005',
      clienteId: 'CLI-0010',
      clienteNombre: 'Javier Torres',
      productoId: 'PROD-003',
      productoNombre: 'Ensaimadas Mallorquinas',
      puntuacion: 5,
      comentario: 'Espectacular. Suaves, esponjosas y con el punto justo de azúcar.',
      fecha: '2025-11-11T09:00:00'
    },
  ];

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'Premium':
        return <Badge className="bg-purple-600 text-white">Premium</Badge>;
      case 'Regular':
        return <Badge variant="outline" className="border-teal-500 text-teal-700">Regular</Badge>;
      case 'Nuevo':
        return <Badge className="bg-blue-500 text-white">Nuevo</Badge>;
      default:
        return <Badge variant="outline">Regular</Badge>;
    }
  };

  const getEstadoEnvioBadge = (estado: string) => {
    switch (estado) {
      case 'Solicitado':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">Solicitado</Badge>;
      case 'Preparado':
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Preparado</Badge>;
      case 'Enviado':
        return <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">Enviado</Badge>;
      case 'Recibido':
        return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Recibido</Badge>;
      default:
        return null;
    }
  };

  const formatFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderValoracion = (valoracion: number) => {
    return (
      <div className="flex items-center justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < valoracion
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getTicketMedioIndicador = (ticketMedio: number, ticketMedioAnterior: number) => {
    if (ticketMedio > ticketMedioAnterior) {
      return (
        <div className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="font-semibold text-teal-600">
            €{ticketMedio.toFixed(2)}
          </span>
        </div>
      );
    } else if (ticketMedio < ticketMedioAnterior) {
      return (
        <div className="flex items-center gap-1">
          <TrendingDown className="w-4 h-4 text-red-600" />
          <span className="font-semibold text-gray-600">
            €{ticketMedio.toFixed(2)}
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1">
          <span className="font-semibold text-gray-600">
            €{ticketMedio.toFixed(2)}
          </span>
        </div>
      );
    }
  };

  // Calcular estadísticas
  const totalClientes = clientes.length;
  const clientesNuevos = clientes.filter(c => c.tipo === 'Nuevo').length;
  const totalPedidos = clientes.reduce((acc, c) => acc + c.numeroPedidos, 0);
  const ticketMedioGlobal = clientes.reduce((acc, c) => acc + c.ticketMedio, 0) / clientes.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Gestión de Clientes
          </h2>
          <p className="text-gray-600 text-sm">
            Base de datos completa de clientes y facturación
          </p>
        </div>
      </div>

      {/* Tabs con Filtros */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="facturacion">Facturación</TabsTrigger>
          <TabsTrigger value="envios">Envíos</TabsTrigger>
          <TabsTrigger value="valoraciones">Valoraciones</TabsTrigger>
          <TabsTrigger value="promociones">Promociones</TabsTrigger>
        </TabsList>

        {/* Búsqueda */}
        <div className="relative mt-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Buscar clientes por nombre, ID o código postal..." 
            className="pl-10"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {/* TAB: Clientes */}
        <TabsContent value="clientes" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Listado de Clientes
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Ordenados del más reciente al más antiguo • {clientes.length} clientes totales
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Gift className="w-4 h-4 mr-2" />
                    Promoción
                  </Button>
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Cliente
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Cliente</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Código Postal</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Nº Pedidos</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Ticket Medio</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Valoración</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Fecha Registro</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Tipo</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientes.map((cliente) => (
                      <tr 
                        key={cliente.id} 
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={cliente.foto} alt={cliente.nombre} />
                                <AvatarFallback>
                                  {cliente.nombre.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <button className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center shadow-sm transition-colors">
                                <Eye className="w-3 h-3 text-white" />
                              </button>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{cliente.nombre}</p>
                              <p className="text-xs text-gray-500">{cliente.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1 text-gray-700">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-sm">{cliente.codigoPostal}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <ShoppingCart className="w-3 h-3 text-gray-400" />
                            <span className="font-medium text-gray-900">{cliente.numeroPedidos}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {getTicketMedioIndicador(cliente.ticketMedio, cliente.ticketMedioAnterior)}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {renderValoracion(cliente.valoracion)}
                        </td>
                        <td className="py-4 px-4 text-center text-sm text-gray-600">
                          {formatFecha(cliente.fechaRegistro)}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {getTipoBadge(cliente.tipo)}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Button size="sm" variant="ghost" className="text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                            Ver Detalles
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: Facturación */}
        <TabsContent value="facturacion" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Facturas Emitidas
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Todas las facturas verificadas con Verifactu • {facturas.length} facturas totales
                  </p>
                </div>
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Nueva Factura
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Factura ID</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Cliente</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Productos</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Fecha</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Total</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Estado</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facturas.map((factura) => (
                      <tr 
                        key={factura.id} 
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900">{factura.id}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{factura.clienteNombre}</p>
                            <p className="text-xs text-gray-500">{factura.clienteId}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {factura.productos.map((producto, idx) => (
                              <Badge key={idx} variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                <Coffee className="w-3 h-3 mr-1" />
                                {producto}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-sm text-gray-600">
                          {formatFecha(factura.fecha)}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="font-semibold text-gray-900">€{factura.total.toFixed(2)}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {factura.verifactu && (
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verifactu
                            </Badge>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Button size="sm" variant="ghost" className="text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                            Ver PDF
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: Envíos */}
        <TabsContent value="envios" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Gestión de Envíos
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Seguimiento de todos los envíos • {envios.length} envíos activos
                  </p>
                </div>
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                  <Truck className="w-4 h-4 mr-2" />
                  Nuevo Envío
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Envío ID</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Cliente</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Productos</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Dirección</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Fecha</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Estado</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {envios.map((envio) => (
                      <tr 
                        key={envio.id} 
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900">{envio.id}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{envio.clienteNombre}</p>
                            <p className="text-xs text-gray-500">{envio.clienteId}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-gray-700">{envio.productos}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-sm text-gray-700">{envio.direccion}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-sm text-gray-600">
                          {formatFecha(envio.fecha)}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {getEstadoEnvioBadge(envio.estado)}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Button size="sm" variant="ghost" className="text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                            Seguimiento
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: Valoraciones */}
        <TabsContent value="valoraciones" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Valoraciones de Productos
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Feedback de clientes sobre productos • {valoraciones.length} valoraciones totales
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Cliente</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Producto</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Puntuación</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Comentario</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {valoraciones.map((valoracion) => (
                      <tr 
                        key={valoracion.id} 
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{valoracion.clienteNombre}</p>
                            <p className="text-xs text-gray-500">{valoracion.clienteId}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Coffee className="w-4 h-4 text-amber-600" />
                            <div>
                              <p className="font-medium text-gray-900">{valoracion.productoNombre}</p>
                              <p className="text-xs text-gray-500">{valoracion.productoId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {renderValoracion(valoracion.puntuacion)}
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-gray-700 italic">"{valoracion.comentario}"</p>
                        </td>
                        <td className="py-4 px-4 text-center text-sm text-gray-600">
                          {formatFecha(valoracion.fecha)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: Promociones */}
        <TabsContent value="promociones" className="mt-6">
          <div className="space-y-6">
            {/* Header con botón añadir */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-900 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Promociones Activas
                </h3>
                <p className="text-sm text-gray-600">
                  Gestiona todas las promociones y descuentos disponibles
                </p>
              </div>
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => setModalAñadirPromocion(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Añadir Promoción
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Promoción 1 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400" 
                    alt="Pack Croissants" 
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-red-600 text-white">
                    25% OFF
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Pack Croissants
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Compra 6 croissants y llévate 2 gratis. Válido para croissants de mantequilla y chocolate.
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-400 line-through text-sm">€16.00</span>
                    <span className="text-teal-600 font-semibold text-xl">€12.00</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Producto
                    </Badge>
                    <span className="text-sm text-gray-500">Válido hasta: 30 Nov 2025</span>
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Ver detalles
                  </Button>
                </CardContent>
              </Card>

              {/* Promoción 2 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400" 
                    alt="Menú Desayuno Familiar" 
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-orange-600 text-white">
                    €8 OFF
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Menú Desayuno Familiar
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    10 Barras de pan + 6 croissants + 4 zumos naturales. Perfecto para empezar el día.
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-400 line-through text-sm">€35.00</span>
                    <span className="text-teal-600 font-semibold text-xl">€27.00</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      Paquete
                    </Badge>
                    <span className="text-sm text-gray-500">Válido hasta: 31 Dic 2025</span>
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Ver detalles
                  </Button>
                </CardContent>
              </Card>

              {/* Promoción 3 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400" 
                    alt="Combo Bollería Completo" 
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-orange-600 text-white">
                    €4 OFF
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Combo Bollería Completo
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Ensaimadas + napolitanas + magdalenas. El pack perfecto de bollería.
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-400 line-through text-sm">€18.50</span>
                    <span className="text-teal-600 font-semibold text-xl">€14.50</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      Paquete
                    </Badge>
                    <span className="text-sm text-gray-500">Válido hasta: 15 Dic 2025</span>
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Ver detalles
                  </Button>
                </CardContent>
              </Card>

              {/* Promoción 4 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400" 
                    alt="3 Baguettes al Precio de 2" 
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-red-600 text-white">
                    33% OFF
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    3 Baguettes al Precio de 2
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Llévate 3 baguettes artesanales y paga solo 2. Ideal para compartir.
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-400 line-through text-sm">€9.00</span>
                    <span className="text-teal-600 font-semibold text-xl">€6.00</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Producto
                    </Badge>
                    <span className="text-sm text-gray-500">Válido hasta: 20 Dic 2025</span>
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Ver detalles
                  </Button>
                </CardContent>
              </Card>

              {/* Promoción 5 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400" 
                    alt="20% Descuento en Postres" 
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-red-600 text-white">
                    20% OFF
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    20% Descuento en Postres
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Todos los postres con 20% de descuento. Perfecto para endulzar tu comida.
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-400 line-through text-sm">€5.50</span>
                    <span className="text-teal-600 font-semibold text-xl">€4.40</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Producto
                    </Badge>
                    <span className="text-sm text-gray-500">Válido hasta: 31 Dic 2025</span>
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Ver detalles
                  </Button>
                </CardContent>
              </Card>

              {/* Promoción 6 */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400" 
                    alt="Martes de Pan Artesanal" 
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-red-600 text-white">
                    50% OFF
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Martes de Pan Artesanal
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Todos los martes, 2ª barra de pan al 50% de descuento. No acumulable con otras ofertas.
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-400 line-through text-sm">€3.80</span>
                    <span className="text-teal-600 font-semibold text-xl">€2.85</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Producto
                    </Badge>
                    <span className="text-sm text-gray-500">Válido hasta: 31 Ene 2026</span>
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Ver detalles
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal Añadir Promoción */}
      <Dialog open={modalAñadirPromocion} onOpenChange={setModalAñadirPromocion}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Añadir Nueva Promoción</DialogTitle>
          </DialogHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Título de la Promoción</Label>
              <Input 
                placeholder="Ej: Pack Croissants" 
                value={nuevaPromocion.titulo}
                onChange={(e) => setNuevaPromocion({ ...nuevaPromocion, titulo: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea 
                placeholder="Ej: Compra 6 croissants y llévate 2 gratis. Válido para croissants de mantequilla y chocolate." 
                value={nuevaPromocion.descripcion}
                onChange={(e) => setNuevaPromocion({ ...nuevaPromocion, descripcion: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Descuento</Label>
              <Input 
                placeholder="Ej: 25% OFF" 
                value={nuevaPromocion.descuento}
                onChange={(e) => setNuevaPromocion({ ...nuevaPromocion, descuento: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo de Promoción</Label>
              <Input 
                placeholder="Ej: Producto" 
                value={nuevaPromocion.tipo}
                onChange={(e) => setNuevaPromocion({ ...nuevaPromocion, tipo: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Precio Original</Label>
              <Input 
                placeholder="Ej: €16.00" 
                value={nuevaPromocion.precioOriginal}
                onChange={(e) => setNuevaPromocion({ ...nuevaPromocion, precioOriginal: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Precio Final</Label>
              <Input 
                placeholder="Ej: €12.00" 
                value={nuevaPromocion.precioFinal}
                onChange={(e) => setNuevaPromocion({ ...nuevaPromocion, precioFinal: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Válido Hasta</Label>
              <Input 
                type="date" 
                value={nuevaPromocion.validoHasta}
                onChange={(e) => setNuevaPromocion({ ...nuevaPromocion, validoHasta: e.target.value })}
              />
            </div>
          </CardContent>
          <div className="flex justify-end mt-6">
            <Button size="sm" className="bg-gray-500 hover:bg-gray-600 text-white mr-2" onClick={() => setModalAñadirPromocion(false)}>
              Cancelar
            </Button>
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white" onClick={handleAñadirPromocion}>
              Añadir Promoción
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}