// pages/Dashboard.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Container, Button, Box } from '@mui/material';
import { logoutThunk } from '../../store/auth/auth.thunk';

const Dashboard = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutThunk());
    };

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
                    color="primary"
                    onClick={() => navigate('/manage-employees')}
                >
                    Manage Employees
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate('/manage-housing')}
                >
                    Manage Housing
                </Button>

                <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}  // Trigger the logout when clicked
                style={{ marginTop: '1rem' }}
            >
                Logout
            </Button>
            </Box>
        </Container>
    );
};

export default Dashboard;
