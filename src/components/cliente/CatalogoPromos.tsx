import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ProductoDetalle } from './ProductoDetalle';
import { ProductoPersonalizacionModal } from '../ProductoPersonalizacionModal';
// import { productosPanaderia } from '../../data/productos-panaderia';
import { 
  Search, 
  Filter, 
  Plus, 
  ShoppingCart,
  Tag,
  Calendar,
  Package,
  Pizza,
  Beef,
  Coffee,
  IceCream,
  Wine,
  X,
  Minus
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  precioAnterior?: number;
  stock: number;
  descripcion: string;
  marca?: string;
  destacado?: boolean;
  imagen?: string;
}

interface Promocion {
  id: string;
  titulo: string;
  descripcion: string;
  descuento: string;
  validoHasta: string;
  tipo: 'servicio' | 'producto' | 'paquete';
  precioOriginal?: number;
  precioFinal?: number;
  destacada?: boolean;
  imagen?: string;
}

export function CatalogoPromos() {
  const [activeTab, setActiveTab] = useState('catalogo');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todos');
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [complementosSeleccionados, setComplementosSeleccionados] = useState<string[]>([]);
  const [bebidasSeleccionadas, setBebidasSeleccionadas] = useState<string[]>([]);
  const [productoPersonalizable, setProductoPersonalizable] = useState<any | null>(null);
  const [showPersonalizacionModal, setShowPersonalizacionModal] = useState(false);

  // Productos reales desde backend
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    fetch('https://mytreefam.com/sass/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(() => setProductos([]));
  }, []);

  // Promociones reales desde backend
  const [promociones, setPromociones] = useState<Promocion[]>([]);

  useEffect(() => {
    fetch('https://mytreefam.com/sass/api/promociones')
      .then(res => res.json())
      .then(data => setPromociones(data))
      .catch(() => setPromociones([]));
  }, []);

  const productosFiltrados = productos.filter(producto => {
    const matchSearch = producto.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       producto.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       producto.marca?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategoria = categoriaFiltro === 'todos' || 
                          producto.categoria.toLowerCase() === categoriaFiltro.toLowerCase();
    return matchSearch && matchCategoria;
  });

  const categorias = Array.from(new Set(productos.map(p => p.categoria)));

  const handleAnadirCarrito = (producto: Producto) => {
    // Si el producto es personalizable, abre el detalle
    if (producto.categoria === 'Café' || producto.categoria === 'Mezclas') {
      setProductoSeleccionado(producto);
      return;
    }
    // Agregar al carrito en localStorage
    try {
      const stored = localStorage.getItem('carrito');
      console.log('Carrito antes:', stored);
      const carrito = stored ? JSON.parse(stored) : [];
      const item = {
        id: producto.id,
        nombre: producto.nombre,
        categoria: producto.categoria,
        precio: producto.precio,
        cantidad: 1,
        imagen: producto.imagen || '',
        observaciones: producto.descripcion || '',
        complementos: [],
        bebidas: [],
        total: producto.precio
      };
      carrito.push(item);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      console.log('Carrito después:', localStorage.getItem('carrito'));
      toast.success(`${producto.nombre} añadido al carrito`);
    } catch (e) {
      console.error('Error al agregar al carrito:', e);
      toast.error('No se pudo agregar al carrito');
    }
  };

  const handleAddToCartPersonalizado = (producto: any, opciones: any, cantidad: number) => {
    toast.success(`${producto.nombre} personalizado añadido asssl carrito (x${cantidad})`);
    console.log('Producto personalizado:', { producto, opciones, cantidad });
  };

  const handleAplicarPromo = (promo: Promocion) => {
    toast.success(`Promoción "${promo.titulo}" aplicada`);
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria.toLowerCase()) {
      case 'café':
        return <Coffee className="w-5 h-5" />;
      case 'mezclas':
        return <Coffee className="w-5 h-5" />;
      case 'hamburguesas':
        return <Beef className="w-5 h-5" />;
      case 'pizzas':
        return <Pizza className="w-5 h-5" />;
      case 'bebidas':
        return <Wine className="w-5 h-5" />;
      case 'postres':
        return <IceCream className="w-5 h-5" />;
      case 'complementos':
        return <Coffee className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  // Si hay un producto seleccionado, mostrar vista detallada
  if (productoSeleccionado) {
    const complementos = productos.filter(p => p.categoria === 'Complementos');
    const bebidas = productos.filter(p => p.categoria === 'Bebidas');

    return (
      <ProductoDetalle
        producto={productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
        complementos={complementos}
        bebidas={bebidas}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="promos">
            <Tag className="w-4 h-4 mr-2" />
            Promociones
            <Badge className="ml-2 bg-orange-600 text-white h-5 px-1.5">
              {promociones.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="catalogo">
            <Package className="w-4 h-4 mr-2" />
            Productos Can Farines
          </TabsTrigger>
        </TabsList>

        {/* Tab Catálogo */}
        <TabsContent value="catalogo" className="space-y-4 mt-6">
          {/* Barra de Búsqueda - más delgada */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
          </div>

          {/* Filtros visuales de categorías - más pequeños y sin iconos */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={categoriaFiltro === 'todos' ? 'default' : 'outline'}
              size="sm"
              className={`flex-shrink-0 px-3 py-1 h-8 text-xs ${
                categoriaFiltro === 'todos' 
                  ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setCategoriaFiltro('todos')}
            >
              Todos
            </Button>

            {categorias.map((cat) => (
              <Button
                key={cat}
                variant={categoriaFiltro === (cat?.toLowerCase?.() ?? '') ? 'default' : 'outline'}
                size="sm"
                className={`flex-shrink-0 px-3 py-1 h-8 text-xs ${
                  categoriaFiltro === (cat?.toLowerCase?.() ?? '')
                    ? 'bg-teal-600 hover:bg-teal-700 text-white'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setCategoriaFiltro(cat?.toLowerCase?.() ?? '')}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Resultados */}
          <p className="text-sm text-gray-600">
            Mostrando {productosFiltrados.length} de {productos.length} productos
          </p>

          {/* Listado de Productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {productosFiltrados.map((producto) => (
              <Card 
                key={producto.id} 
                className={`overflow-hidden hover:shadow-md transition-shadow ${
                  producto.destacado ? 'border-teal-200 ring-1 ring-teal-200' : ''
                }`}
              >
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  {producto.imagen ? (
                    <ImageWithFallback 
                      src={producto.imagen} 
                      alt={producto.nombre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                      {getCategoriaIcon(producto.categoria)}
                    </div>
                  )}
                  {producto.destacado && (
                    <Badge className="absolute top-2 right-2 bg-teal-600 text-white">
                      Destacado
                    </Badge>
                  )}
                  {producto.precioAnterior && (
                    <Badge className="absolute top-2 left-2 bg-red-600 text-white">
                      Oferta
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {producto.categoria}
                  </Badge>
                  {producto.marca && (
                    <p className="text-xs text-gray-500 mb-1">{producto.marca}</p>
                  )}
                  <h3 className="font-medium mb-1 line-clamp-2">{producto.nombre}</h3>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{producto.descripcion}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    {producto.precioAnterior && (
                      <p className="text-sm text-gray-400 line-through">
                        €{producto.precioAnterior.toFixed(2)}
                      </p>
                    )}
                    <p className="text-xl font-semibold text-teal-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      €{producto.precio.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-gray-500">
                      Stock: {producto.stock > 10 ? '✓ Disponible' : `Solo ${producto.stock}`}
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    onClick={() => handleAnadirCarrito(producto)}
                    disabled={producto.stock === 0}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Añadir al carrito
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {productosFiltrados.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">No se encontraron productos</h3>
                <p className="text-sm text-gray-500">
                  Intenta con otros términos de búsqueda o cambia los filtros
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tab Promos */}
        <TabsContent value="promos" className="space-y-4 mt-6">
          {promociones.map((promo) => (
            <Card 
              key={promo.id} 
              className={`overflow-hidden ${
                promo.destacada 
                  ? 'border-orange-200 bg-gradient-to-r from-orange-50 to-white' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex flex-col md:flex-row">
                {/* Imagen de la promoción */}
                <div className="w-full md:w-48 h-48 md:h-auto relative overflow-hidden bg-gray-100">
                  <ImageWithFallback 
                    src={promo.imagen || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400'} 
                    alt={promo.titulo}
                    className="w-full h-full object-cover"
                  />
                  {promo.destacada && (
                    <Badge className="absolute top-2 right-2 bg-orange-600 text-white">
                      ¡Popular!
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-6 flex-1">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              {promo.titulo}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{promo.descripcion}</p>
                        </div>
                        <Badge className={`shrink-0 ml-2 ${
                          promo.destacada 
                            ? 'bg-orange-600 text-white' 
                            : 'bg-teal-600 text-white'
                        }`}>
                          {promo.descuento}
                        </Badge>
                      </div>

                      {promo.precioOriginal && promo.precioFinal && (
                        <div className="flex items-center gap-3 mb-3">
                          <p className="text-sm text-gray-400 line-through">
                            €{promo.precioOriginal.toFixed(2)}
                          </p>
                          <p className="text-2xl font-semibold text-teal-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            €{promo.precioFinal.toFixed(2)}
                          </p>
                          <p className="text-sm text-green-600 font-medium">
                            Ahorras €{(promo.precioOriginal - promo.precioFinal).toFixed(2)}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Válido hasta {promo.validoHasta ? new Date(promo.validoHasta).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          className={
                            promo.destacada 
                              ? 'bg-orange-600 hover:bg-orange-700' 
                              : 'bg-teal-600 hover:bg-teal-700'
                          }
                          onClick={() => handleAplicarPromo(promo)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Aplicar Promoción
                        </Button>
                        <Button variant="outline">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Modal de Personalización de Producto */}
      <ProductoPersonalizacionModal
        producto={productoPersonalizable}
        isOpen={showPersonalizacionModal}
        onClose={() => {
          setShowPersonalizacionModal(false);
          setProductoPersonalizable(null);
        }}
        onAddToCart={handleAddToCartPersonalizado}
      />
    </div>
  );
}