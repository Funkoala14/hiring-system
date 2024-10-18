import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default is localStorage for web
import authReducer from './auth/auth.slice';
import profileReducer from './profileSlice/profile.slice.js';
import userReducer from './userSlice/user.slice.js';

// Persist configuration for the auth state
const persistConfig = {
    key: 'auth', // Key for the auth state in localStorage
    storage, // Use localStorage to persist the state
    whitelist: ['isLoggedIn', 'username', 'role', 'token'], // Specify which parts of the state to persist
};

// Create a persisted reducer for the auth slice
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer, // Use the persisted reducer for auth
        // Other reducers can go here
        profile: profileReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check for redux-persist
        }),
    devTools: true,
});

// Create the persistor to manage rehydrating the store
export const persistor = persistStore(store);

export default store;
