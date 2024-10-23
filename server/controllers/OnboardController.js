import User from "../models/User.js";
import Employee from "../models/Employee.js";
import OnboardingStatus from "../models/OnboardingStatus.js";
import VisaStatus from "../models/VisaStatus.js";

//import { uploadFile } from '../services/fileUploadService';  // A utility for file uploads

// Submit onboarding form and update Employee
export const submitOnboarding = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is in the request from authentication middleware
    const {
      firstName, lastName, middleName, preferredName, dob, gender,
      cellPhone, workPhone, address, ssn, 
      citizenshipType,
      visaTitle,
      visaStartDate,
      visaEndDate,
      driverLicense, 
      reference, 
      emergencyContacts,
      carInfo
    } = req.body;

    // Handle file uploads (profile picture, work authorization, driver license, etc.)
    const profilePicture = req.files?.profilePicture ? await uploadFile(req.files.profilePicture) : null;
    const visaDocuments = req.files?.visaDocuments ? await uploadFile(req.files.visaDocuments) : null;
    const driverLicenseCopy = req.files?.driverLicenseCopy ? await uploadFile(req.files.driverLicenseCopy) : null;
    
    let onboardingStatus = await OnboardingStatus.findOne({ employee: userId });

    if (!onboardingStatus) {
      // If the onboarding status doesn't exist, create a new one
      onboardingStatus = new OnboardingStatus({
        employee: userId,
        status: 'Pending', // Set status to Pending after submission
      });
    } else {
      // If it exists, just update the status
      onboardingStatus.status = 'Pending';
      onboardingStatus.updatedAt = Date.now(); // Update the timestamp
    }

    await onboardingStatus.save(); // Save the OnboardingStatus document

    // Find or create VisaStatus for the user
    let visaStatus = await VisaStatus.findOne({ employee: userId });
    if (!visaStatus) {
      // Create new visa status if it doesn't exist
      visaStatus = new VisaStatus({
        citizenshipType,
        visaTitle,
        startDate: visaStartDate,
        endDate: visaEndDate,
        documents: visaDocuments ? visaDocuments.map(doc => doc._id) : [], // Assuming visaDocuments is an array of document IDs
      });
      await visaStatus.save();
    } else {
      // Update existing visa status
      visaStatus.citizenshipType = citizenshipType;
      visaStatus.visaTitle = visaTitle;
      visaStatus.startDate = visaStartDate;
      visaStatus.endDate = visaEndDate;
      visaStatus.documents = visaDocuments ? visaDocuments.map(doc => doc._id) : visaStatus.documents;
      await visaStatus.save();
    }


    // Find the user and update their onboarding information
    const updatedUser = await Employee.findByIdAndUpdate(
      userId,
      {
        $set: {
          firstName,
          lastName,
          middleName,
          preferredName,
          address,
          cellPhone,
          workPhone,
          ssn,
          dob,
          gender,
          visaStatus: visaStatus._id, 
          reference,
          emergencyContacts,
          image: profilePicture,
          driverLicense: {
            ...driverLicense,
            copy: driverLicenseCopy,  // Set driver license copy
          },
          onboardingStatus: onboardingStatus._id,
          carInfo
        },
      },
      { new: true,
        lean: true,
       }
    ).select("-__v -password -__t")
    .populate("housingAssignment")
    .populate("onboardingStatus")
    .populate("visaStatus")
    .lean()
    .exec();

    return res.status(200).json({
      message: 'Onboarding information submitted successfully',
      data: {id: updatedUser._id, ...updatedUser},
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
