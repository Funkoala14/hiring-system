import { Schema } from "mongoose";
import validator from "validator";
import User from "./User.js";
import House from "./House.js";

const refType = Schema.Types.ObjectId;

const EmployeeSchema = new Schema({
    firstName: { type: String, trim: true, default: "" },
    lastName: { type: String, trim: true, default: "" },
    middleName: { type: String, trim: true, default: "" },
    preferedName: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "" },
    ssn: { type: String, trim: true, default: "" },
    birth: { type: Date, default: null },
    gender: { type: String, enum: ["male", "female", "other", ""], default: "" },
    phone: { type: String, trim: true, default: "" },
    workPhone: { type: String, trim: true, default: "" },
    emergencyContact: {
        firstName: { type: String, trim: true, default: "" },
        lastName: { type: String, trim: true, default: "" },
        middleName: { type: String, trim: true, default: "" },
        phone: { type: String, trim: true, default: "" },
        email: { type: String, trim: true, default: "" },
        relationship: { type: String, trim: true, default: "" },
    },
    address: {
        buildingOrAptNumber: { type: String, trim: true, default: "", maxlength: 10 },
        street: { type: String, trim: true, default: "" },
        city: { type: String, trim: true, default: "" },
        state: { type: String, trim: true, default: "", maxlength: 2 },
        zipcode: {
            type: String,
            trim: true,
            default: "",
        },
    },
    housingAssignment: { type: refType, ref: "House" },
    visaStatus: { type: refType, ref: "VisaStatus" },
});

// Pre-save hook for phone and email validation
EmployeeSchema.pre("save", function (next) {
    const employee = this;

    // Phone number validation (for US phone numbers)
    if (employee.cellPhone && !validator.isMobilePhone(employee.cellPhone, "en-US")) {
        return next(new Error("Cell phone number is invalid."));
    }

    if (employee.workPhone && !validator.isMobilePhone(employee.workPhone, "en-US")) {
        return next(new Error("Work phone number is invalid."));
    }

    if (employee.emergencyContact.phone && !validator.isMobilePhone(employee.emergencyContact.phone, "en-US")) {
        return next(new Error("Emergency contact phone number is invalid."));
    }

    // Email
    if (employee.emergencyContact.email && !validator.isEmail(employee.emergencyContact.email)) {
        return next(new Error("Emergency contact email is invalid."));
    }

    // If everything is fine, proceed to save
    next();
});

const Employee = User.discriminator("Employee", EmployeeSchema);

export default Employee;
