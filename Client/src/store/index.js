import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userSlice from './slices/userSlice';
import { privateApiSlice } from './slices/privateApiSlice';
import cartSlice from './slices/cartSlice';
import { apiSlice } from './slices/apiSlice';

export const store = configureStore({
    reducer: {
        [privateApiSlice.reducerPath]: privateApiSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userSlice,
        cart: cartSlice,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            privateApiSlice.middleware,
            apiSlice.middleware
        ),
    devTools: true,
});

setupListeners(store.dispatch);
