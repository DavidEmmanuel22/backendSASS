import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { 
  Package,
  Search,
  Filter,
  MoreVertical,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Plus,
  Download,
  ShoppingCart,
  PackagePlus,
  RefreshCw,
  Clipboard,
  Warehouse,
  Clock,
  BarChart3,
  ArrowUpDown,
  Eye,
  FileBarChart,
  Truck,
  ArrowRightLeft,
  AlertTriangle,
  Minus,
  DollarSign,
  Star,
  Building2,
  ScanLine,
  Users,
  Calendar,
  XCircle,
  Coffee
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SKU {
  id: string;
  codigo: string;
  nombre: string;
  imagen?: string;
  categoria: string;
  almacen: string;
  ubicacion: string;
  pasillo: string;
  estanteria: string;
  hueco: string;
  disponible: number;
  comprometido: number;
  minimo: number;
  maximo: number;
  rop: number;
  costoMedio: number;
  pvp: number;
  proveedorPreferente: string;
  ultimaCompra: string;
  leadTime: number;
  estado: 'bajo' | 'ok' | 'sobrestock';
  rotacion: number;
}

interface Proveedor {
  id: string;
  nombre: string;
  sla: number;
  rating: number;
  leadTime: number;
  precioMedio: number;
  pedidosActivos: number;
  imagen?: string;
}

interface SesionInventario {
  id: string;
  nombre: string;
  tipo: 'total' | 'ciclico' | 'rapido';
  almacen: string;
  progreso: number;
  diferenciasUnidades: number;
  diferenciasValor: number;
  responsables: string[];
  fechaLimite: string;
  estado: 'activa' | 'pausada' | 'completada';
}

interface Transferencia {
  id: string;
  origen: string;
  destino: string;
  skus: number;
  responsable: string;
  fecha: string;
  estado: 'borrador' | 'transito' | 'recibida';
}

interface SugerenciaCompra {
  sku: SKU;
  cantidadRecomendada: number;
  costoEstimado: number;
}

export function StockProveedores() {
  const [vistaActual, setVistaActual] = useState<'inventario' | 'proveedores' | 'almacenes' | 'sesiones' | 'transferencias'>('inventario');
  const [busqueda, setBusqueda] = useState('');
  const [almacenFiltro, setAlmacenFiltro] = useState('todos');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');
  const [estadoFiltro, setEstadoFiltro] = useState('todos');
  const [proveedorFiltro, setProveedorFiltro] = useState('todos');
  const [panelSugerenciasAbierto, setPanelSugerenciasAbierto] = useState(true);

  // KPIs principales
  const kpis = {
    stockValorado: 48250,
    rupturas: 2,
    rotacion: 15.8,
    diasInventario: 23,
    slaProveedor: 96.5
  };

  const skus: SKU[] = [
    {
      id: 'SKU001',
      codigo: 'CORE-COL-250',
      nombre: 'CORE Colombia - 250g',
      categoria: 'Café de Origen',
      almacen: 'Almacén 1',
      ubicacion: 'A-12-03',
      pasillo: 'A',
      estanteria: '12',
      hueco: '03',
      disponible: 25,
      comprometido: 5,
      minimo: 10,
      maximo: 50,
      rop: 20,
      costoMedio: 8.50,
      pvp: 12.90,
      proveedorPreferente: 'Importadora Café Especializado',
      ultimaCompra: '2025-11-01',
      leadTime: 7,
      estado: 'ok',
      rotacion: 15.2,
      imagen: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop'
    },
    {
      id: 'SKU002',
      codigo: 'CORE-BRA-250',
      nombre: 'CORE Brasil - 250g',
      categoria: 'Café de Origen',
      almacen: 'Almacén 1',
      ubicacion: 'A-12-04',
      pasillo: 'A',
      estanteria: '12',
      hueco: '04',
      disponible: 30,
      comprometido: 3,
      minimo: 15,
      maximo: 60,
      rop: 25,
      costoMedio: 8.20,
      pvp: 12.50,
      proveedorPreferente: 'Importadora Café Especializado',
      ultimaCompra: '2025-11-05',
      leadTime: 7,
      estado: 'ok',
      rotacion: 18.5,
      imagen: 'https://images.unsplash.com/photo-1610632380989-680fe40816f6?w=400&h=300&fit=crop'
    },
    {
      id: 'SKU003',
      codigo: 'CORE-ETI-250',
      nombre: 'CORE Etiopía - 250g',
      categoria: 'Café de Origen',
      almacen: 'Almacén 1',
      ubicacion: 'A-12-05',
      pasillo: 'A',
      estanteria: '12',
      hueco: '05',
      disponible: 8,
      comprometido: 2,
      minimo: 10,
      maximo: 40,
      rop: 18,
      costoMedio: 9.20,
      pvp: 13.90,
      proveedorPreferente: 'Importadora Café Especializado',
      ultimaCompra: '2025-10-28',
      leadTime: 7,
      estado: 'bajo',
      rotacion: 14.3,
      imagen: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop'
    },
    {
      id: 'SKU004',
      codigo: 'CORE-MEX-250',
      nombre: 'CORE México - 250g',
      categoria: 'Café de Origen',
      almacen: 'PDV',
      ubicacion: 'B-05-01',
      pasillo: 'B',
      estanteria: '05',
      hueco: '01',
      disponible: 20,
      comprometido: 4,
      minimo: 12,
      maximo: 45,
      rop: 20,
      costoMedio: 8.20,
      pvp: 12.50,
      proveedorPreferente: 'Importadora Café Especializado',
      ultimaCompra: '2025-11-03',
      leadTime: 7,
      estado: 'ok',
      rotacion: 12.8,
      imagen: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop'
    },
    {
      id: 'SKU005',
      codigo: 'CORE-KEN-250',
      nombre: 'CORE Kenia - 250g',
      categoria: 'Café de Origen',
      almacen: 'PDV',
      ubicacion: 'B-05-02',
      pasillo: 'B',
      estanteria: '05',
      hueco: '02',
      disponible: 5,
      comprometido: 1,
      minimo: 10,
      maximo: 35,
      rop: 15,
      costoMedio: 9.80,
      pvp: 14.50,
      proveedorPreferente: 'Importadora Café Especializado',
      ultimaCompra: '2025-10-25',
      leadTime: 7,
      estado: 'bajo',
      rotacion: 11.2,
      imagen: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&fit=crop'
    },
    {
      id: 'SKU006',
      codigo: 'CORE-HON-250',
      nombre: 'CORE Honduras - 250g',
      categoria: 'Café de Origen',
      almacen: 'Almacén 1',
      ubicacion: 'A-13-01',
      pasillo: 'A',
      estanteria: '13',
      hueco: '01',
      disponible: 22,
      comprometido: 3,
      minimo: 12,
      maximo: 45,
      rop: 20,
      costoMedio: 8.50,
      pvp: 12.90,
      proveedorPreferente: 'Importadora Café Especializado',
      ultimaCompra: '2025-11-08',
      leadTime: 7,
      estado: 'ok',
      rotacion: 13.5,
      imagen: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop'
    },
    {
      id: 'SKU007',
      codigo: 'CORE-GUA-250',
      nombre: 'CORE Guatemala - 250g',
      categoria: 'Café de Origen',
      almacen: 'Almacén 1',
      ubicacion: 'A-13-02',
      pasillo: 'A',
      estanteria: '13',
      hueco: '02',
      disponible: 20,
      comprometido: 2,
      minimo: 12,
      maximo: 40,
      rop: 18,
      costoMedio: 9.00,
      pvp: 13.50,
      proveedorPreferente: 'Importadora Café Especializado',
      ultimaCompra: '2025-11-06',
      leadTime: 7,
      estado: 'ok',
      rotacion: 12.1,
      imagen: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=300&fit=crop'
    },
    {
      id: 'SKU008',
      codigo: 'CORE-COL-DEC-250',
      nombre: 'CORE Colombia Decaf - 250g',
      categoria: 'Café de Origen',
      almacen: 'PDV',
      ubicacion: 'B-06-01',
      pasillo: 'B',
      estanteria: '06',
      hueco: '01',
      disponible: 18,
      comprometido: 2,
      minimo: 10,
      maximo: 35,
      rop: 15,
      costoMedio: 9.20,
      pvp: 13.90,
      proveedorPreferente: 'Importadora Café Especializado',
      ultimaCompra: '2025-11-04',
      leadTime: 7,
      estado: 'ok',
      rotacion: 9.8,
      imagen: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop'
    },
    {
      id: 'SKU009',
      codigo: 'CORE-HOUSE-250',
      nombre: 'CORE House Blend - 250g',
      categoria: 'Mezclas',
      almacen: 'PDV',
      ubicacion: 'C-08-01',
      pasillo: 'C',
      estanteria: '08',
      hueco: '01',
      disponible: 35,
      comprometido: 8,
      minimo: 20,
      maximo: 70,
      rop: 35,
      costoMedio: 7.80,
      pvp: 11.90,
      proveedorPreferente: 'Tostadora CORE',
      ultimaCompra: '2025-11-10',
      leadTime: 3,
      estado: 'ok',
      rotacion: 22.5,
      imagen: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&fit=crop'
    },
    {
      id: 'SKU010',
      codigo: 'CORE-LATTE-250',
      nombre: 'CORE Latte Blend - 250g',
      categoria: 'Mezclas',
      almacen: 'PDV',
      ubicacion: 'C-08-02',
      pasillo: 'C',
      estanteria: '08',
      hueco: '02',
      disponible: 30,
      comprometido: 6,
      minimo: 18,
      maximo: 65,
      rop: 30,
      costoMedio: 7.50,
      pvp: 11.50,
      proveedorPreferente: 'Tostadora CORE',
      ultimaCompra: '2025-11-09',
      leadTime: 3,
      estado: 'ok',
      rotacion: 20.3,
      imagen: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop'
    },
    {
      id: 'SKU011',
      codigo: 'CORE-LAT-250',
      nombre: 'CORE Latte - 250g',
      categoria: 'Mezclas',
      almacen: 'Almacén 1',
      ubicacion: 'C-09-01',
      pasillo: 'C',
      estanteria: '09',
      hueco: '01',
      disponible: 25,
      comprometido: 5,
      minimo: 15,
      maximo: 55,
      rop: 25,
      costoMedio: 8.50,
      pvp: 12.90,
      proveedorPreferente: 'Tostadora CORE',
      ultimaCompra: '2025-11-11',
      leadTime: 3,
      estado: 'ok',
      rotacion: 18.7,
      imagen: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop'
    },
    {
      id: 'SKU012',
      codigo: 'CORE-LAT-FTE-250',
      nombre: 'CORE Latte Forte - 250g',
      categoria: 'Mezclas',
      almacen: 'Almacén 1',
      ubicacion: 'C-09-02',
      pasillo: 'C',
      estanteria: '09',
      hueco: '02',
      disponible: 22,
      comprometido: 4,
      minimo: 15,
      maximo: 50,
      rop: 22,
      costoMedio: 9.00,
      pvp: 13.50,
      proveedorPreferente: 'Tostadora CORE',
      ultimaCompra: '2025-11-12',
      leadTime: 3,
      estado: 'ok',
      rotacion: 16.5,
      imagen: 'https://images.unsplash.com/photo-1501492673258-6d2f8c0b9bec?w=400&h=300&fit=crop'
    },
  ];

  const proveedores: Proveedor[] = [
    { id: 'P001', nombre: 'Importadora Café Especializado', sla: 96.5, rating: 4.9, leadTime: 7, precioMedio: 8.65, pedidosActivos: 3 },
    { id: 'P002', nombre: 'Tostadora CORE', sla: 98.0, rating: 5.0, leadTime: 3, precioMedio: 8.20, pedidosActivos: 2 },
    { id: 'P003', nombre: 'Café Verde Premium', sla: 94.2, rating: 4.7, leadTime: 10, precioMedio: 9.10, pedidosActivos: 1 },
    { id: 'P004', nombre: 'Distribuidora Café Sostenible', sla: 92.5, rating: 4.6, leadTime: 8, precioMedio: 8.80, pedidosActivos: 0 },
  ];

  const sesionesInventario: SesionInventario[] = [
    {
      id: 'INV-2025-14',
      nombre: 'Inventario PDV 1',
      tipo: 'ciclico',
      almacen: 'PDV',
      progreso: 75,
      diferenciasUnidades: 3,
      diferenciasValor: 38.70,
      responsables: ['Carlos Ruiz', 'Ana López'],
      fechaLimite: '2025-11-16T20:00:00',
      estado: 'activa'
    },
    {
      id: 'INV-2025-15',
      nombre: 'Inventario Almacén Central',
      tipo: 'ciclico',
      almacen: 'Almacén 1',
      progreso: 60,
      diferenciasUnidades: -2,
      diferenciasValor: -25.80,
      responsables: ['María García', 'Pedro Martínez'],
      fechaLimite: '2025-11-17T20:00:00',
      estado: 'activa'
    },
    {
      id: 'INV-2025-13',
      nombre: 'Inventario Total - Noviembre',
      tipo: 'total',
      almacen: 'Todos',
      progreso: 100,
      diferenciasUnidades: 8,
      diferenciasValor: 103.20,
      responsables: ['Carlos Ruiz', 'María García', 'Ana López', 'Pedro Martínez'],
      fechaLimite: '2025-11-14T23:59:59',
      estado: 'completada'
    },
  ];

  const transferencias: Transferencia[] = [
    {
      id: 'TR-2025-008',
      origen: 'Almacén 1',
      destino: 'PDV',
      skus: 4,
      responsable: 'Carlos Ruiz',
      fecha: '2025-11-15T10:00:00',
      estado: 'transito'
    },
    {
      id: 'TR-2025-007',
      origen: 'Almacén 1',
      destino: 'PDV',
      skus: 3,
      responsable: 'Ana López',
      fecha: '2025-11-14T15:30:00',
      estado: 'recibida'
    },
    {
      id: 'TR-2025-006',
      origen: 'PDV',
      destino: 'Almacén 1',
      skus: 2,
      responsable: 'María García',
      fecha: '2025-11-13T09:00:00',
      estado: 'recibida'
    },
  ];

  // Filtrar SKUs
  const skusFiltrados = skus.filter(sku => {
    const matchBusqueda = sku.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          sku.codigo.toLowerCase().includes(busqueda.toLowerCase());
    const matchAlmacen = almacenFiltro === 'todos' || sku.almacen === almacenFiltro;
    const matchCategoria = categoriaFiltro === 'todas' || sku.categoria === categoriaFiltro;
    const matchEstado = estadoFiltro === 'todos' || sku.estado === estadoFiltro;
    const matchProveedor = proveedorFiltro === 'todos' || sku.proveedorPreferente === proveedorFiltro;
    
    return matchBusqueda && matchAlmacen && matchCategoria && matchEstado && matchProveedor;
  });

  // Calcular sugerencias
  const sugerenciasCompra: SugerenciaCompra[] = skus
    .filter(sku => sku.disponible <= sku.rop)
    .map(sku => ({
      sku,
      cantidadRecomendada: sku.maximo - sku.disponible,
      costoEstimado: (sku.maximo - sku.disponible) * sku.costoMedio
    }));

  const getRupturas = () => skus.filter(s => s.disponible < s.minimo).length;
  const getTotalRotacion = () => {
    const suma = skus.reduce((acc, s) => acc + s.rotacion, 0);
    return (suma / skus.length).toFixed(1);
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'bajo':
        return <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">Stock Bajo</Badge>;
      case 'ok':
        return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Óptimo</Badge>;
      case 'sobrestock':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">Sobrestock</Badge>;
      default:
        return null;
    }
  };

  const getEstadoSesionBadge = (estado: string) => {
    switch (estado) {
      case 'activa':
        return <Badge className="bg-blue-600">Activa</Badge>;
      case 'pausada':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">Pausada</Badge>;
      case 'completada':
        return <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">Completada</Badge>;
      default:
        return null;
    }
  };

  const getEstadoTransferenciaBadge = (estado: string) => {
    switch (estado) {
      case 'borrador':
        return <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">Borrador</Badge>;
      case 'transito':
        return <Badge className="bg-blue-600">En Tránsito</Badge>;
      case 'recibida':
        return <Badge className="bg-green-600">Recibida</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Stock y Proveedores
          </h2>
          <p className="text-gray-600 text-sm">
            Gestión de inventario, proveedores y almacenes de café CORE
          </p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Download className="w-4 h-4 mr-2" />
          Exportar Informe
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Stock Valorado</p>
                <p className="text-gray-900 text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  €{kpis.stockValorado.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Rupturas</p>
                <p className="text-gray-900 text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {getRupturas()}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Rotación Media</p>
                <p className="text-gray-900 text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {getTotalRotacion()}x
                </p>
              </div>
              <RefreshCw className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Días Inventario</p>
                <p className="text-gray-900 text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {kpis.diasInventario}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">SLA Proveedor</p>
                <p className="text-gray-900 text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {kpis.slaProveedor}%
                </p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={vistaActual} onValueChange={(v) => setVistaActual(v as any)}>
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="inventario">
            <Package className="w-4 h-4 mr-2" />
            Inventario
          </TabsTrigger>
          <TabsTrigger value="proveedores">
            <Truck className="w-4 h-4 mr-2" />
            Proveedores
          </TabsTrigger>
          <TabsTrigger value="almacenes">
            <Warehouse className="w-4 h-4 mr-2" />
            Almacenes
          </TabsTrigger>
          <TabsTrigger value="sesiones">
            <Clipboard className="w-4 h-4 mr-2" />
            Inventario
          </TabsTrigger>
          <TabsTrigger value="transferencias">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Transferencias
          </TabsTrigger>
        </TabsList>

        {/* ===== INVENTARIO ===== */}
        <TabsContent value="inventario" className="mt-6">
          <div className="space-y-6">
            {/* Panel de Sugerencias de Compra */}
            {sugerenciasCompra.length > 0 && panelSugerenciasAbierto && (
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Sugerencias de Compra
                        </h3>
                        <p className="text-sm text-gray-600">
                          {sugerenciasCompra.length} producto{sugerenciasCompra.length > 1 ? 's' : ''} requieren reposición
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPanelSugerenciasAbierto(false)}
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sugerenciasCompra.map((sugerencia) => (
                      <div
                        key={sugerencia.sku.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Coffee className="w-5 h-5 text-amber-600" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{sugerencia.sku.nombre}</p>
                            <p className="text-sm text-gray-600">
                              Comprar {sugerencia.cantidadRecomendada} unidades • 
                              Costo estimado: €{sugerencia.costoEstimado.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                          <PackagePlus className="w-4 h-4 mr-2" />
                          Generar OC
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Búsqueda y Filtros */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Buscar por nombre o código..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Filtros */}
                  <div className="flex gap-2 flex-wrap">
                    <Select value={almacenFiltro} onValueChange={setAlmacenFiltro}>
                      <SelectTrigger className="w-[180px]">
                        <Warehouse className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Almacén" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos los almacenes</SelectItem>
                        <SelectItem value="Almacén 1">Almacén 1</SelectItem>
                        <SelectItem value="PDV">PDV</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
                      <SelectTrigger className="w-[160px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todas las categorías</SelectItem>
                        <SelectItem value="Café de Origen">Café de Origen</SelectItem>
                        <SelectItem value="Mezclas">Mezclas</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={estadoFiltro} onValueChange={setEstadoFiltro}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos los estados</SelectItem>
                        <SelectItem value="bajo">Stock Bajo</SelectItem>
                        <SelectItem value="ok">Óptimo</SelectItem>
                        <SelectItem value="sobrestock">Sobrestock</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={proveedorFiltro} onValueChange={setProveedorFiltro}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Proveedor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos los proveedores</SelectItem>
                        {proveedores.map(p => (
                          <SelectItem key={p.id} value={p.nombre}>{p.nombre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabla de Inventario */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Producto</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Almacén</TableHead>
                        <TableHead className="text-center">Disponible</TableHead>
                        <TableHead className="text-center">Comprometido</TableHead>
                        <TableHead className="text-center">Rotación</TableHead>
                        <TableHead className="text-center">Estado</TableHead>
                        <TableHead className="text-right">PVP</TableHead>
                        <TableHead className="text-center">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {skusFiltrados.map((sku) => (
                        <TableRow key={sku.id}>
                          <TableCell className="font-medium">{sku.codigo}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Coffee className="w-5 h-5 text-amber-600" />
                              <div>
                                <p className="font-medium text-gray-900">{sku.nombre}</p>
                                <p className="text-xs text-gray-500">{sku.ubicacion}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{sku.categoria}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {sku.almacen}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="font-semibold">{sku.disponible}</span>
                          </TableCell>
                          <TableCell className="text-center text-gray-600">
                            {sku.comprometido}
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-sm font-medium text-gray-700">{sku.rotacion}x</span>
                          </TableCell>
                          <TableCell className="text-center">
                            {getEstadoBadge(sku.estado)}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            €{sku.pvp.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Ver Detalles
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <PackagePlus className="w-4 h-4 mr-2" />
                                  Generar OC
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <ArrowRightLeft className="w-4 h-4 mr-2" />
                                  Transferir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ===== PROVEEDORES ===== */}
        <TabsContent value="proveedores" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Proveedores de Café
                  </h3>
                  <p className="text-sm text-gray-600">
                    {proveedores.length} proveedores registrados
                  </p>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Proveedor
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Proveedor</TableHead>
                      <TableHead className="text-center">SLA %</TableHead>
                      <TableHead className="text-center">Rating</TableHead>
                      <TableHead className="text-center">Lead Time</TableHead>
                      <TableHead className="text-right">Precio Medio</TableHead>
                      <TableHead className="text-center">Pedidos Activos</TableHead>
                      <TableHead className="text-center">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {proveedores.map((proveedor) => (
                      <TableRow key={proveedor.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                              <Truck className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{proveedor.nombre}</p>
                              <p className="text-xs text-gray-500">{proveedor.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center">
                            <span className="font-semibold text-gray-900">{proveedor.sla}%</span>
                            <Progress value={proveedor.sla} className="h-1 w-16 mt-1" />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{proveedor.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {proveedor.leadTime} días
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          €{proveedor.precioMedio.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-center">
                          {proveedor.pedidosActivos > 0 ? (
                            <Badge className="bg-teal-600">{proveedor.pedidosActivos}</Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== ALMACENES ===== */}
        <TabsContent value="almacenes" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Almacén 1 */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Warehouse className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Almacén 1
                    </h3>
                    <p className="text-sm text-gray-600">Central de Almacenamiento</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">SKUs almacenados</span>
                    <span className="font-semibold text-gray-900">
                      {skus.filter(s => s.almacen === 'Almacén 1').length}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Unidades totales</span>
                    <span className="font-semibold text-gray-900">
                      {skus.filter(s => s.almacen === 'Almacén 1').reduce((acc, s) => acc + s.disponible, 0)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Valor inventario</span>
                    <span className="font-semibold text-gray-900">
                      €{skus.filter(s => s.almacen === 'Almacén 1').reduce((acc, s) => acc + (s.disponible * s.costoMedio), 0).toFixed(2)}
                    </span>
                  </div>
                  <Separator />
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalle del Almacén
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* PDV */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-teal-600 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      PDV
                    </h3>
                    <p className="text-sm text-gray-600">Punto De Venta</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">SKUs almacenados</span>
                    <span className="font-semibold text-gray-900">
                      {skus.filter(s => s.almacen === 'PDV').length}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Unidades totales</span>
                    <span className="font-semibold text-gray-900">
                      {skus.filter(s => s.almacen === 'PDV').reduce((acc, s) => acc + s.disponible, 0)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Valor inventario</span>
                    <span className="font-semibold text-gray-900">
                      €{skus.filter(s => s.almacen === 'PDV').reduce((acc, s) => acc + (s.disponible * s.costoMedio), 0).toFixed(2)}
                    </span>
                  </div>
                  <Separator />
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalle del PDV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ===== SESIONES DE INVENTARIO ===== */}
        <TabsContent value="sesiones" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Sesiones de Inventario
                  </h3>
                  <p className="text-sm text-gray-600">
                    Gestión de conteos físicos de inventario
                  </p>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Sesión
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sesión</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Almacén</TableHead>
                      <TableHead className="text-center">Progreso</TableHead>
                      <TableHead className="text-center">Diferencias</TableHead>
                      <TableHead>Responsables</TableHead>
                      <TableHead className="text-center">Estado</TableHead>
                      <TableHead className="text-center">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sesionesInventario.map((sesion) => (
                      <TableRow key={sesion.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{sesion.nombre}</p>
                            <p className="text-xs text-gray-500">{sesion.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {sesion.tipo === 'total' && 'Total'}
                            {sesion.tipo === 'ciclico' && 'Cíclico'}
                            {sesion.tipo === 'rapido' && 'Rápido'}
                          </Badge>
                        </TableCell>
                        <TableCell>{sesion.almacen}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center">
                            <span className="text-sm font-medium">{sesion.progreso}%</span>
                            <Progress value={sesion.progreso} className="h-2 w-24 mt-1" />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center">
                            <span className={`font-medium ${sesion.diferenciasUnidades > 0 ? 'text-green-600' : sesion.diferenciasUnidades < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                              {sesion.diferenciasUnidades > 0 ? '+' : ''}{sesion.diferenciasUnidades} unid.
                            </span>
                            <span className={`text-xs ${sesion.diferenciasValor > 0 ? 'text-green-600' : sesion.diferenciasValor < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                              €{sesion.diferenciasValor.toFixed(2)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex -space-x-2">
                            {sesion.responsables.slice(0, 3).map((responsable, idx) => (
                              <div
                                key={idx}
                                className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center border-2 border-white text-xs text-white font-medium"
                                title={responsable}
                              >
                                {responsable.split(' ').map(n => n[0]).join('')}
                              </div>
                            ))}
                            {sesion.responsables.length > 3 && (
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white text-xs text-gray-600 font-medium">
                                +{sesion.responsables.length - 3}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {getEstadoSesionBadge(sesion.estado)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== TRANSFERENCIAS ===== */}
        <TabsContent value="transferencias" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Transferencias entre Almacenes
                  </h3>
                  <p className="text-sm text-gray-600">
                    Movimientos de café entre ubicaciones
                  </p>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Transferencia
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Transferencia</TableHead>
                      <TableHead>Origen</TableHead>
                      <TableHead>Destino</TableHead>
                      <TableHead className="text-center">SKUs</TableHead>
                      <TableHead>Responsable</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-center">Estado</TableHead>
                      <TableHead className="text-center">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transferencias.map((transferencia) => (
                      <TableRow key={transferencia.id}>
                        <TableCell className="font-medium">{transferencia.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {transferencia.origen}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                            {transferencia.destino}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold">
                          {transferencia.skus}
                        </TableCell>
                        <TableCell>{transferencia.responsable}</TableCell>
                        <TableCell>
                          {new Date(transferencia.fecha).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell className="text-center">
                          {getEstadoTransferenciaBadge(transferencia.estado)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
