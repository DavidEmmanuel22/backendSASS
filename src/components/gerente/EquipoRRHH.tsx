import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Users, 
  Clock, 
  Calendar,
  AlertCircle,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  TrendingUp,
  FileText,
  Plus,
  Filter,
  Download
} from 'lucide-react';
import { format, addDays, startOfWeek } from 'date-fns@4.1.0';
import { es } from 'date-fns@4.1.0/locale';
import { toast } from 'sonner@2.0.3';

interface Empleado {
  id: string;
  nombre: string;
  apellidos: string;
  puesto: string;
  departamento: string;
  email: string;
  telefono: string;
  avatar?: string;
  estado: 'activo' | 'vacaciones' | 'baja';
  horasTrabajadas: number;
  horasContrato: number;
  fechaIngreso: string;
}

interface RegistroHorario {
  id: string;
  empleadoId: string;
  empleadoNombre: string;
  fecha: string;
  horaEntrada: string;
  horaSalida?: string;
  totalHoras?: number;
  tipo: 'regular' | 'extra' | 'nocturno';
}

interface SolicitudHoraExtra {
  id: string;
  empleadoId: string;
  empleadoNombre: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  totalHoras: number;
  motivo: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
  fechaSolicitud: string;
}

interface Incidencia {
  id: string;
  empleadoId: string;
  empleadoNombre: string;
  tipo: 'ausencia' | 'retraso' | 'falta' | 'otro';
  fecha: string;
  descripcion: string;
  estado: 'abierta' | 'resuelta' | 'en-revision';
  prioridad: 'baja' | 'media' | 'alta';
}

