import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { 
  Send, 
  Search, 
  Paperclip,
  MoreVertical,
  Phone,
  Video
} from 'lucide-react';

export function ChatColaborador() {
  const [mensaje, setMensaje] = useState('');
  const [chatActivo, setChatActivo] = useState('1');

  const contactos = [
    { id: '1', nombre: 'Equipo General', ultimoMensaje: 'Reunión a las 3pm', hora: '10:30', noLeidos: 3, online: true },
    { id: '2', nombre: 'Gerente - Carlos Ruiz', ultimoMensaje: '¿Cómo va el servicio?', hora: '09:15', noLeidos: 0, online: true },
    { id: '3', nombre: 'Compañero - Ana López', ultimoMensaje: '¿Puedes ayudarme?', hora: 'Ayer', noLeidos: 1, online: false },
    { id: '4', nombre: 'Cocina', ultimoMensaje: 'Pedido listo', hora: 'Ayer', noLeidos: 0, online: true },
  ];

  const mensajes = [
    { id: '1', remitente: 'Carlos Ruiz', mensaje: '¿Cómo va todo en el turno?', hora: '09:15', propio: false },
    { id: '2', remitente: 'Tú', mensaje: 'Todo bien, estamos al día con los pedidos', hora: '09:16', propio: true },
    { id: '3', remitente: 'Carlos Ruiz', mensaje: 'Perfecto, cualquier cosa me avisas', hora: '09:17', propio: false },
    { id: '4', remitente: 'Tú', mensaje: 'Claro, gracias', hora: '09:18', propio: true },
  ];

  const handleEnviar = () => {
    if (mensaje.trim()) {
      console.log('Enviando:', mensaje);
      setMensaje('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900">Chat del Equipo</h2>
        <p className="text-gray-600">Comunícate con tu equipo de trabajo</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Lista de Contactos */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Conversaciones</CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Buscar..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {contactos.map((contacto) => (
                <button
                  key={contacto.id}
                  onClick={() => setChatActivo(contacto.id)}
                  className={`w-full p-4 border-b hover:bg-gray-50 transition-colors text-left ${
                    chatActivo === contacto.id ? 'bg-teal-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-700 text-lg">
                          {contacto.nombre.charAt(0)}
                        </span>
                      </div>
                      {contacto.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-gray-900 truncate">{contacto.nombre}</p>
                        <span className="text-xs text-gray-500">{contacto.hora}</span>
                      </div>
                      <p className="text-gray-600 text-sm truncate">{contacto.ultimoMensaje}</p>
                    </div>
                    {contacto.noLeidos > 0 && (
                      <Badge className="bg-teal-600">{contacto.noLeidos}</Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Área de Chat */}
        <Card className="md:col-span-2">
          {/* Header del Chat */}
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-700">CR</span>
                </div>
                <div>
                  <CardTitle className="text-lg">Gerente - Carlos Ruiz</CardTitle>
                  <CardDescription>En línea</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Video className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Mensajes */}
          <CardContent className="p-6 h-[400px] overflow-y-auto">
            <div className="space-y-4">
              {mensajes.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.propio ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${msg.propio ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        msg.propio
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm mb-1">{msg.mensaje}</p>
                      <p className={`text-xs ${msg.propio ? 'text-teal-100' : 'text-gray-500'}`}>
                        {msg.hora}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          {/* Input de Mensaje */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Escribe un mensaje..."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleEnviar()}
                className="flex-1"
              />
              <Button size="sm" onClick={handleEnviar} className="bg-teal-600 hover:bg-teal-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
