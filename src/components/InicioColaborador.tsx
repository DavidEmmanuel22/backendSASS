import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  CheckCircle, 
  Clock, 
  Calendar, 
  AlertCircle, 
  TrendingUp,
  ClipboardList,
  Bell
} from 'lucide-react';

export function InicioColaborador() {
  const tareasHoy = [
    { id: '1', titulo: 'Atención Mesa 5', prioridad: 'alta', tiempo: '10:30 AM', completada: false },
    { id: '2', titulo: 'Preparar pedido #124', prioridad: 'media', tiempo: '11:00 AM', completada: false },
    { id: '3', titulo: 'Limpieza área de trabajo', prioridad: 'baja', tiempo: '12:00 PM', completada: true },
    { id: '4', titulo: 'Inventario bebidas', prioridad: 'media', tiempo: '02:00 PM', completada: false },
  ];

  const proximasCitas = [
    { id: '1', titulo: 'Reunión de equipo', fecha: 'Hoy, 3:00 PM', tipo: 'reunion' },
    { id: '2', titulo: 'Capacitación nuevos productos', fecha: 'Mañana, 10:00 AM', tipo: 'formacion' },
    { id: '3', titulo: 'Evaluación de desempeño', fecha: '15 Nov, 9:00 AM', tipo: 'evaluacion' },
  ];

  const avisos = [
    { id: '1', titulo: 'Nuevo menú disponible desde hoy', tipo: 'info', fecha: 'Hace 2 horas' },
    { id: '2', titulo: 'Recordatorio: Actualizar fichaje', tipo: 'advertencia', fecha: 'Hace 5 horas' },
    { id: '3', titulo: 'Felicitaciones por tus 100 pedidos completados', tipo: 'exito', fecha: 'Ayer' },
  ];

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvisoColor = (tipo: string) => {
    switch (tipo) {
      case 'info': return 'bg-blue-50 border-blue-200';
      case 'advertencia': return 'bg-yellow-50 border-yellow-200';
      case 'exito': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Bienvenida */}
      <div>
        <h2 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
          ¡Buen día! 👋
        </h2>
        <p className="text-gray-600">Aquí está tu resumen de hoy</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 pr-2">
                <p className="text-gray-600 text-sm">Tareas Pendientes</p>
                <p className="text-gray-900 text-2xl">
                  {tareasHoy.filter(t => !t.completada).length}
                </p>
              </div>
              <ClipboardList className="w-8 h-8 text-orange-600 shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 pr-2">
                <p className="text-gray-600 text-sm">Tareas Completadas</p>
                <p className="text-gray-900 text-2xl">
                  {tareasHoy.filter(t => t.completada).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 pr-2">
                <p className="text-gray-600 text-sm">Próximas Citas</p>
                <p className="text-gray-900 text-2xl">{proximasCitas.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600 shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 pr-2">
                <p className="text-gray-600 text-sm">Rendimiento</p>
                <p className="text-gray-900 text-2xl">94%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-teal-600 shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tareas del Día */}
      <Card>
        <CardHeader>
          <CardTitle>Tareas del Día</CardTitle>
          <CardDescription>Tus actividades programadas para hoy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tareasHoy.map((tarea) => (
              <div
                key={tarea.id}
                className={`flex items-center justify-between p-4 border rounded-lg ${
                  tarea.completada ? 'bg-gray-50 opacity-60' : 'bg-white'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tarea.completada ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {tarea.completada ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-gray-900 ${tarea.completada ? 'line-through' : ''}`}>
                      {tarea.titulo}
                    </p>
                    <p className="text-gray-600 text-sm">{tarea.tiempo}</p>
                  </div>
                </div>
                <Badge className={getPrioridadColor(tarea.prioridad)}>
                  {tarea.prioridad.charAt(0).toUpperCase() + tarea.prioridad.slice(1)}
                </Badge>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">
            Ver Todas las Tareas
          </Button>
        </CardContent>
      </Card>

      {/* Próximas Citas */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Citas</CardTitle>
          <CardDescription>Eventos y reuniones programadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {proximasCitas.map((cita) => (
              <div
                key={cita.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{cita.titulo}</p>
                  <p className="text-gray-600 text-sm">{cita.fecha}</p>
                </div>
                <Button size="sm" variant="outline">
                  Ver Detalles
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Avisos y Notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Avisos y Notificaciones</CardTitle>
          <CardDescription>Información importante para ti</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {avisos.map((aviso) => (
              <div
                key={aviso.id}
                className={`flex items-start gap-4 p-4 border rounded-lg ${getAvisoColor(aviso.tipo)}`}
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{aviso.titulo}</p>
                  <p className="text-gray-600 text-sm">{aviso.fecha}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}