const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Resend = require('resend').Resend;
require('dotenv').config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Appointment = require('./models/Appointment');

const app = express();
app.use(cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'https://peluqueria-anny.vercel.app'],
    credentials: true
}));
app.use(express.json());

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/peluqueria')
    .then(() => console.log('✅ MongoDB Conectado'))
    .catch(err => console.error('❌ Error MongoDB:', err));

// --- EMAIL CONFIG ---
const emailService = process.env.EMAIL_SERVICE || 'gmail';
console.log(`📧 Configurando servicio de email: ${emailService} para el usuario: ${process.env.EMAIL_USER}`);

const transporter = nodemailer.createTransport({
    service: emailService,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verificar conexión del email al arrancar
transporter.verify(function (error, success) {
    if (error) {
        console.log("❌ Error de configuración de email:", error.message);
    } else {
        console.log("✅ Servidor de email listo para enviar mensajes");
    }
});

// Middleware de Autenticación Simple para Admin
const adminAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === process.env.ADMIN_SECRET_KEY || authHeader === 'anny2024') {
        next();
    } else {
        res.status(401).json({ error: 'No autorizado' });
    }
};

// --- API ROUTES ---

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'El Frasco de Anny API - Production Mode' });
});

// 1. Crear Intención de Pago (Stripe)
app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // En céntimos
            currency: 'eur',
            automatic_payment_methods: { enabled: true },
        });
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Crear Cita (Pública)
app.post('/api/appointments', async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();

        // Enviar Email de Confirmación
        if (process.env.RESEND_API_KEY || (process.env.EMAIL_USER && process.env.EMAIL_USER.includes('@'))) {
            const emailHtml = `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 30px; border-radius: 15px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #00BEB7; margin: 0;">El Frasco de Anny</h1>
                        <p style="color: #666; font-style: italic;">Tu momento de belleza</p>
                    </div>
                    <h2 style="color: #333;">¡Hola ${appointment.nombreCliente}!</h2>
                    <p style="font-size: 16px; color: #555;">Tu reserva ha sido confirmada con éxito. Aquí tienes los detalles:</p>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <p><strong>Servicio:</strong> ${appointment.servicio}</p>
                        <p><strong>Fecha:</strong> ${new Date(appointment.fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><strong>Hora:</strong> ${appointment.hora}</p>
                        <p><strong>Precio:</strong> ${appointment.precio}€ (Pagado)</p>
                    </div>
                    <p style="font-size: 14px; color: #888; text-align: center; margin-top: 30px;">
                        Calle Ejemplo 123, Jerez de la Frontera.<br>
                        Si necesitas cancelar o cambiar tu cita, llámanos lo antes posible.
                    </p>
                </div>
            `;

            if (resend) {
                resend.emails.send({
                    from: 'El Frasco de Anny <onboarding@resend.dev>', // Usar este dominio temporal de Resend
                    to: appointment.emailCliente,
                    subject: 'Confirmación de tu Cita - El Frasco de Anny',
                    html: emailHtml
                }).then(() => console.log('📧 Email enviado vía Resend'))
                    .catch(err => console.error('❌ Error Resend:', err));
            } else if (transporter) {
                const mailOptions = {
                    from: `"El Frasco de Anny" <${process.env.EMAIL_USER}>`,
                    to: appointment.emailCliente,
                    subject: 'Confirmación de tu Cita - El Frasco de Anny',
                    html: emailHtml
                };
                transporter.sendMail(mailOptions)
                    .then(info => console.log('📧 Email enviado vía SMTP:', info.response))
                    .catch(err => console.error('❌ Error SMTP:', err.message));
            }
        }

        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 3. Obtener Citas (Protegida)
app.get('/api/appointments', adminAuth, async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ fecha: -1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Obtener Horas Disponibles (Pública)
app.get('/api/available-slots', async (req, res) => {
    try {
        const { fecha } = req.query;
        if (!fecha) return res.status(400).json({ error: 'Fecha requerida' });

        const targetDate = new Date(fecha);
        const startDay = new Date(targetDate.setHours(0, 0, 0, 0));
        const endDay = new Date(targetDate.setHours(23, 59, 59, 999));

        const busyAppointments = await Appointment.find({
            fecha: { $gte: startDay, $lte: endDay },
            estado: { $ne: 'cancelada' }
        });

        const busySlots = busyAppointments.map(a => a.hora);
        const allSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "16:00", "17:00", "18:00", "19:00"];
        const availableSlots = allSlots.filter(slot => !busySlots.includes(slot));

        res.json(availableSlots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Actualizar Estado (Protegida)
app.patch('/api/appointments/:id', adminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });
        if (!appointment) return res.status(404).json({ error: 'Cita no encontrada' });
        res.json(appointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Servidor PRODUCCIÓN en puerto ${PORT}`));

