import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { toast } from 'sonner@2.0.3';
import { 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  TrendingDown,
  Star,
  Filter,
  Plus,
  User,
  Eye,
  Repeat,
  CalendarDays,
  CalendarRange,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  FileText,
  Shield
} from 'lucide-react';

interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  personaAsignada: {
    nombre: string;
    foto: string;
  };
  recurrencia: 'Puntual' | 'Diaria' | 'Semanal' | 'Mensual';
  estado: 'pendiente' | 'en_proceso' | 'completada';
  prioridad: 'alta' | 'media' | 'baja';
  fechaCreacion: string;
  fechaVencimiento?: string;
}

export function OperativaGerente() {
  const [dialogNuevaTarea, setDialogNuevaTarea] = useState(false);
  const [vistaCalendario, setVistaCalendario] = useState<'dia' | 'semana' | 'mes'>('semana');
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date());
  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: '',
    descripcion: '',
    personaAsignada: '',
    recurrencia: 'Puntual' as 'Puntual' | 'Diaria' | 'Semanal' | 'Mensual',
    prioridad: 'media' as 'alta' | 'media' | 'baja',
    fechaVencimiento: ''
  });

  // Turnos/eventos del calendario con roles
  const eventosCalendario = [
    { id: 1, persona: 'Carlos Ruiz', rol: 'Panadero', inicio: '2025-11-14T09:00', fin: '2025-11-14T17:00' },
    { id: 2, persona: 'Ana López', rol: 'Panadero', inicio: '2025-11-14T17:00', fin: '2025-11-15T01:00' },
    { id: 3, persona: 'María García', rol: 'Cajero', inicio: '2025-11-14T10:00', fin: '2025-11-14T18:00' },
    { id: 4, persona: 'Laura Sánchez', rol: 'Cajero', inicio: '2025-11-14T18:00', fin: '2025-11-15T02:00' },
    { id: 5, persona: 'Javier Torres', rol: 'Repartidor', inicio: '2025-11-14T12:00', fin: '2025-11-14T20:00' },
    { id: 6, persona: 'Pedro Martínez', rol: 'Repartidor', inicio: '2025-11-14T20:00', fin: '2025-11-15T04:00' },
    { id: 7, persona: 'Carmen Díaz', rol: 'Panadero', inicio: '2025-11-15T09:00', fin: '2025-11-15T17:00' },
    { id: 8, persona: 'Roberto Fernández', rol: 'Repartidor', inicio: '2025-11-15T12:00', fin: '2025-11-15T20:00' },
    { id: 9, persona: 'Luis Martín', rol: 'Cajero', inicio: '2025-11-12T18:00', fin: '2025-11-13T00:00' }, // Martes
    { id: 10, persona: 'Luis Martín', rol: 'Cajero', inicio: '2025-11-13T18:00', fin: '2025-11-14T00:00' }, // Miércoles
    { id: 11, persona: 'Luis Martín', rol: 'Cajero', inicio: '2025-11-14T18:00', fin: '2025-11-15T00:00' }, // Jueves
    { id: 12, persona: 'Luis Martín', rol: 'Cajero', inicio: '2025-11-15T18:00', fin: '2025-11-16T00:00' }, // Viernes
    { id: 13, persona: 'Luis Martín', rol: 'Cajero', inicio: '2025-11-16T18:00', fin: '2025-11-17T00:00' }, // Sábado
    { id: 14, persona: 'Luis Martín', rol: 'Cajero', inicio: '2025-11-17T18:00', fin: '2025-11-18T00:00' }, // Domingo
  ];

  const getRolColor = (rol: string) => {
    switch (rol) {
      case 'Panadero':
        return 'bg-orange-500 text-white border-orange-600';
      case 'Cajero':
        return 'bg-blue-500 text-white border-blue-600';
      case 'Repartidor':
        return 'bg-green-500 text-white border-green-600';
      default:
        return 'bg-gray-500 text-white border-gray-600';
    }
  };

  // Lista de tareas con personas asignadas
  const [tareas, setTareas] = useState<Tarea[]>([
    {
      id: 'TAREA-001',
      titulo: 'Limpieza profunda de cocina',
      descripcion: 'Limpieza completa de todas las superficies de la cocina, hornos y freidoras',
      personaAsignada: {
        nombre: 'María García',
        foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
      },
      recurrencia: 'Diaria',
      estado: 'completada',
      prioridad: 'alta',
      fechaCreacion: '2025-11-14T08:00:00',
      fechaVencimiento: '2025-11-14T22:00:00'
    },
    {
      id: 'TAREA-002',
      titulo: 'Inventario de ingredientes',
      descripcion: 'Revisar y actualizar el inventario de todos los ingredientes principales',
      personaAsignada: {
        nombre: 'Carlos Ruiz',
        foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
      },
      recurrencia: 'Semanal',
      estado: 'en_proceso',
      prioridad: 'media',
      fechaCreacion: '2025-11-14T09:00:00',
      fechaVencimiento: '2025-11-15T18:00:00'
    },
    {
      id: 'TAREA-003',
      titulo: 'Revisión de equipos de refrigeración',
      descripcion: 'Verificar temperatura y funcionamiento de todos los equipos de refrigeración',
      personaAsignada: {
        nombre: 'Ana López',
        foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana'
      },
      recurrencia: 'Mensual',
      estado: 'pendiente',
      prioridad: 'alta',
      fechaCreacion: '2025-11-13T10:00:00',
      fechaVencimiento: '2025-11-16T12:00:00'
    },
    {
      id: 'TAREA-004',
      titulo: 'Preparación de masa para bollería',
      descripcion: 'Preparar masa fresca para el servicio de mañana',
      personaAsignada: {
        nombre: 'Pedro Martínez',
        foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro'
      },
      recurrencia: 'Diaria',
      estado: 'completada',
      prioridad: 'media',
      fechaCreacion: '2025-11-14T14:00:00',
      fechaVencimiento: '2025-11-14T18:00:00'
    },
    {
      id: 'TAREA-005',
      titulo: 'Actualización de menú semanal',
      descripcion: 'Revisar y actualizar el menú de la semana con nuevas ofertas',
      personaAsignada: {
        nombre: 'Laura Sánchez',
        foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura'
      },
      recurrencia: 'Semanal',
      estado: 'pendiente',
      prioridad: 'baja',
      fechaCreacion: '2025-11-12T11:00:00',
      fechaVencimiento: '2025-11-18T12:00:00'
    },
    {
      id: 'TAREA-006',
      titulo: 'Limpieza de zona de delivery',
      descripcion: 'Organizar y limpiar el área de preparación de pedidos para delivery',
      personaAsignada: {
        nombre: 'Javier Torres',
        foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Javier'
      },
      recurrencia: 'Diaria',
      estado: 'en_proceso',
      prioridad: 'media',
      fechaCreacion: '2025-11-14T16:00:00',
      fechaVencimiento: '2025-11-14T20:00:00'
    },
    {
      id: 'TAREA-007',
      titulo: 'Control de calidad de productos',
      descripcion: 'Revisar fecha de caducidad y calidad de todos los productos almacenados',
      personaAsignada: {
        nombre: 'Carmen Díaz',
        foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carmen'
      },
      recurrencia: 'Puntual',
      estado: 'pendiente',
      prioridad: 'alta',
      fechaCreacion: '2025-11-14T12:00:00',
      fechaVencimiento: '2025-11-15T10:00:00'
    }
  ]);

  // Lista de colaboradores disponibles
  const colaboradores = [
    { id: '1', nombre: 'María García', foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' },
    { id: '2', nombre: 'Carlos Ruiz', foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos' },
    { id: '3', nombre: 'Ana López', foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana' },
    { id: '4', nombre: 'Pedro Martínez', foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro' },
    { id: '5', nombre: 'Laura Sánchez', foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura' },
    { id: '6', nombre: 'Javier Torres', foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Javier' },
    { id: '7', nombre: 'Carmen Díaz', foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carmen' },
    { id: '8', nombre: 'Roberto Fernández', foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto' },
    { id: '9', nombre: 'Luis Martín', foto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luis' }
  ];

  const cuellos = [
    { area: 'Cocina Principal', problema: 'Falta de personal en hora punta', impacto: 'Alto', tiempo: '2 días' },
    { area: 'Delivery', problema: 'Retraso en entregas por tráfico', impacto: 'Medio', tiempo: '1 día' },
  ];

  const calidadMetrics = [
    { metrica: 'Satisfacción Cliente', valor: '4.8/5', tendencia: 'up' },
    { metrica: 'Devoluciones', valor: '1.2%', tendencia: 'down' },
    { metrica: 'Tiempo Promedio Preparación', valor: '18min', tendencia: 'up' },
  ];

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'completada':
        return <Badge className="bg-green-100 text-green-800">Completada</Badge>;
      case 'en_proceso':
        return <Badge className="bg-yellow-100 text-yellow-800">En proceso</Badge>;
      case 'pendiente':
        return <Badge className="bg-blue-100 text-blue-800">Pendiente</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const getPrioridadBadge = (prioridad: string) => {
    switch (prioridad) {
      case 'alta':
        return <Badge className="bg-red-600 text-white">Alta</Badge>;
      case 'media':
        return <Badge className="bg-orange-500 text-white">Media</Badge>;
      case 'baja':
        return <Badge variant="outline" className="border-gray-400 text-gray-600">Baja</Badge>;
      default:
        return <Badge variant="outline">Media</Badge>;
    }
  };

  const getRecurrenciaIcon = (recurrencia: string) => {
    switch (recurrencia) {
      case 'Puntual':
        return <CalendarDays className="w-4 h-4 text-gray-600" />;
      case 'Diaria':
        return <Repeat className="w-4 h-4 text-blue-600" />;
      case 'Semanal':
        return <CalendarRange className="w-4 h-4 text-purple-600" />;
      case 'Mensual':
        return <CalendarClock className="w-4 h-4 text-teal-600" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRecurrenciaBadge = (recurrencia: string) => {
    const icon = getRecurrenciaIcon(recurrencia);
    let colorClass = '';
    
    switch (recurrencia) {
      case 'Puntual':
        colorClass = 'bg-gray-100 text-gray-700 border-gray-300';
        break;
      case 'Diaria':
        colorClass = 'bg-blue-100 text-blue-700 border-blue-300';
        break;
      case 'Semanal':
        colorClass = 'bg-purple-100 text-purple-700 border-purple-300';
        break;
      case 'Mensual':
        colorClass = 'bg-teal-100 text-teal-700 border-teal-300';
        break;
    }
    
    return (
      <Badge variant="outline" className={`${colorClass} flex items-center gap-1`}>
        {icon}
        {recurrencia}
      </Badge>
    );
  };

  const formatFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCrearTarea = () => {
    if (!nuevaTarea.titulo || !nuevaTarea.personaAsignada) {
      toast.error('Por favor completa los campos obligatorios');
      return;
    }

    const colaboradorSeleccionado = colaboradores.find(c => c.id === nuevaTarea.personaAsignada);
    
    if (!colaboradorSeleccionado) {
      toast.error('Persona asignada no encontrada');
      return;
    }

    const tarea: Tarea = {
      id: `TAREA-${String(tareas.length + 1).padStart(3, '0')}`,
      titulo: nuevaTarea.titulo,
      descripcion: nuevaTarea.descripcion,
      personaAsignada: {
        nombre: colaboradorSeleccionado.nombre,
        foto: colaboradorSeleccionado.foto
      },
      recurrencia: nuevaTarea.recurrencia,
      estado: 'pendiente',
      prioridad: nuevaTarea.prioridad,
      fechaCreacion: new Date().toISOString(),
      fechaVencimiento: nuevaTarea.fechaVencimiento ? new Date(nuevaTarea.fechaVencimiento).toISOString() : undefined
    };

    setTareas([tarea, ...tareas]);
    setDialogNuevaTarea(false);
    setNuevaTarea({
      titulo: '',
      descripcion: '',
      personaAsignada: '',
      recurrencia: 'Puntual',
      prioridad: 'media',
      fechaVencimiento: ''
    });
    
    toast.success('Tarea creada exitosamente');
  };

  // Calcular estadísticas
  const tareasActivas = tareas.filter(t => t.estado !== 'completada').length;
  const tareasUrgentes = tareas.filter(t => t.prioridad === 'alta' && t.estado !== 'completada').length;
  const tareasCompletadas = tareas.filter(t => t.estado === 'completada').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Gestión Operativa
          </h2>
          <p className="text-gray-600 text-sm">Control de tareas, calendario y calidad</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Filter className="w-4 h-4 mr-2" />
          Filtros Avanzados
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Órdenes de Servicio</p>
                <p className="text-gray-900 text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {tareas.length}
                </p>
                <p className="text-gray-500 text-xs mt-1">{tareasActivas} activas</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Calendario</p>
                <p className="text-gray-900 text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {eventosCalendario.length}
                </p>
                <p className="text-gray-500 text-xs mt-1">turnos esta semana</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Cuellos de Botella</p>
                <p className="text-gray-900 text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {cuellos.length}
                </p>
                <p className="text-gray-500 text-xs mt-1">detectados</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Control de Calidad</p>
                <p className="text-gray-900 text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  4.8
                </p>
                <p className="text-gray-500 text-xs mt-1">satisfacción promedio</p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ordenes" className="w-full">
        <TabsList>
          <TabsTrigger value="ordenes">Órdenes de Servicio</TabsTrigger>
          <TabsTrigger value="calendario">Calendario</TabsTrigger>
          <TabsTrigger value="cuellos">Cuellos de Botella</TabsTrigger>
          <TabsTrigger value="calidad">Control de Calidad</TabsTrigger>
        </TabsList>

        <TabsContent value="ordenes" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Listado de Tareas
                  </CardTitle>
                  <CardDescription>
                    Gestión de tareas asignadas al equipo • {tareas.length} tareas totales
                  </CardDescription>
                </div>
                <Button 
                  className="bg-teal-600 hover:bg-teal-700"
                  onClick={() => setDialogNuevaTarea(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Tarea
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Tarea</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Persona Asignada</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Recurrencia</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Prioridad</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Estado</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Fecha Vencimiento</th>
                      <th className="text-center py-3 px-4 text-sm text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tareas.map((tarea) => (
                      <tr 
                        key={tarea.id} 
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        {/* Tarea */}
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{tarea.titulo}</p>
                            <p className="text-xs text-gray-500 mt-1">{tarea.id}</p>
                            {tarea.descripcion && (
                              <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                                {tarea.descripcion}
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Persona Asignada */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={tarea.personaAsignada.foto} alt={tarea.personaAsignada.nombre} />
                              <AvatarFallback>
                                {tarea.personaAsignada.nombre.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-900">{tarea.personaAsignada.nombre}</span>
                          </div>
                        </td>

                        {/* Recurrencia */}
                        <td className="py-4 px-4 text-center">
                          {getRecurrenciaBadge(tarea.recurrencia)}
                        </td>

                        {/* Prioridad */}
                        <td className="py-4 px-4 text-center">
                          {getPrioridadBadge(tarea.prioridad)}
                        </td>

                        {/* Estado */}
                        <td className="py-4 px-4 text-center">
                          {getEstadoBadge(tarea.estado)}
                        </td>

                        {/* Fecha Vencimiento */}
                        <td className="py-4 px-4 text-center">
                          {tarea.fechaVencimiento ? (
                            <span className="text-sm text-gray-600">
                              {formatFecha(tarea.fechaVencimiento)}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>

                        {/* Acciones */}
                        <td className="py-4 px-4 text-center">
                          <Button size="sm" variant="outline" className="text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            Ver
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendario" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Calendario de Turnos
                  </CardTitle>
                  <CardDescription>
                    Gestión de horarios del equipo
                  </CardDescription>
                </div>
                
                {/* Controles de vista y navegación */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Selector de vista */}
                  <div className="flex items-center border rounded-lg">
                    <Button
                      size="sm"
                      variant={vistaCalendario === 'dia' ? 'default' : 'ghost'}
                      className={vistaCalendario === 'dia' ? 'bg-teal-600 hover:bg-teal-700' : ''}
                      onClick={() => setVistaCalendario('dia')}
                    >
                      Día
                    </Button>
                    <Button
                      size="sm"
                      variant={vistaCalendario === 'semana' ? 'default' : 'ghost'}
                      className={vistaCalendario === 'semana' ? 'bg-teal-600 hover:bg-teal-700' : ''}
                      onClick={() => setVistaCalendario('semana')}
                    >
                      Semana
                    </Button>
                    <Button
                      size="sm"
                      variant={vistaCalendario === 'mes' ? 'default' : 'ghost'}
                      className={vistaCalendario === 'mes' ? 'bg-teal-600 hover:bg-teal-700' : ''}
                      onClick={() => setVistaCalendario('mes')}
                    >
                      Mes
                    </Button>
                  </div>

                  {/* Selector de mes */}
                  <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const newDate = new Date(mesSeleccionado);
                        newDate.setMonth(newDate.getMonth() - 1);
                        setMesSeleccionado(newDate);
                      }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm font-medium min-w-[140px] text-center">
                      {mesSeleccionado.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const newDate = new Date(mesSeleccionado);
                        newDate.setMonth(newDate.getMonth() + 1);
                        setMesSeleccionado(newDate);
                      }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button className="bg-teal-600 hover:bg-teal-700" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Añadir Turno
                  </Button>
                </div>
              </div>

              {/* Leyenda de roles */}
              <div className="flex items-center gap-4 mt-4 flex-wrap">
                <p className="text-sm text-gray-600">Roles:</p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-orange-500" />
                  <span className="text-sm">Panadero</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-500" />
                  <span className="text-sm">Cajero</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500" />
                  <span className="text-sm">Repartidor</span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {vistaCalendario === 'semana' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-8 gap-2">
                    {/* Columna de horas */}
                    <div className="border-r pr-2">
                      <div className="h-12" />
                      {Array.from({ length: 24 }, (_, i) => (
                        <div key={i} className="h-16 text-xs text-gray-500 text-right pr-2">
                          {String(i).padStart(2, '0')}:00
                        </div>
                      ))}
                    </div>

                    {/* Días de la semana */}
                    {['Lun 11', 'Mar 12', 'Mié 13', 'Jue 14', 'Vie 15', 'Sáb 16', 'Dom 17'].map((dia, index) => (
                      <div key={dia} className="space-y-2">
                        <div className="h-12 border-b pb-2 text-center">
                          <p className="text-sm font-medium text-gray-900">{dia}</p>
                          <p className="text-xs text-gray-500">Nov 2025</p>
                        </div>
                        
                        <div className="relative h-[384px] border-l">
                          {/* Grid de horas de fondo */}
                          {Array.from({ length: 24 }, (_, i) => (
                            <div key={i} className="h-16 border-b border-gray-100" />
                          ))}

                          {/* Eventos del día (ejemplo para jueves 14) */}
                          {index === 3 && eventosCalendario
                            .filter(e => e.inicio.startsWith('2025-11-14'))
                            .map(evento => {
                              const inicio = new Date(evento.inicio);
                              const fin = new Date(evento.fin);
                              const horaInicio = inicio.getHours() + inicio.getMinutes() / 60;
                              const horaFin = fin.getDate() > inicio.getDate() ? 24 : (fin.getHours() + fin.getMinutes() / 60);
                              const duracion = horaFin - horaInicio;
                              const top = (horaInicio / 24) * 384;
                              const height = (duracion / 24) * 384;

                              return (
                                <div
                                  key={evento.id}
                                  className={`absolute left-1 right-1 ${getRolColor(evento.rol)} rounded px-2 py-1 text-xs overflow-hidden border-2`}
                                  style={{ top: `${top}px`, height: `${height}px`, minHeight: '30px' }}
                                >
                                  <p className="font-medium truncate">{evento.persona}</p>
                                  <p className="text-[10px] opacity-90">{evento.rol}</p>
                                  <p className="text-[10px] opacity-75">
                                    {inicio.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - 
                                    {fin.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {vistaCalendario === 'dia' && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Jueves, 14 de Noviembre de 2025
                    </h3>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    {/* Columna de horas */}
                    <div className="border-r pr-4">
                      {Array.from({ length: 24 }, (_, i) => (
                        <div key={i} className="h-20 text-sm text-gray-500 text-right pr-2 border-b border-gray-100">
                          {String(i).padStart(2, '0')}:00
                        </div>
                      ))}
                    </div>

                    {/* Eventos del día */}
                    <div className="col-span-3 relative">
                      {Array.from({ length: 24 }, (_, i) => (
                        <div key={i} className="h-20 border-b border-gray-100" />
                      ))}

                      {eventosCalendario
                        .filter(e => e.inicio.startsWith('2025-11-14'))
                        .map((evento, idx) => {
                          const inicio = new Date(evento.inicio);
                          const fin = new Date(evento.fin);
                          const horaInicio = inicio.getHours() + inicio.getMinutes() / 60;
                          const horaFin = fin.getDate() > inicio.getDate() ? 24 : (fin.getHours() + fin.getMinutes() / 60);
                          const duracion = horaFin - horaInicio;
                          const top = (horaInicio / 24) * (24 * 80);
                          const height = (duracion / 24) * (24 * 80);

                          return (
                            <div
                              key={evento.id}
                              className={`absolute ${getRolColor(evento.rol)} rounded-lg p-4 border-2 shadow-sm`}
                              style={{ 
                                top: `${top}px`, 
                                height: `${height}px`,
                                left: `${idx * 33}%`,
                                width: '30%',
                                minHeight: '60px'
                              }}
                            >
                              <p className="font-medium">{evento.persona}</p>
                              <p className="text-sm opacity-90 mt-1">{evento.rol}</p>
                              <p className="text-xs opacity-75 mt-2">
                                {inicio.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - 
                                {fin.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}

              {vistaCalendario === 'mes' && (
                <div className="space-y-4">
                  {/* Calendario mensual simplificado */}
                  <div className="grid grid-cols-7 gap-2">
                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(dia => (
                      <div key={dia} className="text-center py-2 border-b font-medium text-sm">
                        {dia}
                      </div>
                    ))}
                    
                    {/* Días del mes (simplificado - Noviembre 2025) */}
                    {Array.from({ length: 30 }, (_, i) => {
                      const dia = i + 1;
                      const eventos = dia === 14 || dia === 15 ? 
                        eventosCalendario.filter(e => e.inicio.includes(`2025-11-${String(dia).padStart(2, '0')}`)).length : 
                        0;
                      
                      return (
                        <div key={i} className="border rounded-lg p-3 min-h-[100px] hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm font-medium text-gray-900">{dia}</p>
                          {eventos > 0 && (
                            <div className="mt-2 space-y-1">
                              <div className="text-xs bg-teal-100 text-teal-800 rounded px-2 py-1">
                                {eventos} turnos
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cuellos" className="space-y-4 mt-6">
          {cuellos.map((cuello, index) => (
            <Card key={index} className="border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-orange-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {cuello.area}
                    </h3>
                    <p className="text-gray-700 mb-2">{cuello.problema}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge className="bg-red-100 text-red-800">Impacto: {cuello.impacto}</Badge>
                      <span className="text-gray-600">Duración: {cuello.tiempo}</span>
                    </div>
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700">Resolver</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="calidad" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                Métricas de Calidad
              </CardTitle>
              <CardDescription>Indicadores de control de calidad del servicio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {calidadMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="text-gray-900 font-medium">{metric.metrica}</p>
                      <p className="text-gray-600 text-sm">Última actualización: Hace 10 min</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-gray-900 text-xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {metric.valor}
                      </p>
                      {metric.tendencia === 'up' ? (
                        <TrendingDown className="w-5 h-5 text-green-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog para Nueva Tarea */}
      <Dialog open={dialogNuevaTarea} onOpenChange={setDialogNuevaTarea}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              Crear Nueva Tarea
            </DialogTitle>
            <DialogDescription>
              Completa la información para asignar una nueva tarea a un colaborador
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Título de la Tarea */}
            <div className="space-y-2">
              <Label htmlFor="titulo">
                Título de la Tarea <span className="text-red-600">*</span>
              </Label>
              <Input
                id="titulo"
                placeholder="Ej: Limpieza profunda de cocina"
                value={nuevaTarea.titulo}
                onChange={(e) => setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })}
              />
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                placeholder="Describe los detalles de la tarea..."
                rows={3}
                value={nuevaTarea.descripcion}
                onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })}
              />
            </div>

            {/* Persona Asignada */}
            <div className="space-y-2">
              <Label htmlFor="persona">
                Persona Asignada <span className="text-red-600">*</span>
              </Label>
              <Select 
                value={nuevaTarea.personaAsignada} 
                onValueChange={(value) => setNuevaTarea({ ...nuevaTarea, personaAsignada: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un colaborador" />
                </SelectTrigger>
                <SelectContent>
                  {colaboradores.map((colaborador) => (
                    <SelectItem key={colaborador.id} value={colaborador.id}>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {colaborador.nombre}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Recurrencia */}
            <div className="space-y-2">
              <Label htmlFor="recurrencia">
                Recurrencia <span className="text-red-600">*</span>
              </Label>
              <Select 
                value={nuevaTarea.recurrencia} 
                onValueChange={(value) => setNuevaTarea({ 
                  ...nuevaTarea, 
                  recurrencia: value as 'Puntual' | 'Diaria' | 'Semanal' | 'Mensual' 
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Puntual">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      Puntual (Una sola vez)
                    </div>
                  </SelectItem>
                  <SelectItem value="Diaria">
                    <div className="flex items-center gap-2">
                      <Repeat className="w-4 h-4" />
                      Diaria (Cada día)
                    </div>
                  </SelectItem>
                  <SelectItem value="Semanal">
                    <div className="flex items-center gap-2">
                      <CalendarRange className="w-4 h-4" />
                      Semanal (Cada semana)
                    </div>
                  </SelectItem>
                  <SelectItem value="Mensual">
                    <div className="flex items-center gap-2">
                      <CalendarClock className="w-4 h-4" />
                      Mensual (Cada mes)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                {nuevaTarea.recurrencia === 'Puntual' && 'Esta tarea se realizará una sola vez'}
                {nuevaTarea.recurrencia === 'Diaria' && 'Esta tarea se repetirá automáticamente cada día'}
                {nuevaTarea.recurrencia === 'Semanal' && 'Esta tarea se repetirá automáticamente cada semana'}
                {nuevaTarea.recurrencia === 'Mensual' && 'Esta tarea se repetirá automáticamente cada mes'}
              </p>
            </div>

            {/* Prioridad */}
            <div className="space-y-2">
              <Label htmlFor="prioridad">Prioridad</Label>
              <Select 
                value={nuevaTarea.prioridad} 
                onValueChange={(value) => setNuevaTarea({ 
                  ...nuevaTarea, 
                  prioridad: value as 'alta' | 'media' | 'baja' 
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alta">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-600" />
                      Alta
                    </div>
                  </SelectItem>
                  <SelectItem value="media">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      Media
                    </div>
                  </SelectItem>
                  <SelectItem value="baja">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400" />
                      Baja
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fecha de Vencimiento */}
            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha de Vencimiento (Opcional)</Label>
              <Input
                id="fecha"
                type="datetime-local"
                value={nuevaTarea.fechaVencimiento}
                onChange={(e) => setNuevaTarea({ ...nuevaTarea, fechaVencimiento: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDialogNuevaTarea(false)}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-teal-600 hover:bg-teal-700"
              onClick={handleCrearTarea}
            >
              <Plus className="w-4 h-4 mr-2" />
              Crear Tarea
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}