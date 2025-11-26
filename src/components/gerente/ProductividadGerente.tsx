import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Target, Clock, Users, TrendingUp } from 'lucide-react';

export function ProductividadGerente() {
  const okrs = [
    { objetivo: 'Aumentar satisfacción cliente a 4.8', progreso: 85, equipo: 'Operaciones' },
    { objetivo: 'Reducir tiempo servicio', progreso: 60, equipo: 'Pizzería 1' },
    { objetivo: 'Incrementar ventas 20%', progreso: 75, equipo: 'Caja 2' },
  ];

  return (
    <div className="space-y-6">
      <div><h2 className="text-gray-900">Productividad y OKRs</h2><p className="text-gray-600">Objetivos, tiempos y eficiencia</p></div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-gray-600 text-sm">OKRs Activos</p><p className="text-gray-900 text-2xl">12</p></div><Target className="w-8 h-8 text-teal-600" /></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-gray-600 text-sm">Progreso General</p><p className="text-gray-900 text-2xl">73%</p></div><TrendingUp className="w-8 h-8 text-green-600" /></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-gray-600 text-sm">Tiempo Promedio</p><p className="text-gray-900 text-2xl">1.5h</p></div><Clock className="w-8 h-8 text-blue-600" /></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-gray-600 text-sm">Equipos</p><p className="text-gray-900 text-2xl">5</p></div><Users className="w-8 h-8 text-purple-600" /></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Objetivos y Key Results (OKRs)</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-6">
            {okrs.map((okr, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{okr.objetivo}</h3>
                    <Badge variant="outline">{okr.equipo}</Badge>
                  </div>
                  <span className="text-teal-600">{okr.progreso}%</span>
                </div>
                <Progress value={okr.progreso} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Eficiencia por Equipo</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {['Operaciones', 'Pizzería 1', 'Pizzería 2', 'Administración'].map((equipo, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <p className="text-gray-900">{equipo}</p>
                <Badge className="bg-green-100 text-green-800">{90 - index * 5}%</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}