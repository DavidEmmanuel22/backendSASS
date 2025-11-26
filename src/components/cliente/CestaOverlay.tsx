import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '../ui/sheet';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Tag,
  CreditCard
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CestaOverlayProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  itemsEnCesta?: number;
}

export function CestaOverlay({ isOpen, onOpenChange, itemsEnCesta }: CestaOverlayProps) {
  const [cupon, setCupon] = useState('');
  const [productosEnCesta, setProductosEnCesta] = useState<any[]>([]);

  // Leer productos del carrito en localStorage al abrir la cesta
  // Actualiza productosEnCesta al abrir y si el carrito cambia en otra pestaña/componente
  React.useEffect(() => {
    const updateCesta = () => {
      try {
        const stored = localStorage.getItem('carrito');
        console.log('Carrito leído en CestaOverlay:', stored);
        setProductosEnCesta(stored ? JSON.parse(stored) : []);
      } catch (e) {
        console.error('Error leyendo carrito en CestaOverlay:', e);
        setProductosEnCesta([]);
      }
    };
    if (isOpen) {
      updateCesta();
    }
    window.addEventListener('storage', updateCesta);
    return () => {
      window.removeEventListener('storage', updateCesta);
    };
  }, [isOpen]);

  // Productos sugeridos para "También te puede interesar" (desde backend)
  const [productosSugeridos, setProductosSugeridos] = useState<any[]>([]);
  React.useEffect(() => {
    fetch('http://localhost:4000/productos')
      .then(res => res.json())
      .then(data => {
        // Filtrar productos que no estén ya en la cesta (asegurando tipo de id)
        const idsEnCesta = new Set(productosEnCesta.map(p => String(p.id)));
        const sugeridos = Array.isArray(data)
          ? data.filter((p: any) => !idsEnCesta.has(String(p.id))).slice(0, 5)
          : [];
        setProductosSugeridos(sugeridos);
        console.log('Sugeridos:', sugeridos);
      })
      .catch(() => setProductosSugeridos([]));
  }, [productosEnCesta]);

  const subtotal = productosEnCesta.reduce((acc, item) => acc + (item.total || (item.precio * item.cantidad)), 0);
  const descuento = 0;
  const total = subtotal - descuento;

  const handleAplicarCupon = () => {
    if (cupon) {
      toast.success('Cupón aplicado correctamente');
    }
  };

  const handlePagar = () => {
    toast.success('Procesando pago...');
    try {
      // Obtener clienteId desde currentUser en localStorage
      const clienteId = (() => {
        try {
          const storedUser = localStorage.getItem('currentUser');
          if (storedUser) {
            const user = JSON.parse(storedUser);
            return user.id;
          }
        } catch {}
        return 1;
      })();
      if (!clienteId) {
        toast.error('No se encontró el id del cliente. Inicia sesión nuevamente.');
        return;
      }
      const pedidoItems = productosEnCesta.map(item => ({
        productoId: item.id,
        cantidad: item.cantidad,
        precio: item.precio
      }));
      const payload = {
        clienteId,
        fecha: new Date().toISOString(),
        estado: 'pendiente',
        total,
        items: pedidoItems
      };
      fetch('http://localhost:4000/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => {
        toast.success('Pedido creado correctamente');
        localStorage.setItem('carrito', '[]');
        setProductosEnCesta([]);
        onOpenChange(false);
      })
      .catch(() => {
        toast.error('Error al crear el pedido');
      });
    } catch (e) {
      toast.error('Error al crear el pedido');
    }
  };

  const handleCambiarCantidad = (id: string, delta: number) => {
    setProductosEnCesta(prev => {
      const updated = prev.map(item =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, item.cantidad + delta), total: item.total ? item.total * ((item.cantidad + delta)/item.cantidad) : undefined }
          : item
      );
      localStorage.setItem('carrito', JSON.stringify(updated));
      return updated;
    });
    toast.info('Cantidad actualizada');
  };

  const handleEliminar = (id: string) => {
    setProductosEnCesta(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('carrito', JSON.stringify(updated));
      return updated;
    });
    toast.success('Producto eliminado de la cesta');
  };

  const handleAgregarSugerido = (producto: any) => {
    try {
      const stored = localStorage.getItem('carrito');
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
      setProductosEnCesta(carrito);
      toast.success(`${producto.nombre} añadido a la cesta`);
    } catch (e) {
      toast.error('No se pudo agregar el producto');
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              Mi Cesta
              <Badge className="bg-teal-600">{productosEnCesta.length}</Badge>
            </div>
          </SheetTitle>
        </SheetHeader>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          {productosEnCesta.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Tu cesta está vacía</p>
            </div>
          ) : (
            productosEnCesta.map((item) => (
              <div key={item.id + '-' + (item.tipoCafe || '') + '-' + (item.pesoCafe || '')} className="flex gap-4 p-3 rounded-lg border border-gray-200">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                  {item.imagen ? (
                    <ImageWithFallback 
                      src={item.imagen} 
                      alt={item.nombre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
                      <ShoppingCart className="w-8 h-8 text-orange-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium mb-1 text-sm">{item.nombre}</h4>
                  {item.categoria && (
                    <p className="text-xs text-gray-500 mb-1">{item.categoria}</p>
                  )}
                  {item.tipoCafe && (
                    <p className="text-xs text-gray-500 mb-1">Tipo: {item.tipoCafe}</p>
                  )}
                  {item.pesoCafe && (
                    <p className="text-xs text-gray-500 mb-1">Peso: {item.pesoCafe}</p>
                  )}
                  {item.complementos && item.complementos.length > 0 && (
                    <div className="text-xs text-gray-500 mb-1">
                      <span>Complementos: </span>
                      {item.complementos.map((comp: any) => comp.nombre).join(', ')}
                    </div>
                  )}
                  {item.bebidas && item.bebidas.length > 0 && (
                    <div className="text-xs text-gray-500 mb-1">
                      <span>Bebidas: </span>
                      {item.bebidas.map((beb: any) => beb.nombre).join(', ')}
                    </div>
                  )}
                  <p className="text-teal-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    €{(item.total || (item.precio * item.cantidad)).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 w-7 p-0"
                      onClick={() => handleCambiarCantidad(item.id, -1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-sm font-medium w-8 text-center">{item.cantidad}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 w-7 p-0"
                      onClick={() => handleCambiarCantidad(item.id, 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-7 w-7 p-0 ml-auto text-red-600 hover:text-red-700"
                      onClick={() => handleEliminar(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {productosEnCesta.length > 0 && (
          <>
            <Separator className="my-4" />

            {/* Cupón */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Código de cupón"
                    value={cupon}
                    onChange={(e) => setCupon(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" onClick={handleAplicarCupon}>
                  Aplicar
                </Button>
              </div>

              {/* Resumen */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">€{subtotal.toFixed(2)}</span>
                </div>
                {descuento > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento</span>
                    <span>-€{descuento.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-medium">Total</span>
                  <span className="font-medium text-teal-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    €{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <SheetFooter className="mt-4 flex-col gap-4">
              <Button 
                className="w-full bg-teal-600 hover:bg-teal-700 h-12"
                onClick={handlePagar}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceder al Pago
              </Button>

              {/* También te puede interesar */}
              <div className="w-full">
                <h3 className="mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  También te puede interesar
                </h3>
                <div className="space-y-2">
                  {productosSugeridos.map((producto) => (
                    <Card 
                      key={producto.id} 
                      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleAgregarSugerido(producto)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                            <ImageWithFallback 
                              src={producto.imagen} 
                              alt={producto.nombre}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{producto.nombre}</p>
                            <p className="text-teal-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              €{producto.precio.toFixed(2)}
                            </p>
                          </div>
                          <Button 
                            size="sm"
                            className="bg-teal-600 hover:bg-teal-700 h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAgregarSugerido(producto.nombre);
                            }}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}