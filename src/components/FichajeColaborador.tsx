import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Clock, 
  PlayCircle, 
  PauseCircle, 
  StopCircle,
  Calendar,
  TrendingUp,
  Coffee
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function FichajeColaborador() {
  const [fichadoActivo, setFichadoActivo] = useState(false);
  const [enPausa, setEnPausa] = useState(false);
  const [tiempoActual, setTiempoActual] = useState('00:00:00');

  const registrosHoy = [
    { tipo: 'entrada', hora: '09:00 AM', fecha: 'Hoy' },
    { tipo: 'pausa', hora: '11:30 AM', fecha: 'Hoy' },
    { tipo: 'reanudacion', hora: '11:45 AM', fecha: 'Hoy' },
  ];

  const registrosSemana = [
    { dia: 'Lunes', entrada: '09:00 AM', salida: '06:00 PM', horas: '8h 00m' },
    { dia: 'Martes', entrada: '09:05 AM', salida: '06:10 PM', horas: '8h 05m' },
    { dia: 'Miércoles', entrada: '08:55 AM', salida: '05:55 PM', horas: '8h 00m' },
    { dia: 'Jueves', entrada: '09:00 AM', salida: '06:00 PM', horas: '8h 00m' },
    { dia: 'Viernes', entrada: '09:00 AM', salida: '-', horas: 'En curso' },
  ];

  const handleFichar = () => {
    if (!fichadoActivo) {
      setFichadoActivo(true);
      toast.success('Fichaje de entrada registrado');
    } else {
      setFichadoActivo(false);
      setEnPausa(false);
      toast.success('Fichaje de salida registrado');
    }
  };

  const handlePausa = () => {
    if (!enPausa) {
      setEnPausa(true);
      toast.info('Pausa iniciada');
    } else {
      setEnPausa(false);
      toast.info('Pausa finalizada');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900">Control de Fichaje</h2>
        <p className="text-gray-600">Registra tu jornada laboral</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Horas Hoy</p>
                <p className="text-gray-900 text-2xl">8h 15m</p>
              </div>
              <Clock className="w-8 h-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Horas Semana</p>
                <p className="text-gray-900 text-2xl">32h 05m</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Puntualidad</p>
                <p className="text-gray-900 text-2xl">98%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pausas Hoy</p>
                <p className="text-gray-900 text-2xl">1</p>
              </div>
              <Coffee className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reloj Fichaje */}
      <Card className="border-2 border-teal-200">
        <CardHeader>
          <CardTitle>Fichaje Actual</CardTitle>
          <CardDescription>Controla tu jornada laboral</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Reloj */}
          <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg">
            <div className="text-6xl text-gray-900 mb-4" style={{ fontFamily: 'monospace' }}>
              {tiempoActual}
            </div>
            <Badge className={fichadoActivo ? 'bg-green-600' : 'bg-gray-400'}>
              {fichadoActivo ? (enPausa ? 'En Pausa' : 'Trabajando') : 'No Fichado'}
            </Badge>
          </div>

          {/* Botones de Control */}
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              onClick={handleFichar}
              className={fichadoActivo ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
              size="lg"
            >
              {fichadoActivo ? (
                <>
                  <StopCircle className="w-5 h-5 mr-2" />
                  Fichar Salida
                </>
              ) : (
                <>
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Fichar Entrada
                </>
              )}
            </Button>

            <Button
              onClick={handlePausa}
              variant="outline"
              size="lg"
              disabled={!fichadoActivo}
              className="border-2"
            >
              <PauseCircle className="w-5 h-5 mr-2" />
              {enPausa ? 'Reanudar' : 'Pausar'}
            </Button>

            <Button variant="outline" size="lg">
              <Clock className="w-5 h-5 mr-2" />
              Ver Historial
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Registros de Hoy */}
      <Card>
        <CardHeader>
          <CardTitle>Registros de Hoy</CardTitle>
          <CardDescription>Detalle de fichajes del día</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {registrosHoy.map((registro, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  registro.tipo === 'entrada' ? 'bg-green-100' :
                  registro.tipo === 'pausa' ? 'bg-orange-100' :
                  'bg-blue-100'
                }`}>
                  <Clock className={`w-5 h-5 ${
                    registro.tipo === 'entrada' ? 'text-green-600' :
                    registro.tipo === 'pausa' ? 'text-orange-600' :
                    'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 capitalize">{registro.tipo}</p>
                  <p className="text-gray-600 text-sm">{registro.fecha}</p>
                </div>
                <p className="text-gray-900">{registro.hora}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resumen Semanal */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen Semanal</CardTitle>
          <CardDescription>Registro de horas trabajadas esta semana</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {registrosSemana.map((registro, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">{registro.dia}</p>
                    <p className="text-gray-600 text-sm">
                      {registro.entrada} - {registro.salida}
                    </p>
                  </div>
                </div>
                <Badge className={registro.horas === 'En curso' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                  {registro.horas}
                </Badge>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
            <div className="flex items-center justify-between">
              <p className="text-gray-700">Total horas esta semana:</p>
              <p className="text-teal-700 text-xl">32h 05m</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
