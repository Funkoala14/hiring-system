import express from 'express';
import { 
    getApplicationById,
    getPendingApplications,
    getRejectedApplications,
    getApprovedApplications,
    updateApplicationStatus
 } from '../controllers/OnboardingController.js';

 import Application from '../models/Application.js';
const router = express.Router();

router.get('/pending', getPendingApplications);

router.get('/rejected', getRejectedApplications);

router.get('/approved', getApprovedApplications);

router.get('/application/:applicationId', getApplicationById);

router.patch('/application/:applicationId', updateApplicationStatus);

// temporary add, can be deleted or updated to include more fields
router.post('/add', async (req, res) => {
    const { name, email, status, feedback } = req.body;
  
    try {
      const newApplication = new Application({
        name,
        email,
        status: status || 'pending',
        feedback: feedback || '',
      });
  
      await newApplication.save();
      res.status(201).json({ message: 'Application created successfully', application: newApplication });
    } catch (error) {
      console.error('Error creating application:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

export default router;
