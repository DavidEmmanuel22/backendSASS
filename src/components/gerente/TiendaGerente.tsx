import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { 
  Search, 
  ShoppingCart,
  Calculator,
  CheckCircle,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  DollarSign,
  User,
  Phone,
  FileText,
  X,
  Coffee
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ProductoDetalleModal } from '../ProductoDetalleModal';
import { ProductoPersonalizacionModal } from '../ProductoPersonalizacionModal';
import { productosPanaderia } from '../../data/productos-panaderia';
import { productosPersonalizables } from '../../data/productos-personalizables';
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

export function TiendaGerente() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState<string>('todos');
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [modalCliente, setModalCliente] = useState(false);
  const [busquedaCliente, setBusquedaCliente] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [pedidoIniciado, setPedidoIniciado] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [turnoLlamado, setTurnoLlamado] = useState<string | null>(null);
  const [pedidoPagado, setPedidoPagado] = useState(false);
  const [showConfirmarEntrega, setShowConfirmarEntrega] = useState(false);

  // Turnos en espera
  const turnosEnEspera = ['A-22', 'A-23', 'A-24', 'A-25'];
  
  // Pedidos de ejemplo para los turnos (simulación)
  const pedidosTurnos: Record<string, { items: ItemCarrito[], pagado: boolean }> = {
    'A-22': {
      pagado: true,
      items: [
        {
          producto: productosPanaderia[22], // Croissant
          cantidad: 2
        },
        {
          producto: productosPanaderia[64], // Café
          cantidad: 2
        }
      ]
    },
    'A-23': {
      pagado: false,
      items: [
        {
          producto: productosPanaderia[47], // Bocadillo frío
          cantidad: 1
        },
        {
          producto: productosPanaderia[64], // Café
          cantidad: 1
        },
        {
          producto: productosPanaderia[63], // Zumo
          cantidad: 1
        }
      ]
    },
    'A-24': {
      pagado: false,
      items: [
        {
          producto: productosPanaderia[23], // Napolitana de chocolate
          cantidad: 3
        },
        {
          producto: productosPanaderia[64], // Café
          cantidad: 2
        }
      ]
    },
    'A-25': {
      pagado: true,
      items: [
        {
          producto: productosPanaderia[14], // Pan de masa madre (trigo)
          cantidad: 1
        },
        {
          producto: productosPanaderia[48], // Bocadillo caliente
          cantidad: 1
        },
        {
          producto: productosPanaderia[61], // Agua
          cantidad: 2
        }
      ]
    }
  };

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
    { id: 'todos', label: 'Todos' },
    { id: 'Pan básico', label: 'Pan Básico' },
    { id: 'Pan de masa madre', label: 'Masa Madre' },
    { id: 'Bollería simple', label: 'Bollería' },
    { id: 'Pasteles individuales', label: 'Pasteles' },
    { id: 'Bocadillos', label: 'Bocadillos' },
    { id: 'Empanadas', label: 'Empanadas' },
    { id: 'Bebidas calientes', label: 'Bebidas Calientes' },
    { id: 'Bebidas frías', label: 'Bebidas Frías' }
  ];

  const productosFiltrados = productos.filter(producto => {
    const matchBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const matchCategoria = categoriaActiva === 'todos' || producto.categoria === categoriaActiva;
    return matchBusqueda && matchCategoria;
  });

  const agregarAlCarrito = (producto: Producto, cantidad: number = 1, tipo?: 'grano' | 'molido', peso?: '250g' | '1kg') => {
    // Calcular precio según el peso
    let precioFinal = producto.precio;
    if (peso === '1kg') {
      precioFinal = producto.precio * 3.5;
    }

    // Crear un ID único para el item considerando tipo y peso
    const itemId = tipo && peso ? `${producto.id}-${tipo}-${peso}` : producto.id;
    
    const itemExistente = carrito.find(item => {
      if (tipo && peso) {
        return item.producto.id === producto.id && item.tipo === tipo && item.peso === peso;
      }
      return item.producto.id === producto.id;
    });
    
    if (itemExistente) {
      setCarrito(carrito.map(item => {
        if (tipo && peso) {
          return (item.producto.id === producto.id && item.tipo === tipo && item.peso === peso)
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item;
        }
        return item.producto.id === producto.id 
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item;
      }));
    } else {
      const nuevoItem: ItemCarrito = {
        producto: { ...producto, precio: precioFinal },
        cantidad,
        tipo,
        peso
      };
      setCarrito([...carrito, nuevoItem]);
    }
    
    const descripcionItem = tipo && peso ? `${producto.nombre} (${tipo}, ${peso})` : producto.nombre;
    toast.success(`${descripcionItem} añadido al pedido`);
  };

  const handleProductoClick = (producto: Producto) => {
    const esCafe = producto.categoria === 'Café' || producto.categoria === 'Mezclas';
    
    if (esCafe) {
      setProductoSeleccionado(producto);
      setShowDetalleModal(true);
    } else {
      agregarAlCarrito(producto);
    }
  };

  const aumentarCantidad = (productoId: string) => {
    setCarrito(carrito.map(item => 
      item.producto.id === productoId 
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    ));
  };

  const disminuirCantidad = (productoId: string) => {
    const item = carrito.find(i => i.producto.id === productoId);
    if (item && item.cantidad > 1) {
      setCarrito(carrito.map(i => 
        i.producto.id === productoId 
          ? { ...i, cantidad: i.cantidad - 1 }
          : i
      ));
    } else {
      eliminarDelCarrito(productoId);
    }
  };

  const eliminarDelCarrito = (productoId: string) => {
    setCarrito(carrito.filter(item => item.producto.id !== productoId));
    toast.info('Producto eliminado del pedido');
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
  };

  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  const vaciarCarrito = () => {
    setCarrito([]);
    toast.info('Pedido vaciado');
  };

  const procesarPedido = () => {
    if (carrito.length === 0) {
      toast.error('El pedido está vacío');
      return;
    }
    
    toast.success('Pedido procesado correctamente');
    setCarrito([]);
  };

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

  const handleClickEntrega = () => {
    if (pedidoPagado) {
      setShowConfirmarEntrega(true);
    }
  };

  const confirmarEntrega = () => {
    // Resetear el pedido a estado inicial
    setCarrito([]);
    setPedidoIniciado(false);
    setPedidoPagado(false);
    setTurnoLlamado(null);
    setClienteSeleccionado(null);
    setShowConfirmarEntrega(false);
    toast.success('Pedido entregado correctamente');
  };

  return (
    <div className="space-y-6">
      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className={`bg-gradient-to-br border-0 text-white transition-all ${
            !pedidoIniciado 
              ? 'from-teal-500 to-teal-600 cursor-pointer hover:from-teal-600 hover:to-teal-700' 
              : turnoLlamado 
                ? 'from-orange-500 to-orange-600'
                : 'from-teal-500 to-teal-600'
          }`}
          onClick={!pedidoIniciado ? abrirModalCliente : undefined}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                {!pedidoIniciado ? (
                  <p className="text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Empezar
                  </p>
                ) : turnoLlamado ? (
                  <>
                    <p className="text-orange-100 text-sm mb-1">Turno Llamado</p>
                    <p className="text-3xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {turnoLlamado}
                    </p>
                    <p className="text-sm text-orange-100 mt-1">
                      {totalItems} items en pedido
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-teal-100 mb-1">Pedido</p>
                    <p className="text-3xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {totalItems} items
                    </p>
                    {clienteSeleccionado && (
                      <p className="text-sm text-teal-100 mt-1 truncate">
                        {clienteSeleccionado.nombre}
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                {!pedidoIniciado ? (
                  <Plus className="w-8 h-8" />
                ) : (
                  <ShoppingCart className="w-8 h-8" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`bg-gradient-to-br border-0 text-white ${pedidoPagado ? 'from-yellow-500 to-yellow-600' : 'from-blue-500 to-blue-600'}`}>
          <CardContent className="p-6">
            <div 
              className={`flex items-center justify-between ${pedidoPagado ? 'cursor-pointer' : ''}`}
              onClick={handleClickEntrega}
            >
              <div>
                <p className={`${pedidoPagado ? 'text-yellow-100' : 'text-blue-100'} mb-1`}>
                  {pedidoPagado ? 'Pedido Pagado' : 'Total a cobrar'}
                </p>
                <p className="text-3xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {pedidoPagado ? 'Entregar' : `${calcularTotal().toFixed(2)}€`}
                </p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                {pedidoPagado ? (
                  <CheckCircle className="w-8 h-8" />
                ) : (
                  <Calculator className="w-8 h-8" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 mb-1">Estado TPV</p>
                <p className="text-3xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Operativo
                </p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Products */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Productos
              </h2>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar productos..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10 bg-gray-50"
                />
              </div>

              {/* Category Filters */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {categorias.map(cat => (
                  <Button
                    key={cat.id}
                    onClick={() => setCategoriaActiva(cat.id)}
                    variant={categoriaActiva === cat.id ? 'default' : 'outline'}
                    className={
                      categoriaActiva === cat.id 
                        ? 'bg-teal-600 hover:bg-teal-700 whitespace-nowrap' 
                        : 'whitespace-nowrap'
                    }
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
                {productosFiltrados.map(producto => (
                  <Card 
                    key={producto.id} 
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => handleProductoClick(producto)}
                  >
                    <div className="relative">
                      <ImageWithFallback
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-full h-40 object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-gray-900/80 text-white border-0">
                        {producto.categoria}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1 group-hover:text-teal-600 transition-colors">
                        {producto.nombre}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                        {producto.descripcion}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-teal-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {producto.precio.toFixed(2)}€
                        </p>
                        <p className="text-sm text-gray-500">
                          Stock: {producto.stock}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Current Order */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <div className="space-y-3 mb-4">
                <h2 className="text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Pedido Actual
                </h2>
                {turnoLlamado && carrito.length > 0 && (
                  <Badge 
                    className={`${pedidoPagado ? 'bg-green-100 text-green-800 border-green-300' : 'bg-orange-100 text-orange-800 border-orange-300'} border`}
                  >
                    {pedidoPagado ? '✓ Pagado' : '⏳ Pendiente de pago'}
                  </Badge>
                )}
              </div>

              {carrito.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-1">No hay productos en el pedido</p>
                  <p className="text-sm text-gray-500">Selecciona productos para comenzar</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto">
                    {carrito.map(item => (
                      <div key={item.producto.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <ImageWithFallback
                          src={item.producto.imagen}
                          alt={item.producto.nombre}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm mb-1 truncate">{item.producto.nombre}</h4>
                          <p className="text-teal-600 text-sm mb-2">{item.producto.precio.toFixed(2)}€</p>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 w-7 p-0"
                              onClick={() => disminuirCantidad(item.producto.id)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.cantidad}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 w-7 p-0"
                              onClick={() => aumentarCantidad(item.producto.id)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 ml-auto text-red-600 hover:text-red-700"
                              onClick={() => eliminarDelCarrito(item.producto.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">{calcularTotal().toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">IVA (10%):</span>
                      <span className="font-medium">{(calcularTotal() * 0.1).toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Total:</span>
                      <span className="text-teal-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {(calcularTotal() * 1.1).toFixed(2)}€
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-teal-600 hover:bg-teal-700"
                      onClick={procesarPedido}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Procesar Pago
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={vaciarCarrito}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Vaciar Pedido
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

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
                <h3 className="font-semibold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
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

      {/* Modal Detalle Producto */}
      <ProductoDetalleModal
        producto={productoSeleccionado}
        isOpen={showDetalleModal}
        onClose={() => setShowDetalleModal(false)}
        onAddToCart={agregarAlCarrito}
      />

      {/* Modal Confirmar Entrega */}
      <Dialog open={showConfirmarEntrega} onOpenChange={setShowConfirmarEntrega}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              Confirmar Entrega del Pedido
            </DialogTitle>
            <DialogDescription>
              ¿Confirmas que has entregado el pedido al cliente?
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-teal-600" />
              </div>
            </div>
            <p className="text-center text-sm text-gray-600">
              Al confirmar, el pedido se marcará como entregado y se reiniciará el TPV para el siguiente cliente.
            </p>
          </div>

          <div className="space-y-2">
            <Button
              className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12"
              onClick={confirmarEntrega}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Sí, confirmar entrega
            </Button>
            <Button
              variant="outline"
              className="w-full h-12"
              onClick={() => setShowConfirmarEntrega(false)}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Cancelar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}