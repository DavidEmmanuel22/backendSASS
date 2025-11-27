import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  ArrowRight,
  Tag,
  Percent,
  Ticket,
  ShoppingCart,
  MapPin,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface InicioClienteProps {
  onOpenCesta?: () => void;
  onOpenNuevaCita?: () => void;
  onYaEstoyAqui?: () => void;
}

export function InicioCliente({ onOpenCesta, onOpenNuevaCita, onYaEstoyAqui }: InicioClienteProps) {
  const [vistaActiva, setVistaActiva] = useState<'promociones' | 'cupones'>('promociones');
  const [promociones, setPromociones] = useState<any[]>([]);
  const [cliente, setCliente] = useState<any>(null);
  const [cupones, setCupones] = useState<any[]>([]); // Placeholder, implementar endpoint real si existe

  // Obtiene el id del usuario logueado desde localStorage
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

  useEffect(() => {
    // Promociones
    fetch(`https://mytreefam.com/sass/api/promociones`)
      .then(res => res.json())
      .then(data => setPromociones(data))
      .catch(() => setPromociones([]));

    // Cliente
    fetch(`https://mytreefam.com/sass/api/clientes/${clienteId}`)
      .then(res => res.json())
      .then(data => setCliente(data))
      .catch(() => setCliente(null));

    // Cupones
    fetch(`https://mytreefam.com/sass/api/cupones`)
      .then(res => res.json())
      .then(data => setCupones(data))
      .catch(() => setCupones([]));
  }, [clienteId]);

  const handleAplicarPromo = (promo: any) => {
    toast.success(`Promoción "${promo.titulo}" aplicada`);
  };

  return (
    <div className="space-y-6">
      {/* Saludo personalizado */}
      <div>
        <h2 className="text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {cliente ? `¡Hola, ${cliente.nombre}! 👋` : '¡Hola! 👋'}
        </h2>
        <p className="text-gray-600">
          Bienvenida de nuevo. ¡Tenemos ofertas especiales esperándote!
        </p>
      </div>

      {/* Tabs de Promociones y Cupones - más delgados */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="ghost"
          className={`h-10 justify-start px-4 ${
            vistaActiva === 'promociones' 
              ? 'bg-teal-600 hover:bg-teal-700 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setVistaActiva('promociones')}
        >
          <Percent className="w-4 h-4 mr-2" />
          <span>Promociones para ti</span>
        </Button>

        <Button
          variant="ghost"
          className={`h-10 justify-start px-4 ${
            vistaActiva === 'cupones' 
              ? 'bg-teal-600 hover:bg-teal-700 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setVistaActiva('cupones')}
        >
          <Tag className="w-4 h-4 mr-2" />
          <span>Cupones</span>
        </Button>
      </div>

      {/* Contenido según la vista activa */}
      {vistaActiva === 'promociones' && (
        <div className="space-y-4">
          <h3 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Promociones para ti
          </h3>
          {promociones.length === 0 && (
            <p className="text-gray-500">No hay promociones disponibles.</p>
          )}
          {promociones.map((promo) => (
            <Card 
              key={promo.id} 
              className="border-orange-100 bg-white overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="flex">
                  {/* Imagen de la promoción - cuadrada a la izquierda */}
                  <div className="w-48 h-48 relative shrink-0 overflow-hidden">
                    <ImageWithFallback 
                      src={promo.imagen || ''} 
                      alt={promo.titulo}
                      className="w-full h-full object-cover"
                    />
                    {/* Badge popular en la esquina */}
                    {promo.destacada && (
                      <Badge className="absolute top-3 left-3 bg-orange-600 hover:bg-orange-600 text-xs px-2 py-1">
                        ¡Popular!
                      </Badge>
                    )}
                  </div>

                  {/* Contenido a la derecha */}
                  <div className="flex-1 p-4 flex flex-col">
                    {/* Header con título y badge de descuento */}
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-gray-900 flex-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {promo.titulo}
                      </h4>
                      <Badge className="bg-orange-600 hover:bg-orange-600 text-white px-2 py-1 ml-2">
                        {promo.descuento}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                      {promo.descripcion}
                    </p>
                    {/* Precios */}
                    <div className="flex items-center gap-3 mb-2">
                      {promo.precioOriginal && (
                        <p className="text-sm text-gray-400 line-through">
                          €{promo.precioOriginal?.toFixed ? promo.precioOriginal.toFixed(2) : promo.precioOriginal}
                        </p>
                      )}
                      {promo.precioFinal && (
                        <p className="text-2xl font-semibold text-teal-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          €{promo.precioFinal?.toFixed ? promo.precioFinal.toFixed(2) : promo.precioFinal}
                        </p>
                      )}
                      {(promo.precioOriginal && promo.precioFinal) && (
                        <p className="text-sm text-teal-600">
                          Ahorras €{(promo.precioOriginal - promo.precioFinal).toFixed ? (promo.precioOriginal - promo.precioFinal).toFixed(2) : (promo.precioOriginal - promo.precioFinal)}
                        </p>
                      )}
                    </div>
                    {/* Fecha de validez */}
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                      <Calendar className="w-3 h-3" />
                      <span>Válido hasta {promo.validoHasta ? new Date(promo.validoHasta).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}</span>
                    </div>
                    {/* Botones de acción */}
                    <div className="flex gap-2 mt-auto">
                      <Button 
                        className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2"
                        onClick={() => handleAplicarPromo(promo)}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Aplicar Promoción
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {vistaActiva === 'cupones' && (
        <div className="space-y-4">
          <h3 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Cupones
          </h3>
          {cupones.length === 0 ? (
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="p-6 text-center">
                <Ticket className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <p className="text-gray-600">
                  No tienes cupones disponibles en este momento.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  ¡Vuelve pronto para ver nuevas ofertas!
                </p>
              </CardContent>
            </Card>
          ) : (
            cupones.map((cupon: any) => (
              <Card key={cupon.id} className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                <CardContent className="p-6 text-center">
                  <Ticket className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {cupon.descripcion}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Válido hasta {cupon.validoHasta ? new Date(cupon.validoHasta).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}