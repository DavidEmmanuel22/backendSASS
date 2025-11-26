import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { 
  Clock, 
  LogIn, 
  LogOut,
  Play,
  Pause,
  Calendar as CalendarIcon,
  Plus,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Timer,
  Coffee,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { format, addDays } from 'date-fns@4.1.0';
import { es } from 'date-fns@4.1.0/locale';
import { DateRange } from 'react-day-picker@9.4.3';

interface RegistroFichaje {
  id: string;
  tipo: 'entrada' | 'salida' | 'pausa' | 'reanudacion';
  hora: string;
  notas?: string;
}

interface SolicitudHoraExtra {
  id: string;
  fecha: string;
  rango: string;
  motivo: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
}

interface SolicitudVacaciones {
  id: string;
  rango: string;
  motivo: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
  dias: number;
}

interface FichajeTrabajadorProps {
  enTurno?: boolean;
  onFicharChange?: (enTurno: boolean) => void;
}

export function FichajeTrabajador({ enTurno: enTurnoExterno, onFicharChange }: FichajeTrabajadorProps = {}) {
  const [activeTab, setActiveTab] = useState('fichaje');
  const [enTurno, setEnTurno] = useState(enTurnoExterno || false);
  const [pausado, setPausado] = useState(false);
  const [tiempoFichaje, setTiempoFichaje] = useState(0);
  const [horaActual, setHoraActual] = useState(new Date());
  const [cambioTurnoModalOpen, setCambioTurnoModalOpen] = useState(false);
  const [horasExtraModalOpen, setHorasExtraModalOpen] = useState(false);
  const [vacacionesModalOpen, setVacacionesModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Sincronizar estado externo con interno
  useEffect(() => {
    if (enTurnoExterno !== undefined) {
      setEnTurno(enTurnoExterno);
    }
  }, [enTurnoExterno]);

  // Datos de ejemplo
  const [registrosHoy, setRegistrosHoy] = useState<RegistroFichaje[]>([
    { id: '1', tipo: 'entrada', hora: '09:00', notas: 'Inicio de jornada' },
  ]);

  const [solicitudesHorasExtra, setSolicitudesHorasExtra] = useState<SolicitudHoraExtra[]>([
    { id: '1', fecha: '15 Nov 2025', rango: '18:00 - 20:00', motivo: 'Trabajo urgente cliente', estado: 'pendiente' },
  ]);

  const [solicitudesVacaciones, setSolicitudesVacaciones] = useState<SolicitudVacaciones[]>([
    { id: '1', rango: '20-24 Dic 2025', motivo: 'Vacaciones navideñas', estado: 'aprobada', dias: 5 },
  ]);

  const vacacionesSaldo = {
    pendientes: 18,
    usadas: 7,
    totales: 25
  };

  const semana = [
    { dia: 'Lun 11', turno: 'Turno', horas: '09:00 - 18:00', previstas: 8, reales: 8 },
    { dia: 'Mar 12', turno: 'Turno', horas: '09:00 - 18:00', previstas: 8, reales: 8.5 },
    { dia: 'Mié 13', turno: 'Turno', horas: '09:00 - 18:00', previstas: 8, reales: 7.5 },
    { dia: 'Jue 14', turno: 'Turno', horas: '09:00 - 18:00', previstas: 8, reales: 8 },
    { dia: 'Vie 15', turno: 'Turno', horas: '09:00 - 18:00', previstas: 8, reales: 0 },
    { dia: 'Sáb 16', turno: 'Descanso', horas: '-', previstas: 0, reales: 0 },
    { dia: 'Dom 17', turno: 'Descanso', horas: '-', previstas: 0, reales: 0 },
  ];

  const totalPrevistas = semana.reduce((sum, d) => sum + d.previstas, 0);
  const totalReales = semana.reduce((sum, d) => sum + d.reales, 0);

  // Actualizar reloj
  useEffect(() => {
    const timer = setInterval(() => {
      setHoraActual(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cronómetro
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
    const segs = segundos % 60;
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
  };

  const handleFichar = () => {
    if (enTurno) {
      // Fichar salida
      const nuevoRegistro: RegistroFichaje = {
        id: Date.now().toString(),
        tipo: 'salida',
        hora: format(new Date(), 'HH:mm'),
      };
      setRegistrosHoy([...registrosHoy, nuevoRegistro]);
      setEnTurno(false);
      setTiempoFichaje(0);
      setPausado(false);
      toast.success('Salida registrada correctamente', {
        description: `Hora: ${nuevoRegistro.hora}`,
      });
      if (onFicharChange) {
        onFicharChange(false);
      }
    } else {
      // Fichar entrada
      const nuevoRegistro: RegistroFichaje = {
        id: Date.now().toString(),
        tipo: 'entrada',
        hora: format(new Date(), 'HH:mm'),
      };
      setRegistrosHoy([...registrosHoy, nuevoRegistro]);
      setEnTurno(true);
      setTiempoFichaje(0);
      toast.success('Entrada registrada correctamente', {
        description: `Hora: ${nuevoRegistro.hora}`,
      });
      if (onFicharChange) {
        onFicharChange(true);
      }
    }
  };

  const handlePausarContinuar = () => {
    if (pausado) {
      // Reanudar
      const nuevoRegistro: RegistroFichaje = {
        id: Date.now().toString(),
        tipo: 'reanudacion',
        hora: format(new Date(), 'HH:mm'),
      };
      setRegistrosHoy([...registrosHoy, nuevoRegistro]);
      setPausado(false);
      toast.info('Cronómetro reanudado', {
        description: `Hora: ${nuevoRegistro.hora}`,
      });
    } else {
      // Pausar
      const nuevoRegistro: RegistroFichaje = {
        id: Date.now().toString(),
        tipo: 'pausa',
        hora: format(new Date(), 'HH:mm'),
      };
      setRegistrosHoy([...registrosHoy, nuevoRegistro]);
      setPausado(true);
      toast.info('Pausa registrada', {
        description: `Hora: ${nuevoRegistro.hora}`,
      });
    }
  };

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, { label: string; icon: any; color: string }> = {
      entrada: { label: 'Entrada', icon: LogIn, color: 'text-green-600' },
      salida: { label: 'Salida', icon: LogOut, color: 'text-red-600' },
      pausa: { label: 'Pausa', icon: Coffee, color: 'text-orange-600' },
      reanudacion: { label: 'Reanudación', icon: Play, color: 'text-blue-600' },
    };
    return labels[tipo] || labels.entrada;
  };

  const getEstadoBadge = (estado: string) => {
    const estados: Record<string, { label: string; className: string }> = {
      pendiente: { label: 'Pendiente', className: 'bg-orange-100 text-orange-700' },
      aprobada: { label: 'Aprobada', className: 'bg-green-100 text-green-700' },
      rechazada: { label: 'Rechazada', className: 'bg-red-100 text-red-700' },
    };
    const badge = estados[estado] || estados.pendiente;
    return <Badge className={badge.className}>{badge.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="fichaje">Fichaje</TabsTrigger>
          <TabsTrigger value="horario">Horario</TabsTrigger>
          <TabsTrigger value="horasextra">Horas Extras</TabsTrigger>
          <TabsTrigger value="vacaciones">Vacaciones</TabsTrigger>
        </TabsList>

        {/* TAB: FICHAJE */}
        <TabsContent value="fichaje" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                Sistema de Fichaje
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Reloj */}
              <div className="text-center py-8">
                <Clock className="w-16 h-16 mx-auto mb-4 text-teal-600" />
                <p className="text-5xl text-gray-900 mb-2 font-mono" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {format(horaActual, 'HH:mm:ss')}
                </p>
                <p className="text-gray-600 mb-6">
                  {format(horaActual, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                </p>

                {/* Botón Fichar */}
                <Button
                  size="lg"
                  onClick={handleFichar}
                  className={`${enTurno ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} min-h-[56px] px-8`}
                >
                  {enTurno ? (
                    <>
                      <LogOut className="w-6 h-6 mr-2" />
                      Fichar Salida
                    </>
                  ) : (
                    <>
                      <LogIn className="w-6 h-6 mr-2" />
                      Fichar Entrada
                    </>
                  )}
                  <span className="ml-3 pl-3 border-l border-white/30 text-sm">
                    {enTurno ? 'En turno' : 'Fuera de turno'}
                  </span>
                </Button>
              </div>

              {/* Cronómetro */}
              {enTurno && (
                <div className="border-t pt-6">
                  <div className="bg-blue-50 rounded-lg p-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Timer className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-blue-700">Tiempo desde última entrada</span>
                    </div>
                    <p className="text-4xl text-blue-900 mb-4 font-mono" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {formatearTiempo(tiempoFichaje)}
                    </p>
                    <Button
                      variant="outline"
                      onClick={handlePausarContinuar}
                      className="border-blue-300 text-blue-700 hover:bg-blue-50"
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
                  </div>
                </div>
              )}

              {/* Registro de hoy */}
              <div className="border-t pt-6">
                <h3 className="text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Registro de Hoy
                </h3>
                <div className="space-y-2">
                  {registrosHoy.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p>No hay registros hoy</p>
                    </div>
                  ) : (
                    registrosHoy.map((registro) => {
                      const tipoInfo = getTipoLabel(registro.tipo);
                      const Icon = tipoInfo.icon;
                      return (
                        <div key={registro.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Icon className={`w-5 h-5 ${tipoInfo.color}`} />
                            <div>
                              <span className="text-gray-900 font-medium">{tipoInfo.label}</span>
                              {registro.notas && (
                                <p className="text-sm text-gray-600">{registro.notas}</p>
                              )}
                            </div>
                          </div>
                          <span className="text-gray-900 font-mono">{registro.hora}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: HORARIO */}
        <TabsContent value="horario" className="space-y-6">
          {/* Semana visible */}
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                Horario de esta Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {semana.map((dia, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="min-w-[80px]">
                        <p className="font-medium text-gray-900">{dia.dia}</p>
                      </div>
                      <Badge className={dia.turno === 'Turno' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-700'}>
                        {dia.turno}
                      </Badge>
                      <span className="text-gray-600">{dia.horas}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          Previstas: {dia.previstas}h | Reales: {dia.reales}h
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen */}
              <div className="mt-6 p-4 bg-teal-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-teal-700 mb-1">Total de la semana</p>
                    <p className="text-2xl text-teal-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Previstas: {totalPrevistas}h | Reales: {totalReales}h
                    </p>
                  </div>
                  {totalReales > totalPrevistas && (
                    <div className="flex items-center gap-2 text-green-700">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-medium">+{totalReales - totalPrevistas}h extra</span>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Solicitar Cambio de Turno */}
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => setCambioTurnoModalOpen(true)}
                  className="w-full"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Solicitar Cambio de Turno
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: HORAS EXTRAS */}
        <TabsContent value="horasextra" className="space-y-6">
          {/* Horas Extra */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Horas Extra
                </CardTitle>
                <Button
                  size="sm"
                  onClick={() => setHorasExtraModalOpen(true)}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Solicitar Extra
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {solicitudesHorasExtra.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>No tienes solicitudes de horas extra</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Rango</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {solicitudesHorasExtra.map((solicitud) => (
                      <TableRow key={solicitud.id}>
                        <TableCell>{solicitud.fecha}</TableCell>
                        <TableCell>{solicitud.rango}</TableCell>
                        <TableCell>{solicitud.motivo}</TableCell>
                        <TableCell>{getEstadoBadge(solicitud.estado)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: VACACIONES */}
        <TabsContent value="vacaciones" className="space-y-6">
          {/* Saldo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Pendientes</p>
                  <p className="text-4xl text-teal-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {vacacionesSaldo.pendientes}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">días</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Usadas</p>
                  <p className="text-4xl text-blue-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {vacacionesSaldo.usadas}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">días</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Totales</p>
                  <p className="text-4xl text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {vacacionesSaldo.totales}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">días</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendario */}
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                Seleccionar Rango de Vacaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
                locale={es}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Solicitudes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Mis Solicitudes
                </CardTitle>
                <Button
                  size="sm"
                  onClick={() => setVacacionesModalOpen(true)}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Solicitar Vacaciones
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {solicitudesVacaciones.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>No tienes solicitudes activas</p>
                  <p className="text-sm mt-1">Solicita tus próximas vacaciones usando el calendario</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rango</TableHead>
                      <TableHead>Días</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {solicitudesVacaciones.map((solicitud) => (
                      <TableRow key={solicitud.id}>
                        <TableCell>{solicitud.rango}</TableCell>
                        <TableCell>{solicitud.dias}</TableCell>
                        <TableCell>{solicitud.motivo}</TableCell>
                        <TableCell>{getEstadoBadge(solicitud.estado)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal: Solicitar Cambio de Turno */}
      <Dialog open={cambioTurnoModalOpen} onOpenChange={setCambioTurnoModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              Solicitar Cambio de Turno
            </DialogTitle>
            <DialogDescription>
              Completa los datos para solicitar un cambio en tu turno
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fecha-cambio">Fecha del turno a cambiar</Label>
              <Input id="fecha-cambio" type="date" className="min-h-[44px]" />
            </div>
            <div>
              <Label htmlFor="motivo-cambio">Motivo del cambio</Label>
              <Textarea
                id="motivo-cambio"
                placeholder="Describe el motivo del cambio de turno..."
                className="min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCambioTurnoModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700"
              onClick={() => {
                setCambioTurnoModalOpen(false);
                toast.success('Solicitud enviada correctamente');
              }}
            >
              Enviar Solicitud
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Solicitar Horas Extra */}
      <Dialog open={horasExtraModalOpen} onOpenChange={setHorasExtraModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              Solicitar Horas Extra
            </DialogTitle>
            <DialogDescription>
              Indica la fecha, rango horario y motivo de las horas extra
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fecha-extra">Fecha</Label>
              <Input id="fecha-extra" type="date" className="min-h-[44px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hora-inicio">Hora inicio</Label>
                <Input id="hora-inicio" type="time" className="min-h-[44px]" />
              </div>
              <div>
                <Label htmlFor="hora-fin">Hora fin</Label>
                <Input id="hora-fin" type="time" className="min-h-[44px]" />
              </div>
            </div>
            <div>
              <Label htmlFor="motivo-extra">Motivo</Label>
              <Textarea
                id="motivo-extra"
                placeholder="Describe el motivo de las horas extra..."
                className="min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setHorasExtraModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700"
              onClick={() => {
                setHorasExtraModalOpen(false);
                toast.success('Solicitud de horas extra enviada');
              }}
            >
              Enviar Solicitud
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Solicitar Vacaciones */}
      <Dialog open={vacacionesModalOpen} onOpenChange={setVacacionesModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              Solicitar Vacaciones
            </DialogTitle>
            <DialogDescription>
              Selecciona el rango de fechas y describe el motivo
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Rango seleccionado</Label>
              <div className="p-3 bg-gray-50 rounded-lg text-sm">
                {dateRange?.from && dateRange?.to ? (
                  <p>
                    {format(dateRange.from, 'dd/MM/yyyy', { locale: es })} - {format(dateRange.to, 'dd/MM/yyyy', { locale: es })}
                  </p>
                ) : (
                  <p className="text-gray-500">Selecciona un rango en el calendario</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="motivo-vacaciones">Motivo</Label>
              <Textarea
                id="motivo-vacaciones"
                placeholder="Describe el motivo de las vacaciones..."
                className="min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setVacacionesModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700"
              disabled={!dateRange?.from || !dateRange?.to}
              onClick={() => {
                setVacacionesModalOpen(false);
                toast.success('Solicitud de vacaciones enviada');
              }}
            >
              Enviar Solicitud
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}