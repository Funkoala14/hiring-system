import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
