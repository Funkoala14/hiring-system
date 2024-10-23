import { createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../../services/api';
import { showNotification } from '../notificationSlice/notification.slice';

export const fetchEmployeeList = createAsyncThunk('employee/fetchList', async (_, { rejectWithValue, dispatch }) => {
    try {
        const response = await get('/employee/list');
        const { data } = response;
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
