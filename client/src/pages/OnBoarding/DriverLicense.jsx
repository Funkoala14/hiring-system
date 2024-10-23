import React, { useState } from "react";
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
  const [hasLicense, setHasLicense] = useState(false); // State to track if the user has a driver's license

  const handleLicenseChange = (event) => {
    const value = event.target.value === "yes";
    setHasLicense(value);
  };

  return (
    <>
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
              value={formData.driverLicense.number}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Expiration Date"
              name="driverLicense.expirationDate"
              type="date"
              value={formData.driverLicense.expirationDate}
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
              name="driverLicense.copy"
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
