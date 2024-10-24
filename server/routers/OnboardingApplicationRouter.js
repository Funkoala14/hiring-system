import express from 'express';
import {
  getApplicationById,
  getPendingApplications,
  getRejectedApplications,
  getApprovedApplications,
  updateApplicationStatus
} from '../controllers/OnboardingController.js';

const router = express.Router();

router.get('/pending', getPendingApplications);

router.get('/rejected', getRejectedApplications);

router.get('/approved', getApprovedApplications);

router.get('/application/:applicationId', getApplicationById);

router.patch('/application/:applicationId', updateApplicationStatus);

export default router;
