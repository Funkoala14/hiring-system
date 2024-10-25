import { Router } from "express";
import {
  submitDocument,
  getVisaStatusNextStep,
  getAllPendingStatuses,
  getAllStatuses,
  changeDocumentStatus,
  postDocumentFeedback,
} from "../controllers/VisaStatusController.js";
import {
  jwtValidation,
  checkPermission,
} from "../middlewares/authMiddleware.js";
import { uploadFileMiddleware } from "../middlewares/fileMiddleware.js";

const visaStatusRouter = Router();

//Employee API
visaStatusRouter.get("/info", jwtValidation, getVisaStatusNextStep);
visaStatusRouter.post(
  "/submit",
  jwtValidation,
  uploadFileMiddleware,
  submitDocument
);

//HR API
visaStatusRouter.get(
  "/all-pending",
  jwtValidation,
  checkPermission("HR"),
  getAllPendingStatuses
);
visaStatusRouter.get(
  "/all",
  jwtValidation,
  checkPermission("HR"),
  getAllStatuses
);

visaStatusRouter.post(
  "/status",
  jwtValidation,
  checkPermission("HR"),
  changeDocumentStatus
);
visaStatusRouter.post(
  "/feedback",
  jwtValidation,
  checkPermission("HR"),
  postDocumentFeedback
);

export default visaStatusRouter;
