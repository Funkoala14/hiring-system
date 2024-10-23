import { createAsyncThunk } from '@reduxjs/toolkit';
import { del, get, post } from '../../services/api';
import { showNotification } from '../notificationSlice/notification.slice';

export const fetchHousingList = createAsyncThunk('housing/fetchList', async (_, { rejectWithValue, dispatch }) => {
    try {
        const response = await get('/housing/list');
        const { data } = response;
        console.log('fetchHousingList: ', data);
        return data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        dispatch(
            showNotification({
                message: errorMessage,
                severity: 'error',
            })
        );
        return rejectWithValue(errorMessage);
    }
});

export const addHousing = createAsyncThunk('housing/add', async (config, { rejectWithValue, dispatch }) => {
    try {
        const response = await post('/housing/add', config);
        const { data, message } = response;
        dispatch(
            showNotification({
                message: message,
                severity: 'success',
            })
        );
        return data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        dispatch(
            showNotification({
                message: errorMessage,
                severity: 'error',
            })
        );
        return rejectWithValue(errorMessage);
    }
});

export const deleteHousing = createAsyncThunk('housing/delete', async (config, { rejectWithValue, dispatch }) => {
    try {
        const { houseId } = config;
        if (!houseId) return rejectWithValue('HouseId is required!');
        const response = await del(`/housing/delete/${houseId}`);
        const { data } = response;
        dispatch(
            showNotification({
                message: 'House deleted successfully!',
                severity: 'success',
            })
        );
        return data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        dispatch(
            showNotification({
                message: errorMessage,
                severity: 'error',
            })
        );
        return rejectWithValue(errorMessage);
    }
});

export const getReportList = createAsyncThunk('housing/getReportList', async (config, { rejectWithValue, dispatch }) => {
    try {
        const { page, limit, houseId } = config;
        const response = await get(`/housing/report-list/${houseId}?page=${page}&limit=${limit}`);
        const { data } = response;
        console.log('getReportList: ', data);
        return data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        dispatch(
            showNotification({
                message: errorMessage,
                severity: 'error',
            })
        );
        return rejectWithValue(errorMessage);
    }
});

export const postNewReport = createAsyncThunk('housing/postNewReport', async (config, { rejectWithValue, dispatch }) => {
    try {
        const response = await post("/housing/new-report", config);
        const { data, message } = response;
        dispatch(
            showNotification({
                message: message,
                severity: 'success',
            })
        );
        return data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        dispatch(
            showNotification({
                message: errorMessage,
                severity: 'error',
            })
        );
        return rejectWithValue(errorMessage);
    }
});