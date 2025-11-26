import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  HelpCircle, 
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Search,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function SoporteColaborador() {
  const preguntasFrecuentes = [
    {
      categoria: 'Fichaje',
      preguntas: [
        '¿Cómo fichar entrada y salida?',
        '¿Qué hago si olvidé fichar?',
        '¿Cómo solicitar corrección de fichaje?',
      ]
    },
    {
      categoria: 'Tareas',
      preguntas: [
        '¿Cómo marcar una tarea como completada?',
        '¿Cómo reportar un problema con una tarea?',
        '¿Puedo reasignar una tarea?',
      ]
    },
    {
      categoria: 'Formación',
      preguntas: [
        '¿Cómo accedo a los cursos?',
        '¿Los cursos son obligatorios?',
        '¿Cómo obtengo mi certificado?',
      ]
    },
  ];

  const canalesSoporte = [
    {
      titulo: 'Chat en Vivo',
      descripcion: 'Respuesta inmediata de nuestro equipo',
      icon: MessageCircle,
      disponibilidad: 'Lun-Vie 8AM-8PM',
      color: 'text-teal-600',
    },
    {
      titulo: 'Teléfono',
      descripcion: 'Llámanos al (55) 1234-5678',
      icon: Phone,
      disponibilidad: '24/7',
      color: 'text-blue-600',
    },
    {
      titulo: 'Email',
      descripcion: 'soporte@fooddigital.com',
      icon: Mail,
      disponibilidad: 'Respuesta en 24h',
      color: 'text-purple-600',
    },
  ];

  const recursosUtiles = [
    { titulo: 'Manual del Colaborador', tipo: 'PDF', tamaño: '2.5 MB' },
    { titulo: 'Guía de Procedimientos', tipo: 'PDF', tamaño: '1.8 MB' },
    { titulo: 'Video Tutorial - Fichaje', tipo: 'Video', tamaño: '45 MB' },
    { titulo: 'FAQ Completo', tipo: 'PDF', tamaño: '890 KB' },
  ];

  const handleEnviarSolicitud = () => {
    toast.success('Solicitud de soporte enviada correctamente');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900">Centro de Soporte</h2>
        <p className="text-gray-600">Estamos aquí para ayudarte</p>
      </div>

      {/* Canales de Soporte */}
      <div className="grid md:grid-cols-3 gap-4">
        {canalesSoporte.map((canal, index) => {
          const Icon = canal.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${canal.color}`} />
                  </div>
                  <h3 className="text-gray-900 mb-2">{canal.titulo}</h3>
                  <p className="text-gray-600 text-sm mb-2">{canal.descripcion}</p>
                  <Badge variant="outline" className="text-xs">
                    {canal.disponibilidad}
                  </Badge>
                  <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">
                    Contactar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Formulario de Solicitud */}
      <Card>
        <CardHeader>
          <CardTitle>Enviar Solicitud de Soporte</CardTitle>
          <CardDescription>Describe tu problema y te ayudaremos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-700">Asunto</label>
              <Input placeholder="¿En qué podemos ayudarte?" />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700">Categoría</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Selecciona una categoría</option>
                <option>Fichaje</option>
                <option>Tareas</option>
                <option>Formación</option>
                <option>Reportes</option>
                <option>Técnico</option>
                <option>Otro</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700">Descripción</label>
              <Textarea 
                placeholder="Describe tu problema en detalle..."
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-700">Prioridad</label>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-800 cursor-pointer hover:bg-green-200">
                  Baja
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-800 cursor-pointer hover:bg-yellow-200">
                  Media
                </Badge>
                <Badge className="bg-red-100 text-red-800 cursor-pointer hover:bg-red-200">
                  Alta
                </Badge>
              </div>
            </div>

            <Button 
              className="w-full bg-teal-600 hover:bg-teal-700"
              onClick={handleEnviarSolicitud}
            >
              Enviar Solicitud
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preguntas Frecuentes */}
      <Card>
        <CardHeader>
          <CardTitle>Preguntas Frecuentes</CardTitle>
          <CardDescription>Encuentra respuestas rápidas</CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Buscar en FAQ..." className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {preguntasFrecuentes.map((categoria, index) => (
              <div key={index}>
                <h3 className="text-gray-900 mb-3">{categoria.categoria}</h3>
                <div className="space-y-2">
                  {categoria.preguntas.map((pregunta, idx) => (
                    <button
                      key={idx}
                      className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{pregunta}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recursos Útiles */}
      <Card>
        <CardHeader>
          <CardTitle>Recursos y Documentación</CardTitle>
          <CardDescription>Manuales y guías de ayuda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recursosUtiles.map((recurso, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">{recurso.titulo}</p>
                    <p className="text-gray-600 text-sm">
                      {recurso.tipo} · {recurso.tamaño}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
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
