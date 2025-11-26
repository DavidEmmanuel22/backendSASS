import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MessageSquare, Send, Mail, X, Minimize2 } from 'lucide-react';
import { toast } from 'sonner';

interface Mensaje {
  id: string;
  remitente: string;
  asunto: string;
  mensaje: string;
  fecha: string;
  leido: boolean;
  tipo: 'recibido' | 'enviado';
}

interface MensajeChat {
  id: string;
  texto: string;
  esPropio: boolean;
  hora: string;
}

export function ComunicacionCliente() {
  const [mensajes] = useState<Mensaje[]>([
    {
      id: '1',
      remitente: 'La Taquería del Centro',
      asunto: 'Tu pedido está listo',
      mensaje: 'Hola! Tu pedido #PED001 ya está listo para recoger. Te esperamos.',
      fecha: '2025-11-10',
      leido: false,
      tipo: 'recibido',
    },
    {
      id: '2',
      remitente: 'Soporte FoodDigital',
      asunto: 'Gracias por tu comentario',
      mensaje: 'Hemos recibido tu opinión sobre Burger Master. Gracias por ayudarnos a mejorar.',
      fecha: '2025-11-09',
      leido: true,
      tipo: 'recibido',
    },
    {
      id: '3',
      remitente: 'Pizza Napoletana',
      asunto: 'Promoción especial',
      mensaje: '¡2x1 en pizzas medianas este fin de semana! No te lo pierdas.',
      fecha: '2025-11-08',
      leido: true,
      tipo: 'recibido',
    },
  ]);

  const [destinatario, setDestinatario] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensajeTexto, setMensajeTexto] = useState('');
  const [chatAbierto, setChatAbierto] = useState(false);
  const [chatMinimizado, setChatMinimizado] = useState(false);
  const [mensajesChat, setMensajesChat] = useState<MensajeChat[]>([]);
  const [mensajeChatActual, setMensajeChatActual] = useState('');
  const [chatDestinatario, setChatDestinatario] = useState('');

  const enviarMensaje = () => {
    if (!destinatario || !asunto || !mensajeTexto) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    // Iniciar chat
    setChatDestinatario(destinatario);
    setMensajesChat([
      {
        id: '1',
        texto: mensajeTexto,
        esPropio: true,
        hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setChatAbierto(true);
    
    // Limpiar formulario
    setDestinatario('');
    setAsunto('');
    setMensajeTexto('');
    
    toast.success('Mensaje enviado. Chat abierto con ' + destinatario);
  };

  const enviarMensajeChat = () => {
    if (!mensajeChatActual.trim()) return;

    const nuevoMensaje: MensajeChat = {
      id: String(mensajesChat.length + 1),
      texto: mensajeChatActual,
      esPropio: true,
      hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    };

    setMensajesChat([...mensajesChat, nuevoMensaje]);
    setMensajeChatActual('');

    // Simular respuesta automática
    setTimeout(() => {
      const respuestaAuto: MensajeChat = {
        id: String(mensajesChat.length + 2),
        texto: 'Hemos recibido tu mensaje. Un agente te responderá pronto.',
        esPropio: false,
        hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      };
      setMensajesChat((prev) => [...prev, respuestaAuto]);
    }, 1000);
  };

  const cerrarChat = () => {
    setChatAbierto(false);
    setMensajesChat([]);
    setChatDestinatario('');
    toast.success('Chat cerrado');
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <p className="text-gray-900">Chat en Vivo</p>
                <p className="text-gray-600 text-sm">Habla con nosotros</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-900">Email</p>
                <p className="text-gray-600 text-sm">soporte@fooddigital.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formulario para Nuevo Mensaje */}
      <Card>
        <CardHeader>
          <CardTitle>Enviar Mensaje</CardTitle>
          <CardDescription>Contáctanos directamente</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-700 text-sm">Para:</label>
              <Select value={destinatario} onValueChange={setDestinatario}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un destinatario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="La Taquería del Centro">La Taquería del Centro</SelectItem>
                  <SelectItem value="Burger Master">Burger Master</SelectItem>
                  <SelectItem value="Sushi Express">Sushi Express</SelectItem>
                  <SelectItem value="Pizza Napoletana">Pizza Napoletana</SelectItem>
                  <SelectItem value="Soporte FoodDigital">Soporte FoodDigital</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 text-sm">Asunto:</label>
              <Input 
                placeholder="Escribe el asunto" 
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-gray-700 text-sm">Mensaje:</label>
            <Textarea 
              placeholder="Escribe tu mensaje aquí..." 
              rows={4}
              value={mensajeTexto}
              onChange={(e) => setMensajeTexto(e.target.value)}
            />
          </div>
          <Button 
            className="w-full bg-teal-600 hover:bg-teal-700"
            onClick={enviarMensaje}
          >
            <Send className="w-4 h-4 mr-2" />
            Enviar Mensaje
          </Button>
        </CardContent>
      </Card>

      {/* Mensajes Recibidos */}
      <Card>
        <CardHeader>
          <CardTitle>Mensajes Recibidos</CardTitle>
          <CardDescription>Historial de comunicaciones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mensajes.map((mensaje) => (
              <div
                key={mensaje.id}
                className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                  !mensaje.leido ? 'bg-teal-50 border-teal-200' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900">{mensaje.remitente}</p>
                      {!mensaje.leido && <Badge className="bg-teal-600">Nuevo</Badge>}
                    </div>
                    <p className="text-gray-700">{mensaje.asunto}</p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(mensaje.fecha).toLocaleDateString('es-ES')}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{mensaje.mensaje}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat flotante */}
      {chatAbierto && (
        <div 
          className={`fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 ${
            chatMinimizado ? 'h-14' : 'h-[500px]'
          } transition-all duration-300`}
        >
          {/* Chat Header */}
          <div className="bg-teal-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <div>
                <p className="font-medium">Chat con {chatDestinatario}</p>
                <p className="text-xs text-teal-100">En línea</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setChatMinimizado(!chatMinimizado)}
                className="hover:bg-teal-700 p-1 rounded"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={cerrarChat}
                className="hover:bg-teal-700 p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!chatMinimizado && (
            <>
              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-3 overflow-y-auto h-[380px]">
                {mensajesChat.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.esPropio ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.esPropio
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.texto}</p>
                      <span className={`text-xs ${msg.esPropio ? 'text-teal-100' : 'text-gray-500'} mt-1 block`}>
                        {msg.hora}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Escribe un mensaje..."
                    value={mensajeChatActual}
                    onChange={(e) => setMensajeChatActual(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && enviarMensajeChat()}
                  />
                  <Button 
                    onClick={enviarMensajeChat}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}