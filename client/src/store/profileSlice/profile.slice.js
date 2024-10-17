import { createSlice } from "@reduxjs/toolkit";
import { fetchEmployeeInfo, updateEmployeeInfo } from "./profile.thunk";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        info: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEmployeeInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.info = action.payload;
            })
            .addCase(fetchEmployeeInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch data";
            })
            .addCase(updateEmployeeInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateEmployeeInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.info = action.payload;
            })
            .addCase(updateEmployeeInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch data";
            });
    },
    selectors: {},
});

// export const {} = profileSlice.actions;
// export const {} = profileSlice.selectors;

export default profileSlice.reducer;
