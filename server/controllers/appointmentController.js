const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');
const Resend = require('resend').Resend;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { getServicePrice } = require('../config/services');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Helper for email
const sendConfirmationEmail = async (appointment) => {
    if (!process.env.RESEND_API_KEY && !(process.env.EMAIL_USER && process.env.EMAIL_USER.includes('@'))) return;

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
        try {
            await resend.emails.send({
                from: 'El Frasco de Anny <onboarding@resend.dev>',
                to: appointment.emailCliente,
                subject: 'Confirmación de tu Cita - El Frasco de Anny',
                html: emailHtml
            });
        } catch (err) {
            console.error('❌ Error Resend:', err);
        }
    } else {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"El Frasco de Anny" <${process.env.EMAIL_USER}>`,
            to: appointment.emailCliente,
            subject: 'Confirmación de tu Cita - El Frasco de Anny',
            html: emailHtml
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (err) {
            console.error('❌ Error SMTP:', err.message);
        }
    }
};

exports.createAppointment = async (req, res) => {
    try {
        const {
            nombreCliente, emailCliente, telefonoCliente,
            servicio, fecha, hora, stripePaymentIntentId
        } = req.body;

        if (!stripePaymentIntentId) {
            return res.status(400).json({ error: 'stripePaymentIntentId es requerido' });
        }

        // Verify payment with Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(stripePaymentIntentId);
        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ error: 'El pago no ha sido completado' });
        }

        // Derive price server-side
        const precio = getServicePrice(servicio);
        if (precio === null) {
            return res.status(400).json({ error: 'Servicio no válido' });
        }

        const appointment = new Appointment({
            nombreCliente, emailCliente, telefonoCliente,
            servicio, precio, fecha, hora, stripePaymentIntentId,
            estado: 'pendiente',
            estadoPago: 'pagado'
        });

        await appointment.save();
        await sendConfirmationEmail(appointment);

        res.status(201).json(appointment);
    } catch (error) {
        console.error('❌ Error in createAppointment:', error);
        res.status(400).json({ error: 'Error al crear la cita', details: error.message });
    }
};

exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ fecha: -1 });
        res.json(appointments);
    } catch (error) {
        console.error('❌ Error in getAppointments:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

exports.getAvailableSlots = async (req, res) => {
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
        console.error('❌ Error in getAvailableSlots:', error);
        res.status(500).json({ error: 'Error al consultar disponibilidad' });
    }
};

exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(id, { estado }, { new: true, runValidators: true });
        if (!appointment) return res.status(404).json({ error: 'Cita no encontrada' });
        res.json(appointment);
    } catch (error) {
        console.error('❌ Error in updateAppointmentStatus:', error);
        res.status(400).json({ error: 'Error al actualizar cita', details: error.message });
    }
};
