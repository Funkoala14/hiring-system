import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  loginThunk,
  signupThunk,
  verifyThunk,
  logoutThunk,
} from './auth.thunk';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  username: null,
  id: null,
  role: null,
  token: null,
  error: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: (state) => {
      // reset auth states
      state.isLoading = false;
      state.isLoggedIn = false;
      state.username = null;
      state.id = null;
      state.role = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.username = null;
      state.id = null;
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
        verifyThunk.fulfilled,
        loginThunk.fulfilled,
        signupThunk.fulfilled,
      ),
      (state, action) => {
        const { payload } = action
        state.isLoading = false;
        state.isLoggedIn = true;
        state.username = payload?.username;
        state.id = payload?.id;
        state.role = payload?.role;
        state.token = payload?.token;

        console.log('payload: ', payload);
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

export const { resetAuth } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
