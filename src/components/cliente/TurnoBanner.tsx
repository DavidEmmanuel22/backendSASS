
import { Button } from '../ui/button';
import { Clock, Users, Info } from 'lucide-react';
import { Card } from '../ui/card';

// Interfaz flexible para el turno
export interface TurnoData {
  numero?: string;
  personasEspera?: number;
  tiempoEstimado?: string;
  estado?: string;
  clienteId?: number;
  pedidoId?: number;
}

export interface TurnoBannerProps {
  turno: TurnoData | null;
  onVerDetalles: () => void;
}

export function TurnoBanner({ turno, onVerDetalles }: TurnoBannerProps) {
  if (!turno) {
    return (
      <Card className="bg-gradient-to-r from-teal-600 to-teal-700 border-0 shadow-lg mb-6 w-full">
        <div className="p-4 text-center text-white">No tienes turno activo.</div>
      </Card>
    );
  }
  return (
    <Card className="bg-gradient-to-r from-teal-600 to-teal-700 border-0 shadow-lg mb-6 w-full">
      <div className="p-4 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
          {/* Icono y Turno */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 w-full">
              {/* Tu turno actual */}
              <div className="min-w-[90px]">
                <p className="text-xs text-teal-100">Tu turno actual</p>
                <p className="text-3xl font-bold text-white tracking-wider whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {turno.numero ?? '-'}
                </p>
              </div>
              {/* Separador vertical (solo desktop) */}
              <div className="hidden sm:block w-px h-12 bg-white/30" />
              {/* En espera y Tiempo estimado */}
              <div className="flex gap-4 sm:gap-6 flex-wrap">
                {/* En espera */}
                <div className="min-w-[120px]">
                  <p className="text-xs text-teal-100">En espera</p>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-white" />
                    <p className="text-lg font-semibold text-white whitespace-nowrap">
                      {typeof turno.personasEspera === 'number' ? turno.personasEspera : '-'} {turno.personasEspera === 1 ? 'persona' : 'personas'}
                    </p>
                  </div>
                </div>
                {/* Tiempo estimado */}
                <div className="min-w-[120px]">
                  <p className="text-xs text-teal-100">Tiempo estimado</p>
                  <p className="text-lg font-semibold text-white whitespace-nowrap">
                    ~{turno.tiempoEstimado ?? '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Botón Ver detalles */}
          <div className="flex justify-end mt-4 md:mt-0">
            <Button
              onClick={onVerDetalles}
              variant="outline"
              className="bg-white hover:bg-teal-50 text-teal-700 border-white shrink-0"
            >
              <Info className="w-4 h-4 mr-2" />
              Ver detalles
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}