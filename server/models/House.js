import { Schema as _Schema, model } from 'mongoose';
import Employee from './Employee.js';
import FacilityReport from './FacilityReport.js';

const Schema = _Schema;

const houseSchema = new Schema({
  address: {
    building: { type: String, required: true },
    street:   { type: String, required: true },
    city:     { type: String, required: true },
    state:    { type: String, required: true },
    zip:      { type: String, required: true },
  },
  landlord: {
    name:  { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  residents: [{ 
    type: Schema.Types.ObjectId, ref: 'Employee'
  }],
  facilityReports: [{ type: Schema.Types.ObjectId, ref: 'FacilityReport'}],
}, { timestamps: true } );

// Export the House model
export default model('House', houseSchema);
