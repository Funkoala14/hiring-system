// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    role:     { type: String, enum: ['Employee', 'HR'], default: 'user', required: true },
    housingAssignment: { type: Schema.Types.ObjectId, ref: 'House' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
