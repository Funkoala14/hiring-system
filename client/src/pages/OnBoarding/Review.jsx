import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Link,
  Box,
} from "@mui/material";
import { logoutThunk } from "../../store/auth/auth.thunk";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const { loading, info, error } = useSelector((state) => state.profile);

  useEffect(() => {
    // Redirect based on onboarding status once data is available
    if (info && info.onboardingStatus) {
        const { status } = info.onboardingStatus;
        console.log('info', info);
        console.log('status', status);

        if (status !== 'Pending') {
          setIsRedirecting(true);
          navigate('/employee/on-boarding');  
        }
      }
  }, [info, navigate]);

  // Destructure formData from the onboarding slice and info from the profile slice
  const { formData } = useSelector((state) => state.onboarding);

  console.log("Confirmation info", info);
  console.log("Confirmation info firstName", info.firstName);
  console.log("Confirmation formData", formData);

  // Use formData if available, otherwise fall back to info
  let dataToDisplay = info;

  console.log("dataToDisplay", dataToDisplay);

  // Documents (driver's license, work authorization, etc.)
  const documents = [
    { name: "Profile Picture", url: dataToDisplay?.profilePicture },
    { name: "Driver’s License", url: dataToDisplay?.driverLicense },
    {
      name: "Work Authorization",
      url:
        dataToDisplay?.documents?.length > 0
          ? dataToDisplay.documents[0]
          : null, // Safely access the first document
    },
    // other documents
  ];

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <>
      {/* Logout Button at the top right */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Please wait for HR to review your application.
          </Typography>
        </Grid>

        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Personal Information</Typography>
              <Typography>
                <strong>First Name:</strong> {dataToDisplay.firstName}
              </Typography>
              <Typography>
                <strong>Last Name:</strong> {dataToDisplay.lastName}
              </Typography>
              <Typography>
                <strong>Preferred Name:</strong> {dataToDisplay.preferredName}
              </Typography>
              <Typography>
                <strong>Date of Birth:</strong> {dataToDisplay.dob}
              </Typography>
              <Typography>
                <strong>Gender:</strong> {dataToDisplay.gender}
              </Typography>
              <Typography>
                <strong>SSN:</strong> {dataToDisplay.ssn}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Address Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Address</Typography>
              <Typography>
                <strong>Building/Apt Number:</strong>{" "}
                {dataToDisplay.address.buildingOrAptNumber}
              </Typography>
              <Typography>
                <strong>Street:</strong> {dataToDisplay.address.street}
              </Typography>
              <Typography>
                <strong>City:</strong> {dataToDisplay.address.city}
              </Typography>
              <Typography>
                <strong>State:</strong> {dataToDisplay.address.state}
              </Typography>
              <Typography>
                <strong>Zip Code:</strong> {dataToDisplay.address.zipCode}
              </Typography>
              <Typography>
                <strong>Cell Phone:</strong> {dataToDisplay.cellPhone}
              </Typography>
              <Typography>
                <strong>Work Phone:</strong> {dataToDisplay.workPhone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Emergency Contacts */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Emergency Contacts</Typography>
              <Typography>
                <strong>First Name:</strong>{" "}
                {dataToDisplay.emergencyContacts[0]?.firstName}
              </Typography>
              <Typography>
                <strong>Last Name:</strong>{" "}
                {dataToDisplay.emergencyContacts[0]?.lastName}
              </Typography>
              <Typography>
                <strong>Phone:</strong>{" "}
                {dataToDisplay.emergencyContacts[0]?.phone}
              </Typography>
              <Typography>
                <strong>Email:</strong>{" "}
                {dataToDisplay.emergencyContacts[0]?.email}
              </Typography>
              <Typography>
                <strong>Relationship:</strong>{" "}
                {dataToDisplay.emergencyContacts[0]?.relationship}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Work Authorization */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Work Authorization</Typography>
              {dataToDisplay?.visaStatus?.citizenshipType === "non-resident" && (
                <>
                  <Typography>
                    <strong>Citizenship Type:</strong> {dataToDisplay.visaStatus.citizenshipType}
                  </Typography>
                  <Typography>
                    <strong>Visa Title:</strong> {dataToDisplay.visaStatus.visaTitle}
                  </Typography>
                  <Typography>
                    <strong>Start Date:</strong> {new Date(dataToDisplay.visaStatus.startDate).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    <strong>End Date:</strong> {new Date(dataToDisplay.visaStatus.endDate).toLocaleDateString()}
                  </Typography>
                </>
              )}
              {(dataToDisplay?.visaStatus?.citizenshipType === "citizen" ||
                dataToDisplay?.visaStatus?.citizenshipType === "green card") && (
                <Typography>
                  <strong>Citizenship Type:</strong> {dataToDisplay.visaStatus.citizenshipType}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Driver License Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Driver License Information</Typography>
              {dataToDisplay.driverLicense?.number ? (
                <>
                  <Typography>
                    <strong>Yes</strong>
                  </Typography>
                  <Typography>
                    <strong>Driver License Number:</strong>{" "}
                    {dataToDisplay.driverLicense.number}
                  </Typography>
                  <Typography>
                    <strong>Expiration Date:</strong>{" "}
                    {dataToDisplay.driverLicense.expirationDate}
                  </Typography>
                </>
              ) : (
                <Typography>
                  <strong>No</strong>
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Car Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Car Information</Typography>
              <Typography>
                <strong>Make:</strong> {dataToDisplay.carInfo?.make}
              </Typography>
              <Typography>
                <strong>Model:</strong> {dataToDisplay.carInfo?.model}
              </Typography>
              <Typography>
                <strong>Color:</strong> {dataToDisplay.carInfo?.color}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Reference Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Reference Information</Typography>
              <Typography>
                <strong>First Name:</strong> {dataToDisplay.reference.firstName}
              </Typography>
              <Typography>
                <strong>Last Name:</strong> {dataToDisplay.reference.lastName}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {dataToDisplay.reference.phone}
              </Typography>
              <Typography>
                <strong>Email:</strong> {dataToDisplay.reference.email}
              </Typography>
              <Typography>
                <strong>Relationship:</strong>{" "}
                {dataToDisplay.reference.relationship}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Documents Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Uploaded Documents</Typography>
              {documents.map((doc, index) => (
                <div key={index}>
                  <Typography>{doc.name}</Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => window.open(doc.url, "_blank")}
                    style={{ marginRight: "10px" }}
                  >
                    Preview
                  </Button>
                  <Link href={doc.url} download>
                    <Button variant="outlined" color="secondary">
                      Download
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Confirmation;
