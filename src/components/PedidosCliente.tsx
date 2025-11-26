import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Clock, Package, CheckCircle, XCircle, Search } from 'lucide-react';

interface Pedido {
  id: string;
  restaurante: string;
  fecha: string;
  estado: 'pendiente' | 'en_preparacion' | 'entregado' | 'cancelado';
  items: { nombre: string; precio: number; cantidad: number }[];
  total: number;
}

export function PedidosCliente() {
  const [busqueda, setBusqueda] = useState('');
  
  const pedidos: Pedido[] = [
    {
      id: 'PED001',
      restaurante: 'Can Farines',
      fecha: '2025-11-10',
      estado: 'en_preparacion',
      items: [
        { nombre: 'Bocadillo de Jamón', cantidad: 1, precio: 12.50 },
        { nombre: 'Café Americano', cantidad: 1, precio: 8.00 }
      ],
      total: 20.50
    },
    {
      id: 'PED002',
      restaurante: 'Can Farines',
      fecha: '2025-11-08',
      estado: 'entregado',
      items: [
        { nombre: 'Pan de Masa Madre', cantidad: 2, precio: 15.00 },
        { nombre: 'Croissant', cantidad: 3, precio: 12.00 }
      ],
      total: 27.00
    },
    {
      id: 'PED003',
      restaurante: 'Can Farines',
      fecha: '2025-11-05',
      estado: 'entregado',
      items: [
        { nombre: 'Bocadillo de Tortilla', cantidad: 1, precio: 14.50 },
        { nombre: 'Café con Leche', cantidad: 2, precio: 10.00 }
      ],
      total: 24.50
    },
    {
      id: 'PED004',
      restaurante: 'Can Farines',
      fecha: '2025-11-03',
      estado: 'cancelado',
      items: [
        { nombre: 'Napolitana de Chocolate', cantidad: 2, precio: 10.00 }
      ],
      total: 10.00
    },
    {
      id: 'PED005',
      restaurante: 'Can Farines',
      fecha: '2025-11-01',
      estado: 'entregado',
      items: [
        { nombre: 'Zumo de Naranja Natural', cantidad: 1, precio: 7.50 },
        { nombre: 'Muffin de Arándanos', cantidad: 2, precio: 12.00 }
      ],
      total: 19.50
    }
  ];

  const getEstadoBadge = (estado: Pedido['estado']) => {
    const config = {
      pendiente: { label: 'Pendiente', className: 'bg-yellow-100 text-yellow-800', icon: Clock },
      en_preparacion: { label: 'En Preparación', className: 'bg-blue-100 text-blue-800', icon: Package },
      entregado: { label: 'Entregado', className: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelado: { label: 'Cancelado', className: 'bg-red-100 text-red-800', icon: XCircle },
    };
    const { label, className, icon: Icon } = config[estado];
    return (
      <Badge className={className}>
        <Icon className="w-3 h-3 mr-1" />
        {label}
      </Badge>
    );
  };

  const pedidosFiltrados = pedidos.filter(
    (pedido) =>
      pedido.restaurante.toLowerCase().includes(busqueda.toLowerCase()) ||
      pedido.id.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Mis Pedidos</h2>
          <p className="text-gray-600">Consulta el estado de tus pedidos</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Buscar por restaurante o ID de pedido..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {pedidosFiltrados.map((pedido) => (
          <Card key={pedido.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{pedido.restaurante}</CardTitle>
                  <CardDescription>
                    Pedido #{pedido.id} · {new Date(pedido.fecha).toLocaleDateString('es-ES')}
                  </CardDescription>
                </div>
                {getEstadoBadge(pedido.estado)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 mb-2">Items:</p>
                  <ul className="space-y-1">
                    {pedido.items.map((item, index) => (
                      <li key={index} className="text-gray-600 text-sm">
                        • {item.cantidad}x {item.nombre} - ${item.precio.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-gray-900">Total: ${pedido.total.toFixed(2)}</span>
                  <div className="flex gap-2">
                    {pedido.estado === 'entregado' && (
                      <Button size="sm" variant="outline">
                        Reordenar
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {pedidosFiltrados.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No se encontraron pedidos</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}