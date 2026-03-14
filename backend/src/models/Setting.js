import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    instagram: { type: String, default: '' },
    email: { type: String, default: '' },
    workingHours: { type: String, default: '9:30 AM – 8:00 PM' },
  },
  { timestamps: true }
);

const Setting = mongoose.model('Setting', settingSchema);

export default Setting;

