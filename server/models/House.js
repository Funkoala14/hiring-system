import { Schema as _Schema, model } from 'mongoose';
import Employee from './Employee.js';
import FacilityReport from './FacilityReport.js';

const Schema = _Schema;

const houseSchema = new Schema({
  title: { type: String, unique: true, required: true },
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
  facilityInfo: {
    beds: { type: Number, default: 0 },
    mattresses: { type: Number, default: 0 },
    tables: { type: Number, default: 0 },
    chairs: { type: Number, default: 0 },
  },
  residents: [{ 
    type: Schema.Types.ObjectId, ref: 'Employee'
  }],
  facilityReports: [{ type: Schema.Types.ObjectId, ref: 'FacilityReport'}],
}, { timestamps: true } );

// Export the House model
export default model('House', houseSchema);
