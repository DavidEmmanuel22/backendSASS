import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  X,
  Plus,
  Minus,
  ShoppingCart,
  Wine,
  Coffee,
  Check
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

interface ProductoDetalleProps {
  producto: Producto;
  onClose: () => void;
  complementos: Producto[];
  bebidas: Producto[];
}

export function ProductoDetalle({ producto, onClose, complementos, bebidas }: ProductoDetalleProps) {
    // Función para agregar al carrito en localStorage
    const addToCart = (item: any) => {
      try {
        const stored = localStorage.getItem('carrito');
        console.log('Carrito antes:', stored);
        const carrito = stored ? JSON.parse(stored) : [];
        carrito.push(item);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        console.log('Carrito después:', localStorage.getItem('carrito'));
      } catch (e) {
        console.error('Error al agregar al carrito:', e);
      }
    };
  const [cantidad, setCantidad] = useState(1);
  const [complementosSeleccionados, setComplementosSeleccionados] = useState<string[]>([]);
  const [bebidasSeleccionadas, setBebidasSeleccionadas] = useState<string[]>([]);
  const [tipoCafe, setTipoCafe] = useState<'grano' | 'molido'>('grano');
  const [pesoCafe, setPesoCafe] = useState<'250g' | '1kg'>('250g');

  const toggleComplemento = (id: string) => {
    setComplementosSeleccionados(prev => 
      prev.includes(id) 
        ? prev.filter(compId => compId !== id)
        : [...prev, id]
    );
  };

  const toggleBebida = (id: string) => {
    setBebidasSeleccionadas(prev => 
      prev.includes(id) 
        ? prev.filter(bebId => bebId !== id)
        : [...prev, id]
    );
  };

  const calcularTotal = () => {
    let precioBase = producto.precio;
    
    // Ajustar precio según el peso
    if (pesoCafe === '1kg') {
      precioBase = precioBase * 3.5; // 1kg cuesta 3.5x el precio de 250g
    }
    
    let total = precioBase * cantidad;
    
    complementosSeleccionados.forEach(id => {
      const comp = complementos.find(c => c.id === id);
      if (comp) total += comp.precio;
    });
    
    bebidasSeleccionadas.forEach(id => {
      const beb = bebidas.find(b => b.id === id);
      if (beb) total += beb.precio;
    });
    
    return total;
  };

  const handleAñadirAlCarrito = () => {
    // Construir el objeto del producto para el carrito
    const item = {
      id: producto.id,
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: producto.precio,
      cantidad,
      imagen: producto.imagen || '',
      observaciones: producto.descripcion || '',
      complementos: complementosSeleccionados.map(id => {
        const comp = complementos.find(c => c.id === id);
        return comp ? { id: comp.id, nombre: comp.nombre, precio: comp.precio } : null;
      }).filter(Boolean),
      bebidas: bebidasSeleccionadas.map(id => {
        const beb = bebidas.find(b => b.id === id);
        return beb ? { id: beb.id, nombre: beb.nombre, precio: beb.precio } : null;
      }).filter(Boolean),
      tipoCafe,
      pesoCafe,
      total: calcularTotal()
    };
    console.log('Producto a agregar:', item);
    addToCart(item);
    toast.success(`Añadido al carritosss: ${producto.nombre}`);
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Botón cerrar */}
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Personaliza tu pedido
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="rounded-full"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Ficha del Producto - Parte Superior */}
      <Card className="border-2 border-teal-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Imagen del producto */}
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            {producto.imagen ? (
              <ImageWithFallback 
                src={producto.imagen} 
                alt={producto.nombre}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <Coffee className="w-16 h-16 text-orange-400" />
              </div>
            )}
            {producto.destacado && (
              <Badge className="absolute top-3 right-3 bg-teal-600 text-white">
                Destacado
              </Badge>
            )}
            {producto.precioAnterior && (
              <Badge className="absolute top-3 left-3 bg-red-600 text-white">
                Oferta
              </Badge>
            )}
          </div>

          {/* Información del producto */}
          <div className="flex flex-col justify-between">
            <div>
              <Badge variant="outline" className="mb-2">
                {producto.categoria}
              </Badge>
              <h3 className="text-2xl mb-3 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {producto.nombre}
              </h3>
              <p className="text-gray-600 mb-4">
                {producto.descripcion}
              </p>
              
              <div className="flex items-center gap-3 mb-4">
                {producto.precioAnterior && (
                  <p className="text-lg text-gray-400 line-through">
                    €{producto.precioAnterior.toFixed(2)}
                  </p>
                )}
                <p className="text-3xl font-semibold text-teal-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  €{producto.precio.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm mb-4">
                <span className="text-gray-600">Stock:</span>
                <span className={producto.stock > 10 ? 'text-green-600' : 'text-orange-600'}>
                  {producto.stock > 10 ? '✓ Disponible' : `Solo ${producto.stock} unidades`}
                </span>
              </div>
            </div>

            {/* Selector de cantidad */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Cantidad:</p>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-xl min-w-[3rem] text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {cantidad}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Opciones de Café */}
      {(producto.categoria === 'Café' || producto.categoria === 'Mezclas') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tipo de Café */}
          <Card className="border-teal-200">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Tipo de Café:</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={tipoCafe === 'grano' ? 'default' : 'outline'}
                  className={tipoCafe === 'grano' ? 'bg-teal-600 hover:bg-teal-700' : ''}
                  onClick={() => setTipoCafe('grano')}
                >
                  Grano
                </Button>
                <Button
                  variant={tipoCafe === 'molido' ? 'default' : 'outline'}
                  className={tipoCafe === 'molido' ? 'bg-teal-600 hover:bg-teal-700' : ''}
                  onClick={() => setTipoCafe('molido')}
                >
                  Molido
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Peso */}
          <Card className="border-teal-200">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Peso:</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={pesoCafe === '250g' ? 'default' : 'outline'}
                  className={pesoCafe === '250g' ? 'bg-teal-600 hover:bg-teal-700' : ''}
                  onClick={() => setPesoCafe('250g')}
                >
                  <div className="text-center">
                    <div>250g</div>
                    <div className="text-xs opacity-80">€{producto.precio.toFixed(2)}</div>
                  </div>
                </Button>
                <Button
                  variant={pesoCafe === '1kg' ? 'default' : 'outline'}
                  className={pesoCafe === '1kg' ? 'bg-teal-600 hover:bg-teal-700' : ''}
                  onClick={() => setPesoCafe('1kg')}
                >
                  <div className="text-center">
                    <div>1kg</div>
                    <div className="text-xs opacity-80">€{(producto.precio * 3.5).toFixed(2)}</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Complementos */}
      {complementos.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Coffee className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Añade Complementos
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {complementos.map((comp) => {
              const isSelected = complementosSeleccionados.includes(comp.id);
              
              return (
                <Card
                  key={comp.id}
                  className={`cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-2 border-teal-600 bg-teal-50' 
                      : 'border hover:border-teal-300'
                  }`}
                  onClick={() => toggleComplemento(comp.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{comp.nombre}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                          {comp.descripcion}
                        </p>
                        <p className="font-semibold text-teal-600">
                          +€{comp.precio.toFixed(2)}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="ml-2 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Bebidas */}
      {bebidas.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Wine className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Añade Bebidas
            </h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {bebidas.map((beb) => {
              const isSelected = bebidasSeleccionadas.includes(beb.id);
              
              return (
                <Card
                  key={beb.id}
                  className={`cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-2 border-teal-600 bg-teal-50' 
                      : 'border hover:border-teal-300'
                  }`}
                  onClick={() => toggleBebida(beb.id)}
                >
                  <CardContent className="p-3">
                    <div className="text-center">
                      {beb.imagen && (
                        <div className="w-full aspect-square rounded-lg overflow-hidden mb-2 bg-gray-100">
                          <ImageWithFallback 
                            src={beb.imagen} 
                            alt={beb.nombre}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <h4 className="font-medium text-xs mb-1 line-clamp-2">{beb.nombre}</h4>
                      <p className="font-semibold text-teal-600 text-sm mb-2">
                        +€{beb.precio.toFixed(2)}
                      </p>
                      {isSelected && (
                        <div className="w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center mx-auto">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Resumen y Botón de Añadir al Carrito */}
      <Card className="sticky bottom-0 bg-white shadow-lg border-2 border-teal-600">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full sm:w-auto">
              <p className="text-sm text-gray-600 mb-1">Total del pedido:</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-semibold text-teal-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  €{calcularTotal().toFixed(2)}
                </p>
                {(complementosSeleccionados.length > 0 || bebidasSeleccionadas.length > 0) && (
                  <p className="text-sm text-gray-500">
                    ({cantidad}x producto + {complementosSeleccionados.length + bebidasSeleccionadas.length} extras)
                  </p>
                )}
              </div>
            </div>
            
            <Button
              onClick={handleAñadirAlCarrito}
              disabled={producto.stock === 0}
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 h-12 px-8"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Añadir al Carrito
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}