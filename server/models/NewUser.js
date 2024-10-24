import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const newUserSchema = new Schema(
    {
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
        activated: {
            type: Boolean,
            required: true,
            default: false,
        },
        registrationLink: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

const NewUser = model('NewUser', newUserSchema);
export default NewUser;
