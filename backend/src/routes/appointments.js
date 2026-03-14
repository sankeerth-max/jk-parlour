import express from 'express';
import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
  let session;
  try {
    const { name, phone, email, service, date, timeSlot } = req.body;
    if (!name || !phone || !service || !date || !timeSlot) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    session = await mongoose.startSession();
    let createdAppointment;

    await session.withTransaction(async () => {
      const count = await Appointment.countDocuments({
        date,
        timeSlot,
        status: { $ne: 'Cancelled' },
      }).session(session);

      if (count >= 4) {
        const error = new Error('TIME_SLOT_FULL');
        throw error;
      }

      const [appointment] = await Appointment.create([req.body], { session });
      createdAppointment = appointment;
    });

    if (!createdAppointment) {
      return res
        .status(500)
        .json({ message: 'Failed to create appointment. Please try again.' });
    }

    res.status(201).json(createdAppointment);
  } catch (err) {
    if (err.message === 'TIME_SLOT_FULL') {
      return res
        .status(400)
        .json({ message: 'Selected time slot is fully booked. Please choose another slot.' });
    }
    res.status(400).json({ message: 'Failed to create appointment', error: err.message });
  } finally {
    if (session) {
      await session.endSession();
    }
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const { date } = req.query;
    const query = {};
    if (date) query.date = date;
    const appointments = await Appointment.find(query).sort({ date: 1, timeSlot: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
});

router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Confirmed', 'Cancelled', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update appointment status' });
  }
});

export default router;

