import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: '',
        baseQueryList: [],
        queryList: [],
        filteredList: [],
        searched: false,
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
            state.searched = false;
        },
        setFilteredList: (state, action) => {
            state.filteredList = action.payload;
            state.searched = true;
        },
        clearSearch: (state, action) => {
            state.query = '';
            state.filteredList = action.payload;
        },
        setQueryList: (state, action) => {
            state.queryList = action.payload;
        },
        setBaseQuery: (state, action) => {
            state.baseQueryList = action.payload;
        },
        resetQueryList: (state) => {
            state.queryList = [];
        }
    },
    selectors: {},
});

export const { setQuery, setFilteredList, clearSearch, resetQueryList, setQueryList, setBaseQuery } =
    searchSlice.actions;

export default searchSlice.reducer;
