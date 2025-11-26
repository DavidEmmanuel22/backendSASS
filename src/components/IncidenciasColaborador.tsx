import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  AlertTriangle, 
  Plus,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Incidencia {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  prioridad: 'baja' | 'media' | 'alta' | 'critica';
  estado: 'abierta' | 'en_revision' | 'resuelta' | 'cerrada';
  fecha: string;
  respuesta?: string;
}

export function IncidenciasColaborador() {
  const [busqueda, setBusqueda] = useState('');
  const [mostrarNuevaIncidencia, setMostrarNuevaIncidencia] = useState(false);

  const [incidencias] = useState<Incidencia[]>([
    {
      id: 'INC-001',
      titulo: 'Problema con sistema de fichaje',
      descripcion: 'No pude registrar mi salida ayer por error del sistema',
      categoria: 'Técnico',
      prioridad: 'media',
      estado: 'en_revision',
      fecha: 'Hace 2 horas',
    },
    {
      id: 'INC-002',
      titulo: 'Falta de uniforme',
      descripcion: 'Necesito un uniforme de talla M',
      categoria: 'Recursos',
      prioridad: 'baja',
      estado: 'abierta',
      fecha: 'Ayer',
    },
    {
      id: 'INC-003',
      titulo: 'Equipo de cocina dañado',
      descripcion: 'La freidora #2 no está funcionando correctamente',
      categoria: 'Mantenimiento',
      prioridad: 'alta',
      estado: 'resuelta',
      fecha: 'Hace 3 días',
      respuesta: 'Se programó mantenimiento para mañana a las 8 AM',
    },
  ]);

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'critica': return 'bg-red-600 text-white';
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoBadge = (estado: string) => {
    const config = {
      abierta: { label: 'Abierta', className: 'bg-blue-100 text-blue-800', icon: AlertCircle },
      en_revision: { label: 'En Revisión', className: 'bg-yellow-100 text-yellow-800', icon: Clock },
      resuelta: { label: 'Resuelta', className: 'bg-green-100 text-green-800', icon: CheckCircle },
      cerrada: { label: 'Cerrada', className: 'bg-gray-100 text-gray-800', icon: XCircle },
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

  const incidenciasFiltradas = incidencias.filter((inc) =>
    inc.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    inc.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleCrearIncidencia = () => {
    toast.success('Incidencia registrada correctamente');
    setMostrarNuevaIncidencia(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-gray-900">Gestión de Incidencias</h2>
          <p className="text-gray-600">Reporta y da seguimiento a incidencias</p>
        </div>
        <Button 
          className="bg-teal-600 hover:bg-teal-700"
          onClick={() => setMostrarNuevaIncidencia(!mostrarNuevaIncidencia)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Incidencia
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Abiertas</p>
                <p className="text-gray-900 text-2xl">
                  {incidencias.filter(i => i.estado === 'abierta').length}
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
                <p className="text-gray-600 text-sm">En Revisión</p>
                <p className="text-gray-900 text-2xl">
                  {incidencias.filter(i => i.estado === 'en_revision').length}
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
                <p className="text-gray-600 text-sm">Resueltas</p>
                <p className="text-gray-900 text-2xl">
                  {incidencias.filter(i => i.estado === 'resuelta').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total</p>
                <p className="text-gray-900 text-2xl">{incidencias.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formulario Nueva Incidencia */}
      {mostrarNuevaIncidencia && (
        <Card className="border-2 border-teal-200">
          <CardHeader>
            <CardTitle>Reportar Nueva Incidencia</CardTitle>
            <CardDescription>Describe el problema que necesitas reportar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-700">Título</label>
                <Input placeholder="Resumen breve de la incidencia" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-700">Categoría</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Selecciona una categoría</option>
                    <option>Técnico</option>
                    <option>Recursos</option>
                    <option>Mantenimiento</option>
                    <option>Seguridad</option>
                    <option>Recursos Humanos</option>
                    <option>Otro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-700">Prioridad</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Selecciona prioridad</option>
                    <option>Baja</option>
                    <option>Media</option>
                    <option>Alta</option>
                    <option>Crítica</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-700">Descripción Detallada</label>
                <Textarea 
                  placeholder="Describe el problema con el mayor detalle posible..."
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-700">Adjuntar Evidencia (Opcional)</label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">Haz clic para subir archivos</p>
                  <p className="text-gray-500 text-xs">Imágenes o documentos (Max 10MB)</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-teal-600 hover:bg-teal-700"
                  onClick={handleCrearIncidencia}
                >
                  Enviar Incidencia
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setMostrarNuevaIncidencia(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Buscar incidencias..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Lista de Incidencias */}
      <div className="space-y-4">
        {incidenciasFiltradas.map((incidencia) => (
          <Card key={incidencia.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-gray-900">{incidencia.titulo}</h3>
                    <Badge className={getPrioridadColor(incidencia.prioridad)}>
                      {incidencia.prioridad.charAt(0).toUpperCase() + incidencia.prioridad.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{incidencia.descripcion}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {incidencia.fecha}
                    </span>
                    <Badge variant="outline">{incidencia.categoria}</Badge>
                    <span className="text-gray-400">#{incidencia.id}</span>
                  </div>
                </div>
                {getEstadoBadge(incidencia.estado)}
              </div>

              {incidencia.respuesta && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
                  <p className="text-gray-700 text-sm mb-1">Respuesta del equipo:</p>
                  <p className="text-gray-900 text-sm">{incidencia.respuesta}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Ver Detalles
                </Button>
                {incidencia.estado === 'resuelta' && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirmar Resolución
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {incidenciasFiltradas.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No se encontraron incidencias</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
