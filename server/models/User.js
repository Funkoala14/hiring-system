// models/User.js

import { Schema as _Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
const Schema = _Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: { type: String, enum: ['Employee', 'HR'], default: 'Employee', required: true },
}, { timestamps: true });

// Hashing password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password) {
    return await compare(password, this.password);
};
const User = model('User', userSchema);

export default User;
