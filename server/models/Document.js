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
}, { timestamps: true});

const Document = model("Document", documentSchema);

export default Document;
