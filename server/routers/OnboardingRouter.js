import { Router } from 'express';
import { submitOnboarding, getDocumentById } from '../controllers/OnboardController.js';
import { jwtValidation } from "../middlewares/authMiddleware.js";
import { uploadMultipleFilesMiddleware, uploadFileMiddleware } from '../middlewares/fileMiddleware.js';

const onboardingRouter = Router();

onboardingRouter.post('/submit', jwtValidation, uploadMultipleFilesMiddleware, submitOnboarding);
onboardingRouter.get("/documents/:documentId", getDocumentById);

export default onboardingRouter;
