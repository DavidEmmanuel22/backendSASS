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
import { 
  Package,
  Search,
  Filter,
  MoreVertical,
  FileText,
  ShoppingCart,
  AlertCircle,
  CheckCircle2,
  XCircle,
  PackagePlus,
  History,
  Undo2,
  Receipt,
  Eye,
  Euro,
  Send,
  ArrowRightLeft
} from 'lucide-react';
import { AñadirMaterialModal } from './AñadirMaterialModal';
import { RecepcionMaterialModal } from './RecepcionMaterialModal';
import { productosPanaderia } from '../../data/productos-panaderia';
import { toast } from 'sonner@2.0.3';

interface Material {
  id: string;
  codigo: string;
  nombre: string;
  categoria: string;
  stock: number;
  minimo: number;
  ubicacion: string;
  estado: 'disponible' | 'bajo' | 'agotado';
  lote?: string;
  precio?: number;
}

interface Movimiento {
  id: string;
  tipo: 'ot' | 'venta_directa' | 'correccion';
  fecha: string;
  material: string;
  codigo: string;
  cantidad: number;
  ot?: string;
  cliente?: string;
  total?: number;
  metodoPago?: string;
  tipoDocumento?: 'ticket' | 'factura';
}

export function MaterialTrabajador() {
  const [vistaActual, setVistaActual] = useState<'inventario' | 'movimientos'>('inventario');
  
  // Inventario
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');
  const [ubicacionFiltro, setUbicacionFiltro] = useState('todas');
  const [estadoFiltro, setEstadoFiltro] = useState('todos');
  
  // Movimientos
  const [busquedaMovimiento, setBusquedaMovimiento] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('todos');
  const [fechaFiltro, setFechaFiltro] = useState('todos');
  
  const [materialModalOpen, setMaterialModalOpen] = useState(false);
  const [materialSeleccionado, setMaterialSeleccionado] = useState<Material | null>(null);
  const [recepcionModalOpen, setRecepcionModalOpen] = useState(false);
  const [modoVentaDirecta, setModoVentaDirecta] = useState(false);

  // Convertir productos de panadería CORE a formato de material
  const materiales: Material[] = productosPanaderia.map((producto, index) => {
    // Determinar estado según el stock
    let estado: 'disponible' | 'bajo' | 'agotado' = 'disponible';
    const minimo = 10; // Stock mínimo recomendado para cafés
    
    if (producto.stock === 0) {
      estado = 'agotado';
    } else if (producto.stock < minimo) {
      estado = 'bajo';
    }

    return {
      id: producto.id,
      codigo: producto.id,
      nombre: producto.nombre,
      categoria: producto.categoria,
      stock: producto.stock,
      minimo: minimo,
      ubicacion: 'PDV', // Punto de venta
      estado: estado,
      precio: producto.precio
    };
  });

  const movimientos: Movimiento[] = [
    {
      id: 'MOV001',
      tipo: 'ot',
      fecha: '2025-11-11T10:30:00',
      material: 'Barras de Pan Artesanal',
      codigo: 'PAN001',
      cantidad: 15,
      ot: 'PED-2025-001',
      cliente: 'Juan Pérez'
    },
    {
      id: 'MOV002',
      tipo: 'venta_directa',
      fecha: '2025-11-11T11:15:00',
      material: 'Croissants Mantequilla',
      codigo: 'CRSNT001',
      cantidad: 12,
      cliente: 'María García',
      total: 30.00,
      metodoPago: 'tarjeta',
      tipoDocumento: 'ticket'
    },
    {
      id: 'MOV003',
      tipo: 'correccion',
      fecha: '2025-11-11T12:00:00',
      material: 'Ensaimadas',
      codigo: 'ENSA001',
      cantidad: 8,
      ot: 'PED-2025-003',
      cliente: 'Pedro López'
    },
    {
      id: 'MOV004',
      tipo: 'ot',
      fecha: '2025-11-10T15:45:00',
      material: 'Coca-Cola 33cl',
      codigo: 'BEBIDA001',
      cantidad: 8,
      ot: 'PED-2025-002',
      cliente: 'Ana Martín'
    },
    {
      id: 'MOV005',
      tipo: 'venta_directa',
      fecha: '2025-11-10T09:20:00',
      material: 'Baguettes Francesas',
      codigo: 'BAG001',
      cantidad: 6,
      cliente: 'Venta mostrador',
      total: 18.00,
      metodoPago: 'efectivo',
      tipoDocumento: 'factura'
    },
  ];

  const categorias = ['todas', ...Array.from(new Set(materiales.map(m => m.categoria)))];
  const ubicaciones = ['todas', ...Array.from(new Set(materiales.map(m => m.ubicacion)))];

  const materialesFiltrados = materiales.filter(material => {
    const matchBusqueda = material.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                         material.codigo.toLowerCase().includes(busqueda.toLowerCase());
    const matchCategoria = categoriaFiltro === 'todas' || material.categoria === categoriaFiltro;
    const matchUbicacion = ubicacionFiltro === 'todas' || material.ubicacion === ubicacionFiltro;
    const matchEstado = estadoFiltro === 'todos' || material.estado === estadoFiltro;

    return matchBusqueda && matchCategoria && matchUbicacion && matchEstado;
  });

  const movimientosFiltrados = movimientos.filter(mov => {
    const matchBusqueda = mov.material.toLowerCase().includes(busquedaMovimiento.toLowerCase()) ||
                         mov.codigo.toLowerCase().includes(busquedaMovimiento.toLowerCase()) ||
                         mov.ot?.toLowerCase().includes(busquedaMovimiento.toLowerCase()) ||
                         mov.cliente?.toLowerCase().includes(busquedaMovimiento.toLowerCase());
    const matchTipo = tipoFiltro === 'todos' || mov.tipo === tipoFiltro;
    
    let matchFecha = true;
    if (fechaFiltro === 'hoy') {
      const hoy = new Date().toDateString();
      const fechaMov = new Date(mov.fecha).toDateString();
      matchFecha = hoy === fechaMov;
    } else if (fechaFiltro === 'semana') {
      const hace7dias = new Date();
      hace7dias.setDate(hace7dias.getDate() - 7);
      matchFecha = new Date(mov.fecha) >= hace7dias;
    }

    return matchBusqueda && matchTipo && matchFecha;
  });

  const handleRegistrarConsumo = (material: Material) => {
    setMaterialSeleccionado(material);
    setModoVentaDirecta(false);
    setMaterialModalOpen(true);
  };

  const handleVentaDirecta = (material: Material) => {
    setMaterialSeleccionado(material);
    setModoVentaDirecta(true);
    setMaterialModalOpen(true);
  };

  const handleSolicitar = (material: Material) => {
    toast.success(`Solicitud de "${material.nombre}" enviada al Gerente`);
    console.log('[NOTIFICACIÓN GERENTE] Nueva solicitud de material:', {
      material: material.nombre,
      codigo: material.codigo,
      stockActual: material.stock,
      minimo: material.minimo,
      solicitante: 'Colaborador'
    });
  };

  const handleVerFicha = (material: Material) => {
    toast.info(`Abriendo ficha de ${material.nombre}...`);
  };

  const handleMaterialRegistrado = (consumo: any) => {
    console.log('Material registrado:', consumo);
    setMaterialSeleccionado(null);
  };

  const handleDevolver = (movimiento: Movimiento) => {
    toast.info(`Procesando devolución de ${movimiento.material}...`);
    console.log('[DEVOLUCIÓN] Crear movimiento de ajuste:', {
      movimientoOriginal: movimiento.id,
      material: movimiento.material,
      cantidad: movimiento.cantidad,
      tipo: 'devolucion'
    });
  };

  const handleVerTicketFactura = (movimiento: Movimiento) => {
    if (movimiento.tipo === 'venta_directa') {
      toast.success(`Abriendo ${movimiento.tipoDocumento || 'documento'}...`);
      console.log(`[PDF] Visualizar ${movimiento.tipoDocumento}:`, movimiento);
    } else {
      toast.error('Solo disponible para ventas directas');
    }
  };

  const handleVerOT = (movimiento: Movimiento) => {
    if (movimiento.ot) {
      toast.info(`Abriendo ${movimiento.ot}...`);
      console.log('[NAVEGACIÓN] Ir a OT:', movimiento.ot);
    } else {
      toast.error('No tiene OT asociada');
    }
  };

  const getEstadoBadge = (material: Material) => {
    if (material.estado === 'agotado') {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          Sin stock
        </Badge>
      );
    } else if (material.estado === 'bajo') {
      return (
        <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          Stock bajo
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Disponible
        </Badge>
      );
    }
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'ot':
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">OT</Badge>;
      case 'venta_directa':
        return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Venta directa</Badge>;
      case 'correccion':
        return <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">Corrección</Badge>;
      default:
        return <Badge variant="outline">Otro</Badge>;
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header con estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-xl font-semibold text-gray-900">{materiales.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Disponibles</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {materiales.filter(m => m.estado === 'disponible').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Stock Bajo</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {materiales.filter(m => m.estado === 'bajo').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <History className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Movimientos</p>
                  <p className="text-xl font-semibold text-gray-900">{movimientos.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs: Inventario / Consumos y Ventas */}
        <Tabs value={vistaActual} onValueChange={(v) => setVistaActual(v as 'inventario' | 'movimientos')}>
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="inventario">
              <Package className="w-4 h-4 mr-2" />
              Inventario
            </TabsTrigger>
            <TabsTrigger value="movimientos">
              <History className="w-4 h-4 mr-2" />
              Consumos y Ventas
            </TabsTrigger>
          </TabsList>

          {/* ===== INVENTARIO ===== */}
          <TabsContent value="inventario" className="space-y-4 mt-4">
            {/* Filtros */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {/* Búsqueda */}
                  <div className="flex-1 w-full">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Buscar por código o nombre..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Botón Transferir Material */}
                  <Button
                    onClick={() => {
                      toast.info('Abriendo transferencia de material...');
                      console.log('[TRANSFERIR] Transferir material entre almacenes');
                    }}
                    variant="outline"
                    className="whitespace-nowrap border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    <ArrowRightLeft className="w-4 h-4 mr-2" />
                    Transferir material
                  </Button>

                  {/* Botón Recibir Material */}
                  <Button
                    onClick={() => setRecepcionModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 whitespace-nowrap"
                  >
                    <PackagePlus className="w-4 h-4 mr-2" />
                    Recibir material
                  </Button>

                  {/* Botón Merma */}
                  <Button
                    onClick={() => {
                      toast.info('Abriendo registro de merma...');
                      console.log('[MERMA] Registrar pérdida de productos');
                    }}
                    variant="outline"
                    className="whitespace-nowrap border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Merma
                  </Button>
                </div>

                {/* Filtros en segunda línea */}
                <div className="flex gap-2 flex-wrap">
                  <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
                    <SelectTrigger className="w-[160px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map(cat => (
                        <SelectItem key={cat} value={cat}>
                          {cat === 'todas' ? 'Todas las categorías' : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={ubicacionFiltro} onValueChange={setUbicacionFiltro}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      {ubicaciones.map(ubi => (
                        <SelectItem key={ubi} value={ubi}>
                          {ubi === 'todas' ? 'Todas' : ubi}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={estadoFiltro} onValueChange={setEstadoFiltro}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="disponible">Disponible</SelectItem>
                      <SelectItem value="bajo">Stock bajo</SelectItem>
                      <SelectItem value="agotado">Agotado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
            </Card>

            {/* Tabla de materiales */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Material</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead className="text-center">Stock</TableHead>
                        <TableHead>Ubicación</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Precio</TableHead>
                        <TableHead className="w-[100px]">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {materialesFiltrados.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                            No se encontraron materiales
                          </TableCell>
                        </TableRow>
                      ) : (
                        materialesFiltrados.map((material) => (
                          <TableRow key={material.id}>
                            <TableCell className="font-medium">{material.codigo}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-gray-900">{material.nombre}</p>
                                {material.lote && (
                                  <p className="text-xs text-gray-500">Lote: {material.lote}</p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{material.categoria}</TableCell>
                            <TableCell className="text-center">
                              <span className={`font-medium ${
                                material.stock === 0 ? 'text-red-600' :
                                material.stock < material.minimo ? 'text-orange-600' :
                                'text-gray-900'
                              }`}>
                                {material.stock}
                              </span>
                              <span className="text-gray-400 text-sm"> / {material.minimo}</span>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-gray-50">
                                {material.ubicacion}
                              </Badge>
                            </TableCell>
                            <TableCell>{getEstadoBadge(material)}</TableCell>
                            <TableCell className="text-right">
                              {material.precio ? `${material.precio.toFixed(2)} €` : '-'}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem 
                                    onClick={() => handleRegistrarConsumo(material)}
                                    disabled={material.stock === 0}
                                  >
                                    <Package className="w-4 h-4 mr-2" />
                                    Registrar consumo
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleVentaDirecta(material)}>
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Venta directa
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleSolicitar(material)}>
                                    <Send className="w-4 h-4 mr-2" />
                                    Solicitar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleVerFicha(material)}>
                                    <FileText className="w-4 h-4 mr-2" />
                                    Ver ficha
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ===== CONSUMOS Y VENTAS ===== */}
          <TabsContent value="movimientos" className="space-y-4 mt-4">
            {/* Filtros */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {/* Búsqueda */}
                  <div className="flex-1 w-full">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Buscar por material, OT o cliente..."
                        value={busquedaMovimiento}
                        onChange={(e) => setBusquedaMovimiento(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Filtros */}
                <div className="flex gap-2 flex-wrap">
                  <Select value={tipoFiltro} onValueChange={setTipoFiltro}>
                    <SelectTrigger className="w-[160px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="ot">Con OT</SelectItem>
                      <SelectItem value="venta_directa">Venta directa</SelectItem>
                      <SelectItem value="correccion">Corrección</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={fechaFiltro} onValueChange={setFechaFiltro}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Fecha" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas</SelectItem>
                      <SelectItem value="hoy">Hoy</SelectItem>
                      <SelectItem value="semana">Última semana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
            </Card>

            {/* Tabla de movimientos */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Material</TableHead>
                        <TableHead className="text-center">Cantidad</TableHead>
                        <TableHead>OT / Cliente</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="w-[120px]">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {movimientosFiltrados.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                            No se encontraron movimientos
                          </TableCell>
                        </TableRow>
                      ) : (
                        movimientosFiltrados.map((movimiento) => (
                          <TableRow key={movimiento.id}>
                            <TableCell>
                              <div>
                                <p className="text-sm">
                                  {new Date(movimiento.fecha).toLocaleDateString('es-ES')}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(movimiento.fecha).toLocaleTimeString('es-ES', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{getTipoBadge(movimiento.tipo)}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-sm">{movimiento.material}</p>
                                <p className="text-xs text-gray-500">{movimiento.codigo}</p>
                              </div>
                            </TableCell>
                            <TableCell className="text-center font-medium">
                              {movimiento.cantidad}
                            </TableCell>
                            <TableCell>
                              <div>
                                {movimiento.ot && (
                                  <p className="text-sm font-medium text-blue-600">{movimiento.ot}</p>
                                )}
                                <p className="text-sm text-gray-600">{movimiento.cliente}</p>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {movimiento.total ? `${movimiento.total.toFixed(2)} €` : '-'}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleDevolver(movimiento)}>
                                    <Undo2 className="w-4 h-4 mr-2" />
                                    Devolver
                                  </DropdownMenuItem>
                                  {movimiento.tipo === 'venta_directa' && (
                                    <DropdownMenuItem onClick={() => handleVerTicketFactura(movimiento)}>
                                      <Receipt className="w-4 h-4 mr-2" />
                                      Ver {movimiento.tipoDocumento}
                                    </DropdownMenuItem>
                                  )}
                                  {movimiento.ot && (
                                    <DropdownMenuItem onClick={() => handleVerOT(movimiento)}>
                                      <Eye className="w-4 h-4 mr-2" />
                                      Ver OT
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de añadir material */}
      <AñadirMaterialModal
        isOpen={materialModalOpen}
        onOpenChange={setMaterialModalOpen}
        onMaterialRegistrado={handleMaterialRegistrado}
        modoVentaDirecta={modoVentaDirecta}
      />

      {/* Modal de recepción de material */}
      <RecepcionMaterialModal
        isOpen={recepcionModalOpen}
        onOpenChange={setRecepcionModalOpen}
        onRecepcionCompletada={() => {
          toast.success('Material recibido y añadido al stock');
        }}
      />
    </>
  );
}