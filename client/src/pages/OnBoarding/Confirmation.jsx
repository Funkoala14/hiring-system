import React from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Link,
  Box
} from "@mui/material";
import { logoutThunk } from '../../store/auth/auth.thunk';

const Confirmation = () => {
  // Destructure formData from the Redux store (onboarding slice)
  const { formData } = useSelector((state) => state.onboarding);

  // Documents (driver's license, work authorization, etc.)
  const documents = [
    { name: "Driver’s License", url: formData.driverLicense.copy },
    { name: "Work Authorization", url: formData.documents[0] },
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
                <strong>First Name:</strong> {formData.firstName}
              </Typography>
              <Typography>
                <strong>Last Name:</strong> {formData.lastName}
              </Typography>
              <Typography>
                <strong>Date of Birth:</strong> {formData.dob}
              </Typography>
              <Typography>
                <strong>Gender:</strong> {formData.gender}
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
                <strong>Street:</strong> {formData.address.street}
              </Typography>
              <Typography>
                <strong>City:</strong> {formData.address.city}
              </Typography>
              <Typography>
                <strong>State:</strong> {formData.address.state}
              </Typography>
              <Typography>
                <strong>Zip Code:</strong> {formData.address.zipCode}
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
