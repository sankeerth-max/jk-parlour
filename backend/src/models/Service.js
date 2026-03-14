import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Threading',
        'Hair Services',
        'Waxing',
        'Skin Care',
        'Hair Coloring',
        'Facials',
        'Pedicure & Manicure',
        'Bridal Makeup',
        'Mehendi',
        'Bridal Packages',
      ],
    },
    description: { type: String },
    priceFrom: { type: Number, required: true },
    imageUrl: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);

export default Service;

