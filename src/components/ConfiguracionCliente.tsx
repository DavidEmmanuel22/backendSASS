import { useState } from 'react';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { 
  User as UserIcon, 
  Lock, 
  Globe, 
  Bell, 
  CreditCard, 
  Trash2,
  Shield,
  Eye,
  EyeOff,
  AlertTriangle,
  Camera,
  Upload
} from 'lucide-react';
import type { AppUser } from '../App';
import { toast } from 'sonner';
import { useUser } from '../context/UserContext';


interface ConfiguracionClienteProps {
  user: AppUser;
}

export function ConfiguracionCliente({ user }: ConfiguracionClienteProps) {
        const [cliente, setCliente] = useState<AppUser | null>(null);
        // Obtener datos reales del cliente al montar
        useEffect(() => {
          if (user?.id) {
            fetch(`https://mytreefam.com/sass/api/clientes/${user.id}`)
              .then(res => res.json())
              .then(data => {
                setCliente(data);
              });
          }
        }, [user?.id]);
      const { setUser } = useUser();
    // Eliminar cuenta (modal)
    const handleEliminarCuenta = () => {
      if (confirmacionEliminar.toLowerCase() === 'eliminar') {
        fetch(`https://mytreefam.com/sass/api/clientes/${user.id}`, {
          method: 'DELETE',
        })
          .then(res => {
            if (res.ok) {
              toast.success('Cuenta eliminada exitosamente');
              setEliminarCuentaModalOpen(false);
              setUser(null); // Cierra sesión y limpia contexto
              // Opcional: redirigir o refrescar la app
            } else {
              toast.error('Error al eliminar la cuenta');
            }
          })
          .catch(() => {
            toast.error('Error al eliminar la cuenta');
          });
      } else {
        toast.error('Por favor escribe "eliminar" para confirmar');
      }
    };
  const [eliminarCuentaModalOpen, setEliminarCuentaModalOpen] = useState(false);
  const [confirmacionEliminar, setConfirmacionEliminar] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cliente');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [idioma, setIdioma] = useState('es');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');

  // Sincronizar los datos reales en los inputs
  useEffect(() => {
    if (cliente) {
      setFotoPerfil(cliente.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cliente');
      setNombre(cliente.name || '');
      setEmail(cliente.email || '');
      setTelefono(cliente.telefono || '');
      setIdioma(cliente.idioma || 'es');
      setDireccion(cliente.direccion || '');
      setCiudad(cliente.ciudad || '');
    }
  }, [cliente]);
  const [subiendoFoto, setSubiendoFoto] = useState(false);

  // Actualizar datos del cliente
  const guardarCambios = async () => {
    try {
      const payload = {
        nombre,
        email,
        telefono,
        idioma,
        direccion,
        ciudad,
        avatar: fotoPerfil
      };
      const res = await fetch(`https://mytreefam.com/sass/api/clientes/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const updated = await res.json();
        toast.success('Configuración guardada exitosamente');
        setUser(updated); // Actualiza el contexto global
      } else {
        toast.error('Error al guardar los cambios');
      }
    } catch {
      toast.error('Error al guardar los cambios');
    }
  };

  // Subir imagen de perfil
  const handleCambiarFoto = async (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target.files || e.target.files.length === 0) {
      toast.info('Selecciona una nueva foto de perfil');
      return;
    }
    setSubiendoFoto(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('https://mytreefam.com/sass/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        setFotoPerfil(data.url);
        toast.success('Foto de perfil actualizada');
      } else {
        toast.error('Error al subir la foto');
      }
    } catch {
      toast.error('Error al subir la foto');
    }
    setSubiendoFoto(false);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="cuenta" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cuenta">
            <UserIcon className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Cuenta</span>
          </TabsTrigger>
          <TabsTrigger value="privacidad">
            <Eye className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Privacidad</span>
          </TabsTrigger>
          <TabsTrigger value="seguridad">
            <Shield className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Seguridad</span>
          </TabsTrigger>
          <TabsTrigger value="notificaciones">
            <Bell className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Notificaciones</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab: Información de Cuenta */}
        <TabsContent value="cuenta" className="space-y-6">
          {/* Foto de Perfil */}
          <Card>
            <CardHeader>
              <CardTitle>Foto de Perfil</CardTitle>
              <CardDescription>Personaliza tu imagen de perfil</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={fotoPerfil} alt={nombre} />
                    <AvatarFallback className="text-2xl">
                      {nombre.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-teal-600 hover:bg-teal-700 flex items-center justify-center shadow-lg transition-colors cursor-pointer">
                    <Camera className="w-4 h-4 text-white" />
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCambiarFoto} disabled={subiendoFoto} />
                  </label>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{user.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{user.email}</p>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleCambiarFoto}
                      variant="outline"
                      className="border-teal-600 text-teal-600 hover:bg-teal-50"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Subir nueva foto
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setFotoPerfil('https://api.dicebear.com/7.x/avataaars/svg?seed=Cliente');
                        toast.success('Foto de perfil eliminada');
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información de Cuenta */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Cuenta</CardTitle>
              <CardDescription>Actualiza los datos de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo</Label>
                  <Input id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" type="tel" placeholder="+34 123 456 789" value={telefono} onChange={e => setTelefono(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idioma">Idioma</Label>
                  <Select value={idioma} onValueChange={setIdioma}>
                    <SelectTrigger id="idioma">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input id="direccion" placeholder="Calle Principal 123" value={direccion} onChange={e => setDireccion(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Input id="ciudad" placeholder="Madrid" value={ciudad} onChange={e => setCiudad(e.target.value)} />
                </div>
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700" onClick={guardarCambios}>
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Seguridad */}
        <TabsContent value="seguridad" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
              <CardDescription>Gestiona la seguridad de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-gray-900">Cambiar Contraseña</p>
                      <p className="text-gray-600 text-sm">Actualiza tu contraseña regularmente</p>
                    </div>
                  </div>
                  <Button variant="outline">Cambiar</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-gray-900">Autenticación de Dos Factores</p>
                      <p className="text-gray-600 text-sm">Agrega una capa extra de seguridad</p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-gray-900">Sesiones Activas</p>
                      <p className="text-gray-600 text-sm">Gestiona los dispositivos con acceso</p>
                    </div>
                  </div>
                  <Button variant="outline">Ver Sesiones</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Zona de Peligro - Eliminar Cuenta */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Zona de Peligro
              </CardTitle>
              <CardDescription>Acciones irreversibles en tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-gray-900">Eliminar Cuenta</p>
                    <p className="text-gray-600 text-sm">
                      Elimina permanentemente tu cuenta y todos tus datos
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => setEliminarCuentaModalOpen(true)}
                >
                  Eliminar Cuenta
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Privacidad */}
        <TabsContent value="privacidad" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacidad</CardTitle>
              <CardDescription>Controla cómo usamos tus datos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-gray-900">Compartir datos de uso</p>
                    <p className="text-gray-600 text-sm">Ayúdanos a mejorar el servicio</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-gray-900">Personalización de contenido</p>
                    <p className="text-gray-600 text-sm">Recibe recomendaciones personalizadas</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-gray-900">Seguimiento de ubicación</p>
                    <p className="text-gray-600 text-sm">Para mejorar las entregas de pedidos</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-gray-900">Cookies publicitarias</p>
                    <p className="text-gray-600 text-sm">Mostrar anuncios relevantes</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="text-gray-900">Historial de pedidos visible</p>
                    <p className="text-gray-600 text-sm">Otros pueden ver tus pedidos frecuentes</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full sm:w-auto">
                  Descargar mis Datos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Preferencias de Notificación */}
        <TabsContent value="notificaciones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificación</CardTitle>
              <CardDescription>Elige cómo quieres recibir actualizaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-gray-900 mb-3">Canales de Notificación</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-gray-900">Notificaciones por Email</p>
                          <p className="text-gray-600 text-sm">Recibe actualizaciones por correo</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-gray-900">Notificaciones Push</p>
                          <p className="text-gray-600 text-sm">Alertas en tiempo real en la app</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-gray-900">Notificaciones SMS</p>
                          <p className="text-gray-600 text-sm">Mensajes de texto importantes</p>
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-gray-900 mb-3">Tipos de Notificaciones</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-gray-900">Estado de pedidos</p>
                        <p className="text-gray-600 text-sm">Actualizaciones de tus pedidos</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-gray-900">Ofertas y promociones</p>
                        <p className="text-gray-600 text-sm">Descuentos especiales y novedades</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-gray-900">Recordatorios</p>
                        <p className="text-gray-600 text-sm">Recordatorios de pedidos y eventos</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-gray-900">Mensajes del soporte</p>
                        <p className="text-gray-600 text-sm">Respuestas del equipo de ayuda</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-gray-900">Noticias del restaurante</p>
                        <p className="text-gray-600 text-sm">Novedades y actualizaciones</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>

              <Button className="bg-teal-600 hover:bg-teal-700" onClick={guardarCambios}>
                Guardar Preferencias
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal Eliminar Cuenta */}
      <Dialog open={eliminarCuentaModalOpen} onOpenChange={setEliminarCuentaModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              ¿Eliminar cuenta permanentemente?
            </DialogTitle>
            <DialogDescription className="space-y-2">
              <p>Esta acción no se puede deshacer. Se eliminarán permanentemente:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Tu información personal</li>
                <li>Historial de pedidos</li>
                <li>Preferencias guardadas</li>
                <li>Datos de pago</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="confirmar-eliminar">
                Escribe <span className="font-bold text-red-600">"eliminar"</span> para confirmar
              </Label>
              <Input
                id="confirmar-eliminar"
                value={confirmacionEliminar}
                onChange={(e) => setConfirmacionEliminar(e.target.value)}
                placeholder="eliminar"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEliminarCuentaModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleEliminarCuenta}
              disabled={confirmacionEliminar.toLowerCase() !== 'eliminar'}
            >
              Eliminar Cuenta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}