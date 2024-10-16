import { Schema as _Schema, model } from 'mongoose';
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
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Export the House model
export default model('House', houseSchema);
