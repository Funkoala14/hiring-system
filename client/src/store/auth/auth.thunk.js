import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../interceptors/auth.interceptor';
import {jwtDecode} from 'jwt-decode';
import { get, post } from '../../services/api.js'

const loginThunk = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data, message } = await post('/user/login', credentials);
    console.log('logindata: ', data);
    // Return both username, role, and token
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Login failed');
  }
});

const signupThunk = createAsyncThunk(
  'auth/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('Sending credentials:', credentials);
      // Sending a request to the backend to register the user
      const { data } = await post('/user/register', credentials);

    //       // Use 'let' for decodedToken so it can be reassigned or modified
    // let decodedToken;  

    // try {
    //   decodedToken = jwtDecode(data.token);  // Decode the JWT token
    // } catch (error) {
    //   console.error('Token decoding failed', error);
    //   throw new Error('Token decoding failed');
    // }

    // Return both username, role, and token
    return data;
    } catch (error) {
      // Catching the error and passing the appropriate message
      const errorMessage = error.response?.data || 'Signup failed. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

const verifyThunk = createAsyncThunk('auth/verify', async (_, { rejectWithValue }) => {
  try {
    
    const { data, message } = await get('/user/verify');
      
    if (!data) {
      throw new Error(message || 'No token found');
    }
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Token verification failed');
  }
});

// Async thunk for logging out
const logoutThunk = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    // Send the logout request to the server (this assumes your server clears any session-related info)
    await get('/user/logout');
    localStorage.removeItem('persist:root');
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Logout failed');
  }
});

export { loginThunk, signupThunk, verifyThunk, logoutThunk };
