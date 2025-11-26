import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Gift, Clock, Star, Heart, Tag, TrendingUp, Store, MessageCircle, ThumbsUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Promocion {
  id: string;
  titulo: string;
  descripcion: string;
  descuento: string;
  restaurante: string;
  imagen: string;
  validoHasta: string;
  tipo: 'descuento' | 'combo' | '2x1' | 'envio-gratis';
  favorito: boolean;
  destacado: boolean;
}

interface Publicacion {
  id: string;
  restaurante: string;
  contenido: string;
  imagen: string;
  fecha: string;
  likes: number;
  comentarios: number;
  promocion: {
    titulo: string;
    descuento: string;
  };
}

export function PromocionesCliente() {
  const [promociones, setPromociones] = useState<Promocion[]>([
    {
      id: '1',
      titulo: '2x1 en Pizzas Medianas',
      descripcion: 'Compra una pizza mediana y llévate otra completamente gratis. Válido para todos los sabores.',
      descuento: '50%',
      restaurante: 'Pizza Napoletana',
      imagen: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
      validoHasta: '2025-11-15',
      tipo: '2x1',
      favorito: false,
      destacado: true,
    },
    {
      id: '2',
      titulo: 'Combo Familiar Sushi',
      descripcion: '40 piezas de sushi variado + 2 sopas miso + bebidas por un precio especial.',
      descuento: '35%',
      restaurante: 'Sushi Express',
      imagen: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
      validoHasta: '2025-11-20',
      tipo: 'combo',
      favorito: true,
      destacado: true,
    },
    {
      id: '3',
      titulo: 'Envío Gratis en Tacos',
      descripcion: 'Pide 5 o más tacos y tu envío es completamente gratis. Sin pedido mínimo.',
      descuento: 'Gratis',
      restaurante: 'La Taquería del Centro',
      imagen: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
      validoHasta: '2025-11-12',
      tipo: 'envio-gratis',
      favorito: false,
      destacado: false,
    },
    {
      id: '4',
      titulo: '30% OFF en Hamburguesas',
      descripcion: 'Todas las hamburguesas con 30% de descuento de lunes a jueves.',
      descuento: '30%',
      restaurante: 'Burger Master',
      imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      validoHasta: '2025-11-18',
      tipo: 'descuento',
      favorito: false,
      destacado: false,
    },
    {
      id: '5',
      titulo: 'Happy Hour: Bebidas 2x1',
      descripcion: 'De 4pm a 6pm, todas las bebidas al 2x1. Válido con cualquier orden.',
      descuento: '50%',
      restaurante: 'Burger Master',
      imagen: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
      validoHasta: '2025-11-30',
      tipo: '2x1',
      favorito: true,
      destacado: false,
    },
    {
      id: '6',
      titulo: 'Ensaladas Saludables -25%',
      descripcion: 'Cuida tu salud con nuestras ensaladas frescas con 25% de descuento.',
      descuento: '25%',
      restaurante: 'Green Bites',
      imagen: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
      validoHasta: '2025-11-25',
      tipo: 'descuento',
      favorito: false,
      destacado: false,
    },
  ]);

  const [filtroActivo, setFiltroActivo] = useState<'todas' | 'favoritos' | 'destacadas'>('todas');

  const toggleFavorito = (id: string) => {
    setPromociones((prev) =>
      prev.map((promo) =>
        promo.id === id ? { ...promo, favorito: !promo.favorito } : promo
      )
    );
    toast.success('Promoción actualizada en favoritos');
  };

  const activarPromocion = (promocion: Promocion) => {
    toast.success(`¡Promoción "${promocion.titulo}" activada! Ve a la tienda para usarla.`);
  };

  const getTipoBadge = (tipo: Promocion['tipo']) => {
    const config = {
      descuento: { label: 'Descuento', className: 'bg-blue-100 text-blue-800' },
      combo: { label: 'Combo', className: 'bg-purple-100 text-purple-800' },
      '2x1': { label: '2x1', className: 'bg-orange-100 text-orange-800' },
      'envio-gratis': { label: 'Envío Gratis', className: 'bg-green-100 text-green-800' },
    };
    return <Badge className={config[tipo].className}>{config[tipo].label}</Badge>;
  };

  const calcularDiasRestantes = (fecha: string) => {
    const hoy = new Date();
    const fechaLimite = new Date(fecha);
    const diferencia = fechaLimite.getTime() - hoy.getTime();
    const dias = Math.ceil(diferencia / (1000 * 3600 * 24));
    return dias;
  };

  const promocionesFiltradas = promociones.filter((promo) => {
    if (filtroActivo === 'favoritos') return promo.favorito;
    if (filtroActivo === 'destacadas') return promo.destacado;
    return true;
  });

  const totalPromociones = promociones.length;
  const totalFavoritos = promociones.filter((p) => p.favorito).length;
  const totalDestacadas = promociones.filter((p) => p.destacado).length;

  const publicaciones: Publicacion[] = [
    {
      id: '1',
      restaurante: 'Pizza Napoletana',
      contenido: '🍕 ¡Este fin de semana es especial! Disfruta de nuestro 2x1 en pizzas medianas. Todas las variedades incluidas. No dejes pasar esta oportunidad única.',
      imagen: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600',
      fecha: '2025-11-10T10:00:00',
      likes: 156,
      comentarios: 23,
      promocion: {
        titulo: '2x1 en Pizzas Medianas',
        descuento: '50% OFF',
      },
    },
    {
      id: '2',
      restaurante: 'Sushi Express',
      contenido: '🍱 Nuevo Combo Familiar disponible! 40 piezas de sushi premium + sopas miso + bebidas. Perfecto para compartir en familia con un 35% de descuento.',
      imagen: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600',
      fecha: '2025-11-09T15:30:00',
      likes: 234,
      comentarios: 45,
      promocion: {
        titulo: 'Combo Familiar Sushi',
        descuento: '35% OFF',
      },
    },
    {
      id: '3',
      restaurante: 'Burger Master',
      contenido: '🍔 ¡Happy Hour extendido! De 4pm a 6pm todas nuestras bebidas al 2x1. Válido con cualquier orden. ¡Ven y disfruta!',
      imagen: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600',
      fecha: '2025-11-08T12:00:00',
      likes: 189,
      comentarios: 31,
      promocion: {
        titulo: 'Happy Hour: Bebidas 2x1',
        descuento: '50% OFF',
      },
    },
  ];

  const formatearFecha = (fecha: string) => {
    const ahora = new Date();
    const fechaPub = new Date(fecha);
    const diff = ahora.getTime() - fechaPub.getTime();
    const horas = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);

    if (horas < 24) return `Hace ${horas}h`;
    return `Hace ${dias} día${dias !== 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Promociones Activas</p>
                <p className="text-gray-900">{totalPromociones}</p>
              </div>
              <Gift className="w-8 h-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Destacadas</p>
                <p className="text-gray-900">{totalDestacadas}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Favoritos</p>
                <p className="text-gray-900">{totalFavoritos}</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Ahorro Total</p>
                <p className="text-teal-600">$482.50</p>
              </div>
              <TrendingUp className="w-8 h-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Button
          variant={filtroActivo === 'todas' ? 'default' : 'outline'}
          onClick={() => setFiltroActivo('todas')}
          className={filtroActivo === 'todas' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <Tag className="w-4 h-4 mr-2" />
          Todas ({totalPromociones})
        </Button>
        <Button
          variant={filtroActivo === 'destacadas' ? 'default' : 'outline'}
          onClick={() => setFiltroActivo('destacadas')}
          className={filtroActivo === 'destacadas' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <Star className="w-4 h-4 mr-2" />
          Destacadas ({totalDestacadas})
        </Button>
        <Button
          variant={filtroActivo === 'favoritos' ? 'default' : 'outline'}
          onClick={() => setFiltroActivo('favoritos')}
          className={filtroActivo === 'favoritos' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <Heart className="w-4 h-4 mr-2" />
          Favoritos ({totalFavoritos})
        </Button>
      </div>

      {/* Promociones Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promocionesFiltradas.map((promo) => {
          const diasRestantes = calcularDiasRestantes(promo.validoHasta);
          return (
            <Card
              key={promo.id}
              className={`overflow-hidden ${promo.destacado ? 'border-2 border-teal-500' : ''}`}
            >
              <div className="relative">
                <ImageWithFallback
                  src={promo.imagen}
                  alt={promo.titulo}
                  className="w-full h-48 object-cover"
                />
                {promo.destacado && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-teal-600">⭐ Destacada</Badge>
                  </div>
                )}
                <button
                  onClick={() => toggleFavorito(promo.id)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      promo.favorito ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>
                <div className="absolute bottom-3 right-3 bg-white rounded-lg px-3 py-1 shadow-md">
                  <p className="text-teal-600">{promo.descuento}</p>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="line-clamp-1">{promo.titulo}</CardTitle>
                    <CardDescription className="line-clamp-2">{promo.descripcion}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  {getTipoBadge(promo.tipo)}
                  <span className="text-gray-700">{promo.restaurante}</span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      {diasRestantes > 0
                        ? `Válido por ${diasRestantes} día${diasRestantes !== 1 ? 's' : ''}`
                        : 'Expira hoy'}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    onClick={() => activarPromocion(promo)}
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Activar Promoción
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {promocionesFiltradas.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No hay promociones en esta categoría</p>
          </CardContent>
        </Card>
      )}

      {/* Publicaciones de Promociones */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-900">Publicaciones Recientes</h3>
          <Badge className="bg-teal-100 text-teal-800">{publicaciones.length} Nuevas</Badge>
        </div>

        {publicaciones.map((publicacion) => (
          <Card key={publicacion.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Store className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">{publicacion.restaurante}</p>
                    <p className="text-gray-500 text-sm">{formatearFecha(publicacion.fecha)}</p>
                  </div>
                </div>
                <Badge className="bg-orange-100 text-orange-800">
                  <Gift className="w-3 h-3 mr-1" />
                  Promoción
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{publicacion.contenido}</p>
              
              <ImageWithFallback
                src={publicacion.imagen}
                alt={publicacion.promocion.titulo}
                className="w-full h-64 object-cover rounded-lg"
              />

              <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-lg border border-teal-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-gray-900">{publicacion.promocion.titulo}</p>
                    <p className="text-teal-600">{publicacion.promocion.descuento}</p>
                  </div>
                  <Button 
                    className="bg-teal-600 hover:bg-teal-700"
                    onClick={() => {
                      toast.success('Redirigiendo a la tienda...');
                      // Aquí iría la navegación a la tienda
                    }}
                  >
                    <Store className="w-4 h-4 mr-2" />
                    Ir a la Tienda
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2 border-t">
                <button className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                  <span>{publicacion.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>{publicacion.comentarios}</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}