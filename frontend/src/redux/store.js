import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import { publicApiSlice } from './api/publicApiSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    userState: userReducer,
    [publicApiSlice.reducerPath]: publicApiSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    	getDefaultMiddleware().concat(publicApiSlice.middleware, apiSlice.middleware),
	devTools: process.env.NODE_ENV !== 'production',
});
