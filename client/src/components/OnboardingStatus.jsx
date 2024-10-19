import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeInfo } from '../store/profileSlice/profile.thunk';
import { CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const OnboardingStatus = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, info, error } = useSelector((state) => state.profile);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('username');  // Extract username from the query params
  
    // Use the username to fetch data or display it
    console.log('Username:', username);

    useEffect(() => {
        // Fetch employee info when the component mounts
        const formData = { username };
        dispatch(fetchEmployeeInfo(formData));
    }, [dispatch, username]);

    useEffect(() => {
        // Redirect based on onboarding status once data is available
        if (info.onboardingStatus) {
            console.log('info',info);
            console.log('info.onboardingStatus',info.onboardingStatus);
            
            const { status } = info.onboardingStatus;
            // if (status === 'Not Started' || status === 'Pending') {
            if (status === 'Not Started' || status === 'Pending') {
                navigate('/employee/my-profile');
            } else if (status === 'Approved') {
                navigate('/employee/on-boarding');
            }
        }
    }, [info, navigate]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        info && (
            <div>
                <Typography variant="h5">Welcome, {info.firstName} {info.lastName}</Typography>
                <Typography variant="body2">Housing Assignment: {info.housingAssignment ? `${info.housingAssignment.address.building}, ${info.housingAssignment.address.street}` : 'No housing assigned'}</Typography>
                <Typography variant="body2">Onboarding Status: {info.onboardingStatus ? info.onboardingStatus.status : 'Unknown'}</Typography>
            </div>
        )
    );
};

export default OnboardingStatus;
