import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { 
  Package, 
  Camera, 
  FileText,
  Upload,
  Scan,
  CheckCircle2,
  Edit3,
  Trash2,
  Plus,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Alert, AlertDescription } from '../ui/alert';

interface MaterialRecibido {
  id: string;
  codigo: string;
  nombre: string;
  cantidad: number;
  lote?: string;
  ubicacion: string;
  caducidad?: string;
}

interface RecepcionMaterialModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRecepcionCompletada: () => void;
}

export function RecepcionMaterialModal({ 
  isOpen, 
  onOpenChange, 
  onRecepcionCompletada
}: RecepcionMaterialModalProps) {
  const [modo, setModo] = useState<'seleccion' | 'ocr' | 'manual'>('seleccion');
  const [paso, setPaso] = useState(1); // 1: Captura/entrada, 2: Revisión, 3: Confirmación
  
  // Datos del albarán
  const [proveedor, setProveedor] = useState('');
  const [numeroAlbaran, setNumeroAlbaran] = useState('');
  const [fechaRecepcion, setFechaRecepcion] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [notas, setNotas] = useState('');
  
  // Materiales
  const [materiales, setMateriales] = useState<MaterialRecibido[]>([]);
  
  // OCR
  const [imagenAlbaran, setImagenAlbaran] = useState<File | null>(null);
  const [escaneando, setEscaneando] = useState(false);
  
  // Nuevo material (para añadir manualmente)
  const [nuevoMaterial, setNuevoMaterial] = useState({
    codigo: '',
    nombre: '',
    cantidad: '',
    lote: '',
    ubicacion: '',
    caducidad: ''
  });

  const handleSeleccionarModo = (modoSeleccionado: 'ocr' | 'manual') => {
    setModo(modoSeleccionado);
    setPaso(1);
  };

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagenAlbaran(e.target.files[0]);
    }
  };

  const handleEscanearOCR = () => {
    if (!imagenAlbaran) {
      toast.error('Por favor, sube una imagen del albarán');
      return;
    }

    setEscaneando(true);
    toast.info('Escaneando albarán con OCR...');

    // Simulación de OCR
    setTimeout(() => {
      // Datos simulados extraídos del albarán
      setProveedor('Repuestos AutoMax S.L.');
      setNumeroAlbaran('ALB-2025-00847');
      setFechaRecepcion(new Date().toISOString().split('T')[0]);
      
      const materialesExtraidos: MaterialRecibido[] = [
        {
          id: '1',
          codigo: 'ACE001',
          nombre: 'Aceite Motor 5W30 - 5L',
          cantidad: 10,
          lote: 'L2025-02',
          ubicacion: 'A-12',
        },
        {
          id: '2',
          codigo: 'FIL001',
          nombre: 'Filtro de Aceite Universal',
          cantidad: 15,
          lote: 'L2025-02',
          ubicacion: 'B-05',
        },
        {
          id: '3',
          codigo: 'FRE001',
          nombre: 'Pastillas de Freno Delanteras',
          cantidad: 8,
          lote: 'L2025-01',
          ubicacion: 'C-08',
        },
      ];

      setMateriales(materialesExtraidos);
      setEscaneando(false);
      setPaso(2); // Ir a revisión
      toast.success('¡Albarán escaneado correctamente! Revisa los datos extraídos.');
    }, 2500);
  };

  const handleAñadirMaterial = () => {
    if (!nuevoMaterial.codigo || !nuevoMaterial.nombre || !nuevoMaterial.cantidad) {
      toast.error('Completa al menos código, nombre y cantidad');
      return;
    }

    const material: MaterialRecibido = {
      id: Date.now().toString(),
      codigo: nuevoMaterial.codigo,
      nombre: nuevoMaterial.nombre,
      cantidad: parseInt(nuevoMaterial.cantidad),
      lote: nuevoMaterial.lote || undefined,
      ubicacion: nuevoMaterial.ubicacion || 'Por asignar',
      caducidad: nuevoMaterial.caducidad || undefined,
    };

    setMateriales([...materiales, material]);
    
    // Limpiar formulario
    setNuevoMaterial({
      codigo: '',
      nombre: '',
      cantidad: '',
      lote: '',
      ubicacion: '',
      caducidad: ''
    });

    toast.success('Material añadido a la lista');
  };

  const handleEliminarMaterial = (id: string) => {
    setMateriales(materiales.filter(m => m.id !== id));
    toast.info('Material eliminado de la lista');
  };

  const handleEditarCantidad = (id: string, nuevaCantidad: number) => {
    setMateriales(materiales.map(m => 
      m.id === id ? { ...m, cantidad: nuevaCantidad } : m
    ));
  };

  const handleRevisar = () => {
    if (materiales.length === 0) {
      toast.error('Añade al menos un material');
      return;
    }

    if (!proveedor || !numeroAlbaran) {
      toast.error('Completa los datos del albarán');
      return;
    }

    setPaso(2);
  };

  const handleConfirmarRecepcion = () => {
    toast.success(`Recepción completada: ${materiales.length} artículos añadidos al stock`);
    
    console.log('[RECEPCIÓN MATERIAL] Stock actualizado:', {
      proveedor,
      numeroAlbaran,
      fecha: fechaRecepcion,
      materiales: materiales.map(m => ({
        codigo: m.codigo,
        nombre: m.nombre,
        cantidad: m.cantidad,
        lote: m.lote,
        ubicacion: m.ubicacion
      })),
      notas
    });

    // Notificar al gerente
    console.log('[NOTIFICACIÓN GERENTE] Nueva recepción de material registrada:', {
      colaborador: 'Usuario actual',
      proveedor,
      numeroAlbaran,
      totalArticulos: materiales.length,
      totalUnidades: materiales.reduce((sum, m) => sum + m.cantidad, 0)
    });

    onRecepcionCompletada();
    handleReset();
    onOpenChange(false);
  };

  const handleReset = () => {
    setModo('seleccion');
    setPaso(1);
    setProveedor('');
    setNumeroAlbaran('');
    setFechaRecepcion(new Date().toISOString().split('T')[0]);
    setNotas('');
    setMateriales([]);
    setImagenAlbaran(null);
    setNuevoMaterial({
      codigo: '',
      nombre: '',
      cantidad: '',
      lote: '',
      ubicacion: '',
      caducidad: ''
    });
  };

  const handleVolver = () => {
    if (paso === 2) {
      setPaso(1);
    } else if (paso === 1) {
      setModo('seleccion');
      setMateriales([]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) handleReset();
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <DialogTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
                Recepción de material
              </DialogTitle>
              <DialogDescription className="text-left">
                {modo === 'seleccion' && 'Elige cómo registrar la recepción'}
                {modo === 'ocr' && paso === 1 && 'Escanea el albarán con OCR'}
                {modo === 'ocr' && paso === 2 && 'Revisa y confirma los datos extraídos'}
                {modo === 'manual' && paso === 1 && 'Introduce los datos manualmente'}
                {modo === 'manual' && paso === 2 && 'Revisa y confirma la recepción'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          {/* Selección de modo */}
          {modo === 'seleccion' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleSeleccionarModo('ocr')}
                className="p-6 rounded-lg border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all group text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Scan className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Escanear albarán (OCR)
                    </h3>
                    <p className="text-sm text-gray-600">
                      Sube una foto del albarán y extrae automáticamente los datos
                    </p>
                    <div className="mt-3">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Recomendado
                      </Badge>
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleSeleccionarModo('manual')}
                className="p-6 rounded-lg border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all group text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Edit3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Entrada manual
                    </h3>
                    <p className="text-sm text-gray-600">
                      Introduce los datos del albarán y materiales a mano
                    </p>
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Modo OCR - Paso 1: Escanear */}
          {modo === 'ocr' && paso === 1 && (
            <div className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50">
                <Scan className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-sm text-blue-700">
                  <strong>Consejos para un buen escaneo:</strong> Asegúrate de que la imagen esté bien iluminada, 
                  enfocada y que todo el texto sea legible.
                </AlertDescription>
              </Alert>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="imagen-albaran"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImagenChange}
                  className="hidden"
                />
                <label htmlFor="imagen-albaran" className="cursor-pointer">
                  {imagenAlbaran ? (
                    <div className="space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-lg bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong>Imagen cargada:</strong> {imagenAlbaran.name}
                      </p>
                      <p className="text-xs text-gray-500">Click para cambiar</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-lg bg-gray-100 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong>Haz clic para tomar foto</strong> o subir imagen del albarán
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG hasta 10MB</p>
                    </div>
                  )}
                </label>
              </div>

              {imagenAlbaran && (
                <Button
                  onClick={handleEscanearOCR}
                  disabled={escaneando}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {escaneando ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Escaneando albarán...
                    </>
                  ) : (
                    <>
                      <Scan className="w-5 h-5 mr-2" />
                      Escanear con OCR
                    </>
                  )}
                </Button>
              )}
            </div>
          )}

          {/* Modo Manual - Paso 1: Entrada de datos */}
          {modo === 'manual' && paso === 1 && (
            <div className="space-y-6">
              {/* Datos del albarán */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Datos del albarán
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="proveedor">Proveedor *</Label>
                    <Input
                      id="proveedor"
                      placeholder="Ej: AutoMax S.L."
                      value={proveedor}
                      onChange={(e) => setProveedor(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numero-albaran">Nº Albarán *</Label>
                    <Input
                      id="numero-albaran"
                      placeholder="Ej: ALB-2025-001"
                      value={numeroAlbaran}
                      onChange={(e) => setNumeroAlbaran(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fecha-recepcion">Fecha Recepción</Label>
                    <Input
                      id="fecha-recepcion"
                      type="date"
                      value={fechaRecepcion}
                      onChange={(e) => setFechaRecepcion(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Añadir material */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Añadir materiales
                </h3>

                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="codigo">Código *</Label>
                      <Input
                        id="codigo"
                        placeholder="Ej: ACE001"
                        value={nuevoMaterial.codigo}
                        onChange={(e) => setNuevoMaterial({...nuevoMaterial, codigo: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre *</Label>
                      <Input
                        id="nombre"
                        placeholder="Ej: Aceite Motor 5W30"
                        value={nuevoMaterial.nombre}
                        onChange={(e) => setNuevoMaterial({...nuevoMaterial, nombre: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cantidad">Cantidad *</Label>
                      <Input
                        id="cantidad"
                        type="number"
                        min="1"
                        placeholder="0"
                        value={nuevoMaterial.cantidad}
                        onChange={(e) => setNuevoMaterial({...nuevoMaterial, cantidad: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ubicacion">Ubicación</Label>
                      <Input
                        id="ubicacion"
                        placeholder="Ej: A-12"
                        value={nuevoMaterial.ubicacion}
                        onChange={(e) => setNuevoMaterial({...nuevoMaterial, ubicacion: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lote">Lote</Label>
                      <Input
                        id="lote"
                        placeholder="Ej: L2025-02"
                        value={nuevoMaterial.lote}
                        onChange={(e) => setNuevoMaterial({...nuevoMaterial, lote: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="caducidad">Caducidad</Label>
                      <Input
                        id="caducidad"
                        type="date"
                        value={nuevoMaterial.caducidad}
                        onChange={(e) => setNuevoMaterial({...nuevoMaterial, caducidad: e.target.value})}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleAñadirMaterial}
                    variant="outline"
                    className="w-full border-green-300 text-green-700 hover:bg-green-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Añadir a la lista
                  </Button>
                </div>

                {/* Lista de materiales añadidos */}
                {materiales.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-700">
                        Materiales añadidos: {materiales.length}
                      </p>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {materiales.map((material) => (
                        <div 
                          key={material.id}
                          className="px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 flex items-center justify-between"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {material.codigo} - {material.nombre}
                            </p>
                            <p className="text-sm text-gray-600">
                              Cantidad: {material.cantidad} · 
                              {material.lote && ` Lote: ${material.lote} ·`}
                              {` Ubicación: ${material.ubicacion}`}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEliminarMaterial(material.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Notas */}
              <div className="space-y-2">
                <Label htmlFor="notas">Notas (opcional)</Label>
                <Textarea
                  id="notas"
                  placeholder="Observaciones sobre la recepción..."
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Paso 2: Revisión (común para OCR y Manual) */}
          {paso === 2 && (
            <div className="space-y-6">
              <Alert className="border-orange-200 bg-orange-50">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-sm text-orange-700">
                  Revisa cuidadosamente los datos antes de confirmar. Una vez confirmada, 
                  se actualizará el stock automáticamente.
                </AlertDescription>
              </Alert>

              {/* Resumen del albarán */}
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Datos del albarán
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Proveedor</p>
                    <p className="font-medium text-gray-900">{proveedor}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Nº Albarán</p>
                    <p className="font-medium text-gray-900">{numeroAlbaran}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Fecha</p>
                    <p className="font-medium text-gray-900">
                      {new Date(fechaRecepcion).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
                {notas && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-gray-600 text-sm">Notas</p>
                    <p className="text-gray-900 text-sm">{notas}</p>
                  </div>
                )}
              </div>

              {/* Tabla de materiales */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Materiales a recibir ({materiales.length})
                </h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Código</TableHead>
                        <TableHead>Material</TableHead>
                        <TableHead className="text-center">Cantidad</TableHead>
                        <TableHead>Lote</TableHead>
                        <TableHead>Ubicación</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {materiales.map((material) => (
                        <TableRow key={material.id}>
                          <TableCell className="font-medium">{material.codigo}</TableCell>
                          <TableCell>{material.nombre}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              +{material.cantidad}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {material.lote || '-'}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-gray-50">
                              {material.ubicacion}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Totales */}
                <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-green-800">
                      <strong>Total de artículos:</strong> {materiales.length}
                    </p>
                    <p className="text-sm text-green-800">
                      <strong>Total de unidades:</strong> {materiales.reduce((sum, m) => sum + m.cantidad, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {modo !== 'seleccion' && (
            <Button
              variant="outline"
              onClick={handleVolver}
              className="w-full sm:w-auto"
            >
              Volver
            </Button>
          )}

          {modo === 'manual' && paso === 1 && (
            <Button
              onClick={handleRevisar}
              disabled={materiales.length === 0 || !proveedor || !numeroAlbaran}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
            >
              Revisar recepción
            </Button>
          )}

          {paso === 2 && (
            <Button
              onClick={handleConfirmarRecepcion}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Confirmar y añadir al stock
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
