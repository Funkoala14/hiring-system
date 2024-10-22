import { Router } from 'express';
import { submitDocument, getVisaStatusNextStep, getAllPendingStatuses, getAllApprovedStatuses } from '../controllers/VisaStatusController.js';
import { jwtValidation, checkPermission } from '../middlewares/authMiddleware.js';
import multer from 'multer';

const upload = multer();

const visaStatusRouter = Router();

visaStatusRouter.post('/submit',
    jwtValidation,
    upload.single('file'),
    submitDocument);
visaStatusRouter.get('/info', jwtValidation, getVisaStatusNextStep);
visaStatusRouter.get('/all-pending',
    // jwtValidation,
    // checkPermission('hr'), // Add this after testing
    getAllPendingStatuses
);

visaStatusRouter.get('/all-approved',
    // jwtValidation,
    // checkPermission('hr'), // Add this after testing
    getAllApprovedStatuses
);


export default visaStatusRouter;
