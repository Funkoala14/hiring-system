import { Box, Button, Typography, CircularProgress, Grid , Alert } from '@mui/material';
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
  const { feedback } = useSelector(
    (state) => state.onboarding
  );
  const username = useUsername();
  
  console.log('Username:', username);

  useEffect(() => {
      // Fetch employee info when the component mounts
      const formData = { username };
      console.log('fetchEmployeeInfo formData', formData);
      dispatch(fetchEmployeeInfo(formData));
  }, [dispatch, username]);

  useEffect(() => {
    const fetchInfo = async () => {
      // Fetch info here (e.g., from an API)
      const fetchedInfo = await getInfoFromAPI();
      dispatch(setInfo(fetchedInfo)); // Dispatch the action to store info in Redux
    };

    fetchInfo();
  }, [dispatch]);
  
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
    return <CircularProgress />; // Show loading spinner while fetching info or during redirection
  }

  if (error) {
    return <Typography color="error">{error}</Typography>; // Show error message if there's an error
  }

  return (
    <>
      <Box>
        {/* Logout Button at the top right */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        <Typography variant="h4">Onboarding Page</Typography>
        <Typography variant="h5">Welcome, {info?.username}</Typography>
        <Typography variant="body2">Onboarding Status: {info?.onboardingStatus ? info?.onboardingStatus.status : 'Unknown'}</Typography>
        { info?.onboardingStatus?.status === 'Rejected' && feedback &&  (
              <Grid item xs={12}>
                <Alert severity="warning">
                  <Typography variant="h6">Your feedback: {feedback}</Typography>
                  <Typography variant="h6">Please Resubmit Your Application</Typography>
                </Alert>
              </Grid>
            )}

        <Box>
          
          {/* Add your form fields and onboarding content */}
          <OnboardingForm></OnboardingForm>

        </Box>
      </Box>



    </>

  )
}

export default OnBoarding;