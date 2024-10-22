import { createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../../services/api";

export const fetchEmployeeList = createAsyncThunk(
	"employee/fetchList",
	async(_, {rejectWithValue}) => {
		try {
			const response = await get('/employee/list');
			const { data } = response
			console.log('fetchEmployeeList: ', data);
			return data;
		} catch (error) {
            return rejectWithValue(error.response.data.message || "Something went wrong");
		}
	}
)