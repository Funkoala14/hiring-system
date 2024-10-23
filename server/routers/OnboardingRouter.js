import { Router } from 'express';
import { submitOnboarding } from '../controllers/OnboardController.js';
import { jwtValidation } from "../middlewares/authMiddleware.js";



import multer from 'multer';
const upload = multer();  // Using multer for file uploads

const onboardingRouter = Router();

// OnboardingRouter.post('/onboarding/submit', jwtValidation, upload.fields([
//   { name: 'profilePicture' },
//   { name: 'visaDocuments' },
//   { name: 'driverLicenseCopy' }
// ]), submitOnboarding);

onboardingRouter.post('/submit', jwtValidation, submitOnboarding);

export default onboardingRouter;
