import { createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../../services/api";

export const fetchEmployeeInfo = createAsyncThunk(
    "profile/fetchEmployeeInfo", 
    async (formData, { rejectWithValue }) => {
    {
        try {
            const response = await post("/user/info", formData);
            const { data, code, message } = response;
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
});

export const updateEmployeeInfo = createAsyncThunk(
    "profile/updateEmployeeInfo",
    async(formData, {rejectWithValue}) => {
        try {
            const response = await post('/user/update-info', formData);
            const { data, code, message } = response;
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
)