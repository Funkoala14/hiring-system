import React from "react";
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

  const { formData, status, error } = useSelector((state) => state.onboarding);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // Handle file inputs
      dispatch(updateFormField({ [name]: files[0] }));
    } else if (name.includes(".")) {
      // Handle nested values (e.g., address.city or carInfo.make)
      const [key, subkey] = name.split(".");
      dispatch(
        updateFormField({ [key]: { ...formData[key], [subkey]: value } })
      );
    } else if (name === "citizenship") {
      // Handle citizenship changes and automatically adjust citizenshipType
      dispatch(
        updateFormField({
          citizenship: value,
          citizenshipType: value === "no" ? "non-resident" : "",
        })
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

      // Ensure that formData.documents is an array before adding optReceipt
    finalFormData.documents = Array.isArray(formData.documents) ? [...formData.documents] : [];
    finalFormData.emergencyContacts = Array.isArray(formData.emergencyContacts) ? [...formData.emergencyContacts] : [];

    // Add optReceipt to documents if it exists
    if (formData.optReceipt) {
      finalFormData.documents.push(formData.optReceipt);
    }
    finalFormData = new finalFormData()
    // Dispatch finalFormData to the backend
    dispatch(submitOnboarding(finalFormData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        // Redirect to confirmation page after successful submission
        navigate("confirmation");
      }
    });
  };

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom sx={{ marginBottom: '1rem' }}>
          Onboarding Application
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <PersonalInfo formData={formData} handleChange={handleChange} />
          
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
                <Alert severity="error">{error.message || "failed"}</Alert>
              </Grid>
            )}
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default OnboardingForm;
