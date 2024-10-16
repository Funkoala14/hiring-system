import { findOne, create } from '../models/User';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { escape } from 'validator';

// Register new user
const register = async (req, res) => {

  const sanitizedUsername = escape(req.body.username);
  const sanitizedEmail = escape(req.body.email);
  const { password } = req.body;

  try {
    const existingUser = await findOne({
      $or: [{ username: sanitizedUsername }, { email: sanitizedEmail }]
    }).lean().exec();

    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }

    const user = await create({
      username: sanitizedUsername,
      email: sanitizedEmail,
      password,
    });

    const token = sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Login user
const login = async (req, res) => {
  const { username, email, password } = req.body;

  try {
      const user = await findOne({ $or: [{ username }, { email }] }).lean().exec();
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or email' });
      }

      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      const token = sign(
          {
              id: user._id,
              username: user.username,
              email: user.email,
              role: user.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
      );
    
      res.cookie('token', token, {
          httpOnly: true,
          sameSite: 'Strict',
          maxAge: 24 * 60 * 60 * 1000,
      });

    return res.status(200).json({ message: 'Login successful', token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Logout user by clearing the JWT cookie
const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};

// Check if the user is logged in (token validation)
const checkToken = (req, res) => {
  if (req.user) {
    return res.status(200).json({ username: req.user.username, role: req.user.role });
  } else {
    return res.status(401).json({ message: 'Not authenticated' });
  }
};



export default {
  register,
  login,
  logout,
  checkToken,
};
