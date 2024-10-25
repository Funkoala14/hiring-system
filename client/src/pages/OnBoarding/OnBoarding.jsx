import { Box, Button, Typography, CircularProgress, Grid, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeInfo } from '../../store/profileSlice/profile.thunk';
import useUsername from '../../hooks/useUsername';
import { logoutThunk } from '../../store/auth/auth.thunk';
import { useNavigate } from 'react-router-dom';
import OnboardingForm from './OnboardingForm';

const OnBoarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isRedirecting, setIsRedirecting] = useState(false); // State to handle redirect loading
  const { loading, info, error } = useSelector((state) => state.profile);
  const { feedback } = useSelector((state) => state.onboarding);
  const username = useUsername();
  
  useEffect(() => {
      // Fetch employee info when the component mounts
      const formData = { username };
      dispatch(fetchEmployeeInfo(formData));
  }, [dispatch, username]);

  useEffect(() => {
    // Redirect based on onboarding status once data is available
    if (info && info.onboardingStatus) {
        const { status } = info.onboardingStatus;

        // Check onboarding status and navigate accordingly
        if (status === 'Approved') {
          setIsRedirecting(true); // Set redirecting state to true
          setTimeout(() => {
            navigate('/employee/my-profile');  // Navigate to my-profile when approved
          }, 500); // Add a slight delay for user experience, you can adjust or remove
        }
        if (status === 'Pending') {
          setIsRedirecting(true); // Set redirecting state to true
          setTimeout(() => {
            navigate('/employee/on-boarding/pending');  // Navigate to my-profile when approved
          }, 500); // Add a slight delay for user experience, you can adjust or remove
        }
      }
  }, [info, navigate]);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  if (loading || isRedirecting) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    ); // Show loading spinner while fetching info or during redirection
  }

  if (error) {
    return (
      <Typography sx={{ color: 'error.main', textAlign: 'center', mt: 4 }}>
        {error}
      </Typography>
    ); // Show error message if there's an error
  }

  return (
    <>
      <Box sx={{ maxWidth: '800px', margin: '0 auto', p: 3 }}>
        {/* Logout Button at the top right */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        {/* Onboarding Page Title */}
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
          Onboarding Page
        </Typography>

        {/* Welcome Message */}
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
          Welcome, {info?.username}
        </Typography>

        {/* Onboarding Status */}
        <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
          Onboarding Status: {info?.onboardingStatus ? info?.onboardingStatus.status : 'Unknown'}
        </Typography>

        {/* Onboarding Form */}
        <Box sx={{ mt: 3 }}>
          <OnboardingForm />
        </Box>
      </Box>
    </>
  );
};

export default OnBoarding;
