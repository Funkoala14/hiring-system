import React from 'react';
import { TextField, Grid, Typography } from '@mui/material';

const CarInfo = ({ formData, handleChange }) => {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Car Information</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField 
          label="Make" 
          name="carInfo.make" 
          value={formData.carInfo.make} 
          onChange={handleChange} 
          fullWidth 
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField 
          label="Model" 
          name="carInfo.model" 
          value={formData.carInfo.model} 
          onChange={handleChange} 
          fullWidth 
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField 
          label="Color" 
          name="carInfo.color" 
          value={formData.carInfo.color} 
          onChange={handleChange} 
          fullWidth 
        />
      </Grid>
      </>
  );
};

export default CarInfo;
