import User from "../models/User.js";
import Employee from "../models/Employee.js";
import OnboardingStatus from "../models/OnboardingStatus.js";
import VisaStatus from "../models/VisaStatus.js";
import Document from "../models/Document.js";
import { deleteFileFn } from "./S3BucketController.js";

//import { uploadFile } from '../services/fileUploadService';  // A utility for file uploads

// Submit onboarding form and update Employee
export const submitOnboarding = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is in the request from authentication middleware
    const {
      firstName,
      lastName,
      middleName,
      preferredName,
      dob,
      gender,
      cellPhone,
      workPhone,
      address,
      ssn,
      driverLicense,
      reference,
      emergencyContacts,
      carInfo,
    } = req.body;

    const files = req.files;

    // Log req.files for debugging
    console.log("Files received:", req.files);

    if (!files) {
      return res.status(400).json({ message: "No files uploaded", code: 400 });
    }

    // Handle profile image upload
    const profilePicture = files.profilePicture
      ? {
          src: files.profilePicture[0].location,
          name: files.profilePicture[0].key,
        }
      : null;

    // Handle driver license upload
    const driverLicenseFile = files.driverLicenseFile
      ? {
          copy: files.driverLicenseFile[0].location,
          copyName: files.driverLicenseFile[0].key,
        }
      : null;

    const visaDocuments = files.visaDocuments
      ? await Promise.all(
          files.visaDocuments.map(async (file) => {
            const newDocument = new Document({
              type: "visa",
              filename: file.key,
              src: file.location,
            });
            await newDocument.save();
            return newDocument._id;
          })
        )
      : [];

    // Handle optReceipt as an object with { src, name }
    const optReceipt = files.optReceipt
      ? {
          src: files.optReceipt[0].location,
          name: files.optReceipt[0].key,
        }
      : null;

      // Find or create VisaStatus for the user
    //let visaStatus = await VisaStatus.findOne({ employee: userId });
            // Fallback default values for visaStatus fields
    const visaStatusData = req.body.visaStatus || {};
    const citizenship = visaStatusData.citizenship || "no";
    const citizenshipType = visaStatusData.citizenshipType || "non-resident";
    const visaTitle = visaStatusData.visaTitle || "";
    const specificVisaTitle = visaStatusData.specificVisaTitle || "";
    const startDate = visaStatusData.startDate || null;
    const endDate = visaStatusData.endDate || null;

    let onboardingStatus = await OnboardingStatus.findOne({ employee: userId });

    if (!onboardingStatus) {
      // If the onboarding status doesn't exist, create a new one
      onboardingStatus = new OnboardingStatus({
        employee: userId,
        status: "Pending", // Set status to Pending after submission
      });
    } else {
      // If it exists, just update the status
      onboardingStatus.status = "Pending";
      onboardingStatus.updatedAt = Date.now(); // Update the timestamp
    }

    await onboardingStatus.save(); // Save the OnboardingStatus document

    // Find or create VisaStatus for the user
    let visaStatus = await VisaStatus.findOne({ employee: userId });

    if (!visaStatus) {
      // Create new visa status if it doesn't exist
      visaStatus = new VisaStatus({
        citizenship,
        citizenshipType,
        visaTitle,
        specificVisaTitle,
        startDate,
        endDate,
        documents: visaDocuments,  // Save the visaDocuments
        optReceipt: optReceipt,  // Save optReceipt if available
      });

      await visaStatus.save();
    } else {
      // Update existing visa status
      visaStatus.citizenship = citizenship;
      visaStatus.citizenshipType = citizenshipType;
      visaStatus.visaTitle = visaTitle;
      visaStatus.specificVisaTitle = specificVisaTitle;
      visaStatus.startDate = startDate;
      visaStatus.endDate = endDate;
      visaStatus.documents = visaDocuments.length ? visaDocuments : visaStatus.documents;
      visaStatus.optReceipt = optReceipt ? optReceipt : visaStatus.optReceipt;

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
          driverLicense: { ...driverLicense, ...driverLicenseFile },
          onboardingStatus: onboardingStatus._id,
          carInfo,
        },
      },
      { new: true, lean: true }
    )
      .select("-__v -password -__t")
      .populate("housingAssignment")
      .populate("onboardingStatus")
      .populate("visaStatus")
      .populate("driverLicense")
      .populate("visaStatus.documents")
      .lean()
      .exec();

    return res.status(200).json({
      message: "Onboarding information submitted successfully",
      data: { id: updatedUser._id, ...updatedUser },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller function to handle avatar update and profile data update
export const uploadProfilePic = async (req, res) => {
  try {
    const { id, username } = req.user; // Assume `req.user` is populated by auth middleware
    const file = req.profilePicture; // `multer` handles this, contains uploaded file info (if any)

    // Log the received files and body fields for debugging
    console.log("BE Files received:", file); // Should log 'profilePicture', 'driverLicenseFile', etc.
    console.log("BE Body received:", req.body);

    // Check if profilePicture is provided

    // Check if file is provided
    if (!file) {
      return res.status(400).send({
        message: "No file uploaded",
        code: 400,
      });
    }

    // Find the employee by username or id
    const employee = await Employee.findOne({ username }).lean().exec();
    if (!employee) {
      return res.status(401).json({ message: "Invalid user ID", code: 401 });
    }

    const oldImageName = employee.image?.name; // Store the old image file name (for deletion)

    // Update the user profile (including new image URL)
    const updatedEmployee = await Employee.findOneAndUpdate(
      { username },
      {
        image: { src: file.location, name: file.key }, // Update profile picture
        firstName: req.body.firstName, // Update firstName from the form data
        lastName: req.body.lastName, // Update lastName
        middleName: req.body.middleName, // Update lastName
        preferredName: req.body.preferredName, // Update email
        dob: req.body.dob, // Update email
        gender: req.body.gender,
        ssn: req.body.ssn,
      },
      { new: true, lean: true }
    )
      .select("-__v -password") // Exclude sensitive fields from response
      .lean()
      .exec();

    // If there's an old image, delete it (from cloud storage or disk)
    if (oldImageName) {
      await deleteFileFn(oldImageName);
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      data: updatedEmployee, // Return updated profile data
      code: 200,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", code: 500 });
  }
};
