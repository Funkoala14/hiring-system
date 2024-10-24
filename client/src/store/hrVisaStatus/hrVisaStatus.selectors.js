import { createSelector } from "@reduxjs/toolkit";

export const selectHrVisaState = (state) => state.hrVisa;

export const selectPendingStatuses = createSelector(
  selectHrVisaState,
  ({ pending }) => pending
);

export const selectAllStatuses = createSelector(
  selectHrVisaState,
  ({ all }) => all
);

export const selectMessage = createSelector(
  selectHrVisaState,
  ({ message }) => message
);
