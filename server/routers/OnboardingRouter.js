import { Router } from 'express';
import { submitOnboarding, getDocumentById } from '../controllers/OnboardController.js';
import { jwtValidation } from "../middlewares/authMiddleware.js";
import { uploadMultipleFilesMiddleware, uploadFileMiddleware } from '../middlewares/fileMiddleware.js';
import { formValidation } from '../middlewares/validationMiddleware.js';

const onboardingRouter = Router();

onboardingRouter.post('/submit', jwtValidation, uploadMultipleFilesMiddleware, submitOnboarding);
onboardingRouter.get("/documents/:documentId", jwtValidation, getDocumentById);

export default onboardingRouter;
