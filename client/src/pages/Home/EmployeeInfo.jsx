// pages/EmployeeInfo.js

import React from 'react';
import { Typography, Container, Button} from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutThunk } from '../../store/auth/auth.thunk';

const EmployeeInfo = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutThunk());
    };

    return (
        <Container>

            <Typography variant="h4" gutterBottom>
                Personal Information
            </Typography>

                        {/* Logout Button */}
            <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}  // Trigger the logout when clicked
                style={{ marginTop: '1rem' }}
            >
                Logout
            </Button>

        </Container>
    );
};

export default EmployeeInfo;
