import { createSelector } from "@reduxjs/toolkit";

export const selectHrVisaState = (state) => state.hrVisa;

export const selectPendingStatuses = createSelector(
  selectHrVisaState,
  ({ pending }) => pending
);
