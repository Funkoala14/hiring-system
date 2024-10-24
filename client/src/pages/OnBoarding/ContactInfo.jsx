import React from "react";
import { TextField, Grid, Typography } from "@mui/material";

const ContactInfo = ({ formData, handleChange }) => {
  // Function to handle changes specifically for emergency contacts
  const handleEmergencyContactChange = (index, field, value) => {
    const updatedContacts = [...formData.emergencyContacts];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    handleChange({
      target: { name: "emergencyContacts", value: updatedContacts },
    });
  };

  return (
    <>
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

      <Grid item xs={12} >
        <Typography variant="h6">Emergency Contacts</Typography>
      </Grid>

      {formData.emergencyContacts.map((contact, index) => (
        <Grid container spacing={3} key={index} sx={{ marginBottom: 2, marginTop: 2, paddingLeft: '1.5rem' }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="First Name"
              value={contact.firstName}
              onChange={(e) =>
                handleEmergencyContactChange(index, "firstName", e.target.value)
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Last Name"
              value={contact.lastName}
              onChange={(e) =>
                handleEmergencyContactChange(index, "lastName", e.target.value)
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Phone"
              value={contact.phone}
              onChange={(e) =>
                handleEmergencyContactChange(index, "phone", e.target.value)
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
                handleEmergencyContactChange(index, "email", e.target.value)
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
    </>
  );
};

export default ContactInfo;
