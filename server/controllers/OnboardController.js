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
              filename: file.originalname,
              src: file.location,
              awsKey: file.key,
            });
            await newDocument.save();
            return newDocument._id;
          })
        )
      : [];

    // Handle optReceipt as an object with { src, name }
    const optReceipt = files.optReceipt
      ? await Promise.all(
          files.optReceipt.map(async (file) => {
            const newDocument = new Document({
              type: "OPT Receipt",
              filename: file.originalname,
              src: file.location,
              awsKey: file.key,
            });
            await newDocument.save();
            return newDocument._id;
          })
        )
      : [];


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
        comments: ""
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
        documents: [...visaDocuments,...optReceipt],  // Save the visaDocuments and optReceipt

      });

      await visaStatus.save();
    } else {
      await deleteFileFn(visaStatus.documents[0].awsKey);
      // Update existing visa status
      visaStatus.citizenship = citizenship;
      visaStatus.citizenshipType = citizenshipType;
      visaStatus.visaTitle = visaTitle;
      visaStatus.specificVisaTitle = specificVisaTitle;
      visaStatus.startDate = startDate;
      visaStatus.endDate = endDate;
      visaStatus.documents = visaDocuments.length ? [...visaDocuments,...optReceipt] : visaStatus.documents;

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


// Controller to get document by ID
export const getDocumentById = async (req, res) => {
  const { documentId } = req.params;

  try {
    // Find the document in the database by ID
    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Send back the document details (e.g., `src`, `name`, etc.)
    res.status(200).json({
      src: document.src, // Assuming `src` holds the URL or file path
      filename: document.filename, // name
      awsKey: document.awsKey, // key
    });
  } catch (error) {
    res.status(500).json({ message: "Server error: unable to fetch document" });
  }
};
