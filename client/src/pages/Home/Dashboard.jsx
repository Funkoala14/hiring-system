// pages/Dashboard.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Container, Button, Box } from '@mui/material';
import { logoutThunk } from '../../store/auth/auth.thunk';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();
    
    return (
        <Container>
            <Typography variant="h3" align="center" gutterBottom>
                HR Dashboard
            </Typography>
            <Typography variant="h5" align="center">
                Welcome
            </Typography>

            <Box mt={4} display="flex" justifyContent="space-around">
                <Button
                    variant="contained"
                    onClick={() => navigate('/hr/employee-management')}
                >
                    Employees
                </Button>
                <Button
                    variant="contained"
                    onClick={() => navigate('/hr/visa-status')}
                >
                    Visa Status
                </Button>
                <Button
                    variant="contained"
                    onClick={() => navigate('/hr/onboarding-review')}
                >
                    Hiring
                </Button>
                <Button
                    variant="contained"
                    onClick={() => navigate('/hr/housing-mangement')}
                >
                    Housing
                </Button>
            </Box>
        </Container>
    );
};

export default Dashboard;
