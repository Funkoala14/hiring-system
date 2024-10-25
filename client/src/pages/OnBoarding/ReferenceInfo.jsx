import React from "react";
import { TextField, Grid, Typography, MenuItem } from "@mui/material";

const ReferenceInfo = ({ formData, handleChange }) => {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Reference Information</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Reference First Name"
          name="reference.firstName"
          value={formData.reference.firstName}
          onChange={handleChange}
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Reference Last Name"
          name="reference.lastName"
          value={formData.reference.lastName}
          onChange={handleChange}
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Reference Phone"
          name="reference.phone"
          value={formData.reference.phone}
          onChange={handleChange}
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Reference Email"
          name="reference.email"
          type="email"
          value={formData.reference.email}
          onChange={handleChange}
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Relationship"
          name="reference.relationship"
          value={formData.reference.relationship}
          onChange={handleChange}
          fullWidth
          required
          select
        >
          <MenuItem value="parent">Parent</MenuItem>
          <MenuItem value="sibling">Sibling</MenuItem>
          <MenuItem value="spouse">Spouse</MenuItem>
          <MenuItem value="child">Child</MenuItem>
          <MenuItem value="relative">Relative</MenuItem>
          <MenuItem value="friend">Friend</MenuItem>
          <MenuItem value="colleague">Colleague</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
      </Grid>
    </>
  );
};

export default ReferenceInfo;
