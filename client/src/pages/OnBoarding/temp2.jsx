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
  FormControl ,
  FormLabel ,
  RadioGroup ,
  FormControlLabel ,
  Radio 
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
  
  //visaTitle
  const isNonResident = formData.citizenship === "no";
  const isF1Visa = formData.visaTitle === "F1 (CPT/OPT)";
  const isOtherVisa = formData.visaTitle === "Other";

  //hasLicense
  const [hasLicense, setHasLicense] = useState(false); // State to track if the user has a driver's license

  const handleLicenseChange = (event) => {
    const value = event.target.value === "yes";
    setHasLicense(value);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // Handle file inputs: storing the file based on its field
      const fileArray = Array.from(files);
      if (name === "documents") {
        // If it's the documents field, we handle multiple files as an array
        dispatch(updateFormField({ [name]: fileArray }));
      } else {
        // For single files (profilePicture, driverLicense)
        dispatch(updateFormField({ [name]: fileArray[0] }));
      }

    } else if (name.includes(".")) {
      // Handle nested values (e.g., address.city or carInfo.make)
      const [key, subkey] = name.split(".");
      dispatch(
        updateFormField({ [key]: { ...formData[key], [subkey]: value } })
      );
    } else if (name === "citizenship") {
      // When user selects citizenship status, set a valid citizenshipType
      const citizenshipType = value === "no" ? "non-resident" : "citizen";
      dispatch(
        updateFormField({
          citizenship: value,
          citizenshipType, // Automatically set citizenshipType based on selection
        })
      );
    } else {
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
    finalFormData.documents = Array.isArray(formData.documents)
      ? [...formData.documents]
      : [];
    finalFormData.emergencyContacts = Array.isArray(formData.emergencyContacts)
      ? [...formData.emergencyContacts]
      : [];

    // Add optReceipt to documents if it exists
    if (formData.optReceipt) {
      finalFormData.documents.push(formData.optReceipt);
    }

    // Dispatch finalFormData to the backend
    dispatch(submitOnboarding(finalFormData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        // Redirect to confirmation page after successful submission
        navigate("confirmation");
      }
    });
  };

  const WorkAuthorizationSection = () => {
    const dispatch = useDispatch();
  
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          await uploadDocument(file);
        } catch (error) {
          console.error('Error uploading document:', error);
        }
      }
    };
  
    const uploadDocument = async (file) => {
      const formData = new FormData();
      formData.append('visaDocuments', file);  // Visa document field
  
      dispatch(submitVisaDocuments(formData));  // Dispatch to Redux
    };
  
    return (
      <div>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
      </div>
    );
  };
  

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom sx={{ marginBottom: "1rem" }}>
          Onboarding Application
        </Typography>

        <WorkAuthorizationSection></WorkAuthorizationSection>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Personal Information */}
            <Grid xs={12} sx={{ padding: "24px" }}>
              <Typography variant="h6">Personal Information</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Middle Name"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Preferred Name"
                name="preferredName"
                value={formData.preferredName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">I do not wish to answer.</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="SSN"
                name="ssn"
                value={formData.ssn}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Profile Picture"
                name="img"
                type="file"
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12}>
              <Typography variant="h6">Contact Information</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Building/Apt Number"
                name="address.buildingOrAptNumber"
                value={formData.address.buildingOrAptNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Street"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Zip Code"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Cell Phone"
                name="cellPhone"
                value={formData.cellPhone}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Work Phone"
                name="workPhone"
                value={formData.workPhone}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            {/* Emergency Conctsta */}
            <Grid item xs={12}>
              <Typography variant="h6">Emergency Contacts</Typography>
            </Grid>

            {formData.emergencyContacts.map((contact, index) => (
              <Grid
                container
                spacing={3}
                key={index}
                sx={{ marginBottom: 2, marginTop: 2, paddingLeft: "1.5rem" }}
              >
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="First Name"
                    value={contact.firstName}
                    onChange={(e) =>
                      handleEmergencyContactChange(
                        index,
                        "firstName",
                        e.target.value
                      )
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Last Name"
                    value={contact.lastName}
                    onChange={(e) =>
                      handleEmergencyContactChange(
                        index,
                        "lastName",
                        e.target.value
                      )
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Phone"
                    value={contact.phone}
                    onChange={(e) =>
                      handleEmergencyContactChange(
                        index,
                        "phone",
                        e.target.value
                      )
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    type="email"
                    value={contact.email}
                    onChange={(e) =>
                      handleEmergencyContactChange(
                        index,
                        "email",
                        e.target.value
                      )
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Relationship"
                    value={contact.relationship}
                    onChange={(e) =>
                      handleEmergencyContactChange(
                        index,
                        "relationship",
                        e.target.value
                      )
                    }
                    fullWidth
                  />
                </Grid>
              </Grid>
            ))}

            {/* Work Authorization */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Work Authorization
              </Typography>
            </Grid>

            {/* Citizenship Question */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Are you a U.S citizen or permanent resident?"
                select
                name="citizenship"
                value={formData.citizenship}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </TextField>
            </Grid>

            {/* If "Yes" is selected */}
            {formData.citizenship === "yes" && (
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Select your status"
                  select
                  name="citizenshipType"
                  value={formData.citizenshipType}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="citizen">Citizen</MenuItem>
                  <MenuItem value="green card">Green Card</MenuItem>
                </TextField>
              </Grid>
            )}

            {/* If "No" is selected */}
            {isNonResident && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="What is your work authorization?"
                    select
                    name="visaTitle"
                    value={formData.visaTitle}
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value="H1-B">H1-B</MenuItem>
                    <MenuItem value="L2">L2</MenuItem>
                    <MenuItem value="F1 (CPT/OPT)">F1 (CPT/OPT)</MenuItem>
                    <MenuItem value="H4">H4</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>

                {/* If F1 (CPT/OPT) is selected */}
                {isF1Visa && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Upload OPT Receipt"
                      name="optReceipt"
                      type="file"
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                )}

                {/* If "Other" is selected */}
                {isOtherVisa && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Specify Visa Title"
                      name="specificVisaTitle"
                      value={formData.specificVisaTitle || ""}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                )}

                {/* Visa Start and End Date */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Visa Start Date"
                    name="visaStartDate"
                    type="date"
                    value={formData.visaStartDate}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Visa End Date"
                    name="visaEndDate"
                    type="date"
                    value={formData.visaEndDate}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                  />
                </Grid>

                {/* Visa Documents Upload */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Visa Documents"
                    name="documents"
                    type="file"
                    onChange={handleChange}
                    fullWidth
                    inputProps={{ multiple: true }}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Typography variant="h6">Driver License Information</Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Do you have a driver's license?
                </FormLabel>
                <RadioGroup
                  row
                  name="hasLicense"
                  value={hasLicense ? "yes" : "no"}
                  onChange={handleLicenseChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Only show the driver's license inputs if the user has a driver's license */}
            {hasLicense && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Driver License Number"
                    name="driverLicenseDetails.number"
                    value={formData.driverLicenseDetails.number}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Expiration Date"
                    name="driverLicenseDetails.expirationDate"
                    type="date"
                    value={formData.driverLicenseDetails.expirationDate}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Upload License Copy"
                    name="driverLicense"
                    type="file"
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </>
            )}

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
