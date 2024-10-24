import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Grid,
  CircularProgress,
  Alert,
  Container,
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  submitOnboarding,
  updateFormField,
  uploadEmployeeProfile,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataObj = new FormData();

 
    // Dispatch the formData with both files and body fields
    dispatch(uploadEmployeeProfile({ body: bodyData, files: fileData })).then(
      (result) => {
        if (result.meta.requestStatus === "fulfilled") {
          // Redirect to confirmation page after successful submission
          navigate("/employee/on-boarding/confirmation");
        }
      }
    );
  };

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom sx={{ marginBottom: "1rem" }}>
          Onboarding Application
        </Typography>

        <form onSubmit={handleSubmit}>
          <PersonalInfo formData={formData} />
          {/* <ContactInfo formData={formData} />
          <WorkAuthorization formData={formData} />
          <DriverLicense formData={formData} />
          <ReferenceInfo formData={formData} />
          <CarInfo formData={formData} /> */}

          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={status === "loading"}
            >
              Submit
            </Button>
          </Box>
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
        </form>
      </Box>
    </Container>
  );
};

export default OnboardingForm;
