import express from 'express';
import Setting from '../models/Setting.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.findOneAndUpdate(
        {},
        {
          $setOnInsert: {
            address:
              'First Floor, Sunthara Vinayagar Kovil Street, Near Ulavar Santhai, Kallakurichi, Tamil Nadu 606202',
            phone: '00000 00000',
            whatsapp: '918072965181',
            instagram: 'https://www.instagram.com/jk.makeoverartistry',
            email: 'sivanga285@gmail.com',
            workingHours: '9:30 AM – 8:00 PM',
          },
        },
        { upsert: true, new: true }
      );
    }
    res.json(setting);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch settings' });
  }
});

router.put('/', authMiddleware, async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create(req.body);
    } else {
      setting.set(req.body);
      await setting.save();
    }
    res.json(setting);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update settings' });
  }
});

export default router;

