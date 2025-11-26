import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Store, 
  MapPin, 
  Clock, 
  Phone,
  Mail,
  Award,
  Users,
  Heart,
  X
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import imagenTienda from 'figma:asset/9b1f5602850afc387f9a8b6037a25772cf79c917.png';
import imagenProductos from 'figma:asset/1dbfa309289df472da8ca4af92aa64463bfb36c4.png';

export function QuienesSomos() {
  const [imagenAmpliada, setImagenAmpliada] = useState<string | null>(null);

  const tiendas = [
    {
      id: 1,
      ciudad: 'Badalona',
      tiendas: [
        { nombre: 'Can Farines Centro', direccion: 'Carrer del Mar, 45', telefono: '+34 933 123 456' },
        { nombre: 'Can Farines Llefià', direccion: 'Av. Martí Pujol, 112', telefono: '+34 933 123 457' },
        { nombre: 'Can Farines Montigalà', direccion: 'Carrer de Guifré, 78', telefono: '+34 933 123 458' },
        { nombre: 'Can Farines Casagemes', direccion: 'Rambla Sant Joan, 234', telefono: '+34 933 123 459' }
      ]
    },
    {
      id: 2,
      ciudad: 'Sant Adrià del Besòs',
      tiendas: [
        { nombre: 'Can Farines La Mina', direccion: 'Carrer de Santander, 56', telefono: '+34 933 123 460' },
        { nombre: 'Can Farines Sant Adrià Centro', direccion: 'Av. de Catalunya, 89', telefono: '+34 933 123 461' },
        { nombre: 'Can Farines Besòs', direccion: 'Passeig de Marítim, 23', telefono: '+34 933 123 462' }
      ]
    },
    {
      id: 3,
      ciudad: 'Barcelona',
      tiendas: [
        { nombre: 'Can Farines Poblenou', direccion: 'Rambla del Poblenou, 145', telefono: '+34 933 123 463' },
        { nombre: 'Can Farines Sagrada Família', direccion: 'Carrer de Provença, 312', telefono: '+34 933 123 464' },
        { nombre: 'Can Farines Gràcia', direccion: 'Carrer Gran de Gràcia, 89', telefono: '+34 933 123 465' }
      ]
    }
  ];

  const valores = [
    {
      icono: Heart,
      titulo: 'Pasión por el pan',
      descripcion: 'Cada hogaza es elaborada con dedicación y amor por la tradición panadera'
    },
    {
      icono: Award,
      titulo: 'Calidad artesanal',
      descripcion: 'Ingredientes naturales y procesos tradicionales garantizan el mejor sabor'
    },
    {
      icono: Users,
      titulo: 'Compromiso local',
      descripcion: 'Arraigados en nuestras comunidades, servimos con orgullo a nuestros vecinos'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          ¿Quiénes somos?
        </h1>
        <p className="text-gray-600">
          Descubre la historia de Can Farines, tu panadería artesanal de confianza
        </p>
      </div>

      {/* Historia */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
            Nuestra Historia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            <strong>Can Farines</strong> nació en 1985 en el corazón de Badalona con un sueño sencillo pero 
            ambicioso: ofrecer pan artesanal de la más alta calidad, elaborado con recetas tradicionales 
            y ingredientes naturales seleccionados cuidadosamente.
          </p>
          
          <p className="text-gray-700 leading-relaxed">
            Lo que comenzó como un pequeño obrador familiar ha crecido hasta convertirse en una cadena 
            de <strong>10 tiendas</strong> estratégicamente ubicadas en <strong>Badalona</strong>, 
            <strong> Sant Adrià del Besòs</strong> y <strong>Barcelona</strong>, siempre manteniendo 
            nuestra esencia: pan recién hecho cada día con la misma pasión del primer día.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Durante casi cuatro décadas, hemos perfeccionado nuestras recetas de pan de payés, baguettes, 
            bollería y repostería artesanal. Cada mañana, antes del amanecer, nuestros maestros panaderos 
            comienzan su labor con masa madre natural, harinas de primera calidad y el conocimiento 
            transmitido de generación en generación.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Hoy, Can Farines es más que una panadería: somos parte de la vida diaria de miles de familias 
            que confían en nosotros para sus desayunos, meriendas y celebraciones especiales. Nuestro 
            compromiso es seguir ofreciendo productos de excelencia mientras nos adaptamos a las 
            necesidades modernas, como esta aplicación que te acerca aún más a tu panadería favorita.
          </p>

          {/* Imágenes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div 
              className="relative group cursor-pointer overflow-hidden rounded-lg border-2 border-gray-200 hover:border-teal-500 transition-all"
              onClick={() => setImagenAmpliada(imagenTienda)}
            >
              <img 
                src={imagenTienda} 
                alt="Can Farines - Fachada de tienda" 
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity bg-teal-600 px-4 py-2 rounded-lg">
                  Click para ampliar
                </span>
              </div>
            </div>

            <div 
              className="relative group cursor-pointer overflow-hidden rounded-lg border-2 border-gray-200 hover:border-teal-500 transition-all"
              onClick={() => setImagenAmpliada(imagenProductos)}
            >
              <img 
                src={imagenProductos} 
                alt="Can Farines - Productos artesanales" 
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity bg-teal-600 px-4 py-2 rounded-lg">
                  Click para ampliar
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {valores.map((valor, index) => {
          const Icon = valor.icono;
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="font-medium text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {valor.titulo}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {valor.descripcion}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Nuestras Tiendas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              Nuestras 10 Tiendas
            </CardTitle>
            <Badge className="bg-teal-600">
              <Store className="w-3 h-3 mr-1" />
              10 ubicaciones
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {tiendas.map((grupo) => (
              <div key={grupo.id}>
                <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <MapPin className="w-5 h-5 text-teal-600" />
                  {grupo.ciudad}
                  <Badge variant="outline" className="ml-2">
                    {grupo.tiendas.length} {grupo.tiendas.length === 1 ? 'tienda' : 'tiendas'}
                  </Badge>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {grupo.tiendas.map((tienda, index) => (
                    <div 
                      key={index}
                      className="p-4 border rounded-lg hover:border-teal-500 hover:shadow-md transition-all bg-white"
                    >
                      <h4 className="font-medium text-gray-900 mb-2">{tienda.nombre}</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{tienda.direccion}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <a 
                            href={`tel:${tienda.telefono}`}
                            className="text-teal-600 hover:underline"
                          >
                            {tienda.telefono}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>Lun-Sáb: 7:00 - 21:00 | Dom: 8:00 - 14:00</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contacto */}
      <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              ¿Tienes alguna pregunta?
            </h3>
            <p className="text-gray-700">
              Estamos aquí para ayudarte. Contáctanos a través de cualquiera de nuestras tiendas 
              o mediante nuestro servicio de atención al cliente.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Phone className="w-4 h-4 mr-2" />
                Llamar ahora
              </Button>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Enviar email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal para imagen ampliada */}
      <Dialog open={imagenAmpliada !== null} onOpenChange={() => setImagenAmpliada(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden" aria-describedby={undefined}>
          <VisuallyHidden>
            <DialogTitle>Imagen ampliada</DialogTitle>
          </VisuallyHidden>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 bg-white/80 hover:bg-white rounded-full"
            onClick={() => setImagenAmpliada(null)}
          >
            <X className="w-5 h-5" />
          </Button>
          {imagenAmpliada && (
            <img 
              src={imagenAmpliada} 
              alt="Imagen ampliada" 
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}