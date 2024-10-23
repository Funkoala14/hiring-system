import { createAsyncThunk } from '@reduxjs/toolkit';
import { del, get, post } from '../../services/api';

export const fetchHousingList = createAsyncThunk('housing/fetchList', async (_, { rejectWithValue }) => {
    try {
        const response = await get('/housing/list');
        const { data } = response;
        console.log('fetchHousingList: ', data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Something went wrong');
    }
});

export const addHousing = createAsyncThunk('housing/add', async (config, { rejectWithValue }) => {
    try {
        const response = await post('/housing/add', config);
        const { data } = response;
        console.log('addHousing: ', data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Something went wrong');
    }
});

export const deleteHousing = createAsyncThunk('housing/delete', async (config, { rejectWithValue }) => {
    try {
        const { houseId } = config;
        if (!houseId) return rejectWithValue('HouseId is required!');
        const response = await del(`/housing/delete/${houseId}`);
        const { data } = response;
        console.log('delete housing: ', data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Something went wrong');
    }
});

export const getReportList = createAsyncThunk('housing/getReportList', async (config, { rejectWithValue }) => {
    try {
        const { page, limit, houseId } = config;
        const response = await get(`/housing/report-list/${houseId}?page=${page}&limit=${limit}`);
        const { data } = response;
        console.log('getReportList: ', data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Something went wrong');
    }
});

export const postNewReport = createAsyncThunk('housing/postNewReport', async (config, { rejectWithValue }) => {
    try {
        const response = await post("/housing/new-report", config);
        const { data } = response;
        console.log('postNewReport: ', data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Something went wrong');
    }
});