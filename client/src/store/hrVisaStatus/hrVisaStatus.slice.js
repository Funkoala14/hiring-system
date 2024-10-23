import { fetchAllPendingStatuses } from "./hrVisaStatus.thunk";
import { createSlice } from "@reduxjs/toolkit";
const hrVisaSlice = createSlice({
  name: "hrVisa",
  initialState: { pending: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPendingStatuses.fulfilled, (state, action) => {
      state.pending = action.payload;
    });
  },
});

export default hrVisaSlice.reducer;
