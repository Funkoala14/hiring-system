import Application from "../models/Application.js";

export const getPendingApplications = async (req, res) => {
  try {
    const applications = await Application.find({ status: 'pending' });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching pending applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRejectedApplications = async (req, res) => {
  try {
    const applications = await Application.find({ status: 'rejected' });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching rejected applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getApprovedApplications = async (req, res) => {
  try {
    const applications = await Application.find({ status: 'approved' });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching approved applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getApplicationById = async (req, res) => {
  const { applicationId } = req.params;
  try {
    const application = await Application.findById(applicationId);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (error) {
    console.error('Error fetching application details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status, feedback } = req.body;

  try {
    const application = await Application.findById(applicationId);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    if (['approved', 'rejected'].includes(status)) {
      application.status = status;
      if (status === 'rejected' && feedback) {
        application.feedback = feedback;
      }
      await application.save();
      return res.json({ message: `Application ${status.toLowerCase()} successfully`, application });
    } else {
      return res.status(400).json({ message: 'Invalid status update' });
    }
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
