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
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
