import React from "react";
import {
  TextField,
  Grid,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { formatDate, formatDateForInput } from "../../utils/publicUtils";

const PersonalInfo = ({ formData, handleChange, info }) => {
  return (
    <>
      <Grid xs={12} sx={{ padding: "24px" }}>
        <Typography variant="h6">Personal Information</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Email"
          name="email"
          value={info.email || null}
          disabled
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          required
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
          value={formatDateForInput(formData.dob)}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          required
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
          <MenuItem value="other">I do not wish to answer</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="SSN"
          name="ssn"
          value={formData.ssn}
          onChange={handleChange}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Profile Picture"
          name="profilePicture"
          type="file"
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </>
  );
};

export default PersonalInfo;
