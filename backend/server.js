import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './src/routes/auth.js';
import serviceRoutes from './src/routes/services.js';
import offerRoutes from './src/routes/offers.js';
import galleryRoutes from './src/routes/gallery.js';
import appointmentRoutes from './src/routes/appointments.js';
import settingsRoutes from './src/routes/settings.js';
import testimonialRoutes from './src/routes/testimonials.js';

dotenv.config();

const app = express();

// Avoid default port 5000 on macOS — AirPlay Receiver often binds there and returns 403 without CORS (see frontend API port).
app.use(cors({ origin: true }));
app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/sri-karthika-bridal';

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
  });

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Sri Karthika Bridal Studio API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/testimonials', testimonialRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

