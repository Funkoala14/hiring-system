import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { signupThunk } from '../../store/auth/auth.thunk';
import { selectIsLoggedIn, selectIsLoading } from '../../store/auth/auth.selector';
import { post } from '../../services/api';

const RegistrationPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, role, error, token } = useSelector(selectIsLoggedIn);
  const { isLoading } = useSelector(selectIsLoading);

  const [email, setEmail] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const verifyToken = async () => {
      try {
        const response = await post('/user/verify-token', { token });
        const { email } = response;
        setEmail(email);
        setIsTokenValid(true);
      } catch (error) {
        console.error('Error validating token:', error);
      }
    };

    if (token) {
      verifyToken();
    }
  }, [location]);

  // Handle navigation after successful login
  useEffect(() => {
    if (isLoggedIn) {
      console.log('credentials.Username :', credentials.username);  // Debug log
      if (role === 'HR') {
        navigate('/hr/dashboard');  // HR redirect
      } else {
        navigate(`/employee/details?username=${credentials.username}`);  // Employee redirect
      }
      setCredentials({ username: '', password: '' });
    }
  }, [isLoggedIn, role, navigate, credentials.username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting Username:', credentials.username);
    const registrationResponse = await dispatch(signupThunk({ ...credentials, email }));

    if (registrationResponse && registrationResponse.type === 'auth/signup/fulfilled') {
      // after successful registration, activate the email
      await post('/user/activate-email', { email });
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {isTokenValid ? (
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              value={email}
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              name="password"
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
              style={{ marginTop: '1rem' }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
            </Button>
            {error && (
              <Typography color="error" style={{ marginTop: '1rem' }}>
                {error?.message || 'Please try again'}
              </Typography>
            )}
          </form>
        ) : (
          <Typography color="error" style={{ marginTop: '1rem' }}>
            Invalid or expired registration link. Please request a new one.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default RegistrationPage;
