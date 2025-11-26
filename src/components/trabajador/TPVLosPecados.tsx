import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ProductoDetalleModal } from '../ProductoDetalleModal';
import { EstadoTPVModal } from './EstadoTPVModal';
import { productosPanaderia } from '../../data/productos-panaderia';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Search, 
  Plus, 
  Minus,
  Trash2,
  ShoppingCart,
  CreditCard,
  Banknote,
  Pizza,
  Beef,
  Coffee,
  IceCream,
  X,
  Check,
  Calculator,
  Printer,
  Receipt,
  User,
  Phone,
  Lock,
  Unlock
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  descripcion: string;
  destacado?: boolean;
  imagen?: string;
}

interface ItemCarrito {
  producto: Producto;
  cantidad: number;
  subtotal: number;
  tipo?: 'grano' | 'molido';
  peso?: '250g' | '1kg';
}

interface Cliente {
  id: string;
  nombre: string;
  telefono: string;
  direccion?: string;
  email?: string;
}

export function TPVLosPecados() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [showPagoDialog, setShowPagoDialog] = useState(false);
  const [metodoPago, setMetodoPago] = useState<'efectivo' | 'tarjeta' | null>(null);
  const [montoPagado, setMontoPagado] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  
  // Estados para gestión de clientes y pedidos
  const [modalCliente, setModalCliente] = useState(false);
  const [busquedaCliente, setBusquedaCliente] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [pedidoIniciado, setPedidoIniciado] = useState(false);
  const [turnoLlamado, setTurnoLlamado] = useState<string | null>(null);
  const [pedidoPagado, setPedidoPagado] = useState(false);
  
  // Estados para Estado TPV
  const [tpvAbierto, setTpvAbierto] = useState(true);
  const [showEstadoTPVModal, setShowEstadoTPVModal] = useState(false);
  const [operacionTPV, setOperacionTPV] = useState<'Apertura' | 'Cierre' | 'Arqueo' | 'Consumo Propio' | 'Retiradas'>('Apertura');
  
  // Cantidades de efectivo
  const [cantidades, setCantidades] = useState({
    '0.01': 0,
    '0.02': 0,
    '0.05': 0,
    '0.10': 0,
    '0.20': 0,
    '0.50': 0,
    '1': 0,
    '2': 0,
    '5': 0,
    '10': 0,
    '20': 0,
    '50': 0,
    '100': 0,
    '200': 0,
    '500': 0
  });
  
  // Turnos en espera con pedidos simulados
  const turnosEnEspera = ['A-22', 'A-23', 'A-24', 'A-25'];
  
  // Pedidos de ejemplo para los turnos (simulación)
  const pedidosTurnos: Record<string, { items: ItemCarrito[], pagado: boolean }> = {
    'A-22': {
      pagado: true,
      items: [
        {
          producto: productosPanaderia[22], // Croissant
          cantidad: 2,
          subtotal: productosPanaderia[22].precio * 2
        },
        {
          producto: productosPanaderia[64], // Café
          cantidad: 2,
          subtotal: productosPanaderia[64].precio * 2
        }
      ]
    },
    'A-23': {
      pagado: false,
      items: [
        {
          producto: productosPanaderia[47], // Bocadillo frío
          cantidad: 1,
          subtotal: productosPanaderia[47].precio
        },
        {
          producto: productosPanaderia[64], // Café
          cantidad: 1,
          subtotal: productosPanaderia[64].precio
        },
        {
          producto: productosPanaderia[63], // Zumo
          cantidad: 1,
          subtotal: productosPanaderia[63].precio
        }
      ]
    },
    'A-24': {
      pagado: false,
      items: [
        {
          producto: productosPanaderia[23], // Napolitana de chocolate
          cantidad: 3,
          subtotal: productosPanaderia[23].precio * 3
        },
        {
          producto: productosPanaderia[64], // Café
          cantidad: 2,
          subtotal: productosPanaderia[64].precio * 2
        }
      ]
    },
    'A-25': {
      pagado: true,
      items: [
        {
          producto: productosPanaderia[14], // Pan de masa madre (trigo)
          cantidad: 1,
          subtotal: productosPanaderia[14].precio
        },
        {
          producto: productosPanaderia[48], // Bocadillo caliente
          cantidad: 1,
          subtotal: productosPanaderia[48].precio
        },
        {
          producto: productosPanaderia[61], // Agua
          cantidad: 2,
          subtotal: productosPanaderia[61].precio * 2
        }
      ]
    }
  };

  // Clientes registrados
  const clientesRegistrados: Cliente[] = [
    {
      id: 'CLI-001',
      nombre: 'María García López',
      telefono: '678 123 456',
      direccion: 'Calle Mayor 45, 3°B, Madrid',
      email: 'maria.garcia@email.com'
    },
    {
      id: 'CLI-002',
      nombre: 'Carlos Martínez Ruiz',
      telefono: '645 987 321',
      direccion: 'Av. de la Castellana 120, Madrid',
      email: 'carlos.martinez@email.com'
    },
    {
      id: 'CLI-003',
      nombre: 'Ana Rodríguez Pérez',
      telefono: '612 456 789',
      direccion: 'Plaza España 8, 2°A, Madrid',
      email: 'ana.rodriguez@email.com'
    },
    {
      id: 'CLI-004',
      nombre: 'Juan Fernández Silva',
      telefono: '689 234 567',
      direccion: 'Calle Alcalá 200, 1°C, Madrid',
      email: 'juan.fernandez@email.com'
    },
    {
      id: 'CLI-005',
      nombre: 'Laura Sánchez Torres',
      telefono: '655 789 123',
      direccion: 'Calle Goya 75, 4°A, Madrid',
      email: 'laura.sanchez@email.com'
    },
  ];

  const clientesFiltrados = clientesRegistrados.filter(cliente =>
    cliente.nombre.toLowerCase().includes(busquedaCliente.toLowerCase()) ||
    cliente.telefono.includes(busquedaCliente)
  );

  const productos: Producto[] = productosPanaderia.map(p => ({ ...p, categoria: p.categoria as string }));

  const categorias = [
    'todos',
    'Pan básico',
    'Pan de masa madre',
    'Bollería simple',
    'Pasteles individuales',
    'Bocadillos',
    'Empanadas',
    'Bebidas calientes',
    'Bebidas frías'
  ];

  const productosFiltrados = productos.filter(producto => {
    const matchBusqueda = producto.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategoria = categoriaActiva === 'todos' || producto.categoria === categoriaActiva;
    return matchBusqueda && matchCategoria;
  });

  const agregarAlCarrito = (producto: Producto) => {
    // Si es café o mezcla, abrir modal de detalle
    if (producto.categoria === 'Café' || producto.categoria === 'Mezclas') {
      setProductoSeleccionado(producto);
      setShowDetalleModal(true);
      return;
    }

    // Para otros productos, agregar directamente
    const itemExistente = carrito.find(item => item.producto.id === producto.id);
    
    if (itemExistente) {
      setCarrito(carrito.map(item =>
        item.producto.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1, subtotal: (item.cantidad + 1) * producto.precio }
          : item
      ));
    } else {
      setCarrito([...carrito, { producto, cantidad: 1, subtotal: producto.precio }]);
    }
    
    toast.success(`${producto.nombre} añadido al pedido`);
  };

  const agregarAlCarritoDesdeModal = (producto: Producto, cantidad: number, tipo: 'grano' | 'molido', peso: '250g' | '1kg') => {
    // Calcular precio según el peso
    let precioFinal = producto.precio;
    if (peso === '1kg') {
      precioFinal = precioFinal * 3.5;
    }

    const subtotal = precioFinal * cantidad;

    // Crear nombre personalizado
    const nombreCompleto = `${producto.nombre} (${tipo === 'grano' ? 'Grano' : 'Molido'}, ${peso})`;

    setCarrito([...carrito, { 
      producto: { ...producto, nombre: nombreCompleto, precio: precioFinal }, 
      cantidad, 
      subtotal,
      tipo,
      peso
    }]);
    
    toast.success(`${nombreCompleto} añadido al pedido`);
  };

  const modificarCantidad = (productoId: string, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId);
      return;
    }
    
    setCarrito(carrito.map(item =>
      item.producto.id === productoId
        ? { ...item, cantidad: nuevaCantidad, subtotal: nuevaCantidad * item.producto.precio }
        : item
    ));
  };

  const eliminarDelCarrito = (productoId: string) => {
    setCarrito(carrito.filter(item => item.producto.id !== productoId));
    toast.info('Producto eliminado del pedido');
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    toast.info('Pedido cancelado');
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.subtotal, 0);
  };

  const procesarPago = () => {
    if (!metodoPago) {
      toast.error('Selecciona un método de pago');
      return;
    }

    if (metodoPago === 'efectivo' && !montoPagado) {
      toast.error('Ingresa el monto pagado');
      return;
    }

    const total = calcularTotal();
    
    if (metodoPago === 'efectivo') {
      const pago = parseFloat(montoPagado);
      if (pago < total) {
        toast.error('El monto pagado es insuficiente');
        return;
      }
    }

    // Simular procesamiento de pago
    toast.success('Pago procesado correctamente');
    setCarrito([]);
    setShowPagoDialog(false);
    setMetodoPago(null);
    setMontoPagado('');
  };

  const calcularCambio = () => {
    const total = calcularTotal();
    const pago = parseFloat(montoPagado) || 0;
    return Math.max(0, pago - total);
  };

  // Funciones para gestión de clientes
  const abrirModalCliente = () => {
    setModalCliente(true);
  };

  const cerrarModalCliente = () => {
    setModalCliente(false);
    setBusquedaCliente('');
    setNombreCliente('');
    setTelefonoCliente('');
    setClienteSeleccionado(null);
  };

  const seleccionarCliente = (cliente: Cliente) => {
    setClienteSeleccionado(cliente);
    setModalCliente(false);
    setPedidoIniciado(true);
    toast.success(`Cliente ${cliente.nombre} seleccionado`);
  };

  const iniciarPedido = () => {
    if (!nombreCliente || !telefonoCliente) {
      toast.error('Por favor, completa los datos del cliente');
      return;
    }
    
    const nuevoCliente: Cliente = {
      id: `CLI-${Date.now()}`,
      nombre: nombreCliente,
      telefono: telefonoCliente,
    };
    
    setClienteSeleccionado(nuevoCliente);
    setModalCliente(false);
    setPedidoIniciado(true);
    toast.success(`Cliente ${nuevoCliente.nombre} registrado y seleccionado`);
  };

  const llamarTurno = (turno: string) => {
    setTurnoLlamado(turno);
    setPedidoIniciado(true);
    setModalCliente(false);
    
    // Cargar pedido del turno si existe
    const pedidoTurno = pedidosTurnos[turno];
    if (pedidoTurno) {
      setCarrito(pedidoTurno.items);
      setPedidoPagado(pedidoTurno.pagado);
      toast.success(`Turno ${turno} llamado - ${pedidoTurno.pagado ? 'Pedido pagado' : 'Pendiente de pago'}`);
    } else {
      setCarrito([]);
      setPedidoPagado(false);
      toast.success(`Turno ${turno} llamado`);
    }
  };

  const atenderSinDatos = () => {
    const clienteAnonimo: Cliente = {
      id: `CLI-ANONIMO-${Date.now()}`,
      nombre: 'Cliente sin datos',
      telefono: 'N/A',
    };
    
    setClienteSeleccionado(clienteAnonimo);
    setModalCliente(false);
    setPedidoIniciado(true);
    toast.success('Atendiendo cliente sin datos registrados');
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'Hamburguesas':
        return <Beef className="w-4 h-4" />;
      case 'Pizzas':
        return <Pizza className="w-4 h-4" />;
      case 'Bebidas':
        return <Coffee className="w-4 h-4" />;
      case 'Postres':
        return <IceCream className="w-4 h-4" />;
      case 'Complementos':
        return <Coffee className="w-4 h-4" />;
      default:
        return <Coffee className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className={`bg-gradient-to-br text-white transition-all ${
            !pedidoIniciado 
              ? 'from-teal-500 to-teal-600 cursor-pointer hover:from-teal-600 hover:to-teal-700' 
              : turnoLlamado 
                ? 'from-orange-500 to-orange-600'
                : 'from-teal-500 to-teal-600'
          }`}
          onClick={!pedidoIniciado ? abrirModalCliente : undefined}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                {!pedidoIniciado ? (
                  <p className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Empezar
                  </p>
                ) : turnoLlamado ? (
                  <>
                    <p className="text-orange-100 text-xs mb-1">Turno Llamado</p>
                    <p className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {turnoLlamado}
                    </p>
                    <p className="text-xs text-orange-100 mt-1">
                      {carrito.reduce((total, item) => total + item.cantidad, 0)} items
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-teal-100 text-sm">Items en pedido</p>
                    <p className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {carrito.reduce((total, item) => total + item.cantidad, 0)}
                    </p>
                    {clienteSeleccionado && (
                      <p className="text-sm text-teal-100 mt-1 truncate">
                        {clienteSeleccionado.nombre}
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                {!pedidoIniciado ? (
                  <Plus className="w-6 h-6" />
                ) : (
                  <ShoppingCart className="w-6 h-6" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`bg-gradient-to-br ${pedidoPagado ? 'from-yellow-500 to-yellow-600' : 'from-blue-500 to-blue-600'} text-white`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`${pedidoPagado ? 'text-yellow-100' : 'text-blue-100'} text-sm`}>
                  {pedidoPagado ? 'Pedido Pagado' : 'Total a cobrar'}
                </p>
                <p className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {pedidoPagado ? 'Entregar' : `${calcularTotal().toFixed(2)}€`}
                </p>
              </div>
              {pedidoPagado ? (
                <Check className="w-8 h-8 text-yellow-200" />
              ) : (
                <Calculator className="w-8 h-8 text-blue-200" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`bg-gradient-to-br ${tpvAbierto ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'} text-white cursor-pointer hover:opacity-90 transition-opacity`}
          onClick={() => setShowEstadoTPVModal(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`${tpvAbierto ? 'text-green-100' : 'text-red-100'} text-sm`}>Estado TPV</p>
                <p className="text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {tpvAbierto ? 'Operativo' : 'TPV Cerrado'}
                </p>
              </div>
              {tpvAbierto ? (
                <Check className="w-8 h-8 text-green-200" />
              ) : (
                <Lock className="w-8 h-8 text-red-200" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de Productos */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>Productos</CardTitle>
              {/* Buscador */}
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              {/* Filtros de categorías */}
              <div className="mb-4 overflow-x-auto">
                <div className="flex gap-2 pb-2">
                  {categorias.map(cat => (
                    <Button
                      key={cat}
                      onClick={() => setCategoriaActiva(cat)}
                      variant={categoriaActiva === cat ? "default" : "outline"}
                      size="sm"
                      className={`whitespace-nowrap ${
                        categoriaActiva === cat 
                          ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                          : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
                      }`}
                    >
                      {cat === 'todos' ? 'Todos' : cat}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Grid de productos */}
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[600px] overflow-y-auto">
                {productosFiltrados.map(producto => (
                  <button
                    key={producto.id}
                    onClick={() => agregarAlCarrito(producto)}
                    className="bg-white border rounded-lg p-3 hover:shadow-lg hover:border-teal-500 transition-all text-left group"
                  >
                    {producto.imagen && (
                      <div className="aspect-square mb-2 rounded-lg overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                    )}
                    <div className="flex items-start gap-1 mb-1">
                      {getCategoriaIcon(producto.categoria)}
                      <Badge variant="outline" className="text-xs">
                        {producto.categoria}
                      </Badge>
                    </div>
                    <p className="font-medium text-sm mb-1 line-clamp-2">{producto.nombre}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-teal-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {producto.precio.toFixed(2)}€
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        Stock: {producto.stock}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel del Carrito */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader className="pb-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>Pedido Actual</CardTitle>
                  {carrito.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={vaciarCarrito}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {turnoLlamado && carrito.length > 0 && (
                  <Badge 
                    className={`${pedidoPagado ? 'bg-green-100 text-green-800 border-green-300' : 'bg-orange-100 text-orange-800 border-orange-300'} border`}
                  >
                    {pedidoPagado ? '✓ Pagado' : '⏳ Pendiente de pago'}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {carrito.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No hay productos en el pedido</p>
                  <p className="text-sm mt-1">Selecciona productos para comenzar</p>
                </div>
              ) : (
                <>
                  {/* Lista de items */}
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {carrito.map(item => (
                      <div key={item.producto.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.producto.nombre}</p>
                            <p className="text-xs text-gray-600">{item.producto.precio.toFixed(2)}€ c/u</p>
                          </div>
                          <button
                            onClick={() => eliminarDelCarrito(item.producto.id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => modificarCantidad(item.producto.id, item.cantidad - 1)}
                              className="h-7 w-7 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.cantidad}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => modificarCantidad(item.producto.id, item.cantidad + 1)}
                              className="h-7 w-7 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="font-medium text-teal-600">
                            {item.subtotal.toFixed(2)}€
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{calcularTotal().toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">IVA (10%)</span>
                      <span>{(calcularTotal() * 0.1).toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Total
                      </span>
                      <span className="text-xl text-teal-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {(calcularTotal() * 1.1).toFixed(2)}€
                      </span>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="space-y-2">
                    <Button
                      onClick={() => setShowPagoDialog(true)}
                      className="w-full bg-teal-600 hover:bg-teal-700"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Cobrar Pedido
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => toast.info('Función de impresión en desarrollo')}
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Imprimir Ticket
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog de Pago */}
      <Dialog open={showPagoDialog} onOpenChange={setShowPagoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              Procesar Pago
            </DialogTitle>
            <DialogDescription>
              Total a cobrar: <span className="font-medium text-teal-600">{(calcularTotal() * 1.1).toFixed(2)}€</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Métodos de pago */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Método de Pago</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMetodoPago('efectivo')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    metodoPago === 'efectivo'
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Banknote className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <p className="text-sm font-medium">Efectivo</p>
                </button>
                <button
                  onClick={() => setMetodoPago('tarjeta')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    metodoPago === 'tarjeta'
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium">Tarjeta</p>
                </button>
              </div>
            </div>

            {/* Input de efectivo */}
            {metodoPago === 'efectivo' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Monto Recibido</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={montoPagado}
                  onChange={(e) => setMontoPagado(e.target.value)}
                  className="text-lg"
                />
                {montoPagado && parseFloat(montoPagado) >= calcularTotal() * 1.1 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      Cambio a devolver: <span className="font-medium">{calcularCambio().toFixed(2)}€</span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {metodoPago === 'tarjeta' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  Procesar pago con terminal bancaria
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPagoDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={procesarPago} className="bg-teal-600 hover:bg-teal-700">
              <Check className="w-4 h-4 mr-2" />
              Confirmar Pago
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Cliente */}
      <Dialog open={modalCliente} onOpenChange={cerrarModalCliente}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              Datos del Cliente
            </DialogTitle>
            <DialogDescription>
              Añade información del cliente para el pedido
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna Izquierda - Datos del Cliente */}
            <div className="space-y-4">
              {/* Búsqueda de Cliente */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar cliente por nombre o teléfono..."
                  value={busquedaCliente}
                  onChange={(e) => setBusquedaCliente(e.target.value)}
                  className="pl-10 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              {/* Lista de Clientes */}
              {busquedaCliente && clientesFiltrados.length > 0 && (
                <div className="space-y-2 max-h-40 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                  <p className="text-sm font-medium text-gray-700 mb-2">Clientes encontrados:</p>
                  {clientesFiltrados.map(cliente => (
                    <div 
                      key={cliente.id} 
                      className="flex items-center gap-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors"
                      onClick={() => seleccionarCliente(cliente)}
                    >
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{cliente.nombre}</p>
                        <p className="text-xs text-gray-500">{cliente.telefono}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          seleccionarCliente(cliente);
                        }}
                      >
                        Seleccionar
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Formulario Nuevo Cliente */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombreCliente" className="text-gray-700">
                    Nombre del Cliente
                  </Label>
                  <Input
                    id="nombreCliente"
                    placeholder="Nombre completo"
                    value={nombreCliente}
                    onChange={(e) => setNombreCliente(e.target.value)}
                    className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefonoCliente" className="text-gray-700">
                    Número de Móvil
                  </Label>
                  <Input
                    id="telefonoCliente"
                    placeholder="600 123 456"
                    value={telefonoCliente}
                    onChange={(e) => setTelefonoCliente(e.target.value)}
                    className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                <Button
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12"
                  onClick={iniciarPedido}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Guardar Datos
                </Button>

                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12"
                  onClick={atenderSinDatos}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Atender sin datos
                </Button>
              </div>
            </div>

            {/* Columna Derecha - Turnos en Espera */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Turnos en Espera
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Turnos pendientes de atención
                </p>
              </div>

              <div className="space-y-2">
                {turnosEnEspera.map((turno, index) => {
                  const pedido = pedidosTurnos[turno];
                  const estaListoParaEntregar = pedido?.pagado === true;
                  
                  return (
                    <Card 
                      key={turno}
                      className={estaListoParaEntregar 
                        ? 'bg-orange-50 border-orange-200 hover:bg-orange-100 transition-colors'
                        : 'bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors'
                      }
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-col ${
                              estaListoParaEntregar ? 'bg-orange-600' : 'bg-blue-600'
                            }`}>
                              <span className="text-white text-xs font-medium">
                                {turno.split('-')[0]}
                              </span>
                              <span className="text-white text-lg font-bold leading-none" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {turno.split('-')[1]}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">Turno {turno}</p>
                              <p className="text-xs text-gray-600">
                                {index === 0 ? 'Siguiente' : `Posición ${index + 1}`}
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className={estaListoParaEntregar 
                              ? 'bg-orange-600 hover:bg-orange-700 text-xs px-3 py-1 h-auto'
                              : 'bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1 h-auto'
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              llamarTurno(turno);
                            }}
                          >
                            Llamar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {turnosEnEspera.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">No hay turnos en espera</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Detalle de Producto */}
      <ProductoDetalleModal
        producto={productoSeleccionado}
        isOpen={showDetalleModal}
        onClose={() => setShowDetalleModal(false)}
        onAddToCart={agregarAlCarritoDesdeModal}
      />

      {/* Modal de Estado TPV */}
      <EstadoTPVModal
        isOpen={showEstadoTPVModal}
        onClose={() => setShowEstadoTPVModal(false)}
        onCerrarTPV={() => setTpvAbierto(false)}
      />
    </div>
  );
}