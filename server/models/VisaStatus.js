import mongoose from 'mongoose';
import Document from "./Document.js"

const refType = mongoose.Schema.Types.ObjectId;

const visaStatusSchema = new mongoose.Schema({
    citizenshipType: { type: String, enum: ["non-resident", "green card", "citizen"], default: 'non-resident' },
    visaTitle: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    documents: [{ type: refType, ref: "Document" }],
    citizenship: { type: String },
    specificVisaTitle: { type: String },
});

const VisaStatus = mongoose.model('VisaStatus', visaStatusSchema);

export default VisaStatus;
