import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import shippingReducer from '../features/shipping/shippingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shipping: shippingReducer, // Shipping feature state globally registered here
  },
  devTools: import.meta.env.MODE !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
