import { Schema, model } from 'mongoose';

const documentSchema = new Schema({
    //Filename
    type: {
        type: String,
        required: true,
        default: "" 
    },
    filename: { // S3 file key
        type: String,
        trim: true,
        default: "" 
    },
    src: { type: String, trim: true }, // Document URL
    file: {
        type: Buffer,
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