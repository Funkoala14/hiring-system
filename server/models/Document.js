import { Schema, model } from 'mongoose';

const documentSchema = new Schema({
    //Filename
    type: {
        type: String,
        required: true
    },
    file: {
        type: Buffer,
        required: true
    },
    uploadedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    hrFeedback: {
        type: String,
    },
    approvedOrRejectedAt: {
        type: Date,
    },
});


const Document = model('Document', documentSchema);

export default Document;