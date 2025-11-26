import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { CheckCircle2, Clock, AlertCircle, Package, PlayCircle } from 'lucide-react';
import { AñadirMaterialModal } from './AñadirMaterialModal';
import { CompletarTareaModal } from './CompletarTareaModal';
import { toast } from 'sonner@2.0.3';

interface Tarea {
  id: number;
  titulo: string;
  estado: 'pendiente' | 'en-progreso' | 'completada';
  prioridad: 'alta' | 'media' | 'baja';
  tiempo: string;
  ordenTrabajo?: string;
  vehiculo?: string;
}

export function TareasTrabajador() {
  const [materialModalOpen, setMaterialModalOpen] = useState(false);
  const [completarModalOpen, setCompletarModalOpen] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | null>(null);

  const tareas: Tarea[] = [
    { 
      id: 1, 
      titulo: 'Preparación de masa para pizzas', 
      estado: 'pendiente', 
      prioridad: 'alta', 
      tiempo: '45 min',
      ordenTrabajo: 'TAREA-001',
      vehiculo: 'Zona Cocina'
    },
    { 
      id: 2, 
      titulo: 'Limpieza profunda zona cocina', 
      estado: 'en-progreso', 
      prioridad: 'media', 
      tiempo: '1h 30min',
      ordenTrabajo: 'TAREA-002',
      vehiculo: 'Área Principal'
    },
    { 
      id: 3, 
      titulo: 'Control temperatura cámaras frigoríficas', 
      estado: 'pendiente', 
      prioridad: 'alta', 
      tiempo: '30 min',
      ordenTrabajo: 'TAREA-003',
      vehiculo: 'Almacén'
    },
    { 
      id: 4, 
      titulo: 'Preparación de ingredientes del día', 
      estado: 'completada', 
      prioridad: 'alta', 
      tiempo: '2h',
      ordenTrabajo: 'TAREA-004',
      vehiculo: 'Zona Prep'
    },
    { 
      id: 5, 
      titulo: 'Reposición de bebidas en neveras', 
      estado: 'pendiente', 
      prioridad: 'media', 
      tiempo: '20 min',
      ordenTrabajo: 'TAREA-005',
      vehiculo: 'Zona Bar'
    },
    { 
      id: 6, 
      titulo: 'Montaje estación hamburguesas', 
      estado: 'pendiente', 
      prioridad: 'baja', 
      tiempo: '40 min',
      ordenTrabajo: 'TAREA-006',
      vehiculo: 'Cocina Caliente'
    },
    { 
      id: 7, 
      titulo: 'Control de caducidades almacén', 
      estado: 'completada', 
      prioridad: 'alta', 
      tiempo: '1h',
      ordenTrabajo: 'TAREA-007',
      vehiculo: 'Almacén Seco'
    },
    { 
      id: 8, 
      titulo: 'Limpieza horno de pizzas', 
      estado: 'pendiente', 
      prioridad: 'media', 
      tiempo: '50 min',
      ordenTrabajo: 'TAREA-008',
      vehiculo: 'Zona Horno'
    },
  ];

  const handleAñadirMaterial = (tarea: Tarea) => {
    setTareaSeleccionada(tarea);
    setMaterialModalOpen(true);
  };

  const handleIniciarCompletar = (tarea: Tarea) => {
    if (tarea.estado === 'en-progreso') {
      setTareaSeleccionada(tarea);
      setCompletarModalOpen(true);
    } else {
      toast.success('Tarea iniciada');
    }
  };

  const handleMaterialRegistrado = (material: any) => {
    console.log('Material registrado para tarea:', material);
    setTareaSeleccionada(null);
  };

  const handleTareaCompletada = () => {
    console.log('Tarea completada:', tareaSeleccionada);
    setTareaSeleccionada(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {tareas.map((tarea) => (
          <Card key={tarea.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {tarea.titulo}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{tarea.tiempo}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {tarea.estado === 'completada' && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Completada
                    </Badge>
                  )}
                  {tarea.estado === 'en-progreso' && (
                    <Badge className="bg-blue-100 text-blue-800">
                      En Progreso
                    </Badge>
                  )}
                  {tarea.estado === 'pendiente' && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Pendiente
                    </Badge>
                  )}
                  {tarea.prioridad === 'alta' && (
                    <Badge variant="destructive">Alta</Badge>
                  )}
                </div>
              </div>
              {tarea.estado !== 'completada' && (
                <div className="mt-4 flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-teal-600 hover:bg-teal-700" 
                    onClick={() => handleIniciarCompletar(tarea)}
                  >
                    <PlayCircle className="w-4 h-4 mr-1" />
                    {tarea.estado === 'en-progreso' ? 'Completar' : 'Iniciar'}
                  </Button>
                  {tarea.estado === 'en-progreso' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAñadirMaterial(tarea)}
                    >
                      <Package className="w-4 h-4 mr-1" />
                      Añadir material
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Modal añadir material */}
      <AñadirMaterialModal
        isOpen={materialModalOpen}
        onOpenChange={setMaterialModalOpen}
        onMaterialRegistrado={handleMaterialRegistrado}
        tareaId={tareaSeleccionada?.id.toString()}
        vehiculo={tareaSeleccionada?.vehiculo}
        ordenTrabajo={tareaSeleccionada?.ordenTrabajo}
      />

      {/* Modal completar tarea */}
      {completarModalOpen && tareaSeleccionada && (
        <CompletarTareaModal
          isOpen={completarModalOpen}
          onOpenChange={setCompletarModalOpen}
          onTareaCompletada={handleTareaCompletada}
          tarea={tareaSeleccionada}
        />
      )}
    </div>
  );
}