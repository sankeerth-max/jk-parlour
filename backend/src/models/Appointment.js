import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    service: { type: String, required: true },
    category: { type: String },
    price: { type: String },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;

