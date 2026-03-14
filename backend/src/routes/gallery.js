import express from 'express';
import GalleryItem from '../models/GalleryItem.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const items = await GalleryItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch gallery' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const item = await GalleryItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add image', error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await GalleryItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete image' });
  }
});

export default router;

