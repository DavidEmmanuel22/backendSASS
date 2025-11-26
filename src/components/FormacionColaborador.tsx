import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  GraduationCap, 
  Clock, 
  PlayCircle,
  CheckCircle,
  Award,
  BookOpen,
  Video,
  FileText
} from 'lucide-react';

export function FormacionColaborador() {
  const cursosActivos = [
    {
      id: '1',
      titulo: 'Atención al Cliente Excelente',
      descripcion: 'Mejora tus habilidades de servicio al cliente',
      progreso: 65,
      duracion: '4 horas',
      tipo: 'video',
      modulos: 8,
      completados: 5,
    },
    {
      id: '2',
      titulo: 'Gestión de Tiempo y Productividad',
      descripcion: 'Optimiza tu tiempo y aumenta tu eficiencia',
      progreso: 30,
      duracion: '3 horas',
      tipo: 'lectura',
      modulos: 6,
      completados: 2,
    },
  ];

  const cursosDisponibles = [
    {
      id: '3',
      titulo: 'Seguridad e Higiene en el Trabajo',
      descripcion: 'Aprende las mejores prácticas de seguridad',
      duracion: '2 horas',
      tipo: 'video',
      nivel: 'Básico',
    },
    {
      id: '4',
      titulo: 'Trabajo en Equipo Efectivo',
      descripcion: 'Desarrolla habilidades de colaboración',
      duracion: '3 horas',
      tipo: 'mixto',
      nivel: 'Intermedio',
    },
    {
      id: '5',
      titulo: 'Resolución de Conflictos',
      descripcion: 'Maneja situaciones difíciles con clientes',
      duracion: '2.5 horas',
      tipo: 'video',
      nivel: 'Avanzado',
    },
  ];

  const certificaciones = [
    {
      id: '1',
      titulo: 'Certificado en Servicio al Cliente',
      fecha: 'Septiembre 2024',
      validez: 'Permanente',
    },
    {
      id: '2',
      titulo: 'Manipulación de Alimentos',
      fecha: 'Agosto 2024',
      validez: '1 año',
    },
  ];

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'lectura': return <BookOpen className="w-4 h-4" />;
      case 'mixto': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Básico': return 'bg-green-100 text-green-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900">Centro de Formación</h2>
        <p className="text-gray-600">Desarrolla tus habilidades profesionales</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Cursos Activos</p>
                <p className="text-gray-900 text-2xl">{cursosActivos.length}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completados</p>
                <p className="text-gray-900 text-2xl">12</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Certificados</p>
                <p className="text-gray-900 text-2xl">{certificaciones.length}</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Horas Totales</p>
                <p className="text-gray-900 text-2xl">38h</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cursos en Progreso */}
      <Card>
        <CardHeader>
          <CardTitle>Cursos en Progreso</CardTitle>
          <CardDescription>Continúa donde lo dejaste</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cursosActivos.map((curso) => (
              <div key={curso.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-gray-900">{curso.titulo}</h3>
                      <Badge variant="outline" className="text-xs">
                        {getTipoIcon(curso.tipo)}
                        <span className="ml-1 capitalize">{curso.tipo}</span>
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{curso.descripcion}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {curso.duracion}
                      </span>
                      <span>
                        {curso.completados}/{curso.modulos} módulos
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progreso</span>
                    <span className="text-teal-600">{curso.progreso}%</span>
                  </div>
                  <Progress value={curso.progreso} className="h-2" />
                </div>

                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Continuar Curso
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cursos Disponibles */}
      <Card>
        <CardHeader>
          <CardTitle>Cursos Disponibles</CardTitle>
          <CardDescription>Descubre nuevos cursos para mejorar tus habilidades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {cursosDisponibles.map((curso) => (
              <div key={curso.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{curso.titulo}</h3>
                    <p className="text-gray-600 text-sm">{curso.descripcion}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Badge className={getNivelColor(curso.nivel)}>
                    {curso.nivel}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {getTipoIcon(curso.tipo)}
                    <span className="ml-1 capitalize">{curso.tipo}</span>
                  </Badge>
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {curso.duracion}
                  </span>
                </div>

                <Button variant="outline" className="w-full">
                  Ver Detalles
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certificaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Mis Certificaciones</CardTitle>
          <CardDescription>Certificados obtenidos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {certificaciones.map((cert) => (
              <div key={cert.id} className="flex items-center gap-4 p-4 border rounded-lg bg-gradient-to-r from-teal-50 to-blue-50">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                  <Award className="w-6 h-6 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900">{cert.titulo}</h3>
                  <p className="text-gray-600 text-sm">
                    Obtenido: {cert.fecha} · Validez: {cert.validez}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Descargar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
