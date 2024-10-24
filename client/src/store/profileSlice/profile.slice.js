import { createSlice } from '@reduxjs/toolkit';
import { fetchEmployeeInfo, getEmployeeDocs, updateEmployeeAvatar, updateEmployeeInfo } from './profile.thunk';

const setPending = (state) => {
    state.loading = true;
    state.error = null;
};

const setFulfilled = (state, action) => {
    state.loading = false;
    state.info = action.payload;
};

const setRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        info: {},
        docs: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeInfo.pending, setPending)
            .addCase(fetchEmployeeInfo.fulfilled, setFulfilled)
            .addCase(fetchEmployeeInfo.rejected, setRejected)

            .addCase(updateEmployeeInfo.pending, setPending)
            .addCase(updateEmployeeInfo.fulfilled, setFulfilled)
            .addCase(updateEmployeeInfo.rejected, setRejected)

            .addCase(updateEmployeeAvatar.pending, setPending)
            .addCase(updateEmployeeAvatar.fulfilled, setFulfilled)
            .addCase(updateEmployeeAvatar.rejected, setRejected)

            .addCase(getEmployeeDocs.pending, setPending)
            .addCase(getEmployeeDocs.fulfilled, (state, action) => {
                state.loading = false;
                state.docs = action.payload.documents;
            })
            .addCase(getEmployeeDocs.rejected, setRejected);
    },
    selectors: {},
});

// export const {} = profileSlice.actions;
// export const {} = profileSlice.selectors;

export default profileSlice.reducer;
