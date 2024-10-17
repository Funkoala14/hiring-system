import User from '../models/User.js';
import { compare } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;
import validator from 'validator';
import Employee from '../models/Employee.js';
const { escape } = validator;

// Register new user
export const register = async (req, res) => {
    const sanitizedUsername = escape(req.body.username);
    const sanitizedEmail = escape(req.body.email);
    const { password } = req.body;

    try {
        const existingUser = await Employee.findOne({
            $or: [{ username: sanitizedUsername }, { email: sanitizedEmail }],
        })
            .lean()
            .exec();

        if (existingUser) {
            return res.status(409).json({ message: 'Username or email already exists' });
        }

        const user = await Employee.create({
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
export const login = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ username }, { email }] })
            .lean()
            .exec();
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
export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};

// Check if the user is logged in (token validation)
export const checkToken = (req, res) => {
    if (req.user) {
        return res.status(200).json({ username: req.user.username, role: req.user.role });
    } else {
        return res.status(401).json({ message: 'Not authenticated' });
    }
};

// Fetch specified one User info
export const getEmployeeInfo = async (req, res) => {
    const { userId } = req.body;
    try {
        const employee = await Employee.findById(userId)
            .select('-__v -password -__t')
            .populate('housingAssignment')
            .lean()
            .exec();
        if (!employee) {
            return res.status(401).json({ message: 'Can not find user' });
        }

        return res.status(200).json({ message: 'success', data: { userId: employee._id, ...employee }, code: 200 });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', code: 500 });
    }
};

// Update specified one User info
export const updateEmployeeInfo = async (req, res) => {
    const { userId, updateData } = req.body;
    try {
        const employee = await Employee.findOneAndUpdate({ _id: userId }, updateData, { new: true, lean: true })
            .select('-__v -password -__t')
            .populate('housingAssignment')
            .lean()
            .exec();
        if (!employee) {
            return res.status(401).json({ message: 'Invalid userid' });
        }

        return res
            .status(200)
            .json({
                message: 'Employee info updated successfully',
                data: { userId: employee._id, ...employee },
                code: 200,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', code: 500 });
    }
};
