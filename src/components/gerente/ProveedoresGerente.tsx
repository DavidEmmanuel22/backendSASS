import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Package, FileText, Star, TrendingUp, Plus } from 'lucide-react';

export function ProveedoresGerente() {
  const proveedores = [
    { id: '1', nombre: 'Repuestos Premium SA', categoria: 'Autopartes', sla: 95, evaluacion: 4.5, pedidos: 45 },
    { id: '2', nombre: 'Lubricantes del Norte', categoria: 'Aceites', sla: 88, evaluacion: 4.2, pedidos: 32 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-gray-900">Gestión de Proveedores</h2><p className="text-gray-600">Tarifas, pedidos y evaluación</p></div>
        <Button className="bg-teal-600 hover:bg-teal-700"><Plus className="w-4 h-4 mr-2" />Nuevo Proveedor</Button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-gray-600 text-sm">Proveedores Activos</p><p className="text-gray-900 text-2xl">18</p></div><Package className="w-8 h-8 text-blue-600" /></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-gray-600 text-sm">Pedidos (Mes)</p><p className="text-gray-900 text-2xl">127</p></div><FileText className="w-8 h-8 text-teal-600" /></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-gray-600 text-sm">SLA Promedio</p><p className="text-gray-900 text-2xl">92%</p></div><TrendingUp className="w-8 h-8 text-green-600" /></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-gray-600 text-sm">Evaluación Media</p><p className="text-gray-900 text-2xl">4.3</p></div><Star className="w-8 h-8 text-yellow-600" /></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Cartera de Proveedores</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {proveedores.map((prov) => (
              <div key={prov.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{prov.nombre}</h3>
                  <p className="text-gray-600 text-sm mb-2">{prov.categoria}</p>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-100 text-green-800">SLA: {prov.sla}%</Badge>
                    <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span className="text-sm">{prov.evaluacion}</span></div>
                    <span className="text-sm text-gray-600">{prov.pedidos} pedidos</span>
                  </div>
                </div>
                <Button variant="outline">Ver Detalles</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
