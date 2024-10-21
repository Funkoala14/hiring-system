import { createSlice } from "@reduxjs/toolkit";
import { addHousing, deleteHousing, fetchHousingList } from "./housing.thunk";

const housingSlice = createSlice({
    name: "housing",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchHousingList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHousingList.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchHousingList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch housing list";
            })
            .addCase(deleteHousing.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteHousing.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(deleteHousing.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete housing";
            })
            .addCase(addHousing.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addHousing.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(addHousing.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to add housing";
            });
    },
});

export const { selectHousingByTitle } = housingSlice.selectors;
export default housingSlice.reducer;
