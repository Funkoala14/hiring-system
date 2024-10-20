import { createSlice } from "@reduxjs/toolkit";

const visaSlice = createSlice({
    name: "visa",
    initialState: {
        documentType: "",
        status: "not-submitted",
        feedback: "Test feedback"
    },
    reducers: {
        updateStatus: (state, action) => {
            state.status = action.payload
        },
        updateReview: (state, action) => {
            state.feedback = action.payload
        }
    }
});

export default visaSlice.reducer;
