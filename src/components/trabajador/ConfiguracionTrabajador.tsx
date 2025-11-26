import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { toast } from 'sonner@2.0.3';
import { User, Shield, Lock, Bell, Camera } from 'lucide-react';

export function ConfiguracionTrabajador() {
  const [filtroActivo, setFiltroActivo] = useState('cuenta');

  const handleGuardar = () => {
    toast.success('Configuración guardada correctamente');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Configuración
        </h1>
        <p className="text-gray-600 text-sm">
          Gestiona tu cuenta y preferencias
        </p>
      </div>

      {/* Filtros superiores */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filtroActivo === 'cuenta' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFiltroActivo('cuenta')}
          className={filtroActivo === 'cuenta' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <User className="w-4 h-4 mr-2" />
          Cuenta
        </Button>
        <Button
          variant={filtroActivo === 'privacidad' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFiltroActivo('privacidad')}
          className={filtroActivo === 'privacidad' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacidad
        </Button>
        <Button
          variant={filtroActivo === 'seguridad' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFiltroActivo('seguridad')}
          className={filtroActivo === 'seguridad' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <Lock className="w-4 h-4 mr-2" />
          Seguridad
        </Button>
        <Button
          variant={filtroActivo === 'notificaciones' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFiltroActivo('notificaciones')}
          className={filtroActivo === 'notificaciones' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <Bell className="w-4 h-4 mr-2" />
          Notificaciones
        </Button>
      </div>

      {/* Contenido según filtro activo */}
      {filtroActivo === 'cuenta' && (
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
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MzE2MTMyMDh8MA&ixlib=rb-4.0.3&q=80&w=200" />
                  <AvatarFallback className="bg-teal-100 text-teal-700 text-2xl">
                    JP
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
                <p className="font-medium text-gray-900">Juan Pérez</p>
                <p className="text-sm text-gray-600">Panadero</p>
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
                <Input id="nombre" placeholder="Juan Pérez" defaultValue="Juan Pérez" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="juan.perez@food360.com" defaultValue="juan.perez@food360.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" type="tel" placeholder="+34 600 123 456" defaultValue="+34 612 345 678" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="puesto">Puesto de Trabajo</Label>
                <Input id="puesto" placeholder="Cocinero" defaultValue="Cocinero" disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento</Label>
                <Input id="departamento" placeholder="Cocina" defaultValue="Cocina" disabled />
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
                  <Label>Perfil Visible</Label>
                  <p className="text-sm text-gray-500">Tu perfil es visible para otros colaboradores</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compartir Estadísticas</Label>
                  <p className="text-sm text-gray-500">Permite que el gerente vea tus métricas de rendimiento</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mostrar en Directorio</Label>
                  <p className="text-sm text-gray-500">Aparecer en el directorio de empleados</p>
                </div>
                <Switch defaultChecked />
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

              <Separator />

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
                  <Label>Cerrar Sesión Automáticamente</Label>
                  <p className="text-sm text-gray-500">Cierra sesión después de 30 minutos de inactividad</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Última sesión:</strong> Hoy a las 08:30 desde dispositivo móvil
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={handleGuardar} className="bg-teal-600 hover:bg-teal-700">
                Actualizar Contraseña
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
            <div className="space-y-4">
              <h3 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Notificaciones de Trabajo
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones de Tareas</Label>
                  <p className="text-sm text-gray-500">Recibe alertas cuando se te asignen nuevas tareas</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Recordatorios de Fichaje</Label>
                  <p className="text-sm text-gray-500">Te recordamos fichar entrada y salida</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cambios en Turnos</Label>
                  <p className="text-sm text-gray-500">Notificaciones sobre modificaciones en tu horario</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <h3 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Comunicación
              </h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mensajes del Equipo</Label>
                  <p className="text-sm text-gray-500">Recibe notificaciones de mensajes del chat</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Anuncios de la Empresa</Label>
                  <p className="text-sm text-gray-500">Mantente informado de noticias importantes</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <h3 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Notificaciones por Email
              </h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Resumen Semanal</Label>
                  <p className="text-sm text-gray-500">Recibe un resumen de tu actividad cada semana</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Actualizaciones del Sistema</Label>
                  <p className="text-sm text-gray-500">Información sobre nuevas funcionalidades</p>
                </div>
                <Switch />
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
      )}
    </div>
  );
}