import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  CheckCircle, 
  Clock, 
  Search,
  Filter,
  Plus,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  prioridad: 'alta' | 'media' | 'baja';
  estado: 'pendiente' | 'en_proceso' | 'completada';
  fecha: string;
  hora: string;
  asignadoPor: string;
  fechaAsignacion: string;
  fechaLimite: string;
}

export function TareasColaborador() {
  const [busqueda, setBusqueda] = useState('');
  const [tareas] = useState<Tarea[]>([
    {
      id: '1',
      titulo: 'Limpieza área de cocina',
      descripcion: 'Limpieza profunda de zona de preparación y hornos',
      prioridad: 'alta',
      estado: 'pendiente',
      fecha: 'Hoy',
      hora: '10:30 AM',
    },
    {
      id: '2',
      titulo: 'Preparar pedido #124',
      descripcion: '10 Barras de Pan + 6 Croissants para entrega',
      prioridad: 'alta',
      estado: 'en_proceso',
      asignadoPor: 'Gerente',
      fechaAsignacion: '2025-11-14T10:00:00',
      fechaLimite: '2025-11-14T14:30:00'
    },
    {
      id: '3',
      titulo: 'Inventario materia prima',
      descripcion: 'Verificar stock de quesos, carnes y verduras',
      prioridad: 'media',
      estado: 'completada',
      fecha: 'Hoy',
      hora: '12:00 PM',
    },
    {
      id: '4',
      titulo: 'Reposición ingredientes',
      descripcion: 'Reponer harina, levadura y mantequilla en estaciones',
      prioridad: 'alta',
      estado: 'pendiente',
      asignadoPor: 'Gerente',
      fechaAsignacion: '2025-11-14T11:00:00',
      fechaLimite: '2025-11-14T15:00:00'
    },
    {
      id: '5',
      titulo: 'Limpieza mesas y área comedor',
      descripcion: 'Sanitizar mesas, sillas y zona de autoservicio',
      prioridad: 'media',
      estado: 'pendiente',
      fecha: 'Hoy',
      hora: '03:00 PM',
    },
    {
      id: '6',
      titulo: 'Control temperatura cámaras',
      descripcion: 'Verificar y registrar temperaturas de refrigeradores',
      prioridad: 'alta',
      estado: 'pendiente',
      fecha: 'Hoy',
      hora: '04:00 PM',
    },
    {
      id: '7',
      titulo: 'Preparación cierre turno',
      descripcion: 'Limpieza general, cuadre de caja y cerrar estaciones',
      prioridad: 'baja',
      estado: 'pendiente',
      fecha: 'Hoy',
      hora: '09:00 PM',
    },
    {
      id: '8',
      titulo: 'Formación nuevas masas',
      descripcion: 'Asistir a capacitación sobre nuevas recetas de pan',
      prioridad: 'media',
      estado: 'pendiente',
      fecha: 'Mañana',
      hora: '09:00 AM',
    },
  ]);

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoBadge = (estado: string) => {
    const config = {
      pendiente: { label: 'Pendiente', className: 'bg-yellow-100 text-yellow-800', icon: Clock },
      en_proceso: { label: 'En Proceso', className: 'bg-blue-100 text-blue-800', icon: AlertCircle },
      completada: { label: 'Completada', className: 'bg-green-100 text-green-800', icon: CheckCircle },
    };
    const item = config[estado as keyof typeof config];
    const Icon = item.icon;
    return (
      <Badge className={item.className}>
        <Icon className="w-3 h-3 mr-1" />
        {item.label}
      </Badge>
    );
  };

  const tareasFiltradas = tareas.filter((tarea) =>
    tarea.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    tarea.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const tareasPorEstado = (estado: string) =>
    tareasFiltradas.filter((tarea) => tarea.estado === estado);

  const handleMarcarCompletada = (id: string) => {
    toast.success('Tarea marcada como completada');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-gray-900">Gestión de Tareas</h2>
          <p className="text-gray-600">Organiza y completa tus actividades</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Tarea
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pendientes</p>
                <p className="text-gray-900 text-2xl">
                  {tareasPorEstado('pendiente').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">En Proceso</p>
                <p className="text-gray-900 text-2xl">
                  {tareasPorEstado('en_proceso').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completadas</p>
                <p className="text-gray-900 text-2xl">
                  {tareasPorEstado('completada').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar tareas..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Tareas Tabs */}
      <Tabs defaultValue="todas" className="w-full">
        <TabsList>
          <TabsTrigger value="todas">Todas ({tareasFiltradas.length})</TabsTrigger>
          <TabsTrigger value="pendientes">
            Pendientes ({tareasPorEstado('pendiente').length})
          </TabsTrigger>
          <TabsTrigger value="en_proceso">
            En Proceso ({tareasPorEstado('en_proceso').length})
          </TabsTrigger>
          <TabsTrigger value="completadas">
            Completadas ({tareasPorEstado('completada').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="space-y-4 mt-6">
          {tareasFiltradas.map((tarea) => (
            <TareaCard
              key={tarea.id}
              tarea={tarea}
              getPrioridadColor={getPrioridadColor}
              getEstadoBadge={getEstadoBadge}
              onMarcarCompletada={handleMarcarCompletada}
            />
          ))}
        </TabsContent>

        <TabsContent value="pendientes" className="space-y-4 mt-6">
          {tareasPorEstado('pendiente').map((tarea) => (
            <TareaCard
              key={tarea.id}
              tarea={tarea}
              getPrioridadColor={getPrioridadColor}
              getEstadoBadge={getEstadoBadge}
              onMarcarCompletada={handleMarcarCompletada}
            />
          ))}
        </TabsContent>

        <TabsContent value="en_proceso" className="space-y-4 mt-6">
          {tareasPorEstado('en_proceso').map((tarea) => (
            <TareaCard
              key={tarea.id}
              tarea={tarea}
              getPrioridadColor={getPrioridadColor}
              getEstadoBadge={getEstadoBadge}
              onMarcarCompletada={handleMarcarCompletada}
            />
          ))}
        </TabsContent>

        <TabsContent value="completadas" className="space-y-4 mt-6">
          {tareasPorEstado('completada').map((tarea) => (
            <TareaCard
              key={tarea.id}
              tarea={tarea}
              getPrioridadColor={getPrioridadColor}
              getEstadoBadge={getEstadoBadge}
              onMarcarCompletada={handleMarcarCompletada}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TareaCard({
  tarea,
  getPrioridadColor,
  getEstadoBadge,
  onMarcarCompletada,
}: {
  tarea: Tarea;
  getPrioridadColor: (prioridad: string) => string;
  getEstadoBadge: (estado: string) => JSX.Element;
  onMarcarCompletada: (id: string) => void;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-gray-900">{tarea.titulo}</h3>
              <Badge className={getPrioridadColor(tarea.prioridad)}>
                {tarea.prioridad.charAt(0).toUpperCase() + tarea.prioridad.slice(1)}
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-3">{tarea.descripcion}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {tarea.fecha} - {tarea.hora}
              </span>
            </div>
          </div>
          {getEstadoBadge(tarea.estado)}
        </div>

        <div className="flex gap-2">
          {tarea.estado !== 'completada' && (
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => onMarcarCompletada(tarea.id)}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Marcar Completada
            </Button>
          )}
          <Button size="sm" variant="outline">
            Ver Detalles
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}