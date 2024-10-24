import { createSlice } from '@reduxjs/toolkit';
import { addHousing, deleteHousing, fetchHousingList, getReportList, postNewReport } from './housing.thunk';

const setPending = (state) => {
    state.loading = true;
    state.error = null;
};

const setFulfilled = (state, action, listType = 'list') => {
    state.loading = false;
    state[listType] = action.payload;
};

const setRejected = (state, action, defaultMessage) => {
    state.loading = false;
    state.error = action.payload || defaultMessage;
};

const housingSlice = createSlice({
    name: 'housing',
    initialState: {
        list: [],
        reportsInfo: {
            page: 1,
            limit: 3,
            totalPages: 0,
            totalReports: 0,
            facilityReports: [],
        },
        loading: false,
        error: null,
    },
    reducers: {
        pageChange: (state, action) => {
            state.reportsInfo.page = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHousingList.pending, setPending)
            .addCase(fetchHousingList.fulfilled, setFulfilled)
            .addCase(fetchHousingList.rejected, (state, action) =>
                setRejected(state, action, 'Failed to fetch housing list')
            )

            .addCase(deleteHousing.pending, setPending)
            .addCase(deleteHousing.fulfilled, setFulfilled)
            .addCase(deleteHousing.rejected, (state, action) => setRejected(state, action, 'Failed to delete housing'))

            .addCase(addHousing.pending, setPending)
            .addCase(addHousing.fulfilled, setFulfilled)
            .addCase(addHousing.rejected, (state, action) => setRejected(state, action, 'Failed to add housing'))

            .addCase(getReportList.pending, setPending)
            .addCase(getReportList.fulfilled, (state, action) => setFulfilled(state, action, 'reportsInfo'))
            .addCase(getReportList.rejected, (state, action) =>
                setRejected(state, action, 'Failed to fetch report list')
            )

            .addCase(postNewReport.pending, setPending)
            .addCase(postNewReport.fulfilled, (state, action) => setFulfilled(state, action, 'reportsInfo'))
            .addCase(postNewReport.rejected, (state, action) =>
                setRejected(state, action, 'Failed to create new report')
            );
    },
});

export const { pageChange, clearError } = housingSlice.actions;
export const { selectHousingByTitle } = housingSlice.selectors;
export default housingSlice.reducer;
