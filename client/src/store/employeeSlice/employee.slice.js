import { createSlice } from "@reduxjs/toolkit";
import { fetchEmployeeList } from "./employee.thunk";

const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    selectors: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeList.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEmployeeList.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
                state.filteredList = action.payload;
            })
            .addCase(fetchEmployeeList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch employee list";
            });
    },
});

export const { clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
