import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "../../services/api";

export const visaStatusInit = createAsyncThunk("visa/visaStatusInit", async () => {
    const { data } = await get('/visa/info')
    return data
})

export const updateVisaStatus = createAsyncThunk("visa/updateVisaStatus", async (newStatus) => {
    try {
        const formData = new FormData();
        const { type, file } = newStatus

        formData.append('file', file);
        formData.append('type', type);

        const res = await post('/visa/submit', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res
    } catch (err) {
        console.error(err)
    }
})