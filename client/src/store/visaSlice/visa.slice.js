import { createSlice } from "@reduxjs/toolkit";
import { visaStatusInit, updateVisaStatus } from "./visa.thunk";

const visaSlice = createSlice({
    name: "visa",
    initialState: {
        documentType: "",
        status: "",
        feedback: "",
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
                const { type, status, hrFeedback } = action.payload[action.payload.length - 1]

                state.documentType = type
                state.status = status
                state.feedback = hrFeedback
            })
            .addCase(updateVisaStatus.fulfilled, (state, action) => {
                console.log(action.payload);
            })
    }
});

export const { updateStatus, updateReview } = visaSlice.actions;
export default visaSlice.reducer;
