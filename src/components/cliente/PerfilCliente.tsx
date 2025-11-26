import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  FileText,
  Download,
  Camera
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { User as UserType } from '../../App';

interface PerfilClienteProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserType;
}

export function PerfilCliente({ isOpen, onOpenChange, user }: PerfilClienteProps) {
  const handleGuardar = () => {
    toast.success('Datos actualizados correctamente');
  };

  const facturas = [
    { id: 'FAC-2025-001', fecha: '01 Nov 2025', total: 145.00, pdf: '#' },
    { id: 'FAC-2025-002', fecha: '15 Oct 2025', total: 67.50, pdf: '#' },
    { id: 'FAC-2025-003', fecha: '05 Oct 2025', total: 234.00, pdf: '#' }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
            Perfil - Cuenta y Facturación
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Foto de perfil */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1755519024827-fd05075a7200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHByb2ZpbGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMwNjI1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Foto de perfil"
                    className="w-32 h-32 rounded-full object-cover border-4 border-teal-100"
                  />
                  <button
                    onClick={() => toast.info('Funcionalidad de cambiar foto próximamente')}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-teal-600 hover:bg-teal-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Carlos Martínez López
                  </h3>
                  <p className="text-sm text-gray-500">Cliente</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toast.info('Funcionalidad de cambiar foto próximamente')}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Cambiar foto de perfil
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Datos Personales */}
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                Datos Personales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="nombre" defaultValue="Carlos Martínez López" className="pl-10" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="email" type="email" defaultValue="carlos.martinez@email.com" className="pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="telefono" placeholder="+34 600 123 456" className="pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dni">DNI/NIE</Label>
                  <Input id="dni" placeholder="12345678A" />
                </div>
              </div>

              <Button onClick={handleGuardar} className="bg-teal-600 hover:bg-teal-700">
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>

          {/* Direcciones */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Direcciones
                </CardTitle>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Añadir Dirección
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 rounded-lg border-2 border-teal-200 bg-teal-50/30">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Badge className="mb-2 bg-teal-600">Principal</Badge>
                    <p className="font-medium">Calle Mayor 123, 4ºB</p>
                    <p className="text-sm text-gray-600">28001 Madrid, España</p>
                  </div>
                  <Button variant="ghost" size="sm">Editar</Button>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">Avenida Libertad 45</p>
                    <p className="text-sm text-gray-600">28002 Madrid, España</p>
                  </div>
                  <Button variant="ghost" size="sm">Editar</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Métodos de Pago */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Métodos de Pago
                </CardTitle>
                <Button variant="outline" size="sm">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Añadir Tarjeta
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200">
                <CreditCard className="w-8 h-8 text-gray-600" />
                <div className="flex-1">
                  <p className="font-medium">•••• •••• •••• 4532</p>
                  <p className="text-sm text-gray-500">Visa - Caduca 12/26</p>
                </div>
                <Badge className="bg-teal-600">Principal</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Facturas */}
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                Facturas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {facturas.map((factura) => (
                  <div key={factura.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">{factura.id}</p>
                        <p className="text-sm text-gray-500">{factura.fecha}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-medium text-teal-600">€{factura.total.toFixed(2)}</p>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}