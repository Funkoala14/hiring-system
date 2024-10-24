import { createSlice } from "@reduxjs/toolkit";
import { visaStatusInit, updateVisaStatus } from "./visa.thunk";

const visaSlice = createSlice({
  name: "visa",
  initialState: {
    type: "",
    status: "",
    feedback: "",
    src: "",
    filename: "",
    previewUrl: "",
  },
  reducers: {
    updateDocumentStatus: (state, action) => {
      state.status = action.payload;
    },
    updateDocumentReview: (state, action) => {
      state.feedback = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(visaStatusInit.fulfilled, (state, action) => {
        const { type, status, feedback, src, filename, previewUrl } =
          action.payload;

        state.type = type;
        state.status = status;
        state.feedback = feedback;
        state.src = src;
        state.filename = filename;
        state.previewUrl = previewUrl;
      })
      .addCase(updateVisaStatus.fulfilled, (state, action) => {
        const { type, status, feedback, src, filename, previewUrl } =
          action.payload;

        state.type = type;
        state.status = status;
        state.feedback = feedback;
        state.src = src;
        state.filename = filename;
        state.previewUrl = previewUrl;
      });
  },
});

export const { updateStatus, updateReview } = visaSlice.actions;
export default visaSlice.reducer;
