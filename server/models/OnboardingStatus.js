import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const onboardingStatusSchema = new Schema({
    employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },  // Reference to the employee (User model)
    status: {
        type: String,
        enum: ['Not Started', 'Pending', 'Approved', 'Rejected'],
        default: 'Not Started',
        required: true
    },
    updatedAt: { type: Date, default: Date.now },  // Timestamp when the status was last updated
    comments: { type: String }  // Optional field for comments or additional information
});

// Export the model
export default model('OnboardingStatus', onboardingStatusSchema);
