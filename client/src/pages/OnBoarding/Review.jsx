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
  List,
  ListItem,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { logoutThunk } from "../../store/auth/auth.thunk";
import { useNavigate } from "react-router-dom";
import { fetchEmployeeInfo } from "../../store/profileSlice/profile.thunk";
import { formatDate } from "../../utils/publicUtils";
import { fetchDocumentById } from "../../store/onboardingSlice/onboarding.slice";

const Confirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.profile);
  const [documentSrcs, setDocumentSrcs] = useState([]); // Initialize state to hold multiple Work Authorization document URLs

  useEffect(() => {
    if (info?.visaStatus?.documents?.length > 0) {
      const documentIds = info.visaStatus.documents;
      Promise.all(
        documentIds.map((documentId) => {
          return dispatch(fetchDocumentById(documentId)).then((result) => result?.payload?.src);
        })
      ).then((fetchedSrcs) => {
        setDocumentSrcs(fetchedSrcs);
      }).catch((error) => {
        console.error("Error fetching documents", error);
      });
    }
  }, [dispatch, info?.visaStatus]);

  useEffect(() => {
    dispatch(fetchEmployeeInfo(info));
  }, [dispatch]);

  useEffect(() => {
    if (info && info.onboardingStatus) {
      const { status } = info.onboardingStatus;
      if (status !== "Pending") {
        navigate("/employee/on-boarding");
      }
    }
  }, [info, navigate]);

  const documents = [
    { name: "Profile Picture", url: info?.image?.src },
    { name: "Driver’s License", url: info?.driverLicense?.copy },
    ...documentSrcs.map((src, index) => ({
      name: `Work Authorization ${index + 1}`,
      url: src,
    })),
  ].filter(document => document.url);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <>
      {/* Logout Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3} sx={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Please wait for HR to review your application.
          </Typography>
        </Grid>

        {/* Personal Information Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "#f9f9f9" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Personal Information</Typography>
              <Typography><strong>Email:</strong> {info.email}</Typography>
              <Typography><strong>First Name:</strong> {info.firstName}</Typography>
              <Typography><strong>Last Name:</strong> {info.lastName}</Typography>
              <Typography><strong>Preferred Name:</strong> {info.preferredName}</Typography>
              <Typography><strong>Date of Birth:</strong> {formatDate(info.dob)}</Typography>
              <Typography><strong>Gender:</strong> {info.gender}</Typography>
              <Typography><strong>SSN:</strong> {info.ssn}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Address Information Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "#f9f9f9" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Address</Typography>
              <Typography><strong>Building/Apt Number:</strong> {info.address.buildingOrAptNumber}</Typography>
              <Typography><strong>Street:</strong> {info.address.street}</Typography>
              <Typography><strong>City:</strong> {info.address.city}</Typography>
              <Typography><strong>State:</strong> {info.address.state}</Typography>
              <Typography><strong>Zip Code:</strong> {info.address.zipCode}</Typography>
              <Typography><strong>Cell Phone:</strong> {info.cellPhone}</Typography>
              <Typography><strong>Work Phone:</strong> {info.workPhone}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Emergency Contacts Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "#f9f9f9" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Emergency Contacts</Typography>
              <Typography><strong>First Name:</strong> {info.emergencyContacts[0]?.firstName}</Typography>
              <Typography><strong>Last Name:</strong> {info.emergencyContacts[0]?.lastName}</Typography>
              <Typography><strong>Phone:</strong> {info.emergencyContacts[0]?.phone}</Typography>
              <Typography><strong>Email:</strong> {info.emergencyContacts[0]?.email}</Typography>
              <Typography><strong>Relationship:</strong> {info.emergencyContacts[0]?.relationship}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Work Authorization Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "#f9f9f9" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Work Authorization</Typography>
              {info.visaStatus?.citizenshipType === "non-resident" && (
                <>
                  <Typography><strong>Citizenship Type:</strong> {info.visaStatus.citizenshipType}</Typography>
                  <Typography><strong>Visa Title:</strong> {info.visaStatus.visaTitle}</Typography>
                  {info.visaStatus.visaTitle === "Other" && (
                    <Typography><strong>Specific Visa Title:</strong> {info.visaStatus.specificVisaTitle}</Typography>
                  )}
                  <Typography><strong>Start Date:</strong> {formatDate(info.visaStatus.startDate)}</Typography>
                  <Typography><strong>End Date:</strong> {formatDate(info.visaStatus.endDate)}</Typography>
                </>
              )}
              {(info.visaStatus?.citizenshipType === "citizen" || info.visaStatus?.citizenshipType === "green card") && (
                <Typography><strong>Citizenship Type:</strong> {info.visaStatus?.citizenshipType}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Driver License Information Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "#f9f9f9" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Driver License Information</Typography>
              {info.driverLicense?.number ? (
                <>
                  <Typography><strong>Driver License Number:</strong> {info.driverLicense.number}</Typography>
                  <Typography><strong>Expiration Date:</strong> {formatDate(info.driverLicense.expirationDate)}</Typography>
                </>
              ) : (
                <Typography>No driver’s license information provided.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

{/* Car Information */}
<Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "#f9f9f9" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Car Information
              </Typography>
              <Typography>
                <strong>Make:</strong> {info.carInfo?.make || 'N/A'}
              </Typography>
              <Typography>
                <strong>Model:</strong> {info.carInfo?.model || 'N/A'}
              </Typography>
              <Typography>
                <strong>Color:</strong> {info.carInfo?.color || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Reference Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "#f9f9f9" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Reference Information
              </Typography>
              <Typography>
                <strong>First Name:</strong> {info.reference?.firstName || 'N/A'}
              </Typography>
              <Typography>
                <strong>Last Name:</strong> {info.reference?.lastName || 'N/A'}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {info.reference?.phone || 'N/A'}
              </Typography>
              <Typography>
                <strong>Email:</strong> {info.reference?.email || 'N/A'}
              </Typography>
              <Typography>
                <strong>Relationship:</strong>{" "}
                {info.reference?.relationship || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Documents Section */}
        <Grid item xs={12}>
          <Card sx={{ bgcolor: "#f9f9f9" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Uploaded Documents</Typography>
              <List sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {documents.length > 0 ? (
                  documents.map((doc) => (
                    <ListItem
                      key={doc.name}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.5rem 1rem",
                        bgcolor: "#e0e0e0",
                        borderRadius: "4px",
                        cursor: doc.url ? "pointer" : "not-allowed",
                      }}
                      onClick={() => doc.url && window.open(doc.url, "_blank")}
                    >
                      <AttachFileIcon sx={{ mr: 1 }} />
                      <Typography>{doc.name}</Typography>
                    </ListItem>
                  ))
                ) : (
                  <Typography>No documents available.</Typography>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Confirmation;
