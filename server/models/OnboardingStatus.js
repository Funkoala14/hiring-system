const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
module.exports = mongoose.model('OnboardingStatus', onboardingStatusSchema);
