# 🔧 Taller 360 - Sistema de Gestión Integral

> Aplicación móvil web para la gestión completa de talleres mecánicos con 3 perfiles de usuario: Cliente, Trabajador y Gerente.

![Version](https://img.shields.io/badge/version-1.0.0-teal)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4+-teal)
![Mobile Ready](https://img.shields.io/badge/Mobile-Ready-green)

---

## 📱 Características Principales

### ✨ Mobile-First Design
- **100% Optimizado para móvil** - Diseño responsive desde el inicio
- **Touch-friendly** - Todos los elementos táctiles ≥48px
- **PWA Ready** - Instalable como app nativa
- **Offline Support** - Funcionalidad sin conexión (próximamente)

### 👥 3 Perfiles de Usuario

#### 👤 Cliente
- Realizar pedidos en tiempo real
- Seguimiento de servicios
- Consulta de facturas
- Comunicación directa
- Notificaciones personalizadas

#### 👷 Trabajador/Colaborador
- **Inicio**: Tareas del día, próximas citas, avisos
- **Tareas**: Gestión de trabajos asignados
- **Fichaje**: Control de horarios
- **Chat**: Comunicación interna
- **Reportes**: Desempeño y métricas
- **Formación**: Cursos y capacitaciones
- **Soporte**: Tickets e incidencias

#### 👨‍💼 Gerente (11 Módulos Completos)

1. **Dashboard 360** 📊
   - KPIs principales (MRR, NPS, Margen, Churn)
   - Métricas SLA
   - Alertas críticas en tiempo real
   - Gráficos de ingresos vs gastos

2. **Operativa** 🚚
   - Órdenes de servicio
   - Calendario integrado
   - Identificación de cuellos de botella
   - Control de calidad

3. **Clientes** 👥
   - Ficha 360 por cliente
   - Gestión de contratos
   - Precios especiales
   - Tracking de churn (bajas)
   - Segmentación

4. **Facturación y Finanzas** 💰
   - Gestión de facturas
   - Control de cobros/impagos
   - Estado de tesorería
   - Previsión de ingresos
   - MRR/ARR (Ingresos recurrentes)

5. **Personal y RR.HH.** 👨‍💼
   - Gestión de equipo
   - Turnos y fichajes
   - Evaluación de desempeño
   - Programas de formación
   - Permisos y altas/bajas

6. **Proveedores** 📦
   - Gestión de tarifas
   - Control de pedidos/OC
   - SLA de proveedores
   - Sistema de evaluación

7. **Productividad** 🎯
   - Objetivos OKR
   - Medición de tiempos
   - Eficiencia por equipo
   - Reportes visuales

8. **Comunicación** 💬
   - Chat interno por caso
   - Tablón de anuncios
   - Sistema de avisos
   - Encuestas y formularios

9. **Tienda** 🛒
   - Catálogo de productos
   - Gestión de precios
   - Promociones activas
   - Programa de fidelización
   - Control de stock

10. **Ayuda** ❓
    - Base de conocimiento
    - Sistema de tickets
    - FAQ integrado

11. **Configuración** ⚙️
    - **Integraciones**: API REST, Webhooks
    - **Automatizaciones**: Reglas, bots, OCR
    - **Negocio**: Impuestos, plantillas, planes
    - **Seguridad**: RGPD, Verifactu, auditoría, RBAC

### 🎨 Diseño
- **Tipografía**: Poppins (títulos) + Open Sans (texto)
- **Colores**: Teal (#0d9488) como color principal
- **Moneda**: Euros (€)
- **Componentes**: ShadCN UI + Tailwind CSS

---

## 🚀 Inicio Rápido

### Prerequisitos
```bash
Node.js >= 18
npm >= 9
```

### Instalación
```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/taller360.git
cd taller360

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Iniciar desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 📱 Convertir a APK

Para convertir esta aplicación web a APK de Android, consulta la **[Guía de Conversión Completa](./MOBILE_BUILD_GUIDE.md)**

### Método Rápido con Capacitor

```bash
# Instalar Capacitor
npm install @capacitor/core @capacitor/cli
npx cap init "Taller 360" "com.taller360.app"

# Añadir plataforma Android
npm install @capacitor/android
npx cap add android

# Build y sincronizar
npm run build
npx cap sync

# Abrir en Android Studio
npx cap open android
```

---

## 🏗️ Estructura del Proyecto

```
/
├── components/
│   ├── GerenteDashboard.tsx        # Dashboard gerente
│   ├── TrabajadorDashboard.tsx     # Dashboard trabajador
│   ├── ClienteDashboard.tsx        # Dashboard cliente
│   ├── LoginView.tsx               # Autenticación
│   ├── gerente/                    # 11 módulos gerente
│   └── ui/                         # Componentes reutilizables
├── config/
│   └── app.config.ts               # Configuración centralizada
├── styles/
│   └── globals.css                 # Estilos globales
├── public/
│   └── manifest.json               # PWA manifest
├── .env.example                    # Variables de entorno
├── CODE_STRUCTURE.md               # Arquitectura de código
├── MOBILE_BUILD_GUIDE.md           # Guía conversión APK
└── README.md                       # Este archivo
```

**📚 Documentación Adicional:**
- **[Arquitectura de Código](./CODE_STRUCTURE.md)** - Patrones y mejores prácticas
- **[Guía de Build Mobile](./MOBILE_BUILD_GUIDE.md)** - Convertir a APK paso a paso

---

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo local
npm run build        # Build producción
npm run preview      # Preview del build
npm run lint         # Linter
npm run type-check   # Verificar tipos TypeScript
```

---

## 🎯 Tecnologías Utilizadas

### Core
- **React 18** - UI Framework
- **TypeScript 5** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling

### UI Components
- **ShadCN UI** - Component library
- **Lucide React** - Icons
- **Recharts** - Gráficos
- **Sonner** - Toast notifications

### Mobile
- **Capacitor** (recomendado) - Native wrapper
- **PWA** - Progressive Web App
- **Touch optimizations** - Gestos táctiles

---

## 🔐 Autenticación

Actualmente usa **autenticación mock** para demostración.

**Para producción**, integrar con:
- Auth0
- Firebase Authentication
- JWT custom
- OAuth 2.0

Ver `config/app.config.ts` para configuración de autenticación.

---

## 🌐 API Integration

### Backend Mock (Actual)
Todos los datos son mock para demostración.

### Backend Real (Para Producción)
Crear servicios API en `/services/api/`:

```typescript
// services/api/gerente.service.ts
export const getKPIs = async () => {
  const response = await fetch(`${API_URL}/gerente/kpis`)
  return response.json()
}
```

Endpoints necesarios documentados en `MOBILE_BUILD_GUIDE.md`

---

## 📊 Datos de Ejemplo

### Login Demo
Puedes ingresar con cualquier email para probar:

- **Gerente**: Ver todos los 11 módulos
- **Trabajador**: Ver tareas, fichaje, chat, etc.
- **Cliente**: Ver pedidos, facturas, etc.

---

## 🎨 Personalización

### Colores del Tema
Editar `styles/globals.css`:

```css
:root {
  --color-primary: #0d9488;  /* Teal-600 */
  --color-secondary: #14b8a6; /* Teal-500 */
}
```

### Logo y Branding
- Reemplazar iconos en `/public/`
- Actualizar `manifest.json`
- Cambiar componente de logo en cada dashboard

### Tipografía
Configurada en `styles/globals.css`:
- **Poppins**: Títulos (h1-h6)
- **Open Sans**: Texto general

---

## 📱 PWA Features

### Instalable
La app puede instalarse como aplicación nativa desde el navegador.

### Offline (Próximamente)
- Service Worker para cache
- IndexedDB para datos locales
- Sincronización automática

### Push Notifications (Próximamente)
- Notificaciones de pedidos
- Alertas de tareas
- Recordatorios

---

## 🧪 Testing

### Unit Tests (Próximamente)
```bash
npm run test
```

### E2E Tests (Próximamente)
```bash
npm run test:e2e
```

---

## 🚢 Deployment

### Web (Vercel/Netlify)
```bash
npm run build
# Subir carpeta dist/
```

### Android APK
Ver **[MOBILE_BUILD_GUIDE.md](./MOBILE_BUILD_GUIDE.md)**

### iOS (Próximamente)
Requiere Mac + Xcode

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crear branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add: Amazing Feature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

---

## 📄 Licencia

Este proyecto es privado y propietario.

---

## 👨‍💻 Autor

**Taller 360 Team**

- Email: soporte@taller360.com
- Web: https://taller360.com

---

## 🙏 Agradecimientos

- ShadCN UI por los componentes
- Tailwind CSS por el framework de estilos
- Capacitor por la conversión nativa
- Lucide por los iconos

---

## 📞 Soporte

¿Necesitas ayuda?

- 📧 Email: soporte@taller360.com
- 📱 Teléfono: +34 123 456 789
- 💬 Chat: Disponible en la app

---

**¡Hecho con ❤️ para digitalizar talleres mecánicos!** 🔧✨
