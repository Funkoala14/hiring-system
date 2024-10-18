import { createSelector } from '@reduxjs/toolkit';

const selectAuthState = (state) => state.auth;

const selectIsLoggedIn = createSelector([selectAuthState], (auth) => ({
  isLoggedIn: auth.isLoggedIn,
  username: auth.username,
  id: auth.id,
  role: auth.role,
  error: auth.error,
  token: auth.token,

}));

const selectIsLoading = createSelector([selectAuthState], (auth) => ({
  isLoading: auth.isLoading,
  error: auth.error,
}));

export { selectIsLoggedIn, selectIsLoading };
