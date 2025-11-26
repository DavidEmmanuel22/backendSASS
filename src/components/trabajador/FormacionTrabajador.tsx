import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  GraduationCap,
  Search,
  Play,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  Video,
  FileText,
  Star,
  Download,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Curso {
  id: string;
  titulo: string;
  categoria: 'prevencion' | 'seguridad' | 'salud' | 'emergencias';
  duracion: number; // en horas
  progreso: number; // 0-100
  estado: 'disponible' | 'en_progreso' | 'completado';
  modulos: number;
  modulosCompletados: number;
  instructor: string;
  certificado: boolean;
  fechaInicio?: string;
  fechaLimite?: string;
  calificacion?: number;
}

interface Certificacion {
  id: string;
  nombre: string;
  tipo: 'certificacion';
  estado: 'vigente' | 'caducado';
  progreso: number; // 0-100
  fechaObtencion: string;
  validez: string;
  organizacion: string;
}

export function FormacionTrabajador() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todas');

  const cursos: Curso[] = [
    {
      id: '1',
      titulo: 'Prevención de Riesgos Laborales Nivel Básico',
      categoria: 'prevencion',
      duracion: 30,
      progreso: 60,
      estado: 'en_progreso',
      modulos: 8,
      modulosCompletados: 5,
      instructor: 'Ing. Carlos Rodríguez',
      certificado: true,
      fechaInicio: '2025-11-01',
      fechaLimite: '2025-12-15'
    },
    {
      id: '2',
      titulo: 'Primeros Auxilios y RCP Básico',
      categoria: 'emergencias',
      duracion: 20,
      progreso: 100,
      estado: 'completado',
      modulos: 6,
      modulosCompletados: 6,
      instructor: 'Dra. Ana Rodríguez',
      certificado: true,
      fechaInicio: '2025-10-01',
      calificacion: 95
    },
    {
      id: '3',
      titulo: 'Seguridad en Espacios Confinados',
      categoria: 'seguridad',
      duracion: 12,
      progreso: 100,
      estado: 'completado',
      modulos: 4,
      modulosCompletados: 4,
      instructor: 'Ing. Laura Pérez',
      certificado: true,
      fechaInicio: '2025-09-15',
      calificacion: 92
    },
    {
      id: '4',
      titulo: 'Ergonomía y Posturas Correctas en el Trabajo',
      categoria: 'salud',
      duracion: 8,
      progreso: 30,
      estado: 'en_progreso',
      modulos: 5,
      modulosCompletados: 2,
      instructor: 'Dra. Patricia Gómez',
      certificado: true,
      fechaInicio: '2025-11-08'
    },
    {
      id: '5',
      titulo: 'Uso de Equipos de Protección Individual (EPIs)',
      categoria: 'seguridad',
      duracion: 10,
      progreso: 0,
      estado: 'disponible',
      modulos: 5,
      modulosCompletados: 0,
      instructor: 'Ing. Miguel Torres',
      certificado: true
    },
    {
      id: '6',
      titulo: 'Prevención de Incendios y Uso de Extintores',
      categoria: 'emergencias',
      duracion: 15,
      progreso: 0,
      estado: 'disponible',
      modulos: 6,
      modulosCompletados: 0,
      instructor: 'Cap. Bomberos José Martín',
      certificado: true
    },
    {
      id: '7',
      titulo: 'Manipulación Manual de Cargas',
      categoria: 'prevencion',
      duracion: 6,
      progreso: 100,
      estado: 'completado',
      modulos: 3,
      modulosCompletados: 3,
      instructor: 'Ing. Laura Pérez',
      certificado: true,
      fechaInicio: '2025-10-20',
      calificacion: 98
    },
    {
      id: '8',
      titulo: 'Riesgos Eléctricos y Prevención',
      categoria: 'seguridad',
      duracion: 12,
      progreso: 0,
      estado: 'disponible',
      modulos: 5,
      modulosCompletados: 0,
      instructor: 'Ing. Eléctrico Juan Sánchez',
      certificado: true
    },
    {
      id: '9',
      titulo: 'Plan de Emergencia y Evacuación',
      categoria: 'emergencias',
      duracion: 10,
      progreso: 0,
      estado: 'disponible',
      modulos: 4,
      modulosCompletados: 0,
      instructor: 'Ing. Carlos Rodríguez',
      certificado: true
    },
    {
      id: '10',
      titulo: 'Trabajo en Alturas - Seguridad',
      categoria: 'seguridad',
      duracion: 16,
      progreso: 0,
      estado: 'disponible',
      modulos: 6,
      modulosCompletados: 0,
      instructor: 'Ing. Alberto Ruiz',
      certificado: true
    },
    {
      id: '11',
      titulo: 'Prevención de Riesgos Psicosociales',
      categoria: 'salud',
      duracion: 10,
      progreso: 0,
      estado: 'disponible',
      modulos: 5,
      modulosCompletados: 0,
      instructor: 'Psic. María Fernández',
      certificado: true
    },
    {
      id: '12',
      titulo: 'Señalización de Seguridad en el Trabajo',
      categoria: 'prevencion',
      duracion: 6,
      progreso: 0,
      estado: 'disponible',
      modulos: 3,
      modulosCompletados: 0,
      instructor: 'Ing. Carlos Rodríguez',
      certificado: true
    }
  ];

  const certificaciones: Certificacion[] = [
    {
      id: 'CERT-002',
      nombre: 'Manipulador de Alimentos',
      tipo: 'certificacion',
      estado: 'vigente',
      progreso: 100,
      fechaObtencion: '2025-10-28',
      validez: '2028-10-28',
      organizacion: 'CORE Academy'
    },
    {
      id: 'CERT-003',
      nombre: 'Primeros Auxilios',
      tipo: 'certificacion',
      descripcion: 'Certificación en primeros auxilios y RCP',
      progreso: 100,
      fechaObtencion: '2025-10-25',
      validez: '2027-10-25',
      organizacion: 'CORE Academy'
    }
  ];

  const cursosFiltrados = cursos.filter(curso => {
    const matchBusqueda = curso.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                         curso.instructor.toLowerCase().includes(busqueda.toLowerCase());
    const matchCategoria = categoriaFiltro === 'todas' || curso.categoria === categoriaFiltro;
    return matchBusqueda && matchCategoria;
  });

  const cursosEnProgreso = cursos.filter(c => c.estado === 'en_progreso');
  const cursosCompletados = cursos.filter(c => c.estado === 'completado');
  const cursosDisponibles = cursos.filter(c => c.estado === 'disponible');

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'completado':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Completado</Badge>;
      case 'en_progreso':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">En progreso</Badge>;
      default:
        return <Badge variant="outline">Disponible</Badge>;
    }
  };

  const getCategoriaBadge = (categoria: string) => {
    switch (categoria) {
      case 'prevencion':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Prevención</Badge>;
      case 'seguridad':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Seguridad</Badge>;
      case 'salud':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Salud</Badge>;
      case 'emergencias':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Emergencias</Badge>;
      default:
        return <Badge variant="outline">Otro</Badge>;
    }
  };

  const handleIniciarCurso = (curso: Curso) => {
    toast.success(`Iniciando curso: ${curso.titulo}`);
  };

  const handleContinuarCurso = (curso: Curso) => {
    toast.info(`Continuando curso: ${curso.titulo}`);
  };

  const handleDescargarCertificado = (cert: Certificacion) => {
    toast.success(`Descargando certificado: ${cert.titulo}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Formación y Desarrollo
          </h1>
          <p className="text-gray-600 text-sm">
            Cursos, certificaciones y capacitación profesional
          </p>
        </div>

        <Button variant="outline" size="sm">
          <ExternalLink className="w-4 h-4 mr-2" />
          Catálogo Completo
        </Button>
      </div>

      {/* Resumen de Progreso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-teal-200 bg-teal-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-700 mb-1">En Progreso</p>
                <p className="text-teal-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {cursosEnProgreso.length} cursos
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 mb-1">Completados</p>
                <p className="text-green-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {cursosCompletados.length} cursos
                </p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 mb-1">Certificaciones</p>
                <p className="text-orange-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {certificaciones.length} activas
                </p>
              </div>
              <Award className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="todos">
            <GraduationCap className="w-4 h-4 mr-2" />
            Todos los Cursos
          </TabsTrigger>
          <TabsTrigger value="en_progreso">
            <Clock className="w-4 h-4 mr-2" />
            En Progreso ({cursosEnProgreso.length})
          </TabsTrigger>
          <TabsTrigger value="certificaciones">
            <Award className="w-4 h-4 mr-2" />
            Certificaciones
          </TabsTrigger>
        </TabsList>

        {/* Tab: Todos los cursos */}
        <TabsContent value="todos" className="space-y-4">
          {/* Búsqueda y Filtros */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Buscar cursos..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={categoriaFiltro === 'todas' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCategoriaFiltro('todas')}
                  >
                    Todas
                  </Button>
                  <Button
                    variant={categoriaFiltro === 'prevencion' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCategoriaFiltro('prevencion')}
                  >
                    Prevención
                  </Button>
                  <Button
                    variant={categoriaFiltro === 'seguridad' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCategoriaFiltro('seguridad')}
                  >
                    Seguridad
                  </Button>
                  <Button
                    variant={categoriaFiltro === 'salud' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCategoriaFiltro('salud')}
                  >
                    Salud
                  </Button>
                  <Button
                    variant={categoriaFiltro === 'emergencias' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCategoriaFiltro('emergencias')}
                  >
                    Emergencias
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Cursos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {cursosFiltrados.map((curso) => (
              <Card key={curso.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {curso.titulo}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {getCategoriaBadge(curso.categoria)}
                          {getEstadoBadge(curso.estado)}
                          {curso.certificado && (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              <Award className="w-3 h-3 mr-1" />
                              Certificado
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{curso.duracion}h totales</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <BookOpen className="w-4 h-4" />
                        <span>{curso.modulos} módulos</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 col-span-2">
                        <GraduationCap className="w-4 h-4" />
                        <span>{curso.instructor}</span>
                      </div>
                    </div>

                    {/* Progreso */}
                    {curso.progreso > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progreso</span>
                          <span className="text-gray-900">{curso.progreso}%</span>
                        </div>
                        <Progress value={curso.progreso} className="h-2" />
                        <p className="text-xs text-gray-600">
                          {curso.modulosCompletados} de {curso.modulos} módulos completados
                        </p>
                      </div>
                    )}

                    {/* Calificación */}
                    {curso.calificacion && (
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-gray-900">Calificación: {curso.calificacion}%</span>
                      </div>
                    )}

                    {/* Acciones */}
                    <div className="flex gap-2">
                      {curso.estado === 'disponible' && (
                        <Button
                          className="flex-1 bg-teal-600 hover:bg-teal-700"
                          onClick={() => handleIniciarCurso(curso)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Iniciar Curso
                        </Button>
                      )}
                      {curso.estado === 'en_progreso' && (
                        <Button
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleContinuarCurso(curso)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Continuar
                        </Button>
                      )}
                      {curso.estado === 'completado' && (
                        <Button variant="outline" className="flex-1">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                          Revisar
                        </Button>
                      )}
                      <Button variant="outline" size="icon">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab: En Progreso */}
        <TabsContent value="en_progreso" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {cursosEnProgreso.map((curso) => (
              <Card key={curso.id} className="border-blue-200">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {curso.titulo}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {getCategoriaBadge(curso.categoria)}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progreso</span>
                        <span className="text-gray-900">{curso.progreso}%</span>
                      </div>
                      <Progress value={curso.progreso} className="h-2" />
                      <p className="text-xs text-gray-600">
                        {curso.modulosCompletados} de {curso.modulos} módulos completados
                      </p>
                    </div>

                    {curso.fechaLimite && (
                      <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 p-2 rounded">
                        <Clock className="w-4 h-4" />
                        <span>
                          Fecha límite:{' '}
                          {new Date(curso.fechaLimite).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    )}

                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleContinuarCurso(curso)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Continuar Curso
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {cursosEnProgreso.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12 text-gray-600">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No tienes cursos en progreso</p>
                  <p className="text-sm mt-2">Explora el catálogo y comienza tu formación</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tab: Certificaciones */}
        <TabsContent value="certificaciones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                Mis Certificaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {certificaciones.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <Award className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-gray-900">{cert.titulo}</p>
                        <p className="text-sm text-gray-600 mt-1">{cert.organizacion}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>
                            Obtenido:{' '}
                            {new Date(cert.fechaObtencion).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          <span>
                            Válido hasta:{' '}
                            {new Date(cert.validez).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDescargarCertificado(cert)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}