import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  loginThunk,
  signupThunk,
  verifyThunk,
  logoutThunk,
} from './auth.thunk';
import Cookies from 'js-cookie';

let token = Cookies.get('token');
console.log('token1',token);

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  username: null,
  role: null, 
  token: null,
  error: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.username = null;
      state.role = null;
      state.token = null;
      state.error = null;
    });
    builder.addMatcher(
      isAnyOf(
        loginThunk.pending,
        signupThunk.pending,
        verifyThunk.pending,
        logoutThunk.pending,
      ),
      (state) => {
        state.isLoading = true;
        state.error = null;
      },
    );
    builder.addMatcher(
      isAnyOf(
        loginThunk.fulfilled,
        signupThunk.fulfilled,
        verifyThunk.fulfilled,
      ),
      (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.username = action.payload?.username;
        state.role = action.payload?.role;
        state.token = action.payload?.token;  
         // Store the token in cookies
         Cookies.set('token', state.token);

        console.log('role',action.payload.role);
        console.log('username',action.payload.username);
        console.log('token',action.payload.token);
        console.log('action.payload;',action.payload);

      },
    );
    builder.addMatcher(
      isAnyOf(loginThunk.rejected, signupThunk.rejected, verifyThunk.rejected),
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
        state.username = null;
        state.role = null; 
        state.token = null; 
      },
    );
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
