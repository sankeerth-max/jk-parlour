import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Bridal Makeup', 'Hair Styling', 'Skin Care', 'Salon Interior', 'Before & After'],
    },
    caption: { type: String },
  },
  { timestamps: true }
);

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);

export default GalleryItem;

