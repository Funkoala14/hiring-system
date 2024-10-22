import { createSlice } from '@reduxjs/toolkit';
import { fetchEmployeeInfo, updateEmployeeAvatar, updateEmployeeInfo } from './profile.thunk';

const profileSlice = createSlice({
    name: 'profile',
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
                state.error = null;
            })
            .addCase(fetchEmployeeInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.info = action.payload;
            })
            .addCase(fetchEmployeeInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch data';
            })
            .addCase(updateEmployeeInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployeeInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.info = action.payload;
            })
            .addCase(updateEmployeeInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch data';
            })
            .addCase(updateEmployeeAvatar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployeeAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.info = action.payload;
            })
            .addCase(updateEmployeeAvatar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch data';
            });
    },
    selectors: {},
});

// export const {} = profileSlice.actions;
// export const {} = profileSlice.selectors;

export default profileSlice.reducer;
