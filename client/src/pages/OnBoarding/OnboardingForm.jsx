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

  const { formData, status, error, message } = useSelector(
    (state) => state.onboarding
  );
  const { info } = useSelector((state) => state.profile);
  let userStatus = info?.onboardingStatus
    ? info?.onboardingStatus.status
    : "Unknown";

  let comments = info?.onboardingStatus
  ? info?.onboardingStatus.comments
  : "Your application was rejected due to missing documents";

  // Effect to set initial form data if the application was rejected
  useEffect(() => {
    if (userStatus === "Rejected" && info) {
      dispatch(setInitialFormData(info)); // Assuming info contains the necessary fields
    }
  }, [userStatus, info, dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "driverLicense.hasLicense" && value === "no") {
      dispatch(
        updateFormField({
          driverLicense: {
            hasLicense: "no",
            number: "",
            expirationDate: "",
            driverLicenseFile: null,
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
      dispatch(updateFormField({ [name]: files[0] }));
    } else if (name.includes(".")) {
      const [key, subkey] = name.split(".");
      dispatch(
        updateFormField({ [key]: { ...formData[key], [subkey]: value } })
      );
    } else {
      dispatch(updateFormField({ [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalFormData = { ...formData };

    if (formData.specificVisaTitle) {
      finalFormData.visaTitle = formData.specificVisaTitle;
    }

    finalFormData.visaStatus = {
      ...finalFormData.visaStatus,
      visaDocuments: Array.isArray(formData.visaStatus.visaDocuments)
        ? [...formData.visaStatus.visaDocuments]
        : [],
    };

    finalFormData.emergencyContacts = Array.isArray(formData.emergencyContacts)
      ? [...formData.emergencyContacts]
      : [];

    dispatch(submitOnboarding(finalFormData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("pending");
      }
    });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: "#f9f9f9",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <Box mt={5}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            marginBottom: "1.5rem",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Onboarding Application
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Display comments if application is rejected */}
            {userStatus === "Rejected" && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Alert
                    severity="warning"
                    sx={{ fontSize: "1.75rem", textAlign: "center" }}
                  >
                    Your application was Rejected
                  </Alert>

                  {/* Display comments alert only if comments exists */}
                  {comments && (
                    <Alert
                      severity="warning"
                      sx={{ fontSize: "1.25rem", textAlign: "center" }}
                    >
                      {comments}
                    </Alert>
                  )}

                  <Alert
                    severity="warning"
                    sx={{ fontSize: "1rem", textAlign: "center" }}
                  >
                    Please resubmit with updated information.
                  </Alert>
                </Box>
              </Grid>
            )}
            <PersonalInfo
              formData={formData}
              handleChange={handleChange}
              info={info}
            />

            <ContactInfo formData={formData} handleChange={handleChange} />

            <WorkAuthorization
              formData={formData}
              handleChange={handleChange}
            />

            <DriverLicense formData={formData} handleChange={handleChange} />

            <CarInfo formData={formData} handleChange={handleChange} />

            <ReferenceInfo formData={formData} handleChange={handleChange} />

            {/* Submit button */}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center", mt: 3 }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={status === "loading"}
                sx={{ padding: "0.75rem 2rem", fontSize: "1rem" }}
              >
                {status === "loading" ? "Submitting..." : "Submit"}
              </Button>
            </Grid>

            {/* Display a loader when the form is being submitted */}
            {status === "loading" && (
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center", mt: 2 }}
              >
                <CircularProgress />
              </Grid>
            )}

            {/* Display error if form submission fails */}
            {status === "failed" && error && (
              <Grid item xs={12}>
                <Alert severity="error">
                  {error.message || "Submission failed. Check your input"}
                </Alert>
              </Grid>
            )}

            {status === "pending" && <p>Submitting your application...</p>}
            {status === "succeeded" && (
              <p style={{ color: "green" }}>{message}</p>
            )}
            {status === "failed" && <p style={{ color: "red" }}>{error.message}</p>}
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default OnboardingForm;
