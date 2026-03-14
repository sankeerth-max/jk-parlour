import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    let admin = await Admin.findOne({ email });

    if (!admin) {
      const initialEmail = process.env.ADMIN_EMAIL;
      const initialPassword = process.env.ADMIN_PASSWORD;
      if (initialEmail && initialPassword && email === initialEmail) {
        const passwordHash = await bcrypt.hash(initialPassword, 10);
        admin = await Admin.findOneAndUpdate(
          { email: initialEmail },
          {
            $setOnInsert: {
              email: initialEmail,
              passwordHash,
              name: 'Admin',
            },
          },
          { upsert: true, new: true }
        );
      }
    }

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || 'dev_secret',
      { expiresIn: '8h' }
    );

    return res.json({
      token,
      admin: { id: admin._id, email: admin.email, name: admin.name },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

