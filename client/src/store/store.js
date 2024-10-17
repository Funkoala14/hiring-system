import { configureStore } from '@reduxjs/toolkit';
import profileReducer from "./profileSlice/profile.slice.js";
import userReducer from "./userSlice/user.slice.js";

const store = configureStore({
    reducer: {
        profile: profileReducer,
        user: userReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
