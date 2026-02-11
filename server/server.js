const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// In-memory "Database" for demo
let appointments = [
    {
        _id: "1",
        nombreCliente: "Marta Sánchez",
        emailCliente: "marta@ejemplo.com",
        telefonoCliente: "611223344",
        servicio: "Coloración Premium",
        precio: 45,
        fecha: new Date(),
        hora: "10:00",
        estado: "pendiente",
        estadoPago: "pendiente",
        createdAt: new Date()
    }
];

// Email Transporter (configurado con variables de entorno)
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// --- API ROUTES ---

// 1. Crear Cita
app.post('/api/appointments', async (req, res) => {
    try {
        const appointment = {
            _id: Math.random().toString(36).substr(2, 9),
            ...req.body,
            estado: 'pendiente',
            estadoPago: 'pendiente',
            createdAt: new Date()
        };
        appointments.push(appointment);

        // Enviar Email (Solo si la config es válida)
        if (process.env.EMAIL_USER && process.env.EMAIL_USER !== 'tu-email@gmail.com') {
            const mailOptions = {
                from: '"El Frasco de Anny" <noreply@elfrasco.com>',
                to: appointment.emailCliente,
                subject: 'Confirmación de tu Cita - El Frasco de Anny',
                html: `<h1>¡Hola ${appointment.nombreCliente}!</h1><p>Tu cita para ${appointment.servicio} ha sido reservada.</p>`
            };
            transporter.sendMail(mailOptions).catch(err => console.error('Error email:', err));
        }

        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 2. Obtener Citas (Admin Panel)
app.get('/api/appointments', (req, res) => {
    res.json(appointments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// 3. Obtener Horas Disponibles
app.get('/api/available-slots', (req, res) => {
    try {
        const { fecha } = req.query;
        if (!fecha) return res.status(400).json({ error: 'Fecha requerida' });

        const targetDate = new Date(fecha).toDateString();
        const busySlots = appointments
            .filter(a => new Date(a.fecha).toDateString() === targetDate && a.estado !== 'cancelada')
            .map(a => a.hora);

        const allSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "16:00", "17:00", "18:00", "19:00"];
        const availableSlots = allSlots.filter(slot => !busySlots.includes(slot));

        res.json(availableSlots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Actualizar Estado
app.patch('/api/appointments/:id', (req, res) => {
    const { id } = req.params;
    const index = appointments.findIndex(a => a._id === id);
    if (index !== -1) {
        appointments[index] = { ...appointments[index], ...req.body };
        res.json(appointments[index]);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Servidor (Demo Mode) en puerto ${PORT}`));
