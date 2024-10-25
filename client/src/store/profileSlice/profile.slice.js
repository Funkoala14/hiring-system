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
    reducers: {
        resetProfileState: (state) => {
            state.info = null;
            state.loading = false;
            state.error = null;
        },
        setInfo(state, action) {
            state.info = action.payload; // Set the info state with the payload
          },
        clearError: (state) => {
            state.error = null;
        },
    },
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

export const { resetProfileState, setInfo, clearError } = profileSlice.actions;

export default profileSlice.reducer;