export function EquipoRRHH() {
  const [activeTab, setActiveTab] = useState('equipo');
  const [modalAñadirEmpleado, setModalAñadirEmpleado] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: ''
  });

  const handleAñadirEmpleado = () => {
    if (!nuevoEmpleado.nombre || !nuevoEmpleado.apellidos || !nuevoEmpleado.telefono || !nuevoEmpleado.email) {
      toast.error('Por favor, completa todos los campos');
      return;
    }
    
    // Aquí iría la lógica para añadir el empleado
    toast.success(`Empleado ${nuevoEmpleado.nombre} ${nuevoEmpleado.apellidos} añadido correctamente`);
    setModalAñadirEmpleado(false);
    setNuevoEmpleado({ nombre: '', apellidos: '', telefono: '', email: '' });
  };

  const empleados: Empleado[] = [
    {
      id: 'EMP-001',
      nombre: 'Carlos',
      apellidos: 'Méndez García',
      puesto: 'Panadero Maestro',
      departamento: 'Producción',
      email: 'carlos.mendez@canfarines.com',
      telefono: '+34 610 234 567',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      estado: 'activo',
      horasTrabajadas: 168,
      horasContrato: 160,
      fechaIngreso: '2023-01-15'
    },
    {
      id: 'EMP-002',
      nombre: 'María',
      apellidos: 'González López',
      puesto: 'Responsable de Bollería',
      departamento: 'Producción',
      email: 'maria.gonzalez@canfarines.com',
      telefono: '+34 620 345 678',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      estado: 'activo',
      horasTrabajadas: 155,
      horasContrato: 160,
      fechaIngreso: '2023-03-20'
    },
    {
      id: 'EMP-003',
      nombre: 'Laura',
      apellidos: 'Martínez Ruiz',
      puesto: 'Dependienta',
      departamento: 'Ventas',
      email: 'laura.martinez@canfarines.com',
      telefono: '+34 630 456 789',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
      estado: 'activo',
      horasTrabajadas: 158,
      horasContrato: 160,
      fechaIngreso: '2023-06-10'
    },
    {
      id: 'EMP-004',
      nombre: 'Javier',
      apellidos: 'Torres Sánchez',
      puesto: 'Ayudante de Panadería',
      departamento: 'Producción',
      email: 'javier.torres@canfarines.com',
      telefono: '+34 640 567 890',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Javier',
      estado: 'vacaciones',
      horasTrabajadas: 120,
      horasContrato: 160,
      fechaIngreso: '2024-02-01'
    },
    {
      id: 'EMP-005',
      nombre: 'Ana',
      apellidos: 'Rodríguez Pérez',
      puesto: 'Encargada de Turno',
      departamento: 'Ventas',
      email: 'ana.rodriguez@canfarines.com',
      telefono: '+34 650 678 901',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
      estado: 'activo',
      horasTrabajadas: 162,
      horasContrato: 160,
      fechaIngreso: '2022-11-05'
    }
  ];

  const registrosHorarios: RegistroHorario[] = [
    {
      id: 'REG-001',
      empleadoId: 'EMP-001',
      empleadoNombre: 'Carlos Méndez',
      fecha: '2025-11-18',
      horaEntrada: '06:00',
      horaSalida: '14:30',
      totalHoras: 8.5,
      tipo: 'regular'
    },
    {
      id: 'REG-002',
      empleadoId: 'EMP-002',
      empleadoNombre: 'María González',
      fecha: '2025-11-18',
      horaEntrada: '07:00',
      horaSalida: '15:00',
      totalHoras: 8,
      tipo: 'regular'
    },
    {
      id: 'REG-003',
      empleadoId: 'EMP-003',
      empleadoNombre: 'Laura Martínez',
      fecha: '2025-11-18',
      horaEntrada: '09:00',
      totalHoras: undefined,
      tipo: 'regular'
    },
    {
      id: 'REG-004',
      empleadoId: 'EMP-001',
      empleadoNombre: 'Carlos Méndez',
      fecha: '2025-11-17',
      horaEntrada: '06:00',
      horaSalida: '16:00',
      totalHoras: 10,
      tipo: 'extra'
    },
    {
      id: 'REG-005',
      empleadoId: 'EMP-005',
      empleadoNombre: 'Ana Rodríguez',
      fecha: '2025-11-18',
      horaEntrada: '08:00',
      horaSalida: '16:00',
      totalHoras: 8,
      tipo: 'regular'
    }
  ];

  const solicitudesHorasExtras: SolicitudHoraExtra[] = [
    {
      id: 'SOL-001',
      empleadoId: 'EMP-001',
      empleadoNombre: 'Carlos Méndez',
      fecha: '2025-11-20',
      horaInicio: '15:00',
      horaFin: '18:00',
      totalHoras: 3,
      motivo: 'Pedido especial para evento corporativo',
      estado: 'pendiente',
      fechaSolicitud: '2025-11-17T10:30:00'
    },
    {
      id: 'SOL-002',
      empleadoId: 'EMP-002',
      empleadoNombre: 'María González',
      fecha: '2025-11-19',
      horaInicio: '16:00',
      horaFin: '19:00',
      totalHoras: 3,
      motivo: 'Preparación masa para fin de semana',
      estado: 'aprobada',
      fechaSolicitud: '2025-11-16T14:20:00'
    },
    {
      id: 'SOL-003',
      empleadoId: 'EMP-005',
      empleadoNombre: 'Ana Rodríguez',
      fecha: '2025-11-21',
      horaInicio: '17:00',
      horaFin: '20:00',
      totalHoras: 3,
      motivo: 'Cubrir turno de compañero enfermo',
      estado: 'pendiente',
      fechaSolicitud: '2025-11-17T16:45:00'
    }
  ];

  const incidencias: Incidencia[] = [
    {
      id: 'INC-001',
      empleadoId: 'EMP-003',
      empleadoNombre: 'Laura Martínez',
      tipo: 'retraso',
      fecha: '2025-11-15',
      descripcion: 'Llegada 20 minutos tarde por problemas de transporte',
      estado: 'resuelta',
      prioridad: 'baja'
    },
    {
      id: 'INC-002',
      empleadoId: 'EMP-004',
      empleadoNombre: 'Javier Torres',
      tipo: 'ausencia',
      fecha: '2025-11-10',
      descripcion: 'Ausencia justificada por cita médica',
      estado: 'resuelta',
      prioridad: 'media'
    },
    {
      id: 'INC-003',
      empleadoId: 'EMP-001',
      empleadoNombre: 'Carlos Méndez',
      tipo: 'otro',
      fecha: '2025-11-18',
      descripcion: 'Solicitud de cambio de turno para próxima semana',
      estado: 'en-revision',
      prioridad: 'media'
    }
  ];

  const getEstadoBadge = (estado: string) => {
    const configs = {
      activo: { variant: 'default' as const, className: 'bg-green-600', label: 'Activo' },
      vacaciones: { variant: 'default' as const, className: 'bg-blue-600', label: 'Vacaciones' },
      baja: { variant: 'default' as const, className: 'bg-red-600', label: 'Baja' },
      pendiente: { variant: 'default' as const, className: 'bg-yellow-600', label: 'Pendiente' },
      aprobada: { variant: 'default' as const, className: 'bg-green-600', label: 'Aprobada' },
      rechazada: { variant: 'default' as const, className: 'bg-red-600', label: 'Rechazada' },
      abierta: { variant: 'default' as const, className: 'bg-orange-600', label: 'Abierta' },
      resuelta: { variant: 'default' as const, className: 'bg-green-600', label: 'Resuelta' },
      'en-revision': { variant: 'default' as const, className: 'bg-blue-600', label: 'En Revisión' }
    };
    const config = configs[estado as keyof typeof configs] || configs.activo;
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>;
  };

  const getTipoIncidenciaIcon = (tipo: string) => {
    const icons = {
      ausencia: <XCircle className="w-5 h-5 text-red-600" />,
      retraso: <Clock className="w-5 h-5 text-orange-600" />,
      falta: <AlertCircle className="w-5 h-5 text-red-600" />,
      otro: <FileText className="w-5 h-5 text-blue-600" />
    };
    return icons[tipo as keyof typeof icons] || icons.otro;
  };

  // Generar datos del calendario semanal
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Equipo y Recursos Humanos
        </h1>
        <p className="text-gray-600">
          Gestión completa del equipo, horarios, horas extras e incidencias
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="equipo">
            <Users className="w-4 h-4 mr-2" />
            Equipo
          </TabsTrigger>
          <TabsTrigger value="horarios">
            <Clock className="w-4 h-4 mr-2" />
            Horarios
          </TabsTrigger>
          <TabsTrigger value="horas-extras">
            <TrendingUp className="w-4 h-4 mr-2" />
            Horas Extras
          </TabsTrigger>
          <TabsTrigger value="incidencias">
            <AlertCircle className="w-4 h-4 mr-2" />
            Incidencias
          </TabsTrigger>
        </TabsList>

        {/* TAB: EQUIPO */}
        <TabsContent value="equipo" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Listado del Equipo
                </CardTitle>
                <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => setModalAñadirEmpleado(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Añadir Empleado
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {empleados.map((empleado) => (
                  <div
                    key={empleado.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={empleado.avatar} alt={empleado.nombre} />
                      <AvatarFallback>
                        {empleado.nombre.charAt(0)}{empleado.apellidos.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-gray-900">
                          {empleado.nombre} {empleado.apellidos}
                        </h3>
                        {getEstadoBadge(empleado.estado)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Briefcase className="w-4 h-4" />
                          <span>{empleado.puesto} - {empleado.departamento}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{empleado.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{empleado.telefono}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Desde {format(new Date(empleado.fechaIngreso), 'dd/MM/yyyy')}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-teal-600" />
                          <span className="text-sm">
                            <span className="font-medium">{empleado.horasTrabajadas}h</span>
                            <span className="text-gray-500"> / {empleado.horasContrato}h este mes</span>
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                empleado.horasTrabajadas > empleado.horasContrato
                                  ? 'bg-orange-500'
                                  : 'bg-teal-600'
                              }`}
                              style={{
                                width: `${Math.min((empleado.horasTrabajadas / empleado.horasContrato) * 100, 100)}%`
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas del Equipo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Empleados Activos</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {empleados.filter(e => e.estado === 'activo').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Plantilla</p>
                    <p className="text-2xl font-bold text-gray-900">{empleados.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Horas Extras (mes)</p>
                    <p className="text-2xl font-bold text-gray-900">28h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB: HORARIOS */}
        <TabsContent value="horarios" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Control de Horarios - Semana Actual
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {registrosHorarios.map((registro) => (
                  <div
                    key={registro.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        registro.tipo === 'extra' ? 'bg-orange-100' : 
                        registro.tipo === 'nocturno' ? 'bg-purple-100' : 'bg-teal-100'
                      }`}>
                        <Clock className={`w-5 h-5 ${
                          registro.tipo === 'extra' ? 'text-orange-600' : 
                          registro.tipo === 'nocturno' ? 'text-purple-600' : 'text-teal-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{registro.empleadoNombre}</p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(registro.fecha), "EEEE, d 'de' MMMM", { locale: es })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Entrada</p>
                        <p className="font-medium text-gray-900">{registro.horaEntrada}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Salida</p>
                        <p className="font-medium text-gray-900">
                          {registro.horaSalida || '-'}
                        </p>
                      </div>
                      <div className="text-right min-w-[80px]">
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="font-medium text-gray-900">
                          {registro.totalHoras ? `${registro.totalHoras}h` : 'En curso'}
                        </p>
                      </div>
                      {registro.tipo !== 'regular' && (
                        <Badge variant="outline" className={
                          registro.tipo === 'extra' ? 'border-orange-600 text-orange-600' : 'border-purple-600 text-purple-600'
                        }>
                          {registro.tipo === 'extra' ? 'Horas Extra' : 'Nocturno'}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calendario Semanal */}
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                Calendario Semanal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, index) => (
                  <div
                    key={index}
                    className={`p-3 border rounded-lg text-center ${
                      format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                        ? 'bg-teal-50 border-teal-300'
                        : 'bg-white'
                    }`}
                  >
                    <p className="text-xs text-gray-600 mb-1">
                      {format(day, 'EEE', { locale: es })}
                    </p>
                    <p className="text-lg font-medium text-gray-900">
                      {format(day, 'd')}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {registrosHorarios.filter(r => r.fecha === format(day, 'yyyy-MM-dd')).length} reg.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: HORAS EXTRAS */}
        <TabsContent value="horas-extras" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                Solicitudes de Horas Extras
              </CardTitle>
            </CardHeader>
            <CardContent>
              {solicitudesHorasExtras.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>No hay solicitudes de horas extras</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {solicitudesHorasExtras.map((solicitud) => (
                    <div
                      key={solicitud.id}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900">
                              {solicitud.empleadoNombre}
                            </h3>
                            {getEstadoBadge(solicitud.estado)}
                          </div>
                          <p className="text-sm text-gray-600">
                            Solicitado el {format(new Date(solicitud.fechaSolicitud), "d 'de' MMMM 'a las' HH:mm", { locale: es })}
                          </p>
                        </div>
                        {solicitud.estado === 'pendiente' && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                              <CheckCircle2 className="w-4 h-4 mr-1" />
                              Aprobar
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                              <XCircle className="w-4 h-4 mr-1" />
                              Rechazar
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Fecha</p>
                          <p className="text-sm font-medium text-gray-900">
                            {format(new Date(solicitud.fecha), "EEEE, d 'de' MMMM", { locale: es })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Horario</p>
                          <p className="text-sm font-medium text-gray-900">
                            {solicitud.horaInicio} - {solicitud.horaFin} ({solicitud.totalHoras}h)
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-xs text-gray-600 mb-1">Motivo</p>
                          <p className="text-sm text-gray-700">{solicitud.motivo}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: INCIDENCIAS */}
        <TabsContent value="incidencias" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Incidencias del Personal
                </CardTitle>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Incidencia
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {incidencias.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>No hay incidencias registradas</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {incidencias.map((incidencia) => (
                    <div
                      key={incidencia.id}
                      className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        {getTipoIncidenciaIcon(incidencia.tipo)}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-gray-900">
                            {incidencia.empleadoNombre}
                          </h3>
                          {getEstadoBadge(incidencia.estado)}
                          <Badge variant="outline" className={
                            incidencia.prioridad === 'alta' ? 'border-red-600 text-red-600' :
                            incidencia.prioridad === 'media' ? 'border-orange-600 text-orange-600' :
                            'border-gray-600 text-gray-600'
                          }>
                            {incidencia.prioridad}
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-600 mb-2">
                          <span className="capitalize">{incidencia.tipo}</span> - {format(new Date(incidencia.fecha), "d 'de' MMMM 'de' yyyy", { locale: es })}
                        </p>

                        <p className="text-sm text-gray-700">{incidencia.descripcion}</p>
                      </div>

                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal Añadir Empleado */}
      <Dialog open={modalAñadirEmpleado} onOpenChange={setModalAñadirEmpleado}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Añadir Empleado</DialogTitle>
            <DialogDescription>Completa los campos para añadir un nuevo empleado a la plantilla.</DialogDescription>
          </DialogHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={nuevoEmpleado.nombre}
                  onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="apellidos">Apellidos</Label>
                <Input
                  id="apellidos"
                  value={nuevoEmpleado.apellidos}
                  onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, apellidos: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={nuevoEmpleado.telefono}
                  onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, telefono: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={nuevoEmpleado.email}
                  onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, email: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" size="sm" onClick={() => setModalAñadirEmpleado(false)}>
              Cancelar
            </Button>
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700" onClick={handleAñadirEmpleado}>
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}