import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        open: false,
        message: '',
        severity: 'info', // 'success' | 'error' | 'warning' | 'info'
    },
    reducers: {
        showNotification: (state, action) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        clearNotification: (state) => {
            state.open = false;
        },
    },
});

export const { showNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
