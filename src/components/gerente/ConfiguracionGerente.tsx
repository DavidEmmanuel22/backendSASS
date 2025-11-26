import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { 
  User, 
  Shield, 
  Lock, 
  Bell, 
  Camera, 
  Plus, 
  Store,
  MapPin,
  Phone,
  Mail,
  Trash2,
  Edit,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PuntoVenta {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  activo: boolean;
  horario: string;
}

interface ConfiguracionGerenteProps {
  activeSubsection?: string;
}

export function ConfiguracionGerente({ activeSubsection = 'cuenta' }: ConfiguracionGerenteProps) {
  const [filtroActivo, setFiltroActivo] = useState('cuenta');
  const [modalPuntoVentaOpen, setModalPuntoVentaOpen] = useState(false);
  const [puntoVentaEditando, setPuntoVentaEditando] = useState<PuntoVenta | null>(null);
  
  const [puntosVenta, setPuntosVenta] = useState<PuntoVenta[]>([
    {
      id: '1',
      nombre: 'Can Farines - Centro',
      direccion: 'Calle Mayor 45, Madrid',
      telefono: '+34 910 123 456',
      email: 'centro@canfarines.com',
      activo: true,
      horario: '08:00 - 20:00'
    },
    {
      id: '2',
      nombre: 'Can Farines - Norte',
      direccion: 'Av. de la Castellana 120, Madrid',
      telefono: '+34 910 123 457',
      email: 'norte@canfarines.com',
      activo: true,
      horario: '08:00 - 20:00'
    }
  ]);

  const handleGuardar = () => {
    toast.success('Configuración guardada correctamente');
  };

  const handleAñadirPuntoVenta = () => {
    setPuntoVentaEditando(null);
    setModalPuntoVentaOpen(true);
  };

  const handleEditarPuntoVenta = (punto: PuntoVenta) => {
    setPuntoVentaEditando(punto);
    setModalPuntoVentaOpen(true);
  };

  const handleEliminarPuntoVenta = (id: string) => {
    setPuntosVenta(puntosVenta.filter(p => p.id !== id));
    toast.success('Punto de venta eliminado');
  };

  const handleTogglePuntoVenta = (id: string) => {
    setPuntosVenta(puntosVenta.map(p => 
      p.id === id ? { ...p, activo: !p.activo } : p
    ));
    toast.success('Estado actualizado');
  };

  const handleGuardarPuntoVenta = () => {
    // Aquí iría la lógica para guardar/actualizar el punto de venta
    setModalPuntoVentaOpen(false);
    toast.success(puntoVentaEditando ? 'Punto de venta actualizado' : 'Punto de venta añadido');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Configuración
        </h1>
        <p className="text-gray-600 text-sm">
          Gestiona tu cuenta, puntos de venta y preferencias
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => setFiltroActivo('cuenta')}
          variant={filtroActivo === 'cuenta' ? 'default' : 'outline'}
          className={filtroActivo === 'cuenta' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <User className="w-4 h-4 mr-2" />
          Cuenta
        </Button>
        <Button
          onClick={() => setFiltroActivo('privacidad')}
          variant={filtroActivo === 'privacidad' ? 'default' : 'outline'}
          className={filtroActivo === 'privacidad' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacidad
        </Button>
        <Button
          onClick={() => setFiltroActivo('seguridad')}
          variant={filtroActivo === 'seguridad' ? 'default' : 'outline'}
          className={filtroActivo === 'seguridad' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <Lock className="w-4 h-4 mr-2" />
          Seguridad
        </Button>
        <Button
          onClick={() => setFiltroActivo('notificaciones')}
          variant={filtroActivo === 'notificaciones' ? 'default' : 'outline'}
          className={filtroActivo === 'notificaciones' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <Bell className="w-4 h-4 mr-2" />
          Notificaciones
        </Button>
      </div>

      {/* Contenido según filtro activo */}
      {filtroActivo === 'cuenta' && (
        <div className="space-y-6">
          {/* Información de la Cuenta */}
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                Información de la Cuenta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Foto de perfil */}
              <div className="flex flex-col items-center gap-4 pb-6 border-b">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="https://images.unsplash.com/photo-1755519024827-fd05075a7200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHByb2ZpbGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMwNjI1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
                    <AvatarFallback className="bg-teal-100 text-teal-700 text-2xl">
                      CM
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={() => {
                      toast.info('Abriendo selector de imagen...');
                    }}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-teal-600 hover:bg-teal-700 rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900">Carlos Martínez</p>
                  <p className="text-sm text-gray-600">Gerente</p>
                </div>
                <Button
                  onClick={() => {
                    toast.info('Selecciona una nueva foto de perfil');
                  }}
                  variant="outline"
                  size="sm"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Cambiar foto de perfil
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo</Label>
                  <Input id="nombre" placeholder="Carlos Martínez" defaultValue="Carlos Martínez" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" placeholder="carlos.martinez@hoypecamos.com" defaultValue="carlos.martinez@hoypecamos.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" type="tel" placeholder="+34 600 123 456" defaultValue="+34 600 123 456" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input id="cargo" placeholder="Gerente General" defaultValue="Gerente General" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input id="empresa" placeholder="Food 360" defaultValue="Food 360" disabled />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button onClick={handleGuardar} className="bg-teal-600 hover:bg-teal-700">
                  Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Puntos de Venta */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Puntos de Venta
                </CardTitle>
                <Button
                  onClick={handleAñadirPuntoVenta}
                  className="bg-teal-600 hover:bg-teal-700"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Añadir Punto de Venta
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {puntosVenta.map((punto) => (
                  <div
                    key={punto.id}
                    className="p-4 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center">
                          <Store className="w-6 h-6 text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-gray-900">{punto.nombre}</h3>
                            {punto.activo ? (
                              <Badge className="bg-green-100 text-green-700 border-green-200">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Activo
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-gray-100 text-gray-700">
                                Inactivo
                              </Badge>
                            )}
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{punto.direccion}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              <span>{punto.telefono}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              <span>{punto.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleEditarPuntoVenta(punto)}
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                        <Button
                          onClick={() => handleTogglePuntoVenta(punto.id)}
                          variant="outline"
                          size="sm"
                        >
                          {punto.activo ? 'Desactivar' : 'Activar'}
                        </Button>
                        <Button
                          onClick={() => handleEliminarPuntoVenta(punto.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {filtroActivo === 'privacidad' && (
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              Configuración de Privacidad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mostrar Estado en Línea</Label>
                  <p className="text-sm text-gray-500">Otros pueden ver cuando estás conectado</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compartir Datos de Rendimiento</Label>
                  <p className="text-sm text-gray-500">Permite compartir estadísticas con el equipo</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Visibilidad del Perfil</Label>
                  <p className="text-sm text-gray-500">Tu perfil es visible para todos los empleados</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Permitir Mensajes Directos</Label>
                  <p className="text-sm text-gray-500">Los empleados pueden enviarte mensajes directos</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Historial de Actividad</Label>
                  <p className="text-sm text-gray-500">Guardar registro de todas las acciones realizadas</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={handleGuardar} className="bg-teal-600 hover:bg-teal-700">
                Guardar Cambios
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {filtroActivo === 'seguridad' && (
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              Seguridad de la Cuenta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password-actual">Contraseña Actual</Label>
                <Input id="password-actual" type="password" placeholder="••••••••" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-nueva">Nueva Contraseña</Label>
                <Input id="password-nueva" type="password" placeholder="••••••••" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-confirmar">Confirmar Nueva Contraseña</Label>
                <Input id="password-confirmar" type="password" placeholder="••••••••" />
              </div>

              <Button 
                onClick={() => toast.success('Contraseña actualizada correctamente')}
                variant="outline"
                className="w-full"
              >
                Actualizar Contraseña
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autenticación de Dos Factores (2FA)</Label>
                  <p className="text-sm text-gray-500">Añade una capa extra de seguridad a tu cuenta</p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones de Inicio de Sesión</Label>
                  <p className="text-sm text-gray-500">Recibe alertas cuando alguien acceda a tu cuenta</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sesiones Activas</Label>
                  <p className="text-sm text-gray-500">Gestiona los dispositivos conectados a tu cuenta</p>
                </div>
                <Button variant="outline" size="sm">
                  Ver Sesiones
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Registro de Auditoría</Label>
                  <p className="text-sm text-gray-500">Historial de cambios y acciones importantes</p>
                </div>
                <Button variant="outline" size="sm">
                  Ver Registro
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={handleGuardar} className="bg-teal-600 hover:bg-teal-700">
                Guardar Cambios
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {filtroActivo === 'notificaciones' && (
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              Preferencias de Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Pedidos Nuevos</Label>
                  <p className="text-sm text-gray-500">Recibir alerta cuando haya un nuevo pedido</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Stock Bajo</Label>
                  <p className="text-sm text-gray-500">Alertas cuando el inventario esté por debajo del mínimo</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Incidencias Críticas</Label>
                  <p className="text-sm text-gray-500">Notificaciones de incidencias de alta prioridad</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Solicitudes de Vacaciones</Label>
                  <p className="text-sm text-gray-500">Cuando un empleado solicite vacaciones</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Horas Extra</Label>
                  <p className="text-sm text-gray-500">Solicitudes de horas extraordinarias</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Fichajes Tardíos</Label>
                  <p className="text-sm text-gray-500">Alertas de retrasos en fichajes</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Facturas Pendientes</Label>
                  <p className="text-sm text-gray-500">Recordatorios de facturas por pagar</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Pagos Recibidos</Label>
                  <p className="text-sm text-gray-500">Confirmación de pagos de clientes</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Reportes Diarios</Label>
                  <p className="text-sm text-gray-500">Resumen financiero al final del día</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones Email</Label>
                  <p className="text-sm text-gray-500">Recibir notificaciones por correo electrónico</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones Push</Label>
                  <p className="text-sm text-gray-500">Alertas en tiempo real en el navegador</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones SMS</Label>
                  <p className="text-sm text-gray-500">Mensajes de texto para alertas críticas</p>
                </div>
                <Switch />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={handleGuardar} className="bg-teal-600 hover:bg-teal-700">
                Guardar Cambios
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal para Añadir/Editar Punto de Venta */}
      <Dialog open={modalPuntoVentaOpen} onOpenChange={setModalPuntoVentaOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              {puntoVentaEditando ? 'Editar Punto de Venta' : 'Añadir Punto de Venta'}
            </DialogTitle>
            <DialogDescription>
              {puntoVentaEditando 
                ? 'Modifica la información del punto de venta' 
                : 'Completa los datos del nuevo punto de venta'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nombre-punto">Nombre del Punto de Venta</Label>
              <Input 
                id="nombre-punto" 
                placeholder="Food 360 - Centro" 
                defaultValue={puntoVentaEditando?.nombre}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="direccion-punto">Dirección</Label>
              <Input 
                id="direccion-punto" 
                placeholder="Calle Mayor 45, Madrid" 
                defaultValue={puntoVentaEditando?.direccion}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono-punto">Teléfono</Label>
              <Input 
                id="telefono-punto" 
                type="tel"
                placeholder="+34 910 123 456" 
                defaultValue={puntoVentaEditando?.telefono}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-punto">Email</Label>
              <Input 
                id="email-punto" 
                type="email"
                placeholder="centro@hoypecamos.com" 
                defaultValue={puntoVentaEditando?.email}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                id="activo-punto" 
                defaultChecked={puntoVentaEditando?.activo ?? true}
              />
              <Label htmlFor="activo-punto">Punto de venta activo</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalPuntoVentaOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleGuardarPuntoVenta} className="bg-teal-600 hover:bg-teal-700">
              {puntoVentaEditando ? 'Actualizar' : 'Añadir'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}