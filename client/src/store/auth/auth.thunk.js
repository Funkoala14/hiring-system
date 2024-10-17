import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../interceptors/auth.interceptor';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const loginThunk = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('http://localhost:5000/v1/api/user/login', credentials, {
      withCredentials: true,
    });

    // Use 'let' for decodedToken so it can be reassigned or modified
    let decodedToken;  

    try {
      decodedToken = jwtDecode(data.token);  // Decode the JWT token
    } catch (error) {
      console.error('Token decoding failed', error);
      throw new Error('Token decoding failed');
    }

    // Return both username, role, and token
    return {
      username: decodedToken.username,
      role: decodedToken.role,
      token: data.token  // Return the token from the response
    };
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Login failed');
  }
});

const signupThunk = createAsyncThunk(
  'auth/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('v1/api/user/signup', credentials);
      Cookies.set('token', data.token);
      return data.username;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Signup failed");
    }
  },
);

const verifyThunk = createAsyncThunk('auth/verify', async (_, { rejectWithValue }) => {
  try {
    // Get the token from cookies
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('No token found');
    }

    // Optionally, you could also verify the token with a server-side request
    const decodedToken = jwtDecode(token);  // Decode the JWT token

    // Return the decoded token data (username, role)
    return {
      username: decodedToken.username,
      role: decodedToken.role,
      token: token  // Return the token to store in Redux if needed
    };
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Token verification failed');
  }
});

// Async thunk for logging out
const logoutThunk = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    // Send the logout request to the server (this assumes your server clears any session-related info)
    await axios.get('/v1/api/user/logout', {
      withCredentials: true,  // Ensure cookies are included in the request
    });

    // Remove the token from cookies
    Cookies.remove('token');
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Logout failed');
  }
});

export { loginThunk, signupThunk, verifyThunk, logoutThunk };
