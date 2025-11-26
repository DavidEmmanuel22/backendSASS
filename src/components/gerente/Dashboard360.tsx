import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Target,
  Percent,
  XCircle,
  MessageSquare,
  Package,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUpIcon,
  Calculator
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export function Dashboard360() {
  const [filtroActivo, setFiltroActivo] = useState<'ventas' | 'cierres' | 'operativa' | 'alertas'>('ventas');

  // Datos para Operativa
  const datosOperativa = {
    clientesActivos: {
      valor: 1247,
      cambio: '+156',
      porcentajeCambio: 14.3,
      tendencia: 'up' as const
    },
    pedidosHoy: {
      valor: 89,
      cambio: '+12',
      porcentajeCambio: 15.6,
      tendencia: 'up' as const
    },
    incidencias: {
      valor: 7,
      cambio: '-3',
      porcentajeCambio: -30.0,
      tendencia: 'down' as const
    },
    churn: {
      valor: 3.2,
      cambio: '-1.1',
      porcentajeCambio: -25.6,
      tendencia: 'down' as const
    }
  };

  const slaMetrics = [
    { 
      titulo: 'Tiempo de Respuesta', 
      objetivo: '< 2h', 
      actual: '1.5h', 
      cumplimiento: 95, 
      color: 'bg-green-600',
      status: 'excelente' 
    },
    { 
      titulo: 'Resolución 1er Contacto', 
      objetivo: '> 80%', 
      actual: '84%', 
      cumplimiento: 84, 
      color: 'bg-teal-600',
      status: 'bueno'
    },
    { 
      titulo: 'Tiempo de Entrega', 
      objetivo: '< 30min', 
      actual: '28min', 
      cumplimiento: 92, 
      color: 'bg-blue-600',
      status: 'excelente'
    },
    { 
      titulo: 'Disponibilidad Sistema', 
      objetivo: '> 99%', 
      actual: '99.7%', 
      cumplimiento: 99.7, 
      color: 'bg-purple-600',
      status: 'excelente'
    },
  ];

  // Datos para Ventas
  const datosVentas = {
    mrr: {
      valor: '€45,890',
      cambio: '+12.5%',
      porcentajeCambio: 12.5,
      tendencia: 'up' as const,
      descripcion: 'Ingresos Recurrentes Mensuales'
    },
    nps: {
      valor: '72',
      cambio: '+8',
      porcentajeCambio: 12.5,
      tendencia: 'up' as const,
      descripcion: 'Net Promoter Score'
    },
    margenBruto: {
      valor: '38.5%',
      cambio: '+2.3%',
      porcentajeCambio: 6.4,
      tendencia: 'up' as const,
      descripcion: 'Margen Bruto sobre Ventas'
    },
    margenNeto: {
      valor: '12.8%',
      cambio: '+1.5%',
      porcentajeCambio: 13.3,
      tendencia: 'up' as const,
      descripcion: 'Margen Neto sobre Ventas'
    }
  };

  const ingresosMensuales = [
    { mes: 'Ene', ingresos: 38000, gastos: 22000 },
    { mes: 'Feb', ingresos: 41000, gastos: 24000 },
    { mes: 'Mar', ingresos: 39500, gastos: 23500 },
    { mes: 'Abr', ingresos: 43000, gastos: 25000 },
    { mes: 'May', ingresos: 45890, gastos: 26500 },
  ];

  const distribucionIngresos = [
    { nombre: 'Pan y Bollería', valor: 45, color: '#0d9488' },
    { nombre: 'Pastelería', valor: 30, color: '#14b8a6' },
    { nombre: 'Bebidas', valor: 15, color: '#5eead4' },
    { nombre: 'Complementos', valor: 10, color: '#99f6e4' },
  ];

  // Datos para Alertas
  const alertasCriticas = [
    { 
      id: '1', 
      tipo: 'critica', 
      titulo: 'Stock crítico en 3 ingredientes', 
      descripcion: 'Harina, levadura y mantequilla',
      tiempo: 'Hace 15 min',
      estado: 'pendiente'
    },
    { 
      id: '2', 
      tipo: 'advertencia', 
      titulo: 'Horno de Pan #2 temperatura irregular', 
      descripcion: 'Requiere revisión técnica',
      tiempo: 'Hace 45 min',
      estado: 'pendiente'
    },
    { 
      id: '3', 
      tipo: 'info', 
      titulo: 'Pico de pedidos detectado', 
      descripcion: '15 pedidos en los últimos 30 minutos',
      tiempo: 'Hace 1 hora',
      estado: 'resuelto'
    },
    { 
      id: '4', 
      tipo: 'critica', 
      titulo: 'Retraso en 2 entregas', 
      descripcion: 'Pedidos #2451 y #2453 fuera de tiempo',
      tiempo: 'Hace 2 horas',
      estado: 'pendiente'
    },
  ];

  const ticketsColaboradores = [
    {
      id: 'TKT-045',
      colaborador: 'María García',
      tipo: 'Falta de producto',
      asunto: 'Se ha agotado la harina integral',
      prioridad: 'alta' as const,
      estado: 'abierto' as const,
      fecha: '2025-11-14T10:30:00',
      tiempo: 'Hace 3 horas'
    },
    {
      id: 'TKT-044',
      colaborador: 'Carlos Ruiz',
      tipo: 'Rotura de maquinaria',
      asunto: 'Freidora no enciende',
      prioridad: 'urgente' as const,
      estado: 'en_proceso' as const,
      fecha: '2025-11-14T09:15:00',
      tiempo: 'Hace 4 horas'
    },
    {
      id: 'TKT-043',
      colaborador: 'Ana López',
      tipo: 'Incidencia con cliente',
      asunto: 'Cliente queja por pedido incorrecto',
      prioridad: 'media' as const,
      estado: 'resuelto' as const,
      fecha: '2025-11-14T08:00:00',
      tiempo: 'Hace 6 horas'
    },
    {
      id: 'TKT-042',
      colaborador: 'Pedro Martínez',
      tipo: 'Fallo en la app',
      asunto: 'Error al registrar pedido en sistema',
      prioridad: 'alta' as const,
      estado: 'abierto' as const,
      fecha: '2025-11-13T16:20:00',
      tiempo: 'Ayer'
    },
    {
      id: 'TKT-041',
      colaborador: 'Laura Sánchez',
      tipo: 'Recursos Humanos',
      asunto: 'Solicitud de cambio de turno',
      prioridad: 'baja' as const,
      estado: 'resuelto' as const,
      fecha: '2025-11-13T14:00:00',
      tiempo: 'Ayer'
    }
  ];

  const getAlertaColor = (tipo: string) => {
    switch (tipo) {
      case 'critica': return 'bg-red-50 border-red-200';
      case 'advertencia': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getAlertaIcon = (tipo: string) => {
    switch (tipo) {
      case 'critica': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'advertencia': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'info': return <CheckCircle className="w-5 h-5 text-blue-600" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPrioridadBadge = (prioridad: string) => {
    switch (prioridad) {
      case 'urgente':
        return <Badge className="bg-red-600 text-white">Urgente</Badge>;
      case 'alta':
        return <Badge className="bg-orange-500 text-white">Alta</Badge>;
      case 'media':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Media</Badge>;
      case 'baja':
        return <Badge variant="outline" className="border-gray-400 text-gray-600">Baja</Badge>;
      default:
        return <Badge variant="outline">Media</Badge>;
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'abierto':
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Abierto</Badge>;
      case 'en_proceso':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">En proceso</Badge>;
      case 'resuelto':
        return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Resuelto</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const renderOperativa = () => (
    <div className="space-y-6">
      {/* Cuadros principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Clientes Activos */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-gray-600">Clientes Activos</p>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {datosOperativa.clientesActivos.valor}
            </p>
            <div className="flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">
                {datosOperativa.clientesActivos.cambio} este mes
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Pedidos Hoy */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-gray-600">Pedidos Hoy</p>
              <ShoppingCart className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {datosOperativa.pedidosHoy.valor}
            </p>
            <div className="flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">
                {datosOperativa.pedidosHoy.cambio} vs ayer
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Incidencias */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-gray-600">Incidencias</p>
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {datosOperativa.incidencias.valor}
            </p>
            <div className="flex items-center gap-1">
              <ArrowDownRight className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">
                {datosOperativa.incidencias.cambio} esta semana
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Churn */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-gray-600">Churn Rate</p>
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {datosOperativa.churn.valor}%
            </p>
            <div className="flex items-center gap-1">
              <ArrowDownRight className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">
                {datosOperativa.churn.cambio}% vs mes anterior
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Indicadores SLA */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
            Indicadores SLA (Acuerdo de Nivel de Servicio)
          </CardTitle>
          <CardDescription>Cumplimiento de objetivos operativos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {slaMetrics.map((metric, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{metric.titulo}</p>
                    <p className="text-sm text-gray-600">Objetivo: {metric.objetivo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {metric.actual}
                    </p>
                    <Badge 
                      className={
                        metric.cumplimiento >= 95 
                          ? 'bg-green-100 text-green-800' 
                          : metric.cumplimiento >= 85
                          ? 'bg-teal-100 text-teal-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {metric.cumplimiento}%
                    </Badge>
                  </div>
                </div>
                <Progress value={metric.cumplimiento} className="h-2" />
                <p className="text-xs text-gray-500">
                  Estado: {metric.status === 'excelente' ? '✓ Excelente' : '✓ Bueno'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderVentas = () => (
    <div className="space-y-6">
      {/* Cuadros KPIs de Ventas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* MRR */}
        <Card className="border-2 border-teal-200">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-gray-600 mb-1">MRR</p>
                <p className="text-xs text-gray-500">{datosVentas.mrr.descripcion}</p>
              </div>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {datosVentas.mrr.valor}
            </p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-sm text-green-600">{datosVentas.mrr.cambio}</span>
            </div>
          </CardContent>
        </Card>

        {/* NPS */}
        <Card className="border-2 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-gray-600 mb-1">NPS</p>
                <p className="text-xs text-gray-500">{datosVentas.nps.descripcion}</p>
              </div>
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-2xl text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {datosVentas.nps.valor}
            </p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-sm text-green-600">{datosVentas.nps.cambio} puntos</span>
            </div>
          </CardContent>
        </Card>

        {/* Margen Bruto */}
        <Card className="border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-gray-600 mb-1">Margen Bruto</p>
                <p className="text-xs text-gray-500">{datosVentas.margenBruto.descripcion}</p>
              </div>
              <Percent className="w-5 h-5 text-teal-600" />
            </div>
            <p className="text-2xl text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {datosVentas.margenBruto.valor}
            </p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-sm text-green-600">{datosVentas.margenBruto.cambio}</span>
            </div>
          </CardContent>
        </Card>

        {/* Margen Neto */}
        <Card className="border-2 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-gray-600 mb-1">Margen Neto</p>
                <p className="text-xs text-gray-500">{datosVentas.margenNeto.descripcion}</p>
              </div>
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {datosVentas.margenNeto.valor}
            </p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-sm text-green-600">{datosVentas.margenNeto.cambio}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ingresos vs Gastos
            </CardTitle>
            <CardDescription>Últimos 5 meses en euros</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ingresosMensuales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="ingresos" 
                  stroke="#0d9488" 
                  strokeWidth={2} 
                  name="Ingresos" 
                />
                <Line 
                  type="monotone" 
                  dataKey="gastos" 
                  stroke="#f59e0b" 
                  strokeWidth={2} 
                  name="Gastos" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              Distribución de Ingresos
            </CardTitle>
            <CardDescription>Por categoría de producto</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distribucionIngresos}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.nombre} ${entry.valor}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                >
                  {distribucionIngresos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCierres = () => {
    // Listado de tiendas (desde QuienesSomos)
    const tiendas = [
      'Can Farines Centro',
      'Can Farines Llefià',
      'Can Farines Montigalà',
      'Can Farines Casagemes',
      'Can Farines La Mina',
      'Can Farines Sant Adrià Centro',
      'Can Farines Besòs',
      'Can Farines Poblenou',
      'Can Farines Sagrada Família',
      'Can Farines Gràcia'
    ];

    // Nombres del equipo
    const empleadas = [
      'Ana Rodríguez',
      'Carlos Méndez',
      'María García',
      'Laura Sánchez',
      'Pedro Martínez',
      'Carmen Díaz',
      'Javier Torres',
      'Elena Martín'
    ];

    // Datos de cierres de caja
    const cierresCaja = [
      {
        id: 1,
        diaHora: '18/11/2025 20:01',
        tienda: 'Can Farines Centro',
        accion: 'Cierre',
        empleada: 'Ana Rodríguez',
        cantidadCaja: '450,00 €',
        confirmarEfectivo: '450,00 €',
        diferencia: '0,00 €',
        totalVentas: '1.235,50 €',
        ventasEfectivo: '450,00 €',
        ventasTarjeta: '785,50 €',
        retiradas: '100,00 €',
        resultado: '350,00 €',
        incoherencia: '0,00 €'
      },
      {
        id: 2,
        diaHora: '18/11/2025 08:15',
        tienda: 'Can Farines Centro',
        accion: 'Apertura',
        empleada: 'Ana Rodríguez',
        cantidadCaja: '200,00 €',
        confirmarEfectivo: '200,00 €',
        diferencia: '0,00 €',
        totalVentas: '0,00 €',
        ventasEfectivo: '0,00 €',
        ventasTarjeta: '0,00 €',
        retiradas: '0,00 €',
        resultado: '200,00 €',
        incoherencia: '0,00 €'
      },
      {
        id: 3,
        diaHora: '17/11/2025 21:44',
        tienda: 'Can Farines Llefià',
        accion: 'Cierre',
        empleada: 'Carlos Méndez',
        cantidadCaja: '380,25 €',
        confirmarEfectivo: '380,25 €',
        diferencia: '0,00 €',
        totalVentas: '1.089,75 €',
        ventasEfectivo: '380,25 €',
        ventasTarjeta: '709,50 €',
        retiradas: '50,00 €',
        resultado: '330,25 €',
        incoherencia: '0,00 €'
      },
      {
        id: 4,
        diaHora: '17/11/2025 14:30',
        tienda: 'Can Farines Poblenou',
        accion: 'Arqueo',
        empleada: 'María García',
        cantidadCaja: '520,00 €',
        confirmarEfectivo: '515,00 €',
        diferencia: '-5,00 €',
        totalVentas: '820,00 €',
        ventasEfectivo: '520,00 €',
        ventasTarjeta: '300,00 €',
        retiradas: '0,00 €',
        resultado: '515,00 €',
        incoherencia: '5,00 €'
      },
      {
        id: 5,
        diaHora: '16/11/2025 20:35',
        tienda: 'Can Farines Gràcia',
        accion: 'Cierre',
        empleada: 'Laura Sánchez',
        cantidadCaja: '425,50 €',
        confirmarEfectivo: '425,50 €',
        diferencia: '0,00 €',
        totalVentas: '1.156,80 €',
        ventasEfectivo: '425,50 €',
        ventasTarjeta: '731,30 €',
        retiradas: '80,00 €',
        resultado: '345,50 €',
        incoherencia: '0,00 €'
      },
      {
        id: 6,
        diaHora: '16/11/2025 11:20',
        tienda: 'Can Farines Montigalà',
        accion: 'Retiradas',
        empleada: 'Pedro Martínez',
        cantidadCaja: '600,00 €',
        confirmarEfectivo: '400,00 €',
        diferencia: '0,00 €',
        totalVentas: '450,00 €',
        ventasEfectivo: '250,00 €',
        ventasTarjeta: '200,00 €',
        retiradas: '200,00 €',
        resultado: '400,00 €',
        incoherencia: '0,00 €'
      },
      {
        id: 7,
        diaHora: '15/11/2025 15:45',
        tienda: 'Can Farines La Mina',
        accion: 'Consumo Propio',
        empleada: 'Carmen Díaz',
        cantidadCaja: '320,00 €',
        confirmarEfectivo: '320,00 €',
        diferencia: '0,00 €',
        totalVentas: '565,00 €',
        ventasEfectivo: '320,00 €',
        ventasTarjeta: '245,00 €',
        retiradas: '15,00 €',
        resultado: '305,00 €',
        incoherencia: '0,00 €'
      },
      {
        id: 8,
        diaHora: '14/11/2025 21:16',
        tienda: 'Can Farines Besòs',
        accion: 'Cierre',
        empleada: 'Javier Torres',
        cantidadCaja: '395,75 €',
        confirmarEfectivo: '395,75 €',
        diferencia: '0,00 €',
        totalVentas: '978,40 €',
        ventasEfectivo: '395,75 €',
        ventasTarjeta: '582,65 €',
        retiradas: '60,00 €',
        resultado: '335,75 €',
        incoherencia: '0,00 €'
      }
    ];

    return (
      <div className="space-y-6">
        {/* Header con estadísticas resumidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-700 mb-1">Total Cierres</p>
                <p className="text-3xl text-green-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {cierresCaja.length}
                </p>
                <p className="text-xs text-gray-600 mt-1">Este mes</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-700 mb-1">Efectivo Total</p>
                <p className="text-3xl text-blue-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  €3.316,60
                </p>
                <p className="text-xs text-gray-600 mt-1">Acumulado</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-700 mb-1">Transacciones</p>
                <p className="text-3xl text-yellow-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  €4.254,45
                </p>
                <p className="text-xs text-gray-600 mt-1">Total tarjetas</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-700 mb-1">Diferencias</p>
                <p className="text-3xl text-purple-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  €5,00
                </p>
                <p className="text-xs text-gray-600 mt-1">Con ajustes</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de Cierres de Caja */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Cierres de Caja
                </CardTitle>
                <CardDescription>Historial completo de cierres de caja del negocio</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  Filtrar
                </Button>
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                  Exportar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-500 hover:bg-green-500">
                    <TableHead className="text-white">Día y hora</TableHead>
                    <TableHead className="text-white">Tienda</TableHead>
                    <TableHead className="text-white">Acción</TableHead>
                    <TableHead className="text-white">Empleada</TableHead>
                    <TableHead className="text-white">Cantidad de Caja</TableHead>
                    <TableHead className="text-white">Confirmar efectivo</TableHead>
                    <TableHead className="text-white">Diferencia</TableHead>
                    <TableHead className="text-white">Total Ventas</TableHead>
                    <TableHead className="text-white">Ventas Efectivo</TableHead>
                    <TableHead className="text-white">Ventas Tarjeta</TableHead>
                    <TableHead className="text-white">Retiradas</TableHead>
                    <TableHead className="text-white">Resultado</TableHead>
                    <TableHead className="text-white">Incoherencia</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cierresCaja.map((cierre) => (
                    <TableRow key={cierre.id} className="hover:bg-gray-50">
                      <TableCell className="text-sm whitespace-nowrap">{cierre.diaHora}</TableCell>
                      <TableCell className="text-sm">{cierre.tienda}</TableCell>
                      <TableCell className="text-sm">
                        <Badge 
                          className={
                            cierre.accion === 'Apertura' ? 'bg-blue-100 text-blue-800' :
                            cierre.accion === 'Cierre' ? 'bg-green-100 text-green-800' :
                            cierre.accion === 'Arqueo' ? 'bg-purple-100 text-purple-800' :
                            cierre.accion === 'Consumo Propio' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {cierre.accion}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{cierre.empleada}</TableCell>
                      <TableCell className="text-sm">{cierre.cantidadCaja}</TableCell>
                      <TableCell className="text-sm">{cierre.confirmarEfectivo}</TableCell>
                      <TableCell className={`text-sm ${
                        cierre.diferencia !== '0,00 €' ? 'font-medium text-red-600' : ''
                      }`}>
                        {cierre.diferencia}
                      </TableCell>
                      <TableCell className="text-sm">{cierre.totalVentas}</TableCell>
                      <TableCell className="text-sm">{cierre.ventasEfectivo}</TableCell>
                      <TableCell className="text-sm">{cierre.ventasTarjeta}</TableCell>
                      <TableCell className="text-sm">{cierre.retiradas}</TableCell>
                      <TableCell className="text-sm font-medium">{cierre.resultado}</TableCell>
                      <TableCell className={`text-sm ${
                        cierre.incoherencia !== '0,00 €' ? 'font-medium text-red-600' : ''
                      }`}>
                        {cierre.incoherencia}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAlertas = () => (
    <div className="space-y-6">
      {/* Resumen de Alertas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-2 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-gray-700">Críticas</p>
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl text-red-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {alertasCriticas.filter(a => a.tipo === 'critica' && a.estado === 'pendiente').length}
            </p>
            <p className="text-xs text-red-600">Requieren atención inmediata</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-gray-700">Advertencias</p>
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-3xl text-yellow-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {alertasCriticas.filter(a => a.tipo === 'advertencia').length}
            </p>
            <p className="text-xs text-yellow-600">Revisar cuando sea posible</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-gray-700">Informativas</p>
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl text-blue-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {alertasCriticas.filter(a => a.tipo === 'info').length}
            </p>
            <p className="text-xs text-blue-600">Para tu conocimiento</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-gray-700">Tickets Abiertos</p>
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl text-purple-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {ticketsColaboradores.filter(t => t.estado === 'abierto').length}
            </p>
            <p className="text-xs text-purple-600">De colaboradores</p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Críticas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                Alertas del Sistema
              </CardTitle>
              <CardDescription>Notificaciones importantes que requieren atención</CardDescription>
            </div>
            <Badge className="bg-orange-600">
              {alertasCriticas.filter(a => a.estado === 'pendiente').length} pendientes
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alertasCriticas.map((alerta) => (
              <div
                key={alerta.id}
                className={`flex flex-col md:flex-row md:items-start justify-between p-4 border rounded-lg ${getAlertaColor(alerta.tipo)}`}
              >
                <div className="flex items-start gap-3 flex-1">
                  {getAlertaIcon(alerta.tipo)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-900">{alerta.titulo}</p>
                      {alerta.estado === 'resuelto' && (
                        <Badge className="bg-green-600 text-white text-xs">Resuelto</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alerta.descripcion}</p>
                    <p className="text-xs text-gray-500">{alerta.tiempo}</p>
                  </div>
                </div>
                {alerta.estado === 'pendiente' && (
                  <Button size="sm" variant="outline" className="mt-3 md:mt-0">
                    Resolver
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tickets de Colaboradores */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                Tickets de Colaboradores
              </CardTitle>
              <CardDescription>Incidencias reportadas por el equipo</CardDescription>
            </div>
            <Badge className="bg-teal-600">
              {ticketsColaboradores.length} tickets
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ticketsColaboradores.map((ticket) => (
              <div
                key={ticket.id}
                className="flex flex-col md:flex-row md:items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1">
                  <MessageSquare className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-sm font-medium text-gray-900">{ticket.id}</span>
                      {getEstadoBadge(ticket.estado)}
                      {getPrioridadBadge(ticket.prioridad)}
                    </div>
                    <p className="font-medium text-gray-900 mb-1">{ticket.asunto}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {ticket.colaborador}
                      </span>
                      <span>•</span>
                      <span>{ticket.tipo}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ticket.tiempo}
                      </span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="mt-3 md:mt-0">
                  Ver Detalles
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTickets = () => {
    // Datos más completos para el filtro de Tickets
    const todosLosTickets = [
      {
        id: 'TKT-045',
        colaborador: 'María García',
        tipo: 'Falta de producto',
        asunto: 'Se ha agotado la harina integral',
        descripcion: 'La harina integral se ha agotado completamente. Necesitamos reponer urgentemente para el servicio de la tarde.',
        prioridad: 'alta' as const,
        estado: 'abierto' as const,
        fecha: '2025-11-14T10:30:00',
        tiempo: 'Hace 3 horas',
        respuestas: 0
      },
      {
        id: 'TKT-044',
        colaborador: 'Carlos Ruiz',
        tipo: 'Rotura de maquinaria',
        asunto: 'Freidora no enciende',
        descripcion: 'La freidora principal no enciende desde esta mañana. Ya revisé el enchufe y el fusible.',
        prioridad: 'urgente' as const,
        estado: 'en_proceso' as const,
        fecha: '2025-11-14T09:15:00',
        tiempo: 'Hace 4 horas',
        respuestas: 3
      },
      {
        id: 'TKT-043',
        colaborador: 'Ana López',
        tipo: 'Incidencia con cliente',
        asunto: 'Cliente queja por pedido incorrecto',
        descripcion: 'Cliente del pedido #2448 recibió pizza vegetariana en lugar de pepperoni.',
        prioridad: 'media' as const,
        estado: 'resuelto' as const,
        fecha: '2025-11-14T08:00:00',
        tiempo: 'Hace 6 horas',
        respuestas: 4
      },
      {
        id: 'TKT-042',
        colaborador: 'Pedro Martínez',
        tipo: 'Fallo en la app',
        asunto: 'Error al registrar pedido en sistema',
        descripcion: 'Al intentar registrar un pedido con complementos extras, el sistema muestra error 500.',
        prioridad: 'alta' as const,
        estado: 'abierto' as const,
        fecha: '2025-11-13T16:20:00',
        tiempo: 'Ayer',
        respuestas: 1
      },
      {
        id: 'TKT-041',
        colaborador: 'Laura Sánchez',
        tipo: 'Recursos Humanos',
        asunto: 'Solicitud de cambio de turno',
        descripcion: 'Solicito cambiar mi turno del viernes por el del sábado por motivos personales.',
        prioridad: 'baja' as const,
        estado: 'resuelto' as const,
        fecha: '2025-11-13T14:00:00',
        tiempo: 'Ayer',
        respuestas: 2
      },
      {
        id: 'TKT-040',
        colaborador: 'Javier Torres',
        tipo: 'Falta de producto',
        asunto: 'Stock bajo de queso mozzarella',
        descripcion: 'Solo quedan 2kg de queso mozzarella. Necesitamos reponer antes del fin de semana.',
        prioridad: 'media' as const,
        estado: 'abierto' as const,
        fecha: '2025-11-13T11:30:00',
        tiempo: 'Hace 1 día',
        respuestas: 0
      },
      {
        id: 'TKT-039',
        colaborador: 'Carmen Díaz',
        tipo: 'Accidente laboral',
        asunto: 'Pequeña quemadura en la mano',
        descripcion: 'Me he quemado levemente con el horno. Ya me he aplicado primeros auxilios.',
        prioridad: 'alta' as const,
        estado: 'resuelto' as const,
        fecha: '2025-11-12T15:45:00',
        tiempo: 'Hace 2 días',
        respuestas: 5
      },
      {
        id: 'TKT-038',
        colaborador: 'Roberto Fernández',
        tipo: 'Rotura de maquinaria',
        asunto: 'Batidora industrial hace ruido extraño',
        descripcion: 'La batidora está funcionando pero hace un ruido muy fuerte. Podría empeorar.',
        prioridad: 'media' as const,
        estado: 'en_proceso' as const,
        fecha: '2025-11-12T10:00:00',
        tiempo: 'Hace 2 días',
        respuestas: 2
      }
    ];

    // Estadísticas de tickets
    const ticketStats = {
      total: todosLosTickets.length,
      abiertos: todosLosTickets.filter(t => t.estado === 'abierto').length,
      enProceso: todosLosTickets.filter(t => t.estado === 'en_proceso').length,
      resueltos: todosLosTickets.filter(t => t.estado === 'resuelto').length,
      urgentes: todosLosTickets.filter(t => t.prioridad === 'urgente').length,
      tiempoRespuestaPromedio: '2.5h'
    };

    return (
      <div className="space-y-6">
        {/* Estadísticas de Tickets */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="border-2 border-teal-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total Tickets</p>
                <p className="text-3xl text-teal-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {ticketStats.total}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-700 mb-1">Abiertos</p>
                <p className="text-3xl text-blue-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {ticketStats.abiertos}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-700 mb-1">En Proceso</p>
                <p className="text-3xl text-yellow-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {ticketStats.enProceso}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-700 mb-1">Resueltos</p>
                <p className="text-3xl text-green-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {ticketStats.resueltos}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-700 mb-1">Urgentes</p>
                <p className="text-3xl text-red-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {ticketStats.urgentes}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-700 mb-1">T. Respuesta</p>
                <p className="text-3xl text-purple-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {ticketStats.tiempoRespuestaPromedio}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Todos los Tickets */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Gestión de Tickets
                </CardTitle>
                <CardDescription>Todos los tickets del equipo ordenados por fecha</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  Filtrar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todosLosTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
                    ticket.prioridad === 'urgente' ? 'border-l-4 border-l-red-600' : ''
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <MessageSquare className={`w-5 h-5 shrink-0 mt-0.5 ${
                        ticket.estado === 'resuelto' ? 'text-green-600' : 
                        ticket.estado === 'en_proceso' ? 'text-yellow-600' : 
                        'text-blue-600'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="font-medium text-gray-900">{ticket.id}</span>
                          {getEstadoBadge(ticket.estado)}
                          {getPrioridadBadge(ticket.prioridad)}
                          <Badge variant="outline" className="text-xs">
                            {ticket.tipo}
                          </Badge>
                        </div>
                        
                        <h4 className="font-medium text-gray-900 mb-1">{ticket.asunto}</h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{ticket.descripcion}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {ticket.colaborador}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {ticket.tiempo}
                          </span>
                          {ticket.respuestas > 0 && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                {ticket.respuestas} respuesta{ticket.respuestas !== 1 ? 's' : ''}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {ticket.estado !== 'resuelto' && (
                        <Button size="sm" variant="outline" className="text-xs">
                          Responder
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="text-xs">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Dashboard 360°
        </h2>
        <p className="text-gray-600 text-sm">Visión completa del negocio</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filtroActivo === 'ventas' ? 'default' : 'outline'}
          onClick={() => setFiltroActivo('ventas')}
          className={filtroActivo === 'ventas' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <DollarSign className="w-4 h-4 mr-2" />
          Ventas
        </Button>
        <Button
          variant={filtroActivo === 'cierres' ? 'default' : 'outline'}
          onClick={() => setFiltroActivo('cierres')}
          className={filtroActivo === 'cierres' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <Calculator className="w-4 h-4 mr-2" />
          Cierres
        </Button>
        <Button
          variant={filtroActivo === 'operativa' ? 'default' : 'outline'}
          onClick={() => setFiltroActivo('operativa')}
          className={filtroActivo === 'operativa' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <Target className="w-4 h-4 mr-2" />
          Operativa
        </Button>
        <Button
          variant={filtroActivo === 'alertas' ? 'default' : 'outline'}
          onClick={() => setFiltroActivo('alertas')}
          className={filtroActivo === 'alertas' ? 'bg-teal-600 hover:bg-teal-700' : ''}
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Alertas
        </Button>
      </div>

      {/* Contenido según filtro */}
      {filtroActivo === 'ventas' && renderVentas()}
      {filtroActivo === 'operativa' && renderOperativa()}
      {filtroActivo === 'alertas' && renderAlertas()}
      {filtroActivo === 'cierres' && renderCierres()}
    </div>
  );
}