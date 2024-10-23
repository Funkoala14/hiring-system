import { Router } from "express";
import {
  submitDocument,
  getVisaStatusNextStep,
  getAllPendingStatuses,
  getAllApprovedStatuses,
  changeDocumentStatus,
  postDocumentFeedback,
  downloadFile,
} from "../controllers/VisaStatusController.js";
import {
  jwtValidation,
  checkPermission,
} from "../middlewares/authMiddleware.js";
import multer from "multer";

const upload = multer();

const visaStatusRouter = Router();

//Employee API
visaStatusRouter.get("/info", jwtValidation, getVisaStatusNextStep);
visaStatusRouter.post(
  "/submit",
  jwtValidation,
  upload.single("file"),
  submitDocument
);

//HR API
visaStatusRouter.get(
  "/all-pending",
  // jwtValidation,
  // checkPermission('hr'), // Add this after testing
  getAllPendingStatuses
);
visaStatusRouter.get(
  "/all-approved",
  //   jwtValidation,
  //   checkPermission('hr'), // Add this after testing
  getAllApprovedStatuses
);
visaStatusRouter.get("/download/:filename", downloadFile);

visaStatusRouter.post(
  "/status",
  jwtValidation,
  //   checkPermission("hr"),
  changeDocumentStatus
);
visaStatusRouter.post(
  "/feedback",
  jwtValidation,
  //   checkPermission("hr"),
  postDocumentFeedback
);
visaStatusRouter.post(
  "/notify",
  jwtValidation,
  //   checkPermission("hr"),
  postDocumentFeedback
);

export default visaStatusRouter;
