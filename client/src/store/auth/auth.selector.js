import { createSelector } from '@reduxjs/toolkit';

const selectAuthState = (state) => state.auth;

export const selectIsLoggedIn = createSelector([selectAuthState], (auth) => ({
  isLoggedIn: auth.isLoggedIn,
  username: auth.username,
  id: auth.id,
  role: auth.role,
  error: auth.error,
  token: auth.token,

}));

export const selectIsLoading = createSelector([selectAuthState], (auth) => ({
  isLoading: auth.isLoading,
  error: auth.error,
}));

