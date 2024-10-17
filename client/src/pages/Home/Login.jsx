// Login.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { selectIsLoggedIn, selectIsLoading } from '../../store/auth/auth.selector';
import { loginThunk } from '../../store/auth/auth.thunk';

const Login = () => {

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
      });
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const { isLoggedIn, role, error, token } = useSelector(selectIsLoggedIn);
      const { isLoading } = useSelector(selectIsLoading);

          // Handle navigation after successful login
        useEffect(() => {
            if (isLoggedIn) {
                if (role === 'HR') {
                    navigate('/hr/dashboard');  // HR redirect
                } else {
                    navigate('/employee/personal-info');  // Employee redirect
                }
            }
        }, [isLoggedIn, role, navigate]); 

    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
          ...credentials,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginThunk(credentials));
        setCredentials({ username: '', password: '' });
      };


    return (
        <Container maxWidth="xs">
            <Box mt={8} display="flex" flexDirection="column" alignItems="center">
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Username"
                        name='username'
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Password"
                        name='password'
                        type="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        style={{ marginTop: '1rem' }}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                    </Button>
                    {error && (
                        <Typography color="error" style={{ marginTop: '1rem' }}>
                            {error?.message || 'An error occurred'}  {/* Display error message from backend */}
                        </Typography>
                    )}
                </form>
            </Box>
        </Container>
    );
};

export default Login;
