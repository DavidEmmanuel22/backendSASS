import { useState } from 'react';
import type { AppUser } from '../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { User, Lock, Store, UserCog, Users } from 'lucide-react';
import { CanFarinesLogo } from './CanFarinesLogo';
import { toast } from 'sonner@2.0.3';
import logoImage from 'figma:asset/5bc3860bbf58f9c2c789e5c86a7e8c37e091a16f.png';

interface LoginViewProps {
  onLogin: (user: AppUser) => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;
    try {
      const res = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        toast.error('Credenciales inválidas');
        return;
      }
      const data = await res.json();
      const user: AppUser = {
        id: data.id,
        name: data.nombre,
        email: data.email,
        role: data.role,
      };
      onLogin(user);
    } catch (err) {
      toast.error('Error de conexión');
    }
  };

  const handleQuickLogin = (role: 'cliente' | 'trabajador' | 'gerente') => {
    const roleData = {
      cliente: { name: 'Cliente Demo', email: 'cliente@demo.com' },
      trabajador: { name: 'Colaborador Demo', email: 'colaborador@demo.com' },
      gerente: { name: 'Gerente Demo', email: 'gerente@demo.com' }
    };

    const user: AppUser = {
      id: Math.random().toString(36).substring(7),
      name: roleData[role].name,
      email: roleData[role].email,
      role,
    };
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center mb-4">
            <CanFarinesLogo className="h-20" />
          </div>
          <h1 className="text-gray-700 mb-2 text-2xl">Can Farines</h1>
          <p className="text-gray-600">Sistema de Gestión Integral</p>
        </div>

        <Card className="shadow-xl">
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Lock size={16} /> : <Lock size={16} />}
                  </button>
                </div>
              </div>
              <Button
                className="w-full bg-teal-600 hover:bg-teal-700 h-12 active:scale-95 transition-transform"
                onClick={handleLogin}
              >
                Entrar
              </Button>

              {/* Botones de acceso rápido */}
              <div className="pt-2 space-y-2">
                <p className="text-xs text-gray-500 text-center">Acceso rápido:</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 text-xs hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                    onClick={() => handleQuickLogin('cliente')}
                  >
                    <User className="w-3 h-3 mr-1" />
                    Cliente
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 text-xs hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                    onClick={() => handleQuickLogin('trabajador')}
                  >
                    <Users className="w-3 h-3 mr-1" />
                    Colaborador
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 text-xs hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"
                    onClick={() => handleQuickLogin('gerente')}
                  >
                    <UserCog className="w-3 h-3 mr-1" />
                    Gerente
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <p className="text-center text-gray-500 text-sm mt-6">
          Versión Mobile 1.0.0
        </p>
      </div>
    </div>
  );
}