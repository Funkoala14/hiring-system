import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Grid,
  CircularProgress,
  Alert,
  Container,
  Box,
  Typography,
} from "@mui/material";
import {
  resetFeedback,
  setInitialFormData,
  submitOnboarding,
  updateFormField,
} from "../../store/onboardingSlice/onboarding.slice";
import PersonalInfo from "./PersonalInfo";
import ContactInfo from "./ContactInfo";
import WorkAuthorization from "./WorkAuthorization";
import DriverLicense from "./DriverLicense";
import ReferenceInfo from "./ReferenceInfo";
import CarInfo from "./CarInfo";
import { useNavigate } from "react-router-dom";

const OnboardingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { formData, status, error, feedback } = useSelector(
    (state) => state.onboarding
  );
  const { info } = useSelector((state) => state.profile);
  let userStatus = info?.onboardingStatus
    ? info?.onboardingStatus.status
    : "Unknown";
  console.log("userStatus", userStatus);

  // Effect to set initial form data if the application was rejected
  useEffect(() => {
    if (userStatus === "Rejected" && info) {
      console.log("Setting form data for rejected status", info);
      dispatch(setInitialFormData(info)); // Assuming info contains the necessary fields
    }
  }, [userStatus, info, dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // Handle clearing the driver license details if 'hasLicense' is set to 'no'
    if (name === "driverLicense.hasLicense" && value === "no") {
      dispatch(
        updateFormField({
          driverLicense: {
            hasLicense: "no", // Set hasLicense to "no"
            number: "", // Clear number
            expirationDate: "", // Clear expiration date
            driverLicenseFile: null, // Clear file input
          },
        })
      );
    } else if (name === "driverLicense.hasLicense" && value === "yes") {
      dispatch(
        updateFormField({
          driverLicense: {
            ...formData.driverLicense,
            hasLicense: "yes",
          },
        })
      );
    } else if (files) {
      // Handle file inputs
      dispatch(updateFormField({ [name]: files[0] }));
    } else if (name.includes(".")) {
      // Handle nested values (e.g., address.city or carInfo.make)
      const [key, subkey] = name.split(".");
      dispatch(
        updateFormField({ [key]: { ...formData[key], [subkey]: value } })
      );
    } else {
      // Handle normal text inputs
      dispatch(updateFormField({ [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a copy of the formData
    let finalFormData = { ...formData };

    // Check if specificVisaTitle exists and override visaTitle
    if (formData.specificVisaTitle) {
      finalFormData.visaTitle = formData.specificVisaTitle;
    }

    // Ensure that formData.visaStatus.visaDocuments is an array
    finalFormData.visaStatus = {
      ...finalFormData.visaStatus, // Spread the existing visaStatus object
      visaDocuments: Array.isArray(formData.visaStatus.visaDocuments)
        ? [...formData.visaStatus.visaDocuments] // Create a new array with the existing documents
        : [], // If not an array, default to an empty array
    };

    finalFormData.emergencyContacts = Array.isArray(formData.emergencyContacts)
      ? [...formData.emergencyContacts]
      : [];

    // Add optReceipt to visaDocuments if it exists
    if (formData.optReceipt) {
      finalFormData.visaStatus.visaDocuments.push(formData.optReceipt);
    }
    if (feedback) {
      // This could be where you handle additional logic before resubmission
      userStatus = "Pending"; // Reset status to Pending before submission
    }

    // Dispatch finalFormData to the backend
    dispatch(submitOnboarding(finalFormData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(resetFeedback());
        // Redirect to confirmation page after successful submission
        navigate("confirmation");
      }
    });
  };

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom sx={{ marginBottom: "1rem" }}>
          Onboarding Application
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Display feedback if application is rejected */}

            <PersonalInfo formData={formData} handleChange={handleChange} info={info}/>

            <ContactInfo formData={formData} handleChange={handleChange} />

            <WorkAuthorization
              formData={formData}
              handleChange={handleChange}
            />

            <DriverLicense formData={formData} handleChange={handleChange} />

            <CarInfo formData={formData} handleChange={handleChange} />

            <ReferenceInfo formData={formData} handleChange={handleChange} />

            {/* Submit button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Submitting..." : "Submit"}
              </Button>
            </Grid>

            {/* Display a loader when the form is being submitted */}
            {status === "loading" && (
              <Grid item xs={12}>
                <CircularProgress />
              </Grid>
            )}

            {/* Display error if form submission fails */}
            {status === "failed" && error && (
              <Grid item xs={12}>
                <Alert severity="error">
                  {error.message || "Submission failed"}
                </Alert>
              </Grid>
            )}
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default OnboardingForm;
