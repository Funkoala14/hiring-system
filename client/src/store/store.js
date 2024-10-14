import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {},
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
