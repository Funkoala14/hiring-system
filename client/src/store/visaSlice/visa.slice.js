import { createSlice } from "@reduxjs/toolkit";
import { visaStatusInit, updateVisaStatus } from "./visa.thunk";

const visaSlice = createSlice({
    name: "visa",
    initialState: {
        type: "",
        status: "",
        feedback: "",
        file: null
    },
    reducers: {
        updateDocumentStatus: (state, action) => {
            state.status = action.payload
        },
        updateDocumentReview: (state, action) => {
            state.feedback = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(visaStatusInit.fulfilled, (state, action) => {
                const { type, status, feedback, file } = action.payload;

                state.type = type
                state.status = status
                state.feedback = feedback
                state.file = file
            })
            .addCase(updateVisaStatus.fulfilled, (state, action) => {
                const { type, status, feedback, file } = action.payload;

                state.type = type
                state.status = status
                state.feedback = feedback
                state.file = file
            })
    }
});

export const { updateStatus, updateReview } = visaSlice.actions;
export default visaSlice.reducer;
