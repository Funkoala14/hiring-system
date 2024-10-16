import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config();
import Cookies from 'js-cookie';


// Async thunk for logging in
export const login = createAsyncThunk('auth/login', async (credentials, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${API_URL}/user/login`, credentials, {
            withCredentials: true
        });
    } catch (error) {
         return rejectWithValue(error.response.data);
    }
});

// Async thunk for logging out
export const logout = createAsyncThunk('auth/logout', async () => {
    await axios.post(`${API_URL}/user/logout`, {}, {
        withCredentials: true
    });
    Cookies.remove('jwt');
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        role: null,
        token: Cookies.get('jwt') || null,
        isLoggedIn: !!Cookies.get('jwt'),
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user,
                state.role = action.payload.user.role;
                state.token = action.payload.token;
                state.isLoggedIn = true;
                Cookies.set('jwt', action.payload.token);
            })
            .addCase(login.rejected,(state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.role = null;
                state.token = null;
                state.isLoggedIn = false;
            });
    }
});

export default authSlice.reducer;