import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  TrendingUp, 
  Award, 
  Target,
  Star,
  Clock,
  CheckCircle,
  Download
} from 'lucide-react';

export function ReportesDesempeño() {
  const metricas = [
    { titulo: 'Tareas Completadas', valor: '156', cambio: '+12%', tendencia: 'up' },
    { titulo: 'Puntuación Promedio', valor: '4.8/5', cambio: '+0.3', tendencia: 'up' },
    { titulo: 'Puntualidad', valor: '98%', cambio: '+2%', tendencia: 'up' },
    { titulo: 'Tiempo Promedio', valor: '8.5h', cambio: '-0.5h', tendencia: 'down' },
  ];

  const logros = [
    { titulo: '100 Pedidos Completados', fecha: 'Hace 2 días', icon: Award, color: 'text-yellow-600' },
    { titulo: 'Empleado del Mes', fecha: 'Octubre 2024', icon: Star, color: 'text-purple-600' },
    { titulo: 'Puntualidad Perfecta', fecha: 'Hace 1 semana', icon: Clock, color: 'text-blue-600' },
    { titulo: 'Excelencia en Servicio', fecha: 'Hace 3 semanas', icon: Target, color: 'text-green-600' },
  ];

  const evaluaciones = [
    { 
      titulo: 'Evaluación Mensual - Octubre',
      fecha: '01 Nov 2024',
      puntuacion: 4.8,
      comentario: 'Excelente desempeño, sigue así',
      evaluador: 'Carlos Ruiz'
    },
    { 
      titulo: 'Evaluación Mensual - Septiembre',
      fecha: '01 Oct 2024',
      puntuacion: 4.5,
      comentario: 'Buen trabajo, mejorar en organización',
      evaluador: 'Carlos Ruiz'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-gray-900">Reportes y Desempeño</h2>
          <p className="text-gray-600">Visualiza tu rendimiento y logros</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar Reporte
        </Button>
      </div>

      {/* Métricas Principales */}
      <div className="grid md:grid-cols-4 gap-4">
        {metricas.map((metrica, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-gray-600 text-sm">{metrica.titulo}</p>
                <p className="text-gray-900 text-2xl">{metrica.valor}</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className={`w-4 h-4 ${
                    metrica.tendencia === 'up' ? 'text-green-600' : 'text-red-600'
                  }`} />
                  <span className={`text-sm ${
                    metrica.tendencia === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metrica.cambio}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Logros y Reconocimientos */}
      <Card>
        <CardHeader>
          <CardTitle>Logros y Reconocimientos</CardTitle>
          <CardDescription>Tus insignias y premios obtenidos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {logros.map((logro, index) => {
              const Icon = logro.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${logro.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{logro.titulo}</p>
                    <p className="text-gray-600 text-sm">{logro.fecha}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Evaluaciones de Desempeño */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluaciones de Desempeño</CardTitle>
          <CardDescription>Historial de evaluaciones recibidas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {evaluaciones.map((evaluacion, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-gray-900 mb-1">{evaluacion.titulo}</h3>
                    <p className="text-gray-600 text-sm">{evaluacion.fecha}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-900">{evaluacion.puntuacion}</span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg mb-3">
                  <p className="text-gray-700 text-sm italic">"{evaluacion.comentario}"</p>
                </div>
                <p className="text-gray-600 text-sm">Evaluado por: {evaluacion.evaluador}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Objetivos y Metas */}
      <Card>
        <CardHeader>
          <CardTitle>Objetivos y Metas</CardTitle>
          <CardDescription>Tus objetivos para este mes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <p className="text-gray-700">Completar 200 tareas</p>
                <span className="text-gray-600">156/200</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <p className="text-gray-700">Mantener puntuación 4.5+</p>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completado
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <p className="text-gray-700">Asistir a 2 capacitaciones</p>
                <span className="text-gray-600">1/2</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
