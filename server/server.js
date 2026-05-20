const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Fail fast on missing critical env variables
if (!process.env.JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET is not defined.');
    process.exit(1);
}
if (!process.env.STRIPE_SECRET_KEY) {
    console.error('FATAL ERROR: STRIPE_SECRET_KEY is not defined.');
    process.exit(1);
}

const app = express();

// --- DB CONNECTION ---
if (!process.env.MONGODB_URI) {
    console.warn('⚠️ MONGODB_URI is not defined. Using local database connection...');
}
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/peluqueria')
    .then(() => console.log('✅ MongoDB Conectado'))
    .catch(err => console.error('❌ Error MongoDB:', err));

// --- MIDDLEWARES ---
app.use(helmet());
app.use(cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'https://peluqueria-anny.vercel.app'],
    credentials: true
}));
app.use(express.json());

// --- ROUTES ---
const appointmentRoutes = require('./routes/appointmentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// --- EMAIL CONFIG ---
const nodemailer = require('nodemailer');
const emailService = process.env.EMAIL_SERVICE || 'gmail';
console.log(`📧 Configurando servicio de email: ${emailService} para el usuario: ${process.env.EMAIL_USER}`);

const transporter = (process.env.EMAIL_USER && process.env.EMAIL_PASS)
    ? nodemailer.createTransport({
        service: emailService,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    : null;

// Verificar conexión del email solo si hay credenciales configuradas
if (transporter) {
    transporter.verify(function (error) {
        if (error) {
            console.log("❌ Error de configuración de email:", error.message);
        } else {
            console.log("✅ Servidor de email listo para enviar mensajes");
        }
    });
}

// --- API ROUTES ---
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'El Frasco de Anny API - Modular & Protected' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Servidor MODULAR en puerto ${PORT}`));
