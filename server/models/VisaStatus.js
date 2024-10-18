import { Schema, model } from 'mongoose';
const refType = Schema.Types.ObjectId;

export const visaStatusSchema = new Schema({
    citizenshipType: { type: String, enum: ["non-resident", "green card", "citizen"] },
    visaTitle: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    documents: [{ type: refType, ref: "Document" }]
});

const VisaStatus = model('VisaStatus', visaStatusSchema);

export default VisaStatus;