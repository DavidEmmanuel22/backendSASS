import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Package, DollarSign, FileText, Clock, CheckCircle, TrendingUp, Star } from 'lucide-react';

export function InicioResumen() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
          ¡Bienvenida de nuevo, María! 👋
        </h2>
        <p className="text-gray-600">Aquí está el resumen de tu actividad</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs md:text-sm">Pedidos Activos</p>
                <p className="text-gray-900 text-xl md:text-2xl">2</p>
                <p className="text-teal-600 text-xs md:text-sm mt-1">1 en camino</p>
              </div>
              <Package className="w-8 h-8 md:w-10 md:h-10 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs md:text-sm">Saldo FoodPoints</p>
                <p className="text-gray-900 text-xl md:text-2xl">450</p>
                <p className="text-gray-500 text-xs md:text-sm mt-1">≈ $45.00 MXN</p>
              </div>
              <DollarSign className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs md:text-sm">Último Ticket</p>
                <p className="text-gray-900 text-xl md:text-2xl">$146.40</p>
                <p className="text-gray-500 text-xs md:text-sm mt-1">Hace 2 días</p>
              </div>
              <FileText className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estado de Pedidos */}
      <Card>
        <CardHeader>
          <CardTitle>Estado de Pedidos Activos</CardTitle>
          <CardDescription>Seguimiento en tiempo real</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border rounded-lg bg-teal-50 border-teal-200">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center shrink-0">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-900">Pedido #PED003</p>
                  <Badge className="bg-teal-600">En Camino</Badge>
                </div>
                <p className="text-gray-700">Pizza Napoletana</p>
                <p className="text-gray-600 text-sm">2x Pizzas Margarita + Bebidas</p>
                <div className="flex items-center gap-2 mt-3">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span className="text-teal-600 text-sm">Llega en 15 minutos</span>
                </div>
              </div>
              <p className="text-gray-900">$89.99</p>
            </div>

            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-900">Pedido #PED002</p>
                  <Badge className="bg-orange-600">Preparando</Badge>
                </div>
                <p className="text-gray-700">Sushi Express</p>
                <p className="text-gray-600 text-sm">Combo Familiar (40 piezas)</p>
                <div className="flex items-center gap-2 mt-3">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-600 text-sm">Tiempo estimado: 25 min</span>
                </div>
              </div>
              <p className="text-gray-900">$132.30</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actividad Reciente */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Actividad Reciente</CardTitle>
            <CardDescription>Últimas transacciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-900 text-sm truncate">Pedido Completado</p>
                    <p className="text-gray-600 text-xs">Hace 2 días</p>
                  </div>
                </div>
                <span className="text-gray-900 text-sm shrink-0 ml-2">$146.40</span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-900 text-sm truncate">Puntos Ganados</p>
                    <p className="text-gray-600 text-xs">Hace 2 días</p>
                  </div>
                </div>
                <span className="text-teal-600 text-sm shrink-0 ml-2">+50 pts</span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-900 text-sm truncate">Reseña Enviada</p>
                    <p className="text-gray-600 text-xs">Hace 3 días</p>
                  </div>
                </div>
                <span className="text-yellow-600 text-sm shrink-0 ml-2">⭐ 5.0</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-900 text-sm truncate">Pedido Completado</p>
                    <p className="text-gray-600 text-xs">Hace 5 días</p>
                  </div>
                </div>
                <span className="text-gray-900 text-sm shrink-0 ml-2">$89.50</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Restaurantes Favoritos</CardTitle>
            <CardDescription>Tus lugares preferidos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-teal-100 rounded-lg flex items-center justify-center shrink-0 text-lg md:text-xl">
                    🍕
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-900 text-sm truncate">Pizza Napoletana</p>
                    <p className="text-gray-600 text-xs">8 pedidos</p>
                  </div>
                </div>
                <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400 shrink-0" />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0 text-lg md:text-xl">
                    🍱
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-900 text-sm truncate">Sushi Express</p>
                    <p className="text-gray-600 text-xs">6 pedidos</p>
                  </div>
                </div>
                <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400 shrink-0" />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0 text-lg md:text-xl">
                    🌮
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-900 text-sm truncate">La Taquería</p>
                    <p className="text-gray-600 text-xs">5 pedidos</p>
                  </div>
                </div>
                <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400 shrink-0" />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-100 rounded-lg flex items-center justify-center shrink-0 text-lg md:text-xl">
                    🍔
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-900 text-sm truncate">Burger Master</p>
                    <p className="text-gray-600 text-xs">5 pedidos</p>
                  </div>
                </div>
                <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400 shrink-0" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}