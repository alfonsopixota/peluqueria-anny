# El Frasco de Anny Del Agua

[![Security Audit: Passed](https://img.shields.io/badge/Security_Audit-Passed-brightgreen)](./walkthrough.md)

Aplicación web completa para la peluquería "El Frasco de Anny Del Agua" en Jerez. El sistema ha sido auditado y fortalecido siguiendo protocolos OWASP y de ingeniería sénior.

## 🚀 Características

- **Landing Page Premium**: Diseño elegante con animaciones fluidas.
- **Sistema de Reservas Pro**: Disponibilidad dinámica y prevención de duplicados.
- **Pagos con Stripe**: Integración segura de pagos online.
- **Seguridad Avanzada**: Protección contra XSS, CSRF, Rate-limiting y Mass Assignment.
- **Autenticación JWT**: Panel de administración protegido mediante tokens firmados.
- **Infraestructura**: Despliegue optimizado en Vercel y Render.

## 📦 Tecnologías

### Frontend
- Next.js (App Router), Framer Motion, Tailwind CSS, Stripe Elements.

### Backend (Modular)
- Node.js & Express, MongoDB (Mongoose), jsonwebtoken, Helmet, Express-rate-limit.

## 🛠️ Instalación Local

### 1. Backend
```bash
cd server
npm install
npm run dev # Inicia en puerto 5000
```
*Variables requeridas en `.env`: `MONGODB_URI`, `STRIPE_SECRET_KEY`, `ADMIN_SECRET_KEY`, `JWT_SECRET`.*

### 2. Frontend
```bash
cd client
npm install
npm run dev # Inicia en puerto 3000
```

## 🔐 Panel de Administración

El acceso ahora utiliza **JWT**.
1. **Login**: Realiza un POST a `/api/admin/login` con la contraseña.
2. **Autorización**: Incluye el token devuelto en la cabecera `Authorization: Bearer <token>`.

## 📄 Documentación Adicional

- [Guía de Despliegue](./GUIA_DESPLIEGUE.md)
- [Informe de Auditoría](./walkthrough.md)
- [Política de Privacidad](./POLITICA_PRIVACIDAD.md)

---
Proyecto privado - © 2026 El Frasco de Anny Del Agua
