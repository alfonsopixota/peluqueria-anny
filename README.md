# El Frasco de Anny Del Agua

Aplicación web completa para la peluquería "El Frasco de Anny Del Agua" en Jerez.

## 🚀 Características

- **Landing Page Premium**: Diseño elegante y minimalista con animaciones fluidas (Framer Motion).
- **Sistema de Reservas Pro**: Calendario interactivo con pasos (Step-by-step) y disponibilidad dinámica.
- **Pagos con Stripe**: Integración completa para pagos online seguros antes de confirmar la reserva.
- **Testimonios**: Sección de experiencias de clientes con diseño de autor.
- **Panel de Administración**: Gestión de citas protegida con autenticación por clave secreta.
- **Notificaciones**: Envío automático de confirmación por email (Nodemailer).
- **Responsive**: Experiencia perfecta en móviles, tablets y ordenadores.

## 📦 Tecnologías

### Frontend
- Next.js (App Router)
- Tailwind CSS (Premium Design System)
- Framer Motion (Animations)
- Stripe Elements (Payments)
- Lucide Icons & Date-fns

### Backend
- Node.js & Express
- MongoDB (Mongoose)
- Stripe API
- Nodemailer

## 🛠️ Instalación Local

### 1. Backend
```bash
cd server
npm install
npm run dev # Se iniciará en puerto 5000
```
*Configura tu `.env` con la URI de MongoDB y claves de Stripe.*

### 2. Frontend
```bash
cd client
npm install
npm run dev # Se iniciará en puerto 3000
```

## 🔐 Panel de Administración

Accede en `http://localhost:3000/admin`
- **Contraseña predeterminada**: `anny2024`

## 📄 Notas de Despliegue

Consulta la [GUIA_DESPLIEGUE.md](./GUIA_DESPLIEGUE.md) para subir el proyecto a Vercel y Render.

---
Proyecto privado - © 2026 El Frasco de Anny Del Agua
