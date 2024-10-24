import React from "react";
import {
  TextField,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";

const DriverLicense = ({ formData, handleChange }) => {
  // Ensure driverLicenseDetails is always an object to avoid undefined errors
  const driverLicense = formData?.driverLicense || {};

  // Sync `hasLicense` with driverLicenseDetails.hasLicense, fallback to 'no' if undefined
  const hasLicense = driverLicense.hasLicense === "yes";
  console.log('driverLicenseDetails.hasLicense', driverLicense.hasLicense);
  console.log('driverLicenseDetails', driverLicense);
  console.log('formData', formData);
  

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Driver License Information</Typography>
      </Grid>

      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Do you have a driver's license?</FormLabel>
          <RadioGroup
            row
            name="driverLicense.hasLicense"
            value={driverLicense.hasLicense || "yes"} // Default to "no" if undefined
            onChange={handleChange}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
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
              name="driverLicense.number"
              value={driverLicense.number || ""} // Fallback to empty string if undefined
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Expiration Date"
              name="driverLicense.expirationDate"
              type="date"
              value={driverLicense.expirationDate || ""} // Fallback to empty string if undefined
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
              name="driverLicenseFile"
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
    </>
  );
};

export default DriverLicense;
