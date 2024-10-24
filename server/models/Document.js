import { Schema, model } from "mongoose";

const documentSchema = new Schema({
  //Filename
  type: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  hrFeedback: {
    type: String,
  },
  approvedOrRejectedAt: {
    type: Date,
  },
  src: {
    type: String,
  },
  awsKey: {
    type: String,
  },
});


const Document = model("Document", documentSchema);

export default Document;
