import { Schema, model } from 'mongoose';
// feel free to modify
const applicationSchema = new Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    feedback: {
        type: String,
    },
});


const Application = model('Application', applicationSchema);

export default Application;