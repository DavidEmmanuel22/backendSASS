import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { 
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  ChevronDown,
  Package,
  Euro,
  User,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Pedido {
  id: string;
  cliente: string;
  telefono: string;
  productos: string[];
  total: number;
  estado: 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cancelado';
  fecha: string;
  hora: string;
  direccion?: string;
}

export function PedidosTrabajador() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('ventas');

  const pedidos: Pedido[] = [
    {
      id: 'PED-2025-001',
      cliente: 'María García López',
      telefono: '+34 678 123 456',
      productos: ['10 Barras de Pan Artesanal', '6 Croissants', 'Coca-Cola 33cl'],
      total: 25.40,
      estado: 'pendiente',
      fecha: '2025-11-16',
      hora: '14:30',
      direccion: 'Calle Mayor 45, 3°B, Madrid'
    },
    {
      id: 'PED-2025-002',
      cliente: 'Carlos Martínez Ruiz',
      telefono: '+34 645 987 321',
      productos: ['8 Ensaimadas', 'Napolitanas de Chocolate x4', 'Fanta Naranja 33cl'],
      total: 18.50,
      estado: 'pagado',
      fecha: '2025-11-16',
      hora: '14:15',
      direccion: 'Av. de la Castellana 120, Madrid'
    },
    {
      id: 'PED-2025-003',
      cliente: 'Ana Rodríguez Pérez',
      telefono: '+34 612 456 789',
      productos: ['12 Magdalenas', 'Bollos de Leche x6', 'Cerveza Estrella Galicia'],
      total: 21.00,
      estado: 'enviado',
      fecha: '2025-11-16',
      hora: '14:00',
      direccion: 'Plaza España 8, 2°A, Madrid'
    },
    {
      id: 'PED-2025-004',
      cliente: 'Juan Fernández Silva',
      telefono: '+34 689 234 567',
      productos: ['Baguettes x4', 'Brownie de Chocolate', 'Agua Mineral 50cl'],
      total: 20.40,
      estado: 'entregado',
      fecha: '2025-11-16',
      hora: '13:45'
    },
    {
      id: 'PED-2025-005',
      cliente: 'Laura Sánchez Torres',
      telefono: '+34 655 789 123',
      productos: ['Pan de Molde Integral', 'Palmera de Chocolate x3', 'Zumo Natural Naranja'],
      total: 16.90,
      estado: 'pagado',
      fecha: '2025-11-16',
      hora: '13:30',
      direccion: 'Calle Alcalá 200, 1°C, Madrid'
    },
    {
      id: 'PED-2025-006',
      cliente: 'Pedro González Martín',
      telefono: '+34 622 345 678',
      productos: ['10 Barras Pan Integral', '5 Croissants', 'Coca-Cola 33cl x2'],
      total: 28.30,
      estado: 'pendiente',
      fecha: '2025-11-16',
      hora: '14:45',
      direccion: 'Calle Goya 75, 4°A, Madrid'
    },
    {
      id: 'PED-2025-007',
      cliente: 'Isabel López Hernández',
      telefono: '+34 677 654 321',
      productos: ['Pan de Payés', 'Tarta de Queso', 'Agua Mineral 50cl'],
      total: 25.30,
      estado: 'enviado',
      fecha: '2025-11-16',
      hora: '13:15',
      direccion: 'Paseo de la Habana 34, Madrid'
    },
    {
      id: 'PED-2025-008',
      cliente: 'Miguel Ángel Torres',
      telefono: '+34 633 987 456',
      productos: ['Focaccia Italiana', 'Donuts x6', 'Fanta Naranja 33cl'],
      total: 19.50,
      estado: 'pagado',
      fecha: '2025-11-16',
      hora: '13:00',
      direccion: 'Calle Serrano 156, 2°B, Madrid'
    },
    {
      id: 'PED-2025-009',
      cliente: 'Carmen Ruiz Díaz',
      telefono: '+34 699 123 987',
      productos: ['Panecillos Viena x12', 'Tiramisú', 'Cerveza Estrella Galicia'],
      total: 23.40,
      estado: 'cancelado',
      fecha: '2025-11-16',
      hora: '12:45'
    },
    {
      id: 'PED-2025-010',
      cliente: 'Francisco Jiménez Gómez',
      telefono: '+34 644 567 890',
      productos: ['Hamburguesa de Pollo Crispy', 'Helado Artesanal', 'Coca-Cola 33cl'],
      total: 17.00,
      estado: 'entregado',
      fecha: '2025-11-16',
      hora: '12:30'
    },
    {
      id: 'PED-2025-011',
      cliente: 'Raquel Moreno Castro',
      telefono: '+34 611 234 789',
      productos: ['Pizza Hawaiana', 'Patatas Fritas', 'Zumo Natural Naranja'],
      total: 19.30,
      estado: 'pagado',
      fecha: '2025-11-16',
      hora: '14:50',
      direccion: 'Calle Velázquez 89, Madrid'
    },
    {
      id: 'PED-2025-012',
      cliente: 'Alberto Navarro Vega',
      telefono: '+34 688 456 123',
      productos: ['Pizza Vegetal', 'Aros de Cebolla', 'Agua Mineral 50cl'],
      total: 18.90,
      estado: 'pendiente',
      fecha: '2025-11-16',
      hora: '15:00',
      direccion: 'Calle Príncipe de Vergara 112, Madrid'
    },
  ];

  const pedidosFiltrados = pedidos.filter(pedido => {
    const matchBusqueda = 
      pedido.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      pedido.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      pedido.telefono.includes(busqueda);
    
    let matchEstado = true;
    if (filtroEstado === 'ventas') {
      // Todas las ventas (todos los estados)
      matchEstado = true;
    } else if (filtroEstado === 'pedidos') {
      // Pedidos pagados pero no enviados ni entregados
      matchEstado = pedido.estado === 'pagado';
    } else if (filtroEstado === 'recogidos') {
      // Pedidos entregados/recogidos
      matchEstado = pedido.estado === 'entregado';
    } else if (filtroEstado === 'enviados') {
      // Pedidos enviados
      matchEstado = pedido.estado === 'enviado';
    }
    
    return matchBusqueda && matchEstado;
  });

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return (
          <Badge className="bg-orange-100 text-orange-700 border-orange-200">
            <Clock className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        );
      case 'pagado':
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Pagado
          </Badge>
        );
      case 'enviado':
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            <Truck className="w-3 h-3 mr-1" />
            Enviado
          </Badge>
        );
      case 'entregado':
        return (
          <Badge className="bg-teal-100 text-teal-700 border-teal-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Entregado
          </Badge>
        );
      case 'cancelado':
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelado
          </Badge>
        );
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const contarPorEstado = (estado: string) => {
    return pedidos.filter(p => p.estado === estado).length;
  };

  const calcularTotalVentas = () => {
    return pedidos
      .filter(p => p.estado !== 'cancelado')
      .reduce((total, p) => total + p.total, 0);
  };

  return (
    <div className="space-y-6">
      {/* Filtros y Búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
            Gestión de Clientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtros tipo tabs con colores */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              onClick={() => setFiltroEstado('ventas')}
              className={
                filtroEstado === 'ventas'
                  ? 'bg-teal-600 hover:bg-teal-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
            >
              <Euro className="w-4 h-4 mr-2" />
              Ventas
            </Button>
            <Button
              onClick={() => setFiltroEstado('pedidos')}
              className={
                filtroEstado === 'pedidos'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Pedidos
            </Button>
            <Button
              onClick={() => setFiltroEstado('recogidos')}
              className={
                filtroEstado === 'recogidos'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
            >
              <Package className="w-4 h-4 mr-2" />
              Recogidos
            </Button>
            <Button
              onClick={() => setFiltroEstado('enviados')}
              className={
                filtroEstado === 'enviados'
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
            >
              <Truck className="w-4 h-4 mr-2" />
              Enviados
            </Button>
          </div>

          {/* Buscador */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por ID, cliente o teléfono..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Tabla de Pedidos */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-medium">ID Pedido</TableHead>
                    <TableHead className="font-medium">Cliente</TableHead>
                    <TableHead className="font-medium">Teléfono</TableHead>
                    <TableHead className="font-medium">Productos</TableHead>
                    <TableHead className="font-medium">Fecha/Hora</TableHead>
                    <TableHead className="font-medium">Total</TableHead>
                    <TableHead className="font-medium">Estado</TableHead>
                    <TableHead className="font-medium text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pedidosFiltrados.length > 0 ? (
                    pedidosFiltrados.map((pedido) => (
                      <TableRow key={pedido.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {pedido.id}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span>{pedido.cliente}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {pedido.telefono}
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="flex items-center gap-1 text-sm">
                              <Package className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                {pedido.productos.length} producto{pedido.productos.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                              {pedido.productos.join(', ')}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-gray-900">{pedido.hora}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(pedido.fecha).toLocaleDateString('es-ES', {
                                  day: '2-digit',
                                  month: 'short'
                                })}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-teal-600">
                            {pedido.total.toFixed(2)}€
                          </span>
                        </TableCell>
                        <TableCell>
                          {getEstadoBadge(pedido.estado)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast.info(`Ver detalles de ${pedido.id}`)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Ver
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                        <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No se encontraron pedidos</p>
                        <p className="text-sm mt-1">
                          {busqueda || filtroEstado !== 'todos'
                            ? 'Intenta ajustar los filtros de búsqueda'
                            : 'Aún no hay pedidos registrados'}
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Resumen */}
          {pedidosFiltrados.length > 0 && (
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <p>
                Mostrando <span className="font-medium text-gray-900">{pedidosFiltrados.length}</span> de{' '}
                <span className="font-medium text-gray-900">{pedidos.length}</span> pedidos
              </p>
              <p>
                Total filtrado:{' '}
                <span className="font-medium text-teal-600">
                  {pedidosFiltrados
                    .filter(p => p.estado !== 'cancelado')
                    .reduce((total, p) => total + p.total, 0)
                    .toFixed(2)}
                  €
                </span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}