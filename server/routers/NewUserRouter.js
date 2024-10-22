import express from 'express';
import generateRegistrationToken from '../utils/generateRegistrationToken.js';
import jwt from 'jsonwebtoken';
import NewUser from '../models/NewUser.js';


const router = express.Router();
const { JWT_SECRET } = process.env;


router.post('/generate-token', async (req, res) => {
  const { name, email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    let user = await NewUser.findOne({ email });

    if (!user) {
      user = new NewUser({ name, email });
      await user.save();
    }

    const token = generateRegistrationToken(email);

    res.json({ token });
  } catch (error) {
    console.error('Error creating new user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/verify-token', (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    res.json({ email: decoded.email });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

router.get('/all-users', async (req, res) => {
  try {
    const users = await NewUser.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/delete-user', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await NewUser.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
