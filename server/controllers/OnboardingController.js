import Employee from "../models/Employee.js";
import OnboardingStatus from "../models/OnboardingStatus.js";

export const getPendingApplications = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate('onboardingStatus')
      .lean()
      .exec();

    const pendingEmployees = employees.filter(emp => emp.onboardingStatus?.status === 'Pending');

    res.json(pendingEmployees);
  } catch (error) {
    console.error('Error fetching pending applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRejectedApplications = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate('onboardingStatus')
      .lean()
      .exec();

    const rejectedEmployees = employees.filter(emp => emp.onboardingStatus?.status === 'Rejected');

    res.json(rejectedEmployees);
  } catch (error) {
    console.error('Error fetching rejected applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getApprovedApplications = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate('onboardingStatus')
      .lean()
      .exec();

    const approvedEmployees = employees.filter(emp => emp.onboardingStatus?.status === 'Approved');

    res.json(approvedEmployees);
  } catch (error) {
    console.error('Error fetching approved applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getApplicationById = async (req, res) => {
  const { applicationId } = req.params;
  try {
    const employee = await Employee.findById(applicationId)
      .populate('onboardingStatus')
      .lean()
      .exec();

    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status, feedback } = req.body;

  try {
    const employee = await Employee.findById(applicationId)
      .populate('onboardingStatus')
      .exec();

    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    if (['Approved', 'Rejected'].includes(status)) {
      employee.onboardingStatus.status = status;
      if (status === 'Rejected' && feedback) {
        employee.onboardingStatus.feedback = feedback;
      }
      await employee.onboardingStatus.save();
      return res.json({ message: `Application ${status.toLowerCase()} successfully`, employee });
    } else {
      return res.status(400).json({ message: 'Invalid status update' });
    }
  } catch (error) {
    console.error('Error updating employee status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
