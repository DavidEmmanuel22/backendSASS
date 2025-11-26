import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Calendar as CalendarIcon, Clock, Wrench, Car, Settings, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Cita {
  id: string;
  fecha: Date;
  hora: string;
  servicio: string;
  vehiculo: string;
  estado: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
  notas?: string;
}

export function CitasCliente() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState('');
  const [notas, setNotas] = useState('');

  const [citas, setCitas] = useState<Cita[]>([
    {
      id: '1',
      fecha: new Date(2025, 10, 15),
      hora: '10:00',
      servicio: 'Cambio de Aceite',
      vehiculo: 'Toyota Corolla 2020',
      estado: 'confirmada',
      notas: 'Incluye filtro de aceite',
    },
    {
      id: '2',
      fecha: new Date(2025, 10, 20),
      hora: '14:30',
      servicio: 'Revisión de Frenos',
      vehiculo: 'Honda Civic 2019',
      estado: 'pendiente',
    },
    {
      id: '3',
      fecha: new Date(2025, 9, 28),
      hora: '11:00',
      servicio: 'Alineación y Balanceo',
      vehiculo: 'Toyota Corolla 2020',
      estado: 'completada',
    },
  ]);

  const servicios = [
    'Cambio de Aceite',
    'Revisión de Frenos',
    'Alineación y Balanceo',
    'Cambio de Neumáticos',
    'Revisión General',
    'Reparación de Motor',
    'Aire Acondicionado',
    'Sistema Eléctrico',
    'Suspensión',
    'Transmisión',
  ];

  const vehiculos = [
    'Toyota Corolla 2020',
    'Honda Civic 2019',
    'Ford Focus 2021',
  ];

  const horasDisponibles = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00',
  ];

  const handleCrearCita = () => {
    if (!date || !horaSeleccionada || !servicioSeleccionado || !vehiculoSeleccionado) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    const nuevaCita: Cita = {
      id: Date.now().toString(),
      fecha: date,
      hora: horaSeleccionada,
      servicio: servicioSeleccionado,
      vehiculo: vehiculoSeleccionado,
      estado: 'pendiente',
      notas: notas,
    };

    setCitas([...citas, nuevaCita]);
    toast.success('Cita creada exitosamente');
    setDialogOpen(false);
    
    // Resetear formulario
    setHoraSeleccionada('');
    setServicioSeleccionado('');
    setVehiculoSeleccionado('');
    setNotas('');
  };

  const getEstadoBadge = (estado: Cita['estado']) => {
    const estados = {
      pendiente: { icon: AlertCircle, className: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pendiente' },
      confirmada: { icon: CheckCircle2, className: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Confirmada' },
      completada: { icon: CheckCircle2, className: 'bg-green-100 text-green-800 border-green-200', label: 'Completada' },
      cancelada: { icon: XCircle, className: 'bg-red-100 text-red-800 border-red-200', label: 'Cancelada' },
    };

    const config = estados[estado];
    const Icon = config.icon;

    return (
      <Badge variant="outline" className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const citasPendientes = citas.filter(c => c.estado === 'pendiente' || c.estado === 'confirmada');
  const citasCompletadas = citas.filter(c => c.estado === 'completada');

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Citas Pendientes</p>
                <p className="text-gray-900 text-2xl">{citasPendientes.length}</p>
              </div>
              <CalendarIcon className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Citas Completadas</p>
                <p className="text-gray-900 text-2xl">{citasCompletadas.length}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total de Citas</p>
                <p className="text-gray-900 text-2xl">{citas.length}</p>
              </div>
              <Clock className="w-8 h-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nueva Cita Button y Calendario */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendario */}
        <Card>
          <CardHeader>
            <CardTitle>Selecciona una Fecha</CardTitle>
            <CardDescription>Elige el día para tu cita en el taller</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </CardContent>
        </Card>

        {/* Formulario de Nueva Cita */}
        <Card>
          <CardHeader>
            <CardTitle>Agendar Nueva Cita</CardTitle>
            <CardDescription>Completa los datos para solicitar tu cita</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Fecha Seleccionada</Label>
              <div className="flex items-center gap-2 p-3 bg-teal-50 rounded-lg border border-teal-200">
                <CalendarIcon className="w-5 h-5 text-teal-600" />
                <span className="text-gray-900">
                  {date ? date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Selecciona una fecha'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hora">Hora *</Label>
              <Select value={horaSeleccionada} onValueChange={setHoraSeleccionada}>
                <SelectTrigger id="hora">
                  <SelectValue placeholder="Selecciona la hora" />
                </SelectTrigger>
                <SelectContent>
                  {horasDisponibles.map((hora) => (
                    <SelectItem key={hora} value={hora}>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {hora}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="servicio">Servicio *</Label>
              <Select value={servicioSeleccionado} onValueChange={setServicioSeleccionado}>
                <SelectTrigger id="servicio">
                  <SelectValue placeholder="Selecciona el servicio" />
                </SelectTrigger>
                <SelectContent>
                  {servicios.map((servicio) => (
                    <SelectItem key={servicio} value={servicio}>
                      <div className="flex items-center gap-2">
                        <Wrench className="w-4 h-4" />
                        {servicio}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehiculo">Vehículo *</Label>
              <Select value={vehiculoSeleccionado} onValueChange={setVehiculoSeleccionado}>
                <SelectTrigger id="vehiculo">
                  <SelectValue placeholder="Selecciona tu vehículo" />
                </SelectTrigger>
                <SelectContent>
                  {vehiculos.map((vehiculo) => (
                    <SelectItem key={vehiculo} value={vehiculo}>
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        {vehiculo}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notas">Notas adicionales (opcional)</Label>
              <Textarea
                id="notas"
                placeholder="Describe cualquier detalle adicional sobre tu vehículo o el servicio que necesitas..."
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                rows={3}
              />
            </div>

            <Button 
              className="w-full bg-teal-600 hover:bg-teal-700"
              onClick={handleCrearCita}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              Solicitar Cita
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Citas */}
      <Card>
        <CardHeader>
          <CardTitle>Mis Citas</CardTitle>
          <CardDescription>Historial y próximas citas programadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {citas.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No tienes citas programadas</p>
                <p className="text-sm mt-2">Agenda tu primera cita usando el formulario arriba</p>
              </div>
            ) : (
              citas
                .sort((a, b) => b.fecha.getTime() - a.fecha.getTime())
                .map((cita) => (
                  <div
                    key={cita.id}
                    className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-teal-100 p-3 rounded-lg">
                        <CalendarIcon className="w-6 h-6 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-gray-900">{cita.servicio}</h4>
                          {getEstadoBadge(cita.estado)}
                        </div>
                        <div className="flex flex-col gap-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{cita.fecha.toLocaleDateString('es-ES')}</span>
                            <Clock className="w-4 h-4 ml-2" />
                            <span>{cita.hora}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Car className="w-4 h-4" />
                            <span>{cita.vehiculo}</span>
                          </div>
                          {cita.notas && (
                            <p className="text-gray-500 text-xs mt-1">{cita.notas}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {cita.estado === 'pendiente' && (
                        <>
                          <Button variant="outline" size="sm">
                            Modificar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            Cancelar
                          </Button>
                        </>
                      )}
                      {cita.estado === 'confirmada' && (
                        <Button variant="outline" size="sm" className="text-teal-600 hover:text-teal-700">
                          Ver Detalles
                        </Button>
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
