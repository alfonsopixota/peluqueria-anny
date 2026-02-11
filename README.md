# El Frasco de Anny Del Agua

Aplicación web completa para la peluquería "El Frasco de Anny Del Agua" en Jerez.

## 🚀 Características

- **Landing Page Premium**: Diseño elegante y minimalista con animaciones fluidas
- **Sistema de Reservas**: Calendario interactivo con disponibilidad en tiempo real
- **Panel de Administración**: Gestión de citas protegido por contraseña
- **Responsive**: Adaptado para móviles, tablets y ordenadores

## 📦 Tecnologías

### Frontend
- Next.js 15
- Tailwind CSS v4
- TypeScript
- Framer Motion
- Lucide Icons

### Backend
- Node.js
- Express
- MongoDB (opcional, actualmente en modo demo)
- Nodemailer

## 🛠️ Instalación Local

### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
node server.js
```

## 🌐 Despliegue

- **Frontend**: Vercel
- **Backend**: Render
- **Base de datos**: MongoDB Atlas (opcional)

## 📝 Configuración

Copia `.env.example` a `.env` y configura las variables de entorno:

```env
PORT=5000
MONGODB_URI=tu-uri-de-mongodb
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña
```

## 🔐 Panel de Administración

Accede en `/admin` con la contraseña: `anny2024`

## 📄 Licencia

Proyecto privado - © 2026 El Frasco de Anny Del Agua
