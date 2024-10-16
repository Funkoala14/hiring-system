import { Schema } from 'mongoose';
import validator from 'validator';

const refType = Schema.Types.ObjectId;

const EmployeeSchema = new Schema(
    {
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true },
        middleName: { type: String, trim: true },
        preferedName: { type: String, trim: true },
        image: { type: String, trim: true },
        ssn: { type: String, trim: true },
        birth: { type: Date },
        gender: { type: String, enum: ['male', 'female', 'other'] },
        cellPhone: { type: String, trim: true },
        workPhone: { type: String, trim: true },
        emergencyContact: {
            firstName: { type: String, trim: true },
            lastName: { type: String, trim: true },
            middleName: { type: String, trim: true },
            phone: { type: String, trim: true },
            email: { type: String, trim: true },
            relationship: { type: String, trim: true },
        },
    },
    { timestamps: true }
);

// Pre-save hook for phone and email validation
EmployeeSchema.pre('save', function (next) {
    const employee = this;

    // Phone number validation (for US phone numbers)
    if (!validator.isMobilePhone(employee.cellPhone, 'en-US')) {
        return next(new Error('Cell phone number is invalid.'));
    }

    if (employee.workPhone && !validator.isMobilePhone(employee.workPhone, 'en-US')) {
        return next(new Error('Work phone number is invalid.'));
    }

    if (!validator.isMobilePhone(employee.emergencyContact.phone, 'en-US')) {
        return next(new Error('Emergency contact phone number is invalid.'));
    }

    // Email
    if (employee.emergencyContact.email && !validator.isEmail(employee.emergencyContact.email)) {
        return next(new Error('Emergency contact email is invalid.'));
    }

    // If everything is fine, proceed to save
    next();
});

const Employee = User.discriminator('Employee', EmployeeSchema);

export default Employee;
