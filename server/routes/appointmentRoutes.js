const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const adminAuth = require('../middleware/auth');

// Public routes
router.post('/', appointmentController.createAppointment);
router.get('/available-slots', appointmentController.getAvailableSlots);

// Protected routes
router.get('/', adminAuth, appointmentController.getAppointments);
router.patch('/:id', adminAuth, appointmentController.updateAppointmentStatus);

module.exports = router;
