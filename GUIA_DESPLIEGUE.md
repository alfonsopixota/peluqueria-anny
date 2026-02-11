# 🚀 Guía de Despliegue - El Frasco de Anny

## ✅ Estado Actual

Tu proyecto ya está en GitHub: **https://github.com/alfonsopixota/peluqueria-anny**

## 📋 Pasos para Publicar en Internet

### 1️⃣ Desplegar el FRONTEND en Vercel (GRATIS)

1. Ve a **https://vercel.com/signup** y regístrate con tu cuenta de GitHub
2. Una vez dentro, haz clic en **"Add New Project"**
3. Busca y selecciona el repositorio: `alfonsopixota/peluqueria-anny`
4. Configura lo siguiente:
   - **Framework Preset**: Next.js
   - **Root Directory**: `client`
   - **Build Command**: `npm run build` (ya viene por defecto)
   - **Output Directory**: `.next` (ya viene por defecto)

5. En **Environment Variables**, añade:
   ```
   NEXT_PUBLIC_API_URL = http://localhost:5000
   ```
   (Más tarde lo cambiaremos por la URL del backend)

6. Haz clic en **"Deploy"**
7. Espera 2-3 minutos y tendrás tu web en una URL como: `https://peluqueria-anny.vercel.app`

---

### 2️⃣ Desplegar el BACKEND en Render (GRATIS)

1. Ve a **https://render.com/register** y regístrate con tu cuenta de GitHub
2. Una vez dentro, haz clic en **"New +"** → **"Web Service"**
3. Conecta tu repositorio: `alfonsopixota/peluqueria-anny`
4. Configura lo siguiente:
   - **Name**: `peluqueria-anny-backend`
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free

5. En **Environment Variables**, añade:
   ```
   PORT = 5000
   EMAIL_HOST = smtp.gmail.com
   EMAIL_PORT = 587
   EMAIL_USER = tu-email@gmail.com
   EMAIL_PASS = tu-contraseña-de-aplicación
   FRONTEND_URL = https://peluqueria-anny.vercel.app
   ```

6. Haz clic en **"Create Web Service"**
7. Espera 3-5 minutos y tendrás tu API en: `https://peluqueria-anny-backend.onrender.com`

---

### 3️⃣ Conectar Frontend con Backend

1. Vuelve a **Vercel** → Tu proyecto → **Settings** → **Environment Variables**
2. Edita `NEXT_PUBLIC_API_URL` y cambia el valor a:
   ```
   https://peluqueria-anny-backend.onrender.com
   ```
3. Haz clic en **"Redeploy"** para aplicar los cambios

---

## 🎉 ¡LISTO!

Tu web estará disponible públicamente en:
- **Frontend**: https://peluqueria-anny.vercel.app
- **Backend**: https://peluqueria-anny-backend.onrender.com
- **Admin Panel**: https://peluqueria-anny.vercel.app/admin (contraseña: `anny2024`)

---

## 📧 Configurar Email (Opcional pero Recomendado)

Para que se envíen emails de confirmación:

1. Ve a tu cuenta de Gmail
2. Activa la **verificación en 2 pasos**
3. Genera una **contraseña de aplicación**: https://myaccount.google.com/apppasswords
4. Usa esa contraseña en la variable `EMAIL_PASS` de Render

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios en el código:
1. Haz commit: `git add . && git commit -m "Descripción del cambio"`
2. Sube a GitHub: `git push`
3. Vercel y Render se actualizarán automáticamente en 2-3 minutos

---

## 🆘 Soporte

Si tienes algún problema, revisa los logs en:
- Vercel: https://vercel.com/dashboard
- Render: https://dashboard.render.com

---

**Creado con ❤️ por Antigravity AI**
