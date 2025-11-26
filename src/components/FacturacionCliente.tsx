import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { FileText, Download, Search, CreditCard } from 'lucide-react';
import { useState } from 'react';

interface Factura {
  id: string;
  folio: string;
  fecha: string;
  restaurante: string;
  monto: number;
  estatus: 'pagada' | 'pendiente' | 'vencida';
  metodoPago: string;
}

export function FacturacionCliente() {
  const [busqueda, setBusqueda] = useState('');

  const facturas: Factura[] = [
    {
      id: '1',
      folio: 'FAC-2025-001',
      fecha: '2025-11-10',
      restaurante: 'La Taquería del Centro',
      monto: 45.50,
      estatus: 'pagada',
      metodoPago: 'Tarjeta •••• 4242',
    },
    {
      id: '2',
      folio: 'FAC-2025-002',
      fecha: '2025-11-08',
      restaurante: 'Burger Master',
      monto: 32.00,
      estatus: 'pagada',
      metodoPago: 'Tarjeta •••• 4242',
    },
    {
      id: '3',
      folio: 'FAC-2025-003',
      fecha: '2025-11-05',
      restaurante: 'Sushi Express',
      monto: 68.90,
      estatus: 'pagada',
      metodoPago: 'Efectivo',
    },
  ];

  const getEstatusBadge = (estatus: Factura['estatus']) => {
    const config = {
      pagada: { label: 'Pagada', className: 'bg-green-100 text-green-800' },
      pendiente: { label: 'Pendiente', className: 'bg-yellow-100 text-yellow-800' },
      vencida: { label: 'Vencida', className: 'bg-red-100 text-red-800' },
    };
    return <Badge className={config[estatus].className}>{config[estatus].label}</Badge>;
  };

  const facturasFiltradas = facturas.filter(
    (factura) =>
      factura.folio.toLowerCase().includes(busqueda.toLowerCase()) ||
      factura.restaurante.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPagado = facturas
    .filter((f) => f.estatus === 'pagada')
    .reduce((sum, f) => sum + f.monto, 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Pagado</p>
                <p className="text-gray-900">${totalPagado.toFixed(2)}</p>
              </div>
              <CreditCard className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Facturas Este Mes</p>
                <p className="text-gray-900">{facturas.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Método Preferido</p>
                <p className="text-gray-900">Tarjeta •••• 4242</p>
              </div>
              <CreditCard className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Facturas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Mis Facturas</CardTitle>
              <CardDescription>Historial de compras y pagos</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar Todo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por folio o restaurante..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-3">
            {facturasFiltradas.map((factura) => (
              <div key={factura.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-gray-900">{factura.folio}</p>
                      {getEstatusBadge(factura.estatus)}
                    </div>
                    <p className="text-gray-700">{factura.restaurante}</p>
                    <p className="text-gray-600 text-sm">
                      {new Date(factura.fecha).toLocaleDateString('es-ES')} · {factura.metodoPago}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900">${factura.monto.toFixed(2)}</p>
                    <Button size="sm" variant="ghost" className="mt-2">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {facturasFiltradas.length === 0 && (
            <div className="py-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No se encontraron facturas</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
