import { Router } from 'express';
import { submitOnboarding, uploadProfilePic } from '../controllers/OnboardController.js';
import { jwtValidation } from "../middlewares/authMiddleware.js";
import { uploadMultipleFilesMiddleware, uploadFileMiddleware } from '../middlewares/fileMiddleware.js';



import multer from 'multer';
const upload = multer();  // Using multer for file uploads

const onboardingRouter = Router();

// OnboardingRouter.post('/onboarding/submit', jwtValidation, upload.fields([
//   { name: 'profilePicture' },
//   { name: 'visaDocuments' },
//   { name: 'driverLicenseCopy' }
// ]), submitOnboarding);

onboardingRouter.post('/submit', jwtValidation, uploadMultipleFilesMiddleware, submitOnboarding);
onboardingRouter.post('/submit-pic', jwtValidation, uploadFileMiddleware, uploadProfilePic);

export default onboardingRouter;
