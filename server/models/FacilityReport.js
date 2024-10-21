import { model, Schema } from "mongoose";
import User from "./User.js";

const refType = Schema.Types.ObjectId;

const CommentSchema = new Schema(
    {
        description: { type: String, required: true },
        createdBy: { type: refType, ref: "User", required: true },
    },
    { timestamps: true }
);

const FacilityReportSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        createdBy: { type: refType, ref: "User", required: true },
        status: {
            type: String,
            enum: ["Open", "In Progress", "Closed"],
            default: "Open",
        },
        comments: [CommentSchema],
    },
    { timestamps: true }
);

const FacilityReport = model("FacilityReport", FacilityReportSchema);
export default FacilityReport;
