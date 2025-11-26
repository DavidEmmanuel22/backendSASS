import { useState, useEffect } from 'react';
import { LoginView } from './components/LoginView';
import { ClienteDashboard } from './components/ClienteDashboard';
import { TrabajadorDashboard } from './components/TrabajadorDashboard';
import { GerenteDashboard } from './components/GerenteDashboard';
import { Toaster } from './components/ui/sonner';
import { APP_CONFIG, validateConfig } from './config/app.config';
import { UserProvider } from './context/UserContext';

export type UserRole = 'cliente' | 'trabajador' | 'gerente' | null;

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  telefono?: string;
  idioma?: string;
  direccion?: string;
  ciudad?: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);

  // Configuración PWA/Mobile y validación
  useEffect(() => {
    // Validar configuración
    validateConfig();

    // Configurar viewport para mobile
    const viewport = document.querySelector('meta[name=viewport]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // Prevenir pull-to-refresh
    document.body.style.overscrollBehavior = 'none';

    // Log app info en desarrollo
    if (APP_CONFIG.features.debug) {
      console.log(`🚀 ${APP_CONFIG.app.name} v${APP_CONFIG.app.version}`);
    }

    // Restaurar usuario de localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (user: AppUser) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  if (!currentUser) {
    return (
      <UserProvider initialUser={null}>
        <LoginView onLogin={handleLogin} />
        <Toaster />
      </UserProvider>
    );
  }

  return (
    <UserProvider initialUser={currentUser}>
      {currentUser.role === 'cliente' && (
        <ClienteDashboard user={currentUser} onLogout={handleLogout} />
      )}
      {currentUser.role === 'trabajador' && (
        <TrabajadorDashboard user={currentUser} onLogout={handleLogout} />
      )}
      {currentUser.role === 'gerente' && (
        <GerenteDashboard user={currentUser} onLogout={handleLogout} />
      )}
      <Toaster />
    </UserProvider>
  );
}

export default App;