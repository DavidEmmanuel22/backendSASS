import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { 
  Clock, 
  Play, 
  Pause,
  CheckCircle2,
  ClipboardList,
  BarChart3,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Search,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function InicioTrabajador() {
  const [enTurno, setEnTurno] = useState(true);
  const [tiempoFichaje, setTiempoFichaje] = useState(0); // en segundos
  const [pausado, setPausado] = useState(false);

  // Simular cronómetro
  useEffect(() => {
    if (enTurno && !pausado) {
      const interval = setInterval(() => {
        setTiempoFichaje((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [enTurno, pausado]);

  const formatearTiempo = (segundos: number): string => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
  };

  const handleFichar = () => {
    if (enTurno) {
      setEnTurno(false);
      setTiempoFichaje(0);
      toast.success('Fichaje de salida registrado correctamente');
    } else {
      setEnTurno(true);
      setTiempoFichaje(0);
      toast.success('Fichaje de entrada registrado correctamente');
    }
  };

  const handlePausarContinuar = () => {
    setPausado(!pausado);
    toast.info(pausado ? 'Cronómetro reanudado' : 'Cronómetro pausado');
  };

  const handleEmpezarTarea = () => {
    toast.success('Tarea iniciada');
  };

  const handleReanudarCurso = () => {
    toast.info('Reanudando curso...');
  };

  // Datos de ejemplo
  const tareasHechas = 3;
  const tareasPendientes = 5;
  const totalTareas = tareasHechas + tareasPendientes;
  const progresoTareas = (tareasHechas / totalTareas) * 100;

  const horasObjetivo = 40;
  const horasReales = 38;
  const proyeccionViernes = 42;

  const rendimientoCalidad = 92;
  const tendenciaPositiva = true;

  return (
    <div className="space-y-6">
      {/* Header con Fichar y Búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleFichar}
            className={enTurno ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
            size="lg"
          >
            <Clock className="w-5 h-5 mr-2" />
            Fichar {enTurno ? 'Salida' : 'Entrada'}
            <div className="ml-3 pl-3 border-l border-white/30 text-xs">
              {enTurno ? 'En turno' : 'Fuera de turno'}
              <br />
              <span className="opacity-80">
                {enTurno ? formatearTiempo(tiempoFichaje) : 'Último 08:30'}
              </span>
            </div>
          </Button>
        </div>

        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar..."
            className="pl-10 pr-24 sm:w-80"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-gray-100 border border-gray-300 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Tarjetas KPI Actualizadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mi Hoy */}
        <Card className="border-teal-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <ClipboardList className="w-5 h-5 text-teal-600" />
              Mi Hoy
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tareasPendientes > 0 ? (
              <>
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Próxima tarea:</p>
                  <p className="font-medium mb-2">Limpieza profunda zona cocina</p>
                  <Badge variant="outline" className="border-orange-300 text-orange-700 text-xs">
                    Alta Prioridad
                  </Badge>
                </div>
                <Button 
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  onClick={handleEmpezarTarea}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Empezar
                </Button>
              </>
            ) : (
              <div className="text-center py-4">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-500" />
                <p className="text-sm text-gray-600 mb-3">Sin tareas hoy</p>
                <Button variant="outline" size="sm">
                  Crear recordatorio
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Fichaje - Cronómetro */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <Clock className="w-5 h-5 text-blue-600" />
              Fichaje – Cronómetro
            </CardTitle>
          </CardHeader>
          <CardContent>
            {enTurno ? (
              <>
                <div className="text-center mb-4">
                  <div className="text-4xl font-mono mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {formatearTiempo(tiempoFichaje)}
                  </div>
                  <p className="text-sm text-gray-600">desde la última entrada</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handlePausarContinuar}
                >
                  {pausado ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Continuar
                    </>
                  ) : (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pausar
                    </>
                  )}
                </Button>
              </>
            ) : (
              <div className="text-center py-4">
                <Clock className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">No has fichado entrada</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tareas */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <ClipboardList className="w-5 h-5 text-orange-600" />
              Tareas
              <span className="text-sm text-gray-500 font-normal ml-auto">pendientes hoy</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Hechas / Pendientes</span>
                <span className="font-medium">{tareasHechas} / {tareasPendientes}</span>
              </div>
              <Progress value={progresoTareas} className="h-2" />
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{Math.round(progresoTareas)}% completado</span>
                <span>{totalTareas} totales</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Horas */}
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <Clock className="w-5 h-5 text-purple-600" />
              Horas
              <span className="text-sm text-gray-500 font-normal ml-auto">esta semana</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Objetivo</span>
                <span className="font-medium">{horasObjetivo}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Reales</span>
                <span className="font-medium text-purple-600">{horasReales}h</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Proyección viernes</span>
                  <span className={proyeccionViernes >= horasObjetivo ? 'text-green-600 font-medium' : 'text-orange-600 font-medium'}>
                    {proyeccionViernes}h
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rendimiento */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <BarChart3 className="w-5 h-5 text-green-600" />
              Rendimiento
              <span className="text-sm text-gray-500 font-normal ml-auto">tus métricas personales</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">% Calidad personal</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-medium text-green-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {rendimientoCalidad}%
                  </span>
                  {tendenciaPositiva ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </div>
              <div className="text-right">
                <Badge className={tendenciaPositiva ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                  {tendenciaPositiva ? '+5.2%' : '-2.1%'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formación */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <GraduationCap className="w-5 h-5 text-blue-600" />
              Formación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
              <Badge variant="outline" className="mb-2 border-blue-300 text-blue-700 text-xs">
                Curso Recomendado
              </Badge>
              <p className="font-medium mb-1">Manipulación de Alimentos Avanzada</p>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <span>Módulo 3 de 8</span>
                <span>•</span>
                <span>37% completado</span>
              </div>
              <Progress value={37} className="h-2 mb-3" />
            </div>
            <Button 
              variant="outline" 
              className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={handleReanudarCurso}
            >
              <Play className="w-4 h-4 mr-2" />
              Reanudar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}