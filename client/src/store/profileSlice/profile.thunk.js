import { createAsyncThunk } from "@reduxjs/toolkit";
import { post, upload } from "../../services/api";
import { showNotification } from "../notificationSlice/notification.slice";

export const fetchEmployeeInfo = createAsyncThunk(
    "profile/fetchEmployeeInfo",
    async (formData, { rejectWithValue, dispatch  }) => {
        try {
            const response = await post("/employee/info", formData);
            const { data, code, message } = response;
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
    }
);

export const updateEmployeeInfo = createAsyncThunk(
    "profile/updateEmployeeInfo",
    async (formData, { rejectWithValue, dispatch  }) => {
        try {
            const response = await post("/employee/update-info", formData);
            const { data, code, message } = response;
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
    }
);

export const updateEmployeeAvatar = createAsyncThunk(
    "profile/updateAvatar",
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const response = await upload("/employee/update-avatar", formData);
            const { data, code, message } = response;
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
    }
);

export const getEmployeeDocs = createAsyncThunk(
    "profile/getEmployeeDocs",
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const response = await post("/employee/docs", formData);
            const { data, code, message } = response;
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
    }
)