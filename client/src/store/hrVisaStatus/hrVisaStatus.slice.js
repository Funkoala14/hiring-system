import {
  fetchAllPendingStatuses,
  fetchAllStatuses,
  approveDocument,
  rejectDocument,
  postFeedback,
} from "./hrVisaStatus.thunk";
import { createSlice } from "@reduxjs/toolkit";
const hrVisaSlice = createSlice({
  name: "hrVisa",
  initialState: { pending: [], all: [], message: "" },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPendingStatuses.fulfilled, (state, action) => {
        state.pending = action.payload.data;
      })
      .addCase(fetchAllStatuses.fulfilled, (state, action) => {
        state.all = action.payload.data;
      })
      .addCase(approveDocument.fulfilled, (state, action) => {
        state.all = action.payload.all;
        state.pending = action.payload.pending;
        state.message = action.payload.message;
      })
      .addCase(rejectDocument.fulfilled, (state, action) => {
        state.pending = action.payload.pending;
        state.all = action.payload.all;
      })
      .addCase(postFeedback.fulfilled, (state, action) => {
        state.pending = action.payload.pending;
        state.all = action.payload.all;
        state.message = action.payload.message;
      });
  },
});

export default hrVisaSlice.reducer;
