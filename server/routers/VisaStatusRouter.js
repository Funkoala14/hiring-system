import { Router } from 'express';
import { submitDocument, getVisaStatusByEmployeeId } from '../controllers/VisaStatusController.js';


const visaStatusRouter = Router();

visaStatusRouter.post('/submit', submitDocument); //Add authMiddleware later 
visaStatusRouter.get('/status', getVisaStatusByEmployeeId); //Add authMiddleware later 

export default visaStatusRouter;
