const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  nombreCliente: {
    type: String,
    required: true,
    trim: true
  },
  emailCliente: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  telefonoCliente: {
    type: String,
    required: true
  },
  servicio: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  hora: {
    type: String, // format "HH:mm"
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmada', 'cancelada'],
    default: 'pendiente'
  },
  estadoPago: {
    type: String,
    enum: ['pendiente', 'pagado', 'fallido'],
    default: 'pendiente'
  },
  stripePaymentIntentId: {
    type: String,
    required: true,
    unique: true // Prevent duplicate appointments for the same payment
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Added index for fast lookup of available slots
AppointmentSchema.index({ fecha: 1, estado: 1 });

module.exports = mongoose.model('Appointment', AppointmentSchema);
