// pages/Dashboard.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Container, Button, Box } from '@mui/material';
import { logoutThunk } from '../../store/auth/auth.thunk';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../store/auth/auth.selector';

const Dashboard = () => {
    const { username } = useSelector(selectIsLoggedIn);

    const navigate = useNavigate();
    
    return (
        <Container>
            <img
                src='https://susieshi.s3.us-east-2.amazonaws.com/logo.svg'
                alt='logo'
                style={{ width: '20vw', height: '20vw', margin: '0 auto' }}
            />
            <Typography variant='h5' align='center'>
                Welcome, {username}
            </Typography>

            <Box mt={4} display='flex' justifyContent='space-around' gap={1}>
                <Button variant='contained' onClick={() => navigate('/hr/employee-management')}>
                    Employees
                </Button>
                <Button variant='contained' onClick={() => navigate('/hr/visa-status')}>
                    Visa Status
                </Button>
                <Button variant='contained' onClick={() => navigate('/hr/hiring-management')}>Hiring Management</Button>
                <Button variant='contained' onClick={() => navigate('/hr/housing-management')}>
                    Housing
                </Button>
            </Box>
        </Container>
    );
};

export default Dashboard;
