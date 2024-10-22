import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const newUserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please provide a valid email'],
    },
    createdAt: { type: Date, default: Date.now },
    activated:{
        type: Boolean,
        required: true,
        default: false
    }
});


export default model('NewUser', newUserSchema);
